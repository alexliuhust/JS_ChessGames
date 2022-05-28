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

    // this.shield = 1000;
    this.scale = 40;
    this.singleHP = 50;
    this.speed = 3;

    this.type = [0, 0, 0, 0];
    this.defence_data = [10, 0];
    this.melee_data = [16, 0];
    this.G_data = [50, 0, 4, 30];
    this.A_data = [30, 0, 4, 16];
    this.GAtogether = false;

    // this.inspiring = 20;
    // this.inspireRange = 3;
    // this.armorEnhance = 20;
    // this.enhanceRange = 2;
    this.loadRealtimeProps();
  }
}

export class BlackBat extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Black Bats";
    this.m_name = "黑蝠步兵";

    this.shield = 1300;
    this.shield_armor = 80;
    this.scale = 1;
    this.singleHP = 3000;
    this.speed = 3;

    this.type = [0, 0, 1, 0];
    this.defence_data = [40, 0];
    this.melee_data = [20, 0];
    this.G_data = [30, 30, 5, 20];
    // this.A_data = [20, 30, 5, 20];
    this.GAtogether = false;

    this.loadRealtimeProps();
  }
}

export class Sniper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Sniper Squad";
    this.m_name = "狙击小队";

    this.shield = 1300;
    this.shield_armor = 80;
    this.scale = 30;
    this.singleHP = 100;
    this.speed = 3;

    this.type = [1, 0, 1, 0];
    this.defence_data = [40, 0];
    this.melee_data = [20, 0];
    // this.G_data = [30, 30, 5, 20];
    // this.A_data = [0, 0, 0, -1];
    this.GAtogether = false;

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
