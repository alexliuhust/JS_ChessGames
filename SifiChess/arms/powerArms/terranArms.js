import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { updateEliteData, updateRealTimeProperties } from "../armTools.js";

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

    this.scale = 40;
    this.singleHP = 60;
    this.speed = 2;

    this.type = [0, 0, 0, 0];
    this.defence_data = [10, 0];
    this.melee_data = [10, 0];
    this.G_data = [14, 0, 3, 25];
    this.GAtogether = true;

    this.loadRealtimeProps();
  }
}

export class MarineRE extends Marine {
  constructor(value, player) {
    super(value, player);

    this.name = "Marines (Range Extended)";
    this.m_name = "陆战队-增程";

    this.G_data = [15, 0, 4, 25];

    this.loadRealtimeProps();
  }
}

export class MarineShield extends MarineRE {
  constructor(value, player) {
    super(value, player);

    this.name = "Marines (Riot Shield)";
    this.m_name = "陆战队-防暴盾";

    this.singleHP = 78;

    this.defence_data = [18, 0];

    this.loadRealtimeProps();
  }
}

export class BlackBat extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 3;

    this.name = "Black Bats";
    this.m_name = "黑蝠步兵";

    this.scale = 30;
    this.singleHP = 135;
    this.speed = 2;

    this.type = [0, 0, 1, 0];
    this.defence_data = [35, 0];
    this.melee_data = [17, 0];
    this.G_data = [16, 0, 4, 20];
    this.GAtogether = false;

    this.loadRealtimeProps();
  }
}

export class BlackBatAH extends BlackBat {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.GhostColor;
    this.missileWeight = 4;

    this.name = "Black Bats (Anti-Heavy)";
    this.m_name = "黑蝠步兵-反重甲";

    this.G_data = [16, 20, 4, 20];
    this.GAtogether = false;

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_melee;
    } else if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.L_H === 1)
          singleDamage += Math.round(this.missile_G_bonus * 0.95);
        if (targetArm.size === 3)
          singleDamage += Math.round(this.missile_G_bonus * 0.25);
      }
    }
    return singleDamage;
  }
}

export class FireBat extends BlackBat {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 5;

    this.name = "Fire Bats";
    this.m_name = "火蝠步兵";

    this.G_data = [18, 22, 3, 15];
    this.GAtogether = false;

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_melee;
    } else if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.B_M === 0)
          singleDamage += Math.round(this.missile_G_bonus * 0.4);
        if (targetArm.L_H === 0)
          singleDamage += Math.round(this.missile_G_bonus * 0.6);
      }
    }
    return singleDamage;
  }
}

export class Sniper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Test 1";
    this.m_name = "测试1";

    this.scale = 10;
    this.singleHP = 1000;
    this.speed = 3;

    this.type = [0, 1, 1, 1];
    this.defence_data = [40, 0];
    this.melee_data = [20, 0];
    this.GAtogether = false;

    this.loadRealtimeProps();
  }
}

export class Test extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Test 2";
    this.m_name = "测试2";

    this.scale = 40;
    this.singleHP = 60;
    this.speed = 8;

    this.type = [1, 1, 0, 0];
    this.defence_data = [40, 0];
    this.melee_data = [20, 0];
    this.GAtogether = false;

    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new Marine(pos, player);
  if (i === 1) return new MarineRE(pos, player);
  if (i === 2) return new MarineShield(pos, player);
  if (i === 3) return new BlackBat(pos, player);
  if (i === 4) return new BlackBatAH(pos, player);
  if (i === 5) return new FireBat(pos, player);
  if (i === 6) return new Sniper(pos, player);
  if (i === 7) return new Test(pos, player);
  return null;
}
