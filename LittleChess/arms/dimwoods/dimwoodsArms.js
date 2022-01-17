import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class WoodsGuard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("WoodsGuard_img");
    // Override original data

    this.name = "Woods Guard";
    this.type = "infantry";
    this.description = "shield-infantry / charge-resist";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missleArmor = 50;
    this.chargeArmor = 70;

    this.meleeAttack = 24;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    return 30;
  }
}

export class WildKiller extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("WildKiller_img");
    // Override original data

    this.name = "Wild Killer";
    this.type = "infantry";
    this.description = "infantry / melee master";
    this.cost = 1;

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 50;
    this.missleArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 48;

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
      singleDamage += 12;
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
    this.description = "melee archers";
    this.cost = 2;

    this.scale = 50;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 50;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 36;
    this.missleAttack = 32;
    this.missleRange = 5;

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

    this.name = "Shadow Archer (AP)";
    this.type = "archers";
    this.description = "melee archers / anti-armor";
    this.cost = 2;

    this.scale = 40;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 30;
    this.missleArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 36;
    this.missleAttack = 44;
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
      antiArmor = 44;
    }

    return antiArmor;
  }
}

export class ShadowArcherFL extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("ShadowArcherFL_img");
    // Override original data

    this.name = "Shadow Archer (Flame)";
    this.type = "archers";
    this.description = "melee archers / high-damage";
    this.cost = 2;

    this.scale = 40;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeArmor = 30;
    this.missleArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 36;
    this.missleAttack = 52;
    this.missleRange = 6;

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
    this.description = "longbow archers / high-damage";
    this.cost = 2;

    this.scale = 32;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 20;
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
      antiArmor = 60;
    }

    return antiArmor;
  }
}

export class Dryad extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Dryad_img");
    // Override original data

    this.name = "Dryad";
    this.type = "monster-infantry";
    this.description = "monster infantry / tough";
    this.cost = 2;

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missleArmor = 60;
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
    this.description = "monster infantry / tough";
    this.cost = 2;

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missleArmor = 60;
    this.chargeArmor = 60;

    this.meleeAttack = 48;
    this.missleAttack = 68;
    this.missleRange = 9;

    this.loadRealtimeProps();

    this.ammo = 14;
    this.c_ammo = this.ammo;
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let antiArmor = 0;
    if (damageType === "missle") {
      antiArmor = 60;
    }

    return antiArmor;
  }
}

export class GiantTreeman extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("GiantTreeman_img");
    // Override original data

    this.name = "Giant Treeman";
    this.type = "monster";
    this.description = "giant";
    this.cost = 6;

    this.scale = 1;
    this.singleHP = 600;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missleArmor = 90;
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
