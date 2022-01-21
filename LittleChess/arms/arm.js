import { Canvas, Rect } from "../tools.js";
import { HpColor, AmmoColor } from "../const.js";

export const DamageTypes = ["melee", "missle", "charge", "bombing", "magic"];
export const ArmTypes = [
  "infantry",
  "cavalry",
  "archers",
  "monster-infantry",
  "monster",
  "artillery",
  "mages",
];

export function checkDamageType(damageType) {
  if (!DamageTypes.includes(damageType)) {
    throw new Error("Invalid damage type: " + damageType);
  }
}
export function checkArmType(targetType) {
  if (!ArmTypes.includes(targetType)) {
    throw new Error("Invalid target type: " + targetType);
  }
}
export function checkArmClass(targetArm) {
  let className = Object.getPrototypeOf(targetArm.constructor).name;
  if (className !== "Arm") {
    throw new Error(
      `Invalid object type for targetArm: class name: {${className}}, type: {${typeof targetArm}}`
    );
  }
}

function calculateCost(arm) {
  checkArmClass(arm);

  // HP score
  let hpScore = arm.scale * arm.singleHP;
  if (arm.scale === 1) hpScore *= 8;
  hpScore = Math.floor(hpScore / 100);

  // Moving score
  let movingScore = arm.speed * 10;

  // Armor score
  let meleeArmorScore =
    arm.meleeArmor >= 60 ? arm.meleeArmor * 1.3 : arm.meleeArmor;
  if (arm.meleeArmor >= 80) meleeArmorScore *= 1.3;
  let missleArmorScore =
    arm.missleArmor >= 60 ? arm.missleArmor * 1.3 : arm.missleArmor;
  if (arm.missleArmor >= 80) missleArmorScore *= 1.3;
  let chargeArmorScore =
    arm.chargeArmor >= 60 ? arm.chargeArmor * 1.3 : arm.chargeArmor;
  if (arm.chargeArmor >= 80) chargeArmorScore *= 1.3;
  let armorScore = Math.floor(
    (meleeArmorScore + missleArmorScore + chargeArmorScore) * 0.6
  );

  // Attack score
  let meleeScore = Math.floor(
    (arm.scale * (arm.meleeAttack + arm.meleeAttack_bonus / 2)) / 40
  );
  let rangeScore =
    arm.missleRange >= 7 ? arm.missleRange * 1.7 : arm.missleRange;
  let missleScore = Math.floor(
    (arm.scale * (arm.missleAttack + arm.missleAttack_bonus / 2)) / 30 +
      rangeScore * 7 +
      arm.missleRadius * 30 +
      arm.ammo
  );
  let chargeScore = Math.floor(
    (arm.scale * (arm.chargeAttack + arm.chargeAttack_bonus / 2)) / 30 +
      arm.speed * 3
  );
  let attackScore = Math.floor((meleeScore + missleScore + chargeScore) / 2);

  // Anti-armor score
  let antiArmorScore = Math.floor(Math.sqrt(arm.antiArmor) * 3);

  // Type score
  let artilleryScore = arm.type === "artillery" ? 150 : 0;
  let monsterScore = arm.type === "monster" ? 150 : 0;
  let typeScore = artilleryScore + monsterScore;

  // Final cost
  let cost =
    Math.floor(
      (hpScore +
        movingScore +
        armorScore +
        attackScore +
        antiArmorScore +
        typeScore) /
        5
    ) * 5;

  return cost;
}

export class Arm {
  constructor(positionValue) {
    // Properties for drawing

    this.frameSpeed = 20;

    this.x = 0;
    this.y = 0;
    this.positionX = 0;
    this.positionY = 0;
    this.width = 50;
    this.height = 50;
    this.img = null;

    this.isAlive = true;
    this.hasAttacked = false;
    this.hasMoved = false;

    if (positionValue !== null) {
      this.positionX = positionValue[0];
      this.positionY = positionValue[1];
    }

    // Properties of original data
    // The children classes will modify the following fields

    this.name = "";
    this.type = "";
    this.description = "";
    this.cost = 0;

    this.scale = 0;
    this.singleHP = 0;
    this.speed = 0;

    this.meleeArmor = 0;
    this.missleArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 0;
    this.meleeAttack_bonus = 0;
    this.chargeAttack = 0;
    this.chargeAttack_bonus = 0;

    this.missleAttack = 0;
    this.missleAttack_bonus = 0;
    this.missleRange = 0;
    this.missleRadius = 0;
    this.isBombing = false;

    this.antiArmor = 0;

    this.ammo = -1;

    // Load real-time properties for battle

    this.loadRealtimeProps = function () {
      this.c_scale = this.scale;
      this.c_singleHP = this.singleHP;
      this.c_speed = this.speed;

      this.c_meleeArmor = this.meleeArmor;
      this.c_missleArmor = this.missleArmor;
      this.c_chargeArmor = this.chargeArmor;

      this.c_meleeAttack = this.meleeAttack;
      this.c_chargeAttack = this.chargeAttack;

      this.c_missleAttack = this.missleAttack;
      this.c_missleRange = this.missleRange;
      this.c_missleRadius = this.missleRadius;

      if (this.type === "archers") {
        this.ammo = 18;
      } else if (this.type === "cavalry" && this.missleAttack != 0) {
        this.ammo = 14;
      } else if (this.type === "artillery") {
        this.ammo = 10;
      }
      this.c_ammo = this.ammo;

      this.cost = calculateCost(this);
    };
  }

