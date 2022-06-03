import * as TerranArms from "./powerArms/terranArms.js";
import * as ParagardeArms from "./powerArms/paragardeArms.js";

export function exportPower(powerCodeName) {
  if (powerCodeName === "terran") return TerranArms;
  if (powerCodeName === "paragarde") return ParagardeArms;
}

export function getArmsAndImages(powerCodeName) {
  let POWER = exportPower(powerCodeName);
  let arms = [];
  let images = [];
  let i = 0;
  while (true) {
    let arm = POWER.newAnArm(i, 0, 0, null);
    if (arm === null) break;
    arms.push(arm);

    let imgs = [`../images/${powerCodeName}/${arm.constructor.name}.png`];
    if (arm.switchable || arm.attached)
      imgs.push(`../images/${powerCodeName}/${arm.constructor.name}_1.png`);

    images.push(imgs);
    i++;
  }
  return [arms, images];
}
