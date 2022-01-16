import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { GameWidth as W, GameHeight as H } from "../const.js";

const maxX = Math.floor(W / 50);
const maxY = Math.floor(H / 50);
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export function drawSelectionRect(cxt, piece) {
  Canvas.drawRect(cxt, piece.x - 7, piece.y - 7, 64, 64, "rgb(50, 195, 50)", 3);
}

export function drawAvailableDestinations(cxt, self, others) {
  ArmPrimary.checkArmClass(self);

  let seenothers = new Set();
  for (let i = 0; i < others.length; i++) {
    seenothers.add(`${others[i].positionX},${others[i].positionY}`);
  }

  let availablePositions = [];

  // Collect all available moving destinations
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

  // Highlight those available moving destinations
  for (let i = 0; i < availablePositions.length; i++) {
    let x = availablePositions[i][0] * 50 + 5;
    let y = availablePositions[i][1] * 50 + 5;
    Canvas.fillRect(cxt, x, y, 40, 40, "rgb(150, 255, 150)");
  }

  return availablePositions;
}

export function drawAvailableTargets(cxt, self, others) {
  ArmPrimary.checkArmClass(self);

  // Non-bombing arms
  if (!self.isBombing) {
    let availableTargets = [];
    let availablePositions = [];

    // Collect all available target arms and their chessboard positions
    for (let i = 0; i < others.length; i++) {
      if (others[i] === self) continue;

      let distance =
        Math.abs(others[i].positionX - self.positionX) +
        Math.abs(others[i].positionY - self.positionY);

      let aligned =
        others[i].positionX === self.positionX ||
        others[i].positionY === self.positionY;

      let meleeAvailable = self.meleeAttack > 0 && distance === 1;
      let missleAvailable =
        self.c_missleAttack > 0 &&
        self.c_ammo > 0 &&
        distance <= self.c_missleRange;
      let chargeAvailable =
        self.c_chargeAttack > 0 && aligned && distance - 1 <= self.c_speed;

      if (meleeAvailable || missleAvailable || chargeAvailable) {
        availableTargets.push(others[i]);
        availablePositions.push([others[i].positionX, others[i].positionY]);
      }
    }

    // Highlight those target arms
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
  } else {
    let availableBombingCenters = [];

    // Collect all available bombing centers
    let sx = self.positionX;
    let sy = self.positionY;
    let range = self.c_missleRange;
    for (let x = -range; x <= range; x++) {
      let restRange = range - Math.abs(x);
      for (let y = -restRange; y <= restRange; y++) {
        let nx = sx + x;
        let ny = sy + y;
        let distance = Math.abs(x) + Math.abs(y);
        if (
          (nx === sx && ny === sy) ||
          distance <= Math.floor(range / 3) ||
          !checkAvailablePosition(nx, ny, null)
        ) {
          continue;
        }
        availableBombingCenters.push([nx, ny]);
      }
    }

    // Highlight those available bombing centers
    for (let i = 0; i < availableBombingCenters.length; i++) {
      let x = availableBombingCenters[i][0] * 50 + 10;
      let y = availableBombingCenters[i][1] * 50 + 10;
      Canvas.fillRect(cxt, x, y, 30, 30, "rgb(225, 100, 100)");
    }

    return availableBombingCenters;
  }
}

function checkAvailablePosition(nx, ny, seenothers) {
  let str = `${nx},${ny}`;
  if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY) {
    return false;
  }
  if (seenothers != null && seenothers.has(str)) {
    return false;
  }
  return true;
}
