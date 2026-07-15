import { adjacent, adjacentUpAndDown, adjacentLeftAndRight } from "../actions/actionTools.js";

const probList = [0.47, 0.62, 0.72, 0.78, 0.84, 0.88, 0.91, 0.95, 0.97, 1.0];
const keyAngles = [];
for (let i = 0; i < 8; i++) {
  keyAngles.push(22.5 + i * 45);
}
const types = ["melee", "missile", "charge"];
const attAndDfd = ["Armor", "Dodge", "Attack", "Attack_bonus"];
const strictDeploymentArea = window.localStorage.getItem("strictDeploymentArea") === "true";

export function dodgePercent(dodge) {
  if (!dodge || dodge == 0) {
    return 0;
  }
  if (dodge < 0) {
    return Math.round(dodge / 2);
  }
  // console.log(dodge);
  let rand = Math.random().toFixed(2);
  let idx = 0;
  for (let i = 9; i >= 0; i--) {
    if (rand >= probList[i]) {
      idx = i + 1;
      break;
    }
  }
  let percent = Math.round(dodge + (idx - 2) * 0.1962 * Math.abs(dodge) ** 0.75);
  // console.log(dodge, percent);
  return percent;
}

export function getCombatPower(arm, useCurrent) {
  // HP score
  let hpScore = useCurrent ? arm.getTotalHP() : arm.getOriginalHP();
  hpScore *= 0.005;

  // Moving score
  let movingScore = arm.speed * hpScore * 0.2;

  // Defence score
  let armAndDodgeScore = 0;
  for (let type of types) {
    let armorKey = useCurrent ? `c_${type}Armor` : `${type}Armor`;
    let dodgeKey = useCurrent ? `c_${type}Dodge` : `${type}Dodge`;
    armAndDodgeScore += arm[armorKey] + arm[dodgeKey] * 1.1;
  }
  let defendenceScore = hpScore * armAndDodgeScore * 0.015;
  if (arm.isResistingCharge()) defendenceScore += 8;
  if (arm.isHoldingShield()) defendenceScore += 8;
  if (arm.isSparse()) defendenceScore += 10;
  if (arm.isHighMorale()) defendenceScore += 8;
  if (arm.isStealth()) defendenceScore += 10;

  // Attack and other combat score
  let meleeAttack = useCurrent ? arm.c_meleeAttack : arm.meleeAttack;
  meleeAttack += useCurrent ? arm.c_meleeAttack_bonus * 0.5 : arm.meleeAttack_bonus * 0.5;
  let missileAttack = useCurrent ? arm.c_missileAttack : arm.missileAttack;
  missileAttack += useCurrent ? arm.c_missileAttack_bonus * 0.5 : arm.missileAttack_bonus * 0.5;
  let chargeAttack = useCurrent ? arm.c_chargeAttack : arm.chargeAttack;
  chargeAttack += useCurrent ? arm.c_chargeAttack_bonus * 0.5 : arm.chargeAttack_bonus * 0.5;

  let meleeAttackScore = meleeAttack * arm.getValidScale("melee") * (1 + arm.antiArmor / 45) * 0.05;
  if (arm.isDamageMagic("melee")) meleeAttackScore += 10;

  let missileAttackScore =
    missileAttack *
    arm.getValidScale("missile") *
    Math.max(2, arm.missileRange - 2) *
    arm.ammo *
    // (1 + arm.missilePenetrate / 15 + (arm.explosionRadius + 1) ** 2 / 20) *
    (1 + arm.antiArmor / 45) *
    0.00042;
  missileAttackScore += arm.isParabola ? 15 : 0;
  missileAttackScore += arm.marksmanSkill ? 10 : 0;
  if (arm.isDamageMagic("missile")) missileAttackScore += 10;

  let chargeAttackScore = chargeAttack * arm.getValidScale("charge") * (1 + arm.antiArmor / 45) * 0.025;
  if (arm.isDamageMagic("charge")) chargeAttackScore += 10;

  let shockScore = arm.shock * arm.shock * 0.015;

  let attackScore = meleeAttackScore + missileAttackScore + chargeAttackScore + shockScore;
  if (arm.canPoison()) attackScore += 7;
  if (strictDeploymentArea && arm.hasForwardDeployment()) attackScore += 14;
  if (arm.isMeleeMaster()) attackScore += 5;
  if (arm.isAgile()) attackScore += 8;

  // Type score
  let typeScore = 0;
  let artilleryScore = arm.type === "artillery" ? 50 : 0;
  let monsterScore = arm.type === "monster" ? 60 : 0;
  let monstInfScore = arm.type === "monster-infantry" ? 45 : 0;
  let bombimgScore = arm.isBombing ? 35 : 0;
  typeScore += artilleryScore + monsterScore + monstInfScore + bombimgScore;

  // Healing score
  let healingScore = (arm.healing * arm.getValidScale()) / 10;
  healingScore += (arm.healRange * 10 + arm.totalHeal / 2) / 3;

  // Inspiring score
  let inspiringScore = (arm.inspiring * arm.getValidScale()) / 2 / 10;
  inspiringScore += (arm.inspireRange * 10) / 2;

  // Enhance socre
  let enhanceScore = (arm.armorEnhance + arm.attackEnhance + arm.enhanceRange * 10) / 2;

  let specialScore = healingScore + inspiringScore + enhanceScore;

  // Final result
  let combatPower = hpScore + movingScore + defendenceScore + attackScore + typeScore + specialScore;

  // if (arm.name == "Coast Defenders (Shield)") {
  //   if (true) {
  //     console.log(
  //       arm.name,
  //       "hpScore",
  //       Math.round(hpScore),
  //       "movingScore",
  //       Math.round(movingScore),
  //       "defendenceScore",
  //       Math.round(defendenceScore),
  //       "meleeAttackScore",
  //       Math.round(meleeAttackScore),
  //       "missileAttackScore",
  //       Math.round(missileAttackScore),
  //       "chargeAttackScore",
  //       Math.round(chargeAttackScore),
  //       "shockScore",
  //       Math.round(shockScore),
  //       "typeScore",
  //       Math.round(typeScore),
  //       "healingScore",
  //       Math.round(healingScore),
  //       "inspiringScore",
  //       Math.round(inspiringScore),
  //       "enhanceScore",
  //       Math.round(enhanceScore),
  //       "COST",
  //       cost,
  //     );
  //   }
  // }

  return [combatPower, defendenceScore];
}

