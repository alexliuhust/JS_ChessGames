import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { updateEliteData } from "../armTools.js";

export class DarkSoldier extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldiers";
    this.m_name = "黑暗战士";
    this.type = "infantry";
    this.description = "Infantry[Resist-Charging]";
    this.m_description = "近战步兵[抵御冲锋]";

    this.scale = 120;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 20;

    this.loadRealtimeProps();
  }
}

export class DarkSoldierSheild extends DarkSoldier {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldiers (Sheild)";
    this.m_name = "黑暗战士-持盾";
    this.type = "infantry";
    this.description = "Infantry[Resist-Charging]";
    this.m_description = "近战步兵[抵御冲锋]";

    this.missileArmor = 30;
    this.loadRealtimeProps();
  }
}

export class DarkSoldierScythe extends DarkSoldier {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldiers (Scythe)";
    this.m_name = "黑暗战士-巨镰";
    this.type = "infantry";
    this.description = "Infantry[Anti-Large]";
    this.m_description = "近战步兵[反大型]";

    this.chargeArmor = 20;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 45;

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

export class DarkSoldierSS extends DarkSoldierScythe {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldiers (Scythe, Shield)";
    this.m_name = "黑暗战士-巨镰-持盾";
    this.type = "infantry";
    this.description = "Shield-Infantry[Anti-Large]";
    this.m_description = "持盾-近战步兵[反大型]";

    this.missileArmor = 30;
    this.loadRealtimeProps();
  }
}

export class DarkSoldierSSE extends DarkSoldierSS {
  constructor(value, player) {
    super(value, player);

    this.name = "Tomb Keeper";
    this.m_name = "墓穴守望者";
    this.type = "infantry";
    this.description = "Shield-infantry  Protector[Elite  Anti-Large]";
    this.m_description = "持盾-近战步兵 护卫者[精英 反大型]";

    this.armorEnhance = 30;
    this.enhanceRange = 2;
    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class Banshee extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Banshees";
    this.m_name = "女妖";
    this.type = "infantry";
    this.description = "Infantry[High-Dodge  Shocking]";
    this.m_description = "近战步兵[高闪避 惊骇敌军]";

    this.scale = 120;
    this.singleHP = 40;
    this.speed = 6;

    this.meleeDodge = 40;
    this.missileDodge = 60;

    this.meleeAttack = 30;

    this.shock = 50;
    this.loadRealtimeProps();
  }
}

export class ScreamingBanshee extends Banshee {
  constructor(value, player) {
    super(value, player);

    this.name = "Screaming Banshees";
    this.m_name = "尖啸女妖";
    this.type = "infantry";
    this.description = "Charging-Infantry[High-Dodge  Shocking]";
    this.m_description = "冲杀-近战步兵[高闪避 惊骇敌军]";

    this.chargeAttack = 40;
    this.loadRealtimeProps();
  }
}

export class ScreamingBansheeGF extends Banshee {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.GhostColor;
    this.missileWeight = 4;

    this.name = "Banshees (Ghost Fire)";
    this.m_name = "女妖-鬼火";
    this.type = "archers";
    this.description = "Melee-Archers[High-Dodge  Anti-Infantry  Shocking]";
    this.m_description = "近战-远程步兵[高闪避 反步兵 惊骇敌军]";

    this.scale = 90;

    this.missileAttack = 30;
    this.missileAttack_bonus = 14;
    this.missileRange = 6;

    this.shock = 50;
    this.ammo = 18;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class DeathKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Knights";
    this.m_name = "死亡骑士";
    this.type = "cavalry";
    this.description = "Armor-Melee-Cavalry[Anti-Large]";
    this.m_description = "装甲-近战骑兵[反大型]";

    this.scale = 50;
    this.singleHP = 140;
    this.speed = 3;

    this.meleeArmor = 90;
    this.chargeArmor = 20;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 45;

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

export class DeathKnightDS extends DeathKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Knights (Double-Scythe)";
    this.m_name = "死亡骑士-双镰";
    this.type = "cavalry";
    this.description = "Armor-Melee-Cavalry[Monster-Hunter  High-Damage]";
    this.m_description = "装甲-近战骑兵[怪兽猎人 高伤害]";

    this.meleeAttack = 35;
    this.meleeAttack_bonus = 65;

    this.loadRealtimeProps();
  }
}

export class BeetleRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Beetle Riders";
    this.m_name = "甲虫骑兵";
    this.type = "monster-infantry";
    this.description = "Armor-Monster-Cavalry[Anti-Infantry]";
    this.m_description = "装甲-怪兽骑兵[反步兵]";

    this.scale = 30;
    this.singleHP = 240;
    this.speed = 3;

    this.meleeArmor = 60;
    this.missileArmor = 40;
    this.chargeArmor = 40;

    this.meleeAttack = 40;
    this.meleeAttack_bonus = 50;

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

