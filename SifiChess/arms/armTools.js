export function calculateCost(arm, showCostDetails) {
  // Shield score
  let sldScore = arm.shield;
  sldScore /= 60;

  // HP score
  let hpScore = arm.scale * arm.singleHP;
  hpScore /= 75;

  // Moving score
  let movingScore = arm.speed * 10;

  // Armor and dodge score
  let defendenceScore =
    (arm.shield_armor * 1.2 + arm.armor + arm.dodge * 1.1) * 2;

  // Attack and other combat score
  let meleeAttack = (arm.melee + arm.melee_bonus) * arm.scale * 0.5;
  let missileAttack_G = arm.missile_G + arm.missile_G_bonus;
  let missileAttack_A = (arm.missile_A + arm.missile_A_bonus) * 0.65;
  let missileAttack = (missileAttack_G + missileAttack_A) * arm.scale;
  let ammo_range = arm.ammo_G + arm.range_G * 10;
  if (!arm.GAtogether) ammo_range += arm.ammo_A + arm.range_A * 10;
  let shock = arm.shock / 2;
  let attackScore =
    (meleeAttack + missileAttack + ammo_range * 10 + shock) / 30;

  // Type score
  let airScore = arm.G_A === 1 ? 10 : 0;
  let mechScore = arm.B_M === 1 ? 10 : 0;
  let sizeScore = arm.size * 7;
  let typeScore = airScore + sizeScore + mechScore;

  // Healing score
  let healingScore = (arm.healing * arm.c_scale) / 10;
  healingScore += (arm.healRange * 10 + arm.totalHeal / 2) / 3;

  // Inspiring score
  let inspiringScore = (arm.inspiring * arm.c_scale) / 2 / 10;
  inspiringScore += (arm.inspireRange * 10) / 2;

  // Enhance socre
  let enhanceScore =
    (arm.armorEnhance + arm.attackEnhance + arm.enhanceRange * 10) / 2;

  // Final cost
  let cost =
    sldScore +
    hpScore +
    movingScore +
    defendenceScore +
    attackScore +
    typeScore +
    healingScore +
    inspiringScore +
    enhanceScore;
  // cost = Math.pow(cost, 0.8) * 2.5;
  cost = Math.round(cost / 5) * 5;

  if (showCostDetails) {
    console.log(arm.name);
    console.log(
      "\t\tsldScore",
      Math.round(sldScore),
      "hpScore",
      Math.round(hpScore),
      "movingScore",
      Math.round(movingScore),
      "defendenceScore",
      Math.round(defendenceScore),
      "attackScore",
      Math.round(attackScore),
      "typeScore",
      Math.round(typeScore),
      "COST",
      cost
    );
  }

  return [cost, defendenceScore];
}

export function calculateLeaderShip(arm, costResults) {
  let leadership = 100 + arm.cost + costResults[1] * 0.5;
  leadership = Math.round(leadership / 50) * 50;
  return leadership;
}

export function realTimeAttackUpdate(arm, factor) {
  arm.c_melee = Math.round(arm.melee * factor);
  arm.melee_bonus = Math.round(arm.melee_bonus * factor);
  arm.c_missile_G = Math.round(arm.missile_G * factor);
  arm.missile_G_bonus = Math.round(arm.missile_G_bonus * factor);
  arm.c_missile_A = Math.round(arm.missile_A * factor);
  arm.missile_A_bonus = Math.round(arm.missile_A_bonus * factor);
}

export function realTimeArmorUpdate(arm, factor) {
  arm.c_armor = Math.round(arm.armor * factor);
  arm.c_dodge = Math.round(arm.dodge * factor);
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

  // Set data increment factors
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

  // Increase the HP
  if (arm.scale !== 1) {
    arm.singleHP = Math.round(arm.singleHP * factor);
  } else {
    let inc = arm.singleHP * 0.1;
    arm.singleHP += inc;
    arm.c_singleHP += inc;
  }

  // Increase the defensive power
  arm.armor = Math.round(arm.armor * (factor - 0.12));
  arm.dodge = Math.round(arm.dodge * (factor - 0.12));

  // Increase the attack power
  arm.melee = Math.round(arm.melee * factor);
  arm.melee_bonus = Math.round(arm.melee_bonus * (factor - 0.1));
  arm.missile_G = Math.round(arm.missile_G * factor);
  arm.missile_G_bonus = Math.round(arm.missile_G_bonus * (factor - 0.1));
  arm.missile_A = Math.round(arm.missile_A * factor);
  arm.missile_A_bonus = Math.round(arm.missile_A_bonus * (factor - 0.1));

  if (arm.ammo_G !== -1) {
    arm.c_ammo_G += Math.floor(arm.ammo_G / 3);
    arm.c_ammo_G = Math.min(arm.c_ammo_G, arm.ammo_G);
  }
  if (arm.ammo_A !== -1) {
    arm.c_ammo_A += Math.floor(arm.ammo_A / 3);
    arm.c_ammo_A = Math.min(arm.c_ammo_A, arm.ammo_A);
  }

  arm.cost = calculateCost(arm, false)[0];
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
