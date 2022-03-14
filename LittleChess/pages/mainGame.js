import { Player } from "../common/player.js";
import { Canvas } from "../common/tools.js";
import {
  GameWidth as W,
  GameHeight as H,
  InfoWidth as IW,
  InfoHeight as IH,
  BannerWidth as BW,
  BannerHeight as BH,
} from "../common/const.js";
import * as BannerDraw from "../prompts/bannerDrawings.js";
import { decodeArmPositionInfo } from "../common/deployMethods.js";
import { getArmsAndImages } from "../arms/exportArm.js";

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
// ==================== Load All Needed Images ===================
// ===============================================================
let srcList1 = getArmsAndImages(window.localStorage.getItem("power1"))[1];
let srcList2 = getArmsAndImages(window.localStorage.getItem("power2"))[1];
function addImage(srcList) {
  for (let i = 0; i < srcList.length; i++) {
    let div = document.getElementById("allArmImages");
    let elem = document.createElement("img");
    elem.src = srcList[i];
    let start = elem.src.lastIndexOf("/") + 1;
    let end = elem.src.lastIndexOf(".");
    elem.id = elem.src.substring(start, end) + "_img";
    div.appendChild(elem);
  }
}
addImage(srcList1);
addImage(srcList2);

// ===============================================================
// ====================== Load Players Info ======================
// ===============================================================
let useMandarin = window.localStorage.getItem("useMandarin") === "true";
let player1 = new Player("blue", canvasList, useMandarin);
let player2 = new Player("red", canvasList, useMandarin);
let pieces1 = decodeArmPositionInfo(1, player1);
let pieces2 = decodeArmPositionInfo(2, player2);
player1.addPieces(pieces1, pieces2);
player2.addPieces(pieces2, pieces1);

// ===============================================================
// =================== Refreshing Round Button ===================
// ===============================================================
let endRoundForBlue = document.getElementById("endRoundForBlue");
let endRoundForRed = document.getElementById("endRoundForRed");
function refreshRound() {
  player1.operatedPieces.clear();
  player1.refresh();
  let endMyRound = player1.currentRound !== 1 && !player1.isMyRound;
  for (let i = 0; i < player1.pieceList.length; i++) {
    player1.pieceList[i].roundRefresh(player1.currentRound, endMyRound);
  }

  player2.operatedPieces.clear();
  player2.refresh();
  endMyRound = player2.currentRound !== 1 && !player2.isMyRound;
  for (let i = 0; i < player2.pieceList.length; i++) {
    player2.pieceList[i].roundRefresh(player2.currentRound, endMyRound);
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
  if (e.code == "Enter" || e.code == "Space") {
    e.preventDefault();
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
    if (i % 2 === 0) {
      for (let j = 0; j < maxY; j += 2) {
        Canvas.drawRect(canvasList.map, i * 50, j * 50, 50, 50, "black");
      }
    } else {
      for (let j = 1; j < maxY; j += 2) {
        Canvas.drawRect(canvasList.map, i * 50, j * 50, 50, 50, "black");
      }
    }
  }

  // Main game loop, every 20 ms
  setInterval(() => {
    Canvas.clear(canvasList.piece, W, H);
    Canvas.clear(canvasList.info, IW, IH);
    Canvas.clear(canvasList.banner, BW, BH);

    player1.executeOneLoop();
    player2.executeOneLoop();
    player1.drawEffects();
    player2.drawEffects();

    BannerDraw.drawBannerInfo(canvasList.banner, player1, player2, useMandarin);
  }, 20);
}

start();
