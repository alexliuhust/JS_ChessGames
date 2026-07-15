import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class SwordInfantry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Infantry";
    this.m_name = "帝国步兵";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "AIF");
    this.tech = 1;

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short");

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 10;

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

export class SwordInfantryShield extends SwordInfantry {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Infantry (Shield)";
    this.m_name = "帝国步兵-持盾";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,AIF");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,shield");

    this.meleeAttack = 18;
    this.loadRealtimeProps();
  }
}

export class SwordInfantryE extends SwordInfantryShield {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Blades";
    this.m_name = "帝国之刃";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF,RSR", "EL,HS,AIF,HM");
    this.tech = 3;

    this.attackEnhance = 20;
    this.enhanceRange = 3;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class PalaceGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Guards";
    this.m_name = "帝国守卫";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC,ALG");
    this.tech = 1;

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");

    this.meleeAttack = 16;
    this.meleeAttack_bonus = 16;

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

export class PalaceGuardShield extends PalaceGuard {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Guards (Shield)";
    this.m_name = "帝国守卫-持盾";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,RC,ALG");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,shield");

    this.meleeAttack = 13;

    this.loadRealtimeProps();
  }
}

export class Halberdier extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Halberdiers";
    this.m_name = "长戟兵";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC,ALG");
    this.tech = 3;

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");

    this.chargeArmor = 35;

    this.meleeAttack = 16;
    this.meleeAttack_bonus = 20;

    this.antiArmor = 8;

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
    }

    return singleDamage;
  }
}

export class Hunter extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hunters";
    this.m_name = "猎人";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "FD");
    this.tech = 1;

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 4;

    this.missileParameters = {
      shape: "line",
      weight: 1.5,
      len: 7,
      color: "rgb(206, 203, 202)",
    };

    ArmTool.loadDefenceBenchmark(this);

    this.missileAttack = 13;
    this.missileRange = 6;
    this.isParabola = true;

    this.loadRealtimeProps();
  }
}

export class Crossbower extends Hunter {
  constructor(value, player) {
    super(value, player);

    this.name = "Crossbowers";
    this.m_name = "弩手";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", null);
    this.tech = 2;

    this.speed = 3;

    this.missileParameters = {
      shape: "line",
      weight: 1.8,
      len: 7,
      maxHeightRatio: 0.15,
      color: "rgb(206, 203, 202)",
    };

    ArmTool.loadDefenceBenchmark(this);

    this.missileAttack = 17;

    this.antiArmor = 5;

    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Musketeer extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Musketeers";
    this.m_name = "火枪手";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "AAM");
    this.tech = 2;

    this.scale = 81;
    this.singleHP = 50;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this);

    this.meleeAttack = 10;
    this.missileAttack = 22;
    this.missileRange = 7;

    this.missileParameters = {
      shape: "line",
      weight: 1.5,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 1,
        numPellets: 8,
        expendTime: 10,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 24;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class MusketeerShield extends Musketeer {
  constructor(value, player) {
    super(value, player);

    this.name = "Musketeers (Shield)";
    this.m_name = "火枪手-持盾";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "HS,AAM");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, null, "shield");

    this.meleeAttack = 8;

    this.loadRealtimeProps();
  }
}

export class ShotgunnerShield extends Musketeer {
  constructor(value, player) {
    super(value, player);

    this.name = "Shotgunners (Shield)";
    this.m_name = "霰弹枪手-持盾";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "HS,AIF,SA");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, null, "shield");

    this.meleeAttack = 8;

    this.missileAttack = 15;
    this.missileAttack_bonus = 30;
    this.missileRange = 4;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "line",
      weight: 1.0,
      len: 4,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 1,
        numPellets: 8,
        expendTime: 15,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 0;
    this.loadRealtimeProps();
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

