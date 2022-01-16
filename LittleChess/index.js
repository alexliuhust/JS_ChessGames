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

const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  main: document.getElementById("main").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
  info: document.getElementById("info").getContext("2d"),
};

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
let pieces1 = [
  new EmpireArms.EmpireMortar([11, 10]),

  new EmpireArms.SwordInfantry(pos[0]),
  new EmpireArms.PalaceGuard(pos[1]),
  new EmpireArms.Musketeer(pos[2]),
  new EmpireArms.MusketRider(pos[3]),
];
let pieces2 = [
  new NordFortArms.BallistaSquad(pos[4]),
  new NordFortArms.FlameKnight(pos[5]),
  new NordFortArms.CoralCavalry(pos[6]),
  new NordFortArms.StoneGiant(pos[7]),
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

// new EmpireArms.Vanguard(pos[4]),
// new EmpireArms.PalaceKnight(pos[5]),
// new EmpireArms.SteamTank(pos[6]),
// new EmpireArms.SteamTank(pos[7]),

// new NordFortArms.HallwayGuard(pos[0]),
// new NordFortArms.NordExecutioner(pos[1]),
// new NordFortArms.CoastDefender(pos[2]),
// new NordFortArms.CoastDefenderShield(pos[3]),
// new NordFortArms.BallistaSquad(pos[4]),
// new NordFortArms.FlameKnight(pos[5]),
// new NordFortArms.CoralCavalry(pos[6]),
// new NordFortArms.StoneGiant(pos[7]),
