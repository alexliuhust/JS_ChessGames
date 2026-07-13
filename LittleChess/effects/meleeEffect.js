import { Canvas } from "../common/tools.js";

export class MeleeEffect {
  constructor(attacker, defender, _cxt) {
    this.cxt = _cxt;
    this.time = 0;
    this.maxTime = 32;
    this.t1 = this.maxTime / 4;
    this.t2 = this.maxTime / 2;
    this.t3 = this.maxTime - this.t1;
    this.moveTime = this.t2 - this.t1;
    this.isAlive = true;

    this.shrt = 15;
    this.long = 50;
    this.length = Math.sqrt(this.shrt ** 2 + this.long ** 2);
    this.xs = 0;
    this.ys = 0;
    this.sin = 0;
    this.cos = 0;
    if (attacker.positionX == defender.positionX - 1) {
      this.xs = attacker.x;
      this.ys = attacker.y + 50;
      this.sin = -this.shrt / this.length;
      this.cos = this.long / this.length;
    } else if (attacker.positionX == defender.positionX + 1) {
      this.xs = attacker.x + 50;
      this.ys = attacker.y;
      this.sin = this.shrt / this.length;
      this.cos = -this.long / this.length;
    } else if (attacker.positionY == defender.positionY - 1) {
      this.xs = attacker.x;
      this.ys = attacker.y;
      this.sin = this.long / this.length;
      this.cos = this.shrt / this.length;
    } else if (attacker.positionY == defender.positionY + 1) {
      this.xs = attacker.x + 50;
      this.ys = attacker.y + 50;
      this.sin = -this.long / this.length;
      this.cos = -this.shrt / this.length;
    }
    this.moveStepX = (this.length * 0.75 * this.cos) / this.moveTime;
    this.moveStepY = (this.length * 0.75 * this.sin) / this.moveTime;

    this.color = attacker.player.playerColor;
    this.weightLine = 3;
    this.weightArrow = 10;
    this.arrowStartPerc = 0.65;
  }

  drawArrow(x, y) {
    Canvas.drawArrow_Angle(
      this.cxt,
      x,
      y,
      this.sin,
      this.cos,
      this.length,
      this.color,
      this.weightLine,
      this.weightArrow,
      this.arrowStartPerc,
      true,
    );
  }

  draw() {
    this.time++;
    if (this.time > this.maxTime) {
      this.isAlive = false;
      return;
    }

    if (this.t1 <= this.time && this.time < this.t2) {
      this.xs += this.moveStepX;
      this.ys += this.moveStepY;
    } else if (this.t2 <= this.time && this.time < this.t3) {
      this.xs -= this.moveStepX;
      this.ys -= this.moveStepY;
    }
    this.drawArrow(this.xs, this.ys);
  }
}
