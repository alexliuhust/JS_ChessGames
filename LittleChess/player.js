import * as AttackActions from "./actions/attack.js";
import * as MoveActions from "./actions/move.js";
import { Canvas, Rect } from "./tools.js";
import * as OpDraw from "./prompts/operationDrawings.js";
import * as InfoDraw from "./prompts/infoDrawings.js";
import {
  GameWidth as W,
  GameHeight as H,
  SelectPieceColor as SPC,
  SelectEnemyColor as SEC,
  ReadyToAttackColor as RTA,
} from "./const.js";

export class Player {
  constructor(pieces, enemies, color, _canvaslist) {
    this.timer = 0;
    this.isMyRound = color === "blue";
    this.canvasList = _canvaslist;

    this.playerColor = color;
    this.pieceList = pieces;
    this.enemyList = enemies;

    this.nowSelectPiece = null;
    this.nowSelectEnemy = null;
    this.curAvailablePos = null;
    this.curAvailableTargets = null;
    this.currentStatus = "no selection";

    this.clearForNoSelection = function () {
      this.nowSelectPiece = null;
      this.nowSelectEnemy = null;
      this.curAvailablePos = null;
      this.curAvailableTargets = null;
      this.currentStatus = "no selection";
      Canvas.clear(this.canvasList.main, W, H);
    };

    // =================== Drawing ===================
    this.drawForOneLoop = function () {
      // delete those dead arms
      for (let i = this.pieceList.length - 1; i >= 0; i--) {
        if (!this.pieceList[i].isAlive) {
          this.pieceList.splice(i, 1);
        }
      }

      // draw the comrade pieces
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].draw(this.canvasList.piece, this.playerColor);
      }

      // draw selection effect
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
          this.nowSelectPiece
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
          this.nowSelectEnemy
        );
      }
    };

    // =================== Mouse Clicking Events ===================
    this.clickMouse = function (e) {
      if (!this.isMyRound) {
        return;
      }

      let x = e.offsetX || e.layerX;
      let y = e.offsetY || e.layerY;

      // Click to select a piece and make it ready to move if it is a comrade piece
      if (this.currentStatus === "no selection") {
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
            return;
          }
        }
        if (p === len) this.clearForNoSelection();

        len = this.enemyList.length;
        p = 0;
        for (p = 0; p < len; p++) {
          if (Rect.pointInRect({ x: x, y: y }, this.enemyList[p])) {
            this.clearForNoSelection();
            this.nowSelectEnemy = this.enemyList[p];
            return;
          }
        }
        if (p === len) this.clearForNoSelection();
      }

      // Click to move the selected piece
      else if (this.currentStatus === "ready to move") {
        let len = this.curAvailablePos.length;
        let c = 0;
        for (c = 0; c < len; c++) {
          let rect = {
            x: this.curAvailablePos[c][0] * 50,
            y: this.curAvailablePos[c][1] * 50,
            width: 50,
            height: 50,
          };
          if (Rect.pointInRect({ x: x, y: y }, rect)) {
            let toPosition = [
              this.curAvailablePos[c][0],
              this.curAvailablePos[c][1],
            ];
            let blockers = this.pieceList.concat(this.enemyList);
            MoveActions.moveToPosition(
              this.nowSelectPiece,
              toPosition,
              blockers
            );
            this.clearForNoSelection();
            break;
          }
        }
        if (c === len) this.clearForNoSelection();
      }

      // Click to let the selected piece attack the target
      else if (
        this.currentStatus === "ready to attack" &&
        !this.nowSelectPiece.hasAttacked
      ) {
        // Non-bombing arms
        if (!this.nowSelectPiece.isBombing) {
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
              this.clearForNoSelection();
              break;
            }
          }
          if (c === len) this.clearForNoSelection();
        }

        // Bombing arms
        else {
          let len = this.curAvailableTargets.length;
          let c = 0;
          for (c = 0; c < len; c++) {
            let center = this.curAvailableTargets[c];
            let rect = {
              x: center[0] * 50,
              y: center[1] * 50,
              width: 50,
              height: 50,
            };
            let affected = this.pieceList.concat(this.enemyList);
            if (Rect.pointInRect({ x: x, y: y }, rect)) {
              AttackActions.armBombArea(this.nowSelectPiece, center, affected);
              this.clearForNoSelection();
              break;
            }
          }
          if (c === len) this.clearForNoSelection();
        }
      }
    };

    // =================== Key Down Events ===================
    document.addEventListener("keydown", (e) => {
      // Press 'A' or 'L' to switch between 'attack' and 'move'
      if (
        (e.code == "KeyA" || e.code == "KeyL") &&
        this.nowSelectPiece != null &&
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
    });
  }
}
