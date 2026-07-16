import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class WoodsGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Woods Guards";
    this.m_name = "林地守卫";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC");
    this.tech = 1;

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");

    this.meleeAttack = 17;

    this.antiArmor = 12;
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
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,RC");
    this.tech = 1;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,shield");

    this.meleeAttack = 15;

    this.loadRealtimeProps();
  }
}

export class WildKiller extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Wild Killers";
    this.m_name = "狂野杀手";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "CGIF", "SF,MM,SH,HD,FD");
    this.tech = 2;

    this.scale = 100;
    this.singleHP = 40;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "inf", "mm,sparse");

    this.meleeAttack = 30;
    this.meleeAttack_bonus = 10;
    this.chargeAttack = 20;
    this.chargeAttack_bonus = 10;

    this.shock = 20;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
      if (targetArm.isInfn()) singleDamage += this.c_chargeAttack_bonus;
    }

    return singleDamage;
  }
}

export class WildKillerPS extends WildKiller {
  constructor(value, player) {
    super(value, player);

    this.name = "Wild Killers (Poison)";
    this.m_name = "狂野杀手-淬毒";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "CGIF", "SF,MM,SH,HD,PW,FD");
    this.tech = 3;

    this.loadRealtimeProps();
  }
}

export class TwilightWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Twilight Warriors";
    this.m_name = "暮光战士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,HD");
    this.tech = 2;

    this.scale = 90;
    this.singleHP = 80;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,shield");
    this.chargeDodge += 15;

    this.meleeAttack = 33;
    this.loadRealtimeProps();
  }
}

export class TwilightWarriorSpear extends TwilightWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Twilight Warriors (Spear)";
    this.m_name = "暮光战士-持矛";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,RC");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,shield");
    this.chargeDodge += 15;

    this.meleeAttack = 22;

    this.antiArmor = 12;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class TwilightWarriorE extends TwilightWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Twilight Shadow";
    this.m_name = "暮光之影";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "EL,HS,ST,HD,HM");
    this.tech = 4;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,shield,stealth");
    this.missileDodge -= 20;
    this.chargeDodge += 15;

    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
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
    [this.description, this.m_description] = getDescription(this, "MAC", "SF,HD");
    this.tech = 3;

    this.scale = 75;
    this.singleHP = 55;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,sparse");

    this.meleeAttack = 30;
    this.missileAttack = 34;
    this.missileRange = 6;
    this.isParabola = true;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      color: "rgb(253, 126, 21)",
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(253, 126, 21)",
        radius: 5,
        numPellets: 2 * 3,
        expendTime: 20,
        expendSpeed: 1,
      },
    };

    this.ammo = 22;
    this.loadRealtimeProps();
  }
}

export class ShadowArcherPS extends ShadowArcherFL {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.PoisonColor;
    this.missileWeight = 2;

    this.name = "Shadow Archers (Poison)";
    this.m_name = "暗影弓手-淬毒箭";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "MAC", "SF,PW");
    this.tech = 1;

    this.missileAttack = 22;
    this.explosionRadius = null;

    this.missileParameters = {
      shape: "line",
      weight: 1.5,
      color: "rgb(62, 247, 105)",
      afterHitParameters: {
        shape: "circle",
        color: "rgb(62, 247, 105)",
        maxWeight: 4,
        expendTime: 20,
        expendSpeed: 1,
      },
    };

    this.loadRealtimeProps();
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
    [this.description, this.m_description] = getDescription(this, "MAC", "SF,AAM");
    this.tech = 2;

    this.missileAttack = 22;
    this.explosionRadius = null;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      color: "rgb(245, 204, 0)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(245, 204, 0)",
        weight: 1.5,
        numPellets: 8,
        expendTime: 10,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 10;
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
    [this.description, this.m_description] = getDescription(this, "AC", "SF,ST,AAM,LR,MK");
    this.tech = 3;

    this.scale = 48;
    this.singleHP = 55;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "sparse,stealth");

    this.meleeAttack = 30;
    this.missileAttack = 45;
    this.missileRange = 9;
    this.isParabola = true;
    this.missileFocusGroupSize = 5;
    this.marksmanSkill = true;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      len: 17,
      color: "rgb(236, 62, 32)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 251, 0)",
        weight: 2.5,
        numPellets: 6,
        expendTime: 14,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 12;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class LongbowRangerDouble extends LongbowRanger {
  constructor(value, player) {
    super(value, player);

    this.name = "Longbow Rangers (Double-Tips)";
    this.m_name = "长弓游侠-双发箭头";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "SF,ST,HD");
    this.tech = 4;

    this.missileAttack = 78;
    this.multiShots = 2;
    this.missileRange -= 2;
    this.marksmanSkill = false;

    this.antiArmor = 8;
    this.loadRealtimeProps();
  }
}

export class StagRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Stag Riders";
    this.m_name = "牡鹿骑兵";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MLC", "ST,FD");
    this.tech = 2;

    this.scale = 49;
    this.singleHP = 125;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "cal", "stealth,short");

    this.meleeAttack = 40;
    this.chargeAttack = 45;

    this.loadRealtimeProps();
  }
}

export class StagLancer extends StagRider {
  constructor(value, player) {
    super(value, player);

    this.name = "Stag Lancers";
    this.m_name = "牡鹿枪骑兵";
    [this.description, this.m_description] = getDescription(this, "CGC", "ST,FD");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "cal", "stealth,charge,long-rs");

    this.meleeAttack = 28;
    this.chargeAttack = 56;

    this.loadRealtimeProps();
  }
}

