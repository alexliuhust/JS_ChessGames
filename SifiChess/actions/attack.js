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

  setTimeout(() => {
    decreaseScalesForArms(attacker, damageType, defender);
    attacker.hasAttacked = true;
    defender.isAttacked = true;
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
  defender.exp += results[1];
  // Attacker decrease leadership
  if (damageType === "melee" && defender.size === 2 && attacker.size === 0)
    attacker.c_leadership -= 30;
  attacker.c_leadership -= regularLeadershipDrop(attacker, results[0]);
  if (attacker.size <= 1)
    attacker.c_leadership -= defender.getShockingAbility();
  if (attacker.c_leadership < 0) attacker.c_leadership = 0;
  // if attacker dies
  if (!attacker.isAlive) {
    // Defender gains leadership and experience when eliminating the Attacker by counter attack.
    defender.c_leadership += Math.round(attacker.cost * 0.5);
    defender.exp += Math.round(attacker.cost * 0.6);
    if (defender.c_leadership >= defender.leadership)
      defender.c_leadership = defender.leadership;
  }

  // ============== Attacker attacks ==============
  // Attacker gains experience
  results = defender.decrease(attacker, damageType, att_rowDamage);
  attacker.exp += results[1];
  // Defender decrease leadership
  if (damageType === "melee" && attacker.size === 2 && defender.size === 0)
    defender.c_leadership -= 30;
  defender.c_leadership -= regularLeadershipDrop(defender, results[0]);
  if (defender.size <= 1)
    defender.c_leadership -= attacker.getShockingAbility();
  if (defender.c_leadership < 0) defender.c_leadership = 0;
  // if defender dies
  if (!defender.isAlive) {
    // Attacker gains leadership and experience when eliminating the Defender.
    attacker.c_leadership += Math.round(attacker.cost * 0.5);
    attacker.exp += Math.round(attacker.cost * 0.6);
    if (attacker.c_leadership >= attacker.leadership)
      attacker.c_leadership = attacker.leadership;
  }
}