  // =============== Private methods ===============

  _getValidScale() {
    checkArmType(this.type);

    let factor = 0;
    if (this.type === "infantry") {
      factor = 3;
    } else if (
      this.type === "cavalry" ||
      this.type === "archers" ||
      this.type === "mages"
    ) {
      factor = 2;
    } else {
      factor = 1;
    }

    return Math.min(this.c_scale, Math.floor(this.scale / factor));
  }

  _getSingleDamage(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmType(targetArm.type);

    if (!this.isAlive) {
      return 0;
    }

    let singleDamage = 0;
    switch (damageType) {
      case "melee":
        singleDamage = this.c_meleeAttack;
        break;

      case "missle":
        if (this.c_ammo > 0) {
          singleDamage = this.c_missleAttack;
          this.c_ammo--;
        }
        break;

      case "bombing":
        if (this.c_ammo > 0) {
          let min = this.c_missleAttack;
          let max = Math.round(min * 1.25);
          singleDamage = Math.floor(Math.random() * (max - min + 1) + min);
        }
        break;

      case "charge":
        singleDamage = this.c_chargeAttack;
        break;

      default:
        break;
    }
    return singleDamage;
  }

  _getDamagePercentage(damageType, antiArmor) {
    checkDamageType(damageType);

    let validArmor = 0 - antiArmor;
    switch (damageType) {
      case "melee":
        validArmor += this.c_meleeArmor;
        break;

      case "missle":
        validArmor += this.c_missleArmor;
        break;

      case "charge":
        validArmor += this.c_chargeArmor;
        break;

      default:
        break;
    }
    validArmor = Math.max(validArmor, 0);

    let max = validArmor;
    let min = Math.round(validArmor * 0.8);
    let realArmor = Math.floor(Math.random() * (max - min + 1) + min);

    let percentage = (100 - realArmor) / 100;
    if (percentage > 1) percentage = 1;
    if (percentage < 0) percentage = 0;
    return percentage;
  }

  // =============== Drawing APIs ===============

  set_x_y() {
    this.x = this.positionX * 50;
    this.y = this.positionY * 50;
    return [this.x, this.y];
  }

  get_position_x_y() {
    this.positionX = Math.floor(_x / 50);
    this.positionY = Math.floor(_y / 50);
    return [this.positionX, this.positionY];
  }

  draw(cxt, groupColor) {
    this.set_x_y();
    // Draw arm flag
    Canvas.drawImg(cxt, this.img, this.x, this.y);
    // Draw stripe color
    Canvas.drawLine(
      cxt,
      this.x + 2,
      this.y + 7,
      this.x + 2,
      this.y + 50,
      groupColor,
      5
    );
    Canvas.drawLine(
      cxt,
      this.x + 48,
      this.y + 7,
      this.x + 48,
      this.y + 50,
      groupColor,
      5
    );
    // Draw HP and ammo bar
    let hpBarLength, ammoBarLength;
    if (this.scale === 1) {
      hpBarLength = (50 * this.c_singleHP) / this.singleHP;
    } else {
      hpBarLength = (50 * this.c_scale) / this.scale;
    }
    if (this.ammo === -1) {
      ammoBarLength = 0;
    } else {
      ammoBarLength = (50 * this.c_ammo) / this.ammo;
    }
    Canvas.drawLine(
      cxt,
      this.x,
      this.y,
      this.x + hpBarLength,
      this.y,
      HpColor,
      5
    );
    Canvas.drawLine(
      cxt,
      this.x,
      this.y + 5,
      this.x + ammoBarLength,
      this.y + 5,
      AmmoColor,
      5
    );
  }

  // =============== Public APIs ===============

  roundRefresh() {
    this.c_speed = this.speed;
    this.hasAttacked = false;
  }

  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    if (!this.isAlive) {
      return 0;
    }

    return 0;
  }

  getRawTotalDamage(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    let singleDamage = this._getSingleDamage(damageType, targetArm);
    let validScale = this._getValidScale();
    return singleDamage * validScale;
  }

  getCounterAttackTotalDamage(damageType, targetArm) {
    checkDamageType(damageType);

    if (damageType !== "melee") {
      return 0;
    }

    let singleDamage = this._getSingleDamage("melee", targetArm);
    let validScale = this._getValidScale();
    return Math.round(singleDamage * validScale * 0.75);
  }

  decreaseScale(damageType, antiArmor, rawTotalDamage) {
    checkDamageType(damageType);

    let damagePercentage = 1;
    if (damageType !== "bombing" && damageType !== "magic") {
      damagePercentage = this._getDamagePercentage(damageType, antiArmor);
    }

    let realDamge = rawTotalDamage * damagePercentage;

    if (this.scale === 1) {
      if (damageType === "melee" || damageType === "charge") {
        this.c_singleHP -= Math.round(realDamge / 10);
      } else {
        this.c_singleHP -= Math.round(realDamge / 4);
      }
      if (this.c_singleHP <= 0) {
        this.isAlive = false;
      }
    } else {
      let totalDecrease = Math.ceil(realDamge / this.singleHP);
      this.c_scale -= totalDecrease;
      if (this.c_scale <= 0) {
        this.isAlive = false;
      }
    }
  }
}
