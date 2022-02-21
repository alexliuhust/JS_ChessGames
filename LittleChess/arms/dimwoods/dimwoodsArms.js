import * as ArmPrimary from "../arm.js";

export class WoodsGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("WoodsGuard_img");
    // Override original data

    this.name = "Woods Guard";
    this.m_name = "林地守卫";
    this.type = "infantry";
    this.description = "infantry / resist-charging";
    this.m_description = "近战步兵【抵御冲锋】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 0;
    this.chargeArmor = 40;

    this.meleeAttack = 24;

    this.antiArmor = 10;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class WoodsGuardShield extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("WoodsGuardShield_img");
    // Override original data

    this.name = "Woods Guard (Shield)";
    this.m_name = "林地守卫-持盾";
    this.type = "infantry";
    this.description = "shield-infantry / resist-charging";
    this.m_description = "持盾-近战步兵【抵御冲锋】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 0;
    this.missileArmor = 40;
    this.chargeArmor = 40;

    this.meleeAttack = 24;

    this.antiArmor = 10;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class WildKiller extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("WildKiller_img");
    // Override original data

    this.name = "Wild Killer";
    this.m_name = "狂野杀手";
    this.type = "infantry";
    this.description = "infantry / melee-master / shocking";
    this.m_description = "近战步兵【近战大师，惊骇敌军】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 60;

    this.meleeAttack = 50;
    this.meleeAttack_bonus = 18;
    this.chargeAttack = 40;

    this.shock = 40;
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

export class WildKillerPS extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("WildKillerPS_img");
    // Override original data

    this.name = "Wild Killer (Poisoned)";
    this.m_name = "狂野杀手-淬毒";
    this.type = "infantry";
    this.description = "infantry / melee-master / shocking / anti-non-armor";
    this.m_description = "近战步兵【近战大师，惊骇敌军，反无甲】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 60;

    this.meleeAttack = 50;
    this.meleeAttack_bonus = 18;
    this.chargeAttack = 40;
    this.chargeAttack_bonus = 15;

    this.shock = 40;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) {
        singleDamage += this.meleeAttack_bonus;
        if (targetArm.c_meleeArmor === 0)
          singleDamage += this.meleeAttack_bonus;
      }
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
      if (targetArm.c_meleeArmor === 0) singleDamage += this.chargeAttack_bonus;
    }

    return singleDamage;
  }
}

export class ShadowArcherPS extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("ShadowArcherPS_img");
    // Override original data

    this.name = "Shadow Archer (Poisoned)";
    this.m_name = "暗影弓手-淬毒箭";
    this.type = "archers";
    this.description = "melee-archers / anti-non-armor";
    this.m_description = "近战-远程步兵【反无甲】";

    this.scale = 36;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 30;
    this.meleeAttack_bonus = 15;
    this.missileAttack = 36;
    this.missileAttack_bonus = 15;
    this.missileRange = 6;

    this.ammo = 30;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

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

export class ShadowArcherAP extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("ShadowArcherAP_img");
    // Override original data

    this.name = "Shadow Archer (Armor-Piercing)";
    this.m_name = "暗影弓手-穿甲箭";
    this.type = "archers";
    this.description = "melee-archers / anti-armor";
    this.m_description = "近战-远程步兵【高破甲】";

    this.scale = 36;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 30;
    this.missileAttack = 36;
    this.missileRange = 6;

    this.antiArmor = 30;

    this.ammo = 30;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class ShadowArcherFL extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("ShadowArcherFL_img");
    // Override original data

    this.name = "Shadow Archer (Flame)";
    this.m_name = "暗影弓手-火焰箭";
    this.type = "archers";
    this.description = "melee-archers / high-damage";
    this.m_description = "近战-远程步兵【高伤害】";

    this.scale = 36;
    this.singleHP = 40;
    this.speed = 4;

    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 30;
    this.missileAttack = 70;
    this.missileRange = 6;

    this.ammo = 30;
    this.loadRealtimeProps();
  }
}

