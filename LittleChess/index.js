import * as EmpireArms from "./arms/empire/empireArms.js";
import * as NordFortArms from "./arms/nordfort/nordfortArms.js";
import * as AttackActions from "./actions/attack.js";
import * as MoveActions from "./actions/move.js";
import { Canvas, Rect } from "./tools.js";
import * as OpDraw from "./prompts/operationDrawings.js";
import * as InfoDraw from "./prompts/infoDrawings.js";
import {
  GameWidth as W,
  GameHeight as H,
  InfoWidth as IW,
  InfoHeight as IH,
} from "./const.js";

class Game {
  constructor(pieces) {
    this.canvasList = {
      map: document.getElementById("map").getContext("2d"),
      main: document.getElementById("main").getContext("2d"),
      piece: document.getElementById("piece").getContext("2d"),
      select: document.getElementById("select").getContext("2d"),
      info: document.getElementById("info").getContext("2d"),
    };
    this.pieceList = pieces;
    this.timer = 0;
    this.nowSelectPiece = null;
    this.curAvailablePos = null;
    this.curAvailableTargets = null;

    this.preventSelect = false;

    let refreshRoundButton = document.getElementById("refreshRound");
    refreshRoundButton.onclick = (e) => {
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].roundRefresh();
      }
    };

    let select = document.getElementById("select");
    select.onclick = (e) => {
      let x = e.offsetX || e.layerX;
      let y = e.offsetY || e.layerY;

      // Click to let the selected piece attack the target
      if (
        this.curAvailableTargets != null &&
        this.nowSelectPiece != null &&
        !this.nowSelectPiece.hasAttacked &&
        !this.preventSelect
      ) {
        let c = 0;
        for (c = 0; c < this.curAvailableTargets.length; c++) {
          let target = this.curAvailableTargets[c];
          if (Rect.pointInRect({ x: x, y: y }, target)) {
            AttackActions.armAttackArm(
              this.nowSelectPiece,
              target,
              this.pieceList
            );
            this.preventSelect = true;
            this.curAvailableTargets = null;
            this.curAvailablePos = null;
            this.nowSelectPiece = null;
            Canvas.clear(this.canvasList.main, W, H);
            break;
          }
        }

        if (
          this.curAvailableTargets != null &&
          c === this.curAvailableTargets.length
        ) {
          this.curAvailableTargets = null;
          this.curAvailablePos = null;
          this.nowSelectPiece = null;
          Canvas.clear(this.canvasList.main, W, H);
        }
      }

      // Click to move selected piece
      if (this.curAvailablePos != null && this.nowSelectPiece != null) {
        let c = 0;
        for (c = 0; c < this.curAvailablePos.length; c++) {
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
            MoveActions.moveToPosition(
              this.nowSelectPiece,
              toPosition,
              this.pieceList
            );
            break;
          }
        }

        if (c === this.curAvailablePos.length) {
          Canvas.clear(this.canvasList.main, W, H);
          this.curAvailablePos = null;
        }
      }

      // Click to select piece
      if (!this.preventSelect) {
        let p = 0;
        for (p = 0; p < this.pieceList.length; p++) {
          if (Rect.pointInRect({ x: x, y: y }, this.pieceList[p])) {
            this.curAvailableTargets = null;
            this.curAvailablePos = null;

            this.nowSelectPiece = this.pieceList[p];
            Canvas.clear(this.canvasList.main, W, H);

            this.curAvailablePos = OpDraw.drawAvailableDestinations(
              this.canvasList.main,
              this.nowSelectPiece,
              this.pieceList
            );

            break;
          }
        }

        if (p === this.pieceList.length) {
          Canvas.clear(this.canvasList.main, W, H);

          this.curAvailableTargets = null;
          this.curAvailablePos = null;
          this.nowSelectPiece = null;
        }
      }
    };

    // Press 'A' to switch between 'attack' and 'move'
    document.addEventListener("keydown", (e) => {
      if (
        e.code == "KeyA" &&
        this.nowSelectPiece != null &&
        !this.nowSelectPiece.hasAttacked
      ) {
        if (this.curAvailableTargets == null && this.curAvailablePos != null) {
          this.curAvailablePos = null;
          Canvas.clear(this.canvasList.main, W, H);

          this.curAvailableTargets = OpDraw.drawAvailableTargets(
            this.canvasList.main,
            this.nowSelectPiece,
            this.pieceList
          );
        } else if (
          this.curAvailableTargets != null &&
          this.curAvailablePos == null
        ) {
          this.curAvailableTargets = null;
          Canvas.clear(this.canvasList.main, W, H);

          this.curAvailablePos = OpDraw.drawAvailableDestinations(
            this.canvasList.main,
            this.nowSelectPiece,
            this.pieceList
          );
        }
      }
    });
  }

  start() {
    let maxX = Math.floor(W / 50);
    let maxY = Math.floor(H / 50);

    for (let i = 0; i < maxX; i++) {
      for (let j = 0; j < maxY; j++) {
        Canvas.drawRect(this.canvasList.map, i * 50, j * 50, 50, 50, "black");
      }
    }

    setInterval(() => {
      this.preventSelect = false;
      Canvas.clear(this.canvasList.piece, W, H);
      Canvas.clear(this.canvasList.info, IW, IH);
      for (let i = this.pieceList.length - 1; i >= 0; i--) {
        if (!this.pieceList[i].isAlive) {
          this.pieceList.splice(i, 1);
        }
      }
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].draw(this.canvasList.piece, "blue");
      }
      if (this.nowSelectPiece != null) {
        Canvas.drawRect(
          this.canvasList.main,
          this.nowSelectPiece.x - 7,
          this.nowSelectPiece.y - 7,
          64,
          64,
          "rgb(50, 195, 50)",
          3
        );
        InfoDraw.drawInfoForSelectedPiece(
          this.canvasList.info,
          this.nowSelectPiece
        );
      }
    }, 20);
  }
}

let pieces = [
  new EmpireArms.Musketeer([9, 5]),
  new EmpireArms.SwordInfantry([6, 3]),
  new EmpireArms.Vanguard([5, 7]),
  new EmpireArms.PalaceGuard([18, 4]),
];

let game = new Game(pieces);
game.start();
