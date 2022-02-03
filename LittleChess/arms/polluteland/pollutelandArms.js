import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class SlaveConscript extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SlaveConscript_img");
    // Override original data

    this.name = "Slave Conscript";
    this.type = "infantry";
    this.description = "shield-infantry / weak";

    this.scale = 100;
    this.singleHP = 30;
    this.speed = 4;

    this.meleeArmor = 0;
    this.missleArmor = 40;
    this.chargeArmor = 0;

    this.meleeAttack = 16;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class HurlerGas extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HurlerGas_img");
    // Override original data

    this.name = "Hurler (Gas Bomb)";
    this.type = "archers";
    this.description = "armor-archers / anti-armor";

    this.scale = 60;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missleArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 16;
    this.missleAttack = 16;
    this.missleRange = 3;

    this.antiArmor = 40;

    this.ammo = 12;
    this.c_ammo = this.ammo;

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

export class HurlerFrgm extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HurlerFrgm_img");
    // Override original data

    this.name = "Hurler (Fragmentation)";
    this.type = "archers";
    this.description = "armor-archers / anti-infantry";

    this.scale = 60;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missleArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 16;
    this.missleAttack = 16;
    this.missleAttack_bonus = 36;
    this.missleRange = 3;

    this.ammo = 12;
    this.c_ammo = this.ammo;

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
    } else if (damageType === "missle") {
      singleDamage = this.c_missleAttack;
    }

    if (
      damageType === "missle" &&
      (targetType === "infantry" ||
        targetType === "archers" ||
        targetType === "artillery")
    ) {
      singleDamage += this.missleAttack_bonus;
    }
    this.c_ammo--;

    return singleDamage;
  }

  // =============== Override Public APIs ===============
}

export class HurlerHE extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HurlerHE_img");
    // Override original data

    this.name = "Hurler (High-Explosion)";
    this.type = "archers";
    this.description = "armor-archers / high-damage";

    this.scale = 60;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missleArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 16;
    this.missleAttack = 30;
    this.missleRange = 3;

    this.ammo = 12;
    this.c_ammo = this.ammo;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class WeapSqdGingall extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("WeapSqdGingall_img");
    // Override original data

    this.name = "Weapon Squad (Gingall)";
    this.type = "archers";
    this.description = "shield-archers / anti-large";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 16;
    this.missleAttack = 30;
    this.missleAttack_bonus = 50;
    this.missleRange = 6;

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
    } else if (damageType === "missle") {
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
    this.c_ammo--;

    return singleDamage;
  }

  // =============== Override Public APIs ===============
}

export class WeapSqdGatlin extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("WeapSqdGatlin_img");
    // Override original data

    this.name = "Weapon Squad (Gatlin)";
    this.type = "archers";
    this.description = "shield-archers / anti-infantry";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 16;
    this.missleAttack = 38;
    this.missleAttack_bonus = 50;
    this.missleRange = 6;

    this.ammo = 10;
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
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missle") {
      singleDamage = this.c_missleAttack;
    }

    if (
      damageType === "missle" &&
      (targetType === "infantry" ||
        targetType === "archers" ||
        targetType === "artillery")
    ) {
      if (targetArm.c_missleArmor > 0)
        singleDamage += this.missleAttack_bonus / 5;
      else singleDamage += this.missleAttack_bonus;
    }
    this.c_ammo -= 20;

    return singleDamage;
  }

  // =============== Override Public APIs ===============
}

export class WeapSqdFlthr extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("WeapSqdFlthr_img");
    // Override original data

    this.name = "Weapon Squad (Flamethrower)";
    this.type = "archers";
    this.description = "shield-archers / anti-non-armor";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missleArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 16;
    this.missleAttack = 48;
    this.missleAttack_bonus = 30;
    this.missleRange = 2;

    this.ammo = 9;
    this.c_ammo = this.ammo;

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
    } else if (damageType === "missle") {
      singleDamage = this.c_missleAttack;
    }

    if (
      damageType === "missle" &&
      (targetArm.c_meleeArmor === 0 || targetArm.c_missleArmor === 0)
    ) {
      singleDamage += this.missleAttack_bonus;
    }
    this.c_ammo--;

    return singleDamage;
  }

  // =============== Override Public APIs ===============
}

export class MutantSlave extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("MutantSlave_img");
    // Override original data

    this.name = "Mutant Slave";
    this.type = "monster-infantry";
    this.description = "monster-infantry / melee-master / fast";

    this.scale = 20;
    this.singleHP = 200;
    this.speed = 5;

    this.meleeArmor = 70;
    this.missleArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 50;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class Foulcannon extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Foulcannon_img");
    // Override original data

    this.name = "Foulcannon";
    this.type = "artillery";
    this.description = "artillery / high-damage";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missleAttack = 240;
    this.missleRange = 10;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new SlaveConscript(pos[0]),
    new HurlerGas(pos[1]),
    new HurlerFrgm(pos[2]),
    new HurlerHE(pos[3]),
    new WeapSqdGingall(pos[4]),
    new WeapSqdGatlin(pos[5]),
    new WeapSqdFlthr(pos[6]),
    new MutantSlave(pos[7]),
    new Foulcannon(pos[8]),
  ];
  return arms;
}

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new SlaveConscript(pos);
  if (i === 1) return new HurlerGas(pos);
  if (i === 2) return new HurlerFrgm(pos);
  if (i === 3) return new HurlerHE(pos);
  if (i === 4) return new WeapSqdGingall(pos);
  if (i === 5) return new WeapSqdGatlin(pos);
  if (i === 6) return new WeapSqdFlthr(pos);
  if (i === 7) return new MutantSlave(pos);
  if (i === 8) return new Foulcannon(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/polluteland/SlaveConscript.png");
  images.push("../images/polluteland/HurlerGas.png");
  images.push("../images/polluteland/HurlerFrgm.png");
  images.push("../images/polluteland/HurlerHE.png");
  images.push("../images/polluteland/WeapSqdGingall.png");
  images.push("../images/polluteland/WeapSqdGatlin.png");
  images.push("../images/polluteland/WeapSqdFlthr.png");
  images.push("../images/polluteland/MutantSlave.png");
  images.push("../images/polluteland/Foulcannon.png");

  return images;
}
