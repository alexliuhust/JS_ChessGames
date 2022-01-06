import * as ArmPrimary from "../arms/arm.js";

export function armAttackArm(attacker, damageType, defender) {
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
