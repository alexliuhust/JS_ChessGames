import { exportPower } from "./arms/exportArm.js";
import { DeployWidth as DW, DeployHeight as DH } from "../const.js";
import { Canvas, Rect } from "./tools.js";

export class Deploy {
  constructor(_canvasList, _player) {
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
      this.POWER = exportPower(window.localStorage.getItem(powerNumber));
      document.getElementById("power").textContent = firstLetterUp(
        window.localStorage.getItem(powerNumber)
      );
      this.updateMoneyLeftSpan();
      this.arms = this.POWER.getTestArms();
      this.images = this.POWER.getImages();
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
      let simpleInfoSpan1 = document.getElementById("simpleInfo1");
      let simpleInfoSpan2 = document.getElementById("simpleInfo2");

      for (let i = 0; i < this.elems.length; i++) {
        let elem = this.elems[i];
        elem.addEventListener("mousedown", (e) => {
          for (let i = 0; i < this.elems.length; i++)
            this.elems[i].style.border = "5px solid white";

          simpleInfoSpan1.textContent = `${this.arms[i].name} [${this.arms[i].cost} G]`;
          simpleInfoSpan2.textContent = this.arms[i].description;
          elem.style.border = "5px solid blue";

          this.imageIndex = i;
        });
      }
    };

    this.updateMoneyLeftSpan = function () {
      this.moneyLeftSpan.textContent = this.moneyLeft + " G";
    };

    this.addArmImagesToList = function () {
      for (let i = 0; i < 9; i++) {
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
      let maxX = Math.floor(DW / 50);
      let maxY = Math.floor(DH / 50);

      for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
          Canvas.drawRect(this.canvasList.map, i * 50, j * 50, 50, 50, "black");
        }
      }
    };
  }
}

function firstLetterUp(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