export function calculateCost(arm) {
  let [combatPower, defendenceScore] = getCombatPower(arm, false);

  let cost = Math.pow(combatPower, 0.96) * 1.2;
  cost = Math.round(cost / 5) * 5;

  return [cost, defendenceScore];
}

export function calculateLeaderShip(arm, costResults) {
  let leadership = arm.cost + costResults[1] * 3;
  leadership = Math.round(Math.pow(leadership, 0.5) * 0.52) * 25;

  if (arm.type === "infantry") leadership += 25;
  if (arm.type === "archers" || arm.type === "artillery") leadership -= 25;
  if (arm.isWeak()) leadership -= 25;

  return leadership;
}

function getUpdateDelta(attribute, factor) {
  let delta = attribute <= 0 ? 0 : attribute * (factor - 1);
  if (delta != 0 && Math.abs(delta) < 1) {
    if (delta > 0) delta = 1;
    else delta = -1;
  }
  delta = Math.round(delta);
  return delta;
}

export function upgradeLevel(arm) {
  if (arm.exp < arm.cost || arm.level === 3) return false;

  arm.exp -= arm.cost;
  arm.level++;
  return true;
}

export function updateStaticProperties(arm) {
  if (arm.pre_level === arm.level) return;

  arm.pre_level = arm.level;
  let factor = 1.14;
  if (arm.level === 2) {
    arm.leadership += 25;
    arm.c_leadership = arm.leadership;
  } else if (arm.level === 3) {
    arm.leadership += 25;
    arm.c_leadership = arm.leadership;
  }

  for (let ad of attAndDfd) {
    for (let type of types) {
      let staticAttr = `${type}${ad}`;
      let currentAttr = `c_${type}${ad}`;
      arm[staticAttr] = arm[staticAttr] + getUpdateDelta(arm[staticAttr], factor);
      if (arm.currentFatigue == 0 && arm.c_leadership == arm.leadership) {
        arm[currentAttr] = arm[staticAttr];
      }
    }
  }

  if (arm.ammo !== -1) {
    arm.c_ammo += Math.floor(arm.ammo / 4);
    arm.c_ammo = Math.min(arm.c_ammo, arm.ammo);
  }

  let costResult = calculateCost(arm);
  arm.cost = costResult[0];
}

