import { exportPower, getArmsAndImages } from "../arms/exportArm.js";
import {
  PowerMap,
  M_PowerMap,
  GameWidth as GW,
  DeployWidth as DW,
  DeployHeight as DH,
  DInfoWidth as DIW,
  DInfoHeight as DIH,
} from "./const.js";
import { Canvas, Rect } from "./tools.js";
import { drawInfoForSelectedPiece } from "../prompts/infoDrawings.js";
import { calculateCost } from "../arms/armTools.js";

const maxX = Math.floor(DW / 50);
const maxY = Math.floor(DH / 50);
const gX = Math.floor(GW / 50);

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

      // // Print the arm cost on the console
      // for (let i = 0; i < this.arms.length; i++)
      //   calculateCost(this.arms[i], true);
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
        Canvas.drawImg(
          this.canvasList.piece,
          image,
          0,
          0,
          100,
          100,
          drawX,
          drawY,
          50,
          50
        );

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
        elem.src = this.images[i][0];
        elem.height = "60";
        elem.width = elem.height;
        elem.style.border = "5px solid white";
        div.appendChild(elem);
        this.elems.push(elem);
        this.arms[i].img = elem;
        this.arms[i].img1 = elem;

        if (this.arms[i].switchable) {
          let div_h = document.getElementById("hiddenImages");
          let elem_h = document.createElement("img");
          elem_h.src = this.images[i][1];
          div_h.appendChild(elem_h);
          this.arms[i].img2 = elem_h;
        }
      }
    };

    this.drawMap = function () {
      for (let i = 0; i < maxX; i++) {
        if (i % 2 === 0) {
          for (let j = 0; j < maxY; j += 2) {
            Canvas.drawRect(
              this.canvasList.map,
              i * 50,
              j * 50,
              50,
              50,
              "black"
            );
          }
        } else {
          for (let j = 1; j < maxY; j += 2) {
            Canvas.drawRect(
              this.canvasList.map,
              i * 50,
              j * 50,
              50,
              50,
              "black"
            );
          }
        }
      }
      let y1 = 250;
      let y2 = DH - y1;
      let xOffset = 300;
      let x1 = 0;
      let x2 = 0;
      let color = "";
      if (this.player === 1) {
        x1 = DW - xOffset;
        x2 = DW;
        color = "blue";
      } else {
        x1 = xOffset;
        x2 = 0;
        color = "red";
      }
      let weight = 2;
      Canvas.drawLine(this.canvasList.map, x1, y1, x2, y1, color, weight);
      Canvas.drawLine(this.canvasList.map, x1, y2, x2, y2, color, weight);
      Canvas.drawLine(this.canvasList.map, x1, y1, x1, y2, color, weight);
    };

    this.storeArmInfo = function () {
      let outputList = [];
      for (let i = 0; i < this.pieceList.length; i++) {
        let piece = this.pieceList[i];

        // Calculate the real game positions of the pieces
        let px = 0;
        let py = 0;
        if (this.player === 1) px = piece.x / 50;
        else px = piece.x / 50 + (gX - maxX);
        py = piece.y / 50;
        outputList.push([piece.index, px, py]);
      }

      let armsNum = `a${this.player}`;
      window.localStorage.setItem(armsNum, JSON.stringify(outputList));
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
