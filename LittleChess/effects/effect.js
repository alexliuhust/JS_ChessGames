import { MeleeEffect } from "./meleeEffect.js";

export function addEffect(list, damageType, x, y, cxt) {
  if (damageType === "melee") {
    list.push(new MeleeEffect(x, y, cxt));
  }
}
