import { calculateDistance2arms } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function sef_detonation(detonator, totalDecrease) {
  let enemies = detonator.player.enemyList;
  let list = detonator.player.effectList;
  addEffect(list, "selfDeto", detonator, null, cxt);

  for (let i = 0; i < enemies.length; i++) {
    let ground =
      (detonator.deto_target === 0 || detonator.deto_target === 2) &&
      enemies[i].G_A === 0;
    let air =
      (detonator.deto_target === 1 || detonator.deto_target === 2) &&
      enemies[i].G_A === 1;

    let distance = calculateDistance2arms(detonator, enemies[i]);
    if (distance <= 1.5) {
      if (ground || air) {
        let singleDamage = detonator._getSingleDeto(enemies[i]);
        let rawTotalDamage = totalDecrease * singleDamage;
        rawTotalDamage *= 2 - distance;
        enemies[i].decrease(detonator, "melee", rawTotalDamage);
      }
    }
  }
}
