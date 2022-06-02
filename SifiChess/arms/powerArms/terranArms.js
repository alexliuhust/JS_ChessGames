import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";

export class Marine extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Marines";
    this.m_name = "陆战队";

    this.scale = 40;
    this.singleHP = 60;
    this.speed = 3;

    this.type = [0, 0, 0, 0];
    this.defence_data = [5, 10];
    this.melee_data = [11, 0];
    this.G_data = [14, 0, 3, 25];
    this.GAtogether = true;

    this.loadRealtimeProps();
  }
}

export class ShieldMarine extends Marine {
  constructor(value, player) {
    super(value, player);

    this.name = "Shield Marines";
    this.m_name = "持盾陆战队";

    this.singleHP = 70;
    this.speed = 3;
    this.defence_data = [5, 10];
    this.melee_data = [11, 0];
    this.G_data = [14, 0, 3, 25];

    this.switchable = true;
    this.cost_bias = 15;
    this.loadRealtimeProps();
    this.ammo_record = [[25, 25]];
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(true);

    if (this.status === 0) {
      this.status = 1;

      this.name = "Shield Marines (Hold)";
      this.m_name = "持盾陆战队-举盾";
      this.speed = 1;
      this.defence_data = [35, 0];
      this.melee_data = [12, 0];
      this.G_data = [14, 0, 4, 25];
    } else {
      this.status = 0;

      this.name = "Shield Marines";
      this.m_name = "持盾陆战队";
      this.speed = 3;
      this.defence_data = [5, 10];
      this.melee_data = [11, 0];
      this.G_data = [14, 0, 3, 25];
    }

    this._endSwitch(false);
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
    this.G_data = [16, 28, 4, 20];
    this.bonus_1 = 18;
    this.bonus_2 = this.G_data[1] - this.bonus_1;
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
        if (targetArm.size === 3) singleDamage += this.bonus_1;
        if (targetArm.L_H === 1) singleDamage += this.bonus_2;
      }
    }
    return singleDamage;
  }
}

export class BlackBatShock extends BlackBat {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.GhostColor;
    this.missileWeight = 4;

    this.name = "Black Bats (Shocking)";
    this.m_name = "黑蝠步兵-震撼弹";

    this.shock = 10;
    this.slowdown = true;
    this.slowdown_time = 2;
    this.loadRealtimeProps();
  }
}

export class FireBat extends BlackBat {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.FireColor;
    this.missileWeight = 5;

    this.name = "Fire Bats";
    this.m_name = "火蝠步兵";

    this.G_data = [15, 27, 2, 15];
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
          singleDamage += Math.round(this.missile_G_bonus * 0.8);
        if (targetArm.L_H === 0)
          singleDamage += Math.round(this.missile_G_bonus * 0.2);
      }
    }
    return singleDamage;
  }
}

export class StormChariot extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Storm Chariots";
    this.m_name = "风暴战车";

    this.scale = 15;
    this.singleHP = 200;
    this.speed = 5;

    this.type = [0, 1, 0, 1];
    this.defence_data = [15, 20];
    this.melee_data = [0, 0];
    this.GAtogether = true;
    this.G_data = [32, 0, 4, 30];

    this.switchable = true;

    this.loadRealtimeProps();
    this.ammo_record = [
      [30, 20],
      [30, 20],
    ];
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(false);

    if (this.status === 0) {
      this.status = 1;

      this.name = "Storm Bunkers";
      this.m_name = "风暴碉堡";
      this.speed = 0;
      this.defence_data = [30, 0];
      this.GAtogether = false;
      this.G_data = [0, 0, 0, -1];
      this.A_data = [62, 0, 7, 20];
    } else {
      this.status = 0;

      this.name = "Storm Chariots";
      this.m_name = "风暴战车";
      this.speed = 5;
      this.defence_data = [15, 20];
      this.GAtogether = true;
      this.G_data = [32, 0, 4, 30];
    }

    this._endSwitch(true);
  }
}

export class Paladin extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Paladin MBTs";
    this.m_name = "圣骑士主战坦克";
    this.missileColor = MC.ATColor;
    this.missileWeight = 3;

    this.scale = 10;
    this.singleHP = 300;
    this.speed = 3;

    this.type = [0, 1, 1, 1];
    this.defence_data = [40, 0];
    this.G_data = [55, 45, 4, 20];
    this.GAtogether = false;

    this.shock = 0;
    this.switchable = true;
    this.cost_bias = 59;

    this.healing = 10;
    this.totalHeal = 200;
    this.healRange = 3;
    this.c_totalHeal = 200;
    this.loadRealtimeProps();
    this.ammo_record = [
      [20, 0],
      [35, 0],
    ];
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (this.status === 0) {
      if (damageType === "missile") {
        if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
          this.c_ammo_G--;
          singleDamage = this.c_missile_G;
          if (targetArm.B_M === 1) singleDamage += this.missile_G_bonus;
        }
      }
    } else {
      if (damageType === "missile") {
        if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
          this.c_ammo_G--;
          singleDamage = this.c_missile_G;
          if (targetArm.c_scale >= 5) singleDamage += this.missile_G_bonus;
          if (targetArm.c_scale >= 10) singleDamage += this.missile_G_bonus;
          if (targetArm.c_scale >= 15) singleDamage += this.missile_G_bonus;
        }
      }
    }
    return singleDamage;
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(false);

    if (this.status === 0) {
      this.status = 1;

      this.name = "Paladin Howitzers";
      this.m_name = "圣骑士榴弹炮";
      this.missileColor = MC.BombColor;
      this.missileWeight = 5;
      this.speed = 0;
      this.G_data = [100, 30, 8, 35];
      this.shock = 30;
    } else {
      this.status = 0;

      this.name = "Paladin MBTs";
      this.m_name = "圣骑士主战坦克";
      this.missileColor = MC.ATColor;
      this.missileWeight = 3;
      this.speed = 3;
      this.G_data = [55, 45, 4, 20];
      this.shock = 0;
    }

    this._endSwitch(true);
  }
}

