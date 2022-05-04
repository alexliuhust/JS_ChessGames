import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { updateEliteData } from "../armTools.js";

export class SwordInfantry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Infantry";
    this.m_name = "帝国步兵";
    this.type = "infantry";
    this.description = "infantry[anti-infantry]";
    this.m_description = "近战步兵[反步兵]";

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeAttack = 24;
    this.meleeAttack_bonus = 24;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class SwordInfantryShield extends SwordInfantry {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Infantry (Shield)";
    this.m_name = "帝国步兵-持盾";
    this.type = "infantry";
    this.description = "shield-infantry[anti-infantry]";
    this.m_description = "持盾-近战步兵[反步兵]";

    this.missileArmor = 30;
    this.loadRealtimeProps();
  }
}

export class SwordInfantryE extends SwordInfantryShield {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Empire Infantry";
    this.m_name = "精英帝国步兵";
    this.type = "infantry";
    this.description = "shield-infantry  rouser[anti-infantry]";
    this.m_description = "持盾-近战步兵 激励者[反步兵]";

    this.missileArmor = 30;

    this.attackEnhance = 20;
    this.enhanceRange = 1;
    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class PalaceGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Guards";
    this.m_name = "帝国守卫";
    this.type = "infantry";
    this.description = "infantry[resist-charging  anti-large]";
    this.m_description = "近战步兵[抵御冲锋 反大型]";

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    this.chargeArmor = 40;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 28;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class PalaceGuardShield extends PalaceGuard {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Guards (Shield)";
    this.m_name = "帝国守卫-持盾";
    this.type = "infantry";
    this.description = "shield-infantry[resist-charging  anti-large]";
    this.m_description = "持盾-近战步兵[抵御冲锋 反大型]";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class Musketeer extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Musketeers";
    this.m_name = "火枪手";
    this.type = "archers";
    this.description = "archers[anti-armor]";
    this.m_description = "远程步兵[高破甲]";

    this.scale = 80;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 24;
    this.missileRange = 6;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class MusketeerShield extends Musketeer {
  constructor(value, player) {
    super(value, player);

    this.name = "Musketeers (Shield)";
    this.m_name = "火枪手-持盾";
    this.type = "archers";
    this.description = "shield-archers[anti-armor]";
    this.m_description = "持盾-远程步兵[高破甲]";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class EmpireSniper extends Musketeer {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Snipers";
    this.m_name = "帝国狙击手";
    this.type = "archers";
    this.description = "archers[anti-armor  anti-large  long-range]";
    this.m_description = "远程步兵[高破甲 反大型 长程]";

    this.scale = 60;

    this.meleeAttack = 24;
    this.missileAttack = 30;
    this.missileAttack_bonus = 30;
    this.missileRange = 8;

    this.antiArmor = 50;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isLarge()) singleDamage += this.missileAttack_bonus;
    }

    return singleDamage;
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class EmpireSniperShield extends EmpireSniper {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Snipers (Shield)";
    this.m_name = "帝国狙击手-持盾";
    this.type = "archers";
    this.description = "sheild-archers[anti-armor  anti-large  long-range]";
    this.m_description = "持盾-远程步兵[高破甲 反大型 长程]";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class MusketeerE extends MusketeerShield {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Musketeers";
    this.m_name = "精英火枪手";
    this.type = "archers";
    this.description = "shield-archers[anti-armor]";
    this.m_description = "持盾-远程步兵[高破甲]";

    this.missileArmor = 30;
    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class MusketRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Musket Riders";
    this.m_name = "火枪骑兵";
    this.type = "cavalry";
    this.description = "missile-cavalry[anti-armor]";
    this.m_description = "远程骑兵[高破甲]";

    this.scale = 50;
    this.singleHP = 120;
    this.speed = 6;

    this.missileDodge = 40;

    this.meleeAttack = 24;
    this.missileAttack = 24;
    this.missileRange = 6;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Vanguard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Vanguards";
    this.m_name = "先锋骑兵";
    this.type = "cavalry";
    this.description = "charging-cavalry[anti-armor]";
    this.m_description = "冲击骑兵[高破甲]";

    this.scale = 50;
    this.singleHP = 120;
    this.speed = 6;

    this.meleeArmor = 30;
    this.missileDodge = 40;

    this.meleeAttack = 24;
    this.chargeAttack = 76;

    this.antiArmor = 30;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class PalaceKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Palace Knights";
    this.m_name = "大殿骑士";
    this.type = "cavalry";
    this.description = "armor-melee-cavalry[anti-infantry]";
    this.m_description = "装甲-近战骑兵[反步兵]";

    this.scale = 50;
    this.singleHP = 120;
    this.speed = 4;

    this.meleeArmor = 40;
    this.missileArmor = 60;
    this.chargeArmor = 50;

    this.meleeAttack = 60;
    this.meleeAttack_bonus = 30;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class PalaceKnightE extends PalaceKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Paladin";
    this.m_name = "圣骑士";
    this.type = "cavalry";
    this.description = "armor-melee-cavalry  protector[anti-infantry]";
    this.m_description = "装甲-近战骑兵 护卫者[反步兵]";

    this.armorEnhance = 40;
    this.enhanceRange = 3;
    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class CannonGroup extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 4;

    this.name = "Cannon Group";
    this.m_name = "加农炮组";
    this.type = "artillery";
    this.description = "artillery";
    this.m_description = "炮兵";

    this.scale = 5;
    this.singleHP = 800;
    this.speed = 1;

    this.missileAttack = 230;
    this.missileRange = 12;

    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class EmpireMortar extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Mortars";
    this.m_name = "帝国臼炮";
    this.type = "artillery";
    this.description = "artillery[bombing]";
    this.m_description = "炮兵[轰炸]";

    this.scale = 5;
    this.singleHP = 800;
    this.speed = 1;

    this.missileAttack = 250;
    this.missileRange = 10;
    this.missileRadius = 1;
    this.isBombing = true;

    this.loadRealtimeProps();
  }
}

export class SteamTank extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 4;
    this.missileNumber = 1;

    this.name = "Steam Tank";
    this.m_name = "蒸汽坦克";
    this.type = "monster";
    this.description = "armor-vehicle[missile-attack]";
    this.m_description = "装甲战车[远程攻击]";

    this.scale = 1;
    this.singleHP = 6000;
    this.speed = 3;

    this.meleeArmor = 90;
    this.missileArmor = 30;
    this.missileDodge = 30;
    this.chargeArmor = 30;

    this.missileAttack = 750;
    this.missileRange = 7;

    this.chargeAttack = 600;

    this.antiArmor = 50;
    this.ammo = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class SteamTankMortar extends SteamTank {
  constructor(value, player) {
    super(value, player);
    this.missileColor = null;

    this.name = "Steam Tank (Mortar)";
    this.m_name = "蒸汽坦克-臼炮";
    this.type = "monster";
    this.description = "armor-vehicle[missile-attack  bombing]";
    this.m_description = "装甲战车[远程攻击 轰炸]";

    this.missileAttack = 900;
    this.missileRange = 10;
    this.missileRadius = 1;
    this.isBombing = true;

    this.antiArmor = 0;
    this.ammo = 15;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new SwordInfantry(pos, player);
  if (i === 1) return new SwordInfantryShield(pos, player);
  if (i === 2) return new PalaceGuard(pos, player);
  if (i === 3) return new PalaceGuardShield(pos, player);
  if (i === 4) return new SwordInfantryE(pos, player);
  if (i === 5) return new Musketeer(pos, player);
  if (i === 6) return new MusketeerShield(pos, player);
  if (i === 7) return new EmpireSniper(pos, player);
  if (i === 8) return new EmpireSniperShield(pos, player);
  if (i === 9) return new MusketeerE(pos, player);
  if (i === 10) return new MusketRider(pos, player);
  if (i === 11) return new Vanguard(pos, player);
  if (i === 12) return new PalaceKnight(pos, player);
  if (i === 13) return new PalaceKnightE(pos, player);
  if (i === 14) return new SteamTank(pos, player);
  if (i === 15) return new SteamTankMortar(pos, player);
  if (i === 16) return new CannonGroup(pos, player);
  if (i === 17) return new EmpireMortar(pos, player);
  return null;
}
