import { calculateDistance } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";
import { afterAttackEnhancement, addAttackEnhanceEffect } from "./enhance.js";

const cxt = document.getElementById("piece").getContext("2d");

export function armAttackArm(attacker, defender, _damageType) {
  let damageType = _damageType;
  if (typeof _damageType === "undefined") {
    damageType = determineDamageType(attacker, defender);
    if (damageType == null) return;
  }

  let list1 = attacker.player.effectList;
  let list2 = defender.player.effectList;
  let sleepRound = addEffect(list1, damageType, attacker, defender, cxt);
  if (
    damageType === "melee" &&
    defender.c_melee > 0 &&
    defender.c_leadership > 0
  )
    addEffect(list2, "melee", defender, attacker, cxt);
  // let enh = afterAttackEnhancement(attacker, attacker.player.pieceList);
  // if (enh > 0) addAttackEnhanceEffect(attacker);

  // Impose slowdown effect
  if (attacker.slowdown && defender.size != 3) {
    defender.slowdown_countdown = attacker.slowdown_time + 1;
  }
  attacker.hasAttacked = true;

  setTimeout(() => {
    decreaseScalesForArms(attacker, damageType, defender);
    defender.isAttacked = 0;
  }, sleepRound * 20);
}

function determineDamageType(attacker, defender) {
  let distance = calculateDistance(
    attacker.positionX,
    attacker.positionY,
    defender.positionX,
    defender.positionY
  );

  // Melee attack
  if (distance == 1) return "melee";

  // missile Attack
  let G_attack =
    defender.G_A === 0 &&
    attacker.c_ammo_G > 0 &&
    attacker.c_missile_G > 0 &&
    distance <= attacker.range_G;
  let A_attack =
    defender.G_A === 1 &&
    attacker.c_ammo_A > 0 &&
    attacker.c_missile_A > 0 &&
    distance <= attacker.range_A;
  if (G_attack || A_attack) return "missile";

  return null;
}

function regularLeadershipDrop(self, dama_decr) {
  if (self.scale === 1) return damageCauseLeadershipDecreasing(self, dama_decr);
  return scaleDecreasingCauseLeadershipDecreasing(self, dama_decr);
}

function damageCauseLeadershipDecreasing(self, realDamage) {
  let decrease = 0;
  if (realDamage >= self.singleHP * 0.8) decrease = 150;
  else if (realDamage >= self.singleHP * 0.5) decrease = 100;
  else if (realDamage >= self.singleHP * 0.3) decrease = 30;

  return decrease;
}

function scaleDecreasingCauseLeadershipDecreasing(self, totalDecrease) {
  let decrease = 0;
  if (totalDecrease >= self.scale * 0.8) decrease = 150;
  else if (totalDecrease >= self.scale * 0.5) decrease = 100;
  else if (totalDecrease >= self.scale * 0.3) decrease = 30;

  return decrease;
}

function decreaseScalesForArms(attacker, damageType, defender) {
  // Get the total raw damage for attacker and counter attack damage for defender
  let att_rowDamage = attacker.getRawTotalDamage(damageType, defender);
  let dfd_ctrAttack = defender.getCounterAttack(damageType, attacker);

  // ============== Defender counter attacks ==============
  // Defender gains experience
  let results = attacker.decrease(defender, "melee", dfd_ctrAttack);
  // Attacker decrease leadership
  if (damageType === "melee" && defender.size === 2 && attacker.size === 0)
    attacker.c_leadership -= 30;
  attacker.c_leadership -= regularLeadershipDrop(attacker, results);
  if (results > 0 && attacker.size <= 1)
    attacker.c_leadership -= defender.getShockingAbility();
  if (attacker.c_leadership < 0) attacker.c_leadership = 0;
  // if attacker dies
  if (!attacker.isAlive) {
    // Defender gains leadership and experience when eliminating the Attacker by counter attack.
    defender.c_leadership += Math.round(attacker.cost * 0.5);
    if (defender.c_leadership >= defender.leadership)
      defender.c_leadership = defender.leadership;
    if (defender.ammo_G > 0 && defender.c_ammo_G < defender.ammo_G / 5) {
      defender.c_ammo_G += Math.round(defender.ammo_G / 4);
      if (defender.c_ammo_G > defender.ammo_G)
        defender.c_ammo_G = defender.ammo_G;
    }
    if (defender.ammo_A > 0 && defender.c_ammo_A < defender.ammo_A / 5) {
      defender.c_ammo_A += Math.round(defender.ammo_A / 4);
      if (defender.c_ammo_A > defender.ammo_A)
        defender.c_ammo_A = defender.ammo_A;
    }
  }

  // ============== Attacker attacks ==============
  // Attacker gains experience
  results = defender.decrease(attacker, damageType, att_rowDamage);
  // Defender decrease leadership
  if (damageType === "melee" && attacker.size === 2 && defender.size === 0)
    defender.c_leadership -= 30;
  defender.c_leadership -= regularLeadershipDrop(defender, results);
  if (results > 0 && defender.size <= 1) {
    defender.c_leadership -= attacker.getShockingAbility();
  }
  if (defender.c_leadership < 0) defender.c_leadership = 0;
  // if defender dies
  if (!defender.isAlive) {
    // Attacker gains leadership and experience when eliminating the Defender.
    attacker.c_leadership += Math.round(attacker.cost * 0.5);
    if (attacker.c_leadership >= attacker.leadership)
      attacker.c_leadership = attacker.leadership;
    if (attacker.ammo_G > 0 && attacker.c_ammo_G < attacker.ammo_G / 5) {
      attacker.c_ammo_G += Math.round(attacker.ammo_G / 4);
      if (attacker.c_ammo_G > attacker.ammo_G)
        attacker.c_ammo_G = attacker.ammo_G;
    }
    if (attacker.ammo_A > 0 && attacker.c_ammo_A < attacker.ammo_A / 5) {
      attacker.c_ammo_A += Math.round(attacker.ammo_A / 4);
      if (attacker.c_ammo_A > attacker.ammo_A)
        attacker.c_ammo_A = attacker.ammo_A;
    }
  }
}
