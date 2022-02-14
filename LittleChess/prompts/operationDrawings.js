import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { calculateDistance, areAligned } from "../actions/actionTools.js";
import {
  GameWidth as W,
  GameHeight as H,
  SelectPieceColor,
  ReadyToAttackColor,
} from "../const.js";

const maxX = Math.floor(W / 50);
const maxY = Math.floor(H / 50);
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export function drawSelectionRect(cxt, piece, color) {
  Canvas.drawRect(cxt, piece.x - 7, piece.y - 7, 64, 64, color, 3);
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
    Canvas.fillRect(cxt, x, y, 40, 40, SelectPieceColor);
  }

  return availablePositions;
}

export function drawAvailableTargets(cxt, self, others) {
  ArmPrimary.checkArmClass(self);

  // Non-bombing arms
  if (!self.isBombing) {
    let availableTargets = [];
    let availablePositions = [];
    let availableType = [];

    // Collect all available target arms and their chessboard positions
    for (let i = 0; i < others.length; i++) {
      if (others[i] === self) continue;

      let distance = calculateDistance(
        others[i].positionX,
        others[i].positionY,
        self.positionX,
        self.positionY
      );
      let aligned = areAligned(
        others[i].positionX,
        others[i].positionY,
        self.positionX,
        self.positionY
      );

      let meleeAvailable = self.meleeAttack > 0 && distance === 1;
      let missileAvailable =
        self.c_missileAttack > 0 &&
        self.c_ammo > 0 &&
        distance <= self.c_missileRange;
      let chargeAvailable =
        self.c_chargeAttack > 0 && aligned && distance - 1 <= self.c_speed;

      if (meleeAvailable || missileAvailable || chargeAvailable) {
        availableTargets.push(others[i]);
        availablePositions.push([others[i].positionX, others[i].positionY]);
        if (meleeAvailable) availableType.push(0);
        else if (chargeAvailable) availableType.push(2);
        else if (missileAvailable) availableType.push(1);
      }
    }

    // Highlight those target arms
    for (let i = 0; i < availablePositions.length; i++) {
      let color = ReadyToAttackColor;
      let posX = availablePositions[i][0];
      let posY = availablePositions[i][1];
      let type = availableType[i];
      if (type === 0) hightlightMeleeTarget(cxt, posX, posY, color);
      else if (type === 2) hightlightChargeTarget(cxt, posX, posY, color);
      else hightlightMissleTarget(cxt, posX, posY, color);
    }

    return availableTargets;
  }

  // Bombing arms
  else {
    let availableBombingCenters = [];

    // Collect all available bombing centers
    let sx = self.positionX;
    let sy = self.positionY;
    let range = self.c_missileRange;

    for (let x = -range; x <= range; x++) {
      // let restRange = range - Math.abs(x);
      for (let y = -range; y <= range; y++) {
        let nx = sx + x;
        let ny = sy + y;
        let distance = calculateDistance(0, 0, x, y);
        if (
          (nx === sx && ny === sy) ||
          distance <= Math.floor(range / 3) ||
          !checkAvailablePosition(nx, ny, null)
        ) {
          continue;
        }
        if (distance <= range) availableBombingCenters.push([nx, ny]);
      }
    }

    // Highlight those available bombing centers
    for (let i = 0; i < availableBombingCenters.length; i++) {
      let x = availableBombingCenters[i][0] * 50 + 10;
      let y = availableBombingCenters[i][1] * 50 + 10;
      hightlightBombCenter(cxt, x, y, ReadyToAttackColor);
    }

    return availableBombingCenters;
  }
}

function hightlightMeleeTarget(cxt, posX, posY, color) {
  let x = posX * 50;
  let y = posY * 50;
  let x1 = x + 12;
  let y1 = y + 16;
  let x2 = x1 + 26;
  let y2 = y1 + 26;
  Canvas.drawLine(cxt, x1, y1, x2, y2, color, 5);
  Canvas.drawLine(cxt, x1, y2, x2, y1, color, 5);
}

function hightlightChargeTarget(cxt, posX, posY, color) {
  let x = posX * 50 + 25;
  let y = posY * 50 + 28;
  Canvas.drawLine(cxt, x + 20, y, x - 20, y, color, 3);
  Canvas.drawLine(cxt, x, y + 20, x, y - 20, color, 3);
  Canvas.drawRect(cxt, x - 10, y - 10, 20, 20, color, 3);
}

function hightlightMissleTarget(cxt, posX, posY, color) {
  let x = posX * 50 + 25;
  let y = posY * 50 + 28;
  let radius = 20;
  Canvas.drawArc(cxt, x, y, radius - 7, color);
  Canvas.drawLine(cxt, x + radius, y, x - radius, y, color, 3);
  Canvas.drawLine(cxt, x, y + radius, x, y - radius, color, 3);
}

function hightlightBombCenter(cxt, posX, posY, color) {
  Canvas.fillRect(cxt, posX, posY, 30, 30, color);
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
