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
    this.missileArmor = 50;
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
    this.missileArmor = 20;
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
    this.missileArmor = 20;
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
    this.description = "giant-shield-infantry / high-missile-damage";

    this.scale = 48;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 0;
    this.missileArmor = 80;
    this.chargeArmor = 50;

    this.meleeAttack = 20;
    this.missileAttack = 80;
    this.missileRange = 2;

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
    this.missileArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.missileAttack = 40;
    this.missileRange = 6;

    this.antiArmor = 40;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
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
    this.missileArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.missileAttack = 80;
    this.missileRange = 6;

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
    this.missileArmor = 50;
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

    this.missileAttack = 440;
    this.missileAttack_bonus = 220;
    this.missileRange = 10;

    this.antiArmor = 50;

    this.ammo = 15;
    this.loadRealtimeProps();

    this.ammo = 200;
    this.c_ammo = this.ammo;
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "missile") {
      singleDamage = this.c_missileAttack;
    }

    if (
      damageType === "missile" &&
      (targetType === "cavalry" ||
        targetType === "moster" ||
        targetType === "monster-infantry")
    ) {
      singleDamage += this.missileAttack_bonus;
    }
    this.c_ammo -= 8;

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
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

    this.missileAttack = 530;
    this.missileRange = 13;
    this.missileRadius = 2;
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

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new DwarfWarrior(pos);
  if (i === 1) return new BoneBreaker(pos);
  if (i === 2) return new Berserker(pos);
  if (i === 3) return new MountainShocker(pos);
  if (i === 4) return new DwarfMusketeer(pos);
  if (i === 5) return new MortarSquad(pos);
  if (i === 6) return new GoatCavalry(pos);
  if (i === 7) return new RevolvingCannon(pos);
  if (i === 8) return new GiantCannon(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/snowhaupt/DwarfWarrior.png");
  images.push("../images/snowhaupt/BoneBreaker.png");
  images.push("../images/snowhaupt/Berserker.png");
  images.push("../images/snowhaupt/MountainShocker.png");
  images.push("../images/snowhaupt/DwarfMusketeer.png");
  images.push("../images/snowhaupt/MortarSquad.png");
  images.push("../images/snowhaupt/GoatCavalry.png");
  images.push("../images/snowhaupt/RevolvingCannon.png");
  images.push("../images/snowhaupt/GiantCannon.png");

  return images;
}