export function updateEliteData(arm) {
  arm.pre_level = 1;
  arm.level = 2;
  updateStaticProperties(arm);
  arm.level = 3;
  updateStaticProperties(arm);
  arm.c_leadership += 25;
  arm.leadership += 25;
}

export function loadDefenceBenchmark(arm, category = null, keywordsForChange = null) {
  switch (category) {
    case "inf":
      arm.meleeArmor = 0;
      arm.missileArmor = 0;
      arm.chargeArmor = 0;
      arm.meleeDodge = 10;
      arm.missileDodge = 0;
      arm.chargeDodge = 0;
      break;
    case "cal":
      arm.meleeArmor = 0;
      arm.missileArmor = 0;
      arm.chargeArmor = 0;
      arm.meleeDodge = 15;
      arm.missileDodge = 10;
      arm.chargeDodge = 10;
      break;
    case "monInf":
      arm.meleeArmor = 10;
      arm.missileArmor = 0;
      arm.chargeArmor = 10;
      arm.meleeDodge = 0;
      arm.missileDodge = 0;
      arm.chargeDodge = 0;
      break;
    default:
      arm.meleeArmor = 0;
      arm.missileArmor = 0;
      arm.chargeArmor = 0;
      arm.meleeDodge = 0;
      arm.missileDodge = 0;
      arm.chargeDodge = 0;
      break;
  }
  if (keywordsForChange) {
    for (let keyword of keywordsForChange.split(",")) {
      switch (keyword) {
        case "short":
          arm.meleeDodge += 10;
          break;
        case "long":
          arm.meleeDodge += -5;
          arm.chargeArmor += 15;
          arm.chargeDodge += 10;
          break;
        case "long-rs":
          arm.meleeDodge += -5;
          arm.chargeArmor += 15;
          arm.chargeDodge += 10;
          arm.chargeArmor += 15;
          arm.chargeDodge += 10;
          break;
        case "heavy":
          arm.meleeDodge -= 10;
          arm.chargeArmor += 5;
          arm.chargeDodge += 5;
          break;
        case "charge":
          arm.meleeDodge -= 15;
          arm.missileDodge += 10;
          break;
        case "charge-am":
          arm.meleeDodge -= 15;
          arm.missileDodge += 10;
          arm.meleeArmor -= 10;
          arm.missileArmor -= 5;
          break;
        case "weak":
          arm.meleeArmor -= 5;
          arm.meleeDodge -= 5;
          arm.chargeDodge -= 10;
          break;
        case "shield":
          arm.meleeArmor += 5;
          arm.meleeDodge -= 5;
          arm.missileArmor += 20;
          arm.missileDodge += 15;
          break;
        case "armor":
          arm.meleeArmor += 30;
          arm.meleeDodge -= 10;
          arm.missileArmor += 20;
          arm.chargeArmor += 10;
          break;
        case "sparse":
          arm.meleeDodge += 10;
          arm.missileDodge += 15;
          arm.chargeDodge -= 10;
          break;
        case "stealth":
          arm.missileDodge += 35;
          break;
        case "mm":
          arm.meleeDodge += 35;
          break;
        case "agile":
          arm.meleeDodge += 5;
          arm.missileDodge += 15;
          break;
        default:
          break;
      }
    }
  }
}

