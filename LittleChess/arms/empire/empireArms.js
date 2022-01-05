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

    this.meleeAttack = 24;
    this.missleAttack = 0;
    this.missleRange = 0;
    this.chargeAttack = 0;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // SwordInfantry has higher damage on non-cavalry arms
  _getSingleDamage(damageType, targetType) {
    checkDamageType(damageType);
    checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    }
    if (targetType !== "cavalry") {
      singleDamage += 8;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  // SwordInfantry has extra antiarmor for non-cavalry arms
  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

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

    this.meleeAttack = 20;
    this.missleAttack = 0;
    this.missleRange = 0;
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
      singleDamage = this.c_meleeAttack;
    }
    if (targetType === "cavalry") {
      singleDamage += 24;
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

export class Musketeer extends Arm {
  constructor() {
    super();

    // Override original data

    this.name = "Musketeer";
    this.type = "archers";
    this.cost = 2;

    this.scale = 48;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 0;
    this.missleArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 16;
    this.missleAttack = 48;
    this.missleRange = 6;
    this.chargeAttack = 0;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = 10;
    }

    return antiArmor;
  }
}

export class MusketRider extends Arm {
  constructor() {
    super();

    // Override original data

    this.name = "MusketRider";
    this.type = "cavalry";
    this.cost = 4;

    this.scale = 32;
    this.singleHP = 90;
    this.speed = 6;

    this.meleeArmor = 10;
    this.missleArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 24;
    this.missleAttack = 48;
    this.missleRange = 6;
    this.chargeAttack = 0;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = 10;
    }

    return antiArmor;
  }
}

export class Vanguard extends Arm {
  constructor() {
    super();

    // Override original data

    this.name = "Vanguard";
    this.type = "cavalry";
    this.cost = 4;

    this.scale = 32;
    this.singleHP = 90;
    this.speed = 8;

    this.meleeArmor = 10;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 24;
    this.missleAttack = 0;
    this.missleRange = 0;
    this.chargeAttack = 76;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "charge") {
      antiArmor = 8;
    }

    return antiArmor;
  }
}

export class PalaceKnight extends Arm {
  constructor() {
    super();

    // Override original data

    this.name = "PalaceKnight";
    this.type = "cavalry";
    this.cost = 4;

    this.scale = 28;
    this.singleHP = 100;
    this.speed = 5;

    this.meleeArmor = 70;
    this.missleArmor = 70;
    this.chargeArmor = 70;

    this.meleeAttack = 32;
    this.missleAttack = 0;
    this.missleRange = 0;
    this.chargeAttack = 0;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class CannonGroup extends Arm {
  constructor() {
    super();

    // Override original data

    this.name = "CannonGroup";
    this.type = "artillery";
    this.cost = 4;

    this.scale = 5;
    this.singleHP = 60;
    this.speed = 2;

    this.meleeArmor = 0;
    this.missleArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 0;
    this.missleAttack = 150;
    this.missleRange = 12;
    this.chargeAttack = 0;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = 50;
    }

    return antiArmor;
  }
}
