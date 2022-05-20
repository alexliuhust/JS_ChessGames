import { Canvas } from "../common/tools.js";
import {
  calculateCost,
  calculateLeaderShip,
  updateRealTimeProperties,
  upgradeLevel,
  updateStaticProperties,
} from "./armTools.js";
import { triggerAutoAttack } from "../actions/autoAttack.js";
import { triggerHealing } from "../actions/heal.js";
import { triggerInspiring } from "../actions/inspire.js";
import {
  afterArmorEnhancement,
  afterAttackEnhancement,
  addArmorEnhanceEffect,
} from "../actions/enhance.js";

export const DamageTypes = ["melee", "missile", "charge", "bombing", "magic"];
export const ArmTypes = [
  "infantry",
  "archers",
  "cavalry",
  "monster-infantry",
  "monster",
  "artillery",
];

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
    this.missileColor = null;
    this.missileWeight = 2;
    this.missileNumber = null;
    this.alignMoved = false;

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
    this.wound = 0;
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

    this.healing = 0;
    this.healRange = 0;
    this.totalHeal = 0;

    this.inspiring = 0;
    this.inspireRange = 0;

    this.armorEnhance = 0;
    this.attackEnhance = 0;
    this.enhanceRange = 0;

    // Load real-time properties for battle
    this.loadRealtimeProps = function () {
      this.img = document.getElementById(`${this.constructor.name}_img`);

      this.c_scale = this.scale;
      this.c_singleHP = this.singleHP;
      this.wound = this.singleHP;
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

      this.c_totalHeal = this.totalHeal;

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
    let armor = 0;
    let dodge = 0;

    if (this.speed >= 4) {
      dodge += (this.speed - 3) * 6;
    }

    if (attacker.type === "artillery" || damageType === "bombing") {
      armor = 0;
      dodge = 0;
    } else {
      armor -= antiArmor;
      switch (damageType) {
        case "melee":
          dodge += this.c_meleeDodge;
          if (!this.isMon() && attacker.isLarge())
            armor += this.c_meleeArmor + this.c_chargeArmor / 2;
          else armor += this.c_meleeArmor + this.c_missileArmor / 4;
          break;

        case "missile":
          armor += this.c_missileArmor + this.c_meleeArmor / 4;
          dodge += this.c_missileDodge;
          break;

        case "charge":
          armor +=
            this.c_chargeArmor + (this.c_meleeArmor + this.c_missileArmor) / 5;
          dodge += this.c_chargeDodge;
          break;

        default:
          break;
      }
    }
    armor = Math.max(armor, -3);
    dodge = Math.max(dodge, -2);
    // console.log("armor", armor, "dodge", dodge);
    let enh = afterArmorEnhancement(this, this.player.pieceList);
    let percentage = (100 - (armor + dodge + enh)) / 100;
    if (percentage < 0.12) percentage = 0.12;

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
    Canvas.drawPiece(cxt, this, groupColor);
    if (this.showSpeed) {
      let color = this.c_speed !== this.speed ? "red" : "green";
      Canvas.drawText(cxt, this.c_speed, this.x + 5, this.y + 24, color, 20);
    }
  }

  // =============== Battle APIs ===============

  optOut() {
    this.c_speed = 0;
    this.operable = false;
  }

  roundRefresh(currentRound, endMyRound) {
    let healed = false;
    if (endMyRound) {
      triggerAutoAttack(this, this.player.enemyList);
      healed = triggerHealing(this, this.player.pieceList);
      triggerInspiring(this, this.player.pieceList);
    }
    if (!healed) {
      this.c_totalHeal += Math.round(this.healing / 3);
      if (this.c_totalHeal > this.totalHeal) this.c_totalHeal = this.totalHeal;
    }

    this.operable = true;
    this.c_speed = this.speed;
    this.alignMoved = false;
    this.hasAttacked = false;
    this.showSpeed = false;

    if (currentRound > 10) this.c_leadership -= Math.ceil(currentRound / 3);

    if (this.c_leadership < 0) this.c_leadership = 0;

    // Update static battle properties
    let upgraded = upgradeLevel(this);
    updateStaticProperties(this);
    // Update real-time battle properties
    updateRealTimeProperties(this, upgraded);
    if (this.c_leadership <= 0) {
      this.hasAttacked = true;
      this.optOut();
    }
  }

  getTotalHP() {
    if (this.scale === 1) return this.c_singleHP;
    return this.c_singleHP * (this.c_scale - 1) + this.wound;
  }

  getOriginalHP() {
    return this.singleHP * this.scale;
  }

  getAntiArmor(damageType, targetArm) {
    return 0;
  }

  getRawTotalDamage(damageType, targetArm) {
    let singleDamage = this._getSingleDamage(damageType, targetArm);
    let validScale = this._getValidScale();
    if (
      (this.type === "infantry" && targetArm.type === "infantry") ||
      (this.type === "artillery" && !this.isBombing && targetArm.isInfn())
    )
      singleDamage /= 2;

    if (damageType === "missile") {
      if (targetArm.isInfn()) {
        if (targetArm.c_scale <= targetArm.scale * 0.4) singleDamage *= 0.75;
        if (targetArm.c_scale <= targetArm.scale * 0.2) singleDamage *= 0.75;
      } else if (targetArm.isMon()) {
        singleDamage *= 1.25;
      }
    }

    if (damageType === "melee" || damageType === "charge") {
      if (this.type === "monster-infantry" && targetArm.isInfn())
        singleDamage *= 1.3;
      else if (this.type === "monster" && targetArm.isInfn())
        singleDamage *= 1.6;
    }

    let output = singleDamage * validScale;
    let enh = afterAttackEnhancement(this, this.player.pieceList);
    output = Math.round((output * (100 + enh)) / 100);

    return output;
  }

  getCounterAttackTotalDamage(damageType, targetArm) {
    if (damageType !== "melee") return 0;
    if (this.c_leadership <= 0) return 0;

    let singleDamage = this._getSingleDamage("melee", targetArm);
    let validScale = this._getValidScale();
    if (this.type === "infantry" && targetArm.type === "infantry")
      singleDamage = Math.round(singleDamage / 2);

    if (this.type === "monster-infantry" && targetArm.isInfn())
      singleDamage *= 1.3;
    else if (this.type === "monster" && targetArm.isInfn()) singleDamage *= 1.6;

    return Math.round(singleDamage * validScale);
  }

  decreaseScale(attacker, damageType, antiArmor, rawTotalDamage) {
    // console.log(this.name, "rawTotalDamage", rawTotalDamage);

    let damagePercentage = this._getDamagePercentage(
      attacker,
      damageType,
      antiArmor
    );
    let realDamage = Math.ceil(rawTotalDamage * damagePercentage);
    let decreaseScore = 0;

    // console.log(this.name, "realDamage", realDamage);

    // If this arm is a single-unit
    if (this.scale === 1) {
      if (damageType === "charge") realDamage = Math.ceil(realDamage / 2);
      if (realDamage > 0) {
        realDamage = Math.max(realDamage, 1);
        let enh = afterArmorEnhancement(this, this.player.pieceList);
        if (enh > 0) addArmorEnhanceEffect(this);
      }

      this.c_singleHP -= realDamage;
      if (this.c_singleHP <= 0) this.isAlive = false;

      decreaseScore = Math.round(realDamage / 30);
      return [realDamage, decreaseScore];
    }

    // If this arm is a phalanx
    else {
      let totalDecrease = 0;
      if (realDamage > this.wound) {
        realDamage -= this.wound;
        totalDecrease = Math.floor(realDamage / this.singleHP);
        this.wound =
          this.singleHP - (realDamage - totalDecrease * this.singleHP);

        totalDecrease++;

        let enh = afterArmorEnhancement(this, this.player.pieceList);
        if (enh > 0) addArmorEnhanceEffect(this);
      } else if (realDamage > 0) {
        this.wound -= realDamage;
      }

      this.c_scale -= totalDecrease;
      if (this.c_scale <= 0) this.isAlive = false;

      decreaseScore = Math.round(realDamage / 30);
      return [totalDecrease, decreaseScore];
    }
  }

  getShockingAbility() {
    return Math.round((this.shock * this.c_scale * 0.5) / this.scale);
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
      this.type === "monster" ||
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