export class EmpireSniper extends Musketeer {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Snipers";
    this.m_name = "帝国狙击手";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "SF,AAM,ALG,LR,MK");
    this.tech = 3;

    this.scale = 64;

    ArmTool.loadDefenceBenchmark(this, null, "sparse");

    this.meleeAttack = 10;
    this.missileAttack = 30;
    this.missileAttack_bonus = 28;
    this.missileRange = 9;

    this.missileFocusGroupSize = 4;
    this.missilePenetrate = 2;
    this.marksmanSkill = true;

    this.missileParameters = {
      shape: "line",
      weight: 2.5,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 2,
        numPellets: 5,
        expendTime: 10,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 30;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isLarge()) singleDamage += this.c_missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class EmpireSniperShield extends EmpireSniper {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Snipers (Shield)";
    this.m_name = "帝国狙击手-持盾";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "SF,HS,AAM,ALG,LR,MK");
    this.tech = 4;

    ArmTool.loadDefenceBenchmark(this, null, "shield,sparse");

    this.loadRealtimeProps();
  }
}

export class MusketeerE extends MusketeerShield {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Musketeers";
    this.m_name = "精英火枪手";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "EL,HS,AAM,HM");
    this.tech = 3;

    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class MusketRider extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Musket Riders";
    this.m_name = "火枪骑兵";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MSC", "MA,AAM");
    this.tech = 2;

    this.scale = 49;
    this.singleHP = 120;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "cal");
    this.missileDodge += 30;

    this.meleeAttack = 12;
    this.chargeAttack = 16;
    this.missileAttack = 22;
    this.missileRange = 7;

    this.missileParameters = {
      shape: "line",
      weight: 1.5,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 1,
        numPellets: 8,
        expendTime: 10,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 24;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Vanguard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Vanguards";
    this.m_name = "先锋骑兵";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "CGC", "AAM,FD");
    this.tech = 3;

    this.scale = 49;
    this.singleHP = 120;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "cal", "charge");
    this.missileDodge += 20;

    this.meleeAttack = 24;
    this.chargeAttack = 58;

    this.antiArmor = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class PalaceKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Palace Knights";
    this.m_name = "大殿骑士";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_MLC", "AM,AIF");
    this.tech = 3;

    this.scale = 49;
    this.singleHP = 120;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "cal", "short,armor");
    this.meleeArmor += 20;

    this.meleeAttack = 35;
    this.chargeAttack = 30;
    this.meleeAttack_bonus = 45;
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

export class Paladin extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Paladin";
    this.m_name = "圣骑士";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "HERO,A_MLC,PTR,HLR", "AM,MG");
    this.tech = 4;

    this.scale = 1;
    this.singleHP = 4000;
    this.speed = 4;

    this.meleeArmor = 50;
    this.missileArmor = 20;
    this.chargeArmor = 10;

    this.meleeAttack = 1500;
    this.chargeAttack = 1200;

    this.armorEnhance = 30;
    this.enhanceRange = 3;
    this.healing = 8;
    this.healRange = 3;
    this.totalHeal = 120;

    this.tall = 6;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "melee") return true;
    return false;
  }
}

export class CannonGroup extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 4;

    this.name = "Cannon Group";
    this.m_name = "加农炮组";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "ALG");
    this.tech = 3;

    this.scale = 5;
    this.singleHP = 50;
    this.speed = 1;

    this.missileAttack = 440;
    this.missileRange = 12;
    this.missilePenetrate = 4;

    this.missileParameters = {
      shape: "line",
      weight: 6,
      len: 8,
      speed: 11,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 4,
        numPellets: 7,
        expendTime: 15,
        expendSpeed: 3,
      },
    };

    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class EmpireMortar extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Mortars";
    this.m_name = "帝国臼炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "BB");
    this.tech = 2;

    this.scale = 5;
    this.singleHP = 50;
    this.speed = 1;

    this.missileAttack = 400;
    this.missileRange = 10;
    this.isBombing = true;
    this.explosionRadius = 2;

    this.missileParameters = {
      shape: "line",
      weight: 10,
      len: 12,
      color: "rgb(202, 179, 50)",
      speed: 4,
      maxHeightRatio: 0.5,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(112, 89, 89)",
        radius: 10,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.loadRealtimeProps();
  }
}

