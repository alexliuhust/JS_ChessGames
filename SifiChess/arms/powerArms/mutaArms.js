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

export class Mothermantis extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mothermantis";
    this.m_name = "螳后";
    this.extra = "Brooder";
    this.m_extra = "孵化者";

    this.scale = 1;
    this.singleHP = 2500;
    this.speed = 2;

    this.type = [0, 0, 1, 1];
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
    this.loadRealtimeProps();
  }
  _prepareBrooding() {
    let brooded = new Arlmantises_B([0, 0], this.player);
    return brooded;
  }
}

export function newAnArm(i, posX, posY, player) {
  let armList = [
    new Arlmantises([posX, posY], player),
    new Mothermantis([posX, posY], player),
  ];
  if (i >= 0 && i < armList.length) return armList[i];
  return null;
}
