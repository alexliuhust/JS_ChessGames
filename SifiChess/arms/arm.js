import { Canvas } from "../common/tools.js";
import {
  calculateCost,
  calculateLeaderShip,
  updateRealTimeProperties,
} from "./armTools.js";
import { triggerAutoAttack } from "../actions/autoAttack.js";
import { triggerHealing } from "../actions/heal.js";
import { triggerInspiring } from "../actions/inspire.js";
import {
  afterArmorEnhancement,
  afterAttackEnhancement,
  addArmorEnhanceEffect,
} from "../actions/enhance.js";

const ground_air = ["Ground", "Air"];
const bio_mech = ["Bio", "Mech"];
const light_heavy = ["Light", "Heavy"];
const size_info = ["Small", "Medium", "Large"];

const m_ground_air = ["地面", "空中"];
const m_bio_mech = ["生物", "机械"];
const m_light_heavy = ["轻甲", "重甲"];
const m_size_info = ["小型", "中型", "大型"];

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
    this.isAttacked = false;
    this.operable = true;
    this.prepareToAuto = false;
    this.missileColor = null;
    this.missileWeight = 2;
    this.missileNumber = null;
    this.alignMoved = false;

    // Static properties
    this.name1 = "";
    this.m_name1 = "";
    this.name2 = "";
    this.m_name2 = "";
    this.name = "";
    this.m_name = "";
    this.description = "";
    this.m_description = "";
    this.extra = "";
    this.m_extra = "";
    this.cost = 0;

    this.shield = 0;
    this.shield_armor = 0;

    this.scale = 0;
    this.singleHP = 0;
    this.wound = 0;
    this.leadership = 0;
    this.c_leadership = 0;
    this.speed = 0;

    this.type = [0, 0, 0, 0];
    this.defence_data = [0, 0];
    this.melee_data = [0, 0];
    this.G_data = [0, 0, 0, -1];
    this.A_data = [0, 0, 0, -1];

    this.GAtogether = false;

    this.shock = 0;
    this.slowdown = false;
    this.slowdown_time = 0;
    this.slowdown_countdown = 0;

    this.status = 0;
    this.switchable = false;
    this.attached = false;

    this.healing = 0;
    this.healRange = 0;
    this.totalHeal = 0;
    this.inspiring = 0;
    this.inspireRange = 0;
    this.armorEnhance = 0;
    this.attackEnhance = 0;
    this.enhanceRange = 0;

    this.cost_bias = 0;
    this.leadership_bias = 0;

    // Load real-time properties for battle
    this.loadRealtimeProps = function (showCostDetails = false) {
      this.img = document.getElementById(`${this.constructor.name}_img`);
      this.img1 = document.getElementById(`${this.constructor.name}_img`);
      this.img2 = null;
      if (this.switchable || this.attached)
        this.img2 = document.getElementById(`${this.constructor.name}_1_img`);

      this.G_A = this.type[0];
      this.B_M = this.type[1];
      this.L_H = this.type[2];
      this.size = this.type[3];

      this.description = `${ground_air[this.G_A]}-${bio_mech[this.B_M]}-${
        light_heavy[this.L_H]
      }-${size_info[this.size]}`;
      if (this.extra.length > 0) this.description += `|${this.extra}`;
      this.m_description = `${m_ground_air[this.G_A]}-${m_bio_mech[this.B_M]}-${
        m_light_heavy[this.L_H]
      }-${m_size_info[this.size]}`;
      if (this.m_extra.length > 0) this.m_description += `|${this.m_extra}`;

      this.c_shield = this.shield;
      this.c_shield_armor = this.shield_armor;

      this.c_scale = this.scale;
      this.c_singleHP = this.singleHP;
      this.wound = this.singleHP;
      this.c_speed = this.speed;

      this.armor = this.defence_data[0];
      this.dodge = this.defence_data[1];

      this.c_armor = this.armor;
      this.c_dodge = this.dodge;

      this.melee = this.melee_data[0];
      this.melee_bonus = this.melee_data[1];
      this.c_melee = this.melee;

      this.missile_G = this.G_data[0];
      this.missile_G_bonus = this.G_data[1];
      this.range_G = this.G_data[2];
      this.ammo_G = this.G_data[3];

      this.missile_A = this.A_data[0];
      this.missile_A_bonus = this.A_data[1];
      this.range_A = this.A_data[2];
      this.ammo_A = this.A_data[3];

      this.c_missile_G = this.missile_G;
      this.c_ammo_G = this.ammo_G;

      if (this.GAtogether) {
        this.missile_A = this.missile_G;
        this.missile_A_bonus = this.missile_G_bonus;
        this.range_A = this.range_G;
        this.ammo_A = this.ammo_G;
      }

      this.c_missile_A = this.missile_A;
      this.c_ammo_A = this.ammo_A;

      // this.c_totalHeal = this.totalHeal;

      // Calculate the cost according to the battle properties
      let costResults = calculateCost(this, showCostDetails);
      this.cost = costResults[0];

      // Calculate the leadership according to the battle properties
      this.leadership =
        calculateLeaderShip(this, costResults) + this.leadership_bias;
      this.c_leadership = this.leadership;
    };
  }

  // =============== Private methods ===============

  _getSingleDamage(damageType, targetArm) {
    if (!this.isAlive) return 0;

    let singleDamage = 0;
    if (damageType === "melee") {
      singleDamage = this.c_melee;
    } else if (damageType === "missile") {
      if (targetArm.G_A === 0 && this.c_ammo_G > 0) {
        this.c_ammo_G--;
        if (this.GAtogether) this.c_ammo_A--;

        singleDamage = this.c_missile_G;
      } else if (targetArm.G_A === 1 && this.c_ammo_A > 0) {
        this.c_ammo_A--;
        if (this.GAtogether) this.c_ammo_G--;

        singleDamage = this.c_missile_A;
      }
    }

    return singleDamage;
  }

  _getDamagePercentage() {
    let enh = 0;
    let armor = this.armor;
    let dodge = this.dodge;
    if (this.speed >= 4) dodge += (this.speed - 3) * 10;
    let realDodge = 0;
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random() * 100) + 1;
      if (rand <= dodge) realDodge += 12;
    }

    // enh = afterArmorEnhancement(this, this.player.pieceList);
    let percentage = (100 - (armor + realDodge + enh)) / 100;
    if (percentage < 0.12) percentage = 0.12;
    return percentage;
  }

  _beginSwitch(canAttackAfterSwitching) {
    this.hasAttacked = !canAttackAfterSwitching;
    if (!canAttackAfterSwitching) this.operable = false;
    this.alignMoved = true;
  }

  _endSwitch(switchWeapon) {
    let hp_record = [this.c_singleHP, this.c_scale, this.wound];
    let ld_record = [this.leadership, this.c_leadership];
    let sd_record = [this.shield, this.c_shield];
    if (this.status === 1) {
      this.name = this.name2;
      this.m_name = this.m_name2;
      this.ammo_record[0] = [this.c_ammo_G, this.c_ammo_A];

      this.loadRealtimeProps();
      this.img = this.img2;
      if (!switchWeapon) {
        this.c_ammo_G = this.ammo_record[0][0];
        this.c_ammo_A = this.ammo_record[0][1];
      } else {
        this.c_ammo_G = this.ammo_record[1][0];
        this.c_ammo_A = this.ammo_record[1][1];
      }
    } else {
      this.name = this.name1;
      this.m_name = this.m_name1;
      if (!switchWeapon) this.ammo_record[0] = [this.c_ammo_G, this.c_ammo_A];
      else this.ammo_record[1] = [this.c_ammo_G, this.c_ammo_A];

      this.loadRealtimeProps();
      this.img = this.img1;

      this.c_ammo_G = this.ammo_record[0][0];
      this.c_ammo_A = this.ammo_record[0][1];
    }
    this.c_singleHP = hp_record[0];
    this.c_scale = hp_record[1];
    this.wound = hp_record[2];
    this.leadership = ld_record[0];
    this.c_leadership = ld_record[1];
    this.shield = sd_record[0];
    this.c_shield = sd_record[1];
    updateRealTimeProperties(this);
    this.c_speed = 0;
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
      if (!this.isAttacked) {
        this.c_shield += Math.round(this.shield / 7.5);
        this.c_shield = Math.min(this.c_shield, this.shield);
      }
    } else {
      this.isAttacked = false;
    }
    if (!healed && this.healing > 0) {
      this.c_totalHeal += Math.round(this.healing / 3);
      if (this.c_totalHeal > this.totalHeal) this.c_totalHeal = this.totalHeal;
    }

    this.operable = true;
    this.alignMoved = false;
    this.hasAttacked = false;
    this.showSpeed = false;

    if (this.getTotalHP() < this.getOriginalHP() / 10) this.c_leadership -= 20;

    if (this.c_leadership < 0) this.c_leadership = 0;

    // Update real-time battle properties
    updateRealTimeProperties(this);
    if (this.c_leadership <= 0) {
      this.hasAttacked = true;
      this.optOut();
    }

    if (!endMyRound) {
      if (this.slowdown_countdown > 0) this.slowdown_countdown--;
      if (this.slowdown_countdown > 0) {
        this.c_speed = Math.floor(this.speed / 2);
      } else {
        this.c_speed = this.speed;
      }
    }
  }

  getTotalHP() {
    if (this.scale === 1) return this.c_singleHP;
    return this.c_singleHP * (this.c_scale - 1) + this.wound;
  }

  getOriginalHP() {
    return this.singleHP * this.scale;
  }

  switch() {}

  getRawTotalDamage(damageType, targetArm) {
    let singleDamage = this._getSingleDamage(damageType, targetArm);
    let output = singleDamage * this.c_scale;
    if (damageType === "melee") output /= 3;
    let enh = 0;
    // enh = afterAttackEnhancement(this, this.player.pieceList);
    output = Math.round((output * (100 + enh)) / 100);

    return output;
  }

  getCounterAttack(damageType, targetArm) {
    if (damageType !== "melee" || this.c_leadership <= 0) return 0;

    let singleDamage = this._getSingleDamage("melee", targetArm);
    return Math.round(singleDamage * this.c_scale);
  }

  decrease(attacker, damageType, rawTotalDamage) {
    if (this.c_shield > 0) return this.decreaseShield(rawTotalDamage);
    return this.decreaseScale(attacker, damageType, rawTotalDamage);
  }

  decreaseShield(rawTotalDamage) {
    let dodge = this.dodge;
    if (this.speed >= 4) dodge += (this.speed - 3) * 10;
    let realDodge = 0;
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random() * 100) + 1;
      if (rand <= dodge) realDodge += 10;
    }
    let damagePercentage = (100 - this.shield_armor - dodge) / 100;
    if (damagePercentage < 0.1) damagePercentage = 0.1;
    let realDamage = Math.ceil(rawTotalDamage * damagePercentage);

    // console.log(this.name, damagePercentage, realDamage);

    this.c_shield -= realDamage;
    if (this.c_shield < 0) this.c_shield = 0;
    return 0;
  }

  decreaseScale(attacker, damageType, rawTotalDamage) {
    // console.log(this.name, "rawTotalDamage", rawTotalDamage);

    let damagePercentage = this._getDamagePercentage(attacker, damageType);
    let realDamage = Math.ceil(rawTotalDamage * damagePercentage);

    // console.log(this.name, "realDamage", realDamage);

    // If this arm is a single-unit
    if (this.scale === 1) {
      if (realDamage > 0) {
        realDamage = Math.max(realDamage, 1);
        // let enh = afterArmorEnhancement(this, this.player.pieceList);
        // if (enh > 0) addArmorEnhanceEffect(this);
      }

      this.c_singleHP -= realDamage;
      if (this.c_singleHP <= 0) this.isAlive = false;

      return realDamage;
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
        // let enh = afterArmorEnhancement(this, this.player.pieceList);
        // if (enh > 0) addArmorEnhanceEffect(this);
      } else if (realDamage > 0) {
        this.wound -= realDamage;
      }

      this.c_scale -= totalDecrease;
      if (this.c_scale <= 0) this.isAlive = false;

      return totalDecrease;
    }
  }

  getShockingAbility() {
    return Math.round((this.shock * this.c_scale) / this.scale);
  }

  getCurrentCombatPower() {
    let percentage = 1;
    percentage =
      (this.c_singleHP * this.c_scale + this.c_shield) /
      (this.singleHP * this.scale + this.shield);

    let leadershipDrop =
      ((this.leadership - this.c_leadership) / this.leadership) * 0.5;
    percentage -= leadershipDrop;

    return this.cost * percentage;
  }
}
