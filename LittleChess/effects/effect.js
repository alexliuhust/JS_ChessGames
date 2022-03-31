import { MeleeEffect } from "./meleeEffect.js";
import { ChargeEffect } from "./chargeEffect.js";
import { MissileEffect } from "./missileEffect.js";
import { BombingEffect } from "./bombingEffect.js";
import { HealEffect } from "./healEffect.js";
import { InspireEffect } from "./inspireEffect.js";

export function addEffect(list, effectType, attacker, defender, cxt) {
  if (effectType === "melee") {
    let effect = new MeleeEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return effect.maxTime / 2 + 1;
  } else if (effectType === "charge") {
    let effect = new ChargeEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.maxTime / 3 + 3;
  } else if (effectType === "missile") {
    let effect = new MissileEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.maxTime;
  } else if (effectType === "bombing") {
    let effect = new BombingEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.flyingTime + Math.round(effect.bombingTime / 2);
  } else if (effectType === "healing") {
    let effect = new HealEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return 0;
  } else if (effectType === "inspiring") {
    let effect = new InspireEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return 0;
  }
}