export class DeckDropper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Deck Droppers";
    this.m_name = "跳帮队";

    this.scale = 15;
    this.singleHP = 165;
    this.speed = 5;

    this.type = [1, 1, 0, 1];
    this.defence_data = [10, 30];
    this.melee_data = [0, 0];
    this.GAtogether = false;
    this.G_data = [0, 0, 0, -1];
    this.A_data = [50, 40, 6, 20];

    this.switchable = true;

    this.loadRealtimeProps();
    this.ammo_record = [
      [0, 20],
      [35, 0],
    ];
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (this.status === 0) {
      if (
        damageType === "missile" &&
        targetArm.G_A === 1 &&
        this.c_ammo_A > 0
      ) {
        singleDamage = this.c_missile_A;
        if (targetArm.L_H === 1) singleDamage += this.missile_A_bonus;
        this.c_ammo_A--;
      }
    } else {
      if (damageType === "melee") singleDamage += this.c_melee;
      else if (
        damageType === "missile" &&
        targetArm.G_A === 0 &&
        this.c_ammo_G > 0
      ) {
        singleDamage = this.c_missile_G;
        this.c_ammo_G--;
      }
    }
    return singleDamage;
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(false);

    if (this.status === 0) {
      this.status = 1;

      this.name = "Deck Droppers (Landed)";
      this.m_name = "跳帮队-着陆";
      this.speed = 3;
      this.defence_data = [30, 0];
      this.melee_data = [30, 0];
      this.type = [0, 1, 0, 1];
      this.G_data = [45, 0, 4, 35];
      this.A_data = [0, 0, 0, -1];
    } else {
      this.status = 0;

      this.name = "Deck Droppers";
      this.m_name = "跳帮队";
      this.speed = 5;
      this.defence_data = [10, 30];
      this.melee_data = [0, 0];
      this.type = [1, 1, 0, 1];
      this.G_data = [0, 0, 0, -1];
      this.A_data = [50, 40, 6, 20];
    }

    this._endSwitch(true);
  }
}

export class Cruiser extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Cruiser";
    this.m_name = "巡洋舰";
    this.missileColor = "white";
    this.missileWeight = 2;

    this.scale = 1;
    this.singleHP = 4000;
    this.speed = 3;

    this.type = [1, 1, 1, 2];
    this.defence_data = [65, 0];
    this.melee_data = [0, 0];
    this.GAtogether = true;
    this.G_data = [400, 300, 6, 40];

    this.switchable = true;
    this.cost_bias = 50;
    this.loadRealtimeProps();
    this.ammo_record = [
      [40, 40],
      [20, 20],
    ];
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (this.status === 0) {
      if (damageType === "missile" && this.c_ammo_G * this.c_ammo_A > 0) {
        this.c_ammo_G--;
        this.c_ammo_A--;
        singleDamage = this.c_missile_G;
        if (targetArm.L_H === 0) singleDamage += this.missile_G_bonus;
      }
    } else {
      if (damageType === "missile" && this.c_ammo_G * this.c_ammo_A > 0) {
        this.c_ammo_G--;
        this.c_ammo_A--;
        singleDamage = this.c_missile_G;
        if (targetArm.L_H === 1) singleDamage += this.missile_G_bonus;
      }
    }
    return singleDamage;
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(true);

    if (this.status === 0) {
      this.status = 1;

      this.name = "Cruiser (Main Gun Salvo)";
      this.m_name = "巡洋舰-主炮齐射";
      this.missileColor = MC.FireColor;
      this.missileWeight = 7;
      this.speed = 1;
      this.G_data = [1000, 200, 7, 20];
    } else {
      this.status = 0;

      this.name = "Cruiser";
      this.m_name = "巡洋舰";
      this.missileColor = "white";
      this.missileWeight = 2;
      this.speed = 3;
      this.G_data = [400, 300, 5, 40];
    }

    this._endSwitch(true);
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new Marine(pos, player);
  if (i === 1) return new ShieldMarine(pos, player);
  if (i === 2) return new FireBat(pos, player);
  if (i === 3) return new BlackBat(pos, player);
  if (i === 4) return new BlackBatShock(pos, player);
  if (i === 5) return new StormChariot(pos, player);
  if (i === 6) return new Paladin(pos, player);
  if (i === 7) return new DeckDropper(pos, player);
  if (i === 8) return new Cruiser(pos, player);
  return null;
}
