import { Canvas } from "../common/tools.js";
import { calculateDistance, isTargeBlocked, isChargeTargetCanBeSeen } from "../actions/actionTools.js";
import { GameWidth as W, GameHeight as H, SelectPieceColor, ReadyToAttackColor } from "../common/const.js";
import { getParabolaPointSet } from "../effects/effectTools.js";

const maxX = Math.floor(W / 50);
const maxY = Math.floor(H / 50);
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export function drawSelectionRect(cxt, piece, color) {
  Canvas.drawRect(cxt, piece.x - 2, piece.y - 2, 54, 54, "black", 5);
  Canvas.drawRect(cxt, piece.x - 2, piece.y - 2, 54, 54, color, 2);
  hightlightExtrabilityRange(cxt, piece);
}

export function drawAvailableDestinations(cxt, self, others) {
  let seenOthers = {};
  for (let i = 0; i < others.length; i++) {
    seenOthers[`${others[i].positionX},${others[i].positionY}`] = others[i];
  }

  let availablePositions = [];

  // Collect all available moving destinations
  for (let d = 0; d < 4; d++) {
    let maxDistance = self.c_speed;
    for (let i = 1; i <= maxDistance; i++) {
      let nx = self.positionX + i * dir[d][0];
      let ny = self.positionY + i * dir[d][1];

      if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY) break;

      let str = `${nx},${ny}`;
      // If there is a blocker in this cell
      if (seenOthers != null && str in seenOthers) {
        let other = seenOthers[str];
        let friendly = other.player.playerNumber == self.player.playerNumber;
        let isSparse = other.isSparse() || self.isSparse();

        // If the blocker is an enemy, this direction is a dead end
        if (!friendly) break;

        // If the mover or the blocker is an SF unit
        if (isSparse) {
          maxDistance--; // Go through each friendly piece results 1 speed penalty

          // They can swap positions if all the following are met:
          // (1) the blocker is adjacent to the mover;
          // (2) both of them can move for at least 2 steps;
          // (3) neither of them is trapped in melee.
          if (i == 1 && self.c_speed >= 2 && other.c_speed >= 2 && !self.trappedInMelee() && !other.trappedInMelee()) {
            availablePositions.push([nx, ny]);
          }
          // If not, the mover can still go through the blocker
          else {
            continue;
          }
        }
        // If neither the mover nor the blocker is an SF unit, this direction is a dead end
        else {
          break;
        }
      }
      // If there is no blocker in this cell
      else {
        availablePositions.push([nx, ny]);
      }
    }
  }

  // Highlight those available moving destinations
  for (let i = 0; i < availablePositions.length; i++) {
    let px = availablePositions[i][0];
    let py = availablePositions[i][1];

    if (seenOthers != null && `${px},${py}` in seenOthers) {
      let x1 = self.x + 25;
      let y1 = self.y + 25;
      let x2 = px * 50 + 25;
      let y2 = py * 50 + 25;
      Canvas.drawSwapSign(cxt, x1, y1, x2, y2, SelectPieceColor, 4);
    } else {
      let x = px * 50 + 5;
      let y = py * 50 + 5;
      Canvas.fillRect(cxt, x, y, 40, 40, SelectPieceColor);
    }
  }

  indicateAutoMissile(cxt, self);

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

    let distance = calculateDistance(others[i].positionX, others[i].positionY, self.positionX, self.positionY);

    let meleeAvailable = self.meleeAttack > 0 && distance === 1;
    let missileAvailable =
      self.c_missileAttack > 0 &&
      self.c_ammo > 0 &&
      distance <= self.c_missileRange &&
      distance > 1 &&
      !isTargeBlocked(self, others[i], others);
    let chargeAvailable =
      distance > 1 &&
      self.c_chargeAttack > 0 &&
      distance <= self.c_speed &&
      isChargeTargetCanBeSeen(self, others[i], self.player.pieceList, others);

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

    Canvas.fillRect(cxt, posX * 50, posY * 50, 50, 50, "rgba(255, 255, 255, 0.5)");
    if (type === 0) hightlightMeleeTarget(cxt, self, posX, posY, color);
    else if (type === 2) hightlightChargeTarget(cxt, self, posX, posY, color);
    else hightlightMissleTarget(cxt, self, posX, posY, color);
  }

  let range = self.c_missileRange;
  if (range != 0) Canvas.drawDiscreteArc(cxt, self.positionX, self.positionY, range, 0, color, 5);

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

