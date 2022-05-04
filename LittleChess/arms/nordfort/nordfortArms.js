import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { updateEliteData } from "../armTools.js";

export class HallwayGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hallway Guards";
    this.m_name = "门厅守卫";
    this.type = "infantry";
    this.description = "infantry[resist-charging]";
    this.m_description = "近战步兵[抵御冲锋]";

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 20;
    this.chargeArmor = 40;

    this.meleeAttack = 25;

    this.antiArmor = 20;
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
    this.description = "shield-infantry[resist-charging]";
    this.m_description = "持盾-近战步兵[抵御冲锋]";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class NordExecutioner extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Executioners";
    this.m_name = "诺德刽子手";
    this.type = "infantry";
    this.description = "armor-infantry[anti-armor]";
    this.m_description = "装甲-近战步兵[高破甲]";

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 34;

    this.antiArmor = 55;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class NordHerald extends NordExecutioner {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Heralds";
    this.m_name = "诺德军锋";
    this.type = "infantry";
    this.description = "armor-infantry[resist-charging]";
    this.m_description = "装甲-近战步兵[抵御冲锋]";

    this.chargeArmor = 40;

    this.meleeAttack = 40;

    this.antiArmor = 0;
    this.loadRealtimeProps();
  }
}

export class NordHeraldE extends NordHerald {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Nord Heralds";
    this.m_name = "精英诺德军锋";
    this.type = "infantry";
    this.description = "armor-infantry  inspirator[resist-charging]";
    this.m_description = "装甲-近战步兵 鼓舞者[抵御冲锋]";

    this.inspiring = 12;
    this.inspireRange = 3;
    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class CoastDefender extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Defenders (Light)";
    this.m_name = "滨海守卫-轻装";
    this.type = "archers";
    this.description = "melee-archers[resist-charging]";
    this.m_description = "近战-远程步兵[抵御冲锋]";

    this.scale = 80;
    this.singleHP = 50;
    this.speed = 3;

    this.chargeArmor = 40;

    this.meleeAttack = 25;
    this.missileAttack = 30;
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
    this.description = "melee-shield-archers[resist-charging]";
    this.m_description = "近战-持盾-远程步兵[抵御冲锋]";

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
    this.description = "armor-melee-archers[long-range  anti-armor]";
    this.m_description = "装甲-近战-远程步兵[长程 高破甲]";

    this.scale = 80;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeArmor = 50;
    this.chargeArmor = 20;

    this.meleeAttack = 25;
    this.missileAttack = 50;
    this.missileRange = 8;

    this.antiArmor = 30;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class BallistaSquadE extends BallistaSquad {
  constructor(value, player) {
    super(value, player);

    this.name = "Elite Ballista Squad";
    this.m_name = "精英重弩小队";
    this.type = "archers";
    this.description = "melee-armor-archers[long-range  anti-armor]";
    this.m_description = "近战-装甲-远程步兵[长程 高破甲]";

    this.loadRealtimeProps();

    updateEliteData(this);
  }
}

export class CoastRanger extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Rangers";
    this.m_name = "滨海游骑兵";
    this.type = "cavalry";
    this.description = "missile-cavalry";
    this.m_description = "远程骑兵";

    this.scale = 50;
    this.singleHP = 100;
    this.speed = 6;

    this.missileDodge = 30;

    this.meleeAttack = 28;
    this.missileAttack = 30;
    this.missileRange = 6;
    this.isParabola = true;

    this.loadRealtimeProps();
  }
}

export class CoastRangerCharge extends CoastRanger {
  constructor(value, player) {
    super(value, player);

    this.name = "Coast Rangers (Charge)";
    this.m_name = "滨海游骑兵-冲杀";
    this.type = "cavalry";
    this.description = "missile-charging-cavalry";
    this.m_description = "远程-冲杀骑兵";

    this.chargeAttack = 58;
    this.loadRealtimeProps();
  }
}

