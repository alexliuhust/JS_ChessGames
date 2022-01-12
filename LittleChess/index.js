import * as EmpireArms from "./arms/empire/empireArms.js";
import * as NordFortArms from "./arms/nordfort/nordfortArms.js";
import * as AttackActions from "./actions/attack.js";
import * as MoveActions from "./actions/move.js";
import { Canvas, Rect } from "./tools.js";
import * as OpDraw from "./effect/operationDrawings.js";
import { GameWidth as W, GameHeight as H } from "./const.js";

class Game {
  constructor(pieces) {
    this.canvasList = {
      map: document.getElementById("map").getContext("2d"),
      main: document.getElementById("main").getContext("2d"),
      piece: document.getElementById("piece").getContext("2d"),
      select: document.getElementById("select").getContext("2d"),
    };
    this.pieceList = pieces;
    this.timer = 0;
    this.nowSelectPiece = null;
    this.curAvailablePos = null;

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

        if (c == this.curAvailablePos.length) {
          Canvas.clear(this.canvasList.main, W, H);
          this.curAvailablePos = null;
        }
      }

      let p = 0;
      for (p = 0; p < this.pieceList.length; p++) {
        if (Rect.pointInRect({ x: x, y: y }, this.pieceList[p])) {
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

      if (p == this.pieceList.length) {
        Canvas.clear(this.canvasList.main, W, H);

        this.curAvailablePos = null;
        this.nowSelectPiece = null;
      }
    };
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
      Canvas.clear(this.canvasList.piece, W, H);
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].draw(this.canvasList.piece);
        Canvas.drawRect(
          this.canvasList.piece,
          this.pieceList[i].x,
          this.pieceList[i].y,
          50,
          50,
          "red",
          2
        );
      }
    }, 20);
  }
}

let pieces = [
  new EmpireArms.SwordInfantry([1, 4]),
  new EmpireArms.Musketeer([9, 5]),
  new EmpireArms.Vanguard([4, 7]),
];

let game = new Game(pieces);
game.start();
