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
    this.extra = "Anti-Small";
    this.m_extra = "反小型";

    this.switchInfo = [
      `With sharp swords in hand\nand bonus damage against small units`,
      "Two-handed hammer,\ndamage bonus against heavily armored units",
    ];
    this.m_switchInfo = [
      "手持利剑，对抗小型单位有伤害加成",
      "双手持巨锤，对抗重甲单位有伤害加成",
    ];

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
      this.extra = "Anti-Heavy";
      this.m_extra = "反重甲";
      this.speed = 3;
      this.defence_data = [35, 20];
      this.melee_data = [40, 70];
      this.slowdown = true;
      this.slowdown_time = 1;
    } else {
      this.status = 0;
      this.extra = "Anti-Small";
      this.m_extra = "反小型";
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
    this.missileWeight = 3;
    this.missileLaser = true;
    this.missileColor = MC.GhostColor;
    this.scanLaser = false;

    this.shield = 400;
    this.shield_armor = 50;
    this.scale = 5;
    this.singleHP = 100;
    this.speed = 4;

    this.type = [0, 1, 0, 0];
    this.defence_data = [0, 30];
    this.GAtogether = true;
    this.G_data = [50, 0, 5, 40];

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

    this.switchInfo = [
      `Ground units, can attack both air and ground units`,
      "Air units, lose attack ability but gain high evasion",
    ];
    this.m_switchInfo = [
      "地面单位，可对空对地",
      "空中单位，失去攻击能力但获得高闪避",
    ];

    this.shield = 1000;
    this.shield_armor = 0;
    this.scale = 20;
    this.singleHP = 100;
    this.speed = 4;

    this.type = [0, 1, 0, 1];
    this.defence_data = [10, 40];
    this.melee_data = [30, 0];
    this.GAtogether = true;
    this.G_data = [25, 0, 4, 60];

    this.slowdown = true;
    this.slowdown_time = 2;

    this.switchable = true;
    this.loadRealtimeProps();
    this.ammo_record = [
      [60, 60],
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
      this.G_data = [25, 0, 4, 60];
    }

    this._endSwitch(true);
  }
}

export class ShadowWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Shadow Warriors";
    this.m_name1 = "暗影战士";
    this.name2 = "Shadow Warriors (Whirlwind)";
    this.m_name2 = "暗影战士-旋风斩";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.switchInfo = [
      `Gain faster movement speed`,
      "Movement speed greatly slowed,\nbut gain increased damage and dodge",
    ];
    this.m_switchInfo = [
      "获得更快的移动速度",
      "移动速度大幅减缓，但获得更高的伤害和闪避",
    ];

    this.shield = 1200;
    this.shield_armor = 0;
    this.scale = 24;
    this.singleHP = 130;
    this.speed = 5;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 50];
    this.melee_data = [150, 0];

    this.cost_bias = 10;
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

      this.speed = 2;
      this.defence_data = [0, 70];
      this.melee_data = [200, 0];
    } else {
      this.status = 0;

      this.speed = 5;
      this.defence_data = [0, 50];
      this.melee_data = [150, 0];
    }

    this._endSwitch(true);
  }
}

