import { calculateDistance } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function triggerCharging(charger, pieces) {
  if (canCharge(charger)) return charge(charger, pieces);
}

function canCharge(charger) {
  return charger.charging > 0;
}

function shieldUnfull(piece) {
  return piece.c_shield < piece.shield;
}

function getLowestPiece(charger, pieces) {
  let minShield = 1000000;
  let lowestPiece = null;
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    if (piece === charger) continue;

    let distance = calculateDistance(
      charger.positionX,
      charger.positionY,
      piece.positionX,
      piece.positionY
    );
    if (distance > charger.chargeRange) continue;

    if (shieldUnfull(piece) && piece.c_shield < minShield) {
      minShield = piece.c_shield;
      lowestPiece = piece;
    }
  }
  return lowestPiece;
}

function charge(charger, pieces) {
  let lowestPiece = getLowestPiece(charger, pieces);
  if (lowestPiece == null) return false;

  if (charger.c_totalCharge < charger.charging) return false;

  charger.c_totalCharge -= charger.charging;
  let list = charger.player.effectList;
  addEffect(list, "charging", charger, lowestPiece, cxt);
  let totalCharging = charger.charging * charger.c_scale;
  if (charger.scale == 1) {
    totalCharging = charger.charging * 50;
  }

  lowestPiece.c_shield += totalCharging;
  if (lowestPiece.c_shield > lowestPiece.shield)
    lowestPiece.c_shield = lowestPiece.shield;

  return true;
}
