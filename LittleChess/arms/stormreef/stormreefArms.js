import * as ArmPrimary from "../arm.js";
import { ArmTestPos1, ArmTestPos2 } from "../../const.js";

export class Seaman extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Seaman_img");
    // Override original data

    this.name = "Seaman";
    this.type = "infantry";
    this.description = "infantry / weak";

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
    this.type = "archers";
    this.description = "archers";

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
    this.type = "archers";
    this.description = "archers";

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
    this.type = "infantry";
    this.description = "infantry / dodge-missile";

    this.scale = 100;
    this.singleHP = 30;
    this.speed = 6;

    this.meleeArmor = 0;
    this.missileArmor = 60;
    this.chargeArmor = 0;

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
    this.type = "infantry";
    this.description = "infantry / dodge-missile / high-damage";

    this.scale = 100;
    this.singleHP = 30;
    this.speed = 6;

    this.meleeArmor = 0;
    this.missileArmor = 60;
    this.chargeArmor = 0;

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
    this.type = "infantry";
    this.description = "infantry / anti-armor";

    this.scale = 48;
    this.singleHP = 120;
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
    this.type = "archers";
    this.description = "hurling-infantry / anti-armor";

    this.scale = 48;
    this.singleHP = 120;
    this.speed = 2;

    this.meleeArmor = 60;
    this.missileArmor = 0;
    this.chargeArmor = 60;

    this.meleeAttack = 80;

    this.missileAttack = 120;
    this.missileRange = 4;

    this.antiArmor = 30;

    this.ammo = 3;
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

export class Cancrimag extends ArmPrimary.Arm {
  constructor(value) {
    super(value);
    this.img = document.getElementById("Cancrimag_img");
    // Override original data

    this.name = "Cancrimag";
    this.type = "monster";
    this.description = "giant / heavy-armor / missile-attack";

    this.scale = 1;
    this.singleHP = 400;
    this.speed = 1;

    this.meleeArmor = 90;
    this.missileArmor = 90;
    this.chargeArmor = 90;

    this.meleeAttack = 400;

    this.missileAttack = 240;
    this.missileRange = 6;

    this.antiArmor = 10;

    this.ammo = 30;
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
    this.type = "artillery";
    this.description = "artillery / anti-armor";

    this.scale = 5;
    this.singleHP = 300;
    this.speed = 1;

    this.missileAttack = 150;
    this.missileRange = 12;

    this.antiArmor = 50;

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
