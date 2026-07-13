import * as EmpireArms from "./powerArms/empireArms.js";
import * as NordFortArms from "./powerArms/nordfortArms.js";
import * as DimwoodsArms from "./powerArms/dimwoodsArms.js";
import * as PollutelandArms from "./powerArms/pollutelandArms.js";
import * as SnowhauptArms from "./powerArms/snowhauptArms.js";
import * as BurningterraArms from "./powerArms/burningterraArms.js";
import * as StormreefArms from "./powerArms/stormreefArms.js";
import * as OldcemeteryArms from "./powerArms/oldcemeteryArms.js";
import * as WildtribeArms from "./powerArms/wildtribeArms.js";

const POWER_ARMS_MAP = {
  empire: EmpireArms,
  nordfort: NordFortArms,
  dimwoods: DimwoodsArms,
  polluteland: PollutelandArms,
  snowhaupt: SnowhauptArms,
  burningterra: BurningterraArms,
  stormreef: StormreefArms,
  oldcemetery: OldcemeteryArms,
  wildtribe: WildtribeArms,
};

export function exportPower(powerCodeName) {
  return POWER_ARMS_MAP[powerCodeName];
}

export function getOneArm(power, i, posX, posY, player) {
  const ArmClass = power.ARM_CLASSES[i];
  return ArmClass ? new ArmClass([posX, posY], player) : null;
}

export function getArmsAndImages(powerCodeName) {
  let power = exportPower(powerCodeName);
  let arms = [];
  let images = [];
  let i = 0;
  while (true) {
    let arm = getOneArm(power, i, 0, 0, null);
    if (arm === null) break;
    arms.push(arm);
    images.push(`../images/${powerCodeName}/${arm.constructor.name}.png`);
    i++;
  }
  return [arms, images];
}
