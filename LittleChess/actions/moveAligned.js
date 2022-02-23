import { GameWidth, GameHeight } from "../const.js";

const maxX = GameWidth / 50;
const maxY = GameHeight / 50;

let blockers = new Set();

export function moveAligned(pieces, enemies, direction) {
  sortPieces(pieces, direction);
  blockers.clear();
  for (let i = 0; i < pieces.length; i++)
    blockers.add(`${pieces[i].positionX}-${pieces[i].positionY}`);
  for (let i = 0; i < enemies.length; i++)
    blockers.add(`${enemies[i].positionX}-${enemies[i].positionY}`);

  for (let i = 0; i < pieces.length; i++) {
    moveOneStep(pieces[i], direction);
  }
}

function sortPieces(pieces, direction) {
  switch (direction) {
    case "U":
      pieces.sort((a, b) => (a.positionY > b.positionY ? 1 : -1));
      break;

    case "D":
      pieces.sort((a, b) => (a.positionY > b.positionY ? -1 : 1));
      break;

    case "L":
      pieces.sort((a, b) => (a.positionX > b.positionX ? 1 : -1));
      break;

    case "R":
      pieces.sort((a, b) => (a.positionX > b.positionX ? -1 : 1));
      break;

    default:
      break;
  }
  return pieces;
}

function willBeBlocked(mover, direction) {
  let nextPoCode = null;

  if (direction === "U")
    nextPoCode = `${mover.positionX}-${mover.positionY - 1}`;
  else if (direction === "D")
    nextPoCode = `${mover.positionX}-${mover.positionY + 1}`;
  else if (direction === "L")
    nextPoCode = `${mover.positionX - 1}-${mover.positionY}`;
  else if (direction === "R")
    nextPoCode = `${mover.positionX + 1}-${mover.positionY}`;

  return blockers.has(nextPoCode);
}

function willBeWithinBound(mover, direction) {
  if (direction === "U") return mover.positionY - 1 >= 0;
  if (direction === "D") return mover.positionY + 1 <= maxY - 1;
  if (direction === "L") return mover.positionX - 1 >= 0;
  if (direction === "R") return mover.positionX + 1 <= maxX - 1;
}

function moveOneStep(mover, direction) {
  if (
    mover.c_speed > 0 &&
    !willBeBlocked(mover, direction, blockers) &&
    willBeWithinBound(mover, direction)
  ) {
    blockers.delete(`${mover.positionX}-${mover.positionY}`);
    if (direction === "U") mover.positionY--;
    if (direction === "D") mover.positionY++;
    if (direction === "L") mover.positionX--;
    if (direction === "R") mover.positionX++;
    mover.c_speed = 0;
    blockers.add(`${mover.positionX}-${mover.positionY}`);
  }
}
