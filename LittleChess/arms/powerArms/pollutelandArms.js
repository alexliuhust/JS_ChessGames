import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class SlaveConscript extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Slave Conscripts";
    this.m_name = "奴隶征召兵";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "WK");
    this.tech = 1;

    this.scale = 169;
    this.singleHP = 15;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "inf", "weak,short");

    this.meleeAttack = 12;

    this.loadRealtimeProps();
  }
}

export class SlaveConscriptShield extends SlaveConscript {
  constructor(value, player) {
    super(value, player);

    this.name = "Slave Conscripts (Shield)";
    this.m_name = "奴隶征召兵-持盾";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,WK");
    this.tech = 1;

    ArmTool.loadDefenceBenchmark(this, "inf", "weak,short,shield");

    this.meleeAttack = 10;
    this.loadRealtimeProps();
  }
}

export class Unseen extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "The Unseens";
    this.m_name = "匿踪者";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "ST,MM,FD");
    this.tech = 2;

    this.scale = 100;
    this.singleHP = 40;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "inf", "short,short,mm,stealth");
    this.meleeAttack = 26;
    this.chargeAttack = 18;

    this.tall = 2;
    this.loadRealtimeProps();
  }
}

export class UnseenHandCrossbow extends Unseen {
  constructor(value, player) {
    super(value, player);

    this.name = "The Unseens (Hand Crossbow)";
    this.m_name = "匿踪者-手弩";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "ST,MM,MA,FD");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "mm,stealth");
    this.meleeAttack = 18;
    this.missileAttack = 13;
    this.missileRange = 4;
    this.isParabola = true;

    this.missileParameters = {
      shape: "line",
      weight: 1.5,
      len: 5,
      color: "rgb(206, 203, 202)",
    };

    this.ammo = 12;
    this.loadRealtimeProps();
  }
}

export class UnseenGas extends Unseen {
  constructor(value, player) {
    super(value, player);

    this.name = "The Unseens (Gas Bomb)";
    this.m_name = "匿踪者-毒气弹";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "ST,MM,MA,FD");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "mm,stealth");
    this.meleeAttack = 18;
    this.missileAttack = 16;
    this.missileRange = 3;
    this.isParabola = true;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "ball",
      radius: 3,
      color: "rgb(62, 247, 105)",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(62, 247, 105)",
        hasShrapnel: false,
        radius: 7,
        numPellets: 2 * 3,
        expendTime: 40,
        expendSpeed: 0.3,
      },
    };

    this.ammo = 9;

    this.antiArmor = 6;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class HurlerHE extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileWeight = 4;

    this.name = "Hurlers (High-Explosion)";
    this.m_name = "投掷小队-高爆弹";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "A_HUIF", "AM,HD");
    this.tech = 2;

    this.scale = 90;
    this.singleHP = 40;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "armor");

    this.meleeAttack = 16;
    this.missileAttack = 30;
    this.missileRange = 3;
    this.isParabola = true;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "ball",
      radius: 3,
      color: "rgb(253, 126, 21)",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(253, 126, 21)",
        radius: 7,
        numPellets: 2 * 3,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

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
    [this.description, this.m_description] = getDescription(this, "A_HUIF", "AM,AAM");
    this.tech = 1;

    this.missileAttack = 16;

    this.missileParameters = {
      shape: "ball",
      radius: 3,
      color: "rgb(62, 247, 105)",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(62, 247, 105)",
        hasShrapnel: false,
        radius: 7,
        numPellets: 2 * 3,
        expendTime: 40,
        expendSpeed: 0.3,
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

export class HurlerFrgm extends HurlerHE {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;

    this.name = "Hurlers (Fragmentation)";
    this.m_name = "投掷小队-破片弹";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "A_HUIF", "AM,AIF");
    this.tech = 1;

    this.missileAttack = 10;
    this.missileAttack_bonus = 16;

    this.missileParameters = {
      shape: "ball",
      radius: 3,
      color: "rgb(220, 213, 157)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(220, 213, 157)",
        weight: 1.5,
        numPellets: 8,
        expendTime: 20,
        expendSpeed: 2,
      },
    };

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

export class WeapSqdGingall extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Weapon Squad (Gingall)";
    this.m_name = "武器小队-火枪";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "ALG");
    this.tech = 3;

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 10;
    this.missileAttack_bonus = 42;
    this.missileRange = 7;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      color: "rgb(242, 245, 86)",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(242, 245, 86)",
        weight: 2,
        numPellets: 8,
        expendTime: 10,
        expendSpeed: 1,
      },
    };

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
}

