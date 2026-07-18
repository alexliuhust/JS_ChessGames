import { Canvas } from "../common/tools.js";
import { BannerWidth as BW, BannerHeight as BH } from "../common/const.js";

export function drawBannerInfo(cxt, player1, player2, useMandarin) {
  drawText(cxt, player1, player2, useMandarin);
  drawBars(cxt, player1, player2);
  return;
}

function drawText(cxt, player1, player2, useMandarin) {
  if (useMandarin) {
    Canvas.drawText(cxt, "回合数 [操作数]", 5, 25, "white", 20);
    Canvas.drawText(cxt, "[操作数] 回合数", BW - 144, 25, "white", 20);
  } else {
    Canvas.drawText(cxt, "Round [OP limit]", 5, 25, "white", 20);
    Canvas.drawText(cxt, "[OP limit] Round", BW - 163, 25, "white", 20);
  }

  let roundAndOp1 = `${player1.currentRound - 1} [${player1.operableNum}]`;
  let roundAndOp2 = `[${player2.operableNum}] ${player2.currentRound - 1}`;
  Canvas.drawText(cxt, roundAndOp1, 55, 55, "white", 23);
  Canvas.drawText(cxt, roundAndOp2, BW - 95, 55, "white", 23);

  let scaleTitle = useMandarin ? "总规模" : "Total Scale";
  let powerTitle = useMandarin ? "战斗力" : "Combat Power";
  let leadTitle = useMandarin ? "总士气" : "Morale";

  if (!useMandarin) {
    Canvas.drawText(cxt, scaleTitle, 227, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 210, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 245, 64, "white", 18);
    Canvas.drawText(cxt, scaleTitle, 627, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 610, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 645, 64, "white", 18);
  } else {
    Canvas.drawText(cxt, scaleTitle, 280, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 280, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 280, 64, "white", 18);
    Canvas.drawText(cxt, scaleTitle, 615, 20, "white", 18);
    Canvas.drawText(cxt, powerTitle, 615, 42, "white", 18);
    Canvas.drawText(cxt, leadTitle, 615, 64, "white", 18);
  }
}

function drawBars(cxt, player1, player2) {
  let BGC = "grey";
  Canvas.drawLine(cxt, 350, 13, BW - 350, 13, BGC, 20);
  Canvas.drawLine(cxt, 350, 35, BW - 350, 35, BGC, 20);
  Canvas.drawLine(cxt, 350, 57, BW - 350, 57, BGC, 20);

  let resultP1 = getAggregateDataOfPlayer(player1);
  let resultP2 = getAggregateDataOfPlayer(player2);
  let scaleLen1 = Math.max(Math.round((resultP1[0] * 250) / (resultP1[0] + resultP2[0])), 2);
  let powerLen1 = Math.max(Math.round((resultP1[1] * 250) / (resultP1[1] + resultP2[1])), 2);
  let leadLen1 = Math.max(Math.round((resultP1[2] * 250) / (resultP1[2] + resultP2[2])), 2);
  scaleLen1 = Math.min(scaleLen1, 248);
  powerLen1 = Math.min(powerLen1, 248);
  leadLen1 = Math.min(leadLen1, 248);

  Canvas.drawLine(cxt, 352, 13, 350 + scaleLen1, 13, "blue", 16);
  Canvas.drawLine(cxt, 352 + scaleLen1, 13, BW - 352, 13, "red", 16);
  Canvas.drawLine(cxt, 352, 35, 350 + powerLen1, 35, "blue", 16);
  Canvas.drawLine(cxt, 352 + powerLen1, 35, BW - 352, 35, "red", 16);
  Canvas.drawLine(cxt, 352, 57, 350 + leadLen1, 57, "blue", 16);
  Canvas.drawLine(cxt, 352 + leadLen1, 57, BW - 352, 57, "red", 16);

  Canvas.drawLine(cxt, BW / 2, 3, BW / 2, BH - 3, "white", 2);
  Canvas.drawLine(cxt, BW / 2 - 124, 3, BW / 2 - 124, BH - 3, BGC, 2);
  Canvas.drawLine(cxt, BW / 2 + 124, 3, BW / 2 + 124, BH - 3, BGC, 2);
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
