import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { GameWidth as W, GameHeight as H } from "../const.js";

const maxX = Math.floor(W / 50);
const maxY = Math.floor(H / 50);

export function drawAvailableDestinations(cxt, mover, blocker) {
  ArmPrimary.checkArmClass(mover);

  let seenBlocker = new Set();
  for (let i = 0; i < blocker.length; i++) {
    seenBlocker.add(`${blocker[i].positionX},${blocker[i].positionY}`);
  }

  let availablePositions = [];
  let dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  for (let d = 0; d < 4; d++) {
    for (let i = 1; i <= mover.c_speed; i++) {
      let nx = mover.positionX + i * dir[d][0];
      let ny = mover.positionY + i * dir[d][1];
      if (!checkAvailablePosition(nx, ny, seenBlocker)) {
        break;
      }
      availablePositions.push([nx, ny]);
    }
  }

  for (let i = 0; i < availablePositions.length; i++) {
    let x = availablePositions[i][0] * 50 + 5;
    let y = availablePositions[i][1] * 50 + 5;
    Canvas.fillRect(cxt, x, y, 40, 40, "rgb(150, 255, 150)");
  }

  return availablePositions;
}

function checkAvailablePosition(nx, ny, seenBlocker) {
  let str = `${nx},${ny}`;
  if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY || seenBlocker.has(str)) {
    return false;
  }
  return true;
}
