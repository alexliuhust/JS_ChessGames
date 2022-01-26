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
import * as PollutelandArms from "./arms/polluteland/pollutelandArms.js";
import * as SnowhauptArms from "./arms/snowhaupt/snowhauptArms.js";

// ===============================================================
// ====================== Load All Canvases ======================
// ===============================================================
const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  main: document.getElementById("main").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
  info: document.getElementById("info").getContext("2d"),
};

// ===============================================================
// ====================== Load Players Info ======================
// ===============================================================
let pieces1 = DimwoodsArms.getTestArms(1);
let pieces2 = NordFortArms.getTestArms(2);

for (let i = 0; i < pieces1.length; i++) {
  pieces1[i].c_leadership = Math.round(pieces1[i].c_leadership * 0.75);
  pieces1[i].level = (i % 3) + 1;
}

// let pieces1 = [
// new SnowhauptArms.BoneBreaker([10, 3]),
// new SnowhauptArms.BoneBreaker([10, 4]),
// new SnowhauptArms.BoneBreaker([10, 5]),

// new SnowhauptArms.BoneBreaker([10, 7]),
// new SnowhauptArms.BoneBreaker([10, 8]),
// new PollutelandArms.WeapSqdFlthr([10, 9]),

// new NordFortArms.NordExecutioner([10, 11]),
// new SnowhauptArms.Berserker([10, 12]),
// new SnowhauptArms.Berserker([10, 13]),
// new EmpireArms.MusketRider([9, 14]),
// ];

// let pieces2 = [
// new EmpireArms.SteamTank([11, 3]),
// new NordFortArms.StoneGiant([11, 4]),
// new DimwoodsArms.Dryad([11, 5]),
// new DimwoodsArms.GiantTreeman([11, 7]),
// new EmpireArms.PalaceKnight([11, 8]),
// new PollutelandArms.MutantSlave([11, 9]),
// new NordFortArms.HallwayGuard([11, 11]),
// new NordFortArms.HallwayGuard([11, 12]),
// new PollutelandArms.MutantSlave([11, 13]),
// new DimwoodsArms.LongbowRanger([11, 14]),
// ];

let player1 = new Player(pieces1, pieces2, "blue", canvasList);
let player2 = new Player(pieces2, pieces1, "red", canvasList);

// ===============================================================
// =================== Refreshing Round Button ===================
// ===============================================================
let endRoundForBlue = document.getElementById("endRoundForBlue");
let endRoundForRed = document.getElementById("endRoundForRed");
function refreshRound() {
  for (let i = 0; i < player1.pieceList.length; i++) {
    player1.pieceList[i].roundRefresh(player1.currentRound);
  }
  for (let i = 0; i < player2.pieceList.length; i++) {
    player2.pieceList[i].roundRefresh(player2.currentRound);
  }
}
function endBlue() {
  endRoundForBlue.style.backgroundColor = "";
  endRoundForRed.style.backgroundColor = "red";
  player1.isMyRound = false;
  player2.isMyRound = true;
  player1.clearForNoSelection();

  player2.currentRound++;
  refreshRound();
}
function endRed() {
  endRoundForBlue.style.backgroundColor = "blue";
  endRoundForRed.style.backgroundColor = "";
  player1.isMyRound = true;
  player2.isMyRound = false;
  player2.clearForNoSelection();

  player1.currentRound++;
  refreshRound();
}
endRoundForBlue.onclick = (e) => {
  endBlue();
};
endRoundForRed.onclick = (e) => {
  endRed();
};
document.addEventListener("keydown", (e) => {
  if (e.code == "KeyS") {
    if (player1.isMyRound) endBlue();
    else endRed();
  } else if (e.code == "KeyQ") {
    endBlue();
  } else if (e.code == "KeyP") {
    endRed();
  }
});

// ===============================================================
// ==================== Mouse Clicking Events ====================
// ===============================================================
let select = document.getElementById("select");
select.onclick = (e) => {
  if (player1.isMyRound && !player2.isMyRound) {
    player1.mouseClickingEvents(e);
  } else {
    player2.mouseClickingEvents(e);
  }
};

// ===============================================================
// =================== Game Starting Function ====================
// ===============================================================
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

    player1.executeOneLoop();
    player2.executeOneLoop();
  }, 20);
}

start();
