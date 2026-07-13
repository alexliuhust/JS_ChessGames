import {
  HpColor as HC,
  AmmoColor as AC,
  LeadColor as DC,
  LevelColor as LC,
  HealColor as EC,
  ColorGradient as CG,
} from "./const.js";
import { calculateDistance } from "../actions/actionTools.js";

// ======================================================================
// ============================ Canvas Class ============================
// ======================================================================

export const Canvas = {
  // Clear the canvas
  clear: function (cxt, x, y) {
    cxt.clearRect(0, 0, x, y);
  },
  clearRect: function (cxt, x, y, width, height) {
    cxt.clearRect(x, y, width, height);
  },

  // Draw an image
  drawImg: function (cxt, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!sw) cxt.drawImage(img, sx, sy);
    else cxt.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  },

  // Draw text
  drawText: function (cxt, string, x, y, color, size) {
    cxt.fillStyle = color;
    cxt.font = `bold ${size}px sans-serif`;
    cxt.fillText(string, x, y);
  },

  // Draw a filled rect
  fillRect: function (cxt, x, y, width, height, color) {
    cxt.fillStyle = color;
    cxt.fillRect(x, y, width, height);
  },

  // Draw the borderline of a rect
  drawRect: function (cxt, x, y, width, height, color, weight) {
    cxt.strokeStyle = color;
    cxt.lineWidth = 1.2;
    if (weight != null) {
      cxt.lineWidth = weight;
    }
    cxt.strokeRect(x, y, width, height);
  },

  // Draw a filled circle
  // (x, y): center pos
  fillArc: function (cxt, x, y, radius, color) {
    cxt.fillStyle = color;
    cxt.beginPath();
    cxt.arc(x, y, radius, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fill();
  },

  // Draw the borderline of a circle
  drawArc: function (cxt, x, y, radius, color, weight) {
    cxt.beginPath();
    cxt.arc(x, y, radius, 0, Math.PI * 2, true);
    cxt.lineWidth = 2;
    if (weight != null) {
      cxt.lineWidth = weight;
    }
    cxt.strokeStyle = color;
    cxt.stroke();
  },

  // Draw a line
  drawLine: function (cxt, x0, y0, x1, y1, color, weight) {
    cxt.beginPath();
    cxt.moveTo(x0, y0);
    cxt.lineTo(x1, y1);
    cxt.strokeStyle = color;
    cxt.lineWidth = 2;
    if (weight != null) {
      cxt.lineWidth = weight;
    }
    cxt.stroke();
  },

  // Draw the borderline of a discrete circle
  drawDiscreteArc: function (cxt, posX, posY, range, bias, color, weight) {
    let cands = [];
    for (let x = -range; x <= range; x++) {
      for (let y = -range; y <= range; y++) {
        let nx = posX + x;
        let ny = posY + y;
        let distance = calculateDistance(0, 0, x, y);
        if (distance <= range) {
          cands.push([nx, ny]);
        }
      }
    }

    for (let i = 0; i < cands.length; i++) {
      let posX = cands[i][0];
      let posY = cands[i][1];
      let x = posX * 50;
      let y = posY * 50;
      if (!cands.some((pair) => pair[0] == posX - 1 && pair[1] == posY)) {
        this.drawLine(cxt, x - bias, y - bias, x - bias, y + 50 + bias, color, weight);
      }
      if (!cands.some((pair) => pair[0] == posX + 1 && pair[1] == posY)) {
        this.drawLine(cxt, x + 50 + bias, y - bias, x + 50 + bias, y + 50 + bias, color, weight);
      }
      if (!cands.some((pair) => pair[0] == posX && pair[1] == posY - 1)) {
        this.drawLine(cxt, x - bias, y - bias, x + 50 + bias, y - bias, color, weight);
      }
      if (!cands.some((pair) => pair[0] == posX && pair[1] == posY + 1)) {
        this.drawLine(cxt, x - bias, y + 50 + bias, x + 50 + bias, y + 50 + bias, color, weight);
      }
    }
  },

  // Draw a white flag
  drawWhiteFlag: function (cxt, arm, dx, dy) {
    this.fillRect(cxt, arm.x, arm.y + 8, 50, 38, "rgba(200, 200, 200, 0.7)");
    this.drawLine(cxt, arm.x + dx, arm.y + dy, arm.x + dx, arm.y + dy + 25, "black", 4);
    this.drawRect(cxt, arm.x + dx - 1, arm.y + dy - 1, 22, 15, "black", 2);
    this.fillRect(cxt, arm.x + dx + 2, arm.y + dy + 1, 17, 11, "rgba(255, 255, 255, 0.7)");
  },

  // Draw a piece
  drawPiece: function (cxt, arm, gc) {
    // Draw arm flag
    this.drawImg(cxt, arm.img, 0, 0, 50, 50, arm.x + 1, arm.y + 1, 48, 48);

    // Draw stripe color
    this.drawLine(cxt, arm.x + 3, arm.y + 10, arm.x + 3, arm.y + 45, gc, 4);
    this.drawLine(cxt, arm.x + 47, arm.y + 10, arm.x + 47, arm.y + 45, gc, 4);

    // Draw level
    let number = arm.level >= 2 ? arm.level : 0;
    for (let i = 0; i < number; i++) {
      let x1 = arm.x + 1,
        x2 = arm.x + 5;
      let y1 = arm.y + 39 - i * 5,
        y2 = arm.y + 39 - i * 5;
      this.drawLine(cxt, x1, y1, x2, y2, LC, 4);
    }

    // Draw fatigue mark
    let fx = arm.x + 10;
    let fy = arm.y + 40;
    let fr = 4;
    let fatiguePercent = 100 - Math.round((100 * arm.currentFatigue) / arm.totalStamina);
    this.fillArc(cxt, fx, fy, fr + 1, "black");
    let color = CG[fatiguePercent == 0 ? 1 : fatiguePercent];
    this.fillArc(cxt, fx, fy, fr, color);

    // Draw HP, ammo, and leaddership bars
    let hlen, sclen, alen, llen, elen;
    hlen = (48 * arm.getTotalHP()) / arm.getOriginalHP();
    sclen = (48 * arm.getCurrentScale()) / arm.getOriginalScale();
    let hperc = Math.round((100 * arm.getTotalHP()) / arm.getOriginalHP());
    let hpcolor = CG[hperc == 0 ? 1 : hperc];
    if (arm.ammo === -1) alen = 0;
    else alen = (48 * arm.c_ammo) / arm.ammo;
    llen = (48 * Math.max(arm.c_leadership, 0)) / arm.leadership;
    elen = (48 * arm.c_totalHeal) / arm.totalHeal;

    this.drawLine(cxt, arm.x + 1, arm.y + 3, arm.x + 1 + sclen, arm.y + 3, "rgb(180,180,180)", 4);
    this.drawLine(cxt, arm.x + 1, arm.y + 3, arm.x + 1 + hlen, arm.y + 3, hpcolor, 4);
    this.drawLine(cxt, arm.x + 1, arm.y + 5, arm.x + 49, arm.y + 5, "black", 1);
    this.drawLine(cxt, arm.x + 1, arm.y + 7, arm.x + 1 + llen, arm.y + 7, DC, 4);
    this.drawLine(cxt, arm.x + 1, arm.y + 9, arm.x + 49, arm.y + 9, "black", 1);
    if (arm.ammo > 0) {
      this.drawLine(cxt, arm.x + 1, arm.y + 45, arm.x + 49, arm.y + 45, "black", 1);
      this.drawLine(cxt, arm.x + 1, arm.y + 47, arm.x + 1 + alen, arm.y + 47, AC, 4);
    }
    let ey = arm.y + 47;
    if (arm.ammo > 0) ey -= 4;
    this.drawLine(cxt, arm.x + 1, ey, arm.x + 1 + elen, ey, EC, 4);

    // Draw speed and autofire indicator
    if (arm.showSpeed) {
      let color = arm.c_speed !== arm.speed ? "red" : "green";
      this.drawText(cxt, arm.c_speed, arm.x + 5, arm.y + 24, color, 20);

      if (arm.missileAttack > 0 && arm.autofireEnable) {
        this.drawText(cxt, "A", arm.x + 32, arm.y + 45, "green", 20);
      }
    }

    // Draw white flag
    if (arm.c_leadership <= 0 && !arm.hasInstability()) {
      this.drawWhiteFlag(cxt, arm, 9, 20);
    }

    // Draw unoperability mark
    if (!arm.operable) {
      let x_s = arm.x + 33;
      let x_e = arm.x + 43;
      let y_1 = arm.y + 10;
      let y_2 = arm.y + 20;
      let thick = 4;
      this.drawLine(cxt, x_s, y_1, x_e, y_2, "red", thick);
      this.drawLine(cxt, x_s, y_2, x_e, y_1, "red", thick);
    }
  },

  drawSwapSign: function (cxt, xs, ys, xd, yd, color, weight) {
    let x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6;

    let axsBias = 10;
    let dptBias = 6;
    let arrBias = 14;
    let weightBias = 5;

    // Horizontal
    if (ys == yd) {
      // Upper arrow
      x1 = Math.min(xs, xd) + axsBias;
      x2 = Math.max(xs, xd) - axsBias;
      x3 = x2 - arrBias;
      y1 = ys - dptBias;
      y2 = ys - dptBias;
      y3 = ys - arrBias;
      // Lower arrow
      x4 = x1;
      x5 = x2;
      x6 = x1 + arrBias;
      y4 = ys + dptBias;
      y5 = ys + dptBias;
      y6 = ys + arrBias;
    }
    // Vertical
    else {
      // Left arrow
      y1 = Math.max(ys, yd) - axsBias;
      y2 = Math.min(ys, yd) + axsBias;
      y3 = y2 + arrBias;
      x1 = xs - dptBias;
      x2 = xs - dptBias;
      x3 = xs - arrBias;
      // Right arrow
      y4 = y1;
      y5 = y2;
      y6 = y1 - arrBias;
      x4 = xs + dptBias;
      x5 = xs + dptBias;
      x6 = xs + arrBias;
    }

    this.drawLine(cxt, x1, y1, x2, y2, "black", weight + weightBias);
    this.drawLine(cxt, x3, y3, x2, y2, "black", weight + weightBias);
    this.drawLine(cxt, x4, y4, x5, y5, "black", weight + weightBias);
    this.drawLine(cxt, x6, y6, x4, y4, "black", weight + weightBias);

    this.drawLine(cxt, x1, y1, x2, y2, color, weight);
    this.drawLine(cxt, x3, y3, x2, y2, color, weight);
    this.drawLine(cxt, x4, y4, x5, y5, color, weight);
    this.drawLine(cxt, x6, y6, x4, y4, color, weight);
  },

  drawArrow_Point: function (cxt, xs, ys, xd, yd, color, weightLine, weightArrow, arrowStartPerc = 0.6, bg = false) {
    let length = Math.round(Math.sqrt((xs - xd) ** 2 + (ys - yd) ** 2));
    let sin = (yd - ys) / length;
    let cos = (xd - xs) / length;
    let step = 1;
    let arrowStart = Math.round(length * arrowStartPerc);

    let x2 = xs + arrowStart * cos;
    let y2 = ys + arrowStart * sin;
    if (bg) {
      this.drawLine(cxt, xs, ys, x2, y2, "black", weightLine + 4);
    }
    this.drawLine(cxt, xs, ys, x2, y2, color, weightLine);

    for (let i = arrowStart; i < length; i += step) {
      let x1 = xs + i * cos;
      let y1 = ys + i * sin;
      let x2 = xs + (i + 1) * cos;
      let y2 = ys + (i + 1) * sin;
      let w = ((length - i) * weightArrow) / (length - arrowStart);
      if (bg) {
        this.drawLine(cxt, x1, y1, x2, y2, "black", w + 4);
      }
      this.drawLine(cxt, x1, y1, x2, y2, color, w);
    }
  },

  drawArrow_Angle: function (
    cxt,
    xs,
    ys,
    sin,
    cos,
    length,
    color,
    weightLine,
    weightArrow,
    arrowStartPerc = 0.6,
    bg = false,
  ) {
    let xd = xs + length * cos;
    let yd = ys + length * sin;
    this.drawArrow_Point(cxt, xs, ys, xd, yd, color, weightLine, weightArrow, arrowStartPerc, bg);
  },
};

