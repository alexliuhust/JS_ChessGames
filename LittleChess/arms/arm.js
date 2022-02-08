import { Canvas, Rect } from "../tools.js";
import { HpColor, AmmoColor, LeadColor, LevelColor } from "../const.js";

export const DamageTypes = ["melee", "missile", "charge", "bombing", "magic"];
export const ArmTypes = [
  "infantry",
  "archers",
  "cavalry",
  "monster-infantry",
  "monster",
  "artillery",
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
  meleeArmorScore += arm.meleeDodge * 1.5;

  let missileArmorScore =
    arm.missileArmor >= 60 ? arm.missileArmor * 1.3 : arm.missileArmor;
  if (arm.missileArmor >= 80) missileArmorScore *= 1.3;
  missileArmorScore += arm.missileDodge * 1.5;

  let chargeArmorScore =
    arm.chargeArmor >= 60 ? arm.chargeArmor * 1.3 : arm.chargeArmor;
  if (arm.chargeArmor >= 80) chargeArmorScore *= 1.3;
  chargeArmorScore += arm.chargeDodge * 1.5;

  let armorScore = Math.floor(
    (meleeArmorScore + missileArmorScore + chargeArmorScore) * 0.6
  );

  // Attack score
  let meleeScore = Math.floor(
    (arm.scale * (arm.meleeAttack + arm.meleeAttack_bonus / 2)) / 40
  );
  let rangeScore =
    arm.missileRange >= 7 ? arm.missileRange * 1.7 : arm.missileRange;
  let missileScore = Math.floor(
    (arm.scale * (arm.missileAttack + arm.missileAttack_bonus / 2)) / 30 +
      rangeScore * 7 +
      arm.missileRadius * 30 +
      arm.ammo
  );
  let chargeScore = Math.floor(
    (arm.scale * (arm.chargeAttack + arm.chargeAttack_bonus / 2)) / 30 +
      arm.speed * 3
  );
  let attackScore = Math.floor((meleeScore + missileScore + chargeScore) / 2);
  attackScore += Math.floor((arm.shock * arm.shock) / 200);

  // Anti-armor score
  let antiArmorScore = Math.floor(Math.sqrt(arm.antiArmor) * 3);

  // Type score
  let artilleryScore = arm.type === "artillery" ? 150 : 0;
  if (arm.isBombing) artilleryScore += 100;
  let monsterScore = arm.type === "monster" ? 150 : 0;
  let monstInfScore = arm.type === "monster-infantry" ? 100 : 0;
  let typeScore = artilleryScore + monsterScore + monstInfScore;

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

  return [cost, armorScore];
}

function calculateLeaderShip(arm, costResults) {
  let leadership = arm.cost + costResults[1] * 0.5;
  if (arm.type === "infantry" || arm.type === "cavalry") {
    leadership *= 1.25;
  } else if (arm.type === "archers" || arm.type === "artillery") {
    leadership *= 0.75;
  }
  leadership = Math.round(leadership / 50) * 50;

  return leadership;
}