function modifyStats(arm, attAndDfd, factor, isIncrease, minFactor = 0.5) {
  for (let type of types) {
    const currentKey = `c_${type}${attAndDfd}`;
    const baseKey = `${type}${attAndDfd}`;
    const current = arm[currentKey];
    const base = arm[baseKey];

    if (base <= 0) continue;
    if (!isIncrease && current <= base * minFactor) continue;

    const delta = base * factor;
    const newValue = isIncrease ? current + delta : current - delta;
    const clamped = isIncrease ? Math.min(newValue, base) : Math.max(newValue, base * minFactor);
    arm[currentKey] = Math.round(clamped);
  }
}

export function fatigueTakesEffect(arm) {
  const percent = arm.currentFatigue / arm.totalStamina;
  arm.removeStatus("FT1");
  arm.removeStatus("FT2");
  arm.removeStatus("FT3");

  if (percent >= 0.9) {
    arm.addStatus("FT3");
    modifyStats(arm, attAndDfd[0], 2, false, 0.5);
    modifyStats(arm, attAndDfd[1], 2, false, 0.5);
    modifyStats(arm, attAndDfd[2], 2, false, 0.5);
    modifyStats(arm, attAndDfd[3], 2, false, 0.5);
  } else if (percent >= 0.7) {
    arm.addStatus("FT2");
    modifyStats(arm, attAndDfd[1], 0.15, false, 0.6);
    modifyStats(arm, attAndDfd[2], 0.15, false, 0.6);
  } else if (percent >= 0.5) {
    arm.addStatus("FT1");
    modifyStats(arm, attAndDfd[1], 0.15, false, 0.7);
  } else {
    modifyStats(arm, attAndDfd[0], 0.1, true);
    modifyStats(arm, attAndDfd[1], 0.1, true);
    modifyStats(arm, attAndDfd[2], 0.1, true);
    modifyStats(arm, attAndDfd[3], 0.1, true);
  }
}

export function moraleTakesEffect(arm) {
  const percent = arm.c_leadership / arm.leadership;
  arm.removeStatus("SM");
  arm.removeStatus("LM");
  arm.removeStatus("IR");

  if (percent <= 0) {
    arm.addStatus("IR");
    for (let ad of attAndDfd) {
      modifyStats(arm, ad, 0.2, false, 0.5);
    }
  } else if (percent <= 0.2) {
    arm.addStatus("LM");
    for (let ad of attAndDfd) {
      modifyStats(arm, ad, 0.15, false, 0.6);
    }
  } else if (percent <= 0.4) {
    arm.addStatus("SM");
    for (let ad of attAndDfd) {
      modifyStats(arm, ad, 0.15, false, 0.7);
    }
  } else {
    for (let ad of attAndDfd) {
      modifyStats(arm, ad, 0.1, true);
    }
  }
}

function getFormationShapeGivenScale(scale) {
  // Start from the square root and work outward
  const sqrt = Math.sqrt(scale);
  const baseSize = Math.ceil(sqrt);

  let bestHeight = baseSize;
  let bestWidth = baseSize;
  let bestEmpty = baseSize * baseSize - scale;

  // Check candidates: baseSize×baseSize, baseSize×(baseSize+1), (baseSize+1)×(baseSize+1)
  const candidates = [
    [baseSize, baseSize],
    [baseSize, baseSize - 1],
    [baseSize, baseSize + 1],
  ];

  for (const [h, w] of candidates) {
    const empty = h * w - scale;

    // Only consider valid candidates (non-negative empty cells)
    if (empty < 0) continue;

    // Priority 1: Minimize height-width difference (prefer closer to square)
    const currentDiff = Math.abs(bestHeight - bestWidth);
    const candidateDiff = Math.abs(h - w);

    if (empty < bestEmpty) {
      bestHeight = h;
      bestWidth = w;
      bestEmpty = empty;
    }
    // Priority 2: If difference is same, minimize empty cells
    else if (empty === bestEmpty && candidateDiff < currentDiff) {
      bestHeight = h;
      bestWidth = w;
      bestEmpty = empty;
    }
  }

  // Ensure height <= width for consistency
  if (bestHeight > bestWidth) {
    [bestHeight, bestWidth] = [bestWidth, bestHeight];
  }

  // Ensure the formation is not smaller than 3 x 3
  bestHeight = Math.max(bestHeight, 3);
  bestWidth = Math.max(bestWidth, 3);
  bestEmpty = bestHeight * bestWidth - scale;

  return [bestHeight, bestWidth, bestEmpty];
}

