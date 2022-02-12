import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class Seaman extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Seaman_img");
    // Override original data

    this.name = "Seaman";
    this.m_name = "水手";
    this.type = "infantry";
    this.description = "infantry / weak";
    this.m_description = "近战步兵【孱弱】";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 20;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class SeamanPistol extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SeamanPistol_img");
    // Override original data

    this.name = "Seaman (Pistol)";
    this.m_name = "水手-手枪";
    this.type = "archers";
    this.description = "archers";
    this.m_description = "远程步兵";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 20;
    this.missileAttack = 16;
    this.missileRange = 4;

    this.ammo = 30;
    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class SeamanMusket extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("SeamanMusket_img");
    // Override original data

    this.name = "Seaman (Musket)";
    this.m_name = "水手-步枪";
    this.type = "archers";
    this.description = "archers";
    this.m_description = "远程步兵";

    this.scale = 64;
    this.singleHP = 40;
    this.speed = 3;

    this.meleeAttack = 20;
    this.missileAttack = 24;
    this.missileRange = 6;

    this.antiArmor = 10;

    this.ammo = 24;
    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class Pisciculi extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Pisciculi_img");
    // Override original data

    this.name = "Pisciculi";
    this.m_name = "侏儒鱼人";
    this.type = "infantry";
    this.description = "infantry / dodge-missile";
    this.m_description = "近战步兵【远程闪避】";

    this.scale = 100;
    this.singleHP = 30;
    this.speed = 6;

    this.missileDodge = 60;

    this.meleeAttack = 32;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class PisciculiDoubleBlades extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("PisciculiDoubleBlades_img");
    // Override original data

    this.name = "Pisciculi (Double Blades)";
    this.m_name = "侏儒鱼人-双刀";
    this.type = "infantry";
    this.description = "infantry / dodge-missile / high-damage";
    this.m_description = "近战步兵【远程闪避，高伤害】";

    this.scale = 100;
    this.singleHP = 30;
    this.speed = 6;

    this.missileDodge = 60;

    this.meleeAttack = 50;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============
}

export class MurlocWarrior extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("MurlocWarrior_img");
    // Override original data

    this.name = "Murloc Warrior";
    this.m_name = "鱼人战士";
    this.type = "infantry";
    this.description = "infantry / anti-armor";
    this.m_description = "近战步兵【高破甲】";

    this.scale = 40;
    this.singleHP = 150;
    this.speed = 2;

    this.meleeArmor = 60;
    this.missileArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 80;

    this.antiArmor = 30;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class MurlocWarriorHurling extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("MurlocWarriorHurling_img");
    // Override original data

    this.name = "Murloc Warrior (Hurling)";
    this.m_name = "鱼人战士-投戟";
    this.type = "infantry";
    this.description = "hurling-infantry / anti-armor";
    this.m_description = "投掷-近战步兵【高破甲】";

    this.scale = 40;
    this.singleHP = 150;
    this.speed = 2;

    this.meleeArmor = 60;
    this.missileArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 80;

    this.missileAttack = 80;
    this.missileRange = 4;

    this.antiArmor = 30;

    this.ammo = 2;
    this.loadRealtimeProps();

    this.leadership = 350;
    this.c_leadership = this.leadership;
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "melee") return this.antiArmor;
    return 0;
  }
}

export class Cancrimag extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Cancrimag_img");
    // Override original data

    this.name = "Cancrimagnus";
    this.m_name = "巨蟹";
    this.type = "monster";
    this.description = "giant / heavy-armor / missile-attack / shocking";
    this.m_description = "巨兽【重装甲，远程攻击，惊骇敌军】";

    this.scale = 1;
    this.singleHP = 300;
    this.speed = 1;

    this.meleeArmor = 60;
    this.missileArmor = 115;
    this.chargeArmor = 50;

    this.meleeAttack = 600;

    this.missileAttack = 720;
    this.missileRange = 6;

    this.antiArmor = 10;
    this.shock = 70;

    this.ammo = 20;
    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export class DeckGun extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("DeckGun_img");
    // Override original data

    this.name = "Deck Gun";
    this.m_name = "甲板炮";
    this.type = "artillery";
    this.description = "artillery / anti-armor";
    this.m_description = "炮兵【高破甲】";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missileAttack = 230;
    this.missileRange = 12;

    this.antiArmor = 70;

    this.loadRealtimeProps();
  }

  // =============== Override private methods ===============

  // =============== Override Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    ArmPrimary.checkDamageType(damageType);
    ArmPrimary.checkArmClass(targetArm);

    if (damageType === "missile") return this.antiArmor;
    return 0;
  }
}

export function getTestArms(player) {
  let pos = player === 1 ? ArmTestPos1 : ArmTestPos2;
  let arms = [
    new Seaman(pos[0]),
    new SeamanPistol(pos[1]),
    new SeamanMusket(pos[2]),
    new Pisciculi(pos[3]),
    new PisciculiDoubleBlades(pos[4]),
    new MurlocWarrior(pos[5]),
    new MurlocWarriorHurling(pos[6]),
    new Cancrimag(pos[7]),
    new DeckGun(pos[8]),
  ];
  return arms;
}

export function newAnArm(i, posX, posY) {
  let pos = [posX, posY];
  if (i === 0) return new Seaman(pos);
  if (i === 1) return new SeamanPistol(pos);
  if (i === 2) return new SeamanMusket(pos);
  if (i === 3) return new Pisciculi(pos);
  if (i === 4) return new PisciculiDoubleBlades(pos);
  if (i === 5) return new MurlocWarrior(pos);
  if (i === 6) return new MurlocWarriorHurling(pos);
  if (i === 7) return new Cancrimag(pos);
  if (i === 8) return new DeckGun(pos);
}

export function getImages() {
  let images = [];
  images.push("../images/stormreef/Seaman.png");
  images.push("../images/stormreef/SeamanPistol.png");
  images.push("../images/stormreef/SeamanMusket.png");
  images.push("../images/stormreef/Pisciculi.png");
  images.push("../images/stormreef/PisciculiDoubleBlades.png");
  images.push("../images/stormreef/MurlocWarrior.png");
  images.push("../images/stormreef/MurlocWarriorHurling.png");
  images.push("../images/stormreef/Cancrimag.png");
  images.push("../images/stormreef/DeckGun.png");

  return images;
}
