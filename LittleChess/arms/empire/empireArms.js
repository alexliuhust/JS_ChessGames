import { Arm, DamageTypes, ArmTypes } from "../arm.js";
import { checkDamageType, checkArmType, checkArmClass } from "../arm.js";

export class SwordInfantry extends Arm {
  constructor() {
    super();

    // Override original data

    this.name = "SwordInfantry";
    this.type = "infantry";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeArmor = 20;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 32;
    this.missleAttack = 0;
    this.chargeAttack = 0;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // SwordInfantry has higher damage on non-cavalry arms
  _getSingleDamage(damageType, targetType) {
    if (!DamageTypes.includes(damageType)) {
      throw new Error("Invalid damage type: " + damageType);
    }
    if (!ArmTypes.includes(targetType)) {
      throw new Error("Invalid target type: " + targetType);
    }

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.meleeAttack;
    }
    if (targetType !== "cavalry") {
      singleDamage += 4;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  // SwordInfantry has extra antiarmor for non-cavalry arms
  getAntiArmor(damageType, targetArm) {
    if (!DamageTypes.includes(damageType)) {
      throw new Error("Invalid damage type: " + damageType);
    }
    let className = Object.getPrototypeOf(targetArm.constructor).name;
    if (className !== "Arm") {
      throw new Error(
        `Invalid object type for targetArm: class name: {${className}}, type: {${typeof targetArm}}`
      );
    }
    let targetType = targetArm.type;
    let antiArmor = 0;
    if (targetType !== "cavalry") {
      antiArmor += 8;
    }

    return antiArmor;
  }
}

export class PalaceGuard extends Arm {
  constructor() {
    super();

    // Override original data

    this.name = "PalaceGuard";
    this.type = "infantry";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeArmor = 20;
    this.missleArmor = 0;
    this.chargeArmor = 80;

    this.meleeAttack = 24;
    this.missleAttack = 0;
    this.chargeAttack = 0;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // PalaceGuard has higher damage on cavalry arms
  _getSingleDamage(damageType, targetType) {
    checkDamageType(damageType);
    checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.meleeAttack;
    }
    if (targetType === "cavalry") {
      singleDamage += 20;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  // PalaceGuard has extra antiarmor for cavalry arms
  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    let targetType = targetArm.type;
    let antiArmor = 6;
    if (targetType === "cavalry") {
      antiArmor += 10;
    }

    return antiArmor;
  }
}
