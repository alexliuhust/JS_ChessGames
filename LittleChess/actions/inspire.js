import { calculateDistance } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function triggerInspiring(inspirator, pieces) {
  if (canInspire(inspirator)) return inspire(inspirator, pieces);
}

function canInspire(inspirator) {
  return inspirator.inspiring > 0;
}

function inspire(inspirator, pieces) {
  let list = inspirator.player.effectList;
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];

    let distance = calculateDistance(inspirator.positionX, inspirator.positionY, piece.positionX, piece.positionY);
    if (distance > inspirator.inspireRange) continue;

    let totalInspiring = 0;
    if (inspirator.scale === 1) totalInspiring = Math.round((inspirator.inspiring * 40) / 5);
    else totalInspiring = Math.round((inspirator.inspiring * inspirator.getValidScale()) / 5);
    if (inspirator.canDoNecromancy(piece)) {
      totalInspiring = Math.round(totalInspiring * 1.5);
    }

    if (piece.c_leadership < piece.leadership) {
      addEffect(list, "inspiring", inspirator, piece, cxt);
      if (inspirator.canDoNecromancy(piece)) {
        setTimeout(() => {
          addEffect(list, "inspiring", inspirator, piece, cxt);
        }, 250);
      }
    }

    piece.c_leadership += totalInspiring;
    piece.c_leadership = Math.min(piece.c_leadership, piece.leadership);
  }
}
