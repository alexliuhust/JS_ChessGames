import * as ArmPrimary from "../arm.js";
import { MissileColor as MC } from "../../common/const.js";

export class Arlmantises extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Arlmantises";
    this.m_name = "阿尔螳";
    this.extra = "Agile";
    this.m_extra = "迅捷";

    this.hasBroodVersion = true;

    this.scale = 90;
    this.singleHP = 25;
    this.speed = 5;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 30];
    this.melee_data = [15, 0];
    this.GAtogether = false;

    this.cost_bias -= 10;
    this.loadRealtimeProps();
  }
}

export class Arlmantises_B extends Arlmantises {
  constructor(value, player) {
    super(value, player);

    this.live_max = 6;
    this.live_time = 0;

    this.name = "Arlmantises (Brooded)";
    this.m_name = "阿尔螳-孵化";
    this.extra = "Agile";
    this.m_extra = "迅捷";

    this.scale = 40;

    this.loadRealtimeProps();
  }
}

export class Estavulgs extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Estavulgs";
    this.m_name = "爆炸虫";
    this.extra = "Self-detonation";
    this.m_extra = "自爆";
    this.detoColor = MC.PoisonColor;

    this.scale = 40;
    this.singleHP = 25;
    this.speed = 4;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 0];
    this.melee_data = [0, 0];
    this.GAtogether = false;

    this.deto_target = 0;
    this.self_deto = 60;
    this.self_deto_bonus = 40;

    this.loadRealtimeProps();
  }
  _getSingleDeto(targetArm) {
    let singleDamage = this.self_deto;
    if (targetArm.B_M === 0) singleDamage += this.self_deto_bonus;
    return singleDamage;
  }
}

export class Rockscarabs extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Rockscarabs";
    this.m_name = "岩甲虫";
    this.extra = "Durable";
    this.m_extra = "结实";

    this.scale = 30;
    this.singleHP = 220;
    this.speed = 2;

    this.type = [0, 0, 1, 1];
    this.defence_data = [40, 0];
    this.melee_data = [45, 0];
    this.GAtogether = false;
    this.G_data = [15, 0, 3, 25];

    this.cost_bias -= 10;
    this.loadRealtimeProps();
  }
}

export class Fuegoscarabs extends Rockscarabs {
  constructor(value, player) {
    super(value, player);

    this.name1 = "Fuegoscarabs";
    this.m_name1 = "火甲虫";
    this.name2 = "Fuegoscarabs (air-defense)";
    this.m_name2 = "火甲虫-对空";
    this.name = this.name1;
    this.m_name = this.m_name1;
    this.extra = "";
    this.m_extra = "";

    this.singleHP = 180;
    this.defence_data = [30, 0];

    this.melee_data = [66, 0];
    this.GAtogether = false;
    this.G_data = [22, 0, 3, 30];
    this.A_data = [0, 0, 0, -1];

    this.cost_bias += 20;
    this.switchable = true;
    this.loadRealtimeProps();
    this.ammo_record = [
      [30, 0],
      [0, 30],
    ];
  }
  switch() {
    if (!this.switchable || this.hasAttacked || this.slowdown_countdown > 0)
      return;
    this._beginSwitch(true);

    if (this.status === 0) {
      this.status = 1;

      this.melee_data = [0, 0];
      this.GAtogether = false;
      this.G_data = [0, 0, 0, -1];
      this.A_data = [35, 0, 5, 30];
    } else {
      this.status = 0;

      this.melee_data = [66, 0];
      this.GAtogether = false;
      this.G_data = [22, 0, 3, 30];
      this.A_data = [0, 0, 0, -1];
    }

    this._endSwitch(true);
  }
}

export class Mothermantis extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mothermantis";
    this.m_name = "螳后";
    this.extra = "Brooder, Healer";
    this.m_extra = "孵化者，治疗者";

    this.scale = 1;
    this.singleHP = 2500;
    this.speed = 2;

    this.type = [0, 0, 1, 2];
    this.defence_data = [50, 0];
    this.melee_data = [1200, 0];
    this.GAtogether = true;
    this.G_data = [500, 0, 4, 30];

    this.brooder = true;
    this.brood_time = 3;
    this.brood_max = 3;

    this.healing = 6;
    this.totalHeal = 200;
    this.c_totalHeal = 200;
    this.healRange = 2;

    this.cost_bias += 15;
    this.loadRealtimeProps();
  }
  _prepareBrooding() {
    let brooded = new Arlmantises_B([0, 0], this.player);
    return brooded;
  }
}

export class Gigascarab extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Gigascarab";
    this.m_name = "巨甲虫";
    this.extra = "Anti-Aggregation";
    this.m_extra = "反聚集";

    this.scale = 1;
    this.singleHP = 3000;
    this.speed = 4;

    this.type = [0, 0, 1, 2];
    this.defence_data = [75, 0];
    this.melee_data = [2000, 300];
    this.GAtogether = false;
    this.shock = 100;

    this.cost_bias += 40;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_melee;
      if (targetArm.c_scale >= 5) singleDamage += this.melee_bonus;
      if (targetArm.c_scale >= 10) singleDamage += this.melee_bonus;
      if (targetArm.c_scale >= 15) singleDamage += this.melee_bonus;
    }
    return singleDamage;
  }
}

export class Mutawasps extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mutawasps";
    this.m_name = "异蜂";
    this.extra = "Agile, Anti-Aggregation";
    this.m_extra = "迅捷, 反聚集";

    this.hasBroodVersion = true;

    this.scale = 30;
    this.singleHP = 100;
    this.speed = 5;

    this.type = [1, 0, 0, 0];
    this.defence_data = [0, 40];
    this.melee_data = [30, 0];
    this.GAtogether = true;
    this.G_data = [15, 5, 3, 30];

    this.cost_bias -= 0;
    this.loadRealtimeProps();
  }
  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_melee;
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

export class Mutawasps_B extends Mutawasps {
  constructor(value, player) {
    super(value, player);

    this.live_max = 8;
    this.live_time = 0;

    this.name = "Mutawasps (Brooded)";
    this.m_name = "异蜂-孵化";

    this.scale = 20;
    this.loadRealtimeProps();
  }
}

export class Queen extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Queen";
    this.m_name = "蜂后";
    this.extra = "Brooder, Healer";
    this.m_extra = "孵化者，治疗者";

    this.scale = 1;
    this.singleHP = 3000;
    this.speed = 2;

    this.type = [1, 0, 1, 2];
    this.defence_data = [60, 0];
    this.melee_data = [0, 0];

    this.brooder = true;
    this.brood_time = 4;
    this.brood_max = 4;

    this.healing = 7;
    this.totalHeal = 300;
    this.c_totalHeal = 300;
    this.healRange = 3;

    this.cost_bias += 25;
    this.loadRealtimeProps();
  }
  _prepareBrooding() {
    let brooded = new Mutawasps_B([0, 0], this.player);
    return brooded;
  }
}

export function newAnArm(i, posX, posY, player) {
  let armList = [
    new Arlmantises([posX, posY], player),
    new Estavulgs([posX, posY], player),
    new Rockscarabs([posX, posY], player),
    new Fuegoscarabs([posX, posY], player),
    new Mothermantis([posX, posY], player),
    new Gigascarab([posX, posY], player),
    new Mutawasps([posX, posY], player),
    new Queen([posX, posY], player),
  ];
  if (i >= 0 && i < armList.length) return armList[i];
  return null;
}
