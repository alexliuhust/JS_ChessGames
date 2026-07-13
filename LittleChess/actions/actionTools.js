import { GameWidth, GameHeight } from "../common/const.js";
import { Rect } from "../common/tools.js";

const maxX = GameWidth / 50;
const maxY = GameHeight / 50;

export function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export function calculateDistanceByPieces(piece1, piece2) {
  return calculateDistance(piece1.positionX, piece1.positionY, piece2.positionX, piece2.positionY);
}

export function adjacentUpAndDown(piece1, piece2) {
  return piece1.positionX == piece2.positionX && Math.abs(piece1.positionY - piece2.positionY) == 1;
}

export function adjacentLeftAndRight(piece1, piece2) {
  return piece1.positionY == piece2.positionY && Math.abs(piece1.positionX - piece2.positionX) == 1;
}

export function adjacent(piece1, piece2) {
  return adjacentUpAndDown(piece1, piece2) || adjacentLeftAndRight(piece1, piece2);
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

  if (direction === "U") nextPoCode = `${mover.positionX}-${mover.positionY - 1}`;
  else if (direction === "D") nextPoCode = `${mover.positionX}-${mover.positionY + 1}`;
  else if (direction === "L") nextPoCode = `${mover.positionX - 1}-${mover.positionY}`;
  else if (direction === "R") nextPoCode = `${mover.positionX + 1}-${mover.positionY}`;

  return blockers.has(nextPoCode);
}

export function willBeWithinBound(mover, direction) {
  if (direction === "U") return mover.positionY - 1 >= 0;
  if (direction === "D") return mover.positionY + 1 <= maxY - 1;
  if (direction === "L") return mover.positionX - 1 >= 0;
  if (direction === "R") return mover.positionX + 1 <= maxX - 1;
}

export function moveOneStep(mover, direction, blockers, retreat) {
  let canMove = retreat && !willBeBlocked(mover, direction, blockers) && willBeWithinBound(mover, direction);
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

    mover.preAct = "mov " + direction;
    mover.updateCurrentFatigue("move", 1);

    // Detach from melee
    for (let enemy of mover.inMeleeWith) {
      enemy.inMeleeWith.delete(mover);
    }
    mover.inMeleeWith.clear();
    mover.removeStatus("IM");
    mover.removeStatus("HP");

    // Reform formation
    mover.reform();
  }

  return canMove;
}

export function isTargeBlocked(self, target, others) {
  if (self.isParabola) return false;

  let candidates = [];
  for (let i = 0; i < others.length; i++) candidates.push(others[i]);
  for (let i = 0; i < self.player.pieceList.length; i++) {
    if (self.player.pieceList[i] != self) candidates.push(self.player.pieceList[i]);
  }

  for (let i = 0; i < candidates.length; i++) {
    let blocker = candidates[i];
    if (blocker === self || blocker === target) continue;

    let lines = [
      [self.x + 25, self.y + 25, target.x + 25, target.y + 25],
      [self.x + 13, self.y + 13, target.x + 13, target.y + 13],
      [self.x + 37, self.y + 13, target.x + 37, target.y + 13],
      [self.x + 13, self.y + 37, target.x + 13, target.y + 37],
      [self.x + 37, self.y + 37, target.x + 37, target.y + 37],
    ];
    for (let line of lines) {
      // blocker is in the middle of the line
      if (Rect.lineThroughRect(line, blocker)) {
        // Check if blocker is tall enough to actually block the line of sight
        let d1 = calculateDistanceByPieces(self, blocker);
        let d2 = calculateDistanceByPieces(blocker, target);
        let h1 = self.tall;
        let h2 = target.tall;
        let h3 = blocker.tall;
        let threshold = h1 + (d1 * (h2 - h1)) / (d1 + d2);
        if (h3 >= threshold) {
          return true;
        }
      }
    }
  }
  return false;
}

function isInBetween(xb, yb, xt, yt, xs, ys, checkIfAdjacent = false) {
  const isBetween = (a, b, c) => (a < b && b < c) || (a > b && b > c);
  const isAdjacent = (a, b, c) => isBetween(a, b, c) && Math.abs(b - c) === 1;
  const check = checkIfAdjacent ? isAdjacent : isBetween;

  if (xs === xt && xs === xb) return check(ys, yb, yt);
  if (ys === yt && ys === yb) return check(xs, xb, xt);

  return false;
}

export function isChargeTargetCanBeSeen(self, target, pieces, enemies) {
  let xt = target.positionX;
  let yt = target.positionY;
  let xs = self.positionX;
  let ys = self.positionY;

  if (!areAligned(xt, yt, xs, ys)) {
    return false;
  }

  const isBlocked = (arm, checkAdjacent = false) =>
    isInBetween(arm.positionX, arm.positionY, xt, yt, xs, ys, checkAdjacent);

  for (const arm of pieces) {
    if (arm === self) continue;
    if ((!arm.isSparse() && isBlocked(arm)) || (arm.isSparse() && isBlocked(arm, true))) {
      return false;
    }
  }

  for (const arm of enemies) {
    if (arm === target) continue;
    if (isBlocked(arm)) {
      return false;
    }
  }

  return true;
}
