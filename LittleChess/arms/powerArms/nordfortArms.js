import * as ArmPrimary from "../arm.js";
import { MissileColor as MC, getDescription } from "../../common/const.js";
import * as ArmTool from "../armTools.js";

export class HallwayGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hallway Guards";
    this.m_name = "门厅守卫";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "IF", "RC");

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");

    this.meleeAttack = 18;

    this.antiArmor = 8;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class HallwayGuardShield extends HallwayGuard {
  constructor(value, player) {
    super(value, player);

    this.name = "Hallway Guards (Shield)";
    this.m_name = "门厅守卫-持盾";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "S_IF", "HS,RC");

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,shield");

    this.meleeAttack = 16;

    this.loadRealtimeProps();
  }
}

export class NordExecutioner extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Executioners";
    this.m_name = "诺德刽子手";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "A_IF", "AM,AAM,HD");

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "heavy,armor");

    this.meleeAttack = 32;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class NordHerald extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Heralds";
    this.m_name = "诺德军锋";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "A_IF", "AM,RC,AAM,HD");

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,armor");

    this.meleeAttack = 28;

    this.antiArmor = 15;
    this.loadRealtimeProps();
  }
}

export class NordIronblade extends NordExecutioner {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Ironblades";
    this.m_name = "诺德铁刃";
    [this.description, this.m_description] = getDescription(this, "A_IF", "AM,AIF,MM");

    ArmTool.loadDefenceBenchmark(this, "inf", "mm,armor");

    this.meleeAttack = 20;
    this.meleeAttack_bonus = 40;

    this.antiArmor = 10;
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

export class NordHeraldE extends NordHerald {
  constructor(value, player) {
    super(value, player);

    this.name = "Flame Heralds";
    this.m_name = "烈焰军锋";
    this.type = "infantry";
    [this.description, this.m_description] = getDescription(this, "A_IF,IPR", "EL,AM,RC,AAM,HD,HM");

    this.inspiring = 6;
    this.inspireRange = 3;
    this.loadRealtimeProps();

    ArmTool.updateEliteData(this);
  }

  isDamageMagic(damageType) {
    if (damageType === "melee") return true;
    return false;
  }
}

export class CoastDefender extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Defenders (Light)";
    this.m_name = "滨海守卫-轻装";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "MAC", "RC");

    this.scale = 81;
    this.singleHP = 50;
    this.speed = 3;

    this.missileParameters = {
      shape: "line",
      weight: 1.5,
      len: 7,
      color: "rgb(206, 203, 202)",
    };

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs");

    this.meleeAttack = 18;
    this.missileAttack = 18;
    this.missileRange = 6;
    this.isParabola = true;

    this.loadRealtimeProps();
  }
}

export class CoastDefenderShield extends CoastDefender {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Defenders (Shield)";
    this.m_name = "滨海守卫-持盾";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "S_MAC", "HS,RC");

    ArmTool.loadDefenceBenchmark(this, "inf", "long-rs,shield");

    this.meleeAttack = 15;

    this.loadRealtimeProps();
  }
}

export class BallistaSquad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Ballista Squad";
    this.m_name = "重弩小队";
    this.type = "archers";
    [this.description, this.m_description] = getDescription(this, "A_MAC", "AM,AAM,LR");

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    ArmTool.loadDefenceBenchmark(this, "inf", "armor");

    this.meleeAttack = 25;
    this.missileAttack = 35;
    this.missileRange = 8;
    this.isParabola = true;
    this.missilePenetrate = 2;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      len: 10,
      color: "rgb(206, 203, 202)",
      maxHeightRatio: 0.15,
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(206, 203, 202)",
        weight: 1.5,
        numPellets: 7,
        expendTime: 14,
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

export class BallistaSquadShield extends BallistaSquad {
  constructor(value, player) {
    super(value, player);

    this.name = "Ballista Squad (Shiled)";
    this.m_name = "重弩小队-持盾";
    [this.description, this.m_description] = getDescription(this, "A_MAC", "AM,HS,AAM,LR");

    ArmTool.loadDefenceBenchmark(this, "inf", "armor,shield");
    this.meleeAttack = 22;

    this.loadRealtimeProps();
  }
}

export class BallistaSquadFlame extends BallistaSquad {
  constructor(value, player) {
    super(value, player);

    this.name = "Ballista Squad (Fire Rain)";
    this.m_name = "重弩小队-火雨";
    [this.description, this.m_description] = getDescription(this, "A_MAC", "AM,LR,HD");

    this.missileAttack = 50;
    this.explosionRadius = 1;

    this.missileParameters = {
      shape: "line",
      weight: 2,
      color: "rgb(253, 156, 21)",
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

    this.antiArmor = 0;
    this.loadRealtimeProps();
  }
}

export class CoastRanger extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Rangers";
    this.m_name = "滨海游骑兵";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MSC", "MA,FD");

    this.scale = 49;
    this.singleHP = 100;
    this.speed = 6;

    ArmTool.loadDefenceBenchmark(this, "cal");
    this.missileDodge += 20;

