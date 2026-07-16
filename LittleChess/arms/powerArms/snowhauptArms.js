import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class DwarfWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf Warriors";
    this.m_name = "矮人勇士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS");
    this.tech = 1;

    this.scale = 100;
    this.singleHP = 60;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,shield");
    this.meleeArmor += 20;

    this.meleeAttack = 20;

    this.tall = 2;
    this.loadRealtimeProps();
  }
}

export class DwarfWarriorExpl extends DwarfWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf Warriors (Dynamite)";
    this.m_name = "矮人勇士-炸药";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,MA");
    this.tech = 2;

    this.missileAttack = 25;
    this.missileRange = 3;
    this.isParabola = true;

    this.missileParameters = {
      shape: "ball",
      radius: 3,
      color: "rgb(235, 93, 4)",
      maxHeightRatio: 0.15,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(235, 93, 4)",
        radius: 7,
        numPellets: 2 * 4,
        expendTime: 25,
        expendSpeed: 1,
      },
    };

    this.ammo = 3;

    this.loadRealtimeProps();
  }
}

export class BoneBreaker extends DwarfWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Bone Breakers";
    this.m_name = "碎骨者";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC,ALG");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long,heavy");
    this.meleeArmor += 20;

    this.meleeAttack = 18;
    this.meleeAttack_bonus = 20;

    this.antiArmor = 15;

    this.tall = 2;
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

export class Berserker extends DwarfWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Berserkers";
    this.m_name = "狂战士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "SF,HD");
    this.tech = 2;

    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,sparse");

    this.meleeAttack = 25;

    this.explosionRadius = 1;

    this.tall = 2;
    this.loadRealtimeProps();
  }
}

export class BerserkerE extends Berserker {
  constructor(value, player) {
    super(value, player);

    this.name = "Mountborne Butchers";
    this.m_name = "山岭屠夫";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF,RSR", "EL,SF,HD,HM");
    this.tech = 4;

    this.attackEnhance = 30;
    this.enhanceRange = 3;

    this.tall = 2;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class DwarfKingsGuard extends DwarfWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf King's Guards";
    this.m_name = "矮人王禁卫";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "A_IF", "AM,HS,ALG");
    this.tech = 4;

    ArmTool.loadDefenceBenchmark(this, "inf", "long,heavy,shield,armor");
    this.meleeDodge += 10;
    this.meleeArmor += 20;

    this.meleeAttack = 17;
    this.meleeAttack_bonus = 24;

    this.antiArmor = 15;
    this.tall = 2;
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

export class MountainShocker extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mountain Shockers";
    this.m_name = "震山矿工";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "GS_IF", "HS,MA,HD");
    this.tech = 2;

    this.scale = 81;
    this.singleHP = 60;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "shield,shield");
    this.missileArmor += 20;
    this.meleeDodge -= 10;
    this.chargeArmor += 10;

    this.meleeAttack = 20;
    this.missileAttack = 40;
    this.missileRange = 3;
    this.isParabola = true;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "ball",
      radius: 4,
      color: "rgb(235, 93, 4)",
      maxHeightRatio: 0.15,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(235, 93, 4)",
        radius: 7,
        numPellets: 2 * 4,
        expendTime: 25,
        expendSpeed: 1,
      },
    };

    this.ammo = 3;
    this.tall = 2;
    this.loadRealtimeProps();
  }
}

export class MineSupportTeam extends MountainShocker {
  constructor(value, player) {
    super(value, player);

    this.name = "Mine Support Team";
    this.m_name = "矿井支援队";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "GS_IF,HLR", "HS");
    this.tech = 2;

    this.missileAttack = 0;
    this.missileRange = 0;
    this.missileParameters = null;
    this.ammo = -1;

    this.healing = 10;
    this.healRange = 3;
    this.totalHeal = 100;

    this.loadRealtimeProps();
  }
}

