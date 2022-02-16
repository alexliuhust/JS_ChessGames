import { Canvas } from "../tools.js";
import { calculateDistance } from "../actions/actionTools.js";

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

    this.speed = 12.0;
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

    this.drawCircle = function (x, y, r, fill) {
      if (fill) Canvas.fillArc(this.cxt, x, y, r, "yellow");
      else Canvas.drawArc(this.cxt, x, y, r, "yellow", 6);
    };

    this.draw = function () {
      this.time++;
      if (this.time > this.flyingTime + this.bombingTime + this.stayTime) {
        this.isAlive = false;
        return;
      }
      if (
        this.flyingTime <= this.time &&
        this.time < this.flyingTime + this.bombingTime
      ) {
        let r =
          ((this.time - this.flyingTime) * this.radius) / this.bombingTime;
        let x = this.x2 + 25;
        let y = this.y2 + 25;
        this.drawCircle(x, y, r, false);
        return;
      }
      if (this.flyingTime + this.bombingTime <= this.time) {
        let x = this.x2 + 25;
        let y = this.y2 + 25;
        this.drawCircle(x, y, this.radius, false);
        return;
      }

      let x = this.x1 + 25 + this.time * this.dx;
      let y = this.y1 + 25 + this.time * this.dy;
      this.drawCircle(x, y, 10, true);
    };
  }
}
