import { exportPower } from "../arms/exportArm.js";
import { PowerMap, M_PowerMap } from "../common/const.js";

let useMandarin = localStorage.getItem("useMandarin");
let playerNumber = localStorage.getItem("showArmInfoFor");
let powerCodeName = localStorage.getItem(`power${playerNumber}`);
let power = exportPower(powerCodeName);
let powerName = useMandarin
  ? M_PowerMap.get(powerCodeName)
  : PowerMap.get(powerCodeName);

document.getElementById("power").innerHTML = powerName;
document.getElementById("backButton").href = `./p${playerNumber}Deploy.html`;
