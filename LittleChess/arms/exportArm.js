import * as EmpireArms from "./empire/empireArms.js";
import * as NordFortArms from "./nordfort/nordfortArms.js";
import * as DimwoodsArms from "./dimwoods/dimwoodsArms.js";
import * as PollutelandArms from "./polluteland/pollutelandArms.js";
import * as SnowhauptArms from "./snowhaupt/snowhauptArms.js";
import * as BurningterraArms from "./burningterra/burningterraArms.js";
import * as StormreefArms from "./stormreef/stormreefArms.js";
import * as OldcemeteryArms from "./oldcemetery/oldcemeteryArms.js";
import * as WildtribeArms from "./wildtribe/wildtribeArms.js";

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
