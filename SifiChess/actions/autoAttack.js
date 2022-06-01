import { armAttackArm } from "./attack.js";
import { calculateDistance } from "./actionTools.js";

export function triggerAutoAttack(attacker, defenders) {
  if (canAutoMissileAttack(attacker) || canAutoMeleeAttack(attacker)) {
    aotuAttack(attacker, defenders);
  }
}

function canAutoMissileAttack(attacker) {
  let G_attack =
    attacker.c_ammo_G > attacker.ammo_G * 0.2 && attacker.c_missile_G > 0;
  let A_attack =
    attacker.c_ammo_A > attacker.ammo_A * 0.2 && attacker.c_missile_A > 0;

  return (G_attack || A_attack) && !attacker.hasAttacked;
}

function canAutoMeleeAttack(attacker) {
  return attacker.c_melee > 0 && !attacker.hasAttacked;
}

function getNearestEnemy(attacker, defenders) {
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

    let M_attack =
      attacker.c_melee > 0 &&
      attacker.G_A === 0 &&
      defender.G_A === 0 &&
      distance === 1;

    let G_attack =
      attacker.c_missile_G > 0 &&
      attacker.c_ammo_G > 0 &&
      defender.G_A === 0 &&
      distance <= attacker.range_G;
    let A_attack =
      attacker.c_missile_A > 0 &&
      attacker.c_ammo_A > 0 &&
      defender.G_A === 1 &&
      distance <= attacker.range_A;

    if (M_attack || G_attack || A_attack) {
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
  }

  return [nearestEnemy, minDistance];
}

function aotuAttack(attacker, defenders) {
  let result = getNearestEnemy(attacker, defenders);
  let nearestEnemy = result[0];
  let distance = result[1];

  if (nearestEnemy === null) return;
  if (distance === 1 && nearestEnemy.G_A === 0 && attacker.G_A === 0) {
    if (attacker.c_melee > 0) armAttackArm(attacker, nearestEnemy, "melee");
  } else armAttackArm(attacker, nearestEnemy, "missile");
}
