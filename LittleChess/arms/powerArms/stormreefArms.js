import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class Seaman extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Seamen";
    this.m_name = "水手";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "SF");
    this.tech = 1;

    this.scale = 100;
    this.singleHP = 32;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "weak,short,sparse");

    this.meleeAttack = 15;

    this.loadRealtimeProps();
  }
}

export class SeamanPistol extends Seaman {
  constructor(value, player) {
    super(value, player);

    this.name = "Seamen (Pistol)";
    this.m_name = "水手-手枪";
    [this.description, this.m_description] = getDescription(this, "MAC", "SF");
    this.tech = 1;

    ArmTool.loadDefenceBenchmark(this, "inf", "weak,short,sparse");

    this.missileAttack = 12;
    this.missileRange = 4;

    this.missileParameters = {
      shape: "line",
      weight: 1.2,
      color: "white",
    };

    this.ammo = 24;
    this.loadRealtimeProps();
  }
}

export class SeamanGrenade extends Seaman {
  constructor(value, player) {
    super(value, player);

    this.name = "Seamen (Grenade)";
    this.m_name = "水手-手雷";
    [this.description, this.m_description] = getDescription(this, "MAC", "SF");
    this.tech = 1;

    this.scale = 100;

    this.missileAttack = 20;
    this.explosionRadius = 1;
    this.missileRange = 4;
    this.isParabola = true;

    this.missileParameters = {
      shape: "ball",
      radius: 3,
      color: "rgb(53, 37, 28)",
      maxHeightRatio: 0.15,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(235, 93, 4)",
        radius: 5,
        numPellets: 2 * 3,
        expendTime: 22,
        expendSpeed: 1,
      },
    };

    this.ammo = 18;
    this.loadRealtimeProps();
  }
}

export class SeamanDoubleP extends SeamanPistol {
  constructor(value, player) {
    super(value, player);

    this.name = "Seamen (Double-Pistol)";
    this.m_name = "水手-双持手枪";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "SF");
    this.tech = 2;

    this.meleeAttack = 12;
    this.missileAttack = 20;
    this.multiShots = 2;

    this.loadRealtimeProps();
  }
}

export class SeamanMusket extends Seaman {
  constructor(value, player) {
    super(value, player);

    this.name = "Seamen (Musket)";
    this.m_name = "水手-步枪";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "SF,AAM");
    this.tech = 2;

    this.meleeAttack = 12;
    this.missileAttack = 16;
    this.missileRange = 6;

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

    this.antiArmor = 10;

    this.ammo = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class SeamanHandcannon extends Seaman {
  constructor(value, player) {
    super(value, player);

    this.name = "Seamen (Handcannon)";
    this.m_name = "水手-手炮";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "SF,AAM,ALG,SA");
    this.tech = 3;

    this.scale = 50;
    this.speed = 2;

    this.meleeAttack = 12;
    this.missileAttack = 34;
    this.missilePenetrate = 2;
    this.missileRange = 6;

    this.missileParameters = {
      shape: "line",
      weight: 5.5,
      len: 10,
      speed: 9,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 3,
        numPellets: 7,
        expendTime: 15,
        expendSpeed: 3,
      },
    };
    this.antiArmor = 40;

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class SeamanMusketE extends SeamanMusket {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Shooters";
    this.m_name = "精英射手";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "EL,SF,AAM,HM");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,sparse");

    this.antiArmor = 18;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class Pisciculus extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Pisciculi";
    this.m_name = "侏儒鱼人";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "SF,AG");
    this.tech = 2;

    this.scale = 120;
    this.singleHP = 30;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "inf", "sparse,agile");
    this.missileDodge += 15;

    this.meleeAttack = 25;

    this.tall = 2;
    this.loadRealtimeProps();
  }
}

