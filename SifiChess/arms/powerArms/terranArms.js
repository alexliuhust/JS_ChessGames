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

    this.name1 = "Shield Marines";
    this.m_name1 = "持盾陆战队";
    this.name2 = "Shield Marines (Hold)";
    this.m_name2 = "持盾陆战队-举盾";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.switchInfo = [
      "Movement speed restored, but attack range reduced",
      "Movement speed hugely decreased,\nbut gain increased armor and longer attack range",
    ];
    this.m_switchInfo = [
      "恢复移动力，但攻击距离缩短",
      "大幅降低移速，但获得更高护甲和更远的射程",
    ];

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

      this.speed = 1;
      this.defence_data = [35, 0];
      this.melee_data = [12, 0];
      this.G_data = [14, 0, 4, 25];
    } else {
      this.status = 0;

      this.speed = 3;
      this.defence_data = [5, 10];
      this.melee_data = [11, 0];
      this.G_data = [14, 0, 3, 25];
    }

    this._endSwitch(false);
  }
}

export class MedicalSquad extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Medical Squad";
    this.m_name = "医疗队";
    this.extra = "Bio-Healer";
    this.m_extra = "生物治疗者";

    this.scale = 30;
    this.singleHP = 70;
    this.speed = 3;

    this.type = [0, 0, 0, 0];
    this.defence_data = [25, 0];
    this.melee_data = [10, 0];

    this.healTarget = 0;
    this.healing = 9;
    this.totalHeal = 150;
    this.healRange = 2;
    this.c_totalHeal = 150;
    this.loadRealtimeProps();
  }
}

export class BlackBat extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);
    this.missileColor = MC.ATColor;
    this.missileWeight = 2;

    this.name = "Black Bats";
    this.m_name = "黑蝠步兵";
    this.extra = "Anti-Large, Anti-Heavy";
    this.m_extra = "反大型，反重甲";

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
    this.extra = "Anti-Large, Anti-Heavy, Reducer";
    this.m_extra = "反大型，反重甲，减速者";

    this.shock = 40;
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
    this.extra = "Anti-Bio";
    this.m_extra = "反生物";

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

export class Sniper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Sniper Squad";
    this.m_name1 = "狙击手小队";
    this.name2 = "Sniper Squad (Sniping Mode)";
    this.m_name2 = "狙击手小队-狙击模式";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.switchInfo = [
      "Movement speed restored, but attack range reduced",
      "Immobile, dodge weakened, but gain longer range\nand bonus damage to bio units",
    ];
    this.m_switchInfo = [
      "恢复移动力，但攻击距离缩短",
      "不可移动，闪避削弱，但获得更远的射程和\n对生物单位的伤害加成",
    ];

    this.scale = 20;
    this.singleHP = 100;
    this.speed = 4;
    this.defence_data = [0, 50];
    this.melee_data = [50, 0];
    this.GAtogether = true;
    this.G_data = [30, 0, 4, 25];

    this.switchable = true;
    this.cost_bias = 0;
    this.loadRealtimeProps();
    this.ammo_record = [
      [25, 25],
      [20, 20],
    ];
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (this.status === 0) {
      if (damageType === "melee") singleDamage = this.c_melee;
      else if (damageType === "missile" && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        this.c_ammo_A--;
        singleDamage = this.c_missile_G;
      }
    } else {
      if (damageType === "melee") singleDamage = this.c_melee;
      else if (damageType === "missile" && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        this.c_ammo_A--;
        singleDamage = this.c_missile_G;
        if (targetArm.B_M === 0) singleDamage += this.missile_G_bonus;
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
      this.extra = "Anti-Bio";
      this.m_extra = "反生物";
      this.speed = 0;
      this.defence_data = [0, 20];
      this.melee_data = [30, 0];
      this.GAtogether = true;
      this.G_data = [30, 50, 6, 20];
    } else {
      this.status = 0;
      this.extra = "";
      this.m_extra = "";
      this.speed = 4;
      this.defence_data = [0, 50];
      this.melee_data = [50, 0];
      this.GAtogether = true;
      this.G_data = [30, 0, 4, 25];
    }

    this._endSwitch(true, true);
  }
}

