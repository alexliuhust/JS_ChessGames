import { MeleeEffect } from "./meleeEffect.js";
import { MissileEffect } from "./missileEffect.js";
import { BombingEffect } from "./bombingEffect.js";

export function addEffect(list, damageType, attacker, defender, cxt) {
  if (damageType === "melee") {
    let effect = new MeleeEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return effect.maxTime - 4;
  } else if (damageType === "missile") {
    let effect = new MissileEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.maxTime;
  } else if (damageType === "bombing") {
    let effect = new BombingEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.flyingTime + Math.round(effect.bombingTime / 2);
  }
}
