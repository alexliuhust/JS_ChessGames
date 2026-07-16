import * as AttackActions from "../actions/attack.js";
import * as MoveActions from "../actions/move.js";
import * as OpDraw from "../prompts/operationDrawings.js";
import { InfoPanel } from "../prompts/infoDrawings.js";
import { Canvas, Rect, CreateRect } from "./tools.js";
import { moveAligned } from "../actions/moveAligned.js";
import { tryRetreat } from "../actions/retreat.js";
import {
  GameWidth as W,
  GameHeight as H,
  SelectPieceColor as SPC,
  SelectEnemyColor as SEC,
  ReadyToAttackColor as RTA,
  DirectMap,
} from "./const.js";

export class Player {
  constructor(color, _canvaslist, _useMandarin) {
    this.useMandarin = _useMandarin;
    this.timer = 0;
    this.currentRound = 1;
    this.isMyRound = false;
    this.playerNumber = color === "red" ? 2 : 1;
    this.canvasList = _canvaslist;
    this.effectList = [];

    this.playerColor = color;
    this.pieceList = [];
    this.enemyList = [];

    this.nowSelectPiece = null;
    this.nowSelectEnemy = null;
    this.curAvailablePos = null;
    this.curAvailableTargets = null;
    this.curAvailableCenters = null;
    this.currentStatus = "no selection";

    this.operatedPieces = new Set();
    this.operableNum = 0;
    this.maxOperations = 0;

    this.reckoningDiv = document.getElementById(`reckoningDiv${this.playerNumber}`);
    this.power = window.localStorage.getItem(`power${this.playerNumber}`);

    this.infoPanel = new InfoPanel(this.canvasList.info, this.useMandarin, false, true);

    document.addEventListener("keydown", (e) => {
      this.keyDownEvents(e);
    });
  }

  addPieces(pc1, pc2) {
    this.pieceList = pc1;
    this.enemyList = pc2;
  }

  refresh() {
    this.maxOperations = Math.floor(Math.sqrt((this.pieceList.length + this.enemyList.length) * 2));
    tryRetreat(this.playerNumber, this.pieceList, this.enemyList);
  }

  // =================================================================================
  // =============================== Helper Functions ================================
  // =================================================================================

  clearForNoSelection() {
    this.nowSelectPiece = null;
    this.nowSelectEnemy = null;
    this.curAvailablePos = null;
    this.curAvailableTargets = null;
    this.currentStatus = "no selection";
    Canvas.clear(this.canvasList.main, W, H);
  }

  addDeadPieceToReckoningList(piece) {
    // item wrapper
    const itemDiv = document.createElement("div");
    itemDiv.className = "d-flex";

    // image column
    const imgCol = document.createElement("div");
    imgCol.className = "p-2";

    const img = document.createElement("img");

    img.src = `../images/${this.power}/${piece.constructor.name}.png`;
    img.style.width = "60px";
    img.style.height = "60px";

    imgCol.appendChild(img);

    // text column
    const textCol = document.createElement("div");
    textCol.className = "p-2";

    const nameSpan = document.createElement("span");
    nameSpan.style.fontSize = "20px";
    nameSpan.textContent = this.useMandarin ? piece.m_name : piece.name;

    const br = document.createElement("br");

    const statsRow = document.createElement("div");
    statsRow.className = "d-flex";
    statsRow.style.fontSize = "17px";

    const killDiv = document.createElement("div");
    killDiv.className = "p-2";
    killDiv.style.width = "150px";
    killDiv.textContent = `${this.useMandarin ? "杀敌数" : "Kill count"}: ${piece.killCount}`;

    const damageDiv = document.createElement("div");
    damageDiv.className = "p-2";
    damageDiv.style.width = "210px";
    damageDiv.textContent = `${this.useMandarin ? "伤害输出" : "Damage output"}: ${piece.damageOutput}`;

    const valueDiv = document.createElement("div");
    valueDiv.className = "p-2";
    valueDiv.style.width = "210px";
    valueDiv.textContent = `${this.useMandarin ? "贡献价值" : "Value created"}: ${Math.round(piece.valueCreated)}G`;

    statsRow.appendChild(killDiv);
    statsRow.appendChild(damageDiv);
    statsRow.appendChild(valueDiv);

    textCol.appendChild(nameSpan);
    textCol.appendChild(br);
    textCol.appendChild(statsRow);

    itemDiv.appendChild(imgCol);
    itemDiv.appendChild(textCol);

    this.reckoningDiv.appendChild(itemDiv);
  }

