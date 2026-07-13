import { Canvas } from "../common/tools.js";
import {
  dodgePercent,
  getCombatPower,
  calculateCost,
  calculateLeaderShip,
  upgradeLevel,
  updateStaticProperties,
  generateFormation,
  reformPhalanx,
  calculateAngleInDegree,
  getStepDirectionByAngle,
  fatigueTakesEffect,
  moraleTakesEffect,
  getProjectileLandingPoints,
  getHitPositionsForOneTarget,
} from "./armTools.js";
import { triggerAutoAttack } from "../actions/autoAttack.js";
import { triggerHealing } from "../actions/heal.js";
import { triggerInspiring } from "../actions/inspire.js";
import {
  afterArmorEnhancement,
  afterAttackEnhancement,
  addArmorEnhanceEffect,
  addAttackEnhanceEffect,
} from "../actions/enhance.js";
import { calculateDistance, adjacentUpAndDown, adjacentLeftAndRight } from "../actions/actionTools.js";

export const DamageTypes = ["melee", "missile", "charge", "bombing", "magic"];
export const ArmTypes = ["infantry", "archers", "cavalry", "monster-infantry", "monster", "artillery"];
export const ArmTypeToTall = {
  infantry: 3,
  archers: 3,
  cavalry: 6,
  "monster-infantry": 6,
  monster: 16,
  artillery: 3,
};
export const ArmTypeToStamina = {
  infantry: 450,
  archers: 300,
  cavalry: 500,
  "monster-infantry": 450,
  monster: 600,
  artillery: 300,
};

export class Arm {
  constructor(positionValue, _player) {
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
    this.hasCountered = false;
    this.operable = true;
    this.prepareToAuto = false;
    this.missileColor = null;
    this.missileWeight = 2;
    this.missileNumber = null;
    this.alignMoved = false;
    this.inMeleeWith = new Set();
    this.preAct = null;
    this.autofireEnable = true;
    this.preMissileTarget = null;

    this.name = "";
    this.m_name = "";
    this.type = "";
    this.description = "";
    this.m_description = "";
    this.traits = [];
    this.artilleryAttack = false;
    this.cost = 0;
    this.currentCombatPower = 0;

    this.exp = 0;
    this.level = 1;
    this.pre_level = 1;

    this.scale = 0;
    this.singleHP = 0;
    this.wound = 0;
    this.leadership = 0;
    this.c_leadership = 0;
    this.speed = 0;
    this.tall = 0;

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
    this.explosionRadius = 0;
    this.isBombing = false;
    this.isParabola = false;
    this.isGuided = false;
    this.missileFocusGroupSize = null;
    this.missilePenetrate = null;
    this.marksmanSkill = false;
    this.multiShots = null;
    this.missileParameters = null;
    this.currentScatteringLevel = 0;

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

    this.killCount = 0;
    this.damageOutput = 0;
    this.statusList = new Set([]);
    this.poisonTime = 0;
    this.currentFatigue = 0;
    this.totalStamina = 0;

    this.formation = null;
    this.unitOperatorMap = null;
    this.gunPositions = null;
  }

  // =============== Load real-time properties ===============

  loadRealtimeProps() {
    this.img = document.getElementById(`${this.constructor.name}_img`);

    if (this.tall === 0) this.tall = ArmTypeToTall[this.type];

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

    this.c_meleeAttack_bonus = this.meleeAttack_bonus;
    this.c_missileAttack_bonus = this.missileAttack_bonus;
    this.c_chargeAttack_bonus = this.chargeAttack_bonus;

    this.c_missileAttack = this.missileAttack;
    this.c_missileRange = this.missileRange;

    if (this.isBombing) this.isParabola = true;

    // Calculate the ammo, if not given above
    if (this.type === "archers" && this.ammo === -1) {
      this.ammo = 18;
    } else if (this.type === "cavalry" && this.missileAttack != 0 && this.ammo === -1) {
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
    this.currentCombatPower = getCombatPower(this, false)[0];

    // Calculate the leadership according to the battle properties
    this.leadership = calculateLeaderShip(this, costResults);
    this.c_leadership = this.leadership;

    this.totalStamina = ArmTypeToStamina[this.type];

    // Generate formation
    let formation, unitOperatorMap;
    [this.formation, this.unitOperatorMap] = generateFormation(this);
    if (this.type === "artillery") {
      this.gunPositions = new Set();
      for (let y = 0; y < this.formation.length; y++) {
        for (let x = 0; x < this.formation[0].length; x++) {
          if (this.formation[y][x] > 0) {
            this.gunPositions.add(`${y},${x}`);
          }
        }
      }
    }
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
  }

  // =============== Battle APIs ===============

  getValidScale(damageType) {
    let perc = 1;
    if (damageType == "melee") {
      if (this.isInfn()) {
        perc = 0.5;
      } else if (this.type === "cavalry" || this.type === "monster-infantry") {
        perc = 0.75;
      }
    } else {
      perc = 1;
    }

    let scale = Math.min(this.c_scale, Math.ceil(this.scale * perc));

    return scale;
    // return 3;
  }

  getSingleDamage(damageType, targetArm) {
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

      case "charge":
        singleDamage = this.c_chargeAttack;
        break;

      default:
        break;
    }

    return singleDamage;
  }

