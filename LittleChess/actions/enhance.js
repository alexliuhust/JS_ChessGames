import { calculateDistance } from "./actionTools.js";
import { addEffect } from "../effects/effect.js";

const cxt = document.getElementById("piece").getContext("2d");

export function triggerEnhancing(enhancer, pieces) {
  if (canEnhance(enhancer)) return enhance(enhancer, pieces);
}

function canEnhance(enhancer) {
  return enhancer.armorEnhance > 0 || enhancer.attackEnhance > 0;
}

function update(enhancer, piece, increase) {
  let amount = 0;
  amount = Math.round((piece.meleeArmor * enhancer.armorEnhance) / 100);
  if (increase) piece.meleeArToChange = amount;
  else piece.meleeArToChange = -amount;
  // console.log(piece.name, "meleeArmor amount:", amount, piece.meleeArToChange);

  amount = Math.round((piece.meleeAttack * enhancer.attackEnhance) / 100);
  if (increase) piece.meleeAtToChange = amount;
  else piece.meleeAtToChange = -amount;
  // console.log(piece.name, "meleeAttack amount:", amount, piece.meleeAtToChange);
}

function removeOutOfRangePieces(enhancer) {
  // console.log("Remove and what's left:");
  for (let piece of enhancer.enhanceSet.values()) {
    if (piece === enhancer) continue;
    let distance = calculateDistance(
      enhancer.positionX,
      enhancer.positionY,
      piece.positionX,
      piece.positionY
    );
    if (distance > enhancer.enhanceRange) {
      // update(enhancer, piece, false);
      enhancer.enhanceSet.delete(piece);
    }
    // else console.log(piece);
  }
}

function addWithInRangePieces(enhancer, pieces) {
  // console.log("Newly added:");
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    if (piece === enhancer) continue;
    let distance = calculateDistance(
      enhancer.positionX,
      enhancer.positionY,
      piece.positionX,
      piece.positionY
    );
    if (distance <= enhancer.enhanceRange) {
      if (!enhancer.enhanceSet.has(piece)) {
        enhancer.enhanceSet.add(piece);
        // update(enhancer, piece, true);
        // console.log(piece);
      }
    }
  }
}

function enhance(enhancer, pieces) {
  removeOutOfRangePieces(enhancer);
  addWithInRangePieces(enhancer, pieces);
  for (let piece of enhancer.enhanceSet.values()) {
    if (piece === enhancer) continue;
    update(enhancer, piece, true);
  }
}
