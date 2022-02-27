import * as ArmPrimary from "../arm.js";

export class DarkSoldier extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldier";
    this.m_name = "黑暗战士";
    this.type = "infantry";
    this.description = "infantry / resist-charging";
    this.m_description = "近战步兵【抵御冲锋】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 40;
    this.missileArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 20;

    this.antiArmor = 5;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class DarkSoldierScythe extends DarkSoldier {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldier (Scythe)";
    this.m_name = "黑暗战士-巨镰";
    this.type = "infantry";
    this.description = "infantry / anti-large";
    this.m_description = "近战步兵【反大型】";

    this.chargeArmor = 30;

    this.meleeAttack = 33;
    this.meleeAttack_bonus = 36;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

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

    this.name = "Dark Soldier (Scythe, Shield)";
    this.m_name = "黑暗战士-巨镰-持盾";
    this.type = "infantry";
    this.description = "shield-infantry / anti-large";
    this.m_description = "持盾-近战步兵【反大型】";

    this.missileArmor = 40;

    this.loadRealtimeProps();
  }
}

export class Banshee extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Banshee";
    this.m_name = "女妖";
    this.type = "infantry";
    this.description = "infantry / high-dodge / shocking";
    this.m_description = "近战步兵【高闪避，惊骇敌军】";

    this.scale = 32;
    this.singleHP = 40;
    this.speed = 6;

    this.meleeDodge = 40;
    this.missileDodge = 90;

    this.meleeAttack = 24;

    this.shock = 50;

    this.loadRealtimeProps();
  }
}

export class ScreamingBanshee extends Banshee {
  constructor(value, player) {
    super(value, player);

    this.name = "Screaming Banshee";
    this.m_name = "尖啸女妖";
    this.type = "infantry";
    this.description = "charge-infantry / high-dodge / shocking";
    this.m_description = "冲杀-近战步兵【高闪避，惊骇敌军】";

    this.chargeAttack = 38;

    this.loadRealtimeProps();
  }
}

export class ScreamingBansheeGF extends Banshee {
  constructor(value, player) {
    super(value, player);

    this.name = "Banshee (Ghost Fire)";
    this.m_name = "女妖-鬼火";
    this.type = "archers";
    this.description = "melee-archers / high-dodge / anti-infantry / shocking";
    this.m_description = "近战-远程步兵【高闪避，反步兵，惊骇敌军】";

    this.missileAttack = 30;
    this.missileAttack_bonus = 14;
    this.missileRange = 6;

    this.shock = 50;
    this.ammo = 18;
    this.loadRealtimeProps();
  }

  _getValidScale() {
    return Math.min(this.c_scale, Math.floor(this.scale / 4));
  }

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.missileAttack_bonus;
      this.ammo--;
    }

    return singleDamage;
  }
}

export class DeathKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Knight";
    this.m_name = "死亡骑士";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor";
    this.m_description = "近战骑兵【重装甲】";

    this.scale = 32;
    this.singleHP = 120;
    this.speed = 3;

    this.meleeArmor = 90;
    this.missileArmor = 90;
    this.chargeArmor = 30;

    this.meleeAttack = 35;

    this.loadRealtimeProps();
  }
}

export class DeathKnightDS extends DeathKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Knight (Double-Scythe)";
    this.m_name = "死亡骑士-双镰";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor / high-damage";
    this.m_description = "近战骑兵【重装甲，高伤害】";

    this.meleeAttack = 65;

    this.loadRealtimeProps();
  }
}

export class BeetleRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Beetle Rider";
    this.m_name = "甲虫骑兵";
    this.type = "monster-infantry";
    this.description = "monster-cavlary / heavy-armor / anti-infantry";
    this.m_description = "怪兽骑兵【重装甲，反步兵】";

    this.scale = 16;
    this.singleHP = 180;
    this.speed = 3;

    this.meleeArmor = 40;
    this.missileArmor = 50;
    this.chargeArmor = 40;

    this.meleeAttack = 40;
    this.meleeAttack_bonus = 50;

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

export class FireBeetleRider extends BeetleRider {
  constructor(value, player) {
    super(value, player);

    this.name = "Fire Beetle Rider";
    this.m_name = "火甲虫骑兵";
    this.type = "monster-infantry";
    this.description = "monster-cavlary / heavy-armor / missile-attack";
    this.m_description = "怪兽骑兵【重装甲，远程攻击】";

    this.meleeAttack_bonus = 0;
    this.missileAttack = 60;
    this.missileRange = 3;

    this.ammo = 30;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") singleDamage = this.c_meleeAttack;
    else if (damageType === "missile") singleDamage = this.c_missileAttack;

    return singleDamage;
  }
}

export class BeetleChargeRider extends BeetleRider {
  constructor(value, player) {
    super(value, player);

    this.name = "Beetle Charge Rider";
    this.m_name = "甲虫冲击骑兵";
    this.type = "monster-infantry";
    this.description = "monster-charge-cavlary / heavy-armor / anti-infantry";
    this.m_description = "怪兽冲杀骑兵【重装甲，反步兵】";

    this.speed = 4;

    this.chargeAttack = 70;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

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

    this.name = "Spirit Coffin (Ghost Fire)";
    this.m_name = "灵棺-鬼火";
    this.type = "monster";
    this.description = "bombing-mech";
    this.m_description = "轰炸机甲";

    this.scale = 1;
    this.singleHP = 300;
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

export class SpiritCoffinBB extends SpiritCoffinGF {
  constructor(value, player) {
    super(value, player);

    this.name = "Spirit Coffin (Broken Bones)";
    this.m_name = "灵棺-碎骨";
    this.type = "monster";
    this.description = "bombing-mech / large-bombing-radius";
    this.m_description = "轰炸机甲【大轰炸半径】";

    this.missileRadius = 2;

    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new DarkSoldier(pos, player);
  if (i === 1) return new DarkSoldierScythe(pos, player);
  if (i === 2) return new DarkSoldierSS(pos, player);
  if (i === 3) return new Banshee(pos, player);
  if (i === 4) return new ScreamingBanshee(pos, player);
  if (i === 5) return new ScreamingBansheeGF(pos, player);
  if (i === 6) return new DeathKnight(pos, player);
  if (i === 7) return new DeathKnightDS(pos, player);
  if (i === 8) return new BeetleRider(pos, player);
  if (i === 9) return new FireBeetleRider(pos, player);
  if (i === 10) return new BeetleChargeRider(pos, player);
  if (i === 11) return new SpiritCoffinGF(pos, player);
  if (i === 12) return new SpiritCoffinBB(pos, player);

  return null;
}
