import { Player } from "../player.js";
import { Canvas } from "../tools.js";
import {
  GameWidth as W,
  GameHeight as H,
  InfoWidth as IW,
  InfoHeight as IH,
  BannerWidth as BW,
  BannerHeight as BH,
} from "../const.js";
import * as BannerDraw from "../prompts/bannerDrawings.js";
import { exportPower } from "../arms/exportArm.js";
import { decodeArmPositionInfo } from "../deployMethods.js";

// ===============================================================
// ====================== Load All Canvases ======================
// ===============================================================
const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  main: document.getElementById("main").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
  info: document.getElementById("info").getContext("2d"),
  banner: document.getElementById("banner").getContext("2d"),
};

// ===============================================================
// ====================== Load Players Info ======================
// ===============================================================
let pieces1 = decodeArmPositionInfo(1);
let pieces2 = decodeArmPositionInfo(2);

let useMandarin = false;
let player1 = new Player(pieces1, pieces2, "blue", canvasList, useMandarin);
let player2 = new Player(pieces2, pieces1, "red", canvasList, useMandarin);

// ===============================================================
// =================== Refreshing Round Button ===================
// ===============================================================
let endRoundForBlue = document.getElementById("endRoundForBlue");
let endRoundForRed = document.getElementById("endRoundForRed");
function refreshRound() {
  player1.operatedPieces.clear();
  for (let i = 0; i < player1.pieceList.length; i++) {
    player1.pieceList[i].roundRefresh(player1.currentRound);
  }

  player2.operatedPieces.clear();
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
    Canvas.clear(canvasList.banner, BW, BH);

    player1.executeOneLoop();
    player2.executeOneLoop();

    BannerDraw.drawBannerInfo(canvasList.banner, player1, player2, useMandarin);
  }, 20);
}

start();
