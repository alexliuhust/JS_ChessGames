import * as EmpireArms from "./arms/empire/empireArms.js";
import * as NordFortArms from "./arms/nordfort/nordfortArms.js";
import * as AttackActions from "./actions/attack.js";
import * as MoveActions from "./actions/move.js";
import { Canvas, T } from "./tools.js";

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

    this.initBind = function () {
      let select = document.getElementById("select");

      select.onclick = function (e) {
        let x = e.offsetX || e.layerX;
        let y = e.offsetY || e.layerY;

        for (var i = 0; i < this.pieceList.length; i++) {
          if (T.pointInRect({ x: x, y: y }, this.pieceList[i])) {
            console.log("Selected: ", this.pieceList[i].name);

            this.nowSelectPiece = this.pieceList[i];

            break;
          }
        }

        if (i == this.pieceList.length) {
          Canvas.clear(this.canvasList.select, 500, 1000);

          this.nowSelectPiece = null;
        }
      };
    };
  }

  start() {
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 10; j++) {
        Canvas.drawRect(this.canvasList.map, i * 50, j * 50, 50, 50, "black");
      }
    }

    setInterval(() => {
      //console.log(this.pieceList);
      Canvas.clear(this.canvasList.main, 1200, 500);
      Canvas.clear(this.canvasList.piece, 1200, 500);
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].draw(this.canvasList.piece);
      }
    }, 20);
  }
}

let pieces = [
  new EmpireArms.SwordInfantry([1, 4]),
  new EmpireArms.Musketeer([2, 5]),
  new EmpireArms.Vanguard([4, 7]),
];

let game = new Game(pieces);
game.start();
