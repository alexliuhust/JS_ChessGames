import { Canvas, Rect } from "../common/tools.js";
import { calculateDistance, areAligned } from "../actions/actionTools.js";
import {
  GameWidth as W,
  GameHeight as H,
  SelectPieceColor,
  ReadyToAttackColor,
} from "../common/const.js";

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
  hightlightExtrabilityRange(cxt, piece);
}

export function drawAvailableDestinations(cxt, self, others) {
  let seenOthers = new Set();
  let seenG_A = {};
  for (let i = 0; i < others.length; i++) {
    seenOthers.add(`${others[i].positionX},${others[i].positionY}`);
    seenG_A[`${others[i].positionX},${others[i].positionY}`] = others[i].G_A;
  }

  let availablePositions = [];

  // Collect all available moving destinations
  // for ground arms
  if (self.G_A === 0) {
    for (let d = 0; d < 4; d++) {
      for (let i = 1; i <= self.c_speed; i++) {
        let nx = self.positionX + i * dir[d][0];
        let ny = self.positionY + i * dir[d][1];
        if (!checkAvailablePosition(nx, ny, seenOthers)) {
          if (seenG_A[`${nx},${ny}`] === 0) break;
          else if (seenG_A[`${nx},${ny}`] === 1) continue;
        }
        availablePositions.push([nx, ny]);
      }
    }
  }
  // for air arms
  else {
    for (let x = 0; x <= self.c_speed; x++) {
      for (let y = 0; y <= self.c_speed - x; y++) {
        let nx = self.positionX + x;
        let ny = self.positionY + y;
        if (checkAvailablePosition(nx, ny, seenOthers))
          availablePositions.push([nx, ny]);
        nx = self.positionX + x;
        ny = self.positionY - y;
        if (checkAvailablePosition(nx, ny, seenOthers))
          availablePositions.push([nx, ny]);
        nx = self.positionX - x;
        ny = self.positionY + y;
        if (checkAvailablePosition(nx, ny, seenOthers))
          availablePositions.push([nx, ny]);
        nx = self.positionX - x;
        ny = self.positionY - y;
        if (checkAvailablePosition(nx, ny, seenOthers))
          availablePositions.push([nx, ny]);
      }
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
  let availableTargets = null;
  let availableCenters = null;

  availableTargets = getAvailableTagets(cxt, self, others);

  return [availableTargets, availableCenters];
}

function getAvailableTagets(cxt, self, others) {
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

    let meleeAvailable =
      self.c_melee > 0 &&
      distance === 1 &&
      self.G_A === 0 &&
      others[i].G_A === 0;
    let missile_G_Available =
      self.c_missile_G > 0 &&
      self.c_ammo_G > 0 &&
      others[i].G_A === 0 &&
      distance <= self.range_G &&
      (distance > 1 || (distance == 1 && self.meleeUseMissileEffect));
    let missile_A_Available =
      self.c_missile_A > 0 &&
      self.c_ammo_A > 0 &&
      others[i].G_A === 1 &&
      distance <= self.range_A &&
      distance > 1;
    let missileAvailable = missile_G_Available || missile_A_Available;

    if (meleeAvailable || missileAvailable) {
      availableTargets.push(others[i]);
      availablePositions.push([others[i].positionX, others[i].positionY]);
      if (meleeAvailable) availableType.push(0);
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
    else hightlightMissleTarget(cxt, self, posX, posY, color);
  }

  let range = self.range_G * 50 + 15;
  if (range > 15)
    Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 5);
  range = self.range_A * 50 + 15;
  if (range > 15)
    Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 5);

  return availableTargets;
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

function hightlightMissleTarget(cxt, self, posX, posY, color) {
  let x = posX * 50 + 25;
  let y = posY * 50 + 28;
  let radius = 20;
  Canvas.drawArc(cxt, x, y, radius - 7, color);
  Canvas.drawLine(cxt, x + radius, y, x - radius, y, color, 3);
  Canvas.drawLine(cxt, x, y + radius, x, y - radius, color, 3);
}

function hightlightExtrabilityRange(cxt, self) {
  let color = null;
  let range = 0;
  if (self.healRange > 0) {
    color = "rgb(180, 200, 170)";
    range = self.healRange * 50 + 17;
    Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 1);
  }
  if (self.chargeRange > 0) {
    color = "rgb(156, 220, 254)";
    range = self.chargeRange * 50 + 17;
    Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 1);
  }
  if (self.inspireRange > 0) {
    color = "rgb(160, 160, 250)";
    range = self.inspireRange * 50 + 21;
    Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 1);
  }
  if (self.armorEnhance > 0) {
    color = "rgb(85, 155, 200)";
    range = self.enhanceRange * 50 + 25;
    Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 1);
  }
  if (self.attackEnhance > 0) {
    color = "rgb(163, 100, 215)";
    range = self.enhanceRange * 50 + 29;
    Canvas.drawArc(cxt, self.x + 25, self.y + 25, range, color, 1);
  }
}

function checkAvailablePosition(nx, ny, seenOthers) {
  if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY) {
    return false;
  }
  let str = `${nx},${ny}`;
  if (seenOthers != null && seenOthers.has(str)) {
    return false;
  }
  return true;
}
