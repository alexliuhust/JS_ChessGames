import { MeleeEffect } from "./meleeEffect.js";
import { MissileEffect } from "./missileEffect.js";

export function addEffect(list, damageType, attacker, defender, cxt) {
  if (damageType === "melee") {
    list.push(new MeleeEffect(defender.x, defender.y, cxt));
  } else if (damageType === "missile") {
    list.push(new MissileEffect(attacker, defender, cxt));
  }
}
