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

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missleArmor = 20;
    this.chargeArmor = 20;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 60;

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
      singleDamage += this.meleeAttack_bonus;
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

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 3;

    this.meleeArmor = 40;
    this.missleArmor = 20;
    this.chargeArmor = 20;

    this.meleeAttack = 66;

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
    this.description = "giant-shield-infantry / high-missle-damage";

    this.scale = 48;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 0;
    this.missleArmor = 80;
    this.chargeArmor = 50;

    this.meleeAttack = 20;
    this.missleAttack = 80;
    this.missleRange = 2;

    this.ammo = 3;

    this.loadRealtimeProps();
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

    this.scale = 48;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missleArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.missleAttack = 40;
    this.missleRange = 6;

    this.antiArmor = 40;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missle") return this.antiArmor;
    return 0;
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

    this.scale = 36;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missleArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.missleAttack = 80;
    this.missleRange = 6;

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

    this.scale = 2;
    this.singleHP = 1200;
    this.speed = 1;

    this.missleAttack = 440;
    this.missleAttack_bonus = 220;
    this.missleRange = 10;

    this.antiArmor = 50;

    this.ammo = 15;
    this.loadRealtimeProps();

    this.ammo = 120;
    this.c_ammo = this.ammo;
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
      singleDamage += this.missleAttack_bonus;
    }
    this.c_ammo -= 8;

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missle") return this.antiArmor;
    return 0;
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
