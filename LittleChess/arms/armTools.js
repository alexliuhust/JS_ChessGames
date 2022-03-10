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
  let artilleryScore = arm.type === "artillery" ? 150 : 0;
  if (arm.isBombing) artilleryScore += 50;
  let monsterScore = arm.type === "monster" ? 150 : 0;
  if (arm.type === "monster" && arm.isBombing) monsterScore = 100;
  let monstInfScore = arm.type === "monster-infantry" ? 100 : 0;
  typeScore += artilleryScore + monsterScore + monstInfScore;

  // Final cost
  let cost =
    hpScore +
    movingScore +
    defendenceScore +
    attackScore +
    antiArmorScore +
    typeScore;
  cost = Math.sqrt(cost) * 12;
  cost = Math.round(cost / 5) * 5;

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
