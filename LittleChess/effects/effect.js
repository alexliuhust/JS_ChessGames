import { MeleeEffect } from "./meleeEffect.js";
import { ChargeEffect } from "./chargeEffect.js";
import { MissileEffect } from "./missileEffect.js";
import { BombingEffect } from "./bombingEffect.js";
import { HealEffect } from "./healEffect.js";

export function addEffect(list, damageType, attacker, defender, cxt) {
  if (damageType === "melee") {
    let effect = new MeleeEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return effect.maxTime / 2 + 1;
  } else if (damageType === "charge") {
    let effect = new ChargeEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.maxTime / 3 + 3;
  } else if (damageType === "missile") {
    let effect = new MissileEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.maxTime;
  } else if (damageType === "bombing") {
    let effect = new BombingEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.flyingTime + Math.round(effect.bombingTime / 2);
  } else if (damageType === "healing") {
    let effect = new HealEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return 0;
  }
}
