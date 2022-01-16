import { Player } from "./player.js";
import { Canvas, Rect } from "./tools.js";
import {
  GameWidth as W,
  GameHeight as H,
  InfoWidth as IW,
  InfoHeight as IH,
} from "./const.js";
import * as EmpireArms from "./arms/empire/empireArms.js";
import * as NordFortArms from "./arms/nordfort/nordfortArms.js";
import * as DimwoodsArms from "./arms/dimwoods/dimwoodsArms.js";

const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  main: document.getElementById("main").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
  info: document.getElementById("info").getContext("2d"),
};

let pos1 = [
  [5, 1],
  [5, 3],
  [5, 5],
  [5, 7],
  [5, 9],
  [5, 11],
  [5, 13],
  [7, 1],
  [7, 3],
  [7, 5],
  [7, 7],
  [7, 9],
  [7, 11],
  [7, 13],
];

let pos2 = [
  [10, 1],
  [10, 3],
  [10, 5],
  [10, 7],
  [10, 9],
  [10, 11],
  [10, 13],
  [12, 1],
  [12, 3],
  [12, 5],
  [12, 7],
  [12, 9],
  [12, 11],
  [12, 13],
];

let pieces1 = [
  new EmpireArms.Vanguard(pos1[0]),
  new EmpireArms.Vanguard(pos1[1]),
  new EmpireArms.Vanguard(pos1[2]),
  new EmpireArms.Vanguard(pos1[3]),
  new EmpireArms.Vanguard(pos1[4]),
  new EmpireArms.Vanguard(pos1[5]),
  new EmpireArms.Vanguard(pos1[6]),

  new NordFortArms.FlameKnight(pos2[0]),
  new NordFortArms.FlameKnight(pos2[1]),
  new NordFortArms.FlameKnight(pos2[2]),
  new NordFortArms.FlameKnight(pos2[3]),
  new NordFortArms.FlameKnight(pos2[4]),
  new NordFortArms.FlameKnight(pos2[5]),
  new NordFortArms.FlameKnight(pos2[6]),
];
let pieces2 = [
  new EmpireArms.SwordInfantry(pos1[7]),
  new EmpireArms.PalaceGuard(pos1[8]),
  new NordFortArms.HallwayGuard(pos1[9]),
  new NordFortArms.NordExecutioner(pos1[10]),
  new DimwoodsArms.WoodsGuard(pos1[11]),
  new DimwoodsArms.WildKiller(pos1[12]),
  new DimwoodsArms.Dryad(pos1[13]),

  new EmpireArms.SwordInfantry(pos2[7]),
  new EmpireArms.PalaceGuard(pos2[8]),
  new NordFortArms.HallwayGuard(pos2[9]),
  new NordFortArms.NordExecutioner(pos2[10]),
  new DimwoodsArms.WoodsGuard(pos2[11]),
  new DimwoodsArms.WildKiller(pos2[12]),
  new DimwoodsArms.Dryad(pos2[13]),
];

let player1 = new Player(pieces1, pieces2, "blue", canvasList);
let player2 = new Player(pieces2, pieces1, "red", canvasList);

function start() {
  let maxX = Math.floor(W / 50);
  let maxY = Math.floor(H / 50);

  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      Canvas.drawRect(canvasList.map, i * 50, j * 50, 50, 50, "black");
    }
  }

  // Main game loop, every 20 ms
  setInterval(() => {
    Canvas.clear(canvasList.piece, W, H);
    Canvas.clear(canvasList.info, IW, IH);

    player1.drawForOneLoop();
    player2.drawForOneLoop();
  }, 20);
}

// =================== Refreshing Round Button ===================
let endRoundForBlue = document.getElementById("endRoundForBlue");
let endRoundForRed = document.getElementById("endRoundForRed");
endRoundForBlue.onclick = (e) => {
  endRoundForBlue.style.backgroundColor = "";
  endRoundForRed.style.backgroundColor = "red";
  player1.isMyRound = false;
  player2.isMyRound = true;
  player1.clearWhenNoSelection();
  for (let i = 0; i < player2.pieceList.length; i++) {
    player2.pieceList[i].roundRefresh();
  }
};
endRoundForRed.onclick = (e) => {
  endRoundForBlue.style.backgroundColor = "blue";
  endRoundForRed.style.backgroundColor = "";
  player1.isMyRound = true;
  player2.isMyRound = false;
  player2.clearWhenNoSelection();
  for (let i = 0; i < player1.pieceList.length; i++) {
    player1.pieceList[i].roundRefresh();
  }
};

// =================== Mouse Selection Event ===================
let select = document.getElementById("select");
select.onclick = (e) => {
  if (player1.isMyRound && !player2.isMyRound) {
    player1.clickMouse(e);
  } else {
    player2.clickMouse(e);
  }
};

start();

// new EmpireArms.Vanguard(pos2[4]),
// new EmpireArms.PalaceKnight(pos2[5]),
// new EmpireArms.SteamTank(pos2[6]),
// new EmpireArms.SteamTank(pos2[7]),

// new NordFortArms.HallwayGuard(pos2[0]),
// new NordFortArms.NordExecutioner(pos2[1]),
// new NordFortArms.CoastDefender(pos2[2]),
// new NordFortArms.CoastDefenderShield(pos2[3]),
// new NordFortArms.BallistaSquad(pos2[4]),
// new NordFortArms.FlameKnight(pos2[5]),
// new NordFortArms.CoralCavalry(pos2[6]),
// new NordFortArms.StoneGiant(pos2[7]),
