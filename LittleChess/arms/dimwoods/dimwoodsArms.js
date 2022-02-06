import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class WoodsGuard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("WoodsGuard_img");
    // Override original data

    this.name = "Woods Guard";
    this.type = "infantry";
    this.description = "shield-infantry / resist-charging";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 0;
    this.missileArmor = 50;
    this.chargeArmor = 70;

    this.meleeAttack = 24;

    this.antiArmor = 10;

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

export class WildKiller extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("WildKiller_img");
    // Override original data

    this.name = "Wild Killer";
    this.type = "infantry";
    this.description = "infantry / melee-master";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 60;

    this.meleeAttack = 48;
    this.meleeAttack_bonus = 18;

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
}

export class HightreeScout extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HightreeScout_img");
    // Override original data

    this.name = "Hightree Scout";
    this.type = "archers";
    this.description = "melee-archers";

    this.scale = 50;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 36;
    this.missileAttack = 32;
    this.missileRange = 5;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class ShadowArcherAP extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("ShadowArcherAP_img");
    // Override original data

    this.name = "Shadow Archer (Armor-Piercing)";
    this.type = "archers";
    this.description = "melee-archers / anti-armor";

    this.scale = 40;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 36;
    this.missileAttack = 44;
    this.missileRange = 6;

    this.antiArmor = 28;

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

export class ShadowArcherFL extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("ShadowArcherFL_img");
    // Override original data

    this.name = "Shadow Archer (Flame)";
    this.type = "archers";
    this.description = "melee-archers / high-damage";

    this.scale = 40;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 36;
    this.missileAttack = 72;
    this.missileRange = 6;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class LongbowRanger extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("LongbowRanger_img");
    // Override original data

    this.name = "Longbow Ranger";
    this.type = "archers";
    this.description = "long-range-archers / anti-armor";

    this.scale = 32;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 40;
    this.missileArmor = 40;
    this.chargeArmor = 0;

    this.meleeAttack = 20;
    this.missileAttack = 68;
    this.missileRange = 9;

    this.antiArmor = 60;

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

export class Dryad extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Dryad_img");
    // Override original data

    this.name = "Dryad";
    this.type = "monster-infantry";
    this.description = "monster-infantry / heavy-armor";

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missileArmor = 60;
    this.chargeArmor = 60;

    this.meleeAttack = 48;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class DryadRangerRide extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DryadRangerRide_img");
    // Override original data

    this.name = "Dryad (Ranger-Ride)";
    this.type = "monster-infantry";
    this.description = "monster-infantry / heavy-armor / missile-attack";

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missileArmor = 60;
    this.chargeArmor = 60;

    this.meleeAttack = 48;
    this.missileAttack = 68;
    this.missileRange = 9;

    this.antiArmor = 60;

    this.ammo = 10;
    this.c_ammo = this.ammo;

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

export class GiantTreeman extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("GiantTreeman_img");
    // Override original data

    this.name = "Giant Treeman";
    this.type = "monster";
    this.description = "giant / heavy-armor";

    this.scale = 1;
    this.singleHP = 600;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missileArmor = 90;
    this.chargeArmor = 60;

    this.meleeAttack = 600;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new WoodsGuard(pos[0]),
    new WildKiller(pos[1]),
    new HightreeScout(pos[2]),
    new ShadowArcherAP(pos[3]),
    new ShadowArcherFL(pos[4]),
    new LongbowRanger(pos[5]),
    new Dryad(pos[6]),
    new DryadRangerRide(pos[7]),
    new GiantTreeman(pos[8]),
  ];
  return arms;
}

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new WoodsGuard(pos);
  if (i === 1) return new WildKiller(pos);
  if (i === 2) return new HightreeScout(pos);
  if (i === 3) return new ShadowArcherAP(pos);
  if (i === 4) return new ShadowArcherFL(pos);
  if (i === 5) return new LongbowRanger(pos);
  if (i === 6) return new Dryad(pos);
  if (i === 7) return new DryadRangerRide(pos);
  if (i === 8) return new GiantTreeman(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/dimwoods/WoodsGuard.png");
  images.push("../images/dimwoods/WildKiller.png");
  images.push("../images/dimwoods/HightreeScout.png");
  images.push("../images/dimwoods/ShadowArcherAP.png");
  images.push("../images/dimwoods/ShadowArcherFL.png");
  images.push("../images/dimwoods/LongbowRanger.png");
  images.push("../images/dimwoods/Dryad.png");
  images.push("../images/dimwoods/DryadRangerRide.png");
  images.push("../images/dimwoods/GiantTreeman.png");

  return images;
}
