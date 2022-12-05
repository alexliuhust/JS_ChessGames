import { exportPower, getArmsAndImages } from "../arms/exportArm.js";
import { PowerMap, M_PowerMap } from "../common/const.js";
import { drawInfoForSelectedPiece } from "../prompts/infoDrawings.js";

const canvasWidth = 520;
const canvasHeight = 510;
const marginLeft = "160px";

let useMandarin = localStorage.getItem("useMandarin");
let playerNumber = localStorage.getItem("showArmInfoFor");
let powerCodeName = localStorage.getItem(`power${playerNumber}`);
let POWER = exportPower(powerCodeName);
let powerName = useMandarin
  ? M_PowerMap.get(powerCodeName)
  : PowerMap.get(powerCodeName);

document.getElementById("power").innerHTML = powerName;
document.getElementById("backButton").href = `./p${playerNumber}Deploy.html`;

let results = getArmsAndImages(powerCodeName);
let arms = results[0];
let images = results[1];
let numArms = arms.length;
let canvasList = document.getElementById("canvasList");
for (let i = 0; i < numArms; i++) {
  let canvas = document.createElement("canvas");
  canvas.id = `info${i}`;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.position = "absolute";
  canvas.style.zIndex = 100;
  canvas.style.background = "black";

  let outsideDiv = document.createElement("div");
  outsideDiv.style.marginLeft = marginLeft;
  outsideDiv.style.width = `${canvasWidth}px`;
  outsideDiv.style.height = `${canvasHeight}px`;
  outsideDiv.style.border = "5px bisque dashed";

  outsideDiv.appendChild(canvas);
  canvasList.appendChild(outsideDiv);

  let div = document.getElementById(i);
  let elem = document.createElement("img");
  elem.src = images[i][0];
  elem.height = "60";
  elem.width = elem.height;
  div.appendChild(elem);
  arms[i].img = elem;
  arms[i].img1 = elem;
  if (
    arms[i].switchable ||
    arms[i].attached ||
    arms[i].brooder ||
    arms[i].canRelease
  ) {
    let div_h = document.getElementById("hiddenImages");
    let elem_h = document.createElement("img");
    elem_h.src = images[i][1];
    div_h.appendChild(elem_h);
    arms[i].img2 = elem_h;
  }

  //   console.log(arms[i].img1);
  //   console.log(arms[i].img2);
  //   console.log("===================");

  let cxt = canvas.getContext("2d");
  drawInfoForSelectedPiece(cxt, arms[i], useMandarin, true);
}
