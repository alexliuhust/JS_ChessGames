import { armAttackArm } from "./attack.js";
import { calculateDistance, isTargeBlocked } from "./actionTools.js";

export function triggerAutoAttack(attacker, defenders) {
  if (attacker.autofireEnable && canAutoMissileAttack(attacker)) autoAttack(attacker, defenders, true);
  if (canAutoMeleeAttack(attacker)) autoAttack(attacker, defenders, false);
}

function canAutoMissileAttack(attacker) {
  let isMissile = attacker.type === "archers" || attacker.type === "artillery";
  let notArcherButCanMissile =
    (attacker.type === "infantry" ||
      attacker.type === "cavalry" ||
      attacker.type === "monster-infantry" ||
      attacker.type === "monster") &&
    attacker.c_missileAttack > 0;

  return (isMissile || notArcherButCanMissile) && attacker.c_ammo >= attacker.ammo * 0.2 && !attacker.hasAttacked;
}

function canAutoMeleeAttack(attacker) {
  let isMelee = attacker.type === "infantry" || attacker.type === "monster-infantry" || attacker.type === "cavalry";
  let canMelee = attacker.type === "monster" && attacker.c_meleeAttack > 0;
  let meleeArcher = attacker.type === "archers" && attacker.description.includes("Melee");

  return (isMelee || canMelee || meleeArcher) && !attacker.hasAttacked;
}

function getNearestEnemy(attacker, defenders, isMissile) {
  let minDistance = 10000;
  let nearestEnemy = null;
  for (let i = 0; i < defenders.length; i++) {
    let defender = defenders[i];
    // Skip the stealth target
    if (isMissile && defender.isStealth()) continue;

    if (isTargeBlocked(attacker, defender, defenders)) continue;
    let distance = calculateDistance(attacker.positionX, attacker.positionY, defender.positionX, defender.positionY);

    // If the archers are caught in melee combat, the auto-attack won't be triggered.
    if (
      isMissile &&
      (attacker.type === "archers" || attacker.type === "infantry" || attacker.type === "artillery") &&
      distance === 1
    ) {
      return null;
    }

    // Update the min distance and the nearest defender
    // If spotting closer distance, update.
    if (minDistance > distance) {
      minDistance = distance;
      nearestEnemy = defender;
    }
    // If spotting identical distance, but current enemy has less HP, update.
    else if (minDistance === distance && nearestEnemy.getTotalHP() > defender.getTotalHP()) {
      minDistance = distance;
      nearestEnemy = defender;
    }
  }

  if (isMissile && minDistance <= attacker.c_missileRange) return nearestEnemy;
  if (!isMissile && minDistance === 1) return nearestEnemy;
  return null;
}

function autoAttack(attacker, defenders, isMissile) {
  let nearestEnemy = getNearestEnemy(attacker, defenders, isMissile);
  if (nearestEnemy === null) return;

  if (isMissile) {
    // Try to attack the previous target
    let hasPreviousTarget = attacker.preMissileTarget != null && attacker.preMissileTarget.isAlive;
    let previousDistance = 100000000;
    let previousIsBlocked = false;
    if (hasPreviousTarget) {
      previousDistance = calculateDistance(
        attacker.positionX,
        attacker.positionY,
        attacker.preMissileTarget.positionX,
        attacker.preMissileTarget.positionY,
      );
      previousIsBlocked = isTargeBlocked(attacker, attacker.preMissileTarget, defenders);
    }

    if (hasPreviousTarget && previousDistance <= attacker.c_missileRange && !previousIsBlocked) {
      armAttackArm(attacker, attacker.preMissileTarget, defenders, "missile");
    } else {
      armAttackArm(attacker, nearestEnemy, defenders, "missile");
    }
  } else {
    armAttackArm(attacker, nearestEnemy, defenders, "melee");
  }
}