export class NoctPisciculus extends Pisciculus {
  constructor(value, player) {
    super(value, player);

    this.name = "Noct Pisciculi";
    this.m_name = "夜行侏儒鱼人";
    [this.description, this.m_description] = getDescription(this, "IF", "SF,AG,ST,FD");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "stealth,sparse,agile");

    this.loadRealtimeProps();
  }
}

export class PisciculusDoubleBlades extends Pisciculus {
  constructor(value, player) {
    super(value, player);

    this.name = "Pisciculi (Double Blades)";
    this.m_name = "侏儒鱼人-双刀";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "SF,AG,HD");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,sparse,agile");
    this.missileDodge += 15;

    this.meleeAttack = 42;

    this.loadRealtimeProps();
  }
}

export class PisciculusE extends PisciculusDoubleBlades {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Pisciculi";
    this.m_name = "精英侏儒鱼人";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF,RSR", "EL,SF,AG,HD,HM");
    this.tech = 4;

    this.attackEnhance = 20;
    this.enhanceRange = 2;
    this.loadRealtimeProps();
    this.tall = 2;

    ArmTool.updateEliteData(this);
  }
}

export class MurlocWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Murloc Warriors";
    this.m_name = "鱼人战士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC,AAM");
    this.tech = 2;

    this.scale = 56;
    this.singleHP = 110;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");
    this.meleeArmor += 40;

    this.meleeAttack = 40;

    this.antiArmor = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class MurlocDoubleBlades extends MurlocWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Murloc Warriors (Double Blades)";
    this.m_name = "鱼人战士-双刀";
    [this.description, this.m_description] = getDescription(this, "IF", "HD");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,short");
    this.meleeArmor += 40;

    this.meleeAttack = 60;

    this.antiArmor = 8;
    this.loadRealtimeProps();
  }
}

export class MurlocWarriorHurling extends MurlocWarrior {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 5;

    this.name = "Murloc Hurlers";
    this.m_name = "鱼人投戟手";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC,AAM,MA");
    this.tech = 3;

    this.missileAttack = 40;
    this.missileRange = 4;
    this.isParabola = true;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 18,
      color: "rgb(255, 237, 145)",
    };

    this.ammo = 3;
    this.tall = 4;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    return this.antiArmor;
  }
}

export class MurlocE extends MurlocWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Deep-Sea Guards";
    this.m_name = "深海卫士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF,PTR", "EL,RC,AAM,HM");
    this.tech = 4;

    this.armorEnhance = 30;
    this.enhanceRange = 2;

    this.antiArmor = 25;
    this.tall = 4;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class Medusa extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Medusas";
    this.m_name = "美杜莎";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "SH");
    this.tech = 2;

    this.scale = 30;
    this.singleHP = 180;
    this.speed = 5;

    ArmTool.loadDefenceBenchmark(this, "monInf");
    this.meleeDodge += 40;
    this.missileDodge += 10;

    this.meleeAttack = 50;
    this.chargeAttack = 50;

    this.shock = 40;
    this.loadRealtimeProps();
  }
}

export class MedusaTrident extends Medusa {
  constructor(value, player) {
    super(value, player);

    this.name = "Medusas (Trident)";
    this.m_name = "美杜莎-三叉戟";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "SH,ALG,RC");
    this.tech = 3;

    this.missileDodge = 10;

    ArmTool.loadDefenceBenchmark(this, "monInf", "long-rs");
    this.meleeDodge += 40;
    this.missileDodge += 10;

    this.chargeAttack = 70;
    this.meleeAttack_bonus = 60;

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

export class MedusaMB extends Medusa {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.MagicColor;
    this.missileWeight = 3;

    this.name = "Medusas (Magic Bow)";
    this.m_name = "美杜莎-魔弓";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "SH,MA,MG");
    this.tech = 4;

    ArmTool.loadDefenceBenchmark(this, "monInf");
    this.meleeDodge += 40;
    this.missileDodge += 10;

