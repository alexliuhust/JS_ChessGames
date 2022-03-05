import * as ArmPrimary from "../arm.js";

export class HenchWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hench Warrior";
    this.m_name = "亲卫勇士";
    this.type = "infantry";
    this.description = "armor-shield-infantry";
    this.m_description = "装甲-持盾-近战步兵";

    this.scale = 64;
    this.singleHP = 70;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missileArmor = 50;
    this.chargeArmor = 40;

    this.meleeAttack = 35;

    this.loadRealtimeProps();
  }
}

export class HenchWarriorHalberd extends HenchWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Hench Warrior (Halberd)";
    this.m_name = "亲卫勇士-长戟";
    this.type = "infantry";
    this.description = "armor-infantry / anti-large";
    this.m_description = "装甲-近战步兵【反大型】";

    this.meleeArmor = 40;
    this.missileArmor = 40;
    this.chargeArmor = 60;

    this.meleeAttack = 28;
    this.meleeAttack_bonus = 26;

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

export class HenchWarriorGiantaxe extends HenchWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Hench Warrior (Giant Axe)";
    this.m_name = "亲卫勇士-巨斧";
    this.type = "infantry";
    this.description = "armor-infantry / anti-armor";
    this.m_description = "装甲-近战步兵【高破甲】";

    this.meleeArmor = 40;
    this.missileArmor = 40;
    this.chargeArmor = 40;

    this.meleeAttack = 38;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class BurningKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Knight";
    this.m_name = "燃烧骑士";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor";
    this.m_description = "近战骑兵【重装甲】";

    this.scale = 32;
    this.singleHP = 130;
    this.speed = 4;

    this.meleeArmor = 50;
    this.missileArmor = 60;
    this.chargeArmor = 50;

    this.meleeAttack = 40;

    this.loadRealtimeProps();
  }
}

export class BurningKnightHalberd extends BurningKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Knight (Halberd)";
    this.m_name = "燃烧骑士-长戟";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor / anti-large";
    this.m_description = "近战骑兵【重装甲，反大型】";

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.chargeArmor = 70;

    this.meleeAttack = 30;
    this.meleeAttack_bonus = 26;

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

export class BurningKnightCharge extends BurningKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Knight (Charge)";
    this.m_name = "燃烧骑士-冲杀";
    this.type = "cavalry";
    this.description = "charge-cavalry / heavy-armor";
    this.m_description = "冲杀骑兵【重装甲】";

    this.speed = 6;

    this.meleeArmor = 40;
    this.missileArmor = 40;
    this.chargeArmor = 60;

    this.meleeAttack = 30;
    this.chargeAttack = 60;

    this.loadRealtimeProps();
  }
}

export class Hellhound extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hell Hound";
    this.m_name = "地狱猎犬";
    this.type = "cavalry";
    this.description = "monster-cavalry / fast";
    this.m_description = "怪兽骑兵【迅捷如风】";

    this.scale = 100;
    this.singleHP = 25;
    this.speed = 7;

    this.missileDodge = 60;

    this.meleeAttack = 6;
    this.chargeAttack = 10;

    this.loadRealtimeProps();
  }
}

export class HellhoundFS extends Hellhound {
  constructor(value, player) {
    super(value, player);

    this.name = "Hell Hound (Fire Shied)";
    this.m_name = "地狱猎犬-火盾";
    this.type = "cavalry";
    this.description = "monster-cavalry / fast";
    this.m_description = "怪兽骑兵【迅捷如风】";

    this.meleeDodge = 60;

    this.meleeAttack = 8;
    this.chargeAttack = 12;

    this.loadRealtimeProps();
  }
}

export class DemonEnvoy extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Demon Envoy";
    this.m_name = "恶魔使者";
    this.type = "monster-infantry";
    this.description = "monster-infantry / anti-armor / shocking";
    this.m_description = "怪兽步兵【高破甲，惊骇敌军】";

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 5;

    this.meleeAttack = 55;

    this.antiArmor = 50;
    this.shock = 50;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class DemonEnvoyWild extends DemonEnvoy {
  constructor(value, player) {
    super(value, player);

    this.name = "Demon Envoy (Wild)";
    this.m_name = "恶魔使者-狂暴";
    this.type = "monster-infantry";
    this.description = "monster-infantry / anti-armor / shocking";
    this.m_description = "怪兽步兵【高破甲，惊骇敌军】";

    this.chargeAttack = 55;

    this.loadRealtimeProps();
  }
}

export class DemonEnvoyHellfire extends DemonEnvoy {
  constructor(value, player) {
    super(value, player);

    this.name = "Demon Envoy (Hellfire)";
    this.m_name = "恶魔使者-地狱火";
    this.type = "monster-infantry";
    this.description = "monster-infantry / missile-attack / shocking";
    this.m_description = "怪兽步兵【远程攻击，惊骇敌军】";

    this.missileAttack = 90;
    this.missileRange = 6;

    this.ammo = 15;
    this.antiArmor = 0;
    this.shock = 50;
    this.loadRealtimeProps();
  }
}

export class GreatDemon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Chaos Great Demon";
    this.m_name = "混沌大魔";
    this.type = "monster";
    this.description = "giant / anti-armor / shocking";
    this.m_description = "巨兽【高破甲，惊骇敌军】";

    this.scale = 1;
    this.singleHP = 2000;
    this.speed = 4;

    this.meleeAttack = 1000;

    this.antiArmor = 70;

    this.shock = 80;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class GreatDemonHellfire extends GreatDemon {
  constructor(value, player) {
    super(value, player);

    this.name = "Chaos Great Demon (Hellfire)";
    this.m_name = "混沌大魔-地狱火";
    this.type = "monster";
    this.description = "giant / anti-armor / missile-attack / shocking";
    this.m_description = "巨兽【高破甲，远程攻击，惊骇敌军】";

    this.missileAttack = 800;
    this.missileRange = 6;

    this.ammo = 20;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new HenchWarrior(pos, player);
  if (i === 1) return new HenchWarriorHalberd(pos, player);
  if (i === 2) return new HenchWarriorGiantaxe(pos, player);
  if (i === 3) return new Hellhound(pos, player);
  if (i === 4) return new HellhoundFS(pos, player);
  if (i === 5) return new BurningKnight(pos, player);
  if (i === 6) return new BurningKnightHalberd(pos, player);
  if (i === 7) return new BurningKnightCharge(pos, player);
  if (i === 8) return new DemonEnvoy(pos, player);
  if (i === 9) return new DemonEnvoyWild(pos, player);
  if (i === 10) return new DemonEnvoyHellfire(pos, player);
  if (i === 11) return new GreatDemon(pos, player);
  if (i === 12) return new GreatDemonHellfire(pos, player);

  return null;
}
