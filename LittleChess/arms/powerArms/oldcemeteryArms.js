import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class Skeleton extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Skeleton Puppets";
    this.m_name = "骷髅傀儡";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "WK,SF,IS");
    this.tech = 1;

    this.scale = 160;
    this.singleHP = 30;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,weak,sparse");
    this.meleeDodge = 0;
    this.missileDodge = 0;

    this.meleeAttack = 6;

    this.loadRealtimeProps();
  }
}

export class SkeletonShield extends Skeleton {
  constructor(value, player) {
    super(value, player);

    this.name = "Skeleton Puppets (Shield)";
    this.m_name = "骷髅傀儡-持盾";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "WK,SF,HS,IS");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,weak,sparse,shield");
    this.meleeDodge = 0;
    this.missileDodge -= 20;

    this.meleeAttack = 5;

    this.loadRealtimeProps();
  }
}

export class SkeletonSpear extends Skeleton {
  constructor(value, player) {
    super(value, player);

    this.name = "Skeleton Puppets (Spear)";
    this.m_name = "骷髅傀儡-持矛";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "WK,SF,RC,IS");
    this.tech = 1;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,sparse");
    this.meleeDodge = -5;
    this.missileDodge = 0;
    this.chargeArmor -= 5;
    this.chargeDodge = 0;

    this.meleeAttack = 4;

    this.antiArmor = 4;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class DarkSoldier extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldiers";
    this.m_name = "黑暗战士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC");
    this.tech = 2;

    this.scale = 100;
    this.singleHP = 40;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");

    this.meleeAttack = 20;

    this.antiArmor = 5;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class DarkSoldierShield extends DarkSoldier {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldiers (Shield)";
    this.m_name = "黑暗战士-持盾";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,RC");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,shield");

    this.meleeAttack = 17;
    this.loadRealtimeProps();
  }
}

export class DarkSoldierScythe extends DarkSoldier {
  constructor(value, player) {
    super(value, player);

    this.name = "Dark Soldiers (Scythe)";
    this.m_name = "黑暗战士-巨镰";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "ALG");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long,heavy");

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 40;

    this.antiArmor = 12;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.c_meleeAttack_bonus;
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
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,ALG");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long,heavy,shield");

    this.meleeAttack = 18;
    this.meleeAttack_bonus = 36;

    this.loadRealtimeProps();
  }
}

export class DarkSoldierSSE extends DarkSoldierSS {
  constructor(value, player) {
    super(value, player);

    this.name = "Tomb Keepers";
    this.m_name = "墓穴守望者";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF,PTR", "EL,HS,ALG,HM,AAM");
    this.tech = 4;

    this.armorEnhance = 30;
    this.enhanceRange = 2;
    this.loadRealtimeProps();

    this.antiArmor = 18;
    ArmTool.updateEliteData(this);
  }
}

export class Banshee extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Banshees";
    this.m_name = "女妖";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "SF,SH,FD,IS");
    this.tech = 1;

    this.scale = 75;
    this.singleHP = 40;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,sparse");
    this.missileDodge += 45;

    this.meleeAttack = 20;

    this.shock = 35;
    this.loadRealtimeProps();
  }
}

export class ScreamingBanshee extends Banshee {
  constructor(value, player) {
    super(value, player);

    this.name = "Screaming Banshees";
    this.m_name = "尖啸女妖";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "CGIF", "SF,SH,FD,IS");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,sparse,charge");
    this.missileDodge += 45;

    this.meleeAttack = 17;

    this.shock = 35;
    this.chargeAttack = 34;
    this.loadRealtimeProps();
  }
}

export class BansheeGF extends Banshee {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.GhostColor;
    this.missileWeight = 4;