export class WeapSqdGatlin extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Weapon Squad (Gatlin)";
    this.m_name = "武器小队-加特林";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "AIF");
    this.tech = 3;

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 26;
    this.missileAttack_bonus = 22;
    this.missileRange = 6;
    this.multiShots = 2;

    this.missileParameters = {
      shape: "line",
      numFire: 5,
      fireInterval: 7,
      weight: 1.2,
      color: "rgb(242, 245, 86)",
      speed: 5,
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(242, 245, 86)",
        weight: 1,
        numPellets: 8,
        expendTime: 10,
        expendSpeed: 1,
      },
    };

    this.ammo = 16;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) {
        if (targetArm.c_missileArmor > 0) singleDamage += this.c_missileAttack_bonus / 2;
        else singleDamage += this.c_missileAttack_bonus;
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
    [this.description, this.m_description] = getDescription(this, "AC", "HD");
    this.tech = 2;

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 60;
    this.missileRange = 3;
    this.missilePenetrate = 4;

    this.missileParameters = {
      shape: "fire",
      weight: 10,
      color: "rgb(253, 126, 21)",
      color2: "rgb(255, 200, 1)",
      tailFadeTime: 25,
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

    this.ammo = 12;
    this.loadRealtimeProps();
  }
}

export class SupplySqd extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Supply Squad";
    this.m_name = "补给小队";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF,HLR,RSR", "HS");
    this.tech = 2;

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, null, "short,shield");

    this.meleeAttack = 16;

    this.healing = 10;
    this.healRange = 3;
    this.totalHeal = 100;
    this.attackEnhance = 15;
    this.enhanceRange = 2;
    this.loadRealtimeProps();
  }
}

export class WeapSqdGingallE extends WeapSqdGingall {
  constructor(value, player) {
    super(value, player);

    this.name = "Piercing Nail";
    this.m_name = "穿刺之钉";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "EL,ALG,HM");
    this.tech = 4;

    ArmTool.loadDefenceBenchmark(this, null, "shield");

    this.loadRealtimeProps();
    ArmTool.updateEliteData(this);
  }
}

export class WeapSqdGatlinE extends WeapSqdGatlin {
  constructor(value, player) {
    super(value, player);

    this.name = "Metal Storm";
    this.m_name = "金属风暴";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_AC", "EL,AIF,HM");
    this.tech = 3;

    ArmTool.loadDefenceBenchmark(this, null, "shield");

    this.loadRealtimeProps();
    ArmTool.updateEliteData(this);
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
    [this.description, this.m_description] = getDescription(this, "A_AC", "EL,AM,HD,HM");
    this.tech = 4;

    ArmTool.loadDefenceBenchmark(this, null, "armor");

    this.loadRealtimeProps();
    ArmTool.updateEliteData(this);
  }
}

export class MechGears extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mech Squad";
    this.m_name = "机甲小队";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MCI", "AM");
    this.tech = 2;

    this.scale = 30;
    this.singleHP = 300;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "monInf", "armor");
    this.meleeArmor += 10;

    this.meleeAttack = 66;
    this.chargeAttack = 60;

    this.loadRealtimeProps();
  }
}

export class MechGatlin extends MechGears {
  constructor(value, player) {
    super(value, player);

    this.name = "Mech Squad (Gatlin)";
    this.m_name = "机甲小队-加特林";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MCI", "AM,MA,AIF");
    this.tech = 3;

    this.meleeAttack = 55;
    this.chargeAttack = 50;
    this.missileAttack = 60;
    this.missileAttack_bonus = 60;
    this.missileRange = 6;
    this.multiShots = 3;

    this.missileParameters = {
      shape: "line",
      numFire: 5,
      fireInterval: 7,
      weight: 1.4,
      color: "rgb(242, 245, 86)",
      speed: 5,
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(242, 245, 86)",
        weight: 1,
        numPellets: 8,
        expendTime: 10,
        expendSpeed: 1,
      },
    };

    this.ammo = 18;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) {
        if (targetArm.c_missileArmor > 0) singleDamage += this.c_missileAttack_bonus / 2;
        else singleDamage += this.c_missileAttack_bonus;
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
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MCI", "AM,MA,ALG,MK,AAM");
    this.tech = 4;

    this.meleeAttack = 55;
    this.chargeAttack = 50;
    this.missileAttack = 50;
    this.missileAttack_bonus = 100;
    this.missileRange = 8;
    this.isParabola = true;
    this.marksmanSkill = true;
    this.missileFocusGroupSize = 3;

    this.missileParameters = {
      shape: "line",
      weight: 7,
      len: 17,
      color: "rgb(205, 206, 113)",
      maxHeightRatio: 0.5,
      speed: 4,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(217, 128, 56)",
        radius: 7,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.ammo = 12;
    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isLarge()) singleDamage += this.c_missileAttack_bonus;
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
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AG,SH,HD");
    this.tech = 3;

    this.scale = 30;
    this.singleHP = 200;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "monInf", "agile");
    this.meleeDodge += 25;

    this.meleeAttack = 60;
    this.chargeAttack = 85;

    this.shock = 35;
    this.tall = 5;
    this.loadRealtimeProps();
  }
}

