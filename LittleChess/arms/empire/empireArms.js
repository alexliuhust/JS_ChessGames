import { Arm, DamageTypes, ArmTypes } from "../arm.js";

export class SwordInfantry extends Arm {
  constructor() {
    super();
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

  _getSingleDamage(damageType, targetType) {
    if (!DamageTypes.includes(damageType)) {
      throw new Error("Invalid damage type: " + damageType);
    }
    if (!ArmTypes.includes(targetType)) {
      throw new Error("Invalid target type: " + targetType);
    }

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = 32;
    }
    if (targetType !== "cavalry") {
      singleDamage += 4;
    }

    return singleDamage;
  }

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
