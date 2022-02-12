import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class SlaveConscript extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SlaveConscript_img");
    // Override original data

    this.name = "Slave Conscript";
    this.m_name = "奴隶征召兵";
    this.type = "infantry";
    this.description = "shield-infantry / weak";
    this.m_description = "持盾-近战步兵【孱弱】";

    this.scale = 100;
    this.singleHP = 30;
    this.speed = 4;

    this.meleeArmor = 0;
    this.missileArmor = 20;
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
    this.m_name = "投掷小队-毒气弹";
    this.type = "archers";
    this.description = "armor-archers / anti-armor";
    this.m_description = "装甲-远程步兵【高破甲】";

    this.scale = 60;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 16;
    this.missileAttack = 16;
    this.missileRange = 3;

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

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class HurlerFrgm extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HurlerFrgm_img");
    // Override original data

    this.name = "Hurler (Fragmentation)";
    this.m_name = "投掷小队-破片弹";
    this.type = "archers";
    this.description = "armor-archers / anti-infantry";
    this.m_description = "装甲-远程步兵【反步兵】";

    this.scale = 60;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 16;
    this.missileAttack = 16;
    this.missileAttack_bonus = 20;
    this.missileRange = 3;

    this.ammo = 12;
    this.c_ammo = this.ammo;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile") {
      singleDamage = this.c_missileAttack;
    }

    if (damageType === "missile" && targetArm.isInfn()) {
      singleDamage += this.missileAttack_bonus;
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
    this.m_name = "投掷小队-高爆弹";
    this.type = "archers";
    this.description = "armor-archers / high-damage";
    this.m_description = "装甲-远程步兵【高伤害】";

    this.scale = 60;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 16;
    this.missileAttack = 32;
    this.missileRange = 3;

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
    this.m_name = "武器小队-火枪";
    this.type = "archers";
    this.description = "shield-archers / anti-large";
    this.m_description = "持盾-远程步兵【反大型】";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.missileArmor = 40;

    this.meleeAttack = 16;
    this.missileAttack = 30;
    this.missileAttack_bonus = 60;
    this.missileRange = 6;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile") {
      singleDamage = this.c_missileAttack;
    }

    if (damageType === "missile" && targetArm.isLarge()) {
      singleDamage += this.missileAttack_bonus;
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
    this.m_name = "武器小队-加特林";
    this.type = "archers";
    this.description = "shield-archers / anti-infantry";
    this.m_description = "持盾-远程步兵【反步兵】";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.missileArmor = 40;

    this.meleeAttack = 16;
    this.missileAttack = 38;
    this.missileAttack_bonus = 50;
    this.missileRange = 6;

    this.ammo = 10;
    this.loadRealtimeProps();

    this.ammo = 200;
    this.c_ammo = this.ammo;
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile") {
      singleDamage = this.c_missileAttack;
    }

    if (damageType === "missile" && targetArm.isInfn()) {
      if (targetArm.c_missileArmor > 0)
        singleDamage += this.missileAttack_bonus / 5;
      else singleDamage += this.missileAttack_bonus;
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
    this.m_name = "武器小队-火喷器";
    this.type = "archers";
    this.description = "shield-archers / anti-non-armor";
    this.m_description = "持盾-远程步兵【反无甲】";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.missileArmor = 40;

    this.meleeAttack = 16;
    this.missileAttack = 32;
    this.missileAttack_bonus = 70;
    this.missileRange = 3;

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
    } else if (damageType === "missile") {
      singleDamage = this.c_missileAttack;
    }

    if (
      damageType === "missile" &&
      (targetArm.c_meleeArmor === 0 || targetArm.c_missileArmor === 0)
    ) {
      singleDamage += this.missileAttack_bonus;
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
    this.m_name = "变异奴隶";
    this.type = "monster-infantry";
    this.description = "monster-infantry / fast / shocking";
    this.m_description = "怪兽步兵【迅捷如风，惊骇敌军】";

    this.scale = 20;
    this.singleHP = 200;
    this.speed = 6;

    this.meleeDodge = 50;

    this.meleeAttack = 52;

    this.shock = 50;

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

    this.name = "Foul Cannon";
    this.m_name = "污秽加农炮";
    this.type = "artillery";
    this.description = "artillery / high-damage / shocking";
    this.m_description = "炮兵【高伤害，惊骇敌军】";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missileAttack = 320;
    this.missileRange = 10;

    this.shock = 75;

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