export class LongbowRanger extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("LongbowRanger_img");
    // Override original data

    this.name = "Longbow Ranger";
    this.m_name = "长弓游侠";
    this.type = "archers";
    this.description = "long-range-archers / anti-armor";
    this.m_description = "长程-远程步兵【高破甲】";

    this.scale = 36;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 20;
    this.missileAttack = 60;
    this.missileRange = 10;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class WarBear extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("WarBear_img");
    // Override original data

    this.name = "War Bear";
    this.m_name = "战熊";
    this.type = "monster-infantry";
    this.description = "monster-infantry / fast";
    this.m_description = "怪兽步兵【迅捷如风】";

    this.scale = 16;
    this.singleHP = 300;
    this.speed = 6;

    this.meleeArmor = 25;
    this.missileArmor = 25;
    this.chargeArmor = 25;

    this.meleeAttack = 60;
    this.chargeAttack = 70;

    this.loadRealtimeProps();
  }
}

export class Dryad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("Dryad_img");
    // Override original data

    this.name = "Dryad";
    this.m_name = "树精";
    this.type = "monster-infantry";
    this.description = "monster-infantry / heavy-armor";
    this.m_description = "怪兽步兵【重装甲】";

    this.scale = 16;
    this.singleHP = 320;
    this.speed = 2;

    this.meleeArmor = 45;
    this.missileArmor = 45;
    this.chargeArmor = 45;

    this.meleeAttack = 48;

    this.loadRealtimeProps();
  }
}

export class DryadRangerRide extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("DryadRangerRide_img");
    // Override original data

    this.name = "Dryad (Ranger-Ride)";
    this.m_name = "树精-游侠搭乘";
    this.type = "monster-infantry";
    this.description = "monster-infantry / heavy-armor / missile-attack";
    this.m_description = "怪兽步兵【重装甲，远程攻击】";

    this.scale = 16;
    this.singleHP = 320;
    this.speed = 2;

    this.meleeArmor = 45;
    this.missileArmor = 45;
    this.chargeArmor = 45;

    this.meleeAttack = 48;
    this.missileAttack = 60;
    this.missileRange = 10;

    this.antiArmor = 40;

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

export class DryadStone extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.img = document.getElementById("DryadStone_img");
    // Override original data

    this.name = "Dryad (Stone)";
    this.m_name = "树精-投石";
    this.type = "monster-infantry";
    this.description = "monster-infantry / heavy-armor / missile-attack";
    this.m_description = "怪兽步兵【重装甲，远程攻击】";

    this.scale = 16;
    this.singleHP = 320;
    this.speed = 2;

    this.meleeArmor = 45;
    this.missileArmor = 45;
    this.chargeArmor = 45;

    this.meleeAttack = 48;
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
    this.img = document.getElementById("GiantTreeman_img");
    // Override original data

    this.name = "Giant Treeman";
    this.m_name = "巨树人";
    this.type = "monster";
    this.description = "giant / heavy-armor";
    this.m_description = "巨兽【重装甲】";

    this.scale = 1;
    this.singleHP = 1000;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missileArmor = 95;
    this.chargeArmor = 60;

    this.meleeAttack = 800;

    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new WoodsGuard(pos, player);
  if (i === 1) return new WoodsGuardShield(pos, player);
  if (i === 2) return new WildKiller(pos, player);
  if (i === 3) return new WildKillerPS(pos, player);
  if (i === 4) return new ShadowArcherPS(pos, player);
  if (i === 5) return new ShadowArcherAP(pos, player);
  if (i === 6) return new ShadowArcherFL(pos, player);
  if (i === 7) return new LongbowRanger(pos, player);
  if (i === 8) return new WarBear(pos, player);
  if (i === 9) return new Dryad(pos, player);
  if (i === 10) return new DryadRangerRide(pos, player);
  if (i === 11) return new DryadStone(pos, player);
  if (i === 12) return new GiantTreeman(pos, player);

  return null;
}
