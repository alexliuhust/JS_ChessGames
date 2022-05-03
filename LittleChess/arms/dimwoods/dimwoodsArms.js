import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { updateEliteData } from "../armTools.js";

export class WoodsGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Woods Guards";
    this.m_name = "林地守卫";
    this.type = "infantry";
    this.description = "infantry [resist-charging]";
    this.m_description = "近战步兵【抵御冲锋】";

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 3;

    this.chargeArmor = 40;

    this.meleeAttack = 24;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class WoodsGuardShield extends WoodsGuard {
  constructor(value, player) {
    super(value, player);

    this.name = "Woods Guards (Shield)";
    this.m_name = "林地守卫-持盾";
    this.type = "infantry";
    this.description = "shield-infantry [resist-charging]";
    this.m_description = "持盾-近战步兵【抵御冲锋】";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class WildKiller extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Wild Killers";
    this.m_name = "狂野杀手";
    this.type = "infantry";
    this.description = "infantry [melee-master, shocking]";
    this.m_description = "近战步兵【近战大师，惊骇敌军】";

    this.scale = 120;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 40;

    this.meleeAttack = 30;
    this.meleeAttack_bonus = 35;
    this.chargeAttack = 30;

    this.shock = 30;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
    }

    return singleDamage;
  }
}

export class WildKillerPS extends WildKiller {
  constructor(value, player) {
    super(value, player);

    this.name = "Wild Killers (Poisoned)";
    this.m_name = "狂野杀手-淬毒";
    this.type = "infantry";
    this.description = "infantry [melee-master, shocking, anti-non-armor]";
    this.m_description = "近战步兵【近战大师，惊骇敌军，反无甲】";

    this.meleeAttack_bonus = 70;
    this.chargeAttack_bonus = 70;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) {
        singleDamage += this.meleeAttack_bonus / 2;
        if (targetArm.c_meleeArmor === 0)
          singleDamage += this.meleeAttack_bonus / 2;
      }
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
      if (targetArm.isInfn()) {
        singleDamage += this.meleeAttack_bonus / 2;
        if (targetArm.c_meleeArmor === 0)
          singleDamage += this.meleeAttack_bonus / 2;
      }
    }

    return singleDamage;
  }
}

export class TwilightWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Twilight Warriors";
    this.m_name = "暮光战士";
    this.type = "infantry";
    this.description = "shield-infantry [high-damage]";
    this.m_description = "持盾-近战步兵【高伤害】";

    this.scale = 100;
    this.singleHP = 70;
    this.speed = 3;

    this.missileArmor = 40;
    this.meleeDodge = 20;
    this.missileDodge = 20;
    this.chargeDodge = 20;

    this.meleeAttack = 50;
    this.loadRealtimeProps();
  }
}

export class TwilightWarriorE extends TwilightWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Twilight Warriors";
    this.m_name = "精英暮光战士";
    this.type = "infantry";
    this.description = "shield-infantry [high-damage, protector]";
    this.m_description = "持盾-近战步兵【高伤害，护卫者】";

    this.armorEnhance = 30;
    this.enhanceRange = 2;
    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class ShadowArcherFL extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 4;

    this.name = "Shadow Archers (Flame)";
    this.m_name = "暗影弓手-火焰箭";
    this.type = "archers";
    this.description = "melee-archers [high-damage]";
    this.m_description = "近战-远程步兵【高伤害】";

    this.scale = 90;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 30;
    this.missileAttack = 60;
    this.missileRange = 6;
    this.isParabola = true;

    this.ammo = 30;
    this.loadRealtimeProps();
  }
}

export class ShadowArcherPS extends ShadowArcherFL {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.PoisonColor;
    this.missileWeight = 2;

    this.name = "Shadow Archers (Poisoned)";
    this.m_name = "暗影弓手-淬毒箭";
    this.type = "archers";
    this.description = "melee-archers [anti-non-armor]";
    this.m_description = "近战-远程步兵【反无甲】";

    this.meleeAttack_bonus = 15;
    this.missileAttack = 36;
    this.missileAttack_bonus = 15;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.c_meleeArmor === 0) singleDamage += this.meleeAttack_bonus;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.c_missileArmor === 0)
        singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class ShadowArcherAP extends ShadowArcherFL {
  constructor(value, player) {
    super(value, player);
    this.missileColor = null;
    this.missileWeight = 2;

    this.name = "Shadow Archers (Armor-Piercing)";
    this.m_name = "暗影弓手-穿甲箭";
    this.type = "archers";
    this.description = "melee-archers [anti-armor]";
    this.m_description = "近战-远程步兵【高破甲】";

    this.missileAttack = 36;

    this.antiArmor = 30;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class LongbowRanger extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Longbow Rangers";
    this.m_name = "长弓游侠";
    this.type = "archers";
    this.description = "long-range-archers [anti-armor]";
    this.m_description = "长程-远程步兵【高破甲】";

    this.scale = 90;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 30;
    this.missileAttack = 60;
    this.missileRange = 11;
    this.isParabola = true;

    this.antiArmor = 30;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class WarBear extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "War Bears";
    this.m_name = "战熊";
    this.type = "monster-infantry";
    this.description = "monster-infantry [fast]";
    this.m_description = "怪兽步兵【迅捷如风】";

    this.scale = 30;
    this.singleHP = 240;
    this.speed = 6;

    this.missileDodge = 30;

    this.meleeAttack = 50;
    this.chargeAttack = 70;

    this.loadRealtimeProps();
  }
}

