import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class HenchWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hench Warriors";
    this.m_name = "亲卫勇士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS");
    this.tech = 1;

    this.scale = 81;
    this.singleHP = 80;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,shield");
    this.meleeArmor += 10;

    this.meleeAttack = 21;

    this.loadRealtimeProps();
  }
}

export class HenchWarriorHalberd extends HenchWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Hench Warriors (Halberd)";
    this.m_name = "亲卫勇士-长戟";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,RC,ALG");
    this.tech = 1;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,shield");
    this.meleeArmor += 10;

    this.meleeAttack = 10;
    this.meleeAttack_bonus = 10;

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

export class HenchWarriorGiantaxe extends HenchWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Hench Warriors (Giant Axe)";
    this.m_name = "亲卫勇士-巨斧";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "AAM,HD");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long,heavy");
    this.meleeArmor += 10;

    this.meleeAttack = 33;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class BurningWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Warriors";
    this.m_name = "燃烧战士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "AS_IF", "AM,HS");
    this.tech = 2;

    this.scale = 81;
    this.singleHP = 80;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,armor,shield");
    this.meleeArmor += 15;

    this.meleeAttack = 25;

    this.loadRealtimeProps();
  }
}

export class BurningWarriorHalberd extends BurningWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Warriors (Halberd)";
    this.m_name = "燃烧战士-长戟";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "A_IF", "AM,RC,ALG");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,armor");
    this.meleeArmor += 20;

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 15;

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

export class BurningWarriorGiantaxe extends BurningWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Warriors (Giant Axe)";
    this.m_name = "燃烧战士-巨斧";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "A_IF", "AM,AAM,HD");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "long,heavy,armor");
    this.meleeArmor += 20;

    this.meleeAttack = 40;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class BurningWarriorFlail extends BurningWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Warriors (Flail)";
    this.m_name = "燃烧战士-链枷";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "AS_IF", "AM,HS,AAM");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,armor,shield");
    this.meleeArmor += 15;
    this.meleeDodge += 5;

    this.meleeAttack = 35;

    this.antiArmor = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class BurningWarriorE extends BurningWarriorFlail {
  constructor(value, player) {
    super(value, player);

    this.name = "Demon Warriors";
    this.m_name = "恶魔勇士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "AS_IF", "EL,AM,HS,AAM,HM");
    this.tech = 4;

    this.antiArmor = 30;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class BurningKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Knights";
    this.m_name = "燃烧骑士";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_MLC", "AM");
    this.tech = 2;

    this.scale = 49;
    this.singleHP = 140;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "cal", "short,armor");
    this.meleeArmor += 25;

    this.meleeAttack = 38;
    this.chargeAttack = 20;

    this.loadRealtimeProps();
  }
}

export class BurningKnightHalberd extends BurningKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Knights (Halberd)";
    this.m_name = "燃烧骑士-长戟";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_MLC", "AM,ALG");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "cal", "long-rs,armor");
    this.meleeArmor += 25;

    this.meleeAttack = 18;
    this.meleeAttack_bonus = 24;
    this.chargeAttack = 25;

    this.loadRealtimeProps();
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

export class BurningKnightFlail extends BurningKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Knights (Flail)";
    this.m_name = "燃烧骑士-链枷";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "AS_MLC", "AM,HS,AAM");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "cal", "short,armor,shield");
    this.meleeArmor += 20;

    this.meleeAttack = 40;
    this.chargeAttack = 20;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class BurningKnightCharge extends BurningKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Knights (Charge)";
    this.m_name = "燃烧骑士-冲杀";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC", null);
    this.tech = 3;

    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "cal", "long-rs,armor,charge-am");
    this.meleeArmor += 25;

    this.meleeAttack = 20;
    this.chargeAttack = 50;

    this.loadRealtimeProps();
  }
}

export class BurningKnightChargeE extends BurningKnightCharge {
  constructor(value, player) {
    super(value, player);

    this.name = "Burning Gale";
    this.m_name = "烈风";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC,IPR", "EL,HM");
    this.tech = 4;

    this.inspiring = 15;
    this.inspireRange = 3;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class Hellhound extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hell Hounds";
    this.m_name = "地狱猎犬";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MC", "SF,AG,FD,IS");
    this.tech = 1;

    this.scale = 200;
    this.singleHP = 20;
    this.speed = 7;

    ArmTool.loadDefenceBenchmark(this, "monInf", "agile,sparse");

    this.meleeAttack = 5;
    this.chargeAttack = 10;

    this.tall = 2;
    this.loadRealtimeProps();
  }

  isMid() {
    return false;
  }

  isLarge() {
    return false;
  }
}

export class HellhoundFS extends Hellhound {
  constructor(value, player) {
    super(value, player);

    this.name = "Hell Hounds (Fire Shied)";
    this.m_name = "地狱猎犬-火盾";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MC", "SF,AG,MG,FD,IS");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "monInf", "agile,sparse");
    this.missileArmor += 15;

    this.meleeAttack = 6;
    this.chargeAttack = 12;

    this.tall = 2;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "melee" || damageType === "charge") return true;
    return false;
  }
}

