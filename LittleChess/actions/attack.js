import * as MoveActions from "../actions/move.js";
import { calculateDistance, areAligned } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";
import { afterAttackEnhancement, addAttackEnhanceEffect } from "./enhance.js";

const cxt = document.getElementById("piece").getContext("2d");

export function armAttackArm(attacker, defender, defenders, _damageType) {
  let damageType = _damageType;
  if (typeof _damageType === "undefined") {
    damageType = determineDamageType(attacker, defender);
    if (damageType == null) return;
    if (damageType === "charge") {
      let result = determineChargingTargetAndMoveThere(attacker, defender, defenders);
      damageType = result[0];
      defender = result[1];
    }
  }

  let list1 = attacker.player.effectList;
  let list2 = defender.player.effectList;
  let att_sleepRound = 0;

  attacker.updateCurrentFatigue(damageType, 1);
  let att_antiArmor = attacker.getAntiArmor(damageType, defender);
  let attAttackInfoList = attacker.getAttackInfo(damageType, defender);
  attacker.hasAttacked = true;
  att_sleepRound = addEffect(list1, damageType, attacker, defender, cxt);

  let dfd_antiArmor = 0;
  let dfd_sleepRound = 0;
  let [dfd_sgdmgs, dfd_hitpos] = [0, 0];
  if (damageType === "melee" && defender.c_meleeAttack > 0 && defender.c_leadership > 0 && !defender.hasCountered) {
    dfd_antiArmor = defender.getAntiArmor("melee", attacker);
    [attacker, dfd_sgdmgs, dfd_hitpos] = defender.getAttackInfo("melee", attacker)[0];
    defender.hasCountered = true;
    dfd_sleepRound = addEffect(list2, "melee", defender, attacker, cxt);
    defender.updateCurrentFatigue("melee", 1);
  }

  // Do not store preMissileTarget if the target is stealth
  if (damageType === "missile" && !defender.isStealth()) {
    attacker.preMissileTarget = defender;
  }

  // Update melee status
  if (damageType === "melee" || damageType === "charge") {
    attacker.inMeleeWith.add(defender);
    defender.inMeleeWith.add(attacker);
    if (!attacker.isAgile()) attacker.c_speed = 0;

    if (!attacker.isMeleeMaster()) attacker.addStatus("IM");
    if (!defender.isMeleeMaster()) defender.addStatus("IM");

    if (damageType === "charge") {
      attacker.c_leadership += 20;
      attacker.c_leadership = Math.min(attacker.c_leadership, attacker.leadership);
      setTimeout(() => {
        addEffect(list1, "inspiring", null, attacker, cxt);
      }, att_sleepRound * 20);

      if (defender.isResistingCharge() && attacker.isCavalry()) {
        attacker.addStatus("HP");
      }
    }

    if (damageType === "melee" && attacker.isResistingCharge() && defender.isCavalry()) {
      defender.addStatus("HP");
    }
  }

  // Update poison status
  if (attacker.canPoison() && defender[`c_${damageType}Armor`] < 10) {
    if (!defender.beingPoisoned()) defender.bePoisoned();
    else defender.poisonTime = 2;
  }

  setTimeout(
    () => {
      for (let i = 0; i < attAttackInfoList.length; i++) {
        let [target, att_sgdmgs, att_hitpos] = attAttackInfoList[i];
        // console.log(target.m_name);
        decreaseScalesForArms(
          attacker,
          damageType,
          target,
          att_antiArmor,
          dfd_antiArmor,
          att_sgdmgs,
          att_hitpos,
          dfd_sgdmgs,
          dfd_hitpos,
        );
      }
    },
    Math.max(att_sleepRound, dfd_sleepRound) * 20,
  );
}

