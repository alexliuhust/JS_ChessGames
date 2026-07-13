import { Canvas } from "../common/tools.js";
import { ReadyToAttackColor as RC } from "../common/const.js";

export class ChargeEffect {
  constructor(attacker, defender, _cxt) {
    this.cxt = _cxt;
    this.x1 = attacker.x + 25;
    this.y1 = attacker.y + 25;
    this.x2 = defender.x + 25;
    this.y2 = defender.y + 25;
    this.time = 0;
    this.maxTime = 21;
    this.isAlive = true;
    this.timeItv = this.maxTime / 3;
    this.t1 = this.maxTime / 3;
    this.t2 = (this.maxTime * 2) / 3;
    this.t3 = this.maxTime;
    this.color = attacker.player.playerColor;
    this.direction = this.getDirection();
  }

  getDirection() {
    if (this.x1 === this.x2 && this.y1 < this.y2) return "D";
    if (this.x1 === this.x2 && this.y1 > this.y2) return "U";
    if (this.y1 === this.y2 && this.x1 < this.x2) return "R";
    if (this.y1 === this.y2 && this.x1 > this.x2) return "L";
  }

  drawLine(x1, y1, x2, y2) {
    Canvas.drawLine(this.cxt, x1, y1, x2, y2, "black", 13);
    Canvas.fillArc(this.cxt, x1, y1, 6.5, "black");
    Canvas.drawLine(this.cxt, x1, y1, x2, y2, this.color, 9);
    Canvas.fillArc(this.cxt, x1, y1, 4.5, this.color);
  }

  drawArrow(x, y) {
    let x1 = x;
    let y1 = y;
    let x2 = x;
    let y2 = y;
    let x3 = x;
    let y3 = y;
    let width = 15;
    let length = 60;
    if (this.direction === "D" || this.direction === "U") {
      x2 -= width;
      x3 += width;
      if (this.direction === "D") {
        y2 -= length;
        y3 -= length;
      } else {
        y2 += length;
        y3 += length;
      }
    } else {
      y2 -= width;
      y3 += width;
      if (this.direction === "R") {
        x2 -= length;
        x3 -= length;
      } else {
        x2 += length;
        x3 += length;
      }
    }
    Canvas.drawLine(this.cxt, x1, y1, x2, y2, "black", 13);
    Canvas.drawLine(this.cxt, x1, y1, x3, y3, "black", 13);
    Canvas.fillArc(this.cxt, x1, y1, 6.5, "black");
    Canvas.drawLine(this.cxt, x1, y1, x2, y2, this.color, 9);
    Canvas.drawLine(this.cxt, x1, y1, x3, y3, this.color, 9);
    Canvas.fillArc(this.cxt, x1, y1, 4.5, this.color);
  }

  draw() {
    this.time++;
    if (this.time > this.maxTime) {
      this.isAlive = false;
      return;
    }

    if (0 <= this.time && this.time <= this.t1) {
      let percentage = this.time / this.timeItv;
      let tx = this.x1 + (this.x2 - this.x1) * percentage;
      let ty = this.y1 + (this.y2 - this.y1) * percentage;
      this.drawLine(this.x1, this.y1, tx, ty);
      this.drawArrow(tx, ty);
    } else if (this.t1 < this.time && this.time <= this.t2) {
      this.drawLine(this.x1, this.y1, this.x2, this.y2);
      this.drawArrow(this.x2, this.y2);
    } else if (this.t2 < this.time && this.time <= this.t3) {
      let percentage = (this.time - this.t2) / this.timeItv;
      let sx = this.x1 + (this.x2 - this.x1) * percentage;
      let sy = this.y1 + (this.y2 - this.y1) * percentage;
      this.drawLine(sx, sy, this.x2, this.y2);
      this.drawArrow(this.x2, this.y2);
    }
  }
}