function fillInPositionsForPhalanx(height, width, emptyNumber, singleHP, isSparse) {
  const scale = height * width - emptyNumber;
  if (isSparse) {
    height = Math.round(height * 1.5);
    width = Math.round(width * 1.5);
    emptyNumber = height * width - scale;
  }

  // Initialize 2D array with all 1s
  const array = Array.from({ length: height }, () => Array(width).fill(singleHP));

  // Generate all possible positions
  const positions = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      positions.push([i, j]);
    }
  }
  // Shuffle positions using Fisher-Yates algorithm
  for (let i = positions.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[randomIndex]] = [positions[randomIndex], positions[i]];
  }
  // Place 0s at randomly selected positions
  for (let i = 0; i < emptyNumber; i++) {
    const [row, col] = positions[i];
    array[row][col] = 0;
  }

  return array;
}

function reformPositionsForPhalanx(height, width, emptyNumber, singleHPs) {
  for (let i = 0; i < emptyNumber; i++) singleHPs.push(0);

  // Shuffle singleHPs to randomize the distribution of 0s
  for (let i = singleHPs.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [singleHPs[i], singleHPs[randomIndex]] = [singleHPs[randomIndex], singleHPs[i]];
  }

  const array = Array.from({ length: height }, () => Array(width).fill(0));
  let index = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      array[i][j] = singleHPs[index];
      index++;
    }
  }
  return array;
}

function fillInPositionsForSingleUnit(tall, singleHP) {
  let size = Math.ceil(Math.pow(tall, 0.75));
  const array = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      array[i][j] = singleHP;
    }
  }
  return array;
}

function fillInPositionsForArtillery(scale, singleHP) {
  let array;
  let unitOperatorMap = {
    O2U: {},
    U2O: {},
  };
  for (let s = 0; s < scale; s++) {
    unitOperatorMap.U2O[s] = [];
  }

  function fillSquares(index, si, sj, size, val) {
    for (let k = 0; k < size; k++) {
      for (let l = 0; l < size; l++) {
        array[si + k][sj + l] = val;
        unitOperatorMap.U2O[index].push([si + k, sj + l]);
        unitOperatorMap.O2U[[si + k, sj + l]] = index;
      }
    }
  }

  let starts = [];
  let size = 0;

  switch (scale) {
    case 2:
      size = 5;
      starts = [
        [0, 3],
        [3, 0],
      ];
      break;

    case 3:
      size = 6;
      starts = [
        [0, 2],
        [4, 0],
        [4, 4],
      ];
      break;

    case 4:
      size = 6;
      starts = [
        [0, 4],
        [4, 0],
        [0, 0],
        [4, 4],
      ];
      break;

    case 5:
      size = 8;
      starts = [
        [0, 0],
        [0, 6],
        [3, 3],
        [6, 0],
        [6, 6],
      ];
      break;

    case 7:
      size = 8;
      starts = [
        [0, 3],
        [3, 3],
        [6, 3],
        [1, 0],
        [4, 0],
        [2, 6],
        [5, 6],
      ];
      break;

    case 9:
      size = 10;
      starts = [
        [0, 0],
        [0, 4],
        [0, 8],
        [4, 0],
        [4, 4],
        [4, 8],
        [8, 0],
        [8, 4],
        [8, 8],
      ];
      break;

    default:
      break;
  }

  array = Array.from({ length: size }, () => Array(size).fill(0));
  for (let s = 0; s < scale; s++) {
    let [i, j] = starts[s];
    fillSquares(s, i, j, 2, singleHP);
  }

  return [array, unitOperatorMap];
}