export class RocketUnit extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Rocket Unit";
    this.m_name = "火箭单元";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "AIF,BB,SA");
    this.tech = 3;

    this.scale = 5;
    this.singleHP = 50;
    this.speed = 1;

    this.missileAttack = 320;
    this.missileAttack_bonus = 320;
    this.missileRange = 13;
    this.isBombing = true;
    this.explosionRadius = 2;
    this.multiShots = 4;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 10,
      color: "rgb(202, 179, 50)",
      speed: 4,
      maxHeightRatio: 0.12,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(112, 89, 89)",
        radius: 10,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.c_missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class SteamTank extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Steam Tank";
    this.m_name = "蒸汽坦克";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "A_VC", "AM,ALG");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 7500;
    this.speed = 3;

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.missileDodge = 0;
    this.chargeArmor = 50;

    this.meleeAttack = 150;
    this.chargeAttack = 500;

    this.missileAttack = 1760;
    this.multiShots = 4;
    this.missileRange = 9;
    this.missilePenetrate = 4;
    this.artilleryAttack = true;

    this.missileParameters = {
      shape: "line",
      weight: 5,
      len: 8,
      speed: 11,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 4,
        numPellets: 7,
        expendTime: 15,
        expendSpeed: 3,
      },
    };

    this.ammo = 12;
    this.tall = 6;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class SteamTankMortar extends SteamTank {
  constructor(value, player) {
    super(value, player);

    this.name = "Steam Tank (Mortar)";
    this.m_name = "蒸汽坦克-臼炮";
    [this.description, this.m_description] = getDescription(this, "A_VC", "AM,BB");
    this.tech = 3;

    this.missileAttack = 1600;
    this.multiShots = 4;
    this.missileRange = 8;
    this.missilePenetrate = null;
    this.explosionRadius = 2;
    this.isBombing = true;

    this.missileParameters = {
      shape: "line",
      weight: 8,
      len: 10,
      color: "rgb(202, 179, 50)",
      speed: 4,
      maxHeightRatio: 0.5,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(112, 89, 89)",
        radius: 10,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 0;
    this.ammo = 12;
    this.tall = 6;
    this.loadRealtimeProps();
  }
}

export class SteamTankRocket extends SteamTank {
  constructor(value, player) {
    super(value, player);
    this.missileColor = null;

    this.name = "Steam Tank (Rocket)";
    this.m_name = "蒸汽坦克-火箭炮";
    [this.description, this.m_description] = getDescription(this, "A_VC", "AM,AIF,BB,SA");
    this.tech = 4;

    this.missileAttack = 1280;
    this.missileAttack_bonus = 1280;
    this.multiShots = 16;
    this.missileRange = 11;
    this.missilePenetrate = null;
    this.explosionRadius = 2;
    this.isBombing = true;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 10,
      color: "rgb(202, 179, 50)",
      speed: 4,
      maxHeightRatio: 0.12,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(112, 89, 89)",
        radius: 10,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.antiArmor = 0;
    this.ammo = 12;
    this.tall = 6;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    switch (damageType) {
      case "melee":
        singleDamage = this.c_meleeAttack;
        break;

      case "missile":
        if (this.c_ammo > 0) {
          singleDamage = this.c_missileAttack;
          if (targetArm.isInfn()) singleDamage += this.c_missileAttack_bonus;
          this.c_ammo--;
        }
        break;

      case "charge":
        singleDamage = this.c_chargeAttack;
        break;

      default:
        break;
    }

    return singleDamage;
  }
}

export const ARM_CLASSES = [
  SwordInfantry,
  SwordInfantryShield,
  PalaceGuard,
  PalaceGuardShield,
  Halberdier,
  SwordInfantryE,
  Hunter,
  Crossbower,
  Musketeer,
  MusketeerShield,
  ShotgunnerShield,
  EmpireSniper,
  EmpireSniperShield,
  MusketeerE,
  MusketRider,
  PalaceKnight,
  Vanguard,
  Paladin,
  SteamTank,
  SteamTankMortar,
  SteamTankRocket,
  EmpireMortar,
  CannonGroup,
  RocketUnit,
];
