import * as EmpireArms from "./empire/empireArms.js";
import * as NordFortArms from "./nordfort/nordfortArms.js";
import * as DimwoodsArms from "./dimwoods/dimwoodsArms.js";
import * as PollutelandArms from "./polluteland/pollutelandArms.js";
import * as SnowhauptArms from "./snowhaupt/snowhauptArms.js";
import * as BurningterraArms from "./burningterra/burningterraArms.js";

export function exportPower(power) {
  if (power === "empire") return EmpireArms;
  if (power === "nordfort") return NordFortArms;
  if (power === "dimwoods") return DimwoodsArms;
  if (power === "polluteland") return PollutelandArms;
  if (power === "snowhaupt") return SnowhauptArms;
  if (power === "burningterra") return BurningterraArms;
}