export class StormChariot extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Storm Chariots";
    this.m_name1 = "风暴战车";
    this.name2 = "Storm Bunkers";
    this.m_name2 = "风暴碉堡";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.missileWeight = 2;
    this.switchInfo = [
      "Movement speed restored; can fight both ground\nand air units",
      "Fixed turrets for the anti-aircraft specialization",
    ];
    this.m_switchInfo = ["恢复移动力，可对地对空", "防空专精的固定炮台"];

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

      this.missileWeight = 4;
      this.speed = 0;
      this.defence_data = [30, 0];
      this.GAtogether = false;
      this.G_data = [0, 0, 0, -1];
      this.A_data = [62, 0, 7, 20];
    } else {
      this.status = 0;

      this.missileWeight = 2;
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

    this.name1 = "Paladin MBTs";
    this.m_name1 = "圣骑士主战坦克";
    this.name2 = "Paladin Howitzers";
    this.m_name2 = "圣骑士榴弹炮";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.extra = "Anti-Mech";
    this.m_extra = "反机械";
    this.missileColor = MC.ATColor;
    this.missileWeight = 3;
    this.missileShape = null;
    this.switchInfo = [
      "Return to tank mode, regain mobility",
      "Long-range and high-damage fixed howitzer turrets",
    ];
    this.m_switchInfo = [
      "返回坦克模式，恢复移动力",
      "高射程、高伤害的固定榴弹炮台",
    ];

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
      this.extra = "Anti-Aggregation";
      this.m_extra = "反聚集";
      this.missileColor = MC.BombColor;
      this.missileWeight = 5;
      this.missileShape = "circle";
      this.missileRadius = 7;
      this.speed = 0;
      this.G_data = [100, 30, 8, 35];
      this.shock = 30;
    } else {
      this.status = 0;
      this.extra = "Anti-Mech";
      this.m_extra = "反机械";
      this.missileColor = MC.ATColor;
      this.missileWeight = 3;
      this.missileShape = null;
      this.speed = 3;
      this.G_data = [55, 45, 4, 20];
      this.shock = 0;
    }

    this._endSwitch(true);
  }
}

export class Annihilator extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Annihilator";
    this.m_name = "毁灭者";
    this.extra = "Anti-Large";
    this.m_extra = "反大型";

    this.missileColor = MC.BombColor;
    this.missileWeight = 6;
    this.missileNumber = 2;

    this.missileColor_A = "white";
    this.missileWeight_A = 4;
    this.missileNumber_A = 6;

    this.scale = 1;
    this.singleHP = 3000;
    this.speed = 2;

    this.type = [0, 1, 1, 2];
    this.defence_data = [60, 0];
    this.melee_data = [600, 0];
    this.G_data = [600, 400, 5, 25];
    this.A_data = [800, 0, 7, 20];
    this.GAtogether = false;

    this.cost_bias = 18;
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
        if (targetArm.size >= 1) singleDamage += this.missile_G_bonus;
      } else if (targetArm.G_A === 1 && this.c_ammo_A > 0) {
        this.c_ammo_A--;
        singleDamage = this.c_missile_A;
      }
    }
    return singleDamage;
  }
}

export class SupportDrone extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Support Drones";
    this.m_name = "支援无人机";
    this.extra = "Mech-Mender, Reducer";
    this.m_extra = "机械修复者，减速者";
    this.missileColor = MC.GhostColor;
    this.missileWeight = 8;
    this.missileNumber = 1;

    this.scale = 5;
    this.singleHP = 120;
    this.speed = 4;

    this.type = [1, 1, 0, 0];
    this.defence_data = [0, 80];
    this.melee_data = [0, 0];
    this.GAtogether = true;
    this.G_data = [30, 0, 5, 30];

    this.shock = 20;
    this.slowdown = true;
    this.slowdown_time = 2;

    this.healTarget = 1;
    this.healing = 60;
    this.totalHeal = 200;
    this.healRange = 2;
    this.c_totalHeal = 200;

    this.cost_bias = -125;
    this.loadRealtimeProps();
  }
}

