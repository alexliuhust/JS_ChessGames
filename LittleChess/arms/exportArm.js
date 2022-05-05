import * as EmpireArms from "./powerArms/empireArms.js";
import * as NordFortArms from "./powerArms/nordfortArms.js";
import * as DimwoodsArms from "./powerArms/dimwoodsArms.js";
import * as PollutelandArms from "./powerArms/pollutelandArms.js";
import * as SnowhauptArms from "./powerArms/snowhauptArms.js";
import * as BurningterraArms from "./powerArms/burningterraArms.js";
import * as StormreefArms from "./powerArms/stormreefArms.js";
import * as OldcemeteryArms from "./powerArms/oldcemeteryArms.js";
import * as WildtribeArms from "./powerArms/wildtribeArms.js";

export function exportPower(powerCodeName) {
  if (powerCodeName === "empire") return EmpireArms;
  if (powerCodeName === "nordfort") return NordFortArms;
  if (powerCodeName === "dimwoods") return DimwoodsArms;
  if (powerCodeName === "polluteland") return PollutelandArms;
  if (powerCodeName === "snowhaupt") return SnowhauptArms;
  if (powerCodeName === "burningterra") return BurningterraArms;
  if (powerCodeName === "stormreef") return StormreefArms;
  if (powerCodeName === "oldcemetery") return OldcemeteryArms;
  if (powerCodeName === "wildtribe") return WildtribeArms;
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
