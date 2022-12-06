import { exportPower, getArmsAndImages } from "../arms/exportArm.js";
import { PowerMap, M_PowerMap } from "../common/const.js";
import { drawInfoForSelectedPiece } from "../prompts/infoDrawings.js";

const leftLength = 160;
const canvasWidth = 520;
const canvasHeight = 510;
const borderWidth = 20;
const blankHeight = 120;
const marginLeft1 = `${leftLength}px`;
const marginLeft2 = `${leftLength + canvasWidth + borderWidth}px`;
const marginTop2 = `-${canvasHeight + borderWidth * 2}px`;
const divBorder = `${borderWidth}px white solid`;

let useMandarin = localStorage.getItem("useMandarin") == "true";
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
// let numArms = 1;
let canvasListDiv = document.getElementById("canvasList");

for (let i = 0; i < numArms; i++) {
  let canvasGroup = addCanvasBlock(i);
  let imgGroup = loadImages(i, arms, images);
  let arm = arms[i];

  if (imgGroup[0] != null) {
    imgGroup[0].onload = function () {
      let cxt = canvasGroup[0].getContext("2d");
      drawInfoForSelectedPiece(cxt, arm, useMandarin, true);

      if (canvasGroup[1] != null) {
        let cxt = canvasGroup[1].getContext("2d");
        if (arm.switchable) {
          arm.switch();
          arm.loadRealtimeProps();
          arm.img = imgGroup[1];
          arm.img2 = imgGroup[0];
          drawInfoForSelectedPiece(cxt, arm, useMandarin, false);
        } else if (arm.brooder) {
          let brooded = arm._prepareBrooding();
          brooded.img = imgGroup[1];
          drawInfoForSelectedPiece(cxt, brooded, useMandarin, false);
        }
      }
    };
  }
}

function addCanvasBlock(i) {
  let canvas1 = document.createElement("canvas");
  canvas1.id = `info${i}`;
  canvas1.width = canvasWidth;
  canvas1.height = canvasHeight;
  canvas1.style.position = "absolute";
  canvas1.style.zIndex = 100;
  canvas1.style.background = "black";

  let outsideDiv1 = document.createElement("div");
  outsideDiv1.style.marginLeft = marginLeft1;
  outsideDiv1.style.width = `${canvasWidth}px`;
  outsideDiv1.style.height = `${canvasHeight}px`;
  outsideDiv1.style.border = divBorder;

  outsideDiv1.appendChild(canvas1);
  canvasListDiv.appendChild(outsideDiv1);

  if (
    !(
      arms[i].switchable ||
      arms[i].attached ||
      arms[i].brooder ||
      arms[i].canRelease
    )
  ) {
    return [canvas1, null];
  }

  let canvas2 = document.createElement("canvas");
  canvas2.id = `info${i}_`;
  canvas2.width = canvasWidth;
  canvas2.height = canvasHeight - blankHeight;
  canvas2.style.position = "absolute";
  canvas2.style.zIndex = 100;
  canvas2.style.background = "black";

  let outsideDiv2 = document.createElement("div");
  outsideDiv2.style.marginLeft = marginLeft2;
  outsideDiv2.style.marginTop = marginTop2;
  outsideDiv2.style.width = `${canvasWidth}px`;
  outsideDiv2.style.height = `${canvasHeight}px`;
  outsideDiv2.style.border = divBorder;

  outsideDiv2.appendChild(canvas2);
  canvasListDiv.appendChild(outsideDiv2);

  return [canvas1, canvas2];
}

function loadImages(i, arms, images) {
  let elem = null;
  let elem_h = null;

  if (
    arms[i].switchable ||
    arms[i].attached ||
    arms[i].brooder ||
    arms[i].canRelease
  ) {
    elem_h = document.createElement("img");
    elem_h.src = images[i][1];
    arms[i].img2 = elem_h;
  }
  elem = document.createElement("img");
  elem.src = images[i][0];
  elem.height = "100";
  elem.width = elem.height;
  arms[i].img = elem;
  arms[i].img1 = elem;

  return [elem, elem_h];
}
