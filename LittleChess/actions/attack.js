import * as ArmPrimary from "../arms/arm.js";

// This function is not suitable for bombing
export function armAttackArm(attacker, defender) {
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
  ArmPrimary.checkArmClass(attacker);
  ArmPrimary.checkArmClass(defender);

  let att_antiArmor = attacker.getAntiArmor(damageType, defender);
  let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
  let dfd_counterAttack = defender.getCounterAttackTotalDamage(
    damageType,
    attacker
  );

  attacker.decreaseScale("melee", 0, dfd_counterAttack);
  defender.decreaseScale(damageType, att_antiArmor, att_totalRowDamage);
}
