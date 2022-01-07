import * as ArmPrimary from "../arms/arm.js";

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

    let distance =
      Math.abs(centerPosition[0] - defender.positionX) +
      Math.abs(centerPosition[1] - defender.positionY);

    if (distance <= attacker.c_missleRadius) {
      let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
      defender.decreaseScale(damageType, 0, att_totalRowDamage);
    }
  }
}

// This function is not suitable for bombing
export function armAttackArm(attacker, defender) {
  ArmPrimary.checkArmClass(attacker);
  ArmPrimary.checkArmClass(defender);

  let damageType = determineDamageType(attacker, defender);
  console.log(damageType);
  if (damageType == null) return;
  decreaseScalesForArms(attacker, damageType, defender);
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
