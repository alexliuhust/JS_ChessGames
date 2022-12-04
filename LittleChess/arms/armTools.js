export function dodgePercent(dodge) {
  let numSteps = 5;
  let step = (dodge * 2) / numSteps;
  let percent = 0;
  for (let i = 0; i < numSteps; i++) {
    let rand = Math.random();
    if (rand >= 0.475) {
      percent += step;
    }
  }
  percent = Math.round(percent);
  return percent;
}

export function calculateCost(arm) {
  // HP score
  let hpScore = arm.scale * arm.singleHP;
  hpScore /= 100;

  // Moving score
  let movingScore = arm.speed * 10;

  // Armor and dodge score
  let meleeArmorScore = arm.meleeArmor + arm.meleeDodge * 1.1;
  let missileArmorScore = arm.missileArmor + arm.missileDodge * 1.1;
  let chargeArmorScore = arm.chargeArmor * 1.1 + arm.chargeDodge * 1.2;
  let defendenceScore =
    (meleeArmorScore + missileArmorScore + chargeArmorScore) * 0.6;

  // Attack and other combat score
  let meleeAttack = arm.meleeAttack + arm.meleeAttack_bonus / 2;
  let missileAttack = arm.missileAttack + arm.missileAttack_bonus / 2;
  let chargeAttack = arm.chargeAttack + arm.chargeAttack_bonus / 2;
  let scale = arm._getValidScale();
  let damageScore =
    (scale * (meleeAttack + missileAttack * 1.1 + chargeAttack * 1.2)) / 16;
  let rangeScore = arm.missileRange * (2 + arm.missileRange / 4);
  let radiusScore = arm.missileRadius * arm.missileRadius * 5;
  let ammoScore = arm.type === "artillery" ? arm.ammo * 1.5 : arm.ammo / 3;
  let shockScore = (arm.shock * arm.shock) / 200;
  let otherCombatScore =
    (rangeScore + radiusScore + ammoScore + shockScore) / 3;
  let attackScore = damageScore + otherCombatScore;

  // Anti-armor score
  let antiArmorScore = arm.antiArmor * 0.6;

  // Type score
  let typeScore = 0;
  let artilleryScore = arm.type === "artillery" ? 250 : 0;
  if (arm.isBombing) artilleryScore += 100;
  let monsterScore = arm.type === "monster" ? 250 : 0;
  if (arm.type === "monster" && arm.isBombing) monsterScore = 200;
  let monstInfScore = arm.type === "monster-infantry" ? 150 : 0;
  typeScore += artilleryScore + monsterScore + monstInfScore;

  // Healing score
  let healingScore = (arm.healing * arm._getValidScale()) / 10;
  healingScore += (arm.healRange * 10 + arm.totalHeal / 2) / 3;

  // Inspiring score
  let inspiringScore = (arm.inspiring * arm._getValidScale()) / 2 / 10;
  inspiringScore += (arm.inspireRange * 10) / 2;

  // Enhance socre
  let enhanceScore =
    (arm.armorEnhance + arm.attackEnhance + arm.enhanceRange * 10) / 2;

  // Final cost
  let cost =
    hpScore +
    movingScore +
    defendenceScore +
    attackScore +
    antiArmorScore +
    typeScore +
    healingScore +
    inspiringScore +
    enhanceScore;
  cost = Math.pow(cost, 0.8) * 2.5;
  cost = Math.round(cost / 10) * 10;

  // console.log(arm.name);
  // console.log(
  //   "\t\t  hpScore",
  //   Math.round(hpScore),
  //   "movingScore",
  //   Math.round(movingScore),
  //   "defendenceScore",
  //   Math.round(defendenceScore),
  //   "attackScore",
  //   Math.round(attackScore),
  //   "antiArmorScore",
  //   Math.round(antiArmorScore),
  //   "typeScore",
  //   Math.round(typeScore),
  //   "COST",
  //   cost
  // );

  return [cost, defendenceScore];
}

export function calculateLeaderShip(arm, costResults) {
  let leadership = 100 + arm.cost + costResults[1] * 0.5;
  if (arm.type === "infantry" || arm.type === "cavalry") leadership *= 1.25;
  else if (arm.type === "archers" || arm.type === "artillery")
    leadership *= 0.75;

  leadership = Math.round(leadership / 50) * 50;
  return leadership;
}

export function realTimeAttackUpdate(arm, factor) {
  arm.c_meleeAttack = Math.round(arm.meleeAttack * factor);
  arm.c_missileAttack = Math.round(arm.missileAttack * factor);
  arm.c_chargeAttack = Math.round(arm.chargeAttack * factor);
}

export function realTimeArmorUpdate(arm, factor) {
  arm.c_meleeArmor = Math.round(arm.meleeArmor * factor);
  arm.c_missileArmor = Math.round(arm.missileArmor * factor);
  arm.c_chargeArmor = Math.round(arm.chargeArmor * factor);
  arm.c_meleeDodge = Math.round(arm.meleeDodge * factor);
  arm.c_missileDodge = Math.round(arm.missileDodge * factor);
  arm.c_chargeDodge = Math.round(arm.chargeDodge * factor);
}

export function updateRealTimeProperties(arm, levelUpgraded) {
  let factor = 1;

  if (levelUpgraded) {
    if (arm.scale != 1) arm.c_singleHP = arm.singleHP;
    arm.wound = arm.c_singleHP;
  }

  let oneThird = Math.floor(arm.leadership / 3);
  let twoThirds = oneThird * 2;

  if (oneThird < arm.c_leadership && arm.c_leadership < twoThirds) factor = 0.8;
  else if (arm.c_leadership <= oneThird) factor = 0.6;

  realTimeAttackUpdate(arm, factor);
  realTimeArmorUpdate(arm, factor);
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
  let factor = 1.1;
  if (arm.level === 2) {
    factor = 1.2;
    arm.leadership += 50;
    arm.c_leadership = arm.leadership;
  } else if (arm.level === 3) {
    factor = 1.35;
    arm.leadership += 50;
    arm.c_leadership = arm.leadership;
  }

  if (arm.scale !== 1) {
    arm.singleHP = Math.round(arm.singleHP * factor);
  } else {
    let inc = arm.singleHP * 0.1;
    arm.singleHP += inc;
    arm.c_singleHP += inc;
  }

  arm.meleeArmor = Math.round(arm.meleeArmor * (factor - 0.12));
  arm.missileArmor = Math.round(arm.missileArmor * (factor - 0.12));
  arm.chargeArmor = Math.round(arm.chargeArmor * (factor - 0.12));
  arm.meleeDodge = Math.round(arm.meleeDodge * (factor - 0.12));
  arm.missileDodge = Math.round(arm.missileDodge * (factor - 0.12));
  arm.chargeDodge = Math.round(arm.chargeDodge * (factor - 0.12));

  arm.meleeAttack = Math.round(arm.meleeAttack * factor);
  arm.missileAttack = Math.round(arm.missileAttack * factor);
  arm.chargeAttack = Math.round(arm.chargeAttack * factor);

  if (arm.ammo !== -1) {
    arm.c_ammo += Math.floor(arm.ammo / 3);
    arm.c_ammo = Math.min(arm.c_ammo, arm.ammo);
  }

  arm.cost = calculateCost(arm)[0];
}

export function updateEliteData(arm) {
  arm.pre_level = 1;
  arm.level = 2;
  updateStaticProperties(arm);
  updateRealTimeProperties(arm, true);
  arm.level = 3;
  updateStaticProperties(arm);
  updateRealTimeProperties(arm, true);
  arm.c_leadership += 200;
  arm.leadership += 200;
}
