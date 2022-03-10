import * as ArmPrimary from "../arm.js";

export class Seaman extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Seaman";
    this.m_name = "水手";
    this.type = "infantry";
    this.description = "infantry / weak";
    this.m_description = "近战步兵【孱弱】";

    this.scale = 100;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 15;

    this.loadRealtimeProps();
  }
}

export class SeamanPistol extends Seaman {
  constructor(value, player) {
    super(value, player);

    this.name = "Seaman (Pistol)";
    this.m_name = "水手-手枪";
    this.type = "archers";
    this.description = "archers";
    this.m_description = "远程步兵";

    this.missileAttack = 12;
    this.missileRange = 4;

    this.ammo = 30;
    this.loadRealtimeProps();
  }
}

export class SeamanMusket extends Seaman {
  constructor(value, player) {
    super(value, player);

    this.name = "Seaman (Musket)";
    this.m_name = "水手-步枪";
    this.type = "archers";
    this.description = "archers";
    this.m_description = "远程步兵";

    this.missileAttack = 16;
    this.missileRange = 6;

    this.antiArmor = 10;

    this.ammo = 24;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Pisciculi extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Pisciculi";
    this.m_name = "侏儒鱼人";
    this.type = "infantry";
    this.description = "infantry / dodge-missile";
    this.m_description = "近战步兵【远程闪避】";

    this.scale = 120;
    this.singleHP = 30;
    this.speed = 6;

    this.missileDodge = 60;

    this.meleeAttack = 30;

    this.loadRealtimeProps();
  }
}

export class PisciculiDoubleBlades extends Pisciculi {
  constructor(value, player) {
    super(value, player);

    this.name = "Pisciculi (Double Blades)";
    this.m_name = "侏儒鱼人-双刀";
    this.type = "infantry";
    this.description = "infantry / dodge-missile / high-damage";
    this.m_description = "近战步兵【远程闪避，高伤害】";

    this.meleeAttack = 55;

    this.loadRealtimeProps();
  }
}

export class MurlocWarrior extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Murloc Warrior";
    this.m_name = "鱼人战士";
    this.type = "infantry";
    this.description = "infantry / anti-armor";
    this.m_description = "近战步兵【高破甲】";

    this.scale = 50;
    this.singleHP = 125;
    this.speed = 2;

    this.meleeArmor = 50;
    this.missileArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 70;

    this.antiArmor = 30;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class MurlocWarriorHurling extends MurlocWarrior {
  constructor(value, player) {
    super(value, player);
    this.missileColor = "yellow";
    this.missileWeight = 5;

    this.name = "Murloc Warrior (Hurling)";
    this.m_name = "鱼人战士-投戟";
    this.type = "infantry";
    this.description = "hurling-infantry / anti-armor";
    this.m_description = "投掷-近战步兵【高破甲】";

    this.missileAttack = 200;
    this.missileRange = 4;
    this.isParabola = true;

    this.ammo = 3;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    return this.antiArmor;
  }
}

export class Medusa extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Medusa";
    this.m_name = "美杜莎";
    this.type = "monster-infantry";
    this.description = "monster-infantry / shocking";
    this.m_description = "怪兽步兵【惊骇敌军】";

    this.scale = 30;
    this.singleHP = 180;
    this.speed = 5;

    this.meleeDodge = 40;
    this.missileDodge = 30;
    this.chargeDodge = 20;

    this.meleeAttack = 40;

    this.shock = 70;
    this.loadRealtimeProps();
  }
}

export class MedusaTrident extends Medusa {
  constructor(value, player) {
    super(value, player);

    this.name = "Medusa (Trident)";
    this.m_name = "美杜莎-三叉戟";
    this.type = "monster-infantry";
    this.description = "monster-infantry / anti-large / shocking";
    this.m_description = "怪兽步兵【反大型，惊骇敌军】";

    this.chargeArmor = 30;
    this.meleeAttack_bonus = 60;

    this.loadRealtimeProps();
  }

  _getSingleDamage(damageType, targetArm) {
    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_meleeAttack;
      if (targetArm.isLarge()) singleDamage += this.meleeAttack_bonus;
    }

    return singleDamage;
  }
}

export class MedusaMB extends Medusa {
  constructor(value, player) {
    super(value, player);
    this.missileColor = "violet";

    this.name = "Medusa (Magic Bow)";
    this.m_name = "美杜莎-魔弓";
    this.type = "monster-infantry";
    this.description = "monster-infantry / missile-attack / shocking";
    this.m_description = "怪兽步兵【远程攻击，惊骇敌军】";

    this.missileAttack = 50;
    this.missileRange = 8;
    this.isParabola = true;

    this.ammo = 12;
    this.loadRealtimeProps();
  }
}

export class Cancrimag extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Cancrimagnus";
    this.m_name = "巨蟹";
    this.type = "monster";
    this.description = "giant / heavy-armor / shocking";
    this.m_description = "巨兽【重装甲，惊骇敌军】";

    this.scale = 1;
    this.singleHP = 9000;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missileArmor = 90;
    this.chargeArmor = 50;

    this.meleeAttack = 600;

    this.shock = 70;
    this.loadRealtimeProps();
  }
}

export class CancrimagMusket extends Cancrimag {
  constructor(value, player) {
    super(value, player);

    this.name = "Cancrimagnus (Musket)";
    this.m_name = "巨蟹-火枪";
    this.type = "monster";
    this.description = "giant / heavy-armor / missile-attack / shocking";
    this.m_description = "巨兽【重装甲，远程攻击，惊骇敌军】";

    this.missileAttack = 720;
    this.missileRange = 6;

    this.antiArmor = 10;

    this.ammo = 18;
    this.loadRealtimeProps();
  }

  getAntiArmor(damageType, targetArm) {
    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class DeckGun extends ArmPrimary.Arm {
  constructor(value, player) {
    super(value, player);

    this.name = "Deck Gun";
    this.m_name = "甲板炮";
    this.type = "artillery";
    this.description = "artillery";
    this.m_description = "炮兵";

    this.scale = 5;
    this.singleHP = 800;
    this.speed = 1;

    this.missileAttack = 230;
    this.missileRange = 12;

    this.loadRealtimeProps();
  }
}

export function newAnArm(i, posX, posY, player) {
  let pos = [posX, posY];
  if (i === 0) return new Seaman(pos, player);
  if (i === 1) return new SeamanPistol(pos, player);
  if (i === 2) return new SeamanMusket(pos, player);
  if (i === 3) return new Pisciculi(pos, player);
  if (i === 4) return new PisciculiDoubleBlades(pos, player);
  if (i === 5) return new MurlocWarrior(pos, player);
  if (i === 6) return new MurlocWarriorHurling(pos, player);
  if (i === 7) return new Medusa(pos, player);
  if (i === 8) return new MedusaTrident(pos, player);
  if (i === 9) return new MedusaMB(pos, player);
  if (i === 10) return new Cancrimag(pos, player);
  if (i === 11) return new CancrimagMusket(pos, player);
  if (i === 12) return new DeckGun(pos, player);

  return null;
}