export class Caelumanians extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Caelumanians";
    this.m_name1 = "天羽卫";
    this.name2 = "Caelumanians (Flying)";
    this.m_name2 = "天羽卫-飞行";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.extra = "Anti-Bio";
    this.m_extra = "反生物";
    this.missileShape = "circle";
    this.missileRadius = 12;
    this.missileNumber = 1;
    this.missileColor = MC.GhostColor;
    this.missileWeight = 10;

    this.switchInfo = [
      "Ground units, can attack ground units and cause high damage",
      "Air units, lose attack ability but gain high evasion",
    ];
    this.m_switchInfo = [
      "地面单位，可对地并造成高伤害",
      "空中单位，失去攻击能力但获得高闪避",
    ];

    this.shield = 1000;
    this.shield_armor = 10;
    this.scale = 16;
    this.singleHP = 130;
    this.speed = 4;

    this.type = [0, 0, 0, 0];
    this.defence_data = [30, 30];
    this.melee_data = [100, 0];
    this.GAtogether = false;
    this.G_data = [10, 125, 5, 10];

    this.leadership_bias = 50;
    this.cost_bias = 0;
    this.switchable = true;
    this.loadRealtimeProps();
    this.ammo_record = [
      [10, 0],
      [0, 0],
    ];
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (this.status === 0) {
      if (damageType === "melee") {
        singleDamage = this.c_melee;
      } else if (damageType === "missile") {
        if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
          this.c_ammo_G--;
          singleDamage = this.c_missile_G;
          if (targetArm.B_M == 0) singleDamage += this.missile_G_bonus;
        }
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
      this.extra = "";
      this.m_extra = "";
      this.speed = 6;
      this.type = [1, 0, 0, 0];
      this.defence_data = [30, 50];
      this.melee_data = [0, 0];
      this.GAtogether = false;
      this.G_data = [0, 0, 0, -1];
    } else {
      this.status = 0;
      this.extra = "Anti-Bio";
      this.m_extra = "反生物";
      this.speed = 4;
      this.type = [0, 0, 0, 0];
      this.defence_data = [30, 30];
      this.melee_data = [100, 0];
      this.GAtogether = false;
      this.G_data = [10, 125, 5, 10];
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
    this.addInfo =
      "Golden Knights' Hardened Shield can greatly reduce incoming\nhigh damage";
    this.m_addInfo = "黄金骑士的硬化护盾可以大大削弱来袭的高伤害";

    this.shield = 1100;
    this.shield_armor = 80;
    this.scale = 15;
    this.singleHP = 120;
    this.speed = 2;

    this.type = [0, 1, 1, 1];
    this.defence_data = [40, 0];
    this.GAtogether = false;
    this.G_data = [25, 55, 4, 50];

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        singleDamage = this.c_missile_G;
        if (targetArm.L_H === 1) singleDamage += this.missile_G_bonus;

        singleDamage = Math.min(singleDamage, targetArm.c_singleHP);
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
    this.G_data = [50, 20, 4, 60];

    this.cost_bias = 15;
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

    this.shield = 3000;
    this.shield_armor = 50;
    this.scale = 1;
    this.singleHP = 100;
    this.speed = 2;

    this.type = [0, 0, 1, 1];
    this.defence_data = [0, 20];
    this.melee_data = [1200, 600];
    this.GAtogether = true;
    this.G_data = [500, 250, 2, 100];

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
      if (targetArm.c_scale >= 5) singleDamage += this.missile_G_bonus;
      if (targetArm.c_scale >= 10) singleDamage += this.missile_G_bonus;
      if (targetArm.c_scale >= 15) singleDamage += this.missile_G_bonus;
    }
    return singleDamage;
  }
}

export class DeathEnvoy extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Envoy";
    this.m_name = "死神特使";
    this.attachInfo =
      "Unleashes a swarm of self-detonating Death Spirits\nthat can attack air and ground units";
    this.m_attachInfo = "释放一群可以攻击空中和地面单位且可自爆的死灵";
    this.missileColor = "red";
    this.missileWeight = 9;
    this.missileNumber = 1;
    this.missileLaser = true;

    this.shield = 3000;
    this.shield_armor = 50;
    this.scale = 1;
    this.singleHP = 100;
    this.speed = 2;

    this.type = [0, 0, 1, 1];
    this.defence_data = [0, 20];
    this.melee_data = [1200, 0];
    this.GAtogether = true;
    this.G_data = [500, 0, 2, 100];

    this.brooder = true;
    this.canRelease = true;
    this.brood_time = 6;
    this.brood_max = 6;
    this.autoBrood = false;

    this.cost_bias = 100;
    this.loadRealtimeProps();
  }
  _prepareBrooding() {
    let brooded = new DeathEnvoy_1([0, 0], this.player);
    return brooded;
  }
  getAttachedName() {
    return ["Death Spirits", "死灵"];
  }
}

