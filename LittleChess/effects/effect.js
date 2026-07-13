import { MeleeEffect } from "./meleeEffect.js";
import { ChargeEffect } from "./chargeEffect.js";
import { SmallProjectileEffect } from "./smallProjectileEffect.js";
import { HealEffect } from "./healEffect.js";
import { InspireEffect } from "./inspireEffect.js";
import { EnhanceEffect } from "./enhanceEffect.js";

export function addEffect(globalEffectList, effectType, attacker, defender, cxt) {
  let effect = null;
  let waitTime = 0;

  switch (effectType) {
    case "melee":
      effect = new MeleeEffect(attacker, defender, cxt);
      waitTime = effect.maxTime / 2 + 1;
      break;

    case "charge":
      effect = new ChargeEffect(attacker, defender, cxt);
      waitTime = effect.maxTime / 3 + 3;
      break;

    case "missile":
      if (!attacker.isGuided) {
        effect = new SmallProjectileEffect(attacker, defender, cxt);
        waitTime = effect.hitTime;
      } else {
      }

      break;

    case "healing":
      effect = new HealEffect(defender.x, defender.y, cxt);
      waitTime = 0;
      break;

    case "inspiring":
      effect = new InspireEffect(defender.x, defender.y, cxt);
      waitTime = 0;
      break;

    case "armorEnhancing":
      effect = new EnhanceEffect(defender, "armor", cxt);
      waitTime = 0;
      break;

    case "attackEnhancing":
      effect = new EnhanceEffect(defender, "attack", cxt);
      waitTime = 0;
      break;
  }
  globalEffectList.push(effect);

  return waitTime;
}
