import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class SwordInfantry extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SwordInfantry_img");
    // Override original data

    this.name = "Sword Infantry";
    this.type = "infantry";
    this.description = "shield-infantry / anti-infantry";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 20;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 24;
    this.meleeAttack_bonus = 8;

    this.antiArmor = 8;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
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
      singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let targetType = targetArm.type;
    let antiArmor = 0;
    if (targetType !== "cavalry") {
      antiArmor += this.antiArmor;
    }

    return antiArmor;
  }
}

export class PalaceGuard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("PalaceGuard_img");
    // Override original data

    this.name = "Palace Guard";
    this.type = "infantry";
    this.description = "infantry / resist-charging";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 20;
    this.missleArmor = 0;
    this.chargeArmor = 80;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 24;

    this.antiArmor = 10;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    }
    if (
      damageType === "melee" &&
      (targetType === "cavalry" || targetType === "monster")
    ) {
      singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let targetType = targetArm.type;
    let antiArmor = this.antiArmor;
    if (targetType === "cavalry") {
      antiArmor += 10;
    }

    return antiArmor;
  }
}

export class Musketeer extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Musketeer_img");
    // Override original data

    this.name = "Musketeer";
    this.type = "archers";
    this.description = "archers";
    this.cost = 2;

    this.scale = 48;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missleAttack = 48;
    this.missleRange = 6;

    this.antiArmor = 10;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = this.antiArmor;
    }

    return antiArmor;
  }
}

export class MusketRider extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("MusketRider_img");
    // Override original data

    this.name = "Musket Rider";
    this.type = "cavalry";
    this.description = "missle-cavalry";
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

    this.antiArmor = 10;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = this.antiArmor;
    }

    return antiArmor;
  }
}

export class Vanguard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Vanguard_img");
    // Override original data

    this.name = "Vanguard";
    this.type = "cavalry";
    this.description = "charging-cavalry / anti-armor";
    this.cost = 4;

    this.scale = 32;
    this.singleHP = 90;
    this.speed = 6;

    this.meleeArmor = 10;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 24;
    this.chargeAttack = 76;

    this.antiArmor = 16;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "charge") {
      antiArmor = this.antiArmor;
    }

    return antiArmor;
  }
}

export class PalaceKnight extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("PalaceKnight_img");
    // Override original data

    this.name = "Palace Knight";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor";
    this.cost = 4;

    this.scale = 28;
    this.singleHP = 100;
    this.speed = 4;

    this.meleeArmor = 70;
    this.missleArmor = 70;
    this.chargeArmor = 70;

    this.meleeAttack = 32;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class CannonGroup extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("CannonGroup_img");
    // Override original data

    this.name = "Cannon Group";
    this.type = "artillery";
    this.description = "artillery / anti-armor";
    this.cost = 5;

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missleAttack = 150;
    this.missleRange = 12;

    this.antiArmor = 50;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = this.antiArmor;
    }

    return antiArmor;
  }
}

export class EmpireMortar extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("EmpireMortar_img");
    // Override original data

    this.name = "Empire Mortar";
    this.type = "artillery";
    this.description = "bombing-artillery";
    this.cost = 6;

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missleAttack = 190;
    this.missleRange = 10;
    this.missleRadius = 2;
    this.isBombing = true;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class SteamTank extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SteamTank_img");
    // Override original data

    this.name = "Steam Tank";
    this.type = "monster";
    this.description = "mech / heavy-armor / missle-attack";
    this.cost = 6;

    this.scale = 1;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 90;
    this.missleArmor = 90;
    this.chargeArmor = 90;

    this.meleeAttack = 450;
    this.missleAttack = 300;
    this.missleRange = 7;

    this.antiArmor = 50;

    this.ammo = 18;
    this.c_ammo = this.ammo;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = this.antiArmor;
    }

    return antiArmor;
  }
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new SwordInfantry(pos[0]),
    new PalaceGuard(pos[1]),
    new Musketeer(pos[2]),
    new MusketRider(pos[3]),
    new Vanguard(pos[4]),
    new PalaceKnight(pos[5]),
    new CannonGroup(pos[6]),
    new EmpireMortar(pos[7]),
    new SteamTank(pos[8]),
  ];
  return arms;
}