export class DeathEnvoy_1 extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Death Spirits";
    this.m_name = "死灵";
    this.extra = "Self-detonation, Anti-Aggregation";
    this.m_extra = "自爆，反聚集";
    this.detoColor = "red";
    this.missileColor = "red";
    this.missileWeight = 4;
    this.missileLaser = true;

    this.live_max = 4;
    this.live_time = 0;

    this.scale = 10;
    this.singleHP = 100;
    this.speed = 3;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 70];
    this.GAtogether = true;
    this.G_data = [100, 0, 3, 4];

    this.deto_target = 2;
    this.self_deto = 330;
    this.self_deto_bonus = 200;

    this.loadRealtimeProps();
  }
  _getSingleDeto(targetArm) {
    let singleDamage = this.self_deto;
    if (targetArm.c_scale >= 5) singleDamage += this.self_deto_bonus;
    if (targetArm.c_scale >= 10) singleDamage += this.self_deto_bonus;
    if (targetArm.c_scale >= 15) singleDamage += this.self_deto_bonus;
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
    this.missileColor = "yellow";
    this.missileWeight = 8;
    this.missileLaser = true;
    this.missileNumber = 2;

    this.shield = 1500;
    this.shield_armor = 20;
    this.scale = 1;
    this.singleHP = 2000;
    this.speed = 2;

    this.type = [0, 1, 1, 2];
    this.defence_data = [50, 0];
    this.GAtogether = false;
    this.G_data = [450, 1050, 6, 60];

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
    this.missileLaser = false;
    this.missileColor = "red";
    this.missileWeight = 13;
    this.missileShape = "circle";
    this.missileRadius = 10;

    this.G_data = [900, 600, 6, 60];

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
    this.extra = "Anti-Light, Reducer";
    this.m_extra = "反轻甲，减速者";
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
    this.G_data = [20, 20, 4, 40];
    this.A_data = [25, 20, 5, 60];

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
    this.extra = "Anti-Individual, Anti-Large";
    this.m_extra = "反单体，反大型";
    this.missileColor = MC.ATColor;
    this.missileLaser = true;
    this.missileNumber = 2;
    this.missileWeight = 10;
    this.scanLaser = false;

    this.shield = 1500;
    this.shield_armor = 30;
    this.scale = 2;
    this.singleHP = 1000;
    this.speed = 2;

    this.type = [1, 1, 1, 2];
    this.defence_data = [50, 0];
    this.GAtogether = true;
    this.G_data = [400, 200, 6, 70];

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo_G > 0) {
      this.c_ammo_G--;
      this.c_ammo_A--;
      singleDamage = this.c_missile_G;
      if (targetArm.scale === 1) singleDamage += this.missile_G_bonus;
      if (targetArm.size >= 1) singleDamage += this.missile_G_bonus;

      singleDamage = Math.min(singleDamage, targetArm.c_singleHP);
    }
    return singleDamage;
  }
}

export class ReaperFrigate extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Reaper Frigates";
    this.m_name = "死神护卫舰";
    this.extra = "Anti-Aggregation";
    this.m_extra = "反聚集";
    this.missileColor = "red";
    this.missileNumber = 2;
    this.missileWeight = 10;
    this.missileShape = "circle";
    this.missileRadius = 10;

    this.shield = 1500;
    this.shield_armor = 30;
    this.scale = 2;
    this.singleHP = 1000;
    this.speed = 2;

    this.type = [1, 1, 1, 2];
    this.defence_data = [50, 0];
    this.GAtogether = true;
    this.G_data = [400, 100, 6, 70];

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && this.c_ammo_G > 0) {
      this.c_ammo_G--;
      this.c_ammo_A--;
      singleDamage = this.c_missile_G;
      if (targetArm.c_scale >= 5) singleDamage += this.missile_G_bonus;
      if (targetArm.c_scale >= 10) singleDamage += this.missile_G_bonus;
      if (targetArm.c_scale >= 15) singleDamage += this.missile_G_bonus;
    }
    return singleDamage;
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
    this.G_data = [800, 200, 8, 60];
    this.A_data = [800, 200, 5, 80];

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
    this.attachInfo = "Swarm Fighters can fight air and ground units";
    this.m_attachInfo = "蜂群战机可以攻击空中和地面单位";

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

    this.shield = 800;
    this.scale = 20;
    this.singleHP = 10;
    this.speed = 5;
    this.live_max = 8;
    this.live_time = 0;

    this.type = [1, 0, 0, 0];
    this.defence_data = [0, 80];
    this.GAtogether = true;
    this.G_data = [40, 0, 4, 7];

    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let armList = [
    new PalaceGuard([posX, posY], player),
    new ShadowWarrior([posX, posY], player),
    new Caelumanians([posX, posY], player),
    new ThunderGuard([posX, posY], player),
    new DeathEnvoy([posX, posY], player),
    new ParagardeShield([posX, posY], player),
    new BlinkHunter([posX, posY], player),
    new AbyssKnight([posX, posY], player),
    new GoldenKnight([posX, posY], player),
    new FlameTitan([posX, posY], player),
    new CurseTitan([posX, posY], player),
    new StarLight([posX, posY], player),
    new ReaperFrigate([posX, posY], player),
    new HeliosFrigate([posX, posY], player),
    new AircraftCarrier([posX, posY], player),
    new HurricaneBattleship([posX, posY], player),
  ];
  if (i >= 0 && i < armList.length) {
    return armList[i];
  }
  return null;
}