  isDamageMagic(damageType) {
    return false;
  }

  getDamagePercentage(attacker, damageType, antiArmor) {
    let armor = 0;
    let dodge = 0;
    let enh = afterArmorEnhancement(this, this.player.pieceList);
    if (enh > 0) addArmorEnhanceEffect(this);

    armor -= antiArmor;
    switch (damageType) {
      case "melee":
        dodge += this.c_meleeDodge;
        if (!this.isMon() && attacker.isLarge()) armor += this.c_meleeArmor + this.c_chargeArmor / 2;
        else armor += this.c_meleeArmor + this.c_missileArmor / 7;
        break;

      case "missile":
        if (attacker.canArtilleryAttack()) break;
        armor += this.c_missileArmor + this.c_meleeArmor / 7;
        dodge += this.c_missileDodge;
        break;

      case "charge":
        armor += this.c_chargeArmor + (this.c_meleeArmor + this.c_missileArmor) / 7;
        dodge += this.c_chargeDodge;
        break;

      default:
        break;
    }
    armor = Math.max(armor, -5);
    if (attacker.isDamageMagic(damageType)) armor = 0;

    dodge = Math.max(dodge, -15);
    dodge = dodgePercent(dodge);
    let percentage = (100 - (armor + dodge + enh)) / 100;
    if (percentage < 0.12) percentage = 0.12;
    // console.log(this.m_name + "\n" + "armor", armor, "dodge", dodge, "percentage", percentage);

    return percentage;
  }

  replaceMoraleStatusForInstability(statusCodeName) {
    if (this.hasInstability()) {
      switch (statusCodeName) {
        case "LM": {
          statusCodeName = "CR";
          break;
        }
        case "IR": {
          statusCodeName = "DI";
          break;
        }
        default: {
          break;
        }
      }
    }
    return statusCodeName;
  }

  addStatus(statusCodeName) {
    statusCodeName = this.replaceMoraleStatusForInstability(statusCodeName);
    this.statusList.add(statusCodeName);
  }

  removeStatus(statusCodeName) {
    statusCodeName = this.replaceMoraleStatusForInstability(statusCodeName);
    this.statusList.delete(statusCodeName);
  }

  comradePiecesAffectMorale() {
    for (let i = 0; i < this.player.pieceList.length; i++) {
      let piece = this.player.pieceList[i];
      if (!piece.isAlive || piece == this) continue;

      let distance = calculateDistance(this.positionX, this.positionY, piece.positionX, piece.positionY);
      let costRatio = piece.cost / this.cost;

      // Decrease morale when comrade pieces nearby are in rout
      if (this.c_leadership > 0 && !this.isHighMorale()) {
        if (piece.c_leadership <= 0 && distance <= 4) {
          this.c_leadership -= Math.round(5 * costRatio);
        }
      }

      // Recover morale when comrade pieces nearby are not in rout
      if (piece.c_leadership > 0 && distance <= 2) {
        this.c_leadership += Math.round(5 * costRatio);
      }
    }
  }