export class GladeLord extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Glade Lord";
    this.m_name = "林地领主";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "HERO,MSCGC", "HG,ST,ALG,MG,FD");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 5000;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "cal", "stealth,charge,long-rs");
    this.meleeDodge += 30;

    this.meleeAttack = 800;
    this.meleeAttack_bonus = 900;
    this.chargeAttack = 900;
    this.chargeAttack_bonus = 900;

    this.missileAttack = 2400;
    this.multiShots = 6;
    this.missileRange = 9;
    this.marksmanSkill = true;
    this.isParabola = true;
    this.missilePenetrate = 2;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      color: "rgb(62, 247, 105)",
      len: 15,
      afterHitParameters: {
        shape: "circle",
        color: "rgb(62, 247, 105)",
        maxWeight: 4,
        expendTime: 20,
        expendSpeed: 1,
      },
    };

    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
      if (targetArm.isLarge()) singleDamage += this.c_chargeAttack_bonus;
    } else if (damageType === "missile") {
      singleDamage = this.c_missileAttack;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class WarBear extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "War Bears";
    this.m_name = "战熊";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MC", null);
    this.tech = 2;

    this.scale = 30;
    this.singleHP = 240;
    this.speed = 7;

    ArmTool.loadDefenceBenchmark(this, "monInf", "agile");

    this.meleeAttack = 68;
    this.chargeAttack = 76;

    this.tall = 5;
    this.loadRealtimeProps();
  }
}

export class WarBearRider extends WarBear {
  constructor(value, player) {
    super(value, player);

    this.name = "War Bear Riders";
    this.m_name = "战熊骑兵";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MC", "HD");
    this.tech = 3;

    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "monInf", "short,agile");

    this.meleeAttack = 82;
    this.tall = 6;
    this.loadRealtimeProps();
  }
}

export class WarBearRiderE extends WarBearRider {
  constructor(value, player) {
    super(value, player);

    this.name = "Roaring Guards";
    this.m_name = "咆哮守卫";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MC,IPR", "EL,HD,HM");
    this.tech = 4;

    this.inspiring = 25;
    this.inspireRange = 3;
    this.tall = 6;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class Dryad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dryads";
    this.m_name = "树精";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "A_MI", "AM");
    this.tech = 2;

    this.scale = 30;
    this.singleHP = 360;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missileArmor = 60;
    this.chargeArmor = 40;

    this.meleeAttack = 64;

    this.loadRealtimeProps();
  }
}

export class DryadHeal extends Dryad {
  constructor(value, player) {
    super(value, player);

    this.name = "Dryads (Healing)";
    this.m_name = "树精-治疗";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "A_MI,HLR", "AM");
    this.tech = 2;

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
    [this.description, this.m_description] = getDescription(this, "A_MI", "AM,MA,AAM,LR,MK");
    this.tech = 3;

    this.missileAttack = 45;
    this.missileRange = 9;
    this.isParabola = true;
    this.missileFocusGroupSize = 5;
    this.marksmanSkill = true;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      len: 12,
      color: "rgb(236, 62, 32)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 251, 0)",
        weight: 2.5,
        numPellets: 6,
        expendTime: 14,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 12;

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
    [this.description, this.m_description] = getDescription(this, "A_MI", "AM,MA,BB,SA");
    this.tech = 4;

    this.missileAttack = 62;
    this.missileRange = 10;
    this.explosionRadius = 2;
    this.isBombing = true;

    this.missileParameters = {
      shape: "ball",
      radius: 5,
      color: "rgb(53, 41, 41)",
      speed: 4,
      maxHeightRatio: 0.5,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(112, 89, 89)",
        radius: 7,
        numPellets: 2 * 4,
        expendTime: 20,
        expendSpeed: 1,
      },
    };

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
    [this.description, this.m_description] = getDescription(this, "A_G,HLR", "AM");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 8000;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missileArmor = 60;
    this.chargeArmor = 60;

    this.meleeAttack = 1800;

    this.healing = 8;
    this.healRange = 4;
    this.totalHeal = 120;
    this.loadRealtimeProps();
  }
}

export class GiantTreemanMalice extends GiantTreeman {
  constructor(value, player) {
    super(value, player);

    this.name = "Malice Treeman";
    this.m_name = "恶怨树人";
    [this.description, this.m_description] = getDescription(this, "A_G", "AM,MA,MH,MG");
    this.tech = 4;

    this.missileAttack = 2500;
    this.multiShots = 5;
    this.missilePenetrate = 4;
    this.missileRange = 10;

    this.missileParameters = {
      shape: "fire",
      weight: 10,
      color: "rgb(9, 144, 41)",
      color2: "rgb(60, 255, 1)",
      tailFadeTime: 20,
      speed: 7,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(11, 109, 26)",
        radius: 10,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.healing = 0;
    this.healRange = 0;
    this.totalHeal = 0;

    this.ammo = 12;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export const ARM_CLASSES = [
  WoodsGuard,
  WoodsGuardShield,
  TwilightWarrior,
  TwilightWarriorSpear,
  TwilightWarriorE,
  WildKiller,
  WildKillerPS,
  ShadowArcherPS,
  ShadowArcherAP,
  ShadowArcherFL,
  LongbowRanger,
  LongbowRangerDouble,
  StagRider,
  StagLancer,
  GladeLord,
  WarBear,
  WarBearRider,
  WarBearRiderE,
  Dryad,
  DryadHeal,
  DryadRangerRide,
  DryadStone,
  GiantTreeman,
  GiantTreemanMalice,
];