    this.missileAttack = 100;
    this.missileRange = 7;
    this.isParabola = true;
    this.multiShots = 2;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      color: "rgb(249, 74, 244)",
      afterHitParameters: {
        shape: "circle",
        color: "rgb(204, 20, 246)",
        maxWeight: 4,
        expendTime: 20,
        expendSpeed: 1,
      },
    };

    this.ammo = 18;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export class Cancrimag extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Cancrimagnus";
    this.m_name = "巨蟹";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "A_G", "SH");
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 8000;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missileArmor = 60;
    this.chargeArmor = 50;

    this.meleeAttack = 1800;

    this.shock = 20;
    this.tall = 9;
    this.loadRealtimeProps();
  }
}

export class CancrimagMusket extends Cancrimag {
  constructor(value, player) {
    super(value, player);

    this.name = "Cancrimagnus (Musket)";
    this.m_name = "巨蟹-火枪";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "A_G", "SH,MA,AAM");
    this.tech = 4;

    this.missileAttack = 2100;
    this.missileRange = 6;
    this.multiShots = 70;

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

    this.antiArmor = 10;

    this.ammo = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class CancrimagPK extends Cancrimag {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 6;

    this.name = "Cancrimagnus (Powder Kegs)";
    this.m_name = "巨蟹-火药桶";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "A_G", "SH,MA,LB");
    this.tech = 4;

    this.missileAttack = 2500;
    this.missileRange = 2;
    this.isBombing = true;
    this.explosionRadius = 3;
    this.multiShots = 5;

    this.missileParameters = {
      shape: "ball",
      radius: 5,
      color: "rgb(150, 83, 41)",
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

    this.ammo = 4;
    this.loadRealtimeProps();
  }
}

export class CancrimagFlag extends Cancrimag {
  constructor(value, player) {
    super(value, player);

    this.name = "Cancrimagnus (Flag)";
    this.m_name = "巨蟹-军旗";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "A_G,IPR", "SH,HM");
    this.tech = 3;

    this.inspiring = 15;
    this.inspireRange = 4;
    this.loadRealtimeProps();
  }
}

export class DeckGun extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Deck Guns";
    this.m_name = "甲板炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "ALG");
    this.tech = 2;

    this.scale = 7;
    this.singleHP = 32;
    this.speed = 1;

    this.missileAttack = 300;
    this.missileRange = 11;
    this.missilePenetrate = 4;

    this.missileParameters = {
      shape: "line",
      weight: 7,
      len: 12,
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
}

export class DeckGunGrapeshot extends DeckGun {
  constructor(value, player) {
    super(value, player);

    this.name = "Deck Guns (Grapeshot)";
    this.m_name = "甲板炮-葡萄弹";
    [this.description, this.m_description] = getDescription(this, "AT", "AIF,ALG,SA");
    this.tech = 3;

    this.missileAttack = 450;
    this.missilePenetrate = 3;
    this.multiShots = 3;

    this.missileParameters = {
      shape: "line",
      weight: 4,
      len: 7,
      speed: 11,
      color: "rgb(255, 237, 145)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 2,
        numPellets: 6,
        expendTime: 12,
        expendSpeed: 3,
      },
    };

    this.loadRealtimeProps();
  }
}

export const ARM_CLASSES = [
  Seaman,
  SeamanPistol,
  SeamanGrenade,
  SeamanDoubleP,
  SeamanMusket,
  SeamanHandcannon,
  SeamanMusketE,
  Pisciculus,
  NoctPisciculus,
  PisciculusDoubleBlades,
  PisciculusE,
  MurlocWarrior,
  MurlocDoubleBlades,
  MurlocWarriorHurling,
  MurlocE,
  Medusa,
  MedusaTrident,
  MedusaMB,
  Cancrimag,
  CancrimagFlag,
  CancrimagPK,
  CancrimagMusket,
  DeckGun,
  DeckGunGrapeshot,
];