  surroundingEnemiesAffectMorale() {
    let upAndDowns = [];
    let leftAndRights = [];
    for (let i = 0; i < this.player.enemyList.length; i++) {
      let enemy = this.player.enemyList[i];
      if (adjacentUpAndDown(this, enemy)) upAndDowns.push(enemy);
      if (adjacentLeftAndRight(this, enemy)) leftAndRights.push(enemy);
    }

    let len1 = upAndDowns.length;
    let len2 = leftAndRights.length;

    // Update status
    this.removeStatus("FL");
    this.removeStatus("PA");
    this.removeStatus("SR");
    if (len1 == 1 && len2 == 1) {
      this.addStatus("FL");
      if (!this.isHighMorale()) this.c_leadership -= 5;
    } else if (len1 * len2 == 0 && len1 + len2 == 2) {
      this.addStatus("PA");
      if (!this.isHighMorale()) this.c_leadership -= 10;
    } else if (len1 * len2 >= 2) {
      this.addStatus("SR");
      if (!this.isHighMorale()) this.c_leadership -= 15;
    }
  }

  bePoisoned() {
    this.poisonTime = 3;
    this.currentFatigue += 40;
    this.addStatus("PS");
  }

  updateCurrentFatigue(fatigueType, amount) {
    let accumulated = 0;
    switch (fatigueType) {
      case "melee":
        accumulated += amount * 20;
        accumulated -= this.c_meleeDodge / 8;
        accumulated += (this.c_meleeArmor + this.c_missileArmor) / 8;
        break;
      case "missile":
        accumulated += amount * 5;
        break;
      case "charge":
        accumulated += amount * 20;
        accumulated += (this.c_meleeArmor + this.c_missileArmor + this.c_chargeArmor + this.c_missileDodge) / 8;
        break;
      case "move":
        accumulated += Math.ceil((amount * 15) / this.speed);
        accumulated += (this.c_meleeArmor + this.c_missileArmor + this.c_chargeArmor + this.c_missileDodge) / 8;
        break;
    }

    accumulated = Math.round(accumulated);

    this.currentFatigue += accumulated;
    this.currentFatigue = Math.min(this.currentFatigue, this.totalStamina);
  }

  optOut() {
    this.operable = false;
  }

  roundRefresh(currentRound, endMyRound) {
    let healed = false;

    if (endMyRound) {
      if (this.isInMelee() || this.c_speed == this.speed) this.preAct = null;
      if (this.preMissileTarget && !this.preMissileTarget.isAlive) this.preMissileTarget = null;

      triggerAutoAttack(this, this.player.enemyList);

      healed = triggerHealing(this, this.player.pieceList);
      triggerInspiring(this, this.player.pieceList);

      this.removeStatus("UC");
      this.removeStatus("UB");
      this.removeStatus("HR");
      this.removeStatus("FS");

      this.poisonTime--;
      if (this.poisonTime <= 0) this.removeStatus("PS");

      // Recover from fatigue at the end of round
      if (this.preAct == null && !this.hasAttacked && !this.hasCountered && this.poisonTime <= 0) {
        this.currentFatigue = Math.max(0, this.currentFatigue - 20);
      }
    }

    if (!healed) {
      this.c_totalHeal += Math.round(this.healing / 2);
      if (this.c_totalHeal > this.totalHeal) this.c_totalHeal = this.totalHeal;
    }

    this.operable = true;
    this.c_speed = this.speed;
    this.alignMoved = false;
    this.hasAttacked = false;
    this.hasCountered = false;
    this.showSpeed = false;

    // Speed punishment for detaching from melee
    for (let enemy of this.inMeleeWith) {
      if (!enemy.isAlive) {
        this.inMeleeWith.delete(enemy);
      }
    }
    if (!this.isInMelee()) {
      this.removeStatus("IM");
      this.removeStatus("HP");
    }
    if (!this.isMeleeMaster() && this.isInMelee()) {
      if (this.isInfn()) {
        this.c_speed -= 1;
      } else if (this.isCavalry()) {
        let hasResistingCharge = false;
        for (let enemy of this.inMeleeWith) {
          if (enemy.isResistingCharge()) {
            hasResistingCharge = true;
            break;
          }
        }
        if (hasResistingCharge) {
          this.c_speed -= Math.floor(this.speed / 2);
        } else {
          this.c_speed -= 1;
        }
      } else if (this.type === "monster-infantry") {
        let hasResistingCharge = false;
        for (let enemy of this.inMeleeWith) {
          if (enemy.isResistingCharge()) {
            hasResistingCharge = true;
            break;
          }
        }
        if (hasResistingCharge) {
          this.c_speed -= 1;
        }
      }
    }

    // Accumulating fatigue when turn count is high
    let roundThreshold = 20;
    if (currentRound >= roundThreshold) {
      this.currentFatigue += currentRound - roundThreshold;
    }
    if (this.poisonTime > 0) this.currentFatigue += 40;
    this.currentFatigue = Math.min(this.currentFatigue, this.totalStamina);

    // Update static battle properties
    upgradeLevel(this);
    updateStaticProperties(this);

    // Comrade pieces affect morale
    this.comradePiecesAffectMorale();
    // Surrounding enemy pieces affect morale
    this.surroundingEnemiesAffectMorale();

    // Default morale recovery
    if (this.c_leadership <= this.leadership * 0.1) {
      this.c_leadership += 5;
    }

    // Set lower bound for morale
    if (this.c_leadership <= 0) {
      if (this.c_leadership < -50) this.c_leadership = -50;

      if (!this.hasInstability()) {
        this.hasAttacked = true;
        this.hasCountered = true;
        this.optOut();
      }
    }

    // Set upper bound for morale
    if (this.c_leadership > this.leadership) {
      this.c_leadership = this.leadership;
    }

    // Fatigue affect battle ability
    fatigueTakesEffect(this);

    // Morale affect battle ability
    moraleTakesEffect(this);
    this.instabilityVanish();

    // Update current combat power
    this.currentCombatPower = getCombatPower(this, true)[0];
  }

