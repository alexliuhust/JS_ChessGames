import {
  HpColor as HC,
  AmmoColor as AC,
  LeadColor as DC,
  LevelColor as LC,
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
    this.drawImg(cxt, arm.img, arm.x, arm.y);
    // Draw stripe color
    this.drawLine(cxt, arm.x + 2, arm.y + 8, arm.x + 2, arm.y + 46, gc, 5);
    this.drawLine(cxt, arm.x + 48, arm.y + 8, arm.x + 48, arm.y + 46, gc, 5);
    // Draw level
    let number = arm.level >= 2 ? arm.level : 0;
    for (let i = 0; i < number; i++) {
      let x1 = arm.x,
        x2 = arm.x + 5;
      let y1 = arm.y + 39 - i * 5,
        y2 = arm.y + 39 - i * 5;
      this.drawLine(cxt, x1, y1, x2, y2, LC, 4);
    }
    // Draw HP, ammo, and leaddership bars
    let hlen, alen, llen;
    if (arm.scale === 1) hlen = (50 * arm.c_singleHP) / arm.singleHP;
    else hlen = (50 * arm.c_scale) / arm.scale;
    if (arm.ammo === -1) alen = 0;
    else alen = (50 * arm.c_ammo) / arm.ammo;
    llen = (50 * arm.c_leadership) / arm.leadership;
    this.drawLine(cxt, arm.x, arm.y + 2, arm.x + hlen, arm.y + 2, HC, 4);
    this.drawLine(cxt, arm.x, arm.y + 6, arm.x + llen, arm.y + 6, DC, 4);
    this.drawLine(cxt, arm.x, arm.y + 48, arm.x + alen, arm.y + 48, AC, 4);
    // Draw operablility mark
    let x_s = arm.x + 33;
    let x_e = arm.x + 43;
    let y_1 = arm.y + 10;
    let y_2 = arm.y + 20;
    let thick = 4;
    if (!arm.operable) {
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
};

export function CreateRect(_x, _y, _width, _height) {
  return {
    x: _x * 50,
    y: _y * 50,
    width: _width,
    height: _height,
  };
}
