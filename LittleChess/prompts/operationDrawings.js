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

  let seenOthers = new Set();
  for (let i = 0; i < others.length; i++) {
    seenOthers.add(`${others[i].positionX},${others[i].positionY}`);
  }

  let availablePositions = [];

  // Collect all available moving destinations
  for (let d = 0; d < 4; d++) {
    for (let i = 1; i <= self.c_speed; i++) {
      let nx = self.positionX + i * dir[d][0];
      let ny = self.positionY + i * dir[d][1];
      if (!checkAvailablePosition(nx, ny, seenOthers)) {
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

  let availableTargets = null;
  let availableCenters = null;

  availableTargets = getAvailableTagetsForNonBombing(cxt, self, others);
  if (self.isBombing)
    availableCenters = getAvailableCentersForBombing(cxt, self, others);

  return [availableTargets, availableCenters];
}

function getAvailableTagetsForNonBombing(cxt, self, others) {
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
      !self.isBombing &&
      self.c_missileAttack > 0 &&
      self.c_ammo > 0 &&
      distance <= self.c_missileRange &&
      distance > 1 &&
      !isTargeBlocked(self, others[i], others);
    let chargeAvailable =
      distance > 1 &&
      self.c_chargeAttack > 0 &&
      aligned &&
      distance - 1 <= self.c_speed;

    if (meleeAvailable || missileAvailable || chargeAvailable) {
      availableTargets.push(others[i]);
      availablePositions.push([others[i].positionX, others[i].positionY]);
      if (meleeAvailable) availableType.push(0);
      else if (chargeAvailable) availableType.push(2);
      else if (missileAvailable) availableType.push(1);
    }
  }

  let color = ReadyToAttackColor;
  // Highlight those target arms
  for (let i = 0; i < availablePositions.length; i++) {
    let posX = availablePositions[i][0];
    let posY = availablePositions[i][1];
    let type = availableType[i];
    if (type === 0) hightlightMeleeTarget(cxt, self, posX, posY, color);
    else if (type === 2) hightlightChargeTarget(cxt, self, posX, posY, color);
    else hightlightMissleTarget(cxt, self, posX, posY, color);
  }

  let range = self.c_missileRange * 50 + 15;
  if (range === 15) range = 70;
  Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 5);

  return availableTargets;
}

function getAvailableCentersForBombing(cxt, self, others) {
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
  let r1 = Math.floor(range / 3) * 50 + 15;
  let r2 = range * 50 + 20;
  sx = sx * 50 + 25;
  sy = sy * 50 + 25;
  Canvas.drawArc(cxt, sx, sy, r1, ReadyToAttackColor, 5);
  Canvas.drawArc(cxt, sx, sy, r2, ReadyToAttackColor, 5);

  return availableBombingCenters;
}

function isTargeBlocked(self, target, others) {
  if (self.isParabola) return false;
  for (let i = 0; i < others.length; i++) {
    let blocker = others[i];
    if (blocker === self || blocker === target) continue;

    let line = [self.x + 25, self.y + 25, target.x + 25, target.y + 25];
    if (Rect.lineThroughRect(line, blocker)) return true;
  }
  return false;
}

function hightlightMeleeTarget(cxt, self, posX, posY, color) {
  let x = posX * 50;
  let y = posY * 50;
  let x1 = x + 12;
  let y1 = y + 16;
  let x2 = x1 + 26;
  let y2 = y1 + 26;
  Canvas.drawLine(cxt, x1, y1, x2, y2, color, 5);
  Canvas.drawLine(cxt, x1, y2, x2, y1, color, 5);
}

function hightlightChargeTarget(cxt, self, posX, posY, color) {
  let x = posX * 50 + 25;
  let y = posY * 50 + 28;
  Canvas.drawLine(cxt, x + 20, y, x - 20, y, color, 3);
  Canvas.drawLine(cxt, x, y + 20, x, y - 20, color, 3);
  Canvas.drawRect(cxt, x - 10, y - 10, 20, 20, color, 3);
  let x0 = self.x + 25;
  let y0 = self.y + 25;
  y -= 3;
  let offSet = 30;
  if (x0 < x) {
    x0 += offSet + 5;
    x -= offSet;
  } else if (x0 > x) {
    x0 -= offSet + 5;
    x += offSet;
  } else if (y0 < y) {
    y0 += offSet + 5;
    y -= offSet;
  } else {
    y0 -= offSet + 5;
    y += offSet;
  }
  Canvas.drawLine(cxt, x0, y0, x, y, color, 5);
}

function hightlightMissleTarget(cxt, self, posX, posY, color) {
  let x = posX * 50 + 25;
  let y = posY * 50 + 28;
  let radius = 20;
  Canvas.drawArc(cxt, x, y, radius - 7, color);
  Canvas.drawLine(cxt, x + radius, y, x - radius, y, color, 3);
  Canvas.drawLine(cxt, x, y + radius, x, y - radius, color, 3);
}

function checkAvailablePosition(nx, ny, seenOthers) {
  let str = `${nx},${ny}`;
  if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY) {
    return false;
  }
  if (seenOthers != null && seenOthers.has(str)) {
    return false;
  }
  return true;
}
