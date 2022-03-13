import * as MoveActions from "../actions/move.js";
import { calculateDistance, areAligned } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function armBombArea(attacker, centerPosition, defenders) {
  if (!attacker.isBombing) throw new Error(`attacker should be able to bomb.`);

  let bombDistance = calculateDistance(
    centerPosition[0],
    centerPosition[1],
    attacker.positionX,
    attacker.positionY
  );
  if (bombDistance > attacker.c_missileRange || attacker.c_ammo <= 0) return;

  let damageType = "bombing";
  let sleepRound = addEffect(
    attacker.player.effectList,
    damageType,
    attacker,
    centerPosition,
    cxt
  );

  setTimeout(() => {
    decreaseBombingVictims(attacker, defenders, damageType, centerPosition);
    attacker.c_ammo--;
    attacker.hasAttacked = true;
  }, sleepRound * 20);
}

export function armAttackArm(attacker, defender, defenders, _damageType) {
  let damageType = _damageType;
  if (typeof _damageType === "undefined") {
    damageType = determineDamageType(attacker, defender);
    if (damageType == null) return;
    if (damageType === "charge") {
      let result = determineChargingTarget(attacker, defender, defenders);
      damageType = result[0];
      defender = result[1];
    }
  }

  let list1 = attacker.player.effectList;
  let list2 = defender.player.effectList;
  let sleepRound = addEffect(list1, damageType, attacker, defender, cxt);
  if (damageType === "melee" && defender.c_meleeAttack > 0)
    addEffect(list2, "melee", defender, attacker, cxt);

  setTimeout(() => {
    decreaseScalesForArms(attacker, damageType, defender);
    attacker.hasAttacked = true;
  }, sleepRound * 20);
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

function regularLeadershipDrop(self, dama_decr) {
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

function decreaseBombingVictims(
  attacker,
  defenders,
  damageType,
  centerPosition
) {
  let decreaseScore = 0;

  for (let i = 0; i < defenders.length; i++) {
    let defender = defenders[i];
    if (defender === attacker) continue;

    let distance = calculateDistance(
      centerPosition[0],
      centerPosition[1],
      defender.positionX,
      defender.positionY
    );

    if (distance <= attacker.c_missileRadius) {
      // Get the total raw damage for attacker
      let att_totalRowDamage = attacker.getRawTotalDamage(damageType, null);
      if (distance === 1) {
        att_totalRowDamage = Math.ceil(att_totalRowDamage * 0.7);
      } else if (distance > 1) {
        att_totalRowDamage = Math.ceil(att_totalRowDamage * 0.3);
      }

      if (defender.isLarge())
        att_totalRowDamage = Math.round(att_totalRowDamage * 0.7);
      if (defender.scale === 1) {
        att_totalRowDamage = Math.ceil(att_totalRowDamage * 0.8);
      }

      // This defender decrease scale
      let results = defender.decreaseScale(
        self,
        damageType,
        0,
        att_totalRowDamage
      );
      decreaseScore += results[1];

      // Defender decrease leadership
      defender.c_leadership -= regularLeadershipDrop(defender, results[0]);
      defender.c_leadership -= 75 + attacker.getShockingAbility();
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
}

function decreaseScalesForArms(attacker, damageType, defender) {
  // Get the total raw damage for attacker and counter attack damage for defender
  let att_antiArmor = attacker.getAntiArmor(damageType, defender);
  let dfd_antiArmor = defender.getAntiArmor("melee", attacker);
  let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
  let dfd_counterAttack = defender.getCounterAttackTotalDamage(
    damageType,
    attacker
  );

  // ============== Defender counter attacks ==============
  // Defender gains experience
  let results = attacker.decreaseScale(
    defender,
    "melee",
    dfd_antiArmor,
    dfd_counterAttack
  );
  defender.exp += results[1];
  // if attacker dies
  if (!attacker.isAlive) {
    // Defender gains leadership and experience when eliminating the Attacker by counter attack.
    defender.c_leadership += Math.round(attacker.cost * 0.5);
    defender.exp += Math.round(attacker.cost * 0.6);
    if (defender.c_leadership >= defender.leadership)
      defender.c_leadership = defender.leadership;
  }

  // ============== Attacker attacks ==============
  // Attacker gains experience
  results = defender.decreaseScale(
    attacker,
    damageType,
    att_antiArmor,
    att_totalRowDamage
  );
  attacker.exp += results[1];
  // Defender decrease leadership
  if (damageType === "melee" && attacker.isMon() && !defender.isMon())
    defender.c_leadership -= 30;
  if (damageType === "charge" && !defender.isMon()) defender.c_leadership -= 60;
  defender.c_leadership -= regularLeadershipDrop(defender, results[0]);
  if (
    ((damageType === "melee" || damageType === "charge") &&
      !defender.isMon()) ||
    attacker.type === "artillery"
  )
    defender.c_leadership -= attacker.getShockingAbility();
  if (defender.c_leadership < 0) defender.c_leadership = 0;
  // if defender dies
  if (!defender.isAlive) {
    // Attacker gains leadership and experience when eliminating the Defender.
    attacker.c_leadership += Math.round(attacker.cost * 0.5);
    attacker.exp += Math.round(attacker.cost * 0.6);
    if (attacker.c_leadership >= attacker.leadership)
      attacker.c_leadership = attacker.leadership;
  }
}
