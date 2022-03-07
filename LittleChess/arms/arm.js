import { Canvas } from "../tools.js";
import { calculateCost, calculateLeaderShip } from "./armTools.js";
import { triggerAutoAttack } from "../actions/autoAttack.js";
import { SelectPieceColor as SPC } from "../const.js";

export const DamageTypes = ["melee", "missile", "charge", "bombing", "magic"];
export const ArmTypes = [
  "infantry",
  "archers",
  "cavalry",
  "monster-infantry",
  "monster",
  "artillery",
];

function getBaseClass(targetArm) {
  let p1_targetArm = Object.getPrototypeOf(targetArm);
  let p1_name = Object.getPrototypeOf(p1_targetArm).constructor.name;

  let p2_targetArm = Object.getPrototypeOf(p1_targetArm);
  let p2_name = Object.getPrototypeOf(p2_targetArm).constructor.name;

  if (p2_targetArm) {
    let p3_targetArm = Object.getPrototypeOf(p2_targetArm);
    if (Object.getPrototypeOf(p3_targetArm)) {
      let p3_name = Object.getPrototypeOf(p3_targetArm).constructor.name;
      if (p3_name === "Arm") return p3_name;
    }
  }

  if (p2_name === "Arm") return p2_name;
  return p1_name;
}
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
  let className = getBaseClass(targetArm);
  if (className !== "Arm") {
    throw new Error(
      `Invalid object type for targetArm: class name: {${className}}, type: {${typeof targetArm}}`
    );
  }
}

export class Arm {
  constructor(positionValue, _player) {
    // Properties for drawing
    this.x = 0;
    this.y = 0;
    this.positionX = positionValue !== null ? positionValue[0] : 0;
    this.positionY = positionValue !== null ? positionValue[1] : 0;
    this.width = 50;
    this.height = 50;
    this.img = null;
    this.player = _player !== null ? _player : null;
    this.showSpeed = false;

    this.isAlive = true;
    this.hasAttacked = false;
    this.operable = true;
    this.prepareToAuto = false;

    // Static properties
    this.name = "";
    this.m_name = "";
    this.type = "";
    this.description = "";
    this.m_description = "";
    this.cost = 0;

    this.exp = 0;
    this.level = 1;
    this.pre_level = 1;

    this.scale = 0;
    this.singleHP = 0;
    this.leadership = 0;
    this.c_leadership = 0;
    this.speed = 0;

    this.meleeArmor = 0;
    this.missileArmor = 0;
    this.chargeArmor = 0;

    this.meleeDodge = 0;
    this.missileDodge = 0;
    this.chargeDodge = 0;

    this.meleeAttack = 0;
    this.meleeAttack_bonus = 0;
    this.chargeAttack = 0;
    this.chargeAttack_bonus = 0;

    this.missileAttack = 0;
    this.missileAttack_bonus = 0;
    this.missileRange = 0;
    this.missileRadius = 0;
    this.isBombing = false;
    this.isParabola = false;

    this.antiArmor = 0;
    this.shock = 0;
    this.ammo = -1;

    // Load real-time properties for battle
    this.loadRealtimeProps = function () {
      this.img = document.getElementById(`${this.constructor.name}_img`);

      this.c_scale = this.scale;
      this.c_singleHP = this.singleHP;
      this.c_speed = this.speed;

      this.c_meleeArmor = this.meleeArmor;
      this.c_missileArmor = this.missileArmor;
      this.c_chargeArmor = this.chargeArmor;

      this.c_meleeDodge = this.meleeDodge;
      this.c_missileDodge = this.missileDodge;
      this.c_chargeDodge = this.chargeDodge;

      this.c_meleeAttack = this.meleeAttack;
      this.c_chargeAttack = this.chargeAttack;

      this.c_missileAttack = this.missileAttack;
      this.c_missileRange = this.missileRange;
      this.c_missileRadius = this.missileRadius;

      // Calculate the ammo, if not given above
      if (this.type === "archers" && this.ammo === -1) {
        this.ammo = 18;
      } else if (
        this.type === "cavalry" &&
        this.missileAttack != 0 &&
        this.ammo === -1
      ) {
        this.ammo = 12;
      } else if (this.type === "artillery" && this.ammo === -1) {
        if (this.isBombing) this.ammo = 15;
        else this.ammo = 18;
      }
      this.c_ammo = this.ammo;

      // Calculate the cost according to the battle properties
      let costResults = calculateCost(this);
      this.cost = costResults[0];

      // Calculate the leadership according to the battle properties
      this.leadership = calculateLeaderShip(this, costResults);
      this.c_leadership = this.leadership;
    };
  }