  leadershipChangesAccordingToToll() {
    let leadershipChange = 0;
    for (let i = this.pieceList.length - 1; i >= 0; i--) {
      if (!this.pieceList[i].isAlive) {
        this.addDeadPieceToReckoningList(this.pieceList[i]);
        leadershipChange += this.pieceList[i].cost / 10;
        this.pieceList.splice(i, 1);
      }
    }
    leadershipChange = Math.round(leadershipChange);

    for (let i = 0; i < this.enemyList.length; i++) {
      this.enemyList[i].c_leadership += leadershipChange;
      if (this.enemyList[i].c_leadership > this.enemyList[i].leadership)
        this.enemyList[i].c_leadership = this.enemyList[i].leadership;
    }
    for (let i = 0; i < this.pieceList.length; i++) {
      if (!this.pieceList[i].isHighMorale()) {
        this.pieceList[i].c_leadership -= leadershipChange;
      }
    }
  }

  drawPieces() {
    for (let i = 0; i < this.pieceList.length; i++) {
      // limit the max level for the comrade pieces
      if (this.pieceList[i].level === 3) this.pieceList[i].exp = 0;
      // draw the comrade pieces
      this.pieceList[i].draw(this.canvasList.piece, this.playerColor);
    }
  }

  checkAndDisableArms() {
    this.operableNum = this.maxOperations - this.operatedPieces.size;
    if (this.operatedPieces.size >= this.maxOperations) {
      for (let i = 0; i < this.pieceList.length; i++) {
        if (!this.operatedPieces.has(this.pieceList[i])) this.pieceList[i].optOut();
      }
    }
  }

  drawSelectionEffect() {
    if (this.nowSelectPiece != null) {
      let color = SPC;
      if (this.currentStatus === "ready to attack") color = RTA;
      OpDraw.drawSelectionRect(this.canvasList.main, this.nowSelectPiece, color);
    } else if (this.nowSelectEnemy != null) {
      OpDraw.drawSelectionRect(this.canvasList.main, this.nowSelectEnemy, SEC);
    }
  }

  drawSelectionInfo() {
    if (this.nowSelectPiece != null) {
      this.infoPanel.drawInfoForSelectedPiece(this.nowSelectPiece);
    } else if (this.nowSelectEnemy != null) {
      this.infoPanel.drawInfoForSelectedPiece(this.nowSelectEnemy);
    }
  }

  drawEffects() {
    for (let i = this.effectList.length - 1; i >= 0; i--) {
      if (!this.effectList[i].isAlive) this.effectList.splice(i, 1);
    }
    if (this.effectList.length > 0) {
      for (let i = 0; i < this.effectList.length; i++) {
        this.effectList[i].draw();
      }
    }
  }

  allEffectsFinished() {
    for (let i = 0; i < this.effectList.length; i++) {
      if (this.effectList[i].isAlive) {
        return false;
      }
    }
    return true;
  }

  // =================================================================================
  // =============================== Specific Actions ================================
  // =================================================================================
  getSelectedPieceReadyToMove(x, y) {
    let len = this.pieceList.length;
    let p = 0;
    for (p = 0; p < len; p++) {
      if (Rect.pointInRect({ x: x, y: y }, this.pieceList[p])) {
        this.clearForNoSelection();
        this.nowSelectPiece = this.pieceList[p];
        this.drawSelectionEffect();
        if (this.nowSelectPiece.operable) {
          let blockers = this.pieceList.concat(this.enemyList);
          this.curAvailablePos = OpDraw.drawAvailableDestinations(this.canvasList.main, this.nowSelectPiece, blockers);
        }
        this.currentStatus = "ready to move";
        return true;
      }
    }
    if (p === len) this.clearForNoSelection();
    return false;
  }

  selectAnEnemyPiece(x, y) {
    let len = this.enemyList.length;
    let p = 0;
    for (p = 0; p < len; p++) {
      if (Rect.pointInRect({ x: x, y: y }, this.enemyList[p])) {
        this.clearForNoSelection();
        this.nowSelectEnemy = this.enemyList[p];
        this.drawSelectionEffect();
        return true;
      }
    }
    if (p === len) this.clearForNoSelection();
    return false;
  }

