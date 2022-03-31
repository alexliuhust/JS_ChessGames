import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";

export class DwarfWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf Warriors";
    this.m_name = "矮人勇士";
    this.type = "infantry";
    this.description = "shield-infantry";
    this.m_description = "持盾-近战步兵";

    this.scale = 100;
    this.singleHP = 60;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missileArmor = 30;
    this.chargeArmor = 20;

    this.meleeAttack = 24;

    this.loadRealtimeProps();
  }
}

export class BoneBreaker extends DwarfWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Bone Breakers";
    this.m_name = "碎骨者";
    this.type = "infantry";
    this.description = "infantry [anti-large]";
    this.m_description = "近战步兵【反大型】";

    this.missileArmor = 0;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 60;

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

export class Berserker extends DwarfWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Berserkers";
    this.m_name = "狂战士";
    this.type = "infantry";
    this.description = "infantry [high-damage]";
    this.m_description = "近战步兵【高伤害】";

    this.meleeArmor = 0;
    this.meleeDodge = 50;
    this.missileArmor = 0;

    this.meleeAttack = 72;

    this.loadRealtimeProps();
  }
}

export class DrawfKingsGuard extends DwarfWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Drawf King's Guards";
    this.m_name = "矮人王禁卫";
    this.type = "infantry";
    this.description = "armor-infantry [anti-large]";
    this.m_description = "装甲-近战步兵【反大型】";

    this.meleeArmor = 60;
    this.chargeArmor = 30;

    this.meleeAttack = 35;
    this.meleeAttack_bonus = 60;

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

export class MountainShocker extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 4;

    this.name = "Mountain Shockers";
    this.m_name = "震山矿工";
    this.type = "infantry";
    this.description = "giant-shield-infantry [high-missile-damage]";
    this.m_description = "巨盾步兵【高远程伤害】";

    this.scale = 100;
    this.singleHP = 60;
    this.speed = 2;

    this.missileArmor = 80;

    this.meleeAttack = 24;
    this.missileAttack = 100;
    this.missileRange = 3;

    this.ammo = 3;
    this.loadRealtimeProps();
  }
}

export class DwarfMusketeer extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf Musketeers";
    this.m_name = "矮人火枪手";
    this.type = "archers";
    this.description = "shield-archers [anti-armor]";
    this.m_description = "持盾-远程步兵【高破甲】";

    this.scale = 80;
    this.singleHP = 60;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missileArmor = 30;

    this.meleeAttack = 24;
    this.missileAttack = 40;
    this.missileRange = 6;

    this.antiArmor = 25;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class MortarSquad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mortar Squad";
    this.m_name = "迫击炮小组";
    this.type = "archers";
    this.description = "shield-archers [high-damage]";
    this.m_description = "持盾-远程步兵【高伤害】";

    this.scale = 80;
    this.singleHP = 60;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missileArmor = 30;

    this.meleeAttack = 24;
    this.missileAttack = 60;
    this.missileRange = 6;

    this.loadRealtimeProps();
  }
}

export class FireDragonSquad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Fire Dragon Squad";
    this.m_name = "火龙小组";
    this.type = "archers";
    this.description = "shield-archers [high-damage, inspiring]";
    this.m_description = "持盾-远程步兵【高伤害，鼓舞者】";

    this.scale = 80;
    this.singleHP = 60;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missileArmor = 30;

    this.meleeAttack = 24;
    this.missileAttack = 50;
    this.missileAttack_bonus = 30;
    this.missileRange = 3;

    this.inspiring = 10;
    this.inspireRange = 3;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class GoatCavalry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Goat Cavalry";
    this.m_name = "山羊骑兵";
    this.type = "cavalry";
    this.description = "charging-cavalry";
    this.m_description = "冲击骑兵";

    this.scale = 50;
    this.singleHP = 130;
    this.speed = 5;

    this.meleeArmor = 50;
    this.missileArmor = 30;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.chargeAttack = 64;

    this.loadRealtimeProps();
  }
}

export class GoatCavalryTA extends GoatCavalry {
  constructor(value, player) {
    super(value, player);

    this.name = "Goat Cavalry (Throw Axe)";
    this.m_name = "山羊骑兵-飞斧";
    this.type = "cavalry";
    this.description = "charging-cavalry [missile-attack]";
    this.m_description = "冲击骑兵【远程攻击】";

    this.missileAttack = 40;
    this.missileRange = 5;
    this.isParabola = true;

    this.ammo = 4;
    this.loadRealtimeProps();
  }
}

export class RevolvingCannon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 3;

    this.name = "Revolving Cannons";
    this.m_name = "转轮炮";
    this.type = "artillery";
    this.description = "artillery [anti-large]";
    this.m_description = "炮兵【反大型】";

    this.scale = 10;
    this.singleHP = 500;
    this.speed = 1;

    this.missileAttack = 120;
    this.missileAttack_bonus = 100;
    this.missileRange = 10;

    this.antiArmor = 70;

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isLarge()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class FireDragonGun extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 7;

    this.name = "Fire Dragon Guns";
    this.m_name = "火龙炮";
    this.type = "artillery";
    this.description = "artillery [anti-infantry, short-range]";
    this.m_description = "炮兵【反步兵，近程】";

    this.scale = 10;
    this.singleHP = 500;
    this.speed = 1;

    this.missileAttack = 160;
    this.missileAttack_bonus = 240;
    this.missileRange = 4;

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class DrawfMortar extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Drawf Mortars";
    this.m_name = "矮人臼炮";
    this.type = "artillery";
    this.description = "bombing-artillery";
    this.m_description = "轰炸炮兵";

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

export class GiantCannon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Giant Mortars";
    this.m_name = "巨型臼炮";
    this.type = "monster";
    this.description = "bombing-artillery";
    this.m_description = "轰炸炮兵";

    this.scale = 1;
    this.singleHP = 4000;
    this.speed = 1;

    this.missileAttack = 2200;
    this.missileRange = 13;
    this.missileRadius = 1;
    this.isBombing = true;

    this.ammo = 18;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new DwarfWarrior(pos, player);
  if (i === 1) return new BoneBreaker(pos, player);
  if (i === 2) return new Berserker(pos, player);
  if (i === 3) return new DrawfKingsGuard(pos, player);
  if (i === 4) return new MountainShocker(pos, player);
  if (i === 5) return new DwarfMusketeer(pos, player);
  if (i === 6) return new MortarSquad(pos, player);
  if (i === 7) return new FireDragonSquad(pos, player);
  if (i === 8) return new GoatCavalry(pos, player);
  if (i === 9) return new GoatCavalryTA(pos, player);
  if (i === 10) return new RevolvingCannon(pos, player);
  if (i === 11) return new FireDragonGun(pos, player);
  if (i === 12) return new DrawfMortar(pos, player);
  if (i === 13) return new GiantCannon(pos, player);

  return null;
}
