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
    this.waitTime = 0;
    this.maxTime = 21;
    this.isAlive = true;
    this.getDirection = function () {
      if (this.x1 === this.x2 && this.y1 < this.y2) return "D";
      if (this.x1 === this.x2 && this.y1 > this.y2) return "U";
      if (this.y1 === this.y2 && this.x1 < this.x2) return "R";
      if (this.y1 === this.y2 && this.x1 > this.x2) return "L";
    };
    this.direction = this.getDirection();

    this.drawLine = function (x1, y1, x2, y2) {
      Canvas.drawLine(this.cxt, x1, y1, x2, y2, RC, 9);
    };

    this.drawArrow = function (x, y) {
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
      Canvas.drawLine(this.cxt, x1, y1, x2, y2, RC, 9);
      Canvas.drawLine(this.cxt, x1, y1, x3, y3, RC, 9);
    };

    this.draw = function () {
      this.time++;
      if (this.time > this.waitTime + this.maxTime) {
        this.isAlive = false;
        return;
      }

      let timeItv = this.maxTime / 3;
      let t1 = this.waitTime + this.maxTime / 3;
      let t2 = this.waitTime + (this.maxTime * 2) / 3;
      let t3 = this.waitTime + this.maxTime;

      if (this.waitTime < this.time && this.time <= t1) {
        let percentage = (this.time - this.waitTime) / timeItv;
        let tx = this.x1 + (this.x2 - this.x1) * percentage;
        let ty = this.y1 + (this.y2 - this.y1) * percentage;
        this.drawLine(this.x1, this.y1, tx, ty);
        this.drawArrow(tx, ty);
      } else if (t1 < this.time && this.time <= t2) {
        this.drawLine(this.x1, this.y1, this.x2, this.y2);
        this.drawArrow(this.x2, this.y2);
      } else if (t2 < this.time && this.time <= t3) {
        let percentage = (this.time - t2) / timeItv;
        let sx = this.x1 + (this.x2 - this.x1) * percentage;
        let sy = this.y1 + (this.y2 - this.y1) * percentage;
        this.drawLine(sx, sy, this.x2, this.y2);
        this.drawArrow(this.x2, this.y2);
      }
    };
  }
}
