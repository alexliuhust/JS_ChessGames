import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class HenchWarrior extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HenchWarrior_img");
    // Override original data

    this.name = "Hench Warrior";
    this.type = "infantry";
    this.description = "armor-shield-infantry";

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missileArmor = 60;
    this.chargeArmor = 40;

    this.meleeAttack = 36;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class HenchWarriorHalberd extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HenchWarriorHalberd_img");
    // Override original data

    this.name = "Hench Warrior (Halberd)";
    this.type = "infantry";
    this.description = "armor-infantry / anti-large";

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missileArmor = 40;
    this.chargeArmor = 70;

    this.meleeAttack = 30;
    this.meleeAttack_bonus = 26;

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

export class HenchWarriorGiantaxe extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HenchWarriorGiantaxe_img");
    // Override original data

    this.name = "Hench Warrior (Giantaxe)";
    this.type = "infantry";
    this.description = "armor-infantry / anti-armor";

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missileArmor = 40;
    this.chargeArmor = 40;

    this.meleeAttack = 55;

    this.antiArmor = 40;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class BurningKnight extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("BurningKnight_img");
    // Override original data

    this.name = "Burning Knight";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor";

    this.scale = 32;
    this.singleHP = 120;
    this.speed = 4;

    this.meleeArmor = 50;
    this.missileArmor = 70;
    this.chargeArmor = 50;

    this.meleeAttack = 36;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class BurningKnightHalberd extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("BurningKnightHalberd_img");
    // Override original data

    this.name = "Burning Knight (Halberd)";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor / anti-large";

    this.scale = 32;
    this.singleHP = 120;
    this.speed = 4;

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.chargeArmor = 80;

    this.meleeAttack = 30;
    this.meleeAttack_bonus = 26;

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

export class Hellhound extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Hellhound_img");
    // Override original data

    this.name = "Hellhound";
    this.type = "cavalry";
    this.description = "monster-cavalry / fast";

    this.scale = 100;
    this.singleHP = 30;
    this.speed = 7;

    this.missileDodge = 70;

    this.meleeAttack = 2;
    this.chargeAttack = 6;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class DemonEnvoyWild extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DemonEnvoyWild_img");
    // Override original data

    this.name = "Demon Envoy (Wild)";
    this.type = "monster-infantry";
    this.description = "monster-infantry / anti-armor";

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 5;

    this.meleeArmor = 0;
    this.missileArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 80;

    this.antiArmor = 40;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class DemonEnvoyHellfire extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DemonEnvoyHellfire_img");
    // Override original data

    this.name = "Demon Envoy (Hellfire)";
    this.type = "monster-infantry";
    this.description = "monster-infantry / missile-attack";

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 4;

    this.meleeArmor = 0;
    this.missileArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 64;
    this.missileAttack = 80;
    this.missileRange = 6;

    this.ammo = 30;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class GreatDemon extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("GreatDemon_img");
    // Override original data

    this.name = "Great Demon";
    this.type = "monster";
    this.description = "giant / anti-armor";

    this.scale = 1;
    this.singleHP = 1600;
    this.speed = 4;

    this.meleeArmor = 0;
    this.missileArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 1000;

    this.antiArmor = 50;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new HenchWarrior(pos[0]),
    new HenchWarriorHalberd(pos[1]),
    new HenchWarriorGiantaxe(pos[2]),
    new BurningKnight(pos[3]),
    new BurningKnightHalberd(pos[4]),
    new Hellhound(pos[5]),
    new DemonEnvoyWild(pos[6]),
    new DemonEnvoyHellfire(pos[7]),
    new GreatDemon(pos[8]),
  ];
  return arms;
}

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new HenchWarrior(pos);
  if (i === 1) return new HenchWarriorHalberd(pos);
  if (i === 2) return new HenchWarriorGiantaxe(pos);
  if (i === 3) return new BurningKnight(pos);
  if (i === 4) return new BurningKnightHalberd(pos);
  if (i === 5) return new Hellhound(pos);
  if (i === 6) return new DemonEnvoyWild(pos);
  if (i === 7) return new DemonEnvoyHellfire(pos);
  if (i === 8) return new GreatDemon(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/burningterra/HenchWarrior.png");
  images.push("../images/burningterra/HenchWarriorHalberd.png");
  images.push("../images/burningterra/HenchWarriorGiantaxe.png");
  images.push("../images/burningterra/BurningKnight.png");
  images.push("../images/burningterra/BurningKnightHalberd.png");
  images.push("../images/burningterra/Hellhound.png");
  images.push("../images/burningterra/DemonEnvoyWild.png");
  images.push("../images/burningterra/DemonEnvoyHellfire.png");
  images.push("../images/burningterra/GreatDemon.png");

  return images;
}
