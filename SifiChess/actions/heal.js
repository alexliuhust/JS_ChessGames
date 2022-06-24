import { calculateDistance } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function triggerHealing(healer, pieces) {
  if (canHeal(healer)) return heal(healer, pieces);
}

function canHeal(healer) {
  return healer.healing > 0;
}

function isWounded(piece) {
  let single = piece.scale === 1 && piece.c_singleHP < piece.singleHP;
  let phalanx = piece.scale > 1 && piece.c_scale < piece.scale;
  return single || phalanx;
}

function getLowestPiece(healer, pieces) {
  let minHP = 1000000;
  let lowestPiece = null;
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    if (piece === healer) continue;
    if (healer.healTarget != piece.B_M) continue;

    let distance = calculateDistance(
      healer.positionX,
      healer.positionY,
      piece.positionX,
      piece.positionY
    );
    if (distance > healer.healRange) continue;

    if (isWounded(piece) && piece.getTotalHP() < minHP) {
      minHP = piece.getTotalHP();
      lowestPiece = piece;
    }
  }
  return lowestPiece;
}

function heal(healer, pieces) {
  let lowestPiece = getLowestPiece(healer, pieces);
  if (lowestPiece == null) return false;

  if (healer.c_totalHeal < healer.healing) return false;

  healer.c_totalHeal -= healer.healing;
  let list = healer.player.effectList;
  addEffect(list, "healing", healer, lowestPiece, cxt);
  let totalHealing = healer.healing * healer.c_scale;
  if (healer.scale == 1) {
    totalHealing = healer.healing * 50;
  }

  if (lowestPiece.scale === 1) {
    lowestPiece.c_singleHP += totalHealing;
    lowestPiece.c_singleHP = Math.min(
      lowestPiece.c_singleHP,
      lowestPiece.singleHP
    );
  } else {
    let recovered = Math.round(totalHealing / lowestPiece.c_singleHP);
    lowestPiece.c_scale += recovered;
    lowestPiece.c_scale = Math.min(lowestPiece.c_scale, lowestPiece.scale);
  }
  lowestPiece.c_leadership += Math.round(totalHealing / 10);
  lowestPiece.c_leadership = Math.min(
    lowestPiece.c_leadership,
    lowestPiece.leadership
  );

  return true;
}