export class FlameKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Flame Knights";
    this.m_name = "炎骑士";
    this.type = "cavalry";
    this.description = "charging-cavalry[anti-armor  agile]";
    this.m_description = "冲击骑兵[高破甲 迅捷如风]";

    this.scale = 50;
    this.singleHP = 120;
    this.speed = 7;

    this.missileDodge = 50;

    this.meleeAttack = 32;
    this.chargeAttack = 72;

    this.antiArmor = 40;
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
    this.description = "shield-charging-cavalry[anti-armor  agile]";
    this.m_description = "持盾-冲击骑兵[高破甲 迅捷如风]";

    this.missileArmor = 30;

    this.loadRealtimeProps();
  }
}

export class CoralCavalry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Coral Cavalry";
    this.m_name = "珊瑚骑兵团";
    this.type = "cavalry";
    this.description = "armor-charging-cavalry[anti-armor]";
    this.m_description = "装甲-冲击骑兵[高破甲]";

    this.scale = 50;
    this.singleHP = 120;
    this.speed = 5;

    this.meleeArmor = 50;
    this.missileDodge = 30;
    this.chargeArmor = 20;

    this.meleeAttack = 32;
    this.chargeAttack = 64;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }
}

export class GiantBallista extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 4;

    this.name = "Giant Ballistas";
    this.m_name = "巨型弩炮";
    this.type = "artillery";
    this.description = "artillery";
    this.m_description = "炮兵";

    this.scale = 7;
    this.singleHP = 700;
    this.speed = 1;

    this.missileAttack = 300;
    this.missileRange = 11;

    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class GiantBallistaShrapnel extends GiantBallista {
  constructor(value, player) {
    super(value, player);
    this.missileColor = null;
    this.missileWeight = 2;

    this.name = "Giant Ballistas (Shrapnel)";
    this.m_name = "巨型弩炮-霰弹";
    this.type = "artillery";
    this.description = "artillery[anti-infantry]";
    this.m_description = "炮兵[反步兵]";

    this.missileAttack = 300;
    this.missileAttack_bonus = 400;
    this.missileRange = 9;
    this.isParabola = true;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class StoneGiant extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Nord Stone Titan";
    this.m_name = "诺德巨石人";
    this.type = "monster";
    this.description = "giant[anti-infantry]";
    this.m_description = "巨兽[反步兵]";

    this.scale = 1;
    this.singleHP = 9000;
    this.speed = 3;

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.chargeArmor = 50;

    this.meleeAttack = 600;
    this.meleeAttack_bonus = 500;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
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
    this.description = "giant[anti-infantry  high-damage  rouser]";
    this.m_description = "巨兽[反步兵 高伤害 激励者]";

    this.meleeAttack = 700;
    this.meleeAttack_bonus = 800;

    this.attackEnhance = 60;
    this.enhanceRange = 4;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new HallwayGuard(pos, player);
  if (i === 1) return new HallwayGuardShield(pos, player);
  if (i === 2) return new NordExecutioner(pos, player);
  if (i === 3) return new NordHerald(pos, player);
  if (i === 4) return new NordHeraldE(pos, player);
  if (i === 5) return new CoastDefender(pos, player);
  if (i === 6) return new CoastDefenderShield(pos, player);
  if (i === 7) return new BallistaSquad(pos, player);
  if (i === 8) return new BallistaSquadE(pos, player);
  if (i === 9) return new CoastRanger(pos, player);
  if (i === 10) return new CoastRangerCharge(pos, player);
  if (i === 11) return new FlameKnight(pos, player);
  if (i === 12) return new FlameKnightShield(pos, player);
  if (i === 13) return new CoralCavalry(pos, player);
  if (i === 14) return new StoneGiant(pos, player);
  if (i === 15) return new StoneGiantFlame(pos, player);
  if (i === 16) return new GiantBallista(pos, player);
  if (i === 17) return new GiantBallistaShrapnel(pos, player);
  return null;
}
