import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class Goblin extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Goblins";
    this.m_name = "哥布林";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "SF");
    this.tech = 1;

    this.scale = 120;
    this.singleHP = 30;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short");
    this.meleeDodge = 0;

    this.meleeAttack = 10;

    this.tall = 2;
    this.loadRealtimeProps();
  }
}

export class GoblinSpear extends Goblin {
  constructor(value, player) {
    super(value, player);

    this.name = "Goblins (Spear)";
    this.m_name = "哥布林-持矛";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "SF,RC");
    this.tech = 1;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");
    this.meleeDodge = 0;
    this.chargeArmor -= 10;
    this.chargeDodge -= 15;

    this.meleeAttack = 8;

    this.antiArmor = 4;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class GoblinArcher extends Goblin {
  constructor(value, player) {
    super(value, player);

    this.name = "Goblin Archers";
    this.m_name = "哥布林弓手";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "AC", "SF");
    this.tech = 1;

    this.meleeAttack = 5;

    this.missileAttack = 12;
    this.missileRange = 5;
    this.isParabola = true;

    this.missileParameters = {
      shape: "line",
      weight: 1.5,
      len: 7,
      color: "rgb(206, 203, 202)",
    };

    this.loadRealtimeProps();
  }
}

export class OrcWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Orc Warriors";
    this.m_name = "兽人勇士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "AIF");
    this.tech = 2;

    this.scale = 81;
    this.singleHP = 80;
    this.speed = 3;

    ArmTool.loadDefenceBenchmark(this, "inf", "short");

    this.meleeAttack = 22;
    this.meleeAttack_bonus = 22;

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

export class OrcWarriorSpear extends OrcWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Orc Warriors (Spear)";
    this.m_name = "兽人勇士-持矛";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long");

    this.meleeAttack = 26;
    this.meleeAttack_bonus = 0;

    this.antiArmor = 8;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class OrcWarriorTS extends OrcWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Orc Warriors (Javelin)";
    this.m_name = "兽人勇士-标枪";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC,MA");
    this.tech = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long");

    this.meleeAttack = 26;
    this.meleeAttack_bonus = 0;
    this.missileAttack = 32;
    this.missileRange = 5;
    this.isParabola = true;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      len: 12,
      color: "white",
    };

    this.antiArmor = 8;
    this.ammo = 3;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee" || damageType === "missile") return this.antiArmor;
    return 0;
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") singleDamage = this.c_meleeAttack;
    else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class OrcWarriorTSP extends OrcWarriorTS {
  constructor(value, player) {
    super(value, player);

    this.name = "Orc Warriors (Poisoned Javelin)";
    this.m_name = "兽人勇士-淬毒标枪";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC,MA,PW");
    this.tech = 3;

    this.meleeAttack = 30;
    this.missileAttack = 40;
    this.missileParameters = {
      shape: "line",
      weight: 2,
      len: 12,
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

export class OrcWarriorTA extends OrcWarrior {
  constructor(value, player) {
    super(value, player);
    this.missileWeight = 4;

    this.name = "Orc Warriors (Throw Axe)";
    this.m_name = "兽人勇士-投斧";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "AIF,MA");
    this.tech = 2;

    this.missileAttack = 42;
    this.missileRange = 4;
    this.isParabola = true;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 3,
      color: "white",
    };

    this.ammo = 2;

    this.antiArmor = 15;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee" || damageType === "missile") return this.antiArmor;
    return 0;
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class ChampionWarrior extends OrcWarriorTA {
  constructor(value, player) {
    super(value, player);
    this.missileWeight = 4;

    this.name = "Champion Warriors";
    this.m_name = "冠军勇士";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "EL,AIF,MA,HM,AAM");
    this.tech = 3;

    this.missileRange = 5;
    this.ammo = 2;

    this.antiArmor = 20;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }
}

export class TrollClub extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Trolls (Spiked Club)";
    this.m_name = "巨魔-狼牙棒";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AM,AAM");
    this.tech = 3;

    this.scale = 30;
    this.singleHP = 300;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 65;
    this.chargeAttack = 40;

    this.antiArmor = 22;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class TrollShield extends TrollClub {
  constructor(value, player) {
    super(value, player);

    this.name = "Trolls (Slat Shield)";
    this.m_name = "巨魔-格栅盾";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "S_MI", "AM,HS");
    this.tech = 4;

    this.missileArmor = 60;
    this.missileDodge = 30;

    this.chargeArmor = 40;
    this.chargeDodge = 20;

    this.meleeAttack = 40;

    this.antiArmor = 0;
    this.loadRealtimeProps();
  }
}

export class TrollTS extends TrollClub {
  constructor(value, player) {
    super(value, player);

    this.name = "Trolls (Javelin)";
    this.m_name = "巨魔-标枪";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AM,MA,ALG,AAM");
    this.tech = 4;

    this.meleeAttack = 40;

    this.missileAttack = 60;
    this.missileRange = 7;
    this.isParabola = true;
    this.missilePenetrate = 2;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 18,
      color: "rgb(200,200,200)",
    };

    this.ammo = 12;
    this.antiArmor = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Tauren extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren";
    this.m_name = "牛头人";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", null);
    this.tech = 2;

    this.scale = 30;
    this.singleHP = 300;
    this.speed = 5;

    ArmTool.loadDefenceBenchmark(this, "monInf", "charge");

    this.meleeAttack = 40;
    this.chargeAttack = 80;

    this.loadRealtimeProps();
  }
}