    this.name = "Banshees (Ghost Fire)";
    this.m_name = "女妖-鬼火";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "MAC", "SF,AIF,SH,MG,FD,IS");
    this.tech = 3;

    this.missileAttack = 16;
    this.missileAttack_bonus = 16;
    this.missileRange = 6;

    this.missileParameters = {
      shape: "fire",
      weight: 8,
      color: "rgb(50, 176, 255)",
      color2: "rgb(78, 255, 249)",
      tailFadeTime: 25,
      speed: 5,
      afterHitParameters: {
        shape: "circle",
        color: "rgb(50, 176, 255)",
        maxWeight: 15,
        expendTime: 25,
        expendSpeed: 1,
      },
    };

    this.shock = 35;
    this.ammo = 18;
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
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.c_missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class Necromancer extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Necromancer";
    this.m_name = "死灵术士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "HERO,IPR,HLR", "LS,SH,MG,NC");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 2000;
    this.speed = 3;

    this.meleeAttack = 800;

    this.missileAttack = 400;
    this.multiShots = 5;
    this.missileRange = 5;
    this.marksmanSkill = true;

    this.missileParameters = {
      shape: "ball",
      radius: 4,
      color: "rgb(0, 184, 52)",
      afterHitParameters: {
        shape: "circle",
        color: "rgb(0, 184, 52)",
        maxWeight: 10,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.ammo = 20;

    this.inspiring = 10;
    this.inspireRange = 3;
    this.healing = 20;
    this.healRange = 3;
    this.totalHeal = 150;

    this.shock = 50;

    this.tall = 3;
    this.loadRealtimeProps();
    this.cost = 300;
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export class SkeletonRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Skeleton Riders";
    this.m_name = "骷髅骑手";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MLC", "WK,SF,IS");
    this.tech = 2;

    this.scale = 80;
    this.singleHP = 100;
    this.speed = 5;

    ArmTool.loadDefenceBenchmark(this, "cal", "short,weak,sparse");
    this.meleeDodge -= 20;
    this.missileDodge -= 15;

    this.meleeAttack = 12;
    this.chargeAttack = 12;

    this.loadRealtimeProps();
  }
}

export class DeathKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Knights";
    this.m_name = "死亡骑士";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_MLC", "AM,ALG,IS");
    this.tech = 3;

    this.scale = 49;
    this.singleHP = 140;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "cal", "heavy,armor");
    this.meleeArmor += 55;

    this.meleeAttack = 20;
    this.chargeAttack = 20;
    this.meleeAttack_bonus = 50;

    this.antiArmor = 12;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
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
    [this.description, this.m_description] = getDescription(this, "A_MLC", "AM,MH,IS");
    this.tech = 4;

    ArmTool.loadDefenceBenchmark(this, "cal", "heavy,heavy,armor");
    this.meleeArmor += 55;

    this.meleeAttack = 35;
    this.chargeAttack = 35;
    this.meleeAttack_bonus = 65;

    this.loadRealtimeProps();
  }
}

