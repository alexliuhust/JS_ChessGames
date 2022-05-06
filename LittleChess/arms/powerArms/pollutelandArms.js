import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { updateEliteData } from "../armTools.js";

export class SlaveConscript extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Slave Conscripts";
    this.m_name = "奴隶征召兵";
    this.type = "infantry";
    this.description = "Infantry[Weak]";
    this.m_description = "近战步兵[孱弱]";

    this.scale = 160;
    this.singleHP = 20;
    this.speed = 4;

    this.meleeAttack = 16;

    this.loadRealtimeProps();
  }
}

export class SlaveConscriptShield extends SlaveConscript {
  constructor(value, player) {
    super(value, player);

    this.name = "Slave Conscripts (Shield)";
    this.m_name = "奴隶征召兵-持盾";
    this.type = "infantry";
    this.description = "Shield-Infantry[Weak]";
    this.m_description = "持盾-近战步兵[孱弱]";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class HurlerHE extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileWeight = 4;

    this.name = "Hurlers (High-Explosion)";
    this.m_name = "投掷小队-高爆弹";
    this.type = "archers";
    this.description = "Armor-Archers[High-Damage]";
    this.m_description = "装甲-远程步兵[高伤害]";

    this.scale = 90;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 16;
    this.missileAttack = 32;
    this.missileRange = 3;
    this.isParabola = true;

    this.ammo = 12;
    this.loadRealtimeProps();
  }
}

export class HurlerGas extends HurlerHE {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.PoisonColor;

    this.name = "Hurlers (Gas Bomb)";
    this.m_name = "投掷小队-毒气弹";
    this.type = "archers";
    this.description = "Armor-Archers[Anti-Armor]";
    this.m_description = "装甲-远程步兵[高破甲]";

    this.missileAttack = 16;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class HurlerFrgm extends HurlerHE {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;

    this.name = "Hurlers (Fragmentation)";
    this.m_name = "投掷小队-破片弹";
    this.type = "archers";
    this.description = "Armor-Archers[Anti-Infantry]";
    this.m_description = "装甲-远程步兵[反步兵]";

    this.missileAttack = 16;
    this.missileAttack_bonus = 20;

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

export class WeapSqdGingall extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Weapon Squad (Gingall)";
    this.m_name = "武器小队-火枪";
    this.type = "archers";
    this.description = "Archers[Anti-Large]";
    this.m_description = "远程步兵[反大型]";

    this.scale = 90;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 30;
    this.missileAttack_bonus = 60;
    this.missileRange = 6;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isLarge()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class WeapSqdGatlin extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Weapon Squad (Gatlin)";
    this.m_name = "武器小队-加特林";
    this.type = "archers";
    this.description = "Archers[Anti-Infantry]";
    this.m_description = "远程步兵[反步兵]";

    this.scale = 90;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 38;
    this.missileAttack_bonus = 50;
    this.missileRange = 6;

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) {
        if (targetArm.c_missileArmor > 0)
          singleDamage += this.missileAttack_bonus / 2;
        else singleDamage += this.missileAttack_bonus;
      }
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class WeapSqdFlthr extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 5;

    this.name = "Weapon Squad (Flamethrower)";
    this.m_name = "武器小队-火焰喷射器";
    this.type = "archers";
    this.description = "Shield-Archers[Anti-Non-Armor]";
    this.m_description = "远程步兵[反无甲]";

    this.scale = 90;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 40;
    this.missileAttack_bonus = 50;
    this.missileRange = 3;

    this.ammo = 12;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.c_meleeArmor === 0)
        singleDamage += this.missileAttack_bonus / 2;
      if (targetArm.c_missileArmor === 0)
        singleDamage += this.missileAttack_bonus / 2;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class SupplySqd extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Supply Squad";
    this.m_name = "补给小队";
    this.type = "infantry";
    this.description = "Sheild-Infantry  Healer  Rouser";
    this.m_description = "持盾-近战步兵 治疗者 激励者";

    this.scale = 120;
    this.singleHP = 40;
    this.speed = 4;

    this.missileArmor = 30;

    this.meleeAttack = 16;

    this.healing = 10;
    this.healRange = 3;
    this.totalHeal = 250;
    this.attackEnhance = 35;
    this.enhanceRange = 3;
    this.loadRealtimeProps();
  }
}

export class WeapSqdGingallE extends WeapSqdGingall {
  constructor(value, player) {
    super(value, player);

    this.name = "Piercing Nail";
    this.m_name = "穿刺之钉";
    this.type = "archers";
    this.description = "Shield-Archers[Elite  Anti-Large]";
    this.m_description = "持盾-远程步兵[精英 反大型]";

    this.loadRealtimeProps();
    updateEliteData(this);
  }
}

export class WeapSqdGatlinE extends WeapSqdGatlin {
  constructor(value, player) {
    super(value, player);

    this.name = "Metal Storm";
    this.m_name = "金属风暴";
    this.type = "archers";
    this.description = "Shield-Archers[Elite  Anti-Infantry]";
    this.m_description = "持盾-远程步兵[精英 反步兵]";

    this.loadRealtimeProps();
    updateEliteData(this);
  }
}