export class MutantSlaveF extends MutantSlave {
  constructor(value, player) {
    super(value, player);

    this.name = "Mutant Slaves (Frantic)";
    this.m_name = "变异奴隶-狂暴";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AG,AAM,SH,HD");
    this.tech = 3;

    this.singleHP -= 50;
    this.speed += 1;

    this.meleeAttack += 15;
    this.chargeAttack += 20;

    this.shock = 45;

    this.antiArmor = 15;
    this.loadRealtimeProps();
    this.leadership -= 100;
    this.c_leadership = this.leadership;
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee" || damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class MortarGas extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mortar (Gas Bomb)";
    this.m_name = "臼炮-毒气弹";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "BB,SA");
    this.tech = 2;

    this.scale = 5;
    this.singleHP = 50;
    this.speed = 1;

    this.missileAttack = 380;
    this.missileRange = 10;
    this.isBombing = true;
    this.explosionRadius = 2;

    this.missileParameters = {
      shape: "ball",
      radius: 6,
      color: "rgb(62, 247, 105)",
      maxHeightRatio: 0.75,
      speed: 3,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(62, 247, 105)",
        hasShrapnel: false,
        radius: 10,
        numPellets: 2 * 4,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.loadRealtimeProps();
  }
}

export class MortarFrgm extends MortarGas {
  constructor(value, player) {
    super(value, player);

    this.name = "Mortar (Fragmentation)";
    this.m_name = "臼炮-破片弹";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "BB,SA,AIF,LB");
    this.tech = 2;

    this.missileAttack = 120;
    this.missileAttack_bonus = 220;
    this.explosionRadius = 3;

    this.missileParameters = {
      shape: "ball",
      radius: 6,
      color: "rgb(220, 213, 157)",
      maxHeightRatio: 0.75,
      speed: 3,
      tailShape: "smoke",
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(220, 213, 157)",
        weight: 2.5,
        numPellets: 10,
        expendTime: 20,
        expendSpeed: 2.5,
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

export class Foulcannon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Foul Cannons";
    this.m_name = "污秽加农炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "ALG,HD");
    this.tech = 3;

    this.scale = 5;
    this.singleHP = 50;
    this.speed = 1;

    this.missileAttack = 460;
    this.missileRange = 10;
    this.missilePenetrate = 4;

    this.missileParameters = {
      shape: "line",
      weight: 8,
      len: 12,
      speed: 5,
      color: "rgb(62, 247, 105)",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(62, 247, 105)",
        hasShrapnel: false,
        radius: 8,
        numPellets: 2 * 4,
        expendTime: 32,
        expendSpeed: 0.6,
      },
    };

    this.shock = 10;
    this.loadRealtimeProps();
  }
}

export class Vilecannon extends Foulcannon {
  constructor(value, player) {
    super(value, player);

    this.name = "Vile Cannons";
    this.m_name = "不洁加农炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "MH,SH,HD");
    this.tech = 4;

    this.scale = 5;
    this.singleHP = 50;
    this.speed = 1;

    this.missileAttack = 530;
    this.missileRange = 10;
    this.missilePenetrate = 5;

    this.missileParameters = {
      shape: "line",
      weight: 10,
      len: 15,
      speed: 7,
      color: "rgb(3, 165, 41)",
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(3, 165, 41)",
        radius: 10,
        numPellets: 2 * 5,
        expendTime: 40,
        expendSpeed: 0.7,
      },
    };

    this.shock = 40;
    this.loadRealtimeProps();
  }
}

export const ARM_CLASSES = [
  SlaveConscript,
  SlaveConscriptShield,
  Unseen,
  UnseenHandCrossbow,
  UnseenGas,
  HurlerFrgm,
  HurlerGas,
  HurlerHE,
  WeapSqdFlthr,
  WeapSqdGatlin,
  WeapSqdGingall,
  SupplySqd,
  WeapSqdFlthrE,
  WeapSqdGatlinE,
  WeapSqdGingallE,
  MechGears,
  MechGatlin,
  MechMissile,
  MutantSlave,
  MutantSlaveF,
  MortarFrgm,
  MortarGas,
  Foulcannon,
  Vilecannon,
];
