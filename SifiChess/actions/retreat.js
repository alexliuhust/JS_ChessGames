import { sortPieces, moveOneStep } from "./actionTools.js";
import { GameWidth, GameHeight } from "../common/const.js";

const maxX = GameWidth / 50;
const maxY = GameHeight / 50;

export function tryRetreat(playerNumber, pieces, enemies) {
  let blockers = new Set();
  let direction = "";

  if (playerNumber === 1) direction = "L";
  else direction = "R";

  sortPieces(pieces, direction);
  blockers.clear();
  for (let i = 0; i < pieces.length; i++)
    blockers.add(`${pieces[i].positionX}-${pieces[i].positionY}`);
  for (let i = 0; i < enemies.length; i++)
    blockers.add(`${enemies[i].positionX}-${enemies[i].positionY}`);

  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].speed <= 0) continue;
    if (pieces[i].c_leadership <= 0) {
      if (pieces[i].positionX === 0 || pieces[i].positionX === maxX - 1)
        pieces[i].isAlive = false;
      if (pieces[i].positionY === 0 || pieces[i].positionY === maxY - 1)
        pieces[i].isAlive = false;
      moveOneStep(pieces[i], direction, blockers, true);
    }
  }
}
