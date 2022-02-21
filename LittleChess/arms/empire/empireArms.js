import * as ArmPrimary from "../arm.js";

export class SwordInfantry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Infantry";
    this.m_name = "帝国步兵";
    this.type = "infantry";
    this.description = "infantry / anti-infantry";
    this.m_description = "近战步兵【反步兵】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeAttack = 24;
    this.meleeAttack_bonus = 24;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class SwordInfantryShield extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Infantry (Shield)";
    this.m_name = "帝国步兵-持盾";
    this.type = "infantry";
    this.description = "shield-infantry / anti-infantry";
    this.m_description = "持盾-近战步兵【反步兵】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.missileArmor = 40;

    this.meleeAttack = 24;
    this.meleeAttack_bonus = 24;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class PalaceGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Guard";
    this.m_name = "帝国守卫";
    this.type = "infantry";
    this.description = "infantry / resist-charging / anti-large";
    this.m_description = "近战步兵【抵御冲锋，反大型】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.chargeArmor = 40;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 28;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class PalaceGuardShield extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Guard (Shield)";
    this.m_name = "帝国守卫-持盾";
    this.type = "infantry";
    this.description = "shield-infantry / resist-charging / anti-large";
    this.m_description = "持盾-近战步兵【抵御冲锋，反大型】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.missileArmor = 40;
    this.chargeArmor = 40;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 28;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class Musketeer extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Musketeer";
    this.m_name = "火枪手";
    this.type = "archers";
    this.description = "archers / anti-armor";
    this.m_description = "远程步兵【高破甲】";

    this.scale = 48;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 48;
    this.missileRange = 6;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class MusketeerShield extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Musketeer (Shield)";
    this.m_name = "火枪手-持盾";
    this.type = "archers";
    this.description = "shield-archers / anti-armor";
    this.m_description = "持盾-远程步兵【高破甲】";

    this.scale = 48;
    this.singleHP = 50;
    this.speed = 3;

    this.missileArmor = 40;

    this.meleeAttack = 16;
    this.missileAttack = 48;
    this.missileRange = 6;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class MusketRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Musket Rider";
    this.m_name = "火枪骑兵";
    this.type = "cavalry";
    this.description = "missile-cavalry / anti-armor";
    this.m_description = "远程骑兵【高破甲】";

    this.scale = 32;
    this.singleHP = 90;
    this.speed = 6;

    this.missileDodge = 40;

    this.meleeAttack = 24;
    this.missileAttack = 48;
    this.missileRange = 6;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Vanguard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Vanguard";
    this.m_name = "先锋骑兵";
    this.type = "cavalry";
    this.description = "charging-cavalry / anti-armor";
    this.m_description = "冲击骑兵【高破甲】";

    this.scale = 32;
    this.singleHP = 90;
    this.speed = 6;

    this.meleeArmor = 30;
    this.missileDodge = 40;

    this.meleeAttack = 24;
    this.chargeAttack = 76;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class PalaceKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Palace Knight";
    this.m_name = "大殿骑士";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor / anti-infantry";
    this.m_description = "近战骑兵【重装甲，反步兵】";

    this.scale = 32;
    this.singleHP = 100;
    this.speed = 4;

    this.meleeArmor = 60;
    this.missileArmor = 50;
    this.chargeArmor = 50;

    this.meleeAttack = 60;
    this.meleeAttack_bonus = 30;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class CannonGroup extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Cannon Group";
    this.m_name = "加农炮组";
    this.type = "artillery";
    this.description = "artillery / anti-armor";
    this.m_description = "炮兵【高破甲】";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missileAttack = 230;
    this.missileRange = 12;

    this.antiArmor = 70;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class EmpireMortar extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Mortar";
    this.m_name = "帝国臼炮";
    this.type = "artillery";
    this.description = "bombing-artillery";
    this.m_description = "轰炸炮兵";

    this.scale = 5;
    this.singleHP = 300;
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

    this.name = "Steam Tank";
    this.m_name = "蒸汽坦克";
    this.type = "monster";
    this.description = "mech / heavy-armor / missile-attack";
    this.m_description = "机甲【重装甲，远程攻击】";

    this.scale = 1;
    this.singleHP = 400;
    this.speed = 3;

    this.meleeArmor = 95;
    this.missileArmor = 70;
    this.chargeArmor = 70;

    this.chargeAttack = 300;
    this.missileAttack = 1000;
    this.missileRange = 7;

    this.antiArmor = 70;

    this.ammo = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class SteamTankMortar extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Steam Tank (Mortar)";
    this.m_name = "蒸汽坦克-臼炮";
    this.type = "monster";
    this.description = "bombing-mech / heavy-armor / missile-attack";
    this.m_description = "轰炸机甲【重装甲，远程攻击】";

    this.scale = 1;
    this.singleHP = 400;
    this.speed = 3;

    this.meleeArmor = 95;
    this.missileArmor = 70;
    this.chargeArmor = 70;

    this.missileAttack = 1200;
    this.missileRange = 10;
    this.missileRadius = 1;
    this.isBombing = true;

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
  if (i === 4) return new Musketeer(pos, player);
  if (i === 5) return new MusketeerShield(pos, player);
  if (i === 6) return new MusketRider(pos, player);
  if (i === 7) return new Vanguard(pos, player);
  if (i === 8) return new PalaceKnight(pos, player);
  if (i === 9) return new CannonGroup(pos, player);
  if (i === 10) return new EmpireMortar(pos, player);
  if (i === 11) return new SteamTank(pos, player);
  if (i === 12) return new SteamTankMortar(pos, player);

  return null;
}
