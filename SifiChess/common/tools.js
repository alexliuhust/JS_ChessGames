import {
  HpColor as HC,
  AmmoColor as AC,
  LeadColor as DC,
  LevelColor as LC,
  HealColor as EC,
} from "./const.js";

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
  drawImg: function (cxt, img, x, y, sw, sh, dx, dy, dw, dh) {
    if (!sw) cxt.drawImage(img, x, y);
    else cxt.drawImage(img, x, y, sw, sh, dx, dy, dw, dh);
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
    cxt.lineWidth = 1;
    if (weight != null) {
      cxt.lineWidth = weight;
    }
    cxt.strokeRect(x, y, width, height);
  },

  // Draw a filled circle
  // ctx:context2d, (x, y): center pos
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

  // Draw a piece
  drawPiece: function (cxt, arm, gc) {
    // Draw arm flag
    this.drawImg(cxt, arm.img, 0, 0, 100, 100, arm.x, arm.y, 50, 50);

    // Draw stripe color
    if (arm.G_A === 0) {
      this.drawLine(cxt, arm.x + 1, arm.y + 5, arm.x + 1, arm.y + 46, gc, 3);
      this.drawLine(cxt, arm.x + 49, arm.y + 5, arm.x + 49, arm.y + 46, gc, 3);
    } else {
      for (let i = 0; i < 6; i++) {
        let x1 = arm.x + 45;
        let x2 = arm.x + 50;
        let y1 = arm.y + 11 + i * 7;
        let y2 = arm.y + 6 + i * 7;
        this.drawLine(cxt, x1, y1, x2, y2, gc, 3);
        x1 = arm.x;
        x2 = arm.x + 5;
        y1 = arm.y + 6 + i * 7;
        y2 = arm.y + 11 + i * 7;
        this.drawLine(cxt, x1, y1, x2, y2, gc, 3);
      }
    }

    // Draw HP, ammo, and leadership bars
    let maxLen = 0;
    let slen, hlen, aglen, aalen, llen, elen;
    if (arm.shield === 0) {
      hlen = (50 * arm.getTotalHP()) / arm.getOriginalHP();
      maxLen = 50;
    } else {
      slen = (25 * arm.c_shield) / arm.shield;
      hlen = (25 * arm.getTotalHP()) / arm.getOriginalHP();
      maxLen = 25;
    }
    llen = (50 * arm.c_leadership) / arm.leadership;
    elen = (50 * arm.c_totalHeal) / arm.totalHeal;

    let sdcolor = "rgb(0, 122, 204)";
    let hpcolor = HC;
    if (hlen <= maxLen / 4) hpcolor = "rgb(255, 180, 0)";
    if (hlen <= maxLen / 8) hpcolor = "rgb(241, 76, 76)";
    this.drawLine(cxt, arm.x, arm.y + 2, arm.x + hlen, arm.y + 2, hpcolor, 5);
    this.drawLine(
      cxt,
      arm.x + 25,
      arm.y + 2,
      arm.x + slen + 25,
      arm.y + 2,
      sdcolor,
      5
    );
    if (arm.ammo_G > 0 && arm.ammo_A > 0) {
      if (arm.GAtogether) {
        aglen = (50 * arm.c_ammo_G) / arm.ammo_G;
        this.drawLine(cxt, arm.x, arm.y + 48, arm.x + aglen, arm.y + 48, AC, 4);
      } else {
        aglen = (24 * arm.c_ammo_G) / arm.ammo_G;
        aalen = (24 * arm.c_ammo_A) / arm.ammo_A;
        this.drawLine(cxt, arm.x, arm.y + 48, arm.x + aglen, arm.y + 48, AC, 4);
        this.drawLine(
          cxt,
          arm.x + 24,
          arm.y + 48,
          arm.x + 26,
          arm.y + 48,
          "rgb(100, 100, 100)",
          4
        );
        this.drawLine(
          cxt,
          arm.x + 26,
          arm.y + 48,
          arm.x + 26 + aalen,
          arm.y + 48,
          AC,
          4
        );
      }
    } else if (arm.ammo_G > 0) {
      aglen = (50 * arm.c_ammo_G) / arm.ammo_G;
      this.drawLine(cxt, arm.x, arm.y + 48, arm.x + aglen, arm.y + 48, AC, 4);
    } else if (arm.ammo_A > 0) {
      aalen = (50 * arm.c_ammo_A) / arm.ammo_A;
      this.drawLine(cxt, arm.x, arm.y + 48, arm.x + aalen, arm.y + 48, AC, 4);
    }

    let ey = arm.y + 48;
    if (arm.ammo_G > 0 || arm.ammo_A > 0) ey -= 4;
    this.drawLine(cxt, arm.x, ey, arm.x + elen, ey, EC, 4);

    // Draw operablility mark
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
};

// ======================================================================
// ============================ Rect Class ============================
// ======================================================================

export const Rect = {
  // Whether a point is located inside a rect
  pointInRect: function (point, rect) {
    if (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    )
      return true;

    return false;
  },
  // Whether two circles intersect
  circleInCircle: function (cir1, cir2) {
    if (
      Math.sqrt(Math.pow(cir1.x - cir2.x, 2) + Math.pow(cir1.y - cir2.y, 2)) <
      cir1.radius + cir2.radius
    )
      return true;

    return false;
  },
  // Whether a rect and a circle intersect
  rectInCircle: function (rect, cir) {
    var x1 = rect.x,
      y1 = rect.y,
      x2 = rect.x + rect.width,
      y2 = rect.y + rect.height;

    if (
      Math.sqrt(Math.pow(x1 - cir.x, 2) + Math.pow(y1 - cir.y, 2)) <
        cir.radius ||
      Math.sqrt(Math.pow(x1 - cir.x, 2) + Math.pow(y2 - cir.y, 2)) <
        cir.radius ||
      Math.sqrt(Math.pow(x2 - cir.x, 2) + Math.pow(y2 - cir.y, 2)) <
        cir.radius ||
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
    if (
      (y_u <= y_l && y_l <= y_u + offset) ||
      (y_d - offset <= y_l && y_l <= y_d)
    )
      return 1;
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
    if (
      (x_f <= x_l && x_l <= x_f + offset) ||
      (x_r - offset <= x_l && x_l <= x_r)
    )
      return 1;
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
    let vertical =
      throughL === 2 || throughR === 2 || (throughL !== 0 && throughR !== 0);
    let horizontal =
      throughU === 2 || throughD === 2 || (throughU !== 0 && throughD !== 0);
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