export class Arm {
  constructor(positionValue) {
    // Properties for drawing

    this.x = 0;
    this.y = 0;
    this.positionX = 0;
    this.positionY = 0;
    this.width = 50;
    this.height = 50;
    this.img = null;

    this.isAlive = true;
    this.hasAttacked = false;
    this.operable = true;

    if (positionValue !== null) {
      this.positionX = positionValue[0];
      this.positionY = positionValue[1];
    }

    // Properties of original data
    // The children classes will modify the following fields

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

    this.antiArmor = 0;
    this.shock = 0;

    this.ammo = -1;

    // Load real-time properties for battle

    this.loadRealtimeProps = function () {
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
        this.ammo = 14;
      } else if (this.type === "artillery" && this.ammo === -1) {
        this.ammo = 25;
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

  _getDamagePercentage(damageType, antiArmor) {
    checkDamageType(damageType);

    let validArmor = 0 - antiArmor;
    let dodge = 0;
    switch (damageType) {
      case "melee":
        validArmor += this.c_meleeArmor;
        dodge += this.c_meleeDodge;
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

    if (percentage > 0.95) percentage = 0.95;
    if (percentage < 0) percentage = 0;

    return percentage;
  }

  _damageCauseLeadershipDecreasing(realDamage, damageType) {
    let decrease = 0;
    if (realDamage >= this.singleHP * 0.8) decrease = 150;
    else if (realDamage >= this.singleHP * 0.5) decrease = 100;
    else if (realDamage >= this.singleHP * 0.3) decrease = 30;

    if (damageType === "charge" || damageType === "bombing") decrease += 30;

    this.c_leadership -= decrease;
    if (this.c_leadership < 0) this.c_leadership = 0;
  }

  _scaleDecreasingCauseLeadershipDecreasing(totalDecrease, damageType) {
    let decrease = 0;
    if (totalDecrease >= this.scale * 0.8) decrease = 150;
    else if (totalDecrease >= this.scale * 0.5) decrease = 100;
    else if (totalDecrease >= this.scale * 0.3) decrease = 30;

    if (damageType === "charge" || damageType === "bombing") decrease += 50;

    this.c_leadership -= decrease;
    if (this.c_leadership < 0) this.c_leadership = 0;
  }

  _attackUpdate(factor) {
    this.c_meleeAttack = Math.round(this.meleeAttack * factor);
    this.c_missileAttack = Math.round(this.missileAttack * factor);
    this.c_chargeAttack = Math.round(this.chargeAttack * factor);
  }

  _armorUpdate(factor) {
    this.c_meleeArmor = Math.round(this.meleeArmor * factor);
    this.c_missileArmor = Math.round(this.missileArmor * factor);
    this.c_chargeArmor = Math.round(this.chargeArmor * factor);

    this.c_meleeDodge = Math.round(this.meleeDodge * factor);
    this.c_missileDodge = Math.round(this.missileDodge * factor);
    this.c_chargeDodge = Math.round(this.chargeDodge * factor);
  }

  _updatePropertiesAccordingToLeadership() {
    let factor = 1;

    let oneThird = Math.floor(this.leadership / 3);
    let twoThirds = oneThird * 2;

    if (oneThird < this.c_leadership && this.c_leadership < twoThirds) {
      factor = 0.8;
    } else if (this.c_leadership <= oneThird) {
      factor = 0.6;
    }

    this._attackUpdate(factor);
    this._armorUpdate(factor);
  }

  _upgradeLevel() {
    if (this.exp < this.cost || this.level === 3) return;

    this.exp -= this.cost;
    this.level++;
  }

  _updatePropertiesAccordingToLevel() {
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

    if (this.scale !== 1) this.singleHP = Math.round(this.singleHP * factor);
    else this.singleHP = Math.round(this.singleHP * (factor - 0.1));

    this.meleeArmor = Math.round(this.meleeArmor * (factor - 0.1));
    this.missileArmor = Math.round(this.missileArmor * (factor - 0.1));
    this.chargeArmor = Math.round(this.chargeArmor * (factor - 0.1));
    this.meleeDodge = Math.round(this.meleeDodge * (factor - 0.1));
    this.missileDodge = Math.round(this.missileDodge * (factor - 0.1));
    this.chargeDodge = Math.round(this.chargeDodge * (factor - 0.1));

    this.meleeAttack = Math.round(this.meleeAttack * factor);
    this.missileAttack = Math.round(this.missileAttack * factor);
    this.chargeAttack = Math.round(this.chargeAttack * factor);

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

    // Draw arm flag
    Canvas.drawImg(cxt, this.img, this.x, this.y);

    // Draw stripe color
    Canvas.drawLine(
      cxt,
      this.x + 2,
      this.y + 8,
      this.x + 2,
      this.y + 46,
      groupColor,
      5
    );
    Canvas.drawLine(
      cxt,
      this.x + 48,
      this.y + 8,
      this.x + 48,
      this.y + 46,
      groupColor,
      5
    );

    // Draw level
    let number = this.level >= 2 ? this.level : 0;
    for (let i = 0; i < number; i++) {
      let x1 = this.x,
        x2 = this.x + 5;
      let y1 = this.y + 39 - i * 5,
        y2 = this.y + 39 - i * 5;
      Canvas.drawLine(cxt, x1, y1, x2, y2, LevelColor, 4);
    }

    // Draw HP, ammo, and leaddership bars
    let hpBarLength, ammoBarLength, leadBarLength;
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
    leadBarLength = (50 * this.c_leadership) / this.leadership;

    Canvas.drawLine(
      cxt,
      this.x,
      this.y + 2,
      this.x + hpBarLength,
      this.y + 2,
      HpColor,
      4
    );
    Canvas.drawLine(
      cxt,
      this.x,
      this.y + 6,
      this.x + leadBarLength,
      this.y + 6,
      LeadColor,
      4
    );
    Canvas.drawLine(
      cxt,
      this.x,
      this.y + 48,
      this.x + ammoBarLength,
      this.y + 48,
      AmmoColor,
      4
    );

    // Draw operablility mark
    if (!this.operable) {
      Canvas.drawLine(
        cxt,
        this.x + 33,
        this.y + 10,
        this.x + 43,
        this.y + 20,
        "red",
        2
      );
      Canvas.drawLine(
        cxt,
        this.x + 33,
        this.y + 20,
        this.x + 43,
        this.y + 10,
        "red",
        2
      );
    }
  }

  // =============== Battle APIs ===============

  optOut() {
    this.hasAttacked = true;
    this.c_speed = 0;
    this.operable = false;
  }

  roundRefresh(currentRound) {
    this.operable = true;
    this.c_speed = this.speed;
    this.hasAttacked = false;

    if (currentRound % 7 === 0) {
      this.c_leadership -= 5;
    }
    if (this.c_leadership < 0) {
      this.c_leadership = 0;
    }

    // Update static battle properties
    this._upgradeLevel();
    this._updatePropertiesAccordingToLevel();
    // Update real-time battle properties
    this._updatePropertiesAccordingToLeadership();
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

    let realDamage = rawTotalDamage * damagePercentage;
    let decreaseScore = 0;

    // If this arm is a single-unit
    if (this.scale === 1) {
      if (damageType === "melee" || damageType === "charge") {
        realDamage = Math.round(realDamage * 0.125);
      } else {
        realDamage = Math.round(realDamage * 0.25);
      }
      if (realDamage > 0) realDamage = Math.max(realDamage, 1);
      this.c_singleHP -= realDamage;
      decreaseScore = Math.round(realDamage / 3);

      // Too-high damage will decrease the arm's leadership
      this._damageCauseLeadershipDecreasing(realDamage, damageType);

      if (this.c_singleHP <= 0) {
        this.isAlive = false;
      }
    }

    // If this arm is a phalanx
    else {
      let factor = 1;
      if (this.type === "monster-infantry") factor = 0.5;
      else if (this.type === "artillery") factor = 0.3;

      realDamage = Math.round(realDamage * factor);
      let totalDecrease =
        realDamage === 0
          ? 0
          : Math.max(Math.round(realDamage / this.singleHP), 1);
      this.c_scale -= totalDecrease;
      decreaseScore = Math.round(realDamage / 30);

      // Too-high damage will decrease the arm's leadership
      this._scaleDecreasingCauseLeadershipDecreasing(totalDecrease, damageType);

      if (this.c_scale <= 0) {
        this.isAlive = false;
      }
    }

    return decreaseScore * this.level;
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
}
