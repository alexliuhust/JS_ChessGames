import * as ArmPrimary from "../arm.js";

export class SlaveConscript extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Slave Conscript";
    this.m_name = "奴隶征召兵";
    this.type = "infantry";
    this.description = "infantry / weak";
    this.m_description = "近战步兵【孱弱】";

    this.scale = 100;
    this.singleHP = 20;
    this.speed = 4;

    this.meleeAttack = 16;

    this.loadRealtimeProps();
  }
}

export class SlaveConscriptShield extends SlaveConscript {
  constructor(value, player) {
    super(value, player);

    this.name = "Slave Conscript (Shield)";
    this.m_name = "奴隶征召兵-持盾";
    this.type = "infantry";
    this.description = "shield-infantry / weak";
    this.m_description = "持盾-近战步兵【孱弱】";

    this.missileArmor = 20;

    this.loadRealtimeProps();
  }
}

export class HurlerHE extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Hurler (High-Explosion)";
    this.m_name = "投掷小队-高爆弹";
    this.type = "archers";
    this.description = "armor-archers / high-damage";
    this.m_description = "装甲-远程步兵【高伤害】";

    this.scale = 60;
    this.singleHP = 30;
    this.speed = 3;

    this.meleeArmor = 30;
    this.missileArmor = 30;
    this.chargeArmor = 30;

    this.meleeAttack = 16;
    this.missileAttack = 32;
    this.missileRange = 3;
    this.isParabola = true;

    this.ammo = 12;
    this.loadRealtimeProps();
  }
}

export class HurlerGas extends HurlerHE {
  constructor(value, player) {
    super(value, player);

    this.name = "Hurler (Gas Bomb)";
    this.m_name = "投掷小队-毒气弹";
    this.type = "archers";
    this.description = "armor-archers / anti-armor";
    this.m_description = "装甲-远程步兵【高破甲】";

    this.missileAttack = 16;

    this.antiArmor = 40;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class HurlerFrgm extends HurlerHE {
  constructor(value, player) {
    super(value, player);

    this.name = "Hurler (Fragmentation)";
    this.m_name = "投掷小队-破片弹";
    this.type = "archers";
    this.description = "armor-archers / anti-infantry";
    this.m_description = "装甲-远程步兵【反步兵】";

    this.missileAttack = 16;
    this.missileAttack_bonus = 20;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class WeapSqdGingall extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Weapon Squad (Gingall)";
    this.m_name = "武器小队-火枪";
    this.type = "archers";
    this.description = "shield-archers / anti-large";
    this.m_description = "持盾-远程步兵【反大型】";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.missileArmor = 40;

    this.meleeAttack = 16;
    this.missileAttack = 30;
    this.missileAttack_bonus = 60;
    this.missileRange = 6;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

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
}

export class WeapSqdGatlin extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Weapon Squad (Gatlin)";
    this.m_name = "武器小队-加特林";
    this.type = "archers";
    this.description = "shield-archers / anti-infantry";
    this.m_description = "持盾-远程步兵【反步兵】";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.missileArmor = 40;

    this.meleeAttack = 16;
    this.missileAttack = 38;
    this.missileAttack_bonus = 50;
    this.missileRange = 6;

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) {
        if (targetArm.c_missileArmor > 0)
          singleDamage += this.missileAttack_bonus / 2;
        else singleDamage += this.missileAttack_bonus;
      }
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class WeapSqdFlthr extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Weapon Squad (Flamethrower)";
    this.m_name = "武器小队-火焰喷射器";
    this.type = "archers";
    this.description = "shield-archers / anti-non-armor";
    this.m_description = "持盾-远程步兵【反无甲】";

    this.scale = 48;
    this.singleHP = 30;
    this.speed = 3;

    this.missileArmor = 40;

    this.meleeAttack = 16;
    this.missileAttack = 32;
    this.missileAttack_bonus = 70;
    this.missileRange = 3;

    this.ammo = 12;
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
      if (targetArm.c_meleeArmor === 0 || targetArm.c_missileArmor === 0)
        singleDamage += this.missileAttack_bonus;
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class MechGears extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mech Squad";
    this.m_name = "机甲小队";
    this.type = "monster-infantry";
    this.description = "mech-infantry / heavy-armor";
    this.m_description = "机甲步兵【重装甲】";

    this.scale = 16;
    this.singleHP = 250;
    this.speed = 3;

    this.meleeArmor = 50;
    this.missileArmor = 50;
    this.chargeArmor = 40;

    this.meleeAttack = 48;

    this.loadRealtimeProps();
  }
}

export class MechGatlin extends MechGears {
  constructor(value, player) {
    super(value, player);

    this.name = "Mech Squad (Gatlin)";
    this.m_name = "机甲小队-加特林";
    this.type = "monster-infantry";
    this.description = "mech-infantry / heavy-armor / anti-infantry";
    this.m_description = "机甲步兵【重装甲，反步兵】";

    this.missileAttack = 60;
    this.missileAttack_bonus = 50;
    this.missileRange = 6;

    this.ammo = 15;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
    } else if (damageType === "missile" && this.c_ammo > 0) {
      singleDamage = this.c_missileAttack;
      if (targetArm.isInfn()) {
        if (targetArm.c_missileArmor > 0)
          singleDamage += this.missileAttack_bonus / 2;
        else singleDamage += this.missileAttack_bonus;
      }
      this.c_ammo--;
    }

    return singleDamage;
  }
}

export class MechMissile extends MechGears {
  constructor(value, player) {
    super(value, player);

    this.name = "Mech Squad (Missile)";
    this.m_name = "机甲小队-飞弹";
    this.type = "monster-infantry";
    this.description = "mech-infantry / heavy-armor / long-range / anti-large";
    this.m_description = "机甲步兵【重装甲，长程，反大型】";

    this.missileAttack = 70;
    this.missileAttack_bonus = 40;
    this.missileRange = 8;
    this.isParabola = true;

    this.ammo = 13;
    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

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
}

export class MutantSlave extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Mutant Slave";
    this.m_name = "变异奴隶";
    this.type = "monster-infantry";
    this.description = "monster-infantry / fast / shocking";
    this.m_description = "怪兽步兵【迅捷如风，惊骇敌军】";

    this.scale = 16;
    this.singleHP = 200;
    this.speed = 6;

    this.meleeDodge = 50;

    this.meleeAttack = 52;
    this.chargeAttack = 60;

    this.shock = 50;
    this.loadRealtimeProps();
  }
}

export class Foulcannon extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Foul Cannon";
    this.m_name = "污秽加农炮";
    this.type = "artillery";
    this.description = "artillery / high-damage / shocking";
    this.m_description = "炮兵【高伤害，惊骇敌军】";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missileAttack = 450;
    this.missileRange = 10;
    this.isParabola = true;

    this.shock = 75;
    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new SlaveConscript(pos, player);
  if (i === 1) return new SlaveConscriptShield(pos, player);
  if (i === 2) return new HurlerGas(pos, player);
  if (i === 3) return new HurlerFrgm(pos, player);
  if (i === 4) return new HurlerHE(pos, player);
  if (i === 5) return new WeapSqdGingall(pos, player);
  if (i === 6) return new WeapSqdGatlin(pos, player);
  if (i === 7) return new WeapSqdFlthr(pos, player);
  if (i === 8) return new MechGears(pos, player);
  if (i === 9) return new MechGatlin(pos, player);
  if (i === 10) return new MechMissile(pos, player);
  if (i === 11) return new MutantSlave(pos, player);
  if (i === 12) return new Foulcannon(pos, player);

  return null;
}
