import * as ArmPrimary from "../arm.js";

export class HallwayGuard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Hallway Guard";
    this.type = "infantry";
    this.description = "infantry / charge-resist";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 4;

    this.meleeArmor = 30;
    this.missleArmor = 0;
    this.chargeArmor = 70;

    this.meleeAttack = 30;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    return 40;
  }
}

export class NordExecutioner extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Nord Executioner";
    this.type = "infantry";
    this.description = "armor infantry / anti-infantry";
    this.cost = 1;

    this.scale = 56;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeArmor = 80;
    this.missleArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 42;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let targetType = targetArm.type;
    let antiArmor = 0;
    if (targetType === "infantry") {
      antiArmor += 16;
    }

    return antiArmor;
  }
}

export class CoastDefender extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Coast Defender";
    this.type = "archers";
    this.description = "archers / charge-resist";
    this.cost = 1;

    this.scale = 48;
    this.singleHP = 50;
    this.speed = 4;

    this.meleeArmor = 0;
    this.missleArmor = 0;
    this.chargeArmor = 70;

    this.meleeAttack = 32;
    this.missleAttack = 40;
    this.missleRange = 6;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType !== "melee") {
      antiArmor += 16;
    }

    return antiArmor;
  }
}

export class CoastDefenderShield extends CoastDefender {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Coast Defender (Shield)";
    this.description = "shield archers / charge-resist";
    this.cost = 1;

    this.speed = 3;

    this.missleArmor = 50;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class BallistaSquad extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Ballista Squad";
    this.type = "archers";
    this.description = "archers / anti-armor";
    this.cost = 2;

    this.scale = 32;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missleAttack = 68;
    this.missleRange = 9;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = 36;
    }

    return antiArmor;
  }
}

export class FlameKnight extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Flame Knight";
    this.type = "cavalry";
    this.description = "charging cavalry / anti-armor";
    this.cost = 1;

    this.scale = 32;
    this.singleHP = 80;
    this.speed = 9;

    this.meleeArmor = 0;
    this.missleArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 32;
    this.chargeAttack = 72;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "charge") {
      antiArmor = 80;
    }

    return antiArmor;
  }
}

export class CoralCavalry extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Coral Cavalry";
    this.type = "cavalry";
    this.description = "charging cavalry / shield";
    this.cost = 1;

    this.scale = 32;
    this.singleHP = 100;
    this.speed = 7;

    this.meleeArmor = 30;
    this.missleArmor = 60;
    this.chargeArmor = 40;

    this.meleeAttack = 44;
    this.chargeAttack = 64;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class GiantBallista extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Giant Ballista";
    this.type = "artillery";
    this.description = "artillery / anti-armor";
    this.cost = 5;

    this.scale = 7;
    this.singleHP = 100;
    this.speed = 2;

    this.missleAttack = 140;
    this.missleRange = 12;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = 48;
    }

    return antiArmor;
  }
}

export class StoneGiant extends ArmPrimary.Arm {
  constructor(value) {
    super(value);

    // Override original data

    this.name = "Stone Giant";
    this.type = "monster";
    this.description = "giant / anti-infantry";
    this.cost = 6;

    this.scale = 1;
    this.singleHP = 400;
    this.speed = 4;

    this.meleeArmor = 50;
    this.missleArmor = 50;
    this.chargeArmor = 50;

    this.meleeAttack = 550;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetType) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    }
    if (
      targetType === "infantry" ||
      targetType === "archers" ||
      targetType === "artillery"
    ) {
      singleDamage += 150;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============
}