export class DeckDropper extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Deck Dropper Fighters";
    this.m_name1 = "跳帮战机";
    this.name2 = "Deck Dropper Mechas";
    this.m_name2 = "跳帮陆行机甲";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.extra = "Anti-Heavy";
    this.m_extra = "反重甲";
    this.missileWeight = 4;
    this.switchInfo = [
      "Return to airplane mode; anti-air specialization",
      "Landed as a ground mech; anti-ground specialization",
    ];
    this.m_switchInfo = [
      "返回飞行模式，对空专精",
      "降落成为陆行机甲，对地专精",
    ];

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
      this.extra = "";
      this.m_extra = "";
      this.missileWeight = 2;
      this.speed = 3;
      this.defence_data = [30, 0];
      this.melee_data = [30, 0];
      this.type = [0, 1, 0, 1];
      this.G_data = [45, 0, 4, 35];
      this.A_data = [0, 0, 0, -1];
    } else {
      this.status = 0;
      this.extra = "Anti-Heavy";
      this.m_extra = "反重甲";
      this.missileWeight = 4;
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

export class VultureGunship extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Vulture Gunships";
    this.m_name = "秃鹫武装直升机";
    this.extra = "Anti-Light";
    this.m_extra = "反轻甲";
    this.missileWeight = 3;

    this.scale = 12;
    this.singleHP = 160;
    this.speed = 4;

    this.type = [1, 1, 0, 1];
    this.defence_data = [20, 20];
    this.melee_data = [0, 0];
    this.GAtogether = false;
    this.G_data = [50, 60, 4, 30];

    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "missile" && targetArm.G_A === 0 && this.c_ammo_G > 0) {
      this.c_ammo_G--;
      singleDamage = this.c_missile_G;
      if (targetArm.L_H === 0) singleDamage += this.missile_G_bonus;
    }
    return singleDamage;
  }
}

export class Cruiser extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Cruiser";
    this.m_name1 = "巡洋舰";
    this.name2 = "Cruiser (Main Gun Salvo)";
    this.m_name2 = "巡洋舰-主炮齐射";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.extra = "Anti-Light";
    this.m_extra = "反轻甲";
    this.missileColor = "white";
    this.missileWeight = 2;
    this.missileNumber = 7;
    this.switchInfo = [
      "Short-range, anti-light, and small-caliber secondary guns",
      "Long-range, high-damage, and large-caliber main guns",
    ];
    this.m_switchInfo = [
      "使用短射程、反轻甲的小口径副炮",
      "使用长射程、高伤害的大口径主炮",
    ];

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
      this.extra = "Anti-Heavy";
      this.m_extra = "反重甲";
      this.missileColor = MC.FireColor;
      this.missileWeight = 7;
      this.missileNumber = 3;
      this.speed = 1;
      this.G_data = [1000, 200, 7, 20];
    } else {
      this.status = 0;
      this.extra = "Anti-Light";
      this.m_extra = "反轻甲";
      this.missileColor = "white";
      this.missileWeight = 2;
      this.missileNumber = 7;
      this.speed = 3;
      this.G_data = [400, 300, 5, 40];
    }

    this._endSwitch(true);
  }
}

export function newAnArm(i, posX, posY, player) {
  let armList = [
    new Marine([posX, posY], player),
    new ShieldMarine([posX, posY], player),
    new MedicalSquad([posX, posY], player),
    new FireBat([posX, posY], player),
    new BlackBat([posX, posY], player),
    new BlackBatShock([posX, posY], player),
    new Sniper([posX, posY], player),
    new StormChariot([posX, posY], player),
    new Paladin([posX, posY], player),
    new Annihilator([posX, posY], player),
    new SupportDrone([posX, posY], player),
    new VultureGunship([posX, posY], player),
    new DeckDropper([posX, posY], player),
    new Cruiser([posX, posY], player),
  ];
  if (i >= 0 && i < armList.length) return armList[i];
  return null;
}
