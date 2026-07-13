import { Canvas } from "../common/tools.js";
import { BannerWidth as BW, BannerHeight as BH } from "../common/const.js";

export function drawBannerInfo(cxt, player1, player2, useMandarin) {
  drawText(cxt, player1, player2, useMandarin);
  drawBars(cxt, player1, player2);
  return;
}

function drawText(cxt, player1, player2, useMandarin) {
  Canvas.drawText(cxt, "Round", 5, 25, "white", 20);
  Canvas.drawText(cxt, "Round", BW - 70, 25, "white", 20);
  let roundAndOp1 = `${player1.currentRound - 1}[${player1.operableNum}]`;
  let roundAndOp2 = `${player2.currentRound - 1}[${player2.operableNum}]`;
  Canvas.drawText(cxt, roundAndOp1, 5, 55, "white", 23);
  Canvas.drawText(cxt, roundAndOp2, BW - 70, 55, "white", 23);

  let scaleTitle = useMandarin ? "总规模" : "Total Scale";
  let powerTitle = useMandarin ? "战斗力" : "Combat Power";
  let leadTitle = useMandarin ? "总士气" : "Morale";

  if (!useMandarin) {
    Canvas.drawText(cxt, scaleTitle, 127, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 110, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 145, 64, "white", 18);
    Canvas.drawText(cxt, scaleTitle, 727, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 710, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 745, 64, "white", 18);
  } else {
    Canvas.drawText(cxt, scaleTitle, 180, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 180, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 180, 64, "white", 18);
    Canvas.drawText(cxt, scaleTitle, 715, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 715, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 715, 64, "white", 18);
  }
}

function drawBars(cxt, player1, player2) {
  let BGC = "grey";
  Canvas.drawLine(cxt, 250, 13, BW - 250, 13, BGC, 20);
  Canvas.drawLine(cxt, 250, 35, BW - 250, 35, BGC, 20);
  Canvas.drawLine(cxt, 250, 57, BW - 250, 57, BGC, 20);

  let resultP1 = getAggregateDataOfPlayer(player1);
  let resultP2 = getAggregateDataOfPlayer(player2);
  let scaleLen1 = Math.max(Math.round((resultP1[0] * 450) / (resultP1[0] + resultP2[0])), 2);
  let powerLen1 = Math.max(Math.round((resultP1[1] * 450) / (resultP1[1] + resultP2[1])), 2);
  let leadLen1 = Math.max(Math.round((resultP1[2] * 450) / (resultP1[2] + resultP2[2])), 2);
  scaleLen1 = Math.min(scaleLen1, 448);
  powerLen1 = Math.min(powerLen1, 448);
  leadLen1 = Math.min(leadLen1, 448);

  Canvas.drawLine(cxt, 252, 13, 250 + scaleLen1, 13, "blue", 16);
  Canvas.drawLine(cxt, 252 + scaleLen1, 13, BW - 252, 13, "red", 16);
  Canvas.drawLine(cxt, 252, 35, 250 + powerLen1, 35, "blue", 16);
  Canvas.drawLine(cxt, 252 + powerLen1, 35, BW - 252, 35, "red", 16);
  Canvas.drawLine(cxt, 252, 57, 250 + leadLen1, 57, "blue", 16);
  Canvas.drawLine(cxt, 252 + leadLen1, 57, BW - 252, 57, "red", 16);

  Canvas.drawLine(cxt, BW / 2, 3, BW / 2, BH - 3, "white", 2);
  Canvas.drawLine(cxt, BW / 2 - 224, 3, BW / 2 - 224, BH - 3, BGC, 2);
  Canvas.drawLine(cxt, BW / 2 + 224, 3, BW / 2 + 224, BH - 3, BGC, 2);
}

function getAggregateDataOfPlayer(player) {
  let totalScale = 0;
  let totalPower = 0;
  let totalLead = 0;
  for (let i = 0; i < player.pieceList.length; i++) {
    if (!player.pieceList[i].isAlive) continue;
    let scale = player.pieceList[i].scale;
    let c_scale = scale === 1 ? Math.round(player.pieceList[i].c_singleHP / 100) : player.pieceList[i].c_scale;

    totalScale += c_scale;
    totalPower += player.pieceList[i].currentCombatPower;
    totalLead += player.pieceList[i].c_leadership;
  }
  return [totalScale, totalPower, totalLead];
}