    this.meleeAttack = 28;
    this.chargeAttack = 22;
    this.missileAttack = 20;
    this.missileRange = 6;
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

export class CoastRangerCharge extends CoastRanger {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Rangers (Charge)";
    this.m_name = "滨海游骑兵-冲杀";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "MSCGC", "MA,FD");

    ArmTool.loadDefenceBenchmark(this, "cal", "charge");
    this.missileDodge += 20;

    this.meleeAttack = 22;
    this.chargeAttack = 50;
    this.loadRealtimeProps();
  }
}

export class FlameKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Flame Knights";
    this.m_name = "炎骑士";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "CGC", "AG,AAM,HD");

    this.scale = 49;
    this.singleHP = 120;
    this.speed = 7;

    ArmTool.loadDefenceBenchmark(this, "cal", "charge,agile");

    this.meleeAttack = 28;
    this.chargeAttack = 60;

    this.antiArmor = 24;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class FlameKnightShield extends FlameKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Flame Knights (Shield)";
    this.m_name = "炎骑士-持盾";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "S_CGC", "HS,AG,AAM,HD");

    ArmTool.loadDefenceBenchmark(this, "cal", "charge,agile,shield");

    this.meleeAttack = 24;

    this.loadRealtimeProps();
  }
}

export class CoralCavalry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coral Cavalry";
    this.m_name = "珊瑚骑兵团";
    this.type = "cavalry";
    [this.description, this.m_description] = getDescription(this, "A_CGC", "AM,AAM");

    this.scale = 49;
    this.singleHP = 120;
    this.speed = 5;

    ArmTool.loadDefenceBenchmark(this, "cal", "charge-am,armor");
    this.meleeArmor += 15;

    this.meleeAttack = 32;
    this.chargeAttack = 52;

    this.antiArmor = 16;
    this.loadRealtimeProps();
  }
}

export class CoralCavalryFlame extends CoralCavalry {
  constructor(value, player) {
    super(value, player);

    this.name = "Fire-Coral Cavalry";
    this.m_name = "火珊瑚骑兵团";
    [this.description, this.m_description] = getDescription(this, "A_CGC", "AM,AAM,HD");

    this.meleeArmor -= 5;
    this.missileArmor -= 5;
    this.chargeArmor -= 5;

    this.meleeAttack += 4;
    this.chargeAttack += 6;

    this.antiArmor = 20;

    this.loadRealtimeProps();
  }
}

class NordMage extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.type = "cavalry";

    this.scale = 1;
    this.singleHP = 3000;
    this.speed = 4;

    ArmTool.loadDefenceBenchmark(this, "cal", "short");

    this.meleeAttack = 800;
    this.chargeAttack = 600;

    this.missileAttack = 400;
    this.multiShots = 5;
    this.missileRange = 5;
    this.marksmanSkill = true;

    this.missileParameters = {
      shape: "ball",
      radius: 4,
      color: "white",
      afterHitParameters: {
        shape: "circle",
        color: "white",
        maxWeight: 10,
        expendTime: 30,
        expendSpeed: 1,
      },
    };

    this.ammo = 3;
    this.totalMana = 12;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }

  // Recover the mana
  roundRefresh(currentRound, endMyRound) {
    super.roundRefresh(currentRound, endMyRound);

    if (this.totalMana > 0 && !endMyRound) {
      let rand = Math.random();
      if (rand < 0.67) {
        this.totalMana--;
        this.c_ammo++;
        this.c_ammo = Math.min(this.c_ammo, this.ammo);
      }
    }
  }

  fixCostAndLeaderShip(cost = 350) {
    this.cost = cost;
    this.leadership = 250;
    this.c_leadership = 250;
  }
}

export class DeathWarlock extends NordMage {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Warlock";
    this.m_name = "死亡法师";
    [this.description, this.m_description] = getDescription(this, "HERO,MSC", "MH,SH,MG");

    this.missileAttack = 2500;
    this.missileParameters.color = "rgb(68, 0, 91)";
    this.missileParameters.afterHitParameters.color = "rgb(68, 0, 91)";

    this.shock = 25;

    this.loadRealtimeProps();
    this.fixCostAndLeaderShip(320);
  }
}

export class ShadeOccultist extends NordMage {
  constructor(value, player) {
    super(value, player);

    this.name = "Shade Occultist";
    this.m_name = "阴影法师";
    [this.description, this.m_description] = getDescription(this, "HERO,MSC,PTR", "ST,SH,MG");

    this.missileParameters.color = "rgb(79, 79, 79)";
    this.missileParameters.afterHitParameters.color = "rgb(46, 45, 45)";

    this.armorEnhance = 25;
    this.enhanceRange = 3;

    this.shock = 100;

    this.loadRealtimeProps();
    this.fixCostAndLeaderShip(350);
  }
}

