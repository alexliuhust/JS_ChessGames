import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class DarkSoldier extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DarkSoldier_img");
    // Override original data

    this.name = "Dark Soldier";
    this.m_name = "黑暗战士";
    this.type = "infantry";
    this.description = "infantry / resist-charging";
    this.m_description = "近战步兵【抵御冲锋】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 40;
    this.missileArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 20;

    this.antiArmor = 5;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class DarkSoldierScythe extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DarkSoldierScythe_img");
    // Override original data

    this.name = "Dark Soldier (Scythe)";
    this.m_name = "黑暗战士-巨镰";
    this.type = "infantry";
    this.description = "infantry / anti-large";
    this.m_description = "近战步兵【反大型】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeArmor = 40;
    this.missileArmor = 0;
    this.chargeArmor = 30;

    this.meleeAttack = 33;
    this.meleeAttack_bonus = 36;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class Banshee extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Banshee_img");
    // Override original data

    this.name = "Banshee";
    this.m_name = "女妖";
    this.type = "infantry";
    this.description = "infantry / high-dodge / shocking";
    this.m_description = "近战步兵【高闪避，惊骇敌军】";

    this.scale = 32;
    this.singleHP = 40;
    this.speed = 6;

    this.meleeDodge = 40;
    this.missileDodge = 90;

    this.meleeAttack = 24;

    this.shock = 50;

    this.loadRealtimeProps();
  }
}

export class ScreamingBanshee extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("ScreamingBanshee_img");
    // Override original data

    this.name = "Screaming Banshee";
    this.m_name = "尖啸女妖";
    this.type = "infantry";
    this.description = "melee-archers / high-dodge / shocking";
    this.m_description = "近战-远程步兵【高闪避，惊骇敌军】";

    this.scale = 32;
    this.singleHP = 40;
    this.speed = 6;

    this.meleeDodge = 40;
    this.missileDodge = 90;

    this.meleeAttack = 24;
    this.missileAttack = 24;
    this.missileRange = 6;

    this.shock = 50;
    this.ammo = 18;
    this.loadRealtimeProps();
  }
}

export class ScreamingBansheeGF extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("ScreamingBansheeGF_img");
    // Override original data

    this.name = "Screaming Banshee (Ghost Fire)";
    this.m_name = "尖啸女妖-鬼火";
    this.type = "infantry";
    this.description = "melee-archers / high-dodge / anti-infantry / shocking";
    this.m_description = "近战-远程步兵【高闪避，反步兵，惊骇敌军】";

    this.scale = 32;
    this.singleHP = 40;
    this.speed = 6;

    this.meleeDodge = 40;
    this.missileDodge = 90;

    this.meleeAttack = 24;
    this.missileAttack = 30;
    this.missileAttack_bonus = 14;
    this.missileRange = 6;

    this.shock = 50;
    this.ammo = 18;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let targetType = targetArm.type;
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmType(targetType);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.missileAttack_bonus;
      this.ammo--;
    }

    return singleDamage;
  }
}

export class DeathKnight extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DeathKnight_img");
    // Override original data

    this.name = "Death Knight";
    this.m_name = "死亡骑士";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor";
    this.m_description = "近战骑兵【重装甲】";

    this.scale = 32;
    this.singleHP = 120;
    this.speed = 3;

    this.meleeArmor = 90;
    this.missileArmor = 90;
    this.chargeArmor = 30;

    this.meleeAttack = 35;

    this.loadRealtimeProps();
  }
}

export class DeathKnightDS extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DeathKnightDS_img");
    // Override original data

    this.name = "Death Knight (Double-Scythe)";
    this.m_name = "死亡骑士-双镰";
    this.type = "cavalry";
    this.description = "melee-cavalry / heavy-armor / high-damage";
    this.m_description = "近战骑兵【重装甲，高伤害】";

    this.scale = 32;
    this.singleHP = 120;
    this.speed = 3;

    this.meleeArmor = 90;
    this.missileArmor = 90;
    this.chargeArmor = 30;

    this.meleeAttack = 65;

    this.loadRealtimeProps();
  }
}

export class SpiritCoffinGF extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SpiritCoffinGF_img");
    // Override original data

    this.name = "Spirit Coffin (Ghost Fire)";
    this.m_name = "灵棺-鬼火";
    this.type = "monster";
    this.description = "bombing-mech";
    this.m_description = "轰炸机甲";

    this.scale = 1;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.missileAttack = 1200;
    this.missileRange = 9;
    this.isBombing = true;
    this.missileRadius = 1;

    this.ammo = 18;
    this.loadRealtimeProps();
  }
}

export class SpiritCoffinBB extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SpiritCoffinBB_img");
    // Override original data

    this.name = "Spirit Coffin (Broken Bones)";
    this.m_name = "灵棺-碎骨";
    this.type = "monster";
    this.description = "bombing-mech / large-bombing-radius";
    this.m_description = "轰炸机甲【大轰炸半径】";

    this.scale = 1;
    this.singleHP = 300;
    this.speed = 2;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.missileAttack = 1200;
    this.missileRange = 9;
    this.isBombing = true;
    this.missileRadius = 2;

    this.ammo = 18;
    this.loadRealtimeProps();
  }
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new DarkSoldier(pos[0]),
    new DarkSoldierScythe(pos[1]),
    new Banshee(pos[2]),
    new ScreamingBanshee(pos[3]),
    new ScreamingBansheeGF(pos[4]),
    new DeathKnight(pos[5]),
    new DeathKnightDS(pos[6]),
    new SpiritCoffinGF(pos[7]),
    new SpiritCoffinBB(pos[8]),
  ];
  return arms;
}

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new DarkSoldier(pos);
  if (i === 1) return new DarkSoldierScythe(pos);
  if (i === 2) return new Banshee(pos);
  if (i === 3) return new ScreamingBanshee(pos);
  if (i === 4) return new ScreamingBansheeGF(pos);
  if (i === 5) return new DeathKnight(pos);
  if (i === 6) return new DeathKnightDS(pos);
  if (i === 7) return new SpiritCoffinGF(pos);
  if (i === 8) return new SpiritCoffinBB(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/oldcemetery/DarkSoldier.png");
  images.push("../images/oldcemetery/DarkSoldierScythe.png");
  images.push("../images/oldcemetery/Banshee.png");
  images.push("../images/oldcemetery/ScreamingBanshee.png");
  images.push("../images/oldcemetery/ScreamingBansheeGF.png");
  images.push("../images/oldcemetery/DeathKnight.png");
  images.push("../images/oldcemetery/DeathKnightDS.png");
  images.push("../images/oldcemetery/SpiritCoffinGF.png");
  images.push("../images/oldcemetery/SpiritCoffinBB.png");

  return images;
}
