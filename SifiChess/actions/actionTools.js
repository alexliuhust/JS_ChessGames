import { GameWidth, GameHeight } from "../common/const.js";

const maxX = GameWidth / 50;
const maxY = GameHeight / 50;

export function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export function calculateDistance2arms(arm1, arm2) {
  let x1 = arm1.positionX;
  let y1 = arm1.positionY;
  let x2 = arm2.positionX;
  let y2 = arm2.positionY;
  return calculateDistance(x1, y1, x2, y2);
}

export function areAligned(x1, y1, x2, y2) {
  return x1 === x2 || y1 === y2;
}

export function sortPieces(pieces, direction) {
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

export function willBeBlocked(mover, direction, blockers) {
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

export function willBeWithinBound(mover, direction) {
  if (direction === "U") return mover.positionY - 1 >= 0;
  if (direction === "D") return mover.positionY + 1 <= maxY - 1;
  if (direction === "L") return mover.positionX - 1 >= 0;
  if (direction === "R") return mover.positionX + 1 <= maxX - 1;
}

export function moveOneStep(mover, direction, blockers, retreat) {
  let canMove =
    retreat &&
    !willBeBlocked(mover, direction, blockers) &&
    willBeWithinBound(mover, direction);
  canMove =
    canMove ||
    (mover.c_speed > 0 &&
      !mover.alignMoved &&
      !willBeBlocked(mover, direction, blockers) &&
      willBeWithinBound(mover, direction));
  if (canMove) {
    blockers.delete(`${mover.positionX}-${mover.positionY}`);
    if (direction === "U") mover.positionY--;
    if (direction === "D") mover.positionY++;
    if (direction === "L") mover.positionX--;
    if (direction === "R") mover.positionX++;
    mover.c_speed--;
    mover.alignMoved = true;
    blockers.add(`${mover.positionX}-${mover.positionY}`);
  }
}