function decreaseScalesForArms(
  attacker,
  damageType,
  defender,
  att_antiArmor,
  dfd_antiArmor,
  att_sgdmgs,
  att_hitpos,
  dfd_sgdmgs,
  dfd_hitpos,
) {
  let results = null;

  if (dfd_sgdmgs != null && dfd_sgdmgs != []) {
    // ============== Defender counter attacks ==============
    // Defender gains experience
    results = attacker.decreaseScale(defender, "melee", dfd_antiArmor, dfd_sgdmgs, dfd_hitpos);
    defender.damageOutput += results[0];
    defender.exp += results[1];
    defender.killCount += results[2];
    // Attacker decrease leadership
    if (!attacker.isHighMorale() && damageType === "melee") {
      if (defender.isMon() && attacker.isInfn() && !attacker.isResistingCharge()) {
        attacker.c_leadership -= 25;
      }
      if (!attacker.isMon() && defender.canShock()) {
        attacker.c_leadership -= defender.getShockingAbility();
        attacker.addStatus("HR");
      }
    }

    // if attacker dies
    if (!attacker.isAlive) {
      // Defender gains leadership and experience when eliminating the Attacker by counter attack.
      defender.c_leadership += Math.round(attacker.cost * 0.5);
      defender.exp += Math.round(attacker.cost * 0.6);
      if (defender.c_leadership >= defender.leadership) defender.c_leadership = defender.leadership;
    }
  }

  // ============== Attacker attacks ==============
  // Attacker gains experience
  results = defender.decreaseScale(attacker, damageType, att_antiArmor, att_sgdmgs, att_hitpos);
  attacker.damageOutput += results[0];
  attacker.exp += results[1];
  attacker.killCount += results[2];
  // Defender decrease leadership
  if (!defender.isHighMorale()) {
    defender.c_leadership -= regularLeadershipDrop(defender, results[2]);
    const defenderVulnerable = defender.isInfn() && !defender.isResistingCharge();
    if (damageType === "melee" && attacker.isMon() && defenderVulnerable) defender.c_leadership -= 25;
    if (damageType === "charge" && defenderVulnerable) defender.c_leadership -= 40;
    if (!defender.isMon() || attacker.canArtilleryAttack()) {
      let totalShock = 0;
      if (attacker.canShock()) {
        totalShock += attacker.getShockingAbility();
        defender.addStatus("HR");
      }
      defender.c_leadership -= totalShock;
    }
    if (damageType === "missile") {
      if (attacker.isBombing) {
        defender.addStatus("UB");
        defender.c_leadership -= 40;
      } else if (attacker.canArtilleryAttack()) {
        defender.addStatus("UC");
        defender.c_leadership -= 30;
      }
    }
  }

  if (damageType === "charge" && !defender.isResistingCharge() && !defender.isMon()) {
    defender.addStatus("FS");
  }

  // if defender dies
  if (!defender.isAlive) {
    // Attacker gains leadership and experience when eliminating the Defender.
    attacker.c_leadership += Math.round(defender.cost * 0.5);
    attacker.exp += Math.round(defender.cost * 0.6);
    if (attacker.c_leadership >= attacker.leadership) attacker.c_leadership = attacker.leadership;
    // Charger gains one speed bonus
    if (damageType == "charge") {
      attacker.positionX = defender.positionX;
      attacker.positionY = defender.positionY;
      attacker.c_speed = 1;
      attacker.removeStatus("IM");
      attacker.removeStatus("HP");
    }
  }
}

function determineDamageType(attacker, defender) {
  let distance = calculateDistance(attacker.positionX, attacker.positionY, defender.positionX, defender.positionY);

  let aligned = areAligned(attacker.positionX, attacker.positionY, defender.positionX, defender.positionY);

  // Melee attack
  if (distance == 1) return "melee";

  // Charge attack
  if (aligned && distance <= attacker.c_speed && attacker.c_chargeAttack > 0) return "charge";

  // missile Attack
  if (distance <= attacker.c_missileRange && attacker.c_missileAttack > 0 && attacker.c_ammo > 0) return "missile";

  return null;
}

function determineChargingTargetAndMoveThere(attacker, defender, defenders) {
  let blockers = [...attacker.player.pieceList, ...defenders];
  let toPosition = [defender.positionX, defender.positionY];
  let result = MoveActions.getRealDestination(attacker, toPosition, blockers);
  let realPosition = result[0];
  defender = result[1];

  let damageType = "charge";
  let distance = MoveActions.moveToPosition(attacker, realPosition, blockers);
  if (distance === 0) {
    damageType = "melee";
  }

  attacker.positionX = realPosition[0];
  attacker.positionY = realPosition[1];
  attacker.c_speed = 0;

  return [damageType, defender];
}

function regularLeadershipDrop(self, dama_decr) {
  if (self.scale === 1) return damageCauseLeadershipDecreasing(self, dama_decr);
  return scaleDecreasingCauseLeadershipDecreasing(self, dama_decr);
}

function damageCauseLeadershipDecreasing(self, realDamage) {
  let decrease = 0;
  if (realDamage >= self.singleHP * 0.8) decrease = 50;
  else if (realDamage >= self.singleHP * 0.5) decrease = 30;
  else if (realDamage >= self.singleHP * 0.3) decrease = 15;

  return decrease;
}

function scaleDecreasingCauseLeadershipDecreasing(self, totalDecrease) {
  let decrease = 0;
  if (totalDecrease >= self.scale * 0.8) decrease = 50;
  else if (totalDecrease >= self.scale * 0.5) decrease = 30;
  else if (totalDecrease >= self.scale * 0.3) decrease = 15;

  return decrease;
}
