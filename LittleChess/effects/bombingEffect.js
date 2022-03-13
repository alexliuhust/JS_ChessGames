import { Canvas } from "../common/tools.js";
import { calculateDistance } from "../actions/actionTools.js";
import { MissileColor as MC } from "../common/const.js";

export class BombingEffect {
  constructor(attacker, center, _cxt) {
    this.cxt = _cxt;
    this.x1 = attacker.x;
    this.y1 = attacker.y;
    this.x2 = center[0] * 50;
    this.y2 = center[1] * 50;
    this.radius = attacker.missileRadius * 50;
    this.time = 0;
    this.isAlive = true;

    this.speed = 9.0;
    this.totalDistance = calculateDistance(this.x1, this.y1, this.x2, this.y2);
    this.cos = Math.abs(this.x1 - this.x2) / this.totalDistance;
    this.sin = Math.abs(this.y1 - this.y2) / this.totalDistance;
    this.dx = this.speed * this.cos;
    this.dy = this.speed * this.sin;
    this.flyingTime = this.totalDistance / this.speed;
    this.bombingTime = 33;
    this.stayTime = 7;

    if (this.x2 < this.x1) this.dx = -this.dx;
    if (this.y2 < this.y1) this.dy = -this.dy;

    let color = MC.BombColor;
    if (attacker.missileColor) color = attacker.missileColor;
    this.drawCircle = function (x, y, r, fill) {
      if (fill) Canvas.fillArc(this.cxt, x, y, r, color);
      else Canvas.drawArc(this.cxt, x, y, r, color, 6);
    };

    this.drawOneShell = function (biasX, biasY) {
      // Exploding, expanding the circle
      if (
        this.flyingTime <= this.time &&
        this.time < this.flyingTime + this.bombingTime
      ) {
        let r =
          ((this.time - this.flyingTime) * this.radius) / this.bombingTime;
        let x = this.x2 + biasX;
        let y = this.y2 + biasY;
        this.drawCircle(x, y, r, false);
        return;
      }

      // The biggest circle stays
      if (this.flyingTime + this.bombingTime <= this.time) {
        let x = this.x2 + biasX;
        let y = this.y2 + biasY;
        this.drawCircle(x, y, this.radius, false);
        return;
      }

      // The shell is flying
      let x = this.x1 + biasX + this.time * this.dx;
      let y = this.y1 + biasY + this.time * this.dy;
      this.drawCircle(x, y, 6, true);
    };

    let num = Math.min(6, attacker.c_scale);
    let bias = [];
    for (let i = 0; i < num; i++) {
      bias.push(25 + Math.floor(Math.random() * 46 - 23));
      bias.push(25 + Math.floor(Math.random() * 46 - 23));
    }

    this.draw = function () {
      this.time++;

      // Get rid of this effect
      if (this.time > this.flyingTime + this.bombingTime + this.stayTime) {
        this.isAlive = false;
        return;
      }

      // Start this effect
      if (attacker.c_scale === 1) {
        this.drawOneShell(25, 25);
      } else {
        for (let i = 0; i < num; i++) {
          let biasX = bias[i];
          let biasY = bias[i + 1];
          this.drawOneShell(biasX, biasY);
        }
      }
    };
  }
}