  getTotalHP() {
    if (this.scale === 1) return this.c_singleHP;
    let total = 0;
    for (let y = 0; y < this.formation.length; y++) {
      for (let x = 0; x < this.formation[0].length; x++) {
        total += this.formation[y][x];
      }
    }
    return total;
  }

  getOriginalHP() {
    let oHP = this.singleHP * this.scale * (this.type === "artillery" ? 4 : 1);
    return oHP;
  }

  getCurrentScale() {
    let scale = 0;
    if (this.type === "artillery") {
      for (let y = 0; y < this.formation.length; y++) {
        for (let x = 0; x < this.formation[0].length; x++) {
          if (this.formation[y][x] > 0) {
            scale++;
          }
        }
      }
      return scale;
    }
    return this.c_scale;
  }

  getOriginalScale() {
    if (this.type === "artillery") {
      return this.scale * 4;
    }
    return this.scale;
  }

  getAntiArmor(damageType, targetArm) {
    return 0;
  }

  getScatteringLevel(targetArm) {
    let scatteringLevel = 0;

    // Scattering increases when:
    //    1. the target is far away, unless the attacker has marksman skill
    if (this.c_missileRange >= 5) {
      let distance = calculateDistance(this.positionX, this.positionY, targetArm.positionX, targetArm.positionY);
      if (distance >= this.c_missileRange * 0.75 && !this.marksmanSkill) scatteringLevel++;
      if (this.c_missileRange - distance < 1 && !this.marksmanSkill) scatteringLevel++;
    }
    //    2. the target is moving, unless the attacker has marksman skill
    if (targetArm.isMoving() && !this.marksmanSkill) {
      scatteringLevel++;
      if (targetArm.isAgile()) scatteringLevel++;
    }
    //    3. the target is stealth, unless the attacker has marksman skill
    if (targetArm.isStealth() && !this.marksmanSkill) scatteringLevel++;
    //    4. the target is small single unit, unless the attacker has marksman skill
    if (targetArm.scale == 1 && !this.marksmanSkill)
      scatteringLevel += Math.floor((8 - Math.ceil(Math.pow(targetArm.tall, 0.75))) / 2);
    //    5. the attacker is bombing
    if (this.isBombing) scatteringLevel++;
    //    6. the attacker has suboptimal accuracy
    if (this.hasSuboptimalAccuracy()) scatteringLevel += 2;
    //    7. the attacker is Exhausted
    if (this.statusList.has("FT3")) scatteringLevel++;

    return scatteringLevel;
  }

