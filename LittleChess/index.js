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

// =================== Load All Canvases ===================
const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  main: document.getElementById("main").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
  info: document.getElementById("info").getContext("2d"),
};

// =================== Refreshing Round Button ===================
let endRoundForBlue = document.getElementById("endRoundForBlue");
let endRoundForRed = document.getElementById("endRoundForRed");
function endBluw() {
  endRoundForBlue.style.backgroundColor = "";
  endRoundForRed.style.backgroundColor = "red";
  player1.isMyRound = false;
  player2.isMyRound = true;
  player1.clearWhenNoSelection();
  for (let i = 0; i < player2.pieceList.length; i++) {
    player2.pieceList[i].roundRefresh();
  }
}
function endRed() {
  endRoundForBlue.style.backgroundColor = "blue";
  endRoundForRed.style.backgroundColor = "";
  player1.isMyRound = true;
  player2.isMyRound = false;
  player2.clearWhenNoSelection();
  for (let i = 0; i < player1.pieceList.length; i++) {
    player1.pieceList[i].roundRefresh();
  }
}
endRoundForBlue.onclick = (e) => {
  endBluw();
};
endRoundForRed.onclick = (e) => {
  endRed();
};
document.addEventListener("keydown", (e) => {
  // Press '1' to end round for blue
  if (e.code == "KeyQ") {
    endBluw();
  }
  // Press '2' to end round for red
  else if (e.code == "KeyP") {
    endRed();
  }
});

// =================== Mouse Selection Event ===================
let select = document.getElementById("select");
select.onclick = (e) => {
  if (player1.isMyRound && !player2.isMyRound) {
    player1.clickMouse(e);
  } else {
    player2.clickMouse(e);
  }
};

// =================== Game Entrance ===================
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

// =================== Load Players Info ===================
let pieces1 = EmpireArms.getTestArms(1);
let pieces2 = PollutelandArms.getTestArms(2);

pieces1.push(new EmpireArms.PalaceGuard([16, 8]));
pieces1.push(new EmpireArms.PalaceGuard([16, 9]));
pieces1.push(new EmpireArms.PalaceGuard([17, 9]));
pieces1.push(new EmpireArms.PalaceGuard([17, 10]));

let player1 = new Player(pieces1, pieces2, "blue", canvasList);
let player2 = new Player(pieces2, pieces1, "red", canvasList);

start();
