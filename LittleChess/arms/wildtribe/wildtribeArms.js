import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";

export class OrcWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Orc Warriors";
    this.m_name = "兽人勇士";
    this.type = "infantry";
    this.description = "infantry [anti-infantry]";
    this.m_description = "近战步兵【反步兵】";

    this.scale = 80;
    this.singleHP = 80;
    this.speed = 3;

    this.meleeAttack = 34;
    this.meleeAttack_bonus = 24;

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

export class OrcWarriorSpear extends OrcWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Orc Warriors (Spear)";
    this.m_name = "兽人勇士-持矛";
    this.type = "infantry";
    this.description = "infantry [resist-charging]";
    this.m_description = "近战步兵【抵御冲锋】";

    this.chargeArmor = 30;

    this.meleeAttack = 34;
    this.meleeAttack_bonus = 0;

    this.loadRealtimeProps();
  }
}

export class OrcWarriorTS extends OrcWarrior {
  constructor(value, player) {
    super(value, player);

    this.name = "Orc Warriors (Javelin)";
    this.m_name = "兽人勇士-标枪";
    this.type = "infantry";
    this.description = "hurling-infantry [resist-charging]";
    this.m_description = "投掷-近战步兵【抵御冲锋】";

    this.chargeArmor = 30;

    this.meleeAttack = 34;
    this.meleeAttack_bonus = 0;
    this.missileAttack = 52;
    this.missileRange = 6;
    this.isParabola = true;

    this.ammo = 4;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") singleDamage = this.c_meleeAttack;
    else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class ChampionWarrior extends OrcWarrior {
  constructor(value, player) {
    super(value, player);
    this.missileWeight = 4;

    this.name = "Champion Warriors";
    this.m_name = "冠军勇士";
    this.type = "infantry";
    this.description = "hurling-infantry [anti-infantry]";
    this.m_description = "投掷-近战步兵【反步兵】";

    this.meleeAttack = 44;
    this.meleeAttack_bonus = 30;
    this.missileAttack = 70;
    this.missileRange = 4;
    this.isParabola = true;

    this.ammo = 4;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isInfn()) singleDamage += this.meleeAttack_bonus;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class Tauren extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren";
    this.m_name = "牛头人";
    this.type = "monster-infantry";
    this.description = "monster-infantry";
    this.m_description = "怪兽步兵";

    this.scale = 30;
    this.singleHP = 300;
    this.speed = 4;

    this.chargeArmor = 30;

    this.meleeAttack = 40;

    this.loadRealtimeProps();
  }
}

export class TaurenLog extends Tauren {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren (Log)";
    this.m_name = "牛头人-圆木";
    this.type = "monster-infantry";
    this.description = "monster-infantry [anti-infantry]";
    this.m_description = "怪兽步兵【反步兵】";

    this.meleeAttack_bonus = 40;

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

export class TaurenGA extends Tauren {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren (Great Axe)";
    this.m_name = "牛头人-巨斧";
    this.type = "monster-infantry";
    this.description = "monster-infantry [anti-large, anti-armor]";
    this.m_description = "怪兽步兵【反大型，高破甲】";

    this.meleeAttack_bonus = 40;

    this.antiArmor = 30;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class TaurenBerserker extends Tauren {
  constructor(value, player) {
    super(value, player);

    this.name = "Tauren Berserkers";
    this.m_name = "牛头人狂战士";
    this.type = "monster-infantry";
    this.description = "monster-infantry [fast, inspirator]";
    this.m_description = "怪兽步兵【迅捷如风，鼓舞者】";

    this.speed = 6;

    this.meleeAttack = 40;
    this.chargeAttack = 50;

    this.antiArmor = 16;

    this.inspiring = 10;
    this.inspireRange = 3;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class WolfCavalry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Wolf Cavalry";
    this.m_name = "狼骑兵";
    this.type = "cavalry";
    this.description = "melee-cavalry [fast]";
    this.m_description = "近战骑兵【迅捷如风】";

    this.scale = 60;
    this.singleHP = 100;
    this.speed = 8;

    this.meleeDodge = 40;
    this.missileDodge = 40;

    this.meleeAttack = 30;

    this.loadRealtimeProps();
  }
}

export class WolfCavalryTS extends WolfCavalry {
  constructor(value, player) {
    super(value, player);

    this.name = "Wolf Cavalry (Javelin)";
    this.m_name = "狼骑兵-标枪";
    this.type = "cavalry";
    this.description = "missile-cavalry [fast]";
    this.m_description = "远程骑兵【迅捷如风】";

    this.missileAttack = 40;
    this.missileRange = 6;
    this.isParabola = true;

    this.ammo = 5;
    this.loadRealtimeProps();
  }
}

export class RhinoTrooper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Rhino Troopers";
    this.m_name = "犀牛骑兵";
    this.type = "cavalry";
    this.description = "charging-cavalry [anti-armor]";
    this.m_description = "冲击骑兵【高破甲】";

    this.scale = 50;
    this.singleHP = 160;
    this.speed = 5;

    this.meleeArmor = 50;
    this.missileArmor = 50;

    this.meleeAttack = 34;
    this.chargeAttack = 80;

    this.antiArmor = 30;
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
    this.description = "charging-cavalry [anti-armor, healer, rouser]";
    this.m_description = "冲击骑兵【高破甲，治疗者，激励者】";

    this.healing = 20;
    this.healRange = 3;
    this.totalHeal = 160;

    this.attackEnhance = 50;
    this.enhanceRange = 3;
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
    this.description = "charging-cavalry [anti-armor, missile-attack]";
    this.m_description = "冲击骑兵【高破甲，远程攻击】";

    this.missileAttack = 50;
    this.missileRange = 7;
    this.ammo = 15;

    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "charge" || damageType === "missile")
      return this.antiArmor;
    return 0;
  }
}

export class Minotaur extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Minotaur";
    this.m_name = "米诺陶";
    this.type = "monster";
    this.description = "bombing-giant";
    this.m_description = "轰炸巨兽";

    this.scale = 1;
    this.singleHP = 8000;
    this.speed = 2;

    this.meleeAttack = 800;
    this.missileAttack = 1200;
    this.missileRange = 10;
    this.missileRadius = 1;
    this.isBombing = true;

    this.ammo = 14;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new OrcWarrior(pos, player);
  if (i === 1) return new OrcWarriorSpear(pos, player);
  if (i === 2) return new OrcWarriorTS(pos, player);
  if (i === 3) return new ChampionWarrior(pos, player);
  if (i === 4) return new WolfCavalry(pos, player);
  if (i === 5) return new WolfCavalryTS(pos, player);
  if (i === 6) return new RhinoTrooper(pos, player);
  if (i === 7) return new RhinoShaman(pos, player);
  if (i === 8) return new RhinoTrooperBallista(pos, player);
  if (i === 9) return new Tauren(pos, player);
  if (i === 10) return new TaurenLog(pos, player);
  if (i === 11) return new TaurenGA(pos, player);
  if (i === 12) return new TaurenBerserker(pos, player);
  if (i === 13) return new Minotaur(pos, player);

  return null;
}