  moveSelectedPieceToDestination(x, y) {
    if (this.nowSelectPiece.operable) {
      let len = this.curAvailablePos.length;
      let c = 0;
      for (c = 0; c < len; c++) {
        let _x = this.curAvailablePos[c][0];
        let _y = this.curAvailablePos[c][1];
        let rect = CreateRect(_x, _y, 50, 50);
        if (Rect.pointInRect({ x: x, y: y }, rect)) {
          let toPosition = [this.curAvailablePos[c][0], this.curAvailablePos[c][1]];
          let blockers = this.pieceList.concat(this.enemyList);
          MoveActions.moveToPosition(this.nowSelectPiece, toPosition, blockers);
          this.operatedPieces.add(this.nowSelectPiece);
          this.clearForNoSelection();
          return true;
        }
      }
      if (c === len) this.clearForNoSelection();
    }

    return false;
  }

  letSelectedPieceAttackTarget(x, y) {
    if (this.curAvailableTargets === null) return false;
    let len = this.curAvailableTargets.length;
    let c = 0;
    for (c = 0; c < len; c++) {
      let target = this.curAvailableTargets[c];
      if (Rect.pointInRect({ x: x, y: y }, target)) {
        AttackActions.armAttackArm(this.nowSelectPiece, target, this.enemyList);
        this.operatedPieces.add(this.nowSelectPiece);
        this.clearForNoSelection();
        return true;
      }
    }
    if (c === len) this.clearForNoSelection();
    return false;
  }

  // =================================================================================
  // ==================== Click Mouse to Trigger Specific Actions ====================
  // =================================================================================
  mouseClickingEvents(e) {
    if (!this.isMyRound) {
      return;
    }

    let x = e.offsetX || e.layerX;
    let y = e.offsetY || e.layerY;

    // Click to select a piece, and make it ready to move if it is a comrade piece
    if (this.currentStatus === "no selection") {
      if (this.getSelectedPieceReadyToMove(x, y)) return;
      if (this.selectAnEnemyPiece(x, y)) return;
    }

    // Click to move the selected piece, or select another piece
    else if (this.currentStatus === "ready to move") {
      if (this.moveSelectedPieceToDestination(x, y)) return;
      if (this.getSelectedPieceReadyToMove(x, y)) return;
      if (this.selectAnEnemyPiece(x, y)) return;
    }

    // Click to let the selected piece attack the target
    else if (this.currentStatus === "ready to attack" && !this.nowSelectPiece.hasAttacked) {
      if (this.letSelectedPieceAttackTarget(x, y)) return;
    }
  }

  // =================================================================================
  // ================================== Key Events ===================================
  // =================================================================================
  keyDownEvents(e) {
    if (this.nowSelectPiece != null && this.isMyRound && (e.code.includes("KeyC") || e.code == "KeyS")) {
      this.nowSelectPiece.autofireEnable = !this.nowSelectPiece.autofireEnable;
      this.nowSelectPiece.preMissileTarget = null;
      this.clearForNoSelection();
    }

    if (this.isMyRound && e.code.includes("Control")) {
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].showSpeed = !this.pieceList[i].showSpeed;
      }
    }

    if (this.isMyRound && e.code.includes("Arrow")) {
      this.clearForNoSelection();
      e.preventDefault();
      let direction = DirectMap.get(e.code);
      moveAligned(this.pieceList, this.enemyList, direction);
    } else if (
      (e.code == "KeyA" || e.code == "KeyL" || e.code.includes("Shift")) &&
      this.nowSelectPiece != null &&
      this.nowSelectPiece.operable &&
      !this.nowSelectPiece.hasAttacked
    ) {
      if (this.currentStatus === "ready to move") {
        Canvas.clear(this.canvasList.main, W, H);
        this.curAvailablePos = null;
        this.currentStatus = "ready to attack";
        this.drawSelectionEffect();
        let results = OpDraw.drawAvailableTargets(this.canvasList.main, this.nowSelectPiece, this.enemyList);
        this.curAvailableTargets = results[0];
        this.curAvailableCenters = results[1];
      } else if (this.currentStatus === "ready to attack") {
        Canvas.clear(this.canvasList.main, W, H);
        this.curAvailableTargets = null;
        let blockers = this.pieceList.concat(this.enemyList);
        this.currentStatus = "ready to move";
        this.drawSelectionEffect();
        this.curAvailablePos = OpDraw.drawAvailableDestinations(this.canvasList.main, this.nowSelectPiece, blockers);
      }
    }
  }

  // =================================================================================
  // ================== Execute All Actions Required for One Loop  ===================
  // =================================================================================
  executeOneLoop() {
    // Change leadership of comrades and enemies according to the death tolls of both sides
    this.leadershipChangesAccordingToToll();
    // limit the max level for the comrade pieces and draw the comrade pieces
    this.drawPieces();
    // Disable all arms if there are N arms already operated
    this.checkAndDisableArms();
    // draw selection info
    this.drawSelectionInfo();
  }
}
