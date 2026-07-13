import { sortPieces, moveOneStep } from "./actionTools.js";
import { GameWidth, GameHeight } from "../common/const.js";

const maxX = GameWidth / 50;
const maxY = GameHeight / 50;

export function tryRetreat(playerNumber, pieces, enemies) {
  // Define direction priority
  const directionPriority = playerNumber === 1 ? ["L", "U", "D", "R"] : ["R", "U", "D", "L"];

  // Sort based on primary retreat direction
  sortPieces(pieces, directionPriority[0]);

  // Build set of blockers
  const blockers = new Set();
  for (let i = 0; i < pieces.length; i++) {
    blockers.add(`${pieces[i].positionX}-${pieces[i].positionY}`);
  }
  for (let i = 0; i < enemies.length; i++) {
    blockers.add(`${enemies[i].positionX}-${enemies[i].positionY}`);
  }

  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    // Units with instability do not retreat
    if (piece.hasInstability()) continue;

    // Only retreat if leadership is 0 or below
    if (piece.c_leadership <= 0) {
      // Detach from melee
      for (let enemy of piece.inMeleeWith) {
        enemy.inMeleeWith.delete(piece);
      }
      piece.inMeleeWith.clear();
      piece.removeStatus("IM");
      piece.removeStatus("HP");

      // Check if already at the border
      if (
        piece.positionX === 0 ||
        piece.positionX === maxX - 1 ||
        piece.positionY === 0 ||
        piece.positionY === maxY - 1
      ) {
        piece.isAlive = false;
        continue;
      }

      // Try moving in priority order
      for (let dir of directionPriority) {
        const canMove = moveOneStep(piece, dir, blockers, true);
        if (canMove) {
          piece.c_leadership += 5;
          // Update blockers with new position
          blockers.add(`${piece.positionX}-${piece.positionY}`);
          break;
        }
      }
    }
  }
}
