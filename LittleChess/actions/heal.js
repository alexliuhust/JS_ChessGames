import { calculateDistance } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function triggerHealing(healer, pieces) {
  if (canHeal(healer)) return heal(healer, pieces);
}

function canHeal(healer) {
  return healer.healing > 0;
}

function countWounded(piece) {
  if (piece.scale === 1) {
    return piece.c_singleHP < piece.singleHP ? 1 : 0;
  }
  let result = 0;
  for (let i = 0; i < piece.formation.length; i++) {
    for (let j = 0; j < piece.formation[i].length; j++) {
      if (piece.formation[i][j] > 0 && piece.formation[i][j] < piece.c_singleHP) {
        result++;
      }
    }
  }
  return result;
}

function getLowestPiece(healer, pieces) {
  let minHP = 1000000;
  let lowestPiece = null;
  let woundedNum = 0;
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    if (piece === healer) continue;

    let distance = calculateDistance(healer.positionX, healer.positionY, piece.positionX, piece.positionY);
    if (distance > healer.healRange) continue;

    woundedNum = countWounded(piece);
    if (woundedNum > 0 && piece.getTotalHP() < minHP) {
      minHP = piece.getTotalHP();
      lowestPiece = piece;
    }
  }
  return [lowestPiece, woundedNum];
}

function heal(healer, pieces) {
  let [target, woundedNum] = getLowestPiece(healer, pieces);
  if (target == null) return false;

  if (healer.c_totalHeal < healer.healing) return false;

  healer.c_totalHeal -= healer.healing;
  let list = healer.player.effectList;

  let totalHealing = healer.healing * healer.getValidScale();
  if (healer.scale == 1) {
    totalHealing = healer.healing * 50;
  }
  if (healer.canDoNecromancy(target)) {
    totalHealing = Math.round(totalHealing * 1.5);
  }

  let formation = target.formation;

  // Healing for single unit
  if (target.scale === 1) {
    target.c_singleHP += totalHealing;
    target.c_singleHP = Math.min(target.c_singleHP, target.singleHP);
    for (let i = 0; i < formation.length; i++) {
      for (let j = 0; j < formation[i].length; j++) {
        if (formation[i][j] > 0) {
          formation[i][j] = target.c_singleHP;
        }
      }
    }
  }

  // Healing for phalanx
  else {
    let singleHeal = Math.round(totalHealing / woundedNum);
    for (let i = 0; i < formation.length; i++) {
      for (let j = 0; j < formation[i].length; j++) {
        if (formation[i][j] > 0 && formation[i][j] < target.c_singleHP) {
          formation[i][j] += singleHeal;
          formation[i][j] = Math.min(formation[i][j], target.c_singleHP);
        }
      }
    }
  }

  addEffect(list, "healing", healer, target, cxt);
  if (healer.canDoNecromancy(target)) {
    setTimeout(() => {
      addEffect(list, "healing", healer, target, cxt);
    }, 250);
  }

  return true;
}
