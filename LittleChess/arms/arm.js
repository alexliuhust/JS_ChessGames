export const DamageTypes = ["melee", "missle", "charge"];
export const ArmTypes = [
  "infantry",
  "cavalry",
  "archers",
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

export class Arm {
  constructor() {
    // Properties for drawing

    this.frameSpeed = 20;
    this.positionX = 0;
    this.positionY = 0;
    this.currentDirection = "u";
    this.isAlive = true;

    // Properties of original data
    // The children classes will modify the following fields

    this.name = "";
    this.type = "";
    this.cost = 0;

    this.scale = 0;
    this.singleHP = 0;
    this.speed = 0;

    this.meleeArmor = 0;
    this.missleArmor = 0;
    this.chargeArmor = 0;

    this.meleeAttack = 0;
    this.missleAttack = 0;
    this.missleRange = 0;
    this.chargeAttack = 0;

    // Load real-time properties for battle

    this.loadRealtimeProps = function () {
      this.c_scale = this.scale;
      this.c_singleHP = this.singleHP;
      this.c_scale = this.scale;

      this.c_meleeArmor = this.meleeArmor;
      this.c_missleArmor = this.missleArmor;
      this.c_chargeArmor = this.chargeArmor;

      this.c_meleeAttack = this.meleeAttack;
      this.c_missleAttack = this.missleAttack;
      this.c_missleRange = this.missleRange;
      this.c_chargeAttack = this.chargeAttack;
    };
  }

  // =============== Private methods ===============

  _getValidScale() {
    checkArmType(this.type);

    let factor = 0;
    if (this.type === "infantry") {
      factor = 4;
    }
    if (
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

  _getSingleDamage(damageType, targetType) {
    checkDamageType(damageType);
    checkArmType(targetType);

    let singleDamage = 0;
    switch (damageType) {
      case "melee":
        singleDamage = this.c_meleeAttack;
        break;

      case "missle":
        singleDamage = this.c_missleAttack;
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

    let max = validArmor;
    let min = Math.round(validArmor * 0.8);
    let realArmor = Math.floor(Math.random() * (max - min + 1) + min);

    return (100 - realArmor) / 100;
  }

  // =============== Public APIs ===============

  getAntiArmor(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);
  }

  getRawTotalDamage(damageType, targetArm) {
    checkDamageType(damageType);
    checkArmClass(targetArm);

    let singleDamage = this._getSingleDamage(damageType, targetArm.type);
    let validScale = this._getValidScale();
    return singleDamage * validScale;
  }

  decreaseScale(damageType, antiArmor, rawTotalDamage) {
    checkDamageType(damageType);

    let damagePercentage = this._getDamagePercentage(damageType, antiArmor);
    let realDamge = rawTotalDamage * damagePercentage;
    let totalDecrease = Math.ceil(realDamge / this.singleHP);

    this.c_scale -= totalDecrease;
    if (this.c_scale <= 0) {
      this.isAlive = false;
    }
  }
}
