import * as AttackActions from "./actions/attack.js";
import * as MoveActions from "./actions/move.js";
import { Canvas, Rect, CreateRect } from "./tools.js";
import * as OpDraw from "./prompts/operationDrawings.js";
import * as InfoDraw from "./prompts/infoDrawings.js";
import {
  GameWidth as W,
  GameHeight as H,
  SelectPieceColor as SPC,
  SelectEnemyColor as SEC,
  ReadyToAttackColor as RTA,
  DirectMap,
} from "./const.js";
import { moveAligned } from "./actions/moveAligned.js";

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
    this.currentStatus = "no selection";

    this.operatedPieces = new Set();
    this.operableNum = 0;

    this.addPieces = function (pc1, pc2) {
      this.pieceList = pc1;
      this.enemyList = pc2;
    };

    // =================================================================================
    // =============================== Helper Functions ================================
    // =================================================================================
    this.clearForNoSelection = function () {
      this.nowSelectPiece = null;
      this.nowSelectEnemy = null;
      this.curAvailablePos = null;
      this.curAvailableTargets = null;
      this.currentStatus = "no selection";
      Canvas.clear(this.canvasList.main, W, H);
    };

    this.leadershipChangesAccordingToToll = function () {
      let deathSocre = 0;
      for (let i = this.pieceList.length - 1; i >= 0; i--) {
        if (!this.pieceList[i].isAlive) {
          deathSocre += this.pieceList[i].cost;
          this.pieceList.splice(i, 1);
        }
      }
      deathSocre = Math.round(deathSocre / 10);
      for (let i = 0; i < this.enemyList.length; i++) {
        this.enemyList[i].c_leadership += deathSocre;
        if (this.enemyList[i].c_leadership > this.enemyList[i].leadership)
          this.enemyList[i].c_leadership = this.enemyList[i].leadership;
      }
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].c_leadership -= deathSocre;
        if (this.pieceList[i].c_leadership < 0)
          this.pieceList[i].c_leadership = 0;
      }
    };

    this.drawPieces = function () {
      for (let i = 0; i < this.pieceList.length; i++) {
        // limit the max level for the comrade pieces
        if (this.pieceList[i].level === 3) this.pieceList[i].exp = 0;
        // draw the comrade pieces
        this.pieceList[i].draw(this.canvasList.piece, this.playerColor);
      }
    };

    this.checkAndDisableArms = function () {
      let max = Math.floor(
        Math.sqrt(this.pieceList.length + this.enemyList.length)
      );
      this.operableNum = max - this.operatedPieces.size;
      if (this.operatedPieces.size >= max) {
        for (let i = 0; i < this.pieceList.length; i++) {
          if (!this.operatedPieces.has(this.pieceList[i]))
            this.pieceList[i].optOut();
        }
      }
    };

    this.drawSelectionEffect = function () {
      if (this.nowSelectPiece != null) {
        let color = SPC;
        if (this.currentStatus === "ready to attack") {
          color = RTA;
        }
        OpDraw.drawSelectionRect(
          this.canvasList.main,
          this.nowSelectPiece,
          color
        );
        InfoDraw.drawInfoForSelectedPiece(
          this.canvasList.info,
          this.nowSelectPiece,
          this.useMandarin
        );
      }

      if (this.nowSelectEnemy != null) {
        OpDraw.drawSelectionRect(
          this.canvasList.main,
          this.nowSelectEnemy,
          SEC
        );
        InfoDraw.drawInfoForSelectedPiece(
          this.canvasList.info,
          this.nowSelectEnemy,
          this.useMandarin
        );
      }
    };

    this.drawEffects = function () {
      for (let i = this.effectList.length - 1; i >= 0; i--) {
        if (!this.effectList[i].isAlive) this.effectList.splice(i, 1);
      }
      if (this.effectList.length > 0) {
        for (let i = 0; i < this.effectList.length; i++) {
          this.effectList[i].draw();
        }
      }
    };

    // =================================================================================
    // =============================== Specific Actions ================================
    // =================================================================================
    this.getSelectedPieceReadyToMove = function (x, y) {
      let len = this.pieceList.length;
      let p = 0;
      for (p = 0; p < len; p++) {
        if (Rect.pointInRect({ x: x, y: y }, this.pieceList[p])) {
          this.clearForNoSelection();
          this.nowSelectPiece = this.pieceList[p];
          let blockers = this.pieceList.concat(this.enemyList);
          this.curAvailablePos = OpDraw.drawAvailableDestinations(
            this.canvasList.main,
            this.nowSelectPiece,
            blockers
          );
          this.currentStatus = "ready to move";
          return true;
        }
      }
      if (p === len) this.clearForNoSelection();
      return false;
    };

    this.selectAnEnemyPiece = function (x, y) {
      let len = this.enemyList.length;
      let p = 0;
      for (p = 0; p < len; p++) {
        if (Rect.pointInRect({ x: x, y: y }, this.enemyList[p])) {
          this.clearForNoSelection();
          this.nowSelectEnemy = this.enemyList[p];
          return true;
        }
      }
      if (p === len) this.clearForNoSelection();
      return false;
    };

    this.moveSelectedPieceToDestination = function (x, y) {
      let len = this.curAvailablePos.length;
      let c = 0;
      for (c = 0; c < len; c++) {
        let _x = this.curAvailablePos[c][0];
        let _y = this.curAvailablePos[c][1];
        let rect = CreateRect(_x, _y, 50, 50);
        if (Rect.pointInRect({ x: x, y: y }, rect)) {
          let toPosition = [
            this.curAvailablePos[c][0],
            this.curAvailablePos[c][1],
          ];
          let blockers = this.pieceList.concat(this.enemyList);
          MoveActions.moveToPosition(this.nowSelectPiece, toPosition, blockers);
          this.operatedPieces.add(this.nowSelectPiece);
          this.clearForNoSelection();
          return true;
        }
      }
      if (c === len) this.clearForNoSelection();
      return false;
    };

    this.letSelectedPieceAttackTarget = function (x, y) {
      let len = this.curAvailableTargets.length;
      let c = 0;
      for (c = 0; c < len; c++) {
        let target = this.curAvailableTargets[c];
        if (Rect.pointInRect({ x: x, y: y }, target)) {
          AttackActions.armAttackArm(
            this.nowSelectPiece,
            target,
            this.enemyList
          );
          this.operatedPieces.add(this.nowSelectPiece);
          this.clearForNoSelection();
          return true;
        }
      }
      if (c === len) this.clearForNoSelection();
      return false;
    };

    this.letSelectedPieceBombArea = function (x, y) {
      let len = this.curAvailableTargets.length;
      let c = 0;
      for (c = 0; c < len; c++) {
        let center = this.curAvailableTargets[c];
        let rect = CreateRect(center[0], center[1], 50, 50);
        let affected = this.pieceList.concat(this.enemyList);
        if (Rect.pointInRect({ x: x, y: y }, rect)) {
          AttackActions.armBombArea(this.nowSelectPiece, center, affected);
          this.operatedPieces.add(this.nowSelectPiece);
          this.clearForNoSelection();
          return true;
        }
      }
      if (c === len) this.clearForNoSelection();
      return false;
    };

    // =================================================================================
    // ==================== Click Mouse to Trigger Specific Actions ====================
    // =================================================================================
    this.mouseClickingEvents = function (e) {
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
      else if (
        this.currentStatus === "ready to attack" &&
        !this.nowSelectPiece.hasAttacked
      ) {
        if (!this.nowSelectPiece.isBombing) {
          if (this.letSelectedPieceAttackTarget(x, y)) return;
        } else {
          if (this.letSelectedPieceBombArea(x, y)) return;
        }
      }
    };

    // =================================================================================
    // ================================ Key Down Events ================================
    // =================================================================================
    this.keyDownEvents = function (e) {
      if (this.isMyRound && e.code.includes("Arrow")) {
        e.preventDefault();
        let direction = DirectMap.get(e.code);
        moveAligned(this.pieceList, this.enemyList, direction);
      }

      if (
        (e.code == "KeyA" ||
          e.code == "KeyL" ||
          e.code == "ShiftRight" ||
          e.code == "ShiftLeft") &&
        this.nowSelectPiece != null &&
        this.nowSelectPiece.operable &&
        !this.nowSelectPiece.hasAttacked
      ) {
        if (this.currentStatus === "ready to move") {
          Canvas.clear(this.canvasList.main, W, H);
          this.curAvailablePos = null;
          this.curAvailableTargets = OpDraw.drawAvailableTargets(
            this.canvasList.main,
            this.nowSelectPiece,
            this.enemyList
          );
          this.currentStatus = "ready to attack";
        } else if (this.currentStatus === "ready to attack") {
          Canvas.clear(this.canvasList.main, W, H);
          this.curAvailableTargets = null;
          let blockers = this.pieceList.concat(this.enemyList);
          this.curAvailablePos = OpDraw.drawAvailableDestinations(
            this.canvasList.main,
            this.nowSelectPiece,
            blockers
          );
          this.currentStatus = "ready to move";
        }
      }
    };

    document.addEventListener("keydown", (e) => {
      this.keyDownEvents(e);
    });

    // =================================================================================
    // ================== Execute All Actions Required for One Loop  ===================
    // =================================================================================
    this.executeOneLoop = function () {
      // Change leadership of comrades and enemies according to the death tolls of both sides
      this.leadershipChangesAccordingToToll();
      // limit the max level for the comrade pieces and draw the comrade pieces
      this.drawPieces();
      // Disable all arms if there are N arms already operated
      this.checkAndDisableArms();
      // draw selection effect
      this.drawSelectionEffect();
    };
  }
}
