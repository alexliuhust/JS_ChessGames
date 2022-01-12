import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { GameWidth as W, GameHeight as H } from "../const.js";

const maxX = Math.floor(W / 50);
const maxY = Math.floor(H / 50);

export function drawAvailableDestinations(cxt, self, others) {
  ArmPrimary.checkArmClass(self);

  let seenothers = new Set();
  for (let i = 0; i < others.length; i++) {
    seenothers.add(`${others[i].positionX},${others[i].positionY}`);
  }

  let availablePositions = [];
  let dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  for (let d = 0; d < 4; d++) {
    for (let i = 1; i <= self.c_speed; i++) {
      let nx = self.positionX + i * dir[d][0];
      let ny = self.positionY + i * dir[d][1];
      if (!checkAvailablePosition(nx, ny, seenothers)) {
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

export function drawAvailableTargets(cxt, self, others) {
  ArmPrimary.checkArmClass(self);

  if (!self.isBombing) {
    let availableTargets = [];
    let availablePositions = [];

    for (let i = 0; i < others.length; i++) {
      if (others[i] === self) continue;

      let distance =
        Math.abs(others[i].positionX - self.positionX) +
        Math.abs(others[i].positionY - self.positionY);

      if (
        (distance === 1 && self.meleeAttack > 0) ||
        (distance > 1 &&
          distance <= self.missleRange &&
          self.missleAttack > 0 &&
          self.ammo > 0)
      ) {
        availableTargets.push(others[i]);
        availablePositions.push([others[i].positionX, others[i].positionY]);
      }
    }
    for (let i = 0; i < availablePositions.length; i++) {
      let x = availablePositions[i][0] * 50 + 25;
      let y = availablePositions[i][1] * 50 + 25;
      let color = "rgb(195, 50, 50)";
      let radius = 30;
      Canvas.drawArc(cxt, x, y, radius - 7, color);
      Canvas.drawLine(cxt, x + radius, y, x - radius, y, color, 3);
      Canvas.drawLine(cxt, x, y + radius, x, y - radius, color, 3);
    }

    return availableTargets;
  }

  return null;
}

function checkAvailablePosition(nx, ny, seenothers) {
  let str = `${nx},${ny}`;
  if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY || seenothers.has(str)) {
    return false;
  }
  return true;
}
