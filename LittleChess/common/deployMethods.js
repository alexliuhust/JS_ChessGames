import { getArmsAndImages } from "../arms/exportArm.js";
import {
  PowerMap,
  M_PowerMap,
  PowerList,
  DirectMap,
  GameWidth as GW,
  DeployWidth as DW,
  DeployHeight as DH,
  DInfoWidth as DIW,
  DInfoHeight as DIH,
} from "./const.js";
import { getAllIconImages } from "./icon.js";
import { Canvas, Rect } from "./tools.js";
import { InfoPanel } from "../prompts/infoDrawings.js";

const maxX = Math.floor(DW / 50);
const maxY = Math.floor(DH / 50);
const gX = Math.floor(GW / 50);
const useMandarin = window.localStorage.getItem("useMandarin") === "true";
const strictDeploymentArea = window.localStorage.getItem("strictDeploymentArea") === "true";
const uniqueEliteAndHero = window.localStorage.getItem("uniqueEliteAndHero") === "true";
const techLimit = parseInt(window.localStorage.getItem("techLimit"));
const moneyLeftSpan = document.getElementById("moneyLeft");
const elitesHeroesLeftSpan = document.getElementById("elitesHeroesLeft");
const powerSelect = document.getElementById("powers");
const clearButton = document.getElementById("clear");
const backButton = document.getElementById("back");
const saveAndContinueButton = document.getElementById("saveAndContinue");

const selectCanvas = document.getElementById("select");
const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
  info: document.getElementById("info").getContext("2d"),
};
const infoCanvas = document.getElementById("info");

export class Deploy {
  constructor(_player) {
    this.player = _player;
    this.arms = null;
    this.images = null;
    this.elems = [];
    this.icons = {};
    this.totalArms = 24;
    this.rowSize = 12;

    this.imageIndex = -1;
    this.pieceList = [];
    this.moneyLeft = window.localStorage.getItem("maxCost");
    this.elitesHeroesLeft = window.localStorage.getItem("maxNumEliteAndHero");

    this.areaLimits = {};
    this.seenIndexes = new Set([]);

    this.infoPanel = new InfoPanel(canvasList.info, useMandarin, true, false);
  }