export function calculateAngleInDegree(xs, ys, xt, yt) {
  let deltaX = xt - xs;
  let deltaY = yt - ys;
  let result = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  if (result < 0) result += 360;
  return result;
}

export function getStepDirectionByAngle(angle) {
  let direction = [0, 0];
  if (angle <= keyAngles[0] || angle > keyAngles[7]) direction = [1, 0];
  else if (keyAngles[0] < angle && angle <= keyAngles[1]) direction = [1, 1];
  else if (keyAngles[1] < angle && angle <= keyAngles[2]) direction = [0, 1];
  else if (keyAngles[2] < angle && angle <= keyAngles[3]) direction = [-1, 1];
  else if (keyAngles[3] < angle && angle <= keyAngles[4]) direction = [-1, 0];
  else if (keyAngles[4] < angle && angle <= keyAngles[5]) direction = [-1, -1];
  else if (keyAngles[5] < angle && angle <= keyAngles[6]) direction = [0, -1];
  else if (keyAngles[6] < angle && angle <= keyAngles[7]) direction = [1, -1];
  return direction;
}

export function generateFormation(arm) {
  let scale = arm.scale;
  let tall = arm.tall;
  let singleHP = arm.singleHP;
  let isSparse = arm.isSparse();

  if (arm.type === "artillery") {
    return fillInPositionsForArtillery(scale, singleHP);
  }

  if (scale > 1) {
    const [height, width, emptyNumber] = getFormationShapeGivenScale(scale);
    return [fillInPositionsForPhalanx(height, width, emptyNumber, singleHP, isSparse), null];
  }

  return [fillInPositionsForSingleUnit(tall, singleHP), null];
}

export function reformPhalanx(arm) {
  let scale = arm.c_scale;
  let singleHPs = [];
  for (let y = 0; y < arm.formation.length; y++) {
    for (let x = 0; x < arm.formation[0].length; x++) {
      if (arm.formation[y][x] > 0) singleHPs.push(arm.formation[y][x]);
    }
  }

  const [height, width, emptyNumber] = getFormationShapeGivenScale(scale);
  return reformPositionsForPhalanx(height, width, emptyNumber, singleHPs);
}

function inBound(x, y, formation) {
  return x >= 0 && x < formation[0].length && y >= 0 && y < formation.length;
}

function getAdjacentUnits(self, target, includeFriends = false) {
  let pieces = target.player.pieceList;
  let output = [];
  for (let p of pieces) {
    if (adjacent(target, p)) output.push(p);
  }
  if (includeFriends) {
    pieces = self.player.pieceList;
    for (let p of pieces) {
      if (adjacent(target, p)) output.push(p);
    }
  }
  return output;
}

function getScatteredLandingPointsForOneAdjacentUnit(landingPoints, target, adjacentUnit) {
  let x1 = target.positionX;
  let y1 = target.positionY;
  let x2 = adjacentUnit.positionX;
  let y2 = adjacentUnit.positionY;

  let f1 = target.formation;
  let f2 = adjacentUnit.formation;
  let f1xlen = f1[0].length;
  let f1ylen = f1.length;
  let f2xlen = f2[0].length;
  let f2ylen = f2.length;

  let xBias = 0;
  let yBias = 0;
  let dir = null;
  // Left or Right
  if (adjacentLeftAndRight(target, adjacentUnit)) {
    yBias = -Math.floor((f1ylen - f2ylen) / 2);
    xBias = f2xlen;
    dir = "L";
    if (x2 > x1) {
      xBias = -f1xlen;
      dir = "R";
    }
  }
  // Up or Down
  else if (adjacentUpAndDown(target, adjacentUnit)) {
    xBias = -Math.floor((f1xlen - f2xlen) / 2);
    yBias = f2ylen;
    dir = "U";
    if (y2 > y1) {
      yBias = -f1ylen;
      dir = "D";
    }
  }

  let adjLandingPoints = [];
  for (let i = 0; i < landingPoints.length; i++) {
    let [x, y] = landingPoints[i];

    if (
      (dir === "L" && x < 0) ||
      (dir === "R" && x >= f1[0].length) ||
      (dir === "U" && y < 0) ||
      (dir === "D" && y >= f1.length)
    ) {
      adjLandingPoints.push([x + xBias, y + yBias]);
    }
  }

  return adjLandingPoints;
}