  getAttackInfo(damageType, targetArm) {
    let singleDamage = this.getSingleDamage(damageType, targetArm);
    let enh = afterAttackEnhancement(this, this.player.pieceList);
    if (enh > 0) addAttackEnhanceEffect(this);
    singleDamage *= (100 + enh) / 100;
    let validScale = this.getValidScale(damageType);

    let penetrate = 0;
    let explosionRadius = 0;
    let includeEmpty = false;
    let scatteringLevel = 0;
    let focusFireOnNum = null;

    // ============================== Set validScale, scatteringLevel, focusFireOnNum ==============================
    switch (damageType) {
      case "melee": {
        // // Melee between infantry
        if (this.isInfn && targetArm.isInfn()) {
          validScale = Math.min(validScale, Math.round(targetArm.getCurrentScale() * 1.25));
        }

        // Infantry deal with large units
        if (this.isInfn()) {
          // Infantry can gang up on medium units.
          if (targetArm.isMid()) {
            let groupSize = this.isResistingCharge() ? 7 : 4;
            focusFireOnNum = Math.ceil(validScale / groupSize);
          }
          // Infantry has less effective scale
          else if (targetArm.scale === 1) {
            validScale = Math.round(validScale / 2);
          }
        }

        // Monster makes melee damage
        else if (this.scale === 1) {
          validScale = 4;
          singleDamage /= validScale;
        }

        break;
      }

      case "charge": {
        // Monster makes charge damage
        if (this.scale === 1) {
          validScale = 2;
          singleDamage /= validScale;
        }

        break;
      }

      case "missile": {
        // Units with markman skill do not miss
        includeEmpty = !this.marksmanSkill;

        // Calculate scatteringLevel
        scatteringLevel += this.getScatteringLevel(targetArm);
        this.currentScatteringLevel = scatteringLevel;

        // Focus fire on fewer medium-sized targets when the attacker has missile focus ability and marksman skill
        if (this.marksmanSkill && this.missileFocusGroupSize != null && targetArm.isMid()) {
          focusFireOnNum = Math.ceil(validScale / this.missileFocusGroupSize);
        }

        // Multiple shots
        if (this.multiShots != null) {
          if (this.scale === 1) {
            validScale = this.multiShots;
            singleDamage /= validScale;
          } else {
            validScale *= this.multiShots;
            singleDamage /= this.multiShots;
          }
        }

        break;
      }

      default: {
        break;
      }
    }

    // ============================== Get projectile landing points ==============================
    let landingPointsInfoList = getProjectileLandingPoints(
      this,
      targetArm,
      validScale,
      scatteringLevel,
      includeEmpty,
      focusFireOnNum,
    );

    const initialSingleDamage = singleDamage;
    // ============================== Deal with each affected targets ==============================
    let angle = calculateAngleInDegree(this.positionX, this.positionY, targetArm.positionX, targetArm.positionY);
    let output = [];
    for (let i = 0; i < landingPointsInfoList.length; i++) {
      let [target, landingPoints] = landingPointsInfoList[i];
      targetArm = target;

      // Set singleDamage, penetrate, explosionRadius, angle
      switch (damageType) {
        case "melee": {
          // Melee between infantry
          if (this.isInfn && targetArm.isInfn()) {
            if (this.explosionRadius != null && this.explosionRadius > 0) explosionRadius = this.explosionRadius;
          }

          // Medium-sized units deal area damage to non-resisting-charge infantry
          if (this.isMid() && targetArm.isInfn()) {
            penetrate = 3;
            singleDamage /= penetrate;
            if (targetArm.isResistingCharge()) {
              penetrate = 1;
            }
          }

          // Monster makes melee damage
          else if (this.scale === 1) {
            // Monster deal with infantry
            if (targetArm.isInfn()) {
              explosionRadius = 2;
              singleDamage /= explosionRadius + 2;
              if (targetArm.isResistingCharge()) {
                explosionRadius = 1;
              }
            }
            // Monster deal with medium-size
            else if (targetArm.isMid()) {
              explosionRadius = 1;
              singleDamage /= explosionRadius + 2;
            }
          }
          break;
        }

        case "charge": {
          // Stationed units take less charge damage
          if (!targetArm.isMoving()) singleDamage *= 0.7;
          // Units resisting charge take less charge damage
          if (targetArm.isResistingCharge()) singleDamage *= 0.5;

          // Medium-sized units' charge damage can penetrate at most 3 infantry units
          if (this.isMid() && targetArm.isInfn() && !targetArm.isResistingCharge()) {
            if (this.description.includes("Vehicle")) {
              penetrate = 4;
              singleDamage /= 2;
            } else if (!targetArm.isResistingCharge()) {
              penetrate = 3;
              singleDamage /= penetrate;
            }
          }

          // Monster makes charge damage
          else if (this.scale === 1) {
            // Monster deal with infantry
            if (targetArm.isInfn()) explosionRadius = 2;
            // Monster deal with medium-size
            else if (targetArm.isMid()) explosionRadius = 1;
            singleDamage /= explosionRadius + 1;
          }

          break;
        }

        case "missile": {
          // Penetrating attacks
          if (this.missilePenetrate != null) {
            // Infantry take full penetrate effect
            if (targetArm.isInfn()) {
              penetrate = this.missilePenetrate;
            }
            // Medium-sized units take half penetrate effect
            else if (targetArm.isMid()) {
              penetrate = Math.floor(this.missilePenetrate / 2);
            }
            // No penerate effect for single unit
            else {
              penetrate = 1;
            }
            singleDamage /= penetrate;

            if (targetArm.isHoldingShield()) penetrate -= 1;
            penetrate = Math.max(penetrate, 0);
          }

          // Explosive attacks
          else if (this.explosionRadius != null && this.explosionRadius > 0) {
            explosionRadius = this.explosionRadius;
            if (targetArm.isHoldingShield()) explosionRadius -= 1;
            singleDamage /= explosionRadius + 1;
            if (targetArm.isMid()) explosionRadius -= 1;
            if (targetArm.scale === 1) explosionRadius -= 2;
            explosionRadius = Math.max(explosionRadius, 0);
          }

          break;
        }

        default: {
          break;
        }
      }

      // Calculate hit positions and damages
      let [damages, hitPositions] = getHitPositionsForOneTarget(
        landingPoints,
        angle,
        targetArm.formation,
        singleDamage,
        penetrate,
        explosionRadius,
      );

      output.push([targetArm, damages, hitPositions]);

      // Prevent setting singleDamage repeatedly
      singleDamage = initialSingleDamage;
    }

    return output;
  }

