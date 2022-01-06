import { Arm, DamageTypes, ArmTypes } from "../arms/arm.js";
import { checkDamageType, checkArmType, checkArmClass } from "../arms/arm.js";

export function armAttackArm(attacker, damageType, defender) {
  checkArmClass(attacker);
  checkArmClass(defender);

  let att_antiArmor = attacker.getAntiArmor(damageType, defender);
  let att_totalRowDamage = attacker.getRawTotalDamage(damageType, defender);
  let dfd_counterAttack = defender.getCounterAttackTotalDamage(
    damageType,
    attacker
  );

  attacker.decreaseScale("melee", 0, dfd_counterAttack);
  defender.decreaseScale(damageType, att_antiArmor, att_totalRowDamage);
}