// ======================================================================
// ============================ Rect Class ============================
// ======================================================================

export const Rect = {
  // Whether a point is located inside a rect
  pointInRect: function (point, rect) {
    if (point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height)
      return true;

    return false;
  },
  // Whether two circles intersect
  circleInCircle: function (cir1, cir2) {
    if (Math.sqrt(Math.pow(cir1.x - cir2.x, 2) + Math.pow(cir1.y - cir2.y, 2)) < cir1.radius + cir2.radius) return true;

    return false;
  },
  // Whether a rect and a circle intersect
  rectInCircle: function (rect, cir) {
    var x1 = rect.x,
      y1 = rect.y,
      x2 = rect.x + rect.width,
      y2 = rect.y + rect.height;

    if (
      Math.sqrt(Math.pow(x1 - cir.x, 2) + Math.pow(y1 - cir.y, 2)) < cir.radius ||
      Math.sqrt(Math.pow(x1 - cir.x, 2) + Math.pow(y2 - cir.y, 2)) < cir.radius ||
      Math.sqrt(Math.pow(x2 - cir.x, 2) + Math.pow(y2 - cir.y, 2)) < cir.radius ||
      Math.sqrt(Math.pow(x2 - cir.x, 2) + Math.pow(y1 - cir.y, 2)) < cir.radius
    )
      return true;

    return false;
  },
  // Whether a line crosses a vertical line
  lineCrossVerticalLine: function (line1, line2) {
    if (line2[0] !== line2[2]) return 0;

    let x0 = line1[0];
    let y0 = line1[1];
    let x1 = line1[2];
    let y1 = line1[3];

    let offset = 12;
    let y_u = Math.min(line2[1], line2[3]);
    let y_d = Math.max(line2[1], line2[3]);
    let x_l = line2[0];

    let y_l = ((x_l - x0) * (y1 - y0)) / (x1 - x0) + y0;

    if (y_u + offset < y_l && y_l < y_d - offset) return 2;
    if ((y_u <= y_l && y_l <= y_u + offset) || (y_d - offset <= y_l && y_l <= y_d)) return 1;
    return 0;
  },
  // Whether a line crosses a horizontal line
  lineCrossHorizontalLine: function (line1, line2) {
    if (line2[1] !== line2[3]) return 0;

    let x0 = line1[0];
    let y0 = line1[1];
    let x1 = line1[2];
    let y1 = line1[3];

    let offset = 12;
    let x_f = Math.min(line2[0], line2[2]) + offset;
    let x_r = Math.max(line2[0], line2[2]) - offset;
    let y_l = line2[1];

    let x_l = ((y_l - y0) * (x1 - x0)) / (y1 - y0) + x0;

    if (x_f + offset < x_l && x_l < x_r - offset) return 2;
    if ((x_f <= x_l && x_l <= x_f + offset) || (x_r - offset <= x_l && x_l <= x_r)) return 1;
    return 0;
  },

  // Whether a line goes through a rect
  lineThroughRect: function (line, rect) {
    let x0 = line[0];
    let y0 = line[1];
    let x1 = line[2];
    let y1 = line[3];
    let x2 = rect.x + 25;
    let y2 = rect.y + 25;

    // if the blocking rect is not even between the end points of the line
    if (x2 < Math.min(x0, x1) || x2 > Math.max(x0, x1)) return false;
    if (y2 < Math.min(y0, y1) || y2 > Math.max(y0, y1)) return false;

    // if attacker, target, and blocking rect are aligned
    if (x0 === x1) {
      if (x0 === x2) return true;
      return false;
    }
    if (y0 === y1) {
      if (y0 === y2) return true;
      return false;
    }

    // whether the line crosses any side of the rect
    let lineL = [rect.x, rect.y, rect.x, rect.y + 50];
    let lineR = [rect.x + 50, rect.y, rect.x + 50, rect.y + 50];
    let lineU = [rect.x, rect.y, rect.x + 50, rect.y];
    let lineD = [rect.x, rect.y + 50, rect.x + 50, rect.y + 50];
    let throughL = this.lineCrossVerticalLine(line, lineL);
    let throughR = this.lineCrossVerticalLine(line, lineR);
    let throughU = this.lineCrossHorizontalLine(line, lineU);
    let throughD = this.lineCrossHorizontalLine(line, lineD);
    let vertical = throughL === 2 || throughR === 2 || (throughL !== 0 && throughR !== 0);
    let horizontal = throughU === 2 || throughD === 2 || (throughU !== 0 && throughD !== 0);
    // console.log(rect.name);
    // console.log(
    //   `throughL:${throughL}, throughR:${throughR}, throughU:${throughU}, throughD:${throughD}`
    // );
    return vertical || horizontal;
  },
};

export function CreateRect(_x, _y, _width, _height) {
  return {
    x: _x * 50,
    y: _y * 50,
    width: _width,
    height: _height,
  };
}