export class TaurenLog extends Tauren {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren (Log)";
    this.m_name = "牛头人-圆木";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "MI", "AIF");
    this.tech = 3;

    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "monInf", "heavy,charge");

    this.meleeAttack = 40;
    this.chargeAttack = 70;

    this.meleeAttack_bonus = 30;
    this.chargeAttack_bonus = 30;

    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType == "charge") {
      singleDamage = this.c_chargeAttack;
      if (targetArm.isInfn()) singleDamage += this.c_chargeAttack_bonus;
    }

    return singleDamage;
  }
}

export class TaurenGA extends Tauren {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren (Great Axe)";
    this.m_name = "牛头人-巨斧";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "A_MI", "AM,ALG,AAM");
    this.tech = 4;

    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "monInf", "long,heavy,armor");

    this.meleeAttack = 50;
    this.meleeAttack_bonus = 40;
    this.chargeAttack = 50;
    this.chargeAttack_bonus = 40;

    this.antiArmor = 32;
    this.loadRealtimeProps();
  }

  getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.c_meleeAttack_bonus;
    } else if (damageType === "charge") {
      singleDamage = this.c_chargeAttack;
      if (targetArm.isLarge()) singleDamage += this.c_chargeAttack_bonus;
    }

    return singleDamage;
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class TaurenGAE extends TaurenGA {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren Berserkers";
    this.m_name = "牛头人狂战士";
    this.type = "monster-infantry";
    [this.description, this.m_description] = getDescription(this, "A_MI,IPR", "EL,AM,ALG,AAM,HM");
    this.tech = 4;

    this.inspiring = 10;
    this.inspireRange = 3;
    this.loadRealtimeProps();

    this.antiArmor = 42;
    ArmTool.updateEliteData(this);
  }
}

export class WolfCavalry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Wolf Cavalry";
    this.m_name = "狼骑兵";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MLC", "SF,AG,FD");
    this.tech = 2;

    this.scale = 60;
    this.singleHP = 100;
    this.speed = 8;

    ArmTool.loadDefenceBenchmark(this, "cal", "short,agile");
    this.missileDodge += 15;

    this.meleeAttack = 30;
    this.chargeAttack = 25;

    this.loadRealtimeProps();
  }
}

export class WolfCavalryTS extends WolfCavalry {
  constructor(value, player) {
    super(value, player);

    this.name = "Wolf Cavalry (Javelin)";
    this.m_name = "狼骑兵-标枪";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MLC", "SF,AG,MA,FD");
    this.tech = 2;

    this.missileAttack = 32;
    this.missileRange = 6;
    this.isParabola = true;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      len: 12,
      color: "white",
    };