  formationInBound(x, y) {
    return x >= 0 && x < this.formation[0].length && y >= 0 && y < this.formation.length;
  }

  reform() {
    if (
      this.isSparse() ||
      this.type === "artillery" ||
      this.scale <= 1 ||
      this.c_scale == this.formation.length * this.formation[0].length
    )
      return;
    this.formation = reformPhalanx(this);
  }

  instabilityVanish() {
    const percent = this.c_leadership / this.leadership;
    if (this.hasInstability() && percent <= 0.2) {
      let factor = 0;
      if (this.statusList.has("CR")) factor = 1;
      else if (this.statusList.has("DI")) factor = 2;

      // Decrease single HP for phalanx
      if (this.scale > 1) {
        let damage = 3 * factor;
        for (let y = 0; y < this.formation.length; y++) {
          for (let x = 0; x < this.formation[0].length; x++) {
            if (this.formation[y][x] <= damage) {
              this.formation[y][x] = 0;
            } else {
              this.formation[y][x] -= damage;
            }
          }
        }
        if (this.getTotalHP() == 0) this.isAlive = false;
      }

      // Decrease single HP for single unit
      else {
        let damage = 100 * factor;
        this.c_singleHP -= damage;
        if (this.c_singleHP <= 0) this.isAlive = false;
      }
    }
  }