export function getProjectileLandingPoints(
  self,
  target,
  attackerScale,
  scatteringLevel,
  includeEmpty,
  focusFireOnNum = null,
) {
  let targetFormation = target.formation;

  let positions = [];
  // Add surrounding scattering tiles
  for (let y = -scatteringLevel; y < targetFormation.length + scatteringLevel; y++) {
    for (let x = -scatteringLevel; x < targetFormation[0].length + scatteringLevel; x++) {
      if ((inBound(x, y, targetFormation) && targetFormation[y][x] > 0) || includeEmpty) {
        positions.push([x, y]);
      }
    }
  }
  // Shuffle positions using Fisher-Yates algorithm
  for (let i = positions.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[randomIndex]] = [positions[randomIndex], positions[i]];
  }

  if (focusFireOnNum !== null && positions.length > focusFireOnNum) {
    positions.length = focusFireOnNum; // Keep only the first focusFireOnNum positions
  }

  let landingPoints = [];
  for (let i = 0; i < attackerScale; i++) {
    landingPoints.push(positions[i % positions.length]);
  }

  let output = [[target, landingPoints]];

  // Get landing points for adjacent units
  let adjacentUnits = getAdjacentUnits(self, target, true);
  for (let adjacentUnit of adjacentUnits) {
    let adjLandingPoints = getScatteredLandingPointsForOneAdjacentUnit(landingPoints, target, adjacentUnit);
    if (adjLandingPoints.length > 0) {
      output.push([adjacentUnit, adjLandingPoints]);
    }
  }

  return output;
}

export function getHitPositionsForOneTarget(
  landingPoints,
  angle,
  defenderFormation,
  singleDamage,
  totalPenetrate,
  explosionRadius,
) {
  function getDamageGradient(num, explosion = false) {
    if (num === 1) {
      return [singleDamage];
    }
    let damageGradient = [];
    for (let i = 0; i < num; i++) {
      let factor = explosion ? 1.25 - i / (num - 1) : 1.5 - i / (num - 1);
      damageGradient.push(singleDamage * factor);
    }
    // console.log(damageGradient);
    return damageGradient;
  }

  let hitPositions = [];
  let damages = [];

  for (let i = 0; i < landingPoints.length; i++) {
    // No penetration or explosion
    if (totalPenetrate == 0 && explosionRadius == 0) {
      let [x, y] = landingPoints[Math.floor(Math.random() * landingPoints.length)];
      hitPositions.push([x, y]);
      damages.push(singleDamage);
    }

    // Handle penetrating attacks
    else if (totalPenetrate >= 1) {
      let [x, y] = landingPoints[i % landingPoints.length];
      let damageGradient = getDamageGradient(totalPenetrate);
      let penetratedCount = 0;
      let step = 0;
      while (penetratedCount < totalPenetrate && step < totalPenetrate + 2) {
        hitPositions.push([x, y]);
        damages.push(damageGradient[penetratedCount]);
        if (inBound(x, y, defenderFormation) && defenderFormation[y][x] > 0) {
          penetratedCount++;
        }
        let direction = getStepDirectionByAngle(angle);
        x += direction[0];
        y += direction[1];
        step++;
      }
    }

    // Handle explosion attacks
    else if (explosionRadius > 0) {
      let [x, y] = landingPoints[i % landingPoints.length];
      let damageGradient = getDamageGradient(explosionRadius + 1, true);
      for (let dy = -explosionRadius; dy <= explosionRadius; dy++) {
        for (let dx = -explosionRadius; dx <= explosionRadius; dx++) {
          let step = Math.abs(dx) + Math.abs(dy);
          if (step > explosionRadius) continue;
          let nx = x + dx;
          let ny = y + dy;
          hitPositions.push([nx, ny]);
          damages.push(damageGradient[step]);
        }
      }
    }
  }

  return [damages, hitPositions];
}
