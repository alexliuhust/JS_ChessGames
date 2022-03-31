import { calculateDistance } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function afterArmorEnhancement(self, pieces) {
  let enhancement = accumulateEnhancement(self, pieces, true);
  return enhancement;
}

export function afterAttackEnhancement(self, pieces) {
  let enhancement = accumulateEnhancement(self, pieces, false);
  return enhancement;
}

function accumulateEnhancement(self, pieces, isArmor) {
  let enhancement = 0;
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    if (piece === self) continue;
    if (isArmor && piece.armorEnhance === 0) continue;
    if (!isArmor && piece.attackEnhance === 0) continue;
    let distance = calculateDistance(
      self.positionX,
      self.positionY,
      piece.positionX,
      piece.positionY
    );
    let range = piece.enhanceRange;

    if (distance <= range) {
      if (isArmor) enhancement += piece.armorEnhance;
      else enhancement += piece.attackEnhance;
    }
  }
  return enhancement;
}
