export function calculateCost(arm) {
  // Shield score
  let sldScore = arm.shield;
  sldScore /= 80;

  // HP score
  let hpScore = arm.scale * arm.singleHP;
  hpScore /= 100;

  // Moving score
  let movingScore = arm.speed * 10;

  // Armor and dodge score
  let defendenceScore = (arm.shield_armor * 1.2 + arm.armor + arm.dodge) * 0.6;

  // Attack and other combat score
  let meleeAttack = arm.melee + arm.melee_bonus / 2;
  let missileAttack_G = arm.missile_G + arm.missile_G_bonus / 2;
  let missileAttack_A = arm.missile_A + arm.missile_A_bonus / 2;
  let missileAttack = missileAttack_G + missileAttack_A;
  let ammo_range = arm.ammo_G + arm.ammo_A + arm.range_G + arm.range_A;
  let shock = arm.shock / 2;
  let attackScore = meleeAttack + missileAttack + ammo_range + shock;

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
    healingScore +
    inspiringScore +
    enhanceScore;
  cost = Math.pow(cost, 0.8) * 2.5;
  cost = Math.round(cost / 10) * 10;

  console.log(arm.name);
  console.log(
    "\t\t  sldScore",
    Math.round(sldScore),
    "hpScore",
    Math.round(hpScore),
    "movingScore",
    Math.round(movingScore),
    "defendenceScore",
    Math.round(defendenceScore),
    "attackScore",
    Math.round(attackScore),
    "COST",
    cost
  );

  return [cost, defendenceScore];
}

export function calculateLeaderShip(arm, costResults) {
  let leadership = 100 + arm.cost + costResults[1] * 0.5;
  leadership = Math.round(leadership / 50) * 50;
  return leadership;
}

export function realTimeAttackUpdate(arm, factor) {
  arm.c_melee = Math.round(arm.melee * factor);
  arm.c_missile_G = Math.round(arm.missile_G * factor);
  arm.c_missile_A = Math.round(arm.missile_A * factor);
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

  arm.armor = Math.round(arm.armor * (factor - 0.12));
  arm.dodge = Math.round(arm.dodge * (factor - 0.12));

  arm.melee = Math.round(arm.melee * factor);
  arm.missile_G = Math.round(arm.missile_G * factor);
  arm.missile_A = Math.round(arm.missile_A * factor);

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
