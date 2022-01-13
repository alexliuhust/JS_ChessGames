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
    this.currentStatus = "no selection";

    this.clearWhenNoSelection = function () {
      this.nowSelectPiece = null;
      this.curAvailablePos = null;
      this.curAvailableTargets = null;
      this.currentStatus = "no selection";
      Canvas.clear(this.canvasList.main, W, H);
    };

    // =================== Refreshing Round Button ===================

    let refreshRoundButton = document.getElementById("refreshRound");
    refreshRoundButton.onclick = (e) => {
      for (let i = 0; i < this.pieceList.length; i++) {
        this.pieceList[i].roundRefresh();
      }
    };

    // =================== Mouse Clicking Events ===================

    let select = document.getElementById("select");
    select.onclick = (e) => {
      let x = e.offsetX || e.layerX;
      let y = e.offsetY || e.layerY;

      // Click to select a piece and make it ready to move
      if (this.currentStatus === "no selection") {
        let len = this.pieceList.length;
        let p = 0;
        for (p = 0; p < len; p++) {
          if (Rect.pointInRect({ x: x, y: y }, this.pieceList[p])) {
            this.clearWhenNoSelection();
            this.nowSelectPiece = this.pieceList[p];
            this.curAvailablePos = OpDraw.drawAvailableDestinations(
              this.canvasList.main,
              this.nowSelectPiece,
              this.pieceList
            );
            this.currentStatus = "ready to move";
            break;
          }
        }
        if (p === len) this.clearWhenNoSelection();
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
            MoveActions.moveToPosition(
              this.nowSelectPiece,
              toPosition,
              this.pieceList
            );
            this.clearWhenNoSelection();
            break;
          }
        }
        if (c === len) this.clearWhenNoSelection();
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
                this.pieceList
              );
              this.clearWhenNoSelection();
              break;
            }
          }
          if (c === len) this.clearWhenNoSelection();
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
            if (Rect.pointInRect({ x: x, y: y }, rect)) {
              AttackActions.armBombArea(
                this.nowSelectPiece,
                center,
                this.pieceList
              );
              this.clearWhenNoSelection();
              break;
            }
          }
          if (c === len) this.clearWhenNoSelection();
        }
      }
    };

    // =================== Key Down Events ===================

    // Press 'A' to switch between 'attack' and 'move'
    document.addEventListener("keydown", (e) => {
      if (
        e.code == "KeyA" &&
        this.nowSelectPiece != null &&
        !this.nowSelectPiece.hasAttacked
      ) {
        if (this.currentStatus === "ready to move") {
          Canvas.clear(this.canvasList.main, W, H);
          this.curAvailablePos = null;
          this.curAvailableTargets = OpDraw.drawAvailableTargets(
            this.canvasList.main,
            this.nowSelectPiece,
            this.pieceList
          );
          this.currentStatus = "ready to attack";
        } else if (this.currentStatus === "ready to attack") {
          Canvas.clear(this.canvasList.main, W, H);
          this.curAvailableTargets = null;
          this.curAvailablePos = OpDraw.drawAvailableDestinations(
            this.canvasList.main,
            this.nowSelectPiece,
            this.pieceList
          );
          this.currentStatus = "ready to move";
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

    // Main game loop, every 20 ms
    setInterval(() => {
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

let pos = [
  [10, 2],
  [9, 3],
  [10, 4],
  [11, 1],
  [11, 5],
  [12, 2],
  [13, 3],
  [12, 4],
];
let pieces = [
  new EmpireArms.EmpireMortar([11, 10]),

  new EmpireArms.SwordInfantry(pos[0]),
  new EmpireArms.PalaceGuard(pos[1]),
  new EmpireArms.Musketeer(pos[2]),
  new EmpireArms.MusketRider(pos[3]),
  new EmpireArms.Vanguard(pos[4]),
  new EmpireArms.PalaceKnight(pos[5]),
  new EmpireArms.SteamTank(pos[6]),
  new EmpireArms.SteamTank(pos[7]),

  // new NordFortArms.HallwayGuard(pos[0]),
  // new NordFortArms.NordExecutioner(pos[1]),
  // new NordFortArms.CoastDefender(pos[2]),
  // new NordFortArms.CoastDefenderShield(pos[3]),
  // new NordFortArms.BallistaSquad(pos[4]),
  // new NordFortArms.FlameKnight(pos[5]),
  // new NordFortArms.CoralCavalry(pos[6]),
  // new NordFortArms.StoneGiant(pos[7]),

  // new EmpireArms.SwordInfantry([1, 5]),
  // new EmpireArms.PalaceGuard([3, 5]),
  // new EmpireArms.Musketeer([5, 5]),
  // new EmpireArms.MusketRider([7, 5]),
  // new EmpireArms.Vanguard([9, 5]),
  // new EmpireArms.PalaceKnight([11, 5]),
  // new EmpireArms.CannonGroup([13, 5]),
  // new EmpireArms.EmpireMortar([15, 5]),
  // new EmpireArms.SteamTank([17, 5]),

  // new NordFortArms.HallwayGuard([1, 7]),
  // new NordFortArms.NordExecutioner([3, 7]),
  // new NordFortArms.CoastDefender([5, 7]),
  // new NordFortArms.CoastDefenderShield([7, 7]),
  // new NordFortArms.BallistaSquad([9, 7]),
  // new NordFortArms.FlameKnight([11, 7]),
  // new NordFortArms.CoralCavalry([13, 7]),
  // new NordFortArms.GiantBallista([15, 7]),
  // new NordFortArms.StoneGiant([17, 7]),
];

let game = new Game(pieces);
game.start();
