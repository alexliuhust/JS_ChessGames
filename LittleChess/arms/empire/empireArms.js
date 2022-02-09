import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class SwordInfantry extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SwordInfantry_img");
    // Override original data

    this.name = "Sword Infantry";
    this.m_name = "剑盾步兵";
    this.type = "infantry";
    this.description = "shield-infantry / anti-infantry";
    this.m_description = "持盾-近战步兵【反步兵】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 20;
    this.missileArmor = 50;
    this.chargeArmor = 0;

    this.meleeAttack = 24;
    this.meleeAttack_bonus = 12;

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

export class PalaceGuard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("PalaceGuard_img");
    // Override original data

    this.name = "Palace Guard";
    this.m_name = "宫廷守卫";
    this.type = "infantry";
    this.description = "infantry / resist-charging / anti-large";
    this.m_description = "近战步兵【抵御冲锋，反大型】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 20;
    this.missileArmor = 0;
    this.chargeArmor = 80;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 24;

    this.antiArmor = 16;

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
        targetType === "monster" ||
        targetType === "monster-infantry")
    ) {
      singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class Musketeer extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Musketeer_img");
    // Override original data

    this.name = "Musketeer";
    this.m_name = "火枪手";
    this.type = "archers";
    this.description = "archers";
    this.m_description = "远程步兵";

    this.scale = 48;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 48;
    this.missileRange = 6;

    this.antiArmor = 10;

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

export class MusketRider extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("MusketRider_img");
    // Override original data

    this.name = "Musket Rider";
    this.m_name = "火枪骑兵";
    this.type = "cavalry";
    this.description = "missile-cavalry";
    this.m_description = "远程骑兵";

    this.scale = 32;
    this.singleHP = 90;
    this.speed = 6;

    this.missileDodge = 40;

    this.meleeAttack = 24;
    this.missileAttack = 48;
    this.missileRange = 6;

    this.antiArmor = 10;

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

export class Vanguard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Vanguard_img");
    // Override original data

    this.name = "Vanguard";
    this.m_name = "先锋骑兵";
    this.type = "cavalry";
    this.description = "charging-cavalry / anti-armor";
    this.m_description = "冲击骑兵【高破甲】";

    this.scale = 32;
    this.singleHP = 90;
    this.speed = 6;

    this.meleeArmor = 30;
    this.missileArmor = 10;
    this.missileDodge = 40;

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

    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class PalaceKnight extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("PalaceKnight_img");
    // Override original data

    this.name = "Palace Knight";
    this.m_name = "禁卫骑士";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor";
    this.m_description = "近战骑兵【重装甲】";

    this.scale = 32;
    this.singleHP = 100;
    this.speed = 4;

    this.meleeArmor = 70;
    this.missileArmor = 70;
    this.chargeArmor = 70;

    this.meleeAttack = 48;

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
    this.m_name = "加农炮组";
    this.type = "artillery";
    this.description = "artillery / anti-armor";
    this.m_description = "炮兵【高破甲】";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missileAttack = 150;
    this.missileRange = 12;

    this.antiArmor = 50;

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

export class EmpireMortar extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("EmpireMortar_img");
    // Override original data

    this.name = "Empire Mortar";
    this.m_name = "帝国臼炮";
    this.type = "artillery";
    this.description = "bombing-artillery";
    this.m_description = "轰炸炮兵";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missileAttack = 190;
    this.missileRange = 10;
    this.missileRadius = 2;
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
    this.m_name = "蒸汽坦克";
    this.type = "monster";
    this.description = "mech / heavy-armor / missile-attack";
    this.m_description = "机甲【重装甲，远程攻击】";

    this.scale = 1;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 100;
    this.missileArmor = 50;
    this.missileDodge = 50;
    this.chargeArmor = 75;

    this.meleeAttack = 300;
    this.missileAttack = 500;
    this.missileRange = 7;

    this.antiArmor = 60;

    this.ammo = 30;
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

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new SwordInfantry(pos);
  if (i === 1) return new PalaceGuard(pos);
  if (i === 2) return new Musketeer(pos);
  if (i === 3) return new MusketRider(pos);
  if (i === 4) return new Vanguard(pos);
  if (i === 5) return new PalaceKnight(pos);
  if (i === 6) return new CannonGroup(pos);
  if (i === 7) return new EmpireMortar(pos);
  if (i === 8) return new SteamTank(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/empire/SwordInfantry.png");
  images.push("../images/empire/PalaceGuard.png");
  images.push("../images/empire/Musketeer.png");
  images.push("../images/empire/MusketRider.png");
  images.push("../images/empire/Vanguard.png");
  images.push("../images/empire/PalaceKnight.png");
  images.push("../images/empire/CannonGroup.png");
  images.push("../images/empire/EmpireMortar.png");
  images.push("../images/empire/SteamTank.png");

  return images;
}