function drawConnectionLine(cxt, self, tx, ty, color) {
  let x0 = self.x + 25;
  let y0 = self.y + 28;
  let totalDistance = calculateDistance(x0, y0, tx, ty);

  // For parabolic trajectory
  if (self.isParabola) {
    let time = Math.round(totalDistance / 8);
    let maxHeightRatio =
      self.missileParameters != null && self.missileParameters.maxHeightRatio != null
        ? self.missileParameters.maxHeightRatio
        : 0.25;
    let maxHeight = totalDistance * maxHeightRatio;
    let [points, angles] = getParabolaPointSet(x0, y0, tx, ty, time, maxHeight);
    for (let i = 3; i < points.length; i += 2) {
      Canvas.drawLine(cxt, points[i - 1].x, points[i - 1].y, points[i].x, points[i].y, color, 2);
    }
  }
  // For straight trajectory
  else {
    let cos = (tx - x0) / totalDistance;
    let sin = (ty - y0) / totalDistance;
    let x1 = x0 + cos * 10;
    let y1 = y0 + sin * 10;
    let x2 = tx - cos * 10;
    let y2 = ty - sin * 10;

    let x = x1;
    let y = y1;
    let curDistance = calculateDistance(x1, y1, x, y);
    let draw = false;
    while (curDistance < totalDistance) {
      let dx = cos * 10;
      let dy = sin * 10;
      if (draw) Canvas.drawLine(cxt, x, y, x + dx, y + dy, color, 2);
      x = x + dx;
      y = y + dy;
      curDistance = calculateDistance(x1, y1, x, y);
      draw = !draw;
    }
  }
}

function hightlightMissleTarget(cxt, self, posX, posY, color) {
  let x = posX * 50 + 25;
  let y = posY * 50 + 28;
  let radius = 20;
  Canvas.drawArc(cxt, x, y, radius - 7, color);
  Canvas.drawLine(cxt, x + radius, y, x - radius, y, color, 3);
  Canvas.drawLine(cxt, x, y + radius, x, y - radius, color, 3);
  drawConnectionLine(cxt, self, x, y, color);
}

function hightlightExtrabilityRange(cxt, self) {
  let color = null;
  let bias = 0;
  let weight = 3;
  if (self.healRange > 0) {
    color = "rgb(180, 200, 170)";
    Canvas.drawDiscreteArc(cxt, self.positionX, self.positionY, self.healRange, bias, color, weight);
  }
  if (self.inspireRange > 0) {
    color = "rgb(160, 160, 250)";
    Canvas.drawDiscreteArc(cxt, self.positionX, self.positionY, self.inspireRange, bias, color, weight);
  }
  if (self.armorEnhance > 0) {
    color = "rgb(85, 155, 200)";
    Canvas.drawDiscreteArc(cxt, self.positionX, self.positionY, self.enhanceRange, bias, color, weight);
  }
  if (self.attackEnhance > 0) {
    color = "rgb(163, 100, 215)";
    Canvas.drawDiscreteArc(cxt, self.positionX, self.positionY, self.enhanceRange, bias, color, weight);
  }
}

function indicateAutoMissile(cxt, self) {
  if (!self.autofireEnable || self.preMissileTarget == null || !self.preMissileTarget.isAlive) return;

  let cX = self.preMissileTarget.positionX;
  let cY = self.preMissileTarget.positionY;
  let previousDistance = calculateDistance(self.positionX, self.positionY, cX, cY);
  let enemies = self.player.enemyList;
  let outOfRange =
    previousDistance <= 1 ||
    previousDistance > self.missileRange ||
    isTargeBlocked(self, self.preMissileTarget, enemies);

  Canvas.fillRect(cxt, cX * 50, cY * 50, 50, 50, "rgba(255, 255, 255, 0.5)");
  if (!outOfRange) {
    Canvas.drawArc(cxt, cX * 50 + 25, cY * 50 + 25, 21, ReadyToAttackColor, 4);
    Canvas.drawArc(cxt, cX * 50 + 25, cY * 50 + 25, 10, ReadyToAttackColor, 4);
    drawConnectionLine(cxt, self, cX * 50 + 25, cY * 50 + 25, ReadyToAttackColor);
  } else {
    Canvas.drawArc(cxt, cX * 50 + 25, cY * 50 + 25, 21, ReadyToAttackColor, 4);
  }
}

function checkAvailablePosition(nx, ny, seenOthers) {
  let str = `${nx},${ny}`;
  if (nx < 0 || nx >= maxX || ny < 0 || ny >= maxY) {
    return false;
  }
  if (seenOthers != null && str in seenOthers) {
    return false;
  }
  return true;
}
