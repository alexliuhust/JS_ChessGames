import { Canvas, Rect } from "../tools.js";
import { BannerWidth as BW, BannerHeight as BH } from "../const.js";

export function drawBannerInfo(cxt, player1, player2) {
  drawText(cxt, player1, player2);
  drawBars(cxt, player1, player2);
  return;
}

function drawText(cxt, player1, player2) {
  Canvas.drawText(cxt, "Round", 5, 25, "white", 20);
  Canvas.drawText(cxt, "Round", BW - 70, 25, "white", 20);
  Canvas.drawText(cxt, player1.currentRound - 1, 30, 55, "white", 30);
  Canvas.drawText(cxt, player2.currentRound - 1, BW - 45, 55, "white", 30);

  Canvas.drawText(cxt, "Total Scale", 127, 20, "white", 18);
  Canvas.drawText(cxt, "Combat Power", 110, 42, "white", 18);
  Canvas.drawText(cxt, "Leadership", 127, 64, "white", 18);
  Canvas.drawText(cxt, "Total Scale", 727, 20, "white", 18);
  Canvas.drawText(cxt, "Combat Power", 710, 42, "white", 18);
  Canvas.drawText(cxt, "Leadership", 727, 64, "white", 18);
}

function drawBars(cxt, player1, player2) {
  let backgroundColor = "grey";
  Canvas.drawLine(cxt, 250, 13, BW - 250, 13, backgroundColor, 20);
  Canvas.drawLine(cxt, 250, 35, BW - 250, 35, backgroundColor, 20);
  Canvas.drawLine(cxt, 250, 57, BW - 250, 57, backgroundColor, 20);

  let resultP1 = getAggregateDataOfPlayer(player1);
  let resultP2 = getAggregateDataOfPlayer(player2);
  let scaleLen1 = Math.round((resultP1[0] * 450) / (resultP1[0] + resultP2[0]));
  let powerLen1 = Math.round((resultP1[1] * 450) / (resultP1[1] + resultP2[1]));
  let leadLen1 = Math.round((resultP1[2] * 450) / (resultP1[2] + resultP2[2]));

  Canvas.drawLine(cxt, 252, 13, 250 + scaleLen1, 13, "blue", 16);
  Canvas.drawLine(cxt, 252 + scaleLen1, 13, BW - 252, 13, "red", 16);
  Canvas.drawLine(cxt, 252, 35, 250 + powerLen1, 35, "blue", 16);
  Canvas.drawLine(cxt, 252 + powerLen1, 35, BW - 252, 35, "red", 16);
  Canvas.drawLine(cxt, 252, 57, 250 + leadLen1, 57, "blue", 16);
  Canvas.drawLine(cxt, 252 + leadLen1, 57, BW - 252, 57, "red", 16);

  Canvas.drawLine(cxt, BW / 2, 3, BW / 2, BH - 3, "white", 2);
}

function getAggregateDataOfPlayer(player) {
  let totalScale = 0;
  let totalPower = 0;
  let totalLead = 0;
  for (let i = 0; i < player.pieceList.length; i++) {
    if (!player.pieceList[i].isAlive) continue;
    let scale = player.pieceList[i].scale;
    let c_scale =
      scale === 1
        ? Math.round(player.pieceList[i].c_singleHP / 10)
        : player.pieceList[i].c_scale;

    totalScale += c_scale;
    totalPower += player.pieceList[i].getCurrentCombatPower();
    totalLead += player.pieceList[i].c_leadership;
  }
  return [totalScale, totalPower, totalLead];
}