export class StalwartEnchanter extends NordMage {
  constructor(value, player) {
    super(value, player);

    this.name = "Stalwart Enchanter";
    this.m_name = "坚毅法师";
    [this.description, this.m_description] = getDescription(this, "HERO,MSC,IPR,HLR", "HS,MG");

    this.missileArmor = 20;
    this.missileDodge = 25;

    this.inspiring = 40;
    this.inspireRange = 4;
    this.healing = 12;
    this.healRange = 4;
    this.totalHeal = 120;

    this.ammo = 10;
    this.totalMana = 10;

    this.loadRealtimeProps();
    this.fixCostAndLeaderShip(360);
  }
}

export class BlazePyromancer extends NordMage {
  constructor(value, player) {
    super(value, player);

    this.name = "Blaze Pyromancer";
    this.m_name = "烈焰法师";
    [this.description, this.m_description] = getDescription(this, "HERO,MSC,RSR", "AIF,HD,MG");

    this.attackEnhance = 25;
    this.enhanceRange = 3;

    this.loadRealtimeProps();
    this.fixCostAndLeaderShip(370);
    this._useLaser();
  }

  _useLaser() {
    this.missileAttack = 2000;
    this.c_missileAttack = this.missileAttack;
    this.multiShots = 5;
    this.explosionRadius = null;
    this.missilePenetrate = 6;
    this.missileParameters = {
      shape: "fire",
      weight: 6,
      color: "rgb(253, 126, 21)",
      color2: "rgb(255, 200, 1)",
      tailFadeTime: 35,
      speed: 7,
      afterHitParameters: {
        shape: "smoke",
        color: "rgb(231, 73, 0)",
        radius: 8,
        numPellets: 2 * 3,
        expendTime: 18,
        expendSpeed: 1.3,
      },
    };
  }

  _useBall() {
    this.missileAttack = 800;
    this.c_missileAttack = this.missileAttack;
    this.multiShots = 1;
    this.explosionRadius = 5;
    this.missilePenetrate = null;
    this.missileParameters = {
      shape: "ball",
      radius: 6,
      color: "rgb(253, 126, 21)",
      speed: 5,
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
  }

  // Randomly switch missile attack type
  roundRefresh(currentRound, endMyRound) {
    if (this.totalMana > 0 && !endMyRound) {
      let rand = Math.random();
      if (rand < 0.5) this._useLaser();
      else this._useBall();
    }

    super.roundRefresh(currentRound, endMyRound);
  }
}

export class GiantBallista extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Giant Ballistas";
    this.m_name = "巨型弩炮";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "ALG");

    this.scale = 7;
    this.singleHP = 50;
    this.speed = 1;

    this.missileAttack = 300;
    this.missileRange = 11;
    this.isParabola = true;
    this.missilePenetrate = 4;

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
}

export class GiantBallistaShrapnel extends GiantBallista {
  constructor(value, player) {
    super(value, player);

    this.name = "Giant Ballistas (Shrapnel)";
    this.m_name = "巨型弩炮-霰弹";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "AT", "AIF");

    this.missileAttack = 190;
    this.missileAttack_bonus = 230;
    this.missilePenetrate = null;
    this.explosionRadius = 2;

    this.missileParameters = {
      shape: "line",
      weight: 3,
      len: 20,
      color: "rgb(209, 181, 22)",
      maxHeightRatio: 0.1,
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(209, 181, 22)",
        weight: 2,
        numPellets: 7,
        expendTime: 20,
        expendSpeed: 2,
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

export class SunfireLensGroup extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Sunfire Lens Group";
    this.m_name = "阳炎透镜组";
    this.type = "artillery";
    [this.description, this.m_description] = getDescription(this, "ST", "MH,MG,HM");

    this.scale = 2;
    this.singleHP = 50;
    this.speed = 0;

    this.missileAttack = 1720;
    this.missileRange = 13;
    this.missilePenetrate = 6;

    this.missileParameters = {
      shape: "fire",
      weight: 6,
      color: "rgb(253, 126, 21)",
      color2: "rgb(255, 200, 1)",
      tailFadeTime: 35,
      speed: 12,
      afterHitParameters: {
        shape: "pellets",
        color: "rgb(255, 237, 145)",
        weight: 4,
        numPellets: 7,
        expendTime: 15,
        expendSpeed: 3,
      },
    };

    this.ammo = 20;

    this.tall = 7;
    this.loadRealtimeProps();
  }

  isDamageMagic(damageType) {
    if (damageType === "missile") return true;
    return false;
  }
}

export const ARM_CLASSES = [
  HallwayGuard,
  HallwayGuardShield,
  NordExecutioner,
  NordHerald,
  NordIronblade,
  NordHeraldE,
  CoastDefender,
  CoastDefenderShield,
  BallistaSquad,
  BallistaSquadShield,
  BallistaSquadFlame,
  CoastRanger,
  CoastRangerCharge,
  CoralCavalry,
  CoralCavalryFlame,
  FlameKnight,
  FlameKnightShield,
  DeathWarlock,
  ShadeOccultist,
  StalwartEnchanter,
  BlazePyromancer,
  GiantBallista,
  GiantBallistaShrapnel,
  SunfireLensGroup,
];
