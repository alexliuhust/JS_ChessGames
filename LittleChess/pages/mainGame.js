import { Player } from "../common/player.js";
import { Canvas } from "../common/tools.js";
import {
  GameWidth as W,
  GameHeight as H,
  InfoWidth as IW,
  InfoHeight as IH,
  BannerWidth as BW,
  BannerHeight as BH,
  ColorGradient as CG,
} from "../common/const.js";
import { getAllIconImages } from "../common/icon.js";
import * as BannerDraw from "../prompts/bannerDrawings.js";
import { exportPower, getArmsAndImages, getOneArm } from "../arms/exportArm.js";

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
let list = getAllIconImages();
for (let [src, id] of list) {
  let div = document.getElementById("allIconImages");
  let elem = document.createElement("img");
  elem.src = src;
  elem.id = id;
  div.appendChild(elem);
}

// ===============================================================
// ====================== Load Players Info ======================
// ===============================================================
function decodeArmPositionInfo(playerNum, player) {
  let armlistNumber = "a" + playerNum;
  let outputList = window.localStorage.getItem(armlistNumber);
  let info = JSON.parse(outputList);

  let powerNumber = "power" + playerNum;
  let Power = exportPower(window.localStorage.getItem(powerNumber));

  let arms = [];
  for (let i = 0; i < info.length; i++) {
    arms.push(getOneArm(Power, info[i][0], info[i][1], info[i][2], player));
  }

  return arms;
}
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
const endRoundForBlue = document.getElementById("endRoundForBlue");
const endRoundForRed = document.getElementById("endRoundForRed");

function playerRefreshRound(player) {
  player.operatedPieces.clear();
  player.refresh();
  let endMyRound = player.currentRound !== 1 && !player.isMyRound;
  for (let i = 0; i < player.pieceList.length; i++) {
    player.pieceList[i].roundRefresh(player.currentRound, endMyRound);
  }
}

function waitForCondition(conditionFn, callback, interval = 100) {
  const timer = setInterval(() => {
    if (conditionFn()) {
      clearInterval(timer);
      callback(); // Execute your code here
    }
  }, interval);
}

function endBlue() {
  endRoundForBlue.style.backgroundColor = "";
  player1.clearForNoSelection();
  player1.isMyRound = false;
  playerRefreshRound(player1);

  waitForCondition(
    () => player1.allEffectsFinished(),
    () => {
      endRoundForRed.style.backgroundColor = "red";
      player2.isMyRound = true;
      player2.currentRound++;
      playerRefreshRound(player2);

      if (player1.pieceList.length == 0) {
        player2.victoryReckoning();
      }
    },
  );
}

function endRed() {
  endRoundForRed.style.backgroundColor = "";
  player2.clearForNoSelection();
  player2.isMyRound = false;
  playerRefreshRound(player2);

  waitForCondition(
    () => player2.allEffectsFinished(),
    () => {
      endRoundForBlue.style.backgroundColor = "blue";
      player1.isMyRound = true;
      player1.currentRound++;
      playerRefreshRound(player1);

      if (player2.pieceList.length == 0) {
        player1.victoryReckoning();
      }
    },
  );
}

endRoundForBlue.addEventListener("click", () => {
  if (!player1.allEffectsFinished() || !player2.allEffectsFinished()) return;

  endBlue();
});

endRoundForRed.addEventListener("click", () => {
  if (!player1.allEffectsFinished() || !player2.allEffectsFinished()) return;

  endRed();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Enter" || e.code == "Space") {
    e.preventDefault();
    if (!player1.allEffectsFinished() || !player2.allEffectsFinished()) return;

    if (player1.isMyRound) endBlue();
    else endRed();
  } else if (e.code == "KeyQ") {
    endRoundForBlue.click();
  } else if (e.code == "KeyP") {
    endRoundForRed.click();
  }
});

const backButton = document.getElementById("back");
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey) {
    // Press ctrl + shift + L to switch language
    if (e.key === "L" || e.key === "l") {
      e.preventDefault();
      let useMandarin = window.localStorage.getItem("useMandarin") == "true";
      window.localStorage.setItem("useMandarin", !useMandarin);
      location.reload();
    }
    // Press ctrl + shift + B to save and go back
    else if (e.key === "B" || e.key === "b") {
      e.preventDefault();
      backButton.click();
    }
  }
});

// ===============================================================
// ======================= Change Language =======================
// ===============================================================
endRoundForBlue.innerHTML = useMandarin ? "结束<br />蓝方回合" : "End Round For Blue";
endRoundForRed.innerHTML = useMandarin ? "结束<br />红方回合" : "End Round For Red";
backButton.innerHTML = useMandarin ? "回到<br />部署阶段" : "Back to<br />Deployment";

// ===============================================================
// ==================== Mouse Clicking Events ====================
// ===============================================================
const select = document.getElementById("select");
select.addEventListener("click", (e) => {
  if (player1.isMyRound && !player2.isMyRound) {
    player1.mouseClickingEvents(e);
  } else {
    player2.mouseClickingEvents(e);
  }
});

// ===============================================================
// ==================== Mouse Hovering Events ====================
// ===============================================================
const info = document.getElementById("info");
info.addEventListener("mousemove", (e) => {
  const rect = info.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (player1.isMyRound && !player2.isMyRound) player1.infoPanel.updateTraitInfo(x, y);
  else player2.infoPanel.updateTraitInfo(x, y);
});

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

// ===============================================================
// ============================ Test =============================
// ===============================================================