  // Initilize the deployment page
  initializeDeploymentPage() {
    this.loadAllIconImages();
    this.updatePowerName();
    let powerNumber = "power" + this.player;
    let powerCodeName = window.localStorage.getItem(powerNumber);

    let a_i = getArmsAndImages(powerCodeName);
    this.arms = a_i[0];
    this.images = a_i[1];
    this.updateMoneyLeftSpan();
    this.updateNumElitesAndHeroesLeftSpan();
    this.addArmImagesToList();

    this.bindArmImagesMouseDown(this.elems, this.arms);
    this.drawMap();

    selectCanvas.addEventListener("click", (e) => {
      let x = e.offsetX || e.layerX;
      let y = e.offsetY || e.layerY;
      if (this.withdrawAnArm(x, y)) return;
      this.deployAnArm(x, y);
    });

    clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.clearAllSelection();
    });

    powerSelect.addEventListener("input", () => {
      window.localStorage.setItem("power" + this.player, powerSelect.value);
      location.reload();
    });

    window.addEventListener("beforeunload", () => {
      this.storeArmInfo();
    });

    infoCanvas.addEventListener("mousemove", (e) => {
      const rect = infoCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.infoPanel.updateTraitInfo(x, y);
      Canvas.clear(canvasList.info, DIW, DIH);
      this.infoPanel.drawInfoForSelectedPiece(this.arms[this.imageIndex]);
    });

    setTimeout(() => {
      this.loadPreviousArmInfo();
      this.bindKeyPressEvents();
    }, 150);

    setTimeout(() => {
      if (this.imageIndex == null || this.imageIndex == -1) this.imageIndex = 0;
      this.elems[this.imageIndex].click();
    }, 300);
  }

  loadAllIconImages() {
    let list = getAllIconImages();
    for (let [src, id] of list) {
      let div = document.getElementById("allIconImages");
      let elem = document.createElement("img");
      elem.src = src;
      elem.id = id;
      div.appendChild(elem);
      this.icons[id] = elem;
    }
  }

  // Withdraw an arm from canvas
  withdrawAnArm(x, y) {
    let len = this.pieceList.length;
    let p = 0;
    for (p = 0; p < len; p++) {
      if (Rect.pointInRect({ x: x, y: y }, this.pieceList[p])) {
        let piece = this.pieceList[p];
        this.moneyLeft += piece.cost;
        if (piece.isEliteOrHero) this.elitesHeroesLeft += 1;
        this.updateMoneyLeftSpan();
        this.updateNumElitesAndHeroesLeftSpan();
        this.seenIndexes.delete(piece.index);
        this.pieceList.splice(p, 1);
        Canvas.clearRect(canvasList.piece, piece.x, piece.y, 50, 50);

        return true;
      }
    }
    return false;
  }

  // Deploy an arm to canvas
  deployAnArm(x, y) {
    if (this.imageIndex >= 0) {
      let cost = this.arms[this.imageIndex].cost;
      if (this.moneyLeft < cost) return;

      if (this.arms[this.imageIndex].isEliteOrHero()) {
        if (this.elitesHeroesLeft == 0) return;
        if (uniqueEliteAndHero && this.seenIndexes.has(this.imageIndex)) return;
      }

      let drawX = Math.floor(x / 50) * 50;
      let drawY = Math.floor(y / 50) * 50;
      let forwardDeployment = this.arms[this.imageIndex].hasForwardDeployment();
      if (!forwardDeployment && !this.isArmInStrictArea(drawX, drawY)) {
        console.log("Outside!!!!");
        return;
      }

      let image = this.elems[this.imageIndex];
      Canvas.drawImg(canvasList.piece, image, 0, 0, 50, 50, drawX + 1, drawY + 1, 48, 48);

      let piece = {
        index: this.imageIndex,
        cost: cost,
        x: drawX,
        y: drawY,
        width: 50,
        height: 50,
        isEliteOrHero: this.arms[this.imageIndex].isEliteOrHero(),
      };
      this.pieceList.push(piece);

      this.moneyLeft -= cost;
      if (this.arms[this.imageIndex].isEliteOrHero()) this.elitesHeroesLeft -= 1;
      this.updateMoneyLeftSpan();
      this.updateNumElitesAndHeroesLeftSpan();
      this.seenIndexes.add(this.imageIndex);
    }
  }

  // Bind Arm Images with Mouse Down event
  bindArmImagesMouseDown() {
    for (let i = 0; i < this.elems.length; i++) {
      let elem = this.elems[i];
      elem.addEventListener("click", () => {
        for (let i = 0; i < this.elems.length; i++) this.elems[i].style.border = "5px solid white";

        let stl = "5px solid blue";
        if (this.player === 2) stl = "5px solid red";
        elem.style.border = stl;

        Canvas.clear(canvasList.info, DIW, DIH);
        this.arms[i].img = this.elems[i];
        this.infoPanel.drawInfoForSelectedPiece(this.arms[i]);
        this.imageIndex = i;
      });
    }
  }

  updateMoneyLeftSpan() {
    moneyLeftSpan.textContent = this.moneyLeft + " G";
  }

  updateNumElitesAndHeroesLeftSpan() {
    elitesHeroesLeftSpan.textContent = this.elitesHeroesLeft < 0 ? "Unlimited" : this.elitesHeroesLeft;
  }

  addArmImagesToList() {
    const container = document.getElementById("armImages");
    for (let i = 0; i < this.totalArms; i++) {
      if (i > 0 && i % this.rowSize === 0) {
        for (let b = 0; b < 5; b++) container.appendChild(document.createElement("br"));
        const spacer = document.createElement("div");
        spacer.style.marginTop = "-15px";
        container.appendChild(spacer);
      }

      const div = document.createElement("div");
      div.style.float = "left";
      div.id = String(i);
      container.appendChild(div);
    }
    for (let b = 0; b < 5; b++) container.appendChild(document.createElement("br"));

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
  }

  drawMap() {
    for (let i = 0; i < maxX; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < maxY; j += 2) {
          Canvas.drawRect(canvasList.map, i * 50, j * 50, 50, 50, "black");
        }
      } else {
        for (let j = 1; j < maxY; j += 2) {
          Canvas.drawRect(canvasList.map, i * 50, j * 50, 50, 50, "black");
        }
      }
    }
    let y1 = 200;
    let y2 = DH - y1;
    let xOffset = 300;
    let x1 = 0;
    let x2 = 0;
    let color = "";
    if (this.player === 1) {
      x1 = DW - xOffset - 100;
      x2 = DW - 100;
      color = "blue";
    } else {
      x1 = xOffset + 100;
      x2 = 100;
      color = "red";
    }

    this.areaLimits = { x1: x1, y1: y1, x2: x2, y2: y2 };

    let weight = 2;
    Canvas.drawLine(canvasList.map, x1, y1, x2, y1, color, weight);
    Canvas.drawLine(canvasList.map, x1, y2, x2, y2, color, weight);
    Canvas.drawLine(canvasList.map, x1, y1, x1, y2, color, weight);
    Canvas.drawLine(canvasList.map, x2, y1, x2, y2, color, weight);
  }

  isArmInStrictArea(x, y) {
    if (!strictDeploymentArea) return true;
    let { x1, y1, x2, y2 } = this.areaLimits;
    let xmin = Math.min(x1, x2);
    let xmax = Math.max(x1, x2);
    let ymin = Math.min(y1, y2);
    let ymax = Math.max(y1, y2);
    x1 = xmin;
    x2 = xmax;
    y1 = ymin;
    y2 = ymax;
    return x >= x1 && x < x2 && y >= y1 && y < y2;
  }

  storeArmInfo() {
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
  }

  loadPreviousArmInfo() {
    let armlistNumber = "a" + this.player;
    let outputList = window.localStorage.getItem(armlistNumber);
    if (!outputList) {
      this.imageIndex = 0;
      return;
    }
    let info = JSON.parse(outputList);

    for (let i = 0; i < info.length; i++) {
      let index = info[i][0];
      let px = info[i][1];
      let py = info[i][2];

      this.imageIndex = index;
      let drawX = 0;
      if (this.player === 1) drawX = px * 50;
      else drawX = (px - (gX - maxX)) * 50;
      let drawY = py * 50;

      this.imageIndex = index;
      this.deployAnArm(drawX, drawY);
    }
  }

  bindKeyPressEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey) {
        // Press ctrl + shift + L to switch language
        if (e.key === "L" || e.key === "l") {
          e.preventDefault();
          let useMandarin = window.localStorage.getItem("useMandarin") == "true";
          window.localStorage.setItem("useMandarin", !useMandarin);
          location.reload();
        }
        // Press ctrl + shift + C to clear all
        else if (e.key === "C" || e.key === "c") {
          e.preventDefault();
          clearButton.click();
        }
        // Press ctrl + shift + S to save and continue
        else if (e.key === "S" || e.key === "s") {
          e.preventDefault();
          saveAndContinueButton.click();
        }
        // Press ctrl + shift + B to save and go back
        else if (e.key === "B" || e.key === "b") {
          e.preventDefault();
          backButton.click();
        }
        // Press ctrl + shift + F to select power
        else if (e.key === "F" || e.key === "f") {
          e.preventDefault();
          powerSelect.focus();
        }
      }
      // Press Tab to forward select, shift + Tab to backward select arms
      else if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) this.imageIndex -= 1;
        else this.imageIndex += 1;
        this.imageIndex = (this.imageIndex + this.arms.length) % this.arms.length;
        this.elems[this.imageIndex].click();
      }
      // Press arrow keys to select arms
      else if (e.code.includes("Arrow") || e.code.includes("Key")) {
        e.preventDefault();
        let direction = DirectMap.get(e.code);
        let max = this.arms.length;
        switch (direction) {
          case "U":
            if (this.imageIndex >= this.rowSize) {
              this.imageIndex -= this.rowSize;
            }
            break;
          case "D":
            if (max - this.imageIndex > this.rowSize) {
              this.imageIndex += this.rowSize;
            }
            break;
          case "L":
            if (this.imageIndex > 0) {
              this.imageIndex -= 1;
            }
            break;
          case "R":
            if (this.imageIndex < max - 1) {
              this.imageIndex += 1;
            }
            break;
          default:
            break;
        }
        this.elems[this.imageIndex].click();
      }
    });
  }

  clearAllSelection() {
    this.pieceList = [];
    this.moneyLeft = window.localStorage.getItem("maxCost");
    this.elitesHeroesLeft = window.localStorage.getItem("maxNumEliteAndHero");
    this.updateMoneyLeftSpan();
    this.updateNumElitesAndHeroesLeftSpan();
    this.seenIndexes.clear();
    Canvas.clear(canvasList.piece, DW, DH);
  }

  updatePowerName() {
    for (let i = 0; i < PowerList.length; i++) {
      let option = document.createElement("option");
      option.value = PowerList[i];
      let powerRealName = useMandarin ? M_PowerMap.get(option.value) : PowerMap.get(option.value);
      option.text = powerRealName;
      powerSelect.add(option);
      powerSelect.add(option);
    }

    let powerNum = `power${this.player}`;
    if (window.localStorage.getItem(powerNum) != null) powerSelect.value = window.localStorage.getItem(powerNum);
  }
}
