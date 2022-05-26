import { sortPieces, moveOneStep } from "./actionTools.js";

export function moveAligned(pieces, enemies, direction) {
  let blockers = new Set();

  sortPieces(pieces, direction);
  blockers.clear();
  for (let i = 0; i < pieces.length; i++)
    blockers.add(`${pieces[i].positionX}-${pieces[i].positionY}`);
  for (let i = 0; i < enemies.length; i++)
    blockers.add(`${enemies[i].positionX}-${enemies[i].positionY}`);

  for (let i = 0; i < pieces.length; i++) {
    moveOneStep(pieces[i], direction, blockers, false);
  }
}
