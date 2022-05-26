import * as TerranArms from "./powerArms/terranArms.js";

export function exportPower(powerCodeName) {
  if (powerCodeName === "terran") return TerranArms;
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
    images.push(`../images/${powerCodeName}/${arm.constructor.name}.png`);
    i++;
  }
  return [arms, images];
}