    this.antiArmor = 12;
    this.ammo = 6;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class WolfCavalryTSP extends WolfCavalryTS {
  constructor(value, player) {
    super(value, player);

    this.name = "Wolf Cavalry (Poisoned Javelin)";
    this.m_name = "狼骑兵-淬毒标枪";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MLC", "SF,AG,MA,PW,FD");
    this.tech = 3;

    this.missileAttack = 40;
    this.missileParameters = {
      shape: "line",
      weight: 2,
      len: 12,
      color: "rgb(62, 247, 105)",
      afterHitParameters: {
        shape: "circle",
        color: "rgb(62, 247, 105)",
        maxWeight: 4,
        expendTime: 20,
        expendSpeed: 1,
      },
    };

    this.ammo = 6;
    this.loadRealtimeProps();
  }
}

export class RhinoTrooper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Rhino Troopers";
    this.m_name = "犀牛骑兵";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC", "AM,AAM");
    this.tech = 3;

    this.scale = 42;
    this.singleHP = 200;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "cal", "armor,charge-am");
    this.meleeArmor += 20;

    this.meleeAttack = 28;
    this.chargeAttack = 74;

    this.antiArmor = 24;
    this.tall = 7;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class RhinoShaman extends RhinoTrooper {
  constructor(value, player) {
    super(value, player);

    this.name = "Rhino Shaman";
    this.m_name = "犀牛骑兵-萨满";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC,HLR,RSR", "AM,AAM");
    this.tech = 4;

    this.healing = 20;
    this.healRange = 3;
    this.totalHeal = 160;

    this.attackEnhance = 15;
    this.enhanceRange = 2;
    this.loadRealtimeProps();
  }
}

export class RhinoTrooperBallista extends RhinoTrooper {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 3;

    this.name = "Rhino Troopers (Ballista)";
    this.m_name = "犀牛骑兵-弩炮";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC", "AM,AAM,MA,ALG");
    this.tech = 3;

    this.missileAttack = 43;
    this.missileRange = 7;
    this.ammo = 18;
    this.missilePenetrate = 3;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 20,
      color: "rgb(209, 181, 22)",
      maxHeightRatio: 0.1,
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(209, 181, 22)",
        weight: 1.5,
        numPellets: 5,
        expendTime: 14,
        expendSpeed: 1,
      },
    };

    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "charge" || damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Minotaur extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Minotaur";
    this.m_name = "米诺陶";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "G", null);
    this.tech = 3;

    this.scale = 1;
    this.singleHP = 8000;
    this.speed = 3;

    this.meleeAttack = 2200;
    this.chargeAttack = 2000;
    this.loadRealtimeProps();
  }
}

export class MinotaurStone extends Minotaur {
  constructor(value, player) {
    super(value, player);

    this.name = "Minotaur (Stone)";
    this.m_name = "米诺陶-投石";
    this.type = "monster";
    [this.description, this.m_description] = getDescription(this, "G", "BB,MA,SA");
    this.tech = 4;

    this.missileAttack = 1100;
    this.missileRange = 10;
    this.explosionRadius = 2;
    this.isBombing = true;
    this.multiShots = 5;

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

    this.ammo = 20;
    this.loadRealtimeProps();
  }
}

export const ARM_CLASSES = [
  Goblin,
  GoblinSpear,
  GoblinArcher,
  OrcWarrior,
  OrcWarriorSpear,
  OrcWarriorTS,
  OrcWarriorTSP,
  OrcWarriorTA,
  ChampionWarrior,
  WolfCavalry,
  WolfCavalryTS,
  WolfCavalryTSP,
  RhinoTrooper,
  RhinoTrooperBallista,
  RhinoShaman,
  Tauren,
  TaurenLog,
  TaurenGA,
  TaurenGAE,
  TrollClub,
  TrollShield,
  TrollTS,
  Minotaur,
  MinotaurStone,
];
