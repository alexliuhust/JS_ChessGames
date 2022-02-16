import * as ArmPrimary from "../arms/arm.js";
import * as MoveActions from "../actions/move.js";
import { calculateDistance, areAligned } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function armBombArea(attacker, centerPosition, defenders) {
  ArmPrimary.checkArmClass(attacker);

  if (!attacker.isBombing) {
    throw new Error(`attacker should be able to bomb.`);
  }

  let bombDistance = calculateDistance(
    centerPosition[0],
    centerPosition[1],
    attacker.positionX,
    attacker.positionY
  );

  if (bombDistance > attacker.c_missileRange || attacker.c_ammo <= 0) {
    return;
  }

  let damageType = "bombing";
  let decreaseScore = 0;

  for (let i = 0; i < defenders.length; i++) {
    let defender = defenders[i];
    if (defender === attacker) continue;
    ArmPrimary.checkArmClass(defender);

    let distance = calculateDistance(
      centerPosition[0],
      centerPosition[1],
      defender.positionX,
      defender.positionY
    );

    if (distance <= attacker.c_missileRadius) {
      // Get the total raw damage for attacker
      let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
      if (distance === 1) {
        att_totalRowDamage = Math.ceil(att_totalRowDamage * 0.7);
      } else if (distance > 1) {
        att_totalRowDamage = Math.ceil(att_totalRowDamage * 0.25);
      }
      if (defender.isLarge())
        att_totalRowDamage = Math.round(att_totalRowDamage / 3);
      if (defender.scale === 1) {
        att_totalRowDamage = Math.ceil(att_totalRowDamage * 0.5);
      }
      console.log(att_totalRowDamage);

      // This defender decrease scale
      let results = defender.decreaseScale(damageType, 0, att_totalRowDamage);
      decreaseScore += results[1];

      // Defender decrease leadership
      defender.c_leadership -= leadershipDrop(defender, results[0]);
      defender.c_leadership -= 50 + attacker.getShockingAbility();
      if (defender.c_leadership < 0) defender.c_leadership = 0;

      if (!defender.isAlive) {
        // Attacker gains leadership and experience when eliminating an enemy.
        attacker.c_leadership += Math.round(attacker.cost * 0.1);
        attacker.exp += Math.round(attacker.cost * 0.1);

        if (attacker.c_leadership >= attacker.leadership)
          attacker.c_leadership = attacker.leadership;
      }
    }
  }
  attacker.exp += decreaseScore;
  attacker.c_ammo--;
  attacker.hasAttacked = true;
}

export function armAttackArm(attacker, defender, defenders) {
  ArmPrimary.checkArmClass(attacker);
  ArmPrimary.checkArmClass(defender);

  let damageType = determineDamageType(attacker, defender);
  if (damageType == null) return;
  if (damageType === "charge") {
    let result = determineChargingTarget(attacker, defender, defenders);
    damageType = result[0];
    defender = result[1];
  }

  addEffect(attacker.player.effectList, damageType, attacker, defender, cxt);

  decreaseScalesForArms(attacker, damageType, defender);
  attacker.hasAttacked = true;
}

function determineDamageType(attacker, defender) {
  let distance = calculateDistance(
    attacker.positionX,
    attacker.positionY,
    defender.positionX,
    defender.positionY
  );

  let aligned = areAligned(
    attacker.positionX,
    attacker.positionY,
    defender.positionX,
    defender.positionY
  );

  // Melee attack
  if (distance == 1) return "melee";

  // Charge attack
  if (
    aligned &&
    distance <= attacker.c_speed + 1 &&
    attacker.c_chargeAttack > 0
  )
    return "charge";

  // missile Attack
  if (
    distance <= attacker.c_missileRange &&
    attacker.c_missileAttack > 0 &&
    attacker.c_ammo > 0
  )
    return "missile";

  return null;
}

function determineChargingTarget(attacker, defender, defenders) {
  let toPosition = [defender.positionX, defender.positionY];
  let result = MoveActions.getRealDestination(attacker, toPosition, defenders);
  let realPosition = result[0];
  defender = result[1];

  let damageType = "charge";
  let distance = calculateDistance(
    attacker.positionX,
    attacker.positionY,
    realPosition[0],
    realPosition[1]
  );
  if (distance === 0) damageType = "melee";

  attacker.positionX = realPosition[0];
  attacker.positionY = realPosition[1];
  attacker.c_speed -= distance;

  return [damageType, defender];
}

function leadershipDrop(self, dama_decr) {
  if (self.scale === 1) return damageCauseLeadershipDecreasing(self, dama_decr);
  return scaleDecreasingCauseLeadershipDecreasing(self, dama_decr);
}

function damageCauseLeadershipDecreasing(self, realDamage) {
  let decrease = 0;
  if (realDamage >= self.singleHP * 0.8) decrease = 150;
  else if (realDamage >= self.singleHP * 0.5) decrease = 100;
  else if (realDamage >= self.singleHP * 0.3) decrease = 30;

  return decrease;
}

function scaleDecreasingCauseLeadershipDecreasing(self, totalDecrease) {
  let decrease = 0;
  if (totalDecrease >= self.scale * 0.8) decrease = 150;
  else if (totalDecrease >= self.scale * 0.5) decrease = 100;
  else if (totalDecrease >= self.scale * 0.3) decrease = 30;

  return decrease;
}

function decreaseScalesForArms(attacker, damageType, defender) {
  // Get the total raw damage for attacker and counter attack damage for defender
  let att_antiArmor = attacker.getAntiArmor(damageType, defender);
  let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
  let dfd_counterAttack = defender.getCounterAttackTotalDamage(
    damageType,
    attacker
  );
  if (attacker.isInfn() && defender.isInfn() && damageType === "melee") {
    att_totalRowDamage = Math.round(att_totalRowDamage / 2);
    dfd_counterAttack = Math.round(dfd_counterAttack / 2);
  } else if (attacker.type === "artillery" && defender.isInfn()) {
    att_totalRowDamage = Math.round(att_totalRowDamage / 3);
  }

  // ============== Defender counter attacks ==============
  // Defender gains experience
  let results = attacker.decreaseScale("melee", 0, dfd_counterAttack);
  defender.exp += results[1];

  // if attacker dies
  if (!attacker.isAlive) {
    // Defender gains leadership and experience when eliminating the Attacker by counter attack.
    defender.c_leadership += Math.round(attacker.cost * 0.4);
    defender.exp += Math.round(attacker.cost * 0.6);
    if (defender.c_leadership >= defender.leadership)
      defender.c_leadership = defender.leadership;
  }

  // ============== Attacker attacks ==============
  // Attacker gains experience
  results = defender.decreaseScale(
    damageType,
    att_antiArmor,
    att_totalRowDamage
  );
  attacker.exp += results[1];

  // Defender decrease leadership
  if (attacker.isMon() && !defender.isMon()) defender.c_leadership -= 30;
  if (damageType === "charge") defender.c_leadership -= 50;
  defender.c_leadership -= leadershipDrop(defender, results[0]);
  defender.c_leadership -= attacker.getShockingAbility();
  if (defender.c_leadership < 0) defender.c_leadership = 0;

  // if defender dies
  if (!defender.isAlive) {
    // Attacker gains leadership and experience when eliminating the Defender.
    attacker.c_leadership += Math.round(attacker.cost * 0.4);
    attacker.exp += Math.round(attacker.cost * 0.6);
    if (attacker.c_leadership >= attacker.leadership)
      attacker.c_leadership = attacker.leadership;
  }
}
