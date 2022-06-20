import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";
import { addEffect } from "../../effects/effect.js";

export class PalaceGuard extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Palace Guards";
    this.m_name1 = "宫廷卫队";
    this.name2 = "Palace Guards (Giant Hammer)";
    this.m_name2 = "宫廷卫队-巨锤";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.extra = "Anti-Small / Anti-Heavy";
    this.m_extra = "反小型 / 反重甲";

    this.shield = 1200;
    this.shield_armor = 0;
    this.scale = 24;
    this.singleHP = 130;
    this.speed = 4;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 50];
    this.melee_data = [50, 50];

    this.leadership_bias = 100;
    this.cost_bias = 10;
    this.switchable = true;
    this.slowdown = false;
    this.slowdown_time = 0;
    this.loadRealtimeProps();
    this.ammo_record = [
      [-1, -1],
      [-1, -1],
    ];
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      if (this.status === 0) {
        singleDamage = this.c_melee;
        if (targetArm.size === 0) singleDamage += this.melee_bonus;
      } else {
        singleDamage = this.c_melee;
        if (targetArm.L_H === 1) singleDamage += this.melee_bonus;
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

      this.speed = 3;
      this.defence_data = [35, 20];
      this.melee_data = [40, 70];
      this.slowdown = true;
      this.slowdown_time = 1;
    } else {
      this.status = 0;

      this.speed = 4;
      this.defence_data = [0, 50];
      this.melee_data = [50, 50];
      this.slowdown = false;
      this.slowdown_time = 0;
    }

    this._endSwitch(true);
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

    this.name1 = "Soul Reapers";
    this.m_name1 = "灵魂收割者";
    this.name2 = "Soul Reapers (Whirlwind)";
    this.m_name2 = "宫廷卫队-旋风斩";
    this.name = this.name1;
    this.m_name = this.m_name1;

    this.shield = 1200;
    this.shield_armor = 0;
    this.scale = 24;
    this.singleHP = 130;
    this.speed = 4;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 70];
    this.melee_data = [150, 0];

    this.switchable = true;
    this.loadRealtimeProps();
    this.ammo_record = [
      [-1, -1],
      [-1, -1],
    ];
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(true);

    if (this.status === 0) {
      this.status = 1;

      this.speed = 1;
      this.defence_data = [0, 70];
      this.melee_data = [200, 0];
    } else {
      this.status = 0;

      this.speed = 4;
      this.defence_data = [0, 50];
      this.melee_data = [150, 0];
    }

    this._endSwitch(true);
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
    this.missileShape = "circle";
    this.missileRadius = 7;

    this.shield = 1100;
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

    if (rawTotalDamage >= 1) {
      addEffect(this.player.effectList, "armorEnhancing", null, this, null);
    }

    this.c_shield -= realDamage;
    let result = 0;
    if (this.c_shield < 0) {
      result = this.c_shield;
      this.c_shield = 0;
    }
    return result;
  }
}

export class AbyssKnight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Abyss Knights";
    this.m_name = "深渊骑士";
    this.extra = "Anti-Aggregation";
    this.m_extra = "反聚集";
    this.missileColor = MC.MagicColor;
    this.missileWeight = 4;
    this.missileShape = "circle";
    this.missileRadius = 4;

    this.shield = 1000;
    this.shield_armor = 60;
    this.scale = 15;
    this.singleHP = 120;
    this.speed = 2;

    this.type = [0, 1, 1, 1];
    this.defence_data = [40, 0];
    this.GAtogether = false;
    this.G_data = [50, 20, 4, 30];

    this.cost_bias = 28;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.c_scale >= 5) singleDamage += this.missile_G_bonus;
        if (targetArm.c_scale >= 10) singleDamage += this.missile_G_bonus;
        if (targetArm.c_scale >= 15) singleDamage += this.missile_G_bonus;
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
    this.extra = "Anti-Aggregation";
    this.m_extra = "反聚集";
    this.missileColor = MC.GhostColor;
    this.missileWeight = 9;
    this.missileNumber = 1;
    this.missileLaser = true;

    this.shield = 2500;
    this.shield_armor = 50;
    this.scale = 1;
    this.singleHP = 500;
    this.speed = 2;

    this.type = [0, 0, 1, 1];
    this.defence_data = [0, 20];
    this.melee_data = [1200, 600];
    this.GAtogether = true;
    this.G_data = [500, 250, 2, 40];

    this.cost_bias = 70;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_melee;
      if (targetArm.c_scale >= 3) singleDamage += this.melee_bonus;
      if (targetArm.c_scale >= 6) singleDamage += this.melee_bonus;
      if (targetArm.c_scale >= 9) singleDamage += this.melee_bonus;
    } else if (damageType === "missile" && this.c_ammo_G > 0) {
      this.c_ammo_G--;
      this.c_ammo_A--;
      singleDamage = this.c_missile_G;
      if (targetArm.c_scale >= 7) singleDamage += this.missile_G_bonus;
      if (targetArm.c_scale >= 14) singleDamage += this.missile_G_bonus;
      if (targetArm.c_scale >= 20) singleDamage += this.missile_G_bonus;
    }
    return singleDamage;
  }
}

export class FlameTitan extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Flame Titan";
    this.m_name = "烈焰泰坦";
    this.extra = "Anti-Bio";
    this.m_extra = "反生物";
    this.missileColor = MC.ATColor;
    this.missileWeight = 7;

    this.shield = 1500;
    this.shield_armor = 20;
    this.scale = 1;
    this.singleHP = 2000;
    this.speed = 2;

    this.type = [0, 1, 1, 2];
    this.defence_data = [50, 0];
    this.GAtogether = false;
    this.G_data = [450, 1050, 6, 25];

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

