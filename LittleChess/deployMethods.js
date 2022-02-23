import { exportPower, getArmsAndImages } from "./arms/exportArm.js";
import {
  PowerMap,
  M_PowerMap,
  DeployWidth as DW,
  DeployHeight as DH,
  DInfoWidth as DIW,
  DInfoHeight as DIH,
} from "./const.js";
import { Canvas, Rect } from "./tools.js";
import { drawInfoForSelectedPiece } from "./prompts/infoDrawings.js";

const maxX = Math.floor(DW / 50);
const maxY = Math.floor(DH / 50);

export class Deploy {
  constructor(_canvasList, _player) {
    this.useMandarin = window.localStorage.getItem("useMandarin") === "true";
    this.canvasList = _canvasList;
    this.player = _player;
    this.moneyLeftSpan = document.getElementById("moneyLeft");
    this.POWER = null;
    this.arms = null;
    this.images = null;
    this.elems = [];

    this.imageIndex = -1;
    this.pieceList = [];
    this.moneyLeft = window.localStorage.getItem("maxCost");

    // Initilize the deployment page
    this.showDeployInfo = function () {
      let powerNumber = "power" + this.player;
      let powerCodeName = window.localStorage.getItem(powerNumber);
      this.POWER = exportPower(powerCodeName);
      let powerRealName = this.useMandarin
        ? M_PowerMap.get(powerCodeName)
        : PowerMap.get(powerCodeName);
      document.getElementById("power").textContent = powerRealName;

      let a_i = getArmsAndImages(powerCodeName);
      this.arms = a_i[0];
      this.images = a_i[1];
      this.updateMoneyLeftSpan();
      this.addArmImagesToList();

      this.bindArmImagesMouseDown(this.elems, this.arms);
      this.drawMap();
    };

    // Actions for mouse clicking on canvas
    this.mouseClickingActions = function (e) {
      let x = e.offsetX || e.layerX;
      let y = e.offsetY || e.layerY;

      if (this.withdrawAnArm(x, y)) return;
      this.deployAnArm(x, y);
    };

    // Withdraw an arm from canvas
    this.withdrawAnArm = function (x, y) {
      let len = this.pieceList.length;
      let p = 0;
      for (p = 0; p < len; p++) {
        if (Rect.pointInRect({ x: x, y: y }, this.pieceList[p])) {
          let piece = this.pieceList[p];
          this.moneyLeft += piece.cost;
          this.updateMoneyLeftSpan();
          this.pieceList.splice(p, 1);
          Canvas.clearRect(this.canvasList.piece, piece.x, piece.y, 50, 50);

          return true;
        }
      }
      return false;
    };

    // Deploy an arm to canvas
    this.deployAnArm = function (x, y) {
      if (this.imageIndex >= 0) {
        let cost = this.arms[this.imageIndex].cost;
        if (this.moneyLeft < cost) return;

        this.moneyLeft -= cost;
        let drawX = Math.floor(x / 50) * 50;
        let drawY = Math.floor(y / 50) * 50;
        let image = this.elems[this.imageIndex];
        Canvas.drawImg(this.canvasList.piece, image, drawX, drawY);

        let piece = {
          index: this.imageIndex,
          cost: cost,
          x: drawX,
          y: drawY,
          width: 50,
          height: 50,
        };
        this.pieceList.push(piece);

        this.updateMoneyLeftSpan();
      }
    };

    // Bind Arm Images with Mouse Down event
    this.bindArmImagesMouseDown = function () {
      let infoCanvas = document.getElementById("info").getContext("2d");

      for (let i = 0; i < this.elems.length; i++) {
        let elem = this.elems[i];
        elem.addEventListener("mousedown", (e) => {
          for (let i = 0; i < this.elems.length; i++)
            this.elems[i].style.border = "5px solid white";

          let stl = "5px solid blue";
          if (this.player === 2) stl = "5px solid red";
          elem.style.border = stl;

          Canvas.clear(infoCanvas, DIW, DIH);
          this.arms[i].img = this.elems[i];
          drawInfoForSelectedPiece(
            infoCanvas,
            this.arms[i],
            this.useMandarin,
            true
          );
          this.imageIndex = i;
        });
      }
    };

    this.updateMoneyLeftSpan = function () {
      this.moneyLeftSpan.textContent = this.moneyLeft + " G";
    };

    this.addArmImagesToList = function () {
      for (let i = 0; i < this.images.length; i++) {
        let div = document.getElementById(i);
        let elem = document.createElement("img");
        elem.src = this.images[i];
        div.appendChild(elem);
        elem.height = "60";
        elem.width = elem.height;
        elem.style.border = "5px solid white";

        this.elems.push(elem);
      }
    };

    this.drawMap = function () {
      for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
          Canvas.drawRect(this.canvasList.map, i * 50, j * 50, 50, 50, "black");
        }
      }
    };

    this.storeArmInfo = function () {
      let outputList = [];
      for (let i = 0; i < this.pieceList.length; i++) {
        let piece = this.pieceList[i];

        // Calculate the real game positions of the pieces
        let px = 0,
          py = 0;
        if (this.player === 1) {
          px = maxY - piece.y / 50 - 1;
          py = piece.x / 50;
        } else {
          px = 27 - (maxY - piece.y / 50);
          py = maxX - piece.x / 50 - 1;
        }
        outputList.push([piece.index, px, py]);
      }

      if (this.player === 1)
        window.localStorage.setItem("a1", JSON.stringify(outputList));
      else window.localStorage.setItem("a2", JSON.stringify(outputList));
    };
  }
}

export function decodeArmPositionInfo(playerNum, player) {
  let armlistNumber = "a" + playerNum;
  let outputList = window.localStorage.getItem(armlistNumber);
  let info = JSON.parse(outputList);

  let powerNumber = "power" + playerNum;
  let Power = exportPower(window.localStorage.getItem(powerNumber));

  let arms = [];
  for (let i = 0; i < info.length; i++) {
    arms.push(Power.newAnArm(info[i][0], info[i][1], info[i][2], player));
  }

  return arms;
}
