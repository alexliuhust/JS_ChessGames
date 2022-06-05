import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";

export class PalaceGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Palace Guards";
    this.m_name = "宫廷卫队";
    this.extra = "Anti-Small";
    this.m_extra = "反小型";

    this.shield = 1200;
    this.shield_armor = 0;
    this.scale = 24;
    this.singleHP = 130;
    this.speed = 4;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 50];
    this.melee_data = [50, 50];

    this.leadership_bias = 100;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_melee;
      if (targetArm.size === 0) singleDamage += this.melee_bonus;
    }
    return singleDamage;
  }
}

export class ParagardeShield extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Paragarde's Shields";
    this.m_name = "帕拉加德之盾";
    this.extra = "Charger, Protector";
    this.m_extra = "充能者，护卫者";

    this.shield = 400;
    this.shield_armor = 50;
    this.scale = 5;
    this.singleHP = 100;
    this.speed = 4;

    this.type = [0, 1, 0, 0];
    this.defence_data = [0, 30];
    this.GAtogether = true;
    this.G_data = [20, 0, 4, 20];

    this.charging = 30;
    this.chargeRange = 2;
    this.totalCharge = 240;
    this.c_totalCharge = this.totalCharge;
    this.armorEnhance = 15;
    this.enhanceRange = 2;

    this.cost_bias -= 40;
    this.loadRealtimeProps();
  }
}

export class BlinkHunter extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Blink Hunters";
    this.m_name1 = "闪烁猎人";
    this.name2 = "Blink Hunters (Blinking Mode)";
    this.m_name2 = "闪烁猎人-闪烁模式";
    this.extra = "Agile";
    this.m_extra = "迅捷";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.missileColor = MC.GhostColor;
    this.missileWeight = 2;
    this.missileNumber = 10;

    this.shield = 1000;
    this.shield_armor = 0;
    this.scale = 20;
    this.singleHP = 100;
    this.speed = 4;

    this.type = [0, 1, 0, 1];
    this.defence_data = [10, 40];
    this.melee_data = [30, 0];
    this.GAtogether = true;
    this.G_data = [25, 0, 4, 30];

    this.slowdown = true;
    this.slowdown_time = 2;

    this.switchable = true;
    this.loadRealtimeProps();
    this.ammo_record = [
      [30, 30],
      [0, 0],
    ];
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(true);

    if (this.status === 0) {
      this.status = 1;

      this.speed = 6;
      this.type = [1, 1, 0, 1];
      this.defence_data = [0, 90];
      this.melee_data = [0, 0];
      this.GAtogether = false;
      this.G_data = [0, 0, 0, -1];
      this.A_data = [0, 0, 0, -1];
    } else {
      this.status = 0;

      this.speed = 4;
      this.type = [0, 1, 0, 1];
      this.defence_data = [10, 40];
      this.melee_data = [30, 0];
      this.GAtogether = true;
      this.G_data = [25, 0, 4, 30];
    }

    this._endSwitch(true);
  }
}

export class SoulReaper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Soul Reapers";
    this.m_name = "灵魂收割者";

    this.shield = 1200;
    this.shield_armor = 0;
    this.scale = 24;
    this.singleHP = 130;
    this.speed = 4;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 70];
    this.melee_data = [150, 0];

    this.loadRealtimeProps();
  }
}

export class GoldenKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Golden Knights";
    this.m_name = "黄金骑士";
    this.extra = "Anti-Heavy";
    this.m_extra = "反重甲";
    this.missileColor = MC.ATColor;
    this.missileWeight = 5;

    this.shield = 1000;
    this.shield_armor = 80;
    this.scale = 15;
    this.singleHP = 120;
    this.speed = 2;

    this.type = [0, 1, 1, 1];
    this.defence_data = [40, 0];
    this.GAtogether = false;
    this.G_data = [25, 55, 4, 30];

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.L_H === 1) singleDamage += this.missile_G_bonus;
      }
    }
    return singleDamage;
  }
  decreaseShield(rawTotalDamage) {
    let armor = 0;

    let factor = Math.round(rawTotalDamage / 200);
    factor = Math.max(factor, 1);
    armor = (this.shield_armor / 5) * factor;

    let damagePercentage = (100 - armor) / 100;
    if (damagePercentage < 0.1) damagePercentage = 0.1;
    let realDamage = Math.round(rawTotalDamage * damagePercentage);

    if (realDamage > 300) realDamage = 300;

    this.c_shield -= realDamage;
    if (this.c_shield < 0) this.c_shield = 0;
    return 0;
  }
}

export class GoldenTitan extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Golden Titans";
    this.m_name = "黄金泰坦";
    this.extra = "Anti-Bio";
    this.m_extra = "反生物";
    this.missileColor = MC.ATColor;
    this.missileWeight = 2;
    this.missileNumber = 10;

    this.shield = 1500;
    this.shield_armor = 20;
    this.scale = 3;
    this.singleHP = 1200;
    this.speed = 2;

    this.type = [0, 1, 1, 2];
    this.defence_data = [40, 0];
    this.GAtogether = false;
    this.G_data = [150, 350, 6, 25];

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.B_M === 0) singleDamage += this.missile_G_bonus;
      }
    }
    return singleDamage;
  }
}

export class CurseTitan extends GoldenTitan {
  constructor(value, player) {
    super(value, player);

    this.name = "Curse Titans";
    this.m_name = "诅咒泰坦";
    this.extra = "Anti-Mech";
    this.m_extra = "反机械";
    this.missileColor = MC.MagicColor;
    this.missileWeight = 7;
    this.missileNumber = null;

    this.G_data = [300, 200, 6, 25];

    this.cost_bias = 10;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    this.missileNumber = this.c_scale;
    let singleDamage = 0;
    if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.B_M === 1) singleDamage += this.missile_G_bonus;
      }
    }
    return singleDamage;
  }
}

export class ThunderGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Thunder Guard";
    this.m_name = "雷霆卫";
    this.missileColor = MC.GhostColor;
    this.missileWeight = 9;
    this.missileNumber = 1;

    this.shield = 2500;
    this.shield_armor = 50;
    this.scale = 1;
    this.singleHP = 500;
    this.speed = 2;

    this.type = [0, 1, 1, 1];
    this.defence_data = [0, 20];
    this.melee_data = [2000, 0];
    this.GAtogether = true;
    this.G_data = [1000, 0, 2, 40];

    this.cost_bias = 50;
    this.loadRealtimeProps();
  }
}

export class AircraftCarrier extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Aircraft Carrier";
    this.m_name = "航空母舰";
    this.name2 = "Swarm Fighters";
    this.m_name2 = "蜂群战机";
    this.missileWeight = 4;

    this.shield = 2000;
    this.shield_armor = 40;
    this.scale = 1;
    this.singleHP = 2500;
    this.speed = 2;

    this.type = [1, 1, 1, 2];
    this.defence_data = [60, 0];
    this.GAtogether = true;
    this.G_data = [800, 0, 9, 50];

    this.cost_bias = 0;
    this.attached = true;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new PalaceGuard(pos, player);
  if (i === 1) return new ParagardeShield(pos, player);
  if (i === 2) return new BlinkHunter(pos, player);
  if (i === 3) return new SoulReaper(pos, player);
  if (i === 4) return new GoldenKnight(pos, player);
  if (i === 5) return new GoldenTitan(pos, player);
  if (i === 6) return new CurseTitan(pos, player);
  if (i === 7) return new ThunderGuard(pos, player);
  if (i === 8) return new AircraftCarrier(pos, player);

  return null;
}
