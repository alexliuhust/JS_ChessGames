import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class HallwayGuard extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("HallwayGuard_img");
    // Override original data

    this.name = "Hallway Guard";
    this.m_name = "门厅守卫";
    this.type = "infantry";
    this.description = "infantry / resist-charging / anti-armor";
    this.m_description = "近战步兵【抵御冲锋，高破甲】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missileArmor = 0;
    this.chargeArmor = 70;

    this.meleeAttack = 30;

    this.antiArmor = 40;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class NordExecutioner extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("NordExecutioner_img");
    // Override original data

    this.name = "Nord Executioner";
    this.m_name = "诺德刽子手";
    this.type = "infantry";
    this.description = "armor-infantry / anti-armor";
    this.m_description = "装甲-近战步兵【高破甲】";

    this.scale = 56;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 80;
    this.missileArmor = 30;
    this.chargeArmor = 0;

    this.meleeAttack = 42;

    this.antiArmor = 16;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class CoastDefender extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("CoastDefender_img");
    // Override original data

    this.name = "Coast Defender";
    this.m_name = "滨海守卫";
    this.type = "archers";
    this.description = "melee-archers / resist-charging";
    this.m_description = "近战-远程步兵【抵御冲锋】";

    this.scale = 48;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeArmor = 0;
    this.missileArmor = 0;
    this.chargeArmor = 70;

    this.meleeAttack = 32;
    this.missileAttack = 40;
    this.missileRange = 5;

    this.antiArmor = 16;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType !== "melee") return this.antiArmor;
    return 0;
  }
}

export class CoastDefenderShield extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("CoastDefenderShield_img");
    // Override original data

    this.name = "Coast Defender (Shield)";
    this.m_name = "滨海守卫-持盾";
    this.type = "archers";
    this.description = "melee-shield-archers / resist-charging";
    this.m_description = "近战-持盾-远程步兵【抵御冲锋】";

    this.scale = 48;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 0;
    this.missileArmor = 50;
    this.chargeArmor = 70;

    this.meleeAttack = 32;
    this.missileAttack = 40;
    this.missileRange = 5;

    this.antiArmor = 16;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType !== "melee") return this.antiArmor;
    return 0;
  }
}

export class BallistaSquad extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("BallistaSquad_img");
    // Override original data

    this.name = "Ballista Squad";
    this.m_name = "弩炮小队";
    this.type = "archers";
    this.description = "heavy-archers / anti-armor";
    this.m_description = "重装-远程步兵【高破甲】";

    this.scale = 32;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeAttack = 16;
    this.missileAttack = 68;
    this.missileRange = 8;

    this.antiArmor = 40;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class FlameKnight extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("FlameKnight_img");
    // Override original data

    this.name = "Flame Knight";
    this.m_name = "炎骑士";
    this.type = "cavalry";
    this.description = "charging-cavalry / anti-armor";
    this.m_description = "冲击骑兵【高破甲】";

    this.scale = 32;
    this.singleHP = 80;
    this.speed = 7;

    this.missileDodge = 60;

    this.meleeAttack = 32;
    this.chargeAttack = 72;

    this.antiArmor = 80;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class CoralCavalry extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("CoralCavalry_img");
    // Override original data

    this.name = "Coral Cavalry";
    this.m_name = "珊瑚骑兵团";
    this.type = "cavalry";
    this.description = "charging-cavalry / heavy-armor";
    this.m_description = "冲击骑兵【重装甲】";

    this.scale = 32;
    this.singleHP = 100;
    this.speed = 5;

    this.meleeArmor = 60;
    this.missileArmor = 60;
    this.chargeArmor = 40;

    this.meleeAttack = 44;
    this.chargeAttack = 64;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class GiantBallista extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("GiantBallista_img");
    // Override original data

    this.name = "Giant Ballista";
    this.m_name = "巨型弩炮";
    this.type = "artillery";
    this.description = "artillery / anti-armor";
    this.m_description = "炮兵【高破甲】";

    this.scale = 7;
    this.singleHP = 250;
    this.speed = 1;

    this.missileAttack = 140;
    this.missileRange = 11;

    this.antiArmor = 48;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class StoneGiant extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("StoneGiant_img");
    // Override original data

    this.name = "Stone Giant";
    this.m_name = "诺德巨石人";
    this.type = "monster";
    this.description = "giant / anti-infantry";
    this.m_description = "巨兽【反步兵】";

    this.scale = 1;
    this.singleHP = 400;
    this.speed = 3;

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.chargeArmor = 50;

    this.meleeAttack = 550;
    this.meleeAttack_bonus = 150;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    }
    if (
      targetType === "infantry" ||
      targetType === "archers" ||
      targetType === "artillery"
    ) {
      singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }

  // =============== Override Public APIs ===============
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new HallwayGuard(pos[0]),
    new NordExecutioner(pos[1]),
    new CoastDefender(pos[2]),
    new CoastDefenderShield(pos[3]),
    new BallistaSquad(pos[4]),
    new FlameKnight(pos[5]),
    new CoralCavalry(pos[6]),
    new GiantBallista(pos[7]),
    new StoneGiant(pos[8]),
  ];
  return arms;
}

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new HallwayGuard(pos);
  if (i === 1) return new NordExecutioner(pos);
  if (i === 2) return new CoastDefender(pos);
  if (i === 3) return new CoastDefenderShield(pos);
  if (i === 4) return new BallistaSquad(pos);
  if (i === 5) return new FlameKnight(pos);
  if (i === 6) return new CoralCavalry(pos);
  if (i === 7) return new GiantBallista(pos);
  if (i === 8) return new StoneGiant(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/nordfort/HallwayGuard.png");
  images.push("../images/nordfort/NordExecutioner.png");
  images.push("../images/nordfort/CoastDefender.png");
  images.push("../images/nordfort/CoastDefenderShield.png");
  images.push("../images/nordfort/BallistaSquad.png");
  images.push("../images/nordfort/FlameKnight.png");
  images.push("../images/nordfort/CoralCavalry.png");
  images.push("../images/nordfort/GiantBallista.png");
  images.push("../images/nordfort/StoneGiant.png");

  return images;
}
