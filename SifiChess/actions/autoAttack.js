import { armAttackArm } from "./attack.js";
import { calculateDistance } from "./actionTools.js";

export function triggerAutoAttack(attacker, defenders) {
  if (canAutoMissileAttack(attacker)) aotuAttack(attacker, defenders, true);
  if (canAutoMeleeAttack(attacker)) aotuAttack(attacker, defenders, false);
}

function canAutoMissileAttack(attacker) {
  return (
    (attacker.type === "archers" ||
      ((attacker.type === "infantry" ||
        attacker.type === "cavalry" ||
        attacker.type === "monster-infantry" ||
        attacker.type === "monster") &&
        attacker.c_missileAttack > 0)) &&
    attacker.c_ammo >= attacker.ammo * 0.2 &&
    !attacker.isBombing &&
    !attacker.hasAttacked
  );
}

function canAutoMeleeAttack(attacker) {
  return (
    (attacker.type === "infantry" ||
      attacker.type === "monster-infantry" ||
      (attacker.type === "monster" && attacker.c_meleeAttack > 0) ||
      (attacker.type === "archers" && attacker.description.includes("melee")) ||
      attacker.type === "cavalry") &&
    !attacker.hasAttacked
  );
}

function getNearestEnemy(attacker, defenders, isMissile) {
  let minDistance = 10000;
  let nearestEnemy = null;
  for (let i = 0; i < defenders.length; i++) {
    let defender = defenders[i];
    let distance = calculateDistance(
      attacker.positionX,
      attacker.positionY,
      defender.positionX,
      defender.positionY
    );

    // If the archers are caught in melee combat, the auto-attack won't be triggered.
    if (
      isMissile &&
      (attacker.type === "archers" ||
        attacker.type === "infantry" ||
        attacker.type === "monster-infantry") &&
      distance === 1
    )
      return null;

    // Update the min distance and the nearest defender
    // If spotting closer distance, update.
    if (minDistance > distance) {
      minDistance = distance;
      nearestEnemy = defender;
    }
    // If spotting identical distance, but current enemy has less HP, update.
    else if (
      minDistance === distance &&
      nearestEnemy.getTotalHP() > defender.getTotalHP()
    ) {
      minDistance = distance;
      nearestEnemy = defender;
    }
  }
  if (isMissile && minDistance <= attacker.c_missileRange) return nearestEnemy;
  if (!isMissile && minDistance === 1) return nearestEnemy;
  return null;
}

function aotuAttack(attacker, defenders, isMissile) {
  let nearestEnemy = getNearestEnemy(attacker, defenders, isMissile);
  if (nearestEnemy === null) return;
  if (isMissile) armAttackArm(attacker, nearestEnemy, defenders, "missile");
  else armAttackArm(attacker, nearestEnemy, defenders, "melee");
}