export class MountainShockerE extends MountainShocker {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf Shields";
    this.m_name = "矮人之盾";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "GS_IF,PTR", "EL,HS,MA,HD,HM");
    this.tech = 3;

    this.ammo = 3;
    this.armorEnhance = 25;
    this.enhanceRange = 3;
    this.tall = 2;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class CombatRunesmith extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Combat Runesmith";
    this.m_name = "战斗符文工匠";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "HERO,S_AC,PTR,RSR", "AM,HS,LS,AAM,MA");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 3000;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,shield");
    this.meleeArmor += 20;

    this.meleeAttack = 1000;

    this.missileAttack = 300;
    this.missileRange = 6;
    this.multiShots = 5;
    this.marksmanSkill = true;

    this.missileParameters = {
      shape: "line",
      weight: 4,
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

    this.ammo = 20;
    this.antiArmor = 24;

    this.armorEnhance = 20;
    this.attackEnhance = 20;
    this.enhanceRange = 3;
    this.tall = 2;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class DwarfMusketeer extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf Musketeers";
    this.m_name = "矮人火枪手";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "HS,AAM");
    this.tech = 2;

    this.scale = 72;
    this.singleHP = 60;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "shield");
    this.meleeArmor += 20;

    this.meleeAttack = 20;
    this.missileAttack = 24;
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
    this.tall = 2;
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
    [this.description, this.m_description] = getDescription(this, "S_AC", "HS,LR,SA");
    this.tech = 3;

    this.scale = 64;
    this.singleHP = 60;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "shield");
    this.meleeArmor += 20;

    this.meleeAttack = 20;
    this.missileAttack = 65;
    this.missileRange = 8;
    this.isParabola = true;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "line",
      weight: 4,
      len: 6,
      color: "rgb(205, 206, 113)",
      maxHeightRatio: 0.75,
      speed: 3,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(217, 128, 56)",
        radius: 7,
        numPellets: 2 * 3,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.ammo = 15;
    this.tall = 2;
    this.loadRealtimeProps();
  }
}

export class FireDragonSquad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Fire Dragon Squad";
    this.m_name = "火龙小组";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "HS,AIF,HD");
    this.tech = 3;

    this.scale = 64;
    this.singleHP = 60;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "shield");
    this.meleeArmor += 20;

    this.meleeAttack = 20;
    this.missileAttack = 50;
    this.missileAttack_bonus = 50;
    this.missileRange = 3;
    this.missilePenetrate = 5;

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

    this.ammo = 15;
    this.tall = 2;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.c_missileAttack_bonus;
      this.c_ammo--;
    } else if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    }

    return singleDamage;
  }
}

export class FireDragonSquadE extends FireDragonSquad {
  constructor(value, player) {
    super(value, player);

    this.name = "Frantic Burners";
    this.m_name = "疯狂焚烧者";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC,IPR", "EL,HS,AIF,HD,HM");
    this.tech = 4;

    this.inspiring = 10;
    this.inspireRange = 3;
    this.tall = 2;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class GoatCavalry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Goat Cavalry";
    this.m_name = "山羊骑兵";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC", "AM");
    this.tech = 2;

    this.scale = 49;
    this.singleHP = 130;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "cal", "short,armor,charge-am");
    this.meleeArmor += 20;

    this.meleeAttack = 22;
    this.chargeAttack = 56;

    this.tall = 5;
    this.loadRealtimeProps();
  }
}

export class GoatCavalryTA extends GoatCavalry {
  constructor(value, player) {
    super(value, player);

    this.name = "Goat Cavalry (Throw Axe)";
    this.m_name = "山羊骑兵-飞斧";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC", "AM,MA");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "cal", "short,armor,charge-am");
    this.meleeArmor += 20;

    this.missileAttack = 32;
    this.missileRange = 5;
    this.isParabola = true;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 3,
      color: "white",
    };

    this.ammo = 5;
    this.tall = 5;
    this.loadRealtimeProps();
  }
}

export class GoatChariot extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Goat Chariot";
    this.m_name = "山羊战车";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "C_VC", "SF");
    this.tech = 2;

    this.scale = 12;
    this.singleHP = 300;
    this.speed = 5;

    this.meleeArmor = 25;
    this.missileArmor = 15;
    this.chargeArmor = 40;

    this.meleeDodge = 0;
    this.missileDodge = 10;
    this.chargeDodge = 0;

    this.meleeAttack = 100;
    this.chargeAttack = 240;

    this.tall = 4;
    this.loadRealtimeProps();
  }
}

export class GoatChariotMusket extends GoatChariot {
  constructor(value, player) {
    super(value, player);

    this.name = "Goat Chariot (Musket)";
    this.m_name = "山羊战车-火枪";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "C_VC", "SF,MA");
    this.tech = 3;

    this.chargeAttack = 200;

    this.missileAttack = 96;
    this.multiShots = 4;
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

    this.ammo = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
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
    [this.description, this.m_description] = getDescription(this, "AT", "MH");
    this.tech = 4;