export class FireBeetleRider extends BeetleRider {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 4;

    this.name = "Fire Beetle Riders";
    this.m_name = "火甲虫骑兵";
    this.type = "monster-infantry";
    this.description = "Armor-Monster-Cavalry[Missile-Attack]";
    this.m_description = "装甲-怪兽骑兵[远程攻击]";

    this.meleeAttack_bonus = 0;
    this.missileAttack = 60;
    this.missileRange = 3;

    this.ammo = 30;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") singleDamage = this.c_meleeAttack;
    else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class BeetleChargeRider extends BeetleRider {
  constructor(value, player) {
    super(value, player);

    this.name = "Beetle Charge Riders";
    this.m_name = "甲虫冲击骑兵";
    this.type = "monster-infantry";
    this.description = "Armor-Monster-Charging-Cavalry[Anti-Infantry]";
    this.m_description = "装甲-怪兽冲杀骑兵[反步兵]";

    this.speed = 4;

    this.chargeAttack = 70;

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

export class SpiritCoffinGF extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.GhostColor;

    this.name = "Spirit Coffin (Ghost Fire)";
    this.m_name = "灵棺-鬼火";
    this.type = "monster";
    this.description = "Vehicle[Bombing]";
    this.m_description = "战车[轰炸]";

    this.scale = 1;
    this.singleHP = 5000;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.missileAttack = 1200;
    this.missileRange = 9;
    this.isBombing = true;
    this.missileRadius = 1;

    this.ammo = 18;
    this.loadRealtimeProps();
  }
}

export class SpiritCoffinDG extends SpiritCoffinGF {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.GhostColor;

    this.name = "Spirit Coffin (Death Spirits)";
    this.m_name = "灵棺-死灵";
    this.type = "monster";
    this.description = "Vehicle  Healer[Bombing]";
    this.m_description = "战车 治疗者[轰炸]";

    this.missileAttack = 700;
    this.ammo = 8;

    this.healing = 12;
    this.healRange = 4;
    this.totalHeal = 150;
    this.loadRealtimeProps();
  }
}

export class SpiritCoffinBB extends SpiritCoffinGF {
  constructor(value, player) {
    super(value, player);
    this.missileColor = "white";

    this.name = "Spirit Coffin (Broken Bones)";
    this.m_name = "灵棺-碎骨";
    this.type = "monster";
    this.description = "Vehicle[Bombing  Large-Bombing-Radius]";
    this.m_description = "战车[轰炸 大轰炸半径]";

    this.missileAttack = 1100;

    this.missileRadius = 2;

    this.loadRealtimeProps();
  }
}

export class WraithSkeleton extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Wraith Skeleton";
    this.m_name = "缚灵骸骨";
    this.type = "monster";
    this.description = "Giant[Anti-Infantry  Shocking]";
    this.m_description = "巨兽[反步兵 惊骇敌军]";

    this.scale = 1;
    this.singleHP = 7000;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 700;
    this.meleeAttack_bonus = 420;

    this.shock = 50;
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

export class Werewolf extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Werewolf";
    this.m_name = "狼人";
    this.type = "monster";
    this.description = "Giant[High-Dodge  Anti-Large  Shocking]";
    this.m_description = "巨兽[高闪避 反大型 惊骇敌军]";

    this.scale = 1;
    this.singleHP = 5000;
    this.speed = 4;

    this.meleeDodge = 65;
    this.missileDodge = 65;
    this.chargeDodge = 50;

    this.meleeAttack = 800;
    this.meleeAttack_bonus = 600;

    this.shock = 90;
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

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new DarkSoldier(pos, player);
  if (i === 1) return new DarkSoldierSheild(pos, player);
  if (i === 2) return new DarkSoldierScythe(pos, player);
  if (i === 3) return new DarkSoldierSS(pos, player);
  if (i === 4) return new DarkSoldierSSE(pos, player);
  if (i === 5) return new Banshee(pos, player);
  if (i === 6) return new ScreamingBanshee(pos, player);
  if (i === 7) return new ScreamingBansheeGF(pos, player);
  if (i === 8) return new DeathKnight(pos, player);
  if (i === 9) return new DeathKnightDS(pos, player);
  if (i === 10) return new BeetleRider(pos, player);
  if (i === 11) return new FireBeetleRider(pos, player);
  if (i === 12) return new BeetleChargeRider(pos, player);
  if (i === 13) return new SpiritCoffinDG(pos, player);
  if (i === 14) return new SpiritCoffinGF(pos, player);
  if (i === 15) return new SpiritCoffinBB(pos, player);
  if (i === 16) return new WraithSkeleton(pos, player);
  if (i === 17) return new Werewolf(pos, player);

  return null;
}
