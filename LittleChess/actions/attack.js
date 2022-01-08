import * as ArmPrimary from "../arms/arm.js";
import * as MoveActions from "../actions/move.js";

export function armBombArea(attacker, centerPosition, defenders) {
  ArmPrimary.checkArmClass(attacker);

  if (!attacker.isBombing) {
    throw new Error(`attacker should be able to bomb.`);
  }

  let bombDistance =
    Math.abs(centerPosition[0] - attacker.positionX) +
    Math.abs(centerPosition[1] - attacker.positionY);

  if (bombDistance > attacker.c_missleRange || attacker.c_ammo <= 0) {
    return;
  }

  let damageType = "bombing";

  for (let i = 0; i < defenders.length; i++) {
    let defender = defenders[i];
    ArmPrimary.checkArmClass(defender);

    let distance =
      Math.abs(centerPosition[0] - defender.positionX) +
      Math.abs(centerPosition[1] - defender.positionY);

    if (distance <= attacker.c_missleRadius) {
      let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
      defender.decreaseScale(damageType, 0, att_totalRowDamage);
    }
  }
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
  decreaseScalesForArms(attacker, damageType, defender);
  attacker.hasAttacked = true;
}

function determineDamageType(attacker, defender) {
  let distance =
    Math.abs(attacker.positionX - defender.positionX) +
    Math.abs(attacker.positionY - defender.positionY);

  let aligned =
    attacker.positionX === defender.positionX ||
    attacker.positionY === defender.positionY;

  // Melee attack
  if (distance == 1) {
    return "melee";
  }

  // Charge attack
  if (
    aligned &&
    distance <= attacker.c_speed + 1 &&
    attacker.c_chargeAttack > 0
  ) {
    return "charge";
  }

  // Missle Attack
  if (
    distance <= attacker.c_missleRange &&
    attacker.c_missleAttack > 0 &&
    attacker.c_ammo > 0
  ) {
    return "missle";
  }

  return null;
}

function determineChargingTarget(attacker, defender, defenders) {
  let toPosition = [defender.positionX, defender.positionY];
  let result = MoveActions.getRealDestination(attacker, toPosition, defenders);
  let realPosition = result[0];
  defender = result[1];

  let damageType = "charge";
  let distance =
    Math.abs(attacker.positionX - realPosition[0]) +
    Math.abs(attacker.positionY - realPosition[1]);
  if (distance === 0) {
    damageType = "melee";
  }

  attacker.positionX = realPosition[0];
  attacker.positionY = realPosition[1];
  attacker.c_speed -= distance;

  console.log(damageType);
  return [damageType, defender];
}

function decreaseScalesForArms(attacker, damageType, defender) {
  let att_antiArmor = attacker.getAntiArmor(damageType, defender);
  let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
  let dfd_counterAttack = defender.getCounterAttackTotalDamage(
    damageType,
    attacker
  );

  attacker.decreaseScale("melee", 0, dfd_counterAttack);
  defender.decreaseScale(damageType, att_antiArmor, att_totalRowDamage);
}