export class HellChariot extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hell Chariot";
    this.m_name = "地狱战车";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "C_VC", null);
    this.tech = 2;

    this.scale = 12;
    this.singleHP = 300;
    this.speed = 4;

    this.meleeArmor = 40;
    this.missileArmor = 20;
    this.chargeArmor = 10;

    this.meleeDodge = 0;
    this.missileDodge = 0;
    this.chargeDodge = 0;

    this.meleeAttack = 120;
    this.chargeAttack = 220;

    this.tall = 4;
    this.loadRealtimeProps();
  }
}

export class HellChariotFlail extends HellChariot {
  constructor(value, player) {
    super(value, player);

    this.name = "Hell Chariot (Flail)";
    this.m_name = "地狱战车-链枷";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "C_VC", "AAM");
    this.tech = 3;

    this.meleeAttack = 250;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class HellChariotIC extends HellChariot {
  constructor(value, player) {
    super(value, player);

    this.name = "Hell Chariot (Inferno Cannon)";
    this.m_name = "地狱战车-炼狱炮";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "C_VC", "MA,BB,MG");
    this.tech = 4;

    this.missileAttack = 170;
    this.missileRange = 10;
    this.explosionRadius = 1;
    this.isBombing = true;

    this.missileParameters = {
      shape: "ball",
      weight: 10,
      color: "rgb(253, 98, 21)",
      speed: 4,
      maxHeightRatio: 0.3,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(253, 98, 21)",
        radius: 7,
        numPellets: 2 * 3,
        expendTime: 25,
        expendSpeed: 1,
      },
    };

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export class DemonEnvoy extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Demon Envoys";
    this.m_name = "恶魔使者";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AAM,SH,IS");
    this.tech = 2;

    this.scale = 25;
    this.singleHP = 300;
    this.speed = 5;

    ArmTool.loadDefenceBenchmark(this, "monInf");

    this.meleeAttack = 90;
    this.chargeAttack = 60;

    this.antiArmor = 30;
    this.shock = 35;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class DemonEnvoyWild extends DemonEnvoy {
  constructor(value, player) {
    super(value, player);

    this.name = "Demon Envoys (Wild)";
    this.m_name = "恶魔使者-狂暴";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AAM,SH,IS");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "monInf", "long,charge");

    this.meleeAttack = 75;
    this.chargeAttack = 100;

    this.loadRealtimeProps();
  }
}

export class DemonEnvoyHellfire extends DemonEnvoy {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 4;

    this.name = "Demon Envoys (Hellfire)";
    this.m_name = "恶魔使者-地狱火";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AAM,SH,MA,MG,IS");
    this.tech = 4;

    this.missileAttack = 75;
    this.missileRange = 6;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "fire",
      weight: 12,
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

    this.ammo = 10;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export class Cerberus extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Cerberus";
    this.m_name = "地狱三头犬";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "HERO,M,RSR", "AG,LS,SH,FD,IS");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 4000;
    this.speed = 6;

    this.meleeDodge = 30;
    this.missileDodge = 60;
    this.chargeDodge = 30;

    this.meleeAttack = 1800;
    this.chargeAttack = 2200;

    this.attackEnhance = 40;
    this.enhanceRange = 4;

    this.shock = 40;
    this.tall = 3;
    this.loadRealtimeProps();
  }
}

export class GreatDemon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Chaos Great Demon";
    this.m_name = "混沌大魔";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "G", "AAM,SH,IS");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 8000;
    this.speed = 4;

    this.meleeAttack = 2200;

    this.antiArmor = 40;

    this.shock = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class GreatDemonHellfire extends GreatDemon {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 4;

    this.name = "Chaos Great Demon (Hellfire)";
    this.m_name = "混沌大魔-地狱火";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "G", "AAM,SH,MA,MG,IS");
    this.tech = 4;

    this.missileAttack = 2000;
    this.missileRange = 6;
    this.multiShots = 20;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "fire",
      weight: 20,
      color: "rgb(253, 126, 21)",
      color2: "rgb(255, 200, 1)",
      tailFadeTime: 32,
      speed: 6,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(253, 126, 21)",
        hasShrapnel: false,
        radius: 9,
        numPellets: 2 * 4,
        expendTime: 50,
        expendSpeed: 0.75,
      },
    };

    this.ammo = 10;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export const ARM_CLASSES = [
  HenchWarrior,
  HenchWarriorHalberd,
  HenchWarriorGiantaxe,
  BurningWarrior,
  BurningWarriorHalberd,
  BurningWarriorGiantaxe,
  BurningWarriorFlail,
  BurningWarriorE,
  Hellhound,
  HellhoundFS,
  BurningKnight,
  BurningKnightHalberd,
  BurningKnightFlail,
  BurningKnightCharge,
  BurningKnightChargeE,
  HellChariot,
  HellChariotFlail,
  HellChariotIC,
  DemonEnvoy,
  DemonEnvoyWild,
  DemonEnvoyHellfire,
  Cerberus,
  GreatDemon,
  GreatDemonHellfire,
];