export class CurseTitan extends FlameTitan {
  constructor(value, player) {
    super(value, player);

    this.name = "Curse Titan";
    this.m_name = "诅咒泰坦";
    this.extra = "Anti-Mech";
    this.m_extra = "反机械";
    this.missileColor = "red";
    this.missileLaser = true;
    this.missileNumber = 1;

    this.G_data = [900, 600, 6, 25];

    this.cost_bias = 10;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
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

export class StarLight extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Star Lights";
    this.m_name = "星光";
    this.extra = "Anti-Light";
    this.m_extra = "反轻甲";
    this.missileWeight = 2;
    this.missileColor = MC.GhostColor;
    this.missileWeight_A = 4;
    this.missileColor_A = MC.GhostColor;

    this.shield = 1000;
    this.scale = 15;
    this.singleHP = 100;
    this.speed = 7;

    this.type = [1, 1, 0, 1];
    this.defence_data = [0, 56];
    this.GAtogether = false;
    this.G_data = [20, 20, 4, 25];
    this.A_data = [25, 20, 5, 30];

    this.slowdown = true;
    this.slowdown_time = 2;
    this.cost_bias = -80;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        singleDamage = this.c_missile_G;
        if (targetArm.L_H === 0) singleDamage += this.missile_G_bonus;
        this.c_ammo_G--;
      } else if (targetArm.G_A === 1 && this.c_ammo_A > 0) {
        singleDamage = this.c_missile_A;
        if (targetArm.L_H === 0) singleDamage += this.missile_A_bonus;
        this.c_ammo_A--;
      }
    }
    return singleDamage;
  }
}

export class HeliosFrigate extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Helios Frigates";
    this.m_name = "太阳神护卫舰";
    this.missileColor = MC.ATColor;
    this.missileLaser = true;
    this.missileNumber = 2;
    this.missileWeight = 10;

    this.shield = 1500;
    this.shield_armor = 30;
    this.scale = 2;
    this.singleHP = 1000;
    this.speed = 2;

    this.type = [1, 1, 1, 2];
    this.defence_data = [50, 0];
    this.GAtogether = true;
    this.G_data = [600, 0, 6, 40];

    this.loadRealtimeProps();
  }
}

export class HurricaneBattleship extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hurricane Battleship";
    this.m_name = "飓风战列舰";
    this.extra = "Anti-Aggregation";
    this.m_extra = "反聚集";
    this.missileShape = "circle";
    this.missileRadius = 12;
    this.missileNumber = 1;
    this.missileColor = MC.GhostColor;
    this.missileWeight = 10;

    this.shield = 2000;
    this.shield_armor = 40;
    this.scale = 1;
    this.singleHP = 2500;
    this.speed = 2;

    this.type = [1, 1, 1, 2];
    this.defence_data = [60, 0];
    this.GAtogether = false;
    this.G_data = [800, 200, 8, 40];
    this.A_data = [800, 200, 5, 30];

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.c_scale >= 7) singleDamage += this.missile_G_bonus;
        if (targetArm.c_scale >= 14) singleDamage += this.missile_G_bonus;
        if (targetArm.c_scale >= 20) singleDamage += this.missile_G_bonus;
      } else if (targetArm.G_A === 1 && this.c_ammo_A > 0) {
        this.c_ammo_A--;
        singleDamage = this.c_missile_A;
        if (targetArm.c_scale >= 3) singleDamage += this.missile_A_bonus;
        if (targetArm.c_scale >= 9) singleDamage += this.missile_A_bonus;
        if (targetArm.c_scale >= 12) singleDamage += this.missile_A_bonus;
      }
    }
    return singleDamage;
  }
}

export class AircraftCarrier extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Aircraft Carrier";
    this.m_name = "航天母舰";
    this.missileWeight = 4;

    this.shield = 2000;
    this.shield_armor = 40;
    this.scale = 1;
    this.singleHP = 2500;
    this.speed = 2;

    this.type = [1, 1, 1, 2];
    this.defence_data = [60, 0];
    this.GAtogether = false;

    this.brooder = true;
    this.brood_time = 5;
    this.brood_max = 5;

    this.canRelease = true;
    this.cost_bias = 100;
    this.loadRealtimeProps();
  }
  _prepareBrooding() {
    let brooded = new AircraftCarrier_1([0, 0], this.player);
    return brooded;
  }
  getAttachedName() {
    return ["Swarm Fighters", "蜂群战机"];
  }
}

export class AircraftCarrier_1 extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.live_max = 6;
    this.live_time = 0;

    this.name = "Swarm Fighters";
    this.m_name = "蜂群战机";
    this.extra = "Agile";
    this.m_extra = "迅捷";

    this.scale = 20;
    this.singleHP = 50;
    this.speed = 5;
    this.live_max = 8;
    this.live_time = 0;

    this.type = [1, 0, 0, 0];
    this.defence_data = [0, 80];
    this.GAtogether = true;
    this.G_data = [40, 0, 4, 10];

    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let armList = [
    new PalaceGuard([posX, posY], player),
    new ParagardeShield([posX, posY], player),
    new BlinkHunter([posX, posY], player),
    new SoulReaper([posX, posY], player),
    new GoldenKnight([posX, posY], player),
    new AbyssKnight([posX, posY], player),
    new ThunderGuard([posX, posY], player),
    new FlameTitan([posX, posY], player),
    new CurseTitan([posX, posY], player),
    new StarLight([posX, posY], player),
    new HeliosFrigate([posX, posY], player),
    new AircraftCarrier([posX, posY], player),
    new HurricaneBattleship([posX, posY], player),
  ];

  if (i >= 0 && i < armList.length) return armList[i];
  return null;
}
