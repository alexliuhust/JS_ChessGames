import { MeleeEffect } from "./meleeEffect.js";
import { SelfDetoEffect } from "./selfDetoEffect.js";
import { MissileEffect } from "./missileEffect.js";
import { LaserEffect } from "./laserEffect.js";
import { AttachEffect } from "./attachEffect.js";
import { HealEffect } from "./healEffect.js";
import { ChargeEffect } from "./chargeEffect.js";
import { InspireEffect } from "./inspireEffect.js";
import { EnhanceEffect } from "./enhanceEffect.js";

export function addEffect(list, effectType, attacker, defender, cxt) {
  if (effectType === "melee") {
    let effect = new MeleeEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return effect.maxTime / 2 + 1;
  } else if (effectType === "selfDeto") {
    let effect = new SelfDetoEffect(attacker, cxt);
    list.push(effect);
    return 0;
  } else if (effectType === "missile") {
    let effect = null;
    if (attacker.attached) effect = new AttachEffect(attacker, defender, cxt);
    else if (attacker.missileLaser)
      effect = new LaserEffect(attacker, defender, cxt);
    else effect = new MissileEffect(attacker, defender, cxt);
    list.push(effect);
    return effect.maxTime;
  } else if (effectType === "healing") {
    let effect = new HealEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return 0;
  } else if (effectType === "charging") {
    let effect = new ChargeEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return 0;
  } else if (effectType === "inspiring") {
    let effect = new InspireEffect(defender.x, defender.y, cxt);
    list.push(effect);
    return 0;
  } else if (effectType === "armorEnhancing") {
    let effect = new EnhanceEffect(defender, "armor", cxt);
    list.push(effect);
    return 0;
  } else if (effectType === "attackEnhancing") {
    let effect = new EnhanceEffect(defender, "attack", cxt);
    list.push(effect);
    return 0;
  }
}
