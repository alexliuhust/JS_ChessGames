import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class DwarfWarrior extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DwarfWarrior_img");
    // Override original data

    this.name = "Dwarf Warrior";
    this.type = "infantry";
    this.description = "shield-infantry";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missleArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class BoneBreaker extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("BoneBreaker_img");
    // Override original data

    this.name = "Bone Breaker";
    this.type = "infantry";
    this.description = "infantry / anti-large";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missleArmor = 30;
    this.chargeArmor = 20;

    this.meleeAttack = 20;

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
      (targetType === "cavalry" ||
        targetType === "moster" ||
        targetType === "monster-infantry")
    ) {
      singleDamage += 20;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============
}

export class Berserker extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Berserker_img");
    // Override original data

    this.name = "Berserker";
    this.type = "infantry";
    this.description = "infantry / high-damage";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 3;

    this.meleeArmor = 0;
    this.missleArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 56;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class MountainShocker extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("MountainShocker_img");
    // Override original data

    this.name = "Mountain Shocker";
    this.type = "archers";
    this.description = "giant-shield-archers / high-damage";
    this.cost = 2;

    this.scale = 48;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missleArmor = 90;
    this.chargeArmor = 50;

    this.meleeAttack = 20;
    this.missleAttack = 80;
    this.missleRange = 2;

    this.loadRealtimeProps();

    this.ammo = 3;
    this.c_ammo = this.ammo;
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class DwarfMusketeer extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DwarfMusketeer_img");
    // Override original data

    this.name = "Dwarf Musketeer";
    this.type = "archers";
    this.description = "shield-archers / anti-armor";
    this.cost = 2;

    this.scale = 48;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missleArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
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
    if (damageType === "missle") {
      antiArmor = 40;
    }

    return antiArmor;
  }
}

export class MortarSquad extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("MortarSquad_img");
    // Override original data

    this.name = "Mortar Squad";
    this.type = "archers";
    this.description = "shield-archers / high-damage";
    this.cost = 2;

    this.scale = 32;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missleArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.missleAttack = 80;
    this.missleRange = 4;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class GoatCavalry extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("GoatCavalry_img");
    // Override original data

    this.name = "Goat Cavalry";
    this.type = "cavalry";
    this.description = "charging-cavalry";
    this.cost = 4;

    this.scale = 32;
    this.singleHP = 120;
    this.speed = 5;

    this.meleeArmor = 40;
    this.missleArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.chargeAttack = 78;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class RevolvingCannon extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("RevolvingCannon_img");
    // Override original data

    this.name = "Revolving Cannon";
    this.type = "artillery";
    this.description = "artillery / anti-large / anti-armor";
    this.cost = 5;

    this.scale = 2;
    this.singleHP = 1200;
    this.speed = 1;

    this.missleAttack = 440;
    this.missleRange = 10;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "missle") {
      singleDamage = this.c_missleAttack;
    }

    if (
      damageType === "missle" &&
      (targetType === "cavalry" ||
        targetType === "moster" ||
        targetType === "monster-infantry")
    ) {
      singleDamage += 220;
    }
    this.c_ammo--;

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = 50;
    }

    return antiArmor;
  }
}

export class GiantCannon extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("GiantCannon_img");
    // Override original data

    this.name = "Giant Cannon";
    this.type = "artillery";
    this.description = "bombing-artillery";
    this.cost = 6;

    this.scale = 2;
    this.singleHP = 1200;
    this.speed = 1;

    this.missleAttack = 530;
    this.missleRange = 13;
    this.missleRadius = 2;
    this.isBombing = true;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new DwarfWarrior(pos[0]),
    new BoneBreaker(pos[1]),
    new Berserker(pos[2]),
    new MountainShocker(pos[3]),
    new DwarfMusketeer(pos[4]),
    new MortarSquad(pos[5]),
    new GoatCavalry(pos[6]),
    new RevolvingCannon(pos[7]),
    new GiantCannon(pos[8]),
  ];
  return arms;
}
