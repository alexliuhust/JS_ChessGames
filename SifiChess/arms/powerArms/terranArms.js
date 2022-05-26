import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { updateEliteData } from "../armTools.js";

export class SwordInfantry extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Empire Infantry";
    this.m_name = "帝国步兵";
    this.type = "infantry";
    this.description = "Infantry[Anti-Infantry]";
    this.m_description = "近战步兵[反步兵]";

    this.scale = 100;
    this.singleHP = 50;
    this.speed = 2;

    this.meleeAttack = 24;
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

export class Marine extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Marines";
    this.m_name = "陆战队";
    this.type = "archers";
    this.description = "Archers[Anti-Armor]";
    this.m_description = "远程步兵[高破甲]";

    this.scale = 80;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeAttack = 16;
    this.missileAttack = 24;
    this.missileRange = 6;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class BlackBat extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Black Bats";
    this.m_name = "黑蝠步兵";
    this.type = "archers";
    this.description = "Shield-Archers[Anti-Armor]";
    this.m_description = "持盾-远程步兵[高破甲]";

    this.scale = 80;
    this.singleHP = 50;
    this.speed = 3;

    this.missileArmor = 30;

    this.meleeAttack = 16;
    this.missileAttack = 24;
    this.missileRange = 6;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }
}

export class Sniper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Sniper Squad";
    this.m_name = "狙击小队";
    this.type = "archers";
    this.description = "Archers[Anti-Armor  Anti-Large  Long-Range]";
    this.m_description = "远程步兵[高破甲 反大型 长程]";

    this.scale = 60;
    this.singleHP = 50;
    this.speed = 3;

    this.meleeAttack = 24;
    this.missileAttack = 30;
    this.missileAttack_bonus = 30;
    this.missileRange = 8;

    this.antiArmor = 50;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isLarge()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new Marine(pos, player);
  if (i === 1) return new BlackBat(pos, player);
  if (i === 2) return new Sniper(pos, player);
  return null;
}