    this.scale = 2;
    this.singleHP = 60;
    this.speed = 1;

    this.missileAttack = 1000;
    this.missileAttack_bonus = 2000;
    this.missileRange = 10;
    this.missilePenetrate = 4;
    this.multiShots = 5;

    this.missileParameters = {
      shape: "line",
      weight: 5,
      len: 10,
      speed: 11,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 2,
        numPellets: 8,
        expendTime: 10,
        expendSpeed: 5,
      },
    };

    this.ammo = 20;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo > 0) {
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

export class FireDragonGun extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 7;

    this.name = "Fire Dragon Guns";
    this.m_name = "火龙炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "AIF");
    this.tech = 2;

    this.scale = 9;
    this.singleHP = 60;
    this.speed = 1;

    this.missileAttack = 160;
    this.missileAttack_bonus = 110;
    this.missileRange = 6;
    this.missilePenetrate = 4;

    this.missileParameters = {
      shape: "fire",
      weight: 12,
      color: "rgb(253, 126, 21)",
      color2: "rgb(255, 200, 1)",
      tailFadeTime: 20,
      speed: 5,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(253, 126, 21)",
        hasShrapnel: false,
        radius: 8,
        numPellets: 2 * 4,
        expendTime: 43,
        expendSpeed: 0.75,
      },
    };

    this.ammo = 25;
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

export class ERFireDragonGun extends FireDragonGun {
  constructor(value, player) {
    super(value, player);

    this.name = "ExRange Fire Dragon Guns";
    this.m_name = "增程火龙炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "AIF");
    this.tech = 3;

    this.missileAttack = 190;
    this.missileAttack_bonus = 110;
    this.missileRange = 10;
    this.missilePenetrate = 6;

    this.missileParameters = {
      shape: "fire",
      weight: 8,
      color: "rgb(253, 126, 21)",
      color2: "rgb(255, 200, 1)",
      tailFadeTime: 35,
      speed: 6.5,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(253, 126, 21)",
        hasShrapnel: false,
        radius: 8.5,
        numPellets: 2 * 4,
        expendTime: 50,
        expendSpeed: 0.75,
      },
    };

    this.loadRealtimeProps();
  }
}

export class TorsionCatapult extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Torsion Catapults";
    this.m_name = "扭力投石机";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "BB");
    this.tech = 1;

    this.scale = 9;
    this.singleHP = 60;
    this.speed = 1;

    this.missileAttack = 220;
    this.missileRange = 9;
    this.explosionRadius = 1;
    this.isBombing = true;

    this.missileParameters = {
      shape: "ball",
      radius: 3.5,
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

    this.loadRealtimeProps();
  }
}

export class DwarfMortar extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Dwarf Mortars";
    this.m_name = "矮人臼炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "BB");
    this.tech = 2;

    this.scale = 4;
    this.singleHP = 60;
    this.speed = 1;

    this.missileAttack = 500;
    this.missileRange = 10;
    this.explosionRadius = 2;
    this.isBombing = true;

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

export class GiantCannon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Giant Mortar";
    this.m_name = "巨型臼炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "BB,LB");
    this.tech = 4;

    this.scale = 2;
    this.singleHP = 60;
    this.speed = 1;

    this.missileAttack = 1700;
    this.missileRange = 13;
    this.explosionRadius = 4;
    this.isBombing = true;

    this.missileParameters = {
      shape: "line",
      weight: 16,
      len: 24,
      color: "rgb(202, 179, 50)",
      speed: 3,
      maxHeightRatio: 0.75,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(231, 73, 0)",
        radius: 20,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1.3,
      },
    };

    this.ammo = 18;
    this.loadRealtimeProps();
  }
}

export const ARM_CLASSES = [
  DwarfWarrior,
  DwarfWarriorExpl,
  Berserker,
  BerserkerE,
  BoneBreaker,
  DwarfKingsGuard,
  MountainShocker,
  MountainShockerE,
  MineSupportTeam,
  CombatRunesmith,
  FireDragonSquad,
  DwarfMusketeer,
  MortarSquad,
  FireDragonSquadE,
  GoatCavalry,
  GoatCavalryTA,
  GoatChariot,
  GoatChariotMusket,
  FireDragonGun,
  ERFireDragonGun,
  TorsionCatapult,
  DwarfMortar,
  RevolvingCannon,
  GiantCannon,
];