export class WarBearRider extends WarBear {
  constructor(value, player) {
    super(value, player);

    this.name = "War Bear Riders";
    this.m_name = "战熊骑兵";
    this.type = "monster-infantry";
    this.description = "monster-cavalry [high-damage]";
    this.m_description = "怪兽步兵【高伤害】";

    this.meleeDodge = 10;

    this.meleeAttack = 64;
    this.loadRealtimeProps();
  }
}

export class WarBearRiderE extends WarBearRider {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite War Bear Riders";
    this.m_name = "精英战熊骑兵";
    this.type = "monster-infantry";
    this.description = "monster-cavalry [high-damage, inspirator]";
    this.m_description = "怪兽步兵【高伤害，鼓舞者】";

    this.inspiring = 15;
    this.inspireRange = 3;
    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class Dryad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dryads";
    this.m_name = "树精";
    this.type = "monster-infantry";
    this.description = "monster-infantry [heavy-armor]";
    this.m_description = "怪兽步兵【重装甲】";

    this.scale = 30;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missileArmor = 60;
    this.chargeArmor = 40;

    this.meleeAttack = 30;

    this.loadRealtimeProps();
  }
}

export class DryadHeal extends Dryad {
  constructor(value, player) {
    super(value, player);

    this.name = "Dryad (Healing)";
    this.m_name = "树精-治疗";
    this.type = "monster-infantry";
    this.description = "monster-infantry [heavy-armor, healer]";
    this.m_description = "怪兽步兵【重装甲, 治疗者】";

    this.healing = 10;
    this.healRange = 3;
    this.totalHeal = 200;
    this.loadRealtimeProps();
  }
}

export class DryadRangerRide extends Dryad {
  constructor(value, player) {
    super(value, player);

    this.name = "Dryads (Ranger-Ride)";
    this.m_name = "树精-游侠搭乘";
    this.type = "monster-infantry";
    this.description = "monster-infantry [heavy-armor, missile-attack]";
    this.m_description = "怪兽步兵【重装甲，远程攻击】";

    this.missileAttack = 60;
    this.missileRange = 11;
    this.isParabola = true;

    this.antiArmor = 30;

    this.ammo = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class DryadStone extends Dryad {
  constructor(value, player) {
    super(value, player);

    this.name = "Dryads (Stone)";
    this.m_name = "树精-投石";
    this.type = "monster-infantry";
    this.description = "monster-infantry [heavy-armor, missile-attack]";
    this.m_description = "怪兽步兵【重装甲，远程攻击】";

    this.missileAttack = 60;
    this.missileRange = 10;
    this.missileRadius = 1;
    this.isBombing = true;

    this.ammo = 15;
    this.loadRealtimeProps();
  }
}

export class GiantTreeman extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Giant Treeman";
    this.m_name = "巨树人";
    this.type = "monster";
    this.description = "giant [heavy-armor, healer]";
    this.m_description = "巨兽【重装甲，治疗者】";

    this.scale = 1;
    this.singleHP = 8000;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missileArmor = 60;
    this.chargeArmor = 60;

    this.meleeAttack = 800;

    this.healing = 8;
    this.healRange = 4;
    this.totalHeal = 120;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new WoodsGuard(pos, player);
  if (i === 1) return new WoodsGuardShield(pos, player);
  if (i === 2) return new WildKiller(pos, player);
  if (i === 3) return new WildKillerPS(pos, player);
  if (i === 4) return new TwilightWarrior(pos, player);
  if (i === 5) return new TwilightWarriorE(pos, player);
  if (i === 6) return new ShadowArcherAP(pos, player);
  if (i === 7) return new ShadowArcherPS(pos, player);
  if (i === 8) return new ShadowArcherFL(pos, player);
  if (i === 9) return new LongbowRanger(pos, player);
  if (i === 10) return new WarBear(pos, player);
  if (i === 11) return new WarBearRider(pos, player);
  if (i === 12) return new WarBearRiderE(pos, player);
  if (i === 13) return new Dryad(pos, player);
  if (i === 14) return new DryadHeal(pos, player);
  if (i === 15) return new DryadRangerRide(pos, player);
  if (i === 16) return new DryadStone(pos, player);
  if (i === 17) return new GiantTreeman(pos, player);

  return null;
}
