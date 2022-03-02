import * as ArmPrimary from "../arm.js";

export class HallwayGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hallway Guard";
    this.m_name = "门厅守卫";
    this.type = "infantry";
    this.description = "infantry / resist-charging";
    this.m_description = "近战步兵【抵御冲锋】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 40;
    this.missileArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 25;

    this.antiArmor = 20;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class HallwayGuardShield extends HallwayGuard {
  constructor(value, player) {
    super(value, player);

    this.name = "Hallway Guard (Shield)";
    this.m_name = "门厅守卫-持盾";
    this.type = "infantry";
    this.description = "shield-infantry / resist-charging";
    this.m_description = "持盾-近战步兵【抵御冲锋】";

    this.missileArmor = 40;

    this.loadRealtimeProps();
  }
}

export class NordExecutioner extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Executioner";
    this.m_name = "诺德刽子手";
    this.type = "infantry";
    this.description = "armor-infantry / anti-armor";
    this.m_description = "装甲-近战步兵【高破甲】";

    this.scale = 64;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 80;
    this.missileArmor = 20;
    this.chargeArmor = 20;

    this.meleeAttack = 40;

    this.antiArmor = 28;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class CoastDefender extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Defender (Light)";
    this.m_name = "滨海守卫-轻装";
    this.type = "archers";
    this.description = "melee-archers / resist-charging";
    this.m_description = "近战-远程步兵【抵御冲锋】";

    this.scale = 48;
    this.singleHP = 50;
    this.speed = 3;

    this.chargeArmor = 50;

    this.meleeAttack = 25;
    this.missileAttack = 40;
    this.missileRange = 6;
    this.isParabola = true;

    this.antiArmor = 10;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType !== "melee") return this.antiArmor;
    return 0;
  }
}

export class CoastDefenderShield extends CoastDefender {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Defender (Shield)";
    this.m_name = "滨海守卫-持盾";
    this.type = "archers";
    this.description = "melee-shield-archers / resist-charging";
    this.m_description = "近战-持盾-远程步兵【抵御冲锋】";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class BallistaSquad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Ballista Squad";
    this.m_name = "重弩小队";
    this.type = "archers";
    this.description = "armor-archers / long-range / anti-armor";
    this.m_description = "装甲-远程步兵【长程，高破甲】";

    this.scale = 36;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 80;
    this.missileArmor = 20;
    this.chargeArmor = 20;

    this.meleeAttack = 24;
    this.missileAttack = 50;
    this.missileRange = 8;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class FlameKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Flame Knight";
    this.m_name = "炎骑士";
    this.type = "cavalry";
    this.description = "charging-cavalry / anti-armor / fast";
    this.m_description = "冲击骑兵【高破甲，惊骇敌军，迅捷如风】";

    this.scale = 32;
    this.singleHP = 100;
    this.speed = 7;

    this.chargeArmor = 20;
    this.missileDodge = 50;

    this.meleeAttack = 32;
    this.chargeAttack = 72;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "charge") return this.antiArmor;
    return 0;
  }
}

export class FlameKnightShield extends FlameKnight {
  constructor(value, player) {
    super(value, player);

    this.name = "Flame Knight (Shield)";
    this.m_name = "炎骑士-持盾";
    this.type = "cavalry";
    this.description = "shield-charging-cavalry / anti-armor / fast";
    this.m_description = "冲击骑兵【高破甲，惊骇敌军，迅捷如风】";

    this.missileArmor = 40;

    this.loadRealtimeProps();
  }
}

export class CoralCavalry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coral Cavalry";
    this.m_name = "珊瑚骑兵团";
    this.type = "cavalry";
    this.description = "charging-cavalry / heavy-armor / anti-armor";
    this.m_description = "冲击骑兵【重装甲，高破甲】";

    this.scale = 32;
    this.singleHP = 100;
    this.speed = 5;

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.chargeArmor = 50;

    this.meleeAttack = 32;
    this.chargeAttack = 64;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }
}

export class GiantBallista extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Giant Ballista";
    this.m_name = "巨型弩炮";
    this.type = "artillery";
    this.description = "artillery / anti-armor";
    this.m_description = "炮兵【高破甲】";

    this.scale = 7;
    this.singleHP = 250;
    this.speed = 1;

    this.missileAttack = 300;
    this.missileRange = 11;

    this.antiArmor = 60;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class GiantBallistaShrapnel extends GiantBallista {
  constructor(value, player) {
    super(value, player);

    this.name = "Giant Ballista (Shrapnel)";
    this.m_name = "巨型弩炮-霰弹";
    this.type = "artillery";
    this.description = "artillery / high-damage";
    this.m_description = "炮兵【高伤害】";

    this.missileAttack = 500;
    this.missileRange = 9;
    this.isParabola = true;

    this.antiArmor = 0;
    this.loadRealtimeProps();
  }
}

export class StoneGiant extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Stone Titan";
    this.m_name = "诺德巨石人";
    this.type = "monster";
    this.description = "giant / anti-infantry";
    this.m_description = "巨兽【反步兵】";

    this.scale = 1;
    this.singleHP = 900;
    this.speed = 3;

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.chargeArmor = 50;

    this.meleeAttack = 800;
    this.meleeAttack_bonus = 200;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class StoneGiantFlame extends StoneGiant {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Stone Titan (Flame)";
    this.m_name = "诺德火焰巨石人";
    this.type = "monster";
    this.description = "giant / anti-infantry / high-damage";
    this.m_description = "巨兽【反步兵，高伤害】";

    this.meleeAttack = 1200;

    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new HallwayGuard(pos, player);
  if (i === 1) return new HallwayGuardShield(pos, player);
  if (i === 2) return new NordExecutioner(pos, player);
  if (i === 3) return new CoastDefender(pos, player);
  if (i === 4) return new CoastDefenderShield(pos, player);
  if (i === 5) return new BallistaSquad(pos, player);
  if (i === 6) return new FlameKnight(pos, player);
  if (i === 7) return new FlameKnightShield(pos, player);
  if (i === 8) return new CoralCavalry(pos, player);
  if (i === 9) return new StoneGiant(pos, player);
  if (i === 10) return new StoneGiantFlame(pos, player);
  if (i === 11) return new GiantBallista(pos, player);
  if (i === 12) return new GiantBallistaShrapnel(pos, player);

  return null;
}