export class DeathKnightCharge extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Knights (Charge)";
    this.m_name = "死亡骑士-冲杀";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC", "AM,AAM");
    this.tech = 3;

    this.scale = 49;
    this.singleHP = 140;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "cal", "heavy,armor,charge");
    this.meleeArmor += 55;

    this.meleeAttack = 17;
    this.chargeAttack = 55;

    this.antiArmor = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return 12;
    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class BeetleRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Beetle Riders";
    this.m_name = "甲虫骑兵";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "A_MC", "AM,AIF,PW");
    this.tech = 2;

    this.scale = 30;
    this.singleHP = 240;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "monInf", "armor");
    this.missileArmor += 20;

    this.meleeAttack = 40;
    this.chargeAttack = 30;
    this.meleeAttack_bonus = 20;

    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
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
    [this.description, this.m_description] = getDescription(this, "A_MC", "AM,MA");
    this.tech = 4;

    this.meleeAttack_bonus = 0;
    this.missileAttack = 60;
    this.missileRange = 3;
    this.explosionRadius = 1;
    this.artilleryAttack = true;

    this.missileParameters = {
      shape: "fire",
      weight: 10,
      color: "rgb(253, 126, 21)",
      color2: "rgb(255, 200, 1)",
      tailFadeTime: 30,
      speed: 5,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(253, 126, 21)",
        hasShrapnel: false,
        radius: 8,
        numPellets: 2 * 4,
        expendTime: 45,
        expendSpeed: 0.75,
      },
    };

    this.ammo = 20;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") singleDamage = this.c_meleeAttack;
    else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      this.c_ammo--;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
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
    [this.description, this.m_description] = getDescription(this, "A_MCGC", "AM");
    this.tech = 3;

    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "monInf", "armor,charge-am");
    this.missileArmor += 20;

    this.meleeAttack_bonus = 0;

    this.meleeAttack = 35;
    this.chargeAttack = 73;

    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
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
    [this.description, this.m_description] = getDescription(this, "VC", "LS,BB,MG,IS");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 5000;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.missileAttack = 1750;
    this.missileRange = 8;
    this.isBombing = true;
    this.explosionRadius = 2;
    this.multiShots = 5;

    this.missileParameters = {
      shape: "fire",
      weight: 10,
      color: "rgb(50, 176, 255)",
      color2: "rgb(78, 255, 249)",
      tailFadeTime: 30,
      speed: 5,
      afterHitParameters: {
        shape: "circle",
        color: "rgb(50, 176, 255)",
        maxWeight: 15,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.ammo = 18;
    this.tall = 4;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export class SpiritCoffinDG extends SpiritCoffinGF {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.GhostColor;

    this.name = "Spirit Coffin (Death Spirits)";
    this.m_name = "灵棺-死灵";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "VC,HLR", "LS,BB,MG,IS");
    this.tech = 2;

    this.missileAttack = 1500;
    this.explosionRadius = 1;
    this.ammo = 8;

    this.missileParameters = {
      shape: "fire",
      weight: 6,
      color: "rgb(76, 241, 71)",
      color2: "rgb(0, 164, 14)",
      tailFadeTime: 30,
      speed: 5,
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(76, 241, 71)",
        weight: 3,
        numPellets: 7,
        expendTime: 45,
        expendSpeed: 1,
      },
    };

    this.healing = 20;
    this.healRange = 4;
    this.totalHeal = 150;
    this.tall = 4;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export class SpiritCoffinBB extends SpiritCoffinGF {
  constructor(value, player) {
    super(value, player);
    this.missileColor = "white";

    this.name = "Spirit Coffin (Broken Bones)";
    this.m_name = "灵棺-碎骨";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "VC", "LS,BB,SA,LB,IS");
    this.tech = 4;

    this.missileAttack = 1800;

    this.explosionRadius = 3;

    this.missileParameters = {
      shape: "ball",
      radius: 5,
      color: "rgb(220, 213, 177)",
      maxHeightRatio: 0.5,
      speed: 4,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(220, 213, 177)",
        radius: 7,
        numPellets: 2 * 4,
        expendTime: 25,
        expendSpeed: 1,
      },
    };

    this.ammo = 20;
    this.tall = 4;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    return false;
  }
}

export class WraithSkeleton extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Wraith Skeleton";
    this.m_name = "缚灵骸骨";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "G", "AIF,SH,IS");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 7000;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.meleeDodge = 30;
    this.missileDodge = 30;

    this.meleeAttack = 1000;
    this.meleeAttack_bonus = 720;

    this.shock = 40;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.c_meleeAttack_bonus;
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
    [this.description, this.m_description] = getDescription(this, "G", "HG,ALG,SH,AAM");
    this.tech = 4;

    this.scale = 1;
    this.singleHP = 6000;
    this.speed = 4;

    this.meleeDodge = 65;
    this.missileDodge = 65;
    this.chargeDodge = 50;

    this.meleeAttack = 1200;
    this.chargeAttack = 1800;
    this.meleeAttack_bonus = 800;

    this.antiArmor = 36;
    this.shock = 50;
    this.tall = 5;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
    }

    return singleDamage;
  }
}

export const ARM_CLASSES = [
  Skeleton,
  SkeletonShield,
  SkeletonSpear,
  DarkSoldier,
  DarkSoldierShield,
  DarkSoldierScythe,
  DarkSoldierSS,
  DarkSoldierSSE,
  Banshee,
  BansheeGF,
  ScreamingBanshee,
  Necromancer,
  SkeletonRider,
  DeathKnight,
  DeathKnightCharge,
  DeathKnightDS,
  BeetleRider,
  BeetleChargeRider,
  FireBeetleRider,
  WraithSkeleton,
  Werewolf,
  SpiritCoffinDG,
  SpiritCoffinGF,
  SpiritCoffinBB,
];