  // =============== Private methods ===============

  _getValidScale() {
    checkArmType(this.type);

    let factor = 0;
    if (this.type === "infantry") {
      factor = 4;
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

      case "missile":
        if (this.c_ammo > 0) {
          singleDamage = this.c_missileAttack;
          this.c_ammo--;
        }
        break;

      case "bombing":
        if (this.c_ammo > 0) {
          let min = this.c_missileAttack;
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

  _getDamagePercentage(attacker, damageType, antiArmor) {
    checkDamageType(damageType);

    let validArmor = 0 - antiArmor;
    let dodge = 0;
    switch (damageType) {
      case "melee":
        validArmor += this.c_meleeArmor;
        dodge += this.c_meleeDodge;
        if (attacker.isLarge()) {
          dodge += Math.round((this.c_chargeArmor + this.c_chargeDodge) / 2);
        }
        break;

      case "missile":
        validArmor += this.c_missileArmor;
        dodge += this.c_missileDodge;
        break;

      case "charge":
        validArmor += this.c_chargeArmor;
        dodge += this.c_chargeDodge;
        break;

      default:
        break;
    }
    validArmor = Math.max(validArmor, 0);

    let max = validArmor;
    let min = Math.round(validArmor * 0.8);
    let realArmor = Math.floor(Math.random() * (max - min + 1) + min);

    let percentage = (100 - (realArmor + dodge)) / 100;
    if (percentage < 0.01) percentage = 0.01;

    return percentage;
  }

  _realTimeAttackUpdate(factor) {
    this.c_meleeAttack = Math.round(this.meleeAttack * factor);
    this.c_missileAttack = Math.round(this.missileAttack * factor);
    this.c_chargeAttack = Math.round(this.chargeAttack * factor);
  }

  _realTimeArmorUpdate(factor) {
    this.c_meleeArmor = Math.round(this.meleeArmor * factor);
    this.c_missileArmor = Math.round(this.missileArmor * factor);
    this.c_chargeArmor = Math.round(this.chargeArmor * factor);

    this.c_meleeDodge = Math.round(this.meleeDodge * factor);
    this.c_missileDodge = Math.round(this.missileDodge * factor);
    this.c_chargeDodge = Math.round(this.chargeDodge * factor);
  }

  _updateRealTimeProperties() {
    let factor = 1;

    let oneThird = Math.floor(this.leadership / 3);
    let twoThirds = oneThird * 2;

    if (oneThird < this.c_leadership && this.c_leadership < twoThirds)
      factor = 0.8;
    else if (this.c_leadership <= oneThird) factor = 0.6;

    this._realTimeAttackUpdate(factor);
    this._realTimeArmorUpdate(factor);
  }

  _upgradeLevel() {
    if (this.exp < this.cost || this.level === 3) return;

    this.exp -= this.cost;
    this.level++;
  }

  _updateStaticProperties() {
    if (this.pre_level === this.level) return;

    this.pre_level = this.level;
    let factor = 1.1;
    if (this.level === 2) {
      factor = 1.2;
      this.leadership += 50;
      this.c_leadership = this.leadership;
    } else if (this.level === 3) {
      factor = 1.5;
      this.leadership += 50;
      this.c_leadership = this.leadership;
    }

    if (this.scale !== 1) {
      this.singleHP = Math.round(this.singleHP * factor);
    } else {
      let inc = Math.round(this.singleHP * (factor - 1.1));
      this.singleHP += inc;
      this.c_singleHP += inc;
    }

    this.meleeArmor = Math.round(this.meleeArmor * (factor - 0.1));
    this.missileArmor = Math.round(this.missileArmor * (factor - 0.1));
    this.chargeArmor = Math.round(this.chargeArmor * (factor - 0.1));
    this.meleeDodge = Math.round(this.meleeDodge * (factor - 0.1));
    this.missileDodge = Math.round(this.missileDodge * (factor - 0.1));
    this.chargeDodge = Math.round(this.chargeDodge * (factor - 0.1));

    this.meleeAttack = Math.round(this.meleeAttack * factor);
    this.missileAttack = Math.round(this.missileAttack * factor);
    this.chargeAttack = Math.round(this.chargeAttack * factor);

    if (this.ammo !== -1) {
      this.c_ammo += Math.floor(this.ammo / 3);
      this.c_ammo = Math.min(this.c_ammo, this.ammo);
    }

    this.cost = calculateCost(this)[0];
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
    Canvas.drawPiece(cxt, this, groupColor);
    if (this.showSpeed) {
      let color = this.c_speed === 0 ? "red" : "green";
      Canvas.drawText(cxt, this.c_speed, this.x + 5, this.y + 24, color, 20);
    }
  }

  // =============== Battle APIs ===============

  optOut() {
    this.c_speed = 0;
    this.operable = false;
  }

  roundRefresh(currentRound, endMyRound) {
    if (endMyRound) {
      triggerAutoAttack(this, this.player.enemyList);
    }

    this.operable = true;
    this.c_speed = this.speed;
    this.hasAttacked = false;
    this.showSpeed = false;

    if (currentRound % 7 === 0) this.c_leadership -= 5;
    if (this.c_leadership < 0) this.c_leadership = 0;

    // Update static battle properties
    this._upgradeLevel();
    this._updateStaticProperties();
    // Update real-time battle properties
    this._updateRealTimeProperties();
    if (this.c_leadership <= 0) {
      this.hasAttacked = true;
      this.optOut();
    }
  }

  getTotalHP() {
    return this.c_singleHP * this.c_scale;
  }

  getAntiArmor(damageType, targetArm) {
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
    if (damageType !== "melee") return 0;

    let singleDamage = this._getSingleDamage("melee", targetArm);
    let validScale = this._getValidScale();
    return Math.round(singleDamage * validScale * 0.85);
  }

  decreaseScale(attacker, damageType, antiArmor, rawTotalDamage) {
    checkArmClass(attacker);
    checkDamageType(damageType);
    let results = [0, 0];

    let damagePercentage = 1;
    if (damageType !== "bombing" && damageType !== "magic")
      damagePercentage = this._getDamagePercentage(
        attacker,
        damageType,
        antiArmor
      );

    let realDamage = rawTotalDamage * damagePercentage;
    let decreaseScore = 0;

    // If this arm is a single-unit
    if (this.scale === 1) {
      if (damageType === "melee" || damageType === "charge")
        realDamage = Math.ceil(realDamage * 0.125);
      else realDamage = Math.ceil(realDamage * 0.25);
      if (realDamage > 0) realDamage = Math.max(realDamage, 1);

      this.c_singleHP -= realDamage;
      decreaseScore = Math.round(realDamage / 3);

      if (this.c_singleHP <= 0) this.isAlive = false;
      results = [realDamage, decreaseScore];
    }

    // If this arm is a phalanx
    else {
      let factor = 1;
      if (this.type === "monster-infantry" || this.type === "artillery")
        factor = 0.5;
      realDamage = Math.round(realDamage * factor);

      let totalDecrease =
        realDamage === 0
          ? 0
          : Math.max(Math.round(realDamage / this.singleHP), 1);
      this.c_scale -= totalDecrease;
      decreaseScore = Math.round(realDamage / 30);

      if (this.c_scale <= 0) this.isAlive = false;
      results = [totalDecrease, decreaseScore];
    }

    return results;
  }

  getShockingAbility() {
    return Math.round((this.shock * this.c_scale) / this.scale);
  }

  getCurrentCombatPower() {
    let percentage = 1;
    if (this.scale === 1) percentage = this.c_singleHP / this.singleHP;
    else percentage = this.c_scale / this.scale;

    let leadershipDrop =
      ((this.leadership - this.c_leadership) / this.leadership) * 0.5;
    percentage -= leadershipDrop;

    for (let i = 1; i <= this.level - 1; i++) {
      percentage *= 1.2;
    }
    return this.cost * percentage;
  }

  isLarge() {
    return (
      this.type === "cavalry" ||
      this.type === "moster" ||
      this.type === "monster-infantry"
    );
  }

  isInfn() {
    return (
      this.type === "infantry" ||
      this.type === "archers" ||
      this.type === "artillery"
    );
  }

  isMon() {
    return this.type === "monster" || this.type === "monster-infantry";
  }
}