  decreaseScale(attacker, damageType, antiArmor, damages, hitPositions) {
    if (damages == null || damages == []) return [(0, 0, 0)];

    let damagePercentage = this.getDamagePercentage(attacker, damageType, antiArmor);
    let decreaseScore = 0;
    let totalDecrease = 0;
    let totalDamage = 0;

    // Decrease scale for artillery
    if (this.type === "artillery") {
      for (let i = 0; i < hitPositions.length; i++) {
        let [x, y] = hitPositions[i];
        let damage = Math.ceil(damages[i] * damagePercentage);
        if (this.formationInBound(x, y) && this.formation[y][x] > 0) {
          if (this.formation[y][x] <= damage) {
            totalDecrease++;
            totalDamage += this.formation[y][x];
            this.formation[y][x] = 0;

            let unitIndex = this.unitOperatorMap.O2U[[y, x]];
            this.unitOperatorMap.U2O[unitIndex] = this.unitOperatorMap.U2O[unitIndex].filter(
              (sub) => !(sub[0] === y && sub[1] === x),
            );
            if (this.unitOperatorMap.U2O[unitIndex].length == 0) {
              this.c_scale--;
            }
          } else {
            totalDamage += damage;
            this.formation[y][x] -= damage;
          }
        }
      }
      if (this.c_scale <= 0) this.isAlive = false;
    }

    // Decrease scale for phalanx
    else if (this.scale > 1) {
      for (let i = 0; i < hitPositions.length; i++) {
        let [x, y] = hitPositions[i];
        let damage = Math.ceil(damages[i] * damagePercentage);
        if (this.formationInBound(x, y) && this.formation[y][x] > 0) {
          if (this.formation[y][x] <= damage) {
            totalDecrease++;
            totalDamage += this.formation[y][x];
            this.formation[y][x] = 0;
          } else {
            totalDamage += damage;
            this.formation[y][x] -= damage;
          }
        }
      }
      this.c_scale -= totalDecrease;
      if (this.c_scale <= 0) this.isAlive = false;
    }

    // Decrease hp for single unit
    else {
      for (let i = 0; i < hitPositions.length; i++) {
        let [x, y] = hitPositions[i];
        let damage = Math.ceil(damages[i] * damagePercentage);
        if (this.formationInBound(x, y) && this.formation[y][x] > 0) {
          totalDamage += damage;
        }
      }
      if (totalDamage >= this.c_singleHP) {
        totalDecrease++;
        this.c_scale = 0;
        this.isAlive = false;
      } else {
        this.c_singleHP -= totalDamage;
        for (let i = 0; i < this.formation.length; i++) {
          for (let j = 0; j < this.formation[i].length; j++) {
            if (this.formation[i][j] > 0) {
              this.formation[i][j] -= totalDamage;
            }
          }
        }
      }
    }

    decreaseScore = Math.round(totalDamage / 30);
    return [totalDamage, decreaseScore, totalDecrease];
  }

  getShockingAbility() {
    return Math.round((this.shock * this.c_scale) / this.scale);
  }

  isMon() {
    return this.type === "monster" || this.type === "monster-infantry";
  }

  isCavalry() {
    return this.type === "cavalry";
  }

  isMid() {
    return (this.type === "monster-infantry" || this.type === "cavalry") && this.tall >= 4;
  }

  isLarge() {
    return (this.isCavalry() || this.isMon()) && this.tall >= 6;
  }

  isInfn() {
    return this.type === "infantry" || this.type === "archers" || this.type === "artillery";
  }

  isMoving() {
    return this.preAct && this.preAct.startsWith("mov ");
  }

  isResistingCharge() {
    return this.description.includes("Resist charging");
  }

  isHoldingShield() {
    return this.description.includes("Holding shields");
  }

  isMeleeMaster() {
    return this.description.includes("Melee master");
  }

  isAgile() {
    return this.description.includes("Agile");
  }

  isSparse() {
    return this.description.includes("Sparse formation") || this.type === "artillery";
  }

  isHighMorale() {
    return this.description.includes("High morale");
  }

  isStealth() {
    return this.description.includes("Stealth");
  }

  hasSuboptimalAccuracy() {
    return this.description.includes("Suboptimal accuracy");
  }

  hasInstability() {
    return this.description.includes("Instability");
  }

  canDoNecromancy(target) {
    return this.description.includes("Necromancy") && target.hasInstability();
  }

  canShock() {
    return this.description.includes("Shocking");
  }

  canPoison() {
    return this.description.includes("Poisoned weapon");
  }

  canArtilleryAttack() {
    return this.type === "artillery" || this.artilleryAttack;
  }

  isInMelee() {
    return this.inMeleeWith.size > 0;
  }

  trappedInMelee() {
    return this.statusList.has("IM") || this.statusList.has("HP");
  }

  beingPoisoned() {
    return this.statusList.has("PS");
  }
}