export class WeapSqdFlthrE extends WeapSqdFlthr {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 5;

    this.name = "Armored Flame Furnace";
    this.m_name = "装甲焰炉";
    this.type = "archers";
    this.description = "Armor-Archers[Elite  Anti-Non-Armor]";
    this.m_description = "装甲-远程步兵[精英 反无甲]";

    this.meleeArmor = 35;
    this.missileArmor = 25;
    this.chargeArmor = 20;

    this.loadRealtimeProps();
    updateEliteData(this);
  }
}

export class MechGears extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mech Squad";
    this.m_name = "机甲小队";
    this.type = "monster-Infantry";
    this.description = "Mech-Infantry";
    this.m_description = "机甲步兵";

    this.scale = 30;
    this.singleHP = 300;
    this.speed = 3;

    this.meleeArmor = 60;
    this.chargeArmor = 30;

    this.meleeAttack = 48;

    this.loadRealtimeProps();
  }
}

export class MechGatlin extends MechGears {
  constructor(value, player) {
    super(value, player);

    this.name = "Mech Squad (Gatlin)";
    this.m_name = "机甲小队-加特林";
    this.type = "monster-Infantry";
    this.description = "Mech-Infantry[Anti-Infantry]";
    this.m_description = "机甲步兵[反步兵]";

    this.missileAttack = 60;
    this.missileAttack_bonus = 50;
    this.missileRange = 6;

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) {
        if (targetArm.c_missileArmor > 0)
          singleDamage += this.missileAttack_bonus / 2;
        else singleDamage += this.missileAttack_bonus;
      }
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class MechMissile extends MechGears {
  constructor(value, player) {
    super(value, player);
    this.missileWeight = 4;

    this.name = "Mech Squad (Missile)";
    this.m_name = "机甲小队-飞弹";
    this.type = "monster-Infantry";
    this.description = "Mech-Infantry[Long-Range  Anti-Large]";
    this.m_description = "机甲步兵[长程 反大型]";

    this.missileAttack = 70;
    this.missileAttack_bonus = 40;
    this.missileRange = 8;
    this.isParabola = true;

    this.ammo = 13;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isLarge()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class MutantSlave extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mutant Slaves";
    this.m_name = "变异奴隶";
    this.type = "monster-Infantry";
    this.description = "Monster-Infantry[Agile  Shocking]";
    this.m_description = "怪兽步兵[迅捷如风 惊骇敌军]";

    this.scale = 30;
    this.singleHP = 200;
    this.speed = 6;

    this.meleeDodge = 50;

    this.meleeAttack = 50;
    this.chargeAttack = 60;

    this.shock = 50;
    this.loadRealtimeProps();
  }
}

export class Foulcannon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.PoisonColor;
    this.missileWeight = 5;

    this.name = "Foul Cannons";
    this.m_name = "污秽加农炮";
    this.type = "artillery";
    this.description = "Artillery[High-Damage  Shocking]";
    this.m_description = "炮兵[高伤害 惊骇敌军]";

    this.scale = 5;
    this.singleHP = 900;
    this.speed = 1;

    this.missileAttack = 500;
    this.missileRange = 10;
    this.isParabola = true;

    this.shock = 80;
    this.loadRealtimeProps();
  }
}

export class Vilecannon extends Foulcannon {
  constructor(value, player) {
    super(value, player);
    this.missileWeight = 6;

    this.name = "Vile Cannons";
    this.m_name = "不洁加农炮";
    this.type = "artillery";
    this.description = "Artillery[High-Damage  Shocking]";
    this.m_description = "炮兵[高伤害 惊骇敌军]";

    this.scale = 5;
    this.singleHP = 900;
    this.speed = 1;

    this.missileAttack = 600;
    this.missileRange = 11;
    this.isParabola = true;

    this.shock = 80;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new SlaveConscript(pos, player);
  if (i === 1) return new SlaveConscriptShield(pos, player);
  if (i === 2) return new HurlerGas(pos, player);
  if (i === 3) return new HurlerFrgm(pos, player);
  if (i === 4) return new HurlerHE(pos, player);
  if (i === 5) return new WeapSqdGingall(pos, player);
  if (i === 6) return new WeapSqdGatlin(pos, player);
  if (i === 7) return new WeapSqdFlthr(pos, player);
  if (i === 8) return new SupplySqd(pos, player);
  if (i === 9) return new WeapSqdGingallE(pos, player);
  if (i === 10) return new WeapSqdGatlinE(pos, player);
  if (i === 11) return new WeapSqdFlthrE(pos, player);
  if (i === 12) return new MechGears(pos, player);
  if (i === 13) return new MechGatlin(pos, player);
  if (i === 14) return new MechMissile(pos, player);
  if (i === 15) return new MutantSlave(pos, player);
  if (i === 16) return new Foulcannon(pos, player);
  if (i === 17) return new Vilecannon(pos, player);

  return null;
}
