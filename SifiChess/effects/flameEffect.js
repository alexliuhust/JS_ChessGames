import { Canvas } from "../common/tools.js";
import { calculateDistance } from "../actions/actionTools.js";

export class FlameEffect {
  constructor(attacker, defender, _cxt) {
    this.cxt = _cxt;
    this.x1 = attacker.x;
    this.y1 = attacker.y;
    this.x2 = defender.x;
    this.y2 = defender.y;
    this.time = 0;
    this.isAlive = true;

    this.speed = 4.0;
    this.totalDistance = calculateDistance(this.x1, this.y1, this.x2, this.y2);
    this.cos = Math.abs(this.x1 - this.x2) / this.totalDistance;
    this.sin = Math.abs(this.y1 - this.y2) / this.totalDistance;
    this.dx = this.speed * this.cos;
    this.dy = this.speed * this.sin;
    this.flyingTime = this.totalDistance / this.speed;
    this.burningTime = this.flyingTime;
    this.maxTime = this.flyingTime;
    this.radius = 25;

    this.bias = [];
    for (let i = 0; i < 20; i++) {
      let bias = Math.floor(Math.random() * 50 - 25);
      if (Math.abs(bias - 0) < 5) {
        i--;
        continue;
      } else this.bias.push(bias);
    }

    if (this.x2 < this.x1) this.dx = -this.dx;
    if (this.y2 < this.y1) this.dy = -this.dy;

    let color = "white";
    let weight = 2;
    if (attacker.missileColor) color = attacker.missileColor;
    weight = attacker.missileWeight;

    this.drawFlamePath = function (x1, y1, x2, y2) {
      Canvas.drawLine(this.cxt, x1, y1, x2, y2, color, weight);
    };
    this.drawExplosion = function (x, y, r) {
      Canvas.drawArc(this.cxt, x, y, r, color, weight - 1);
    };

    this.draw = function () {
      this.time++;
      if (this.time > this.flyingTime + this.burningTime) {
        this.isAlive = false;
        return;
      }

      let x = this.x1 + 25 + this.time * this.dx;
      let y = this.y1 + 25 + this.time * this.dy;
      let _x = this.x1 + 25 + (this.time - this.flyingTime) * this.dx;
      let _y = this.y1 + 25 + (this.time - this.flyingTime) * this.dy;

      let maxNum = attacker.missileWeight <= 3 ? 10 : 6;
      let num = maxNum;
      if (attacker.scale > 1) num = Math.min(maxNum, attacker.c_scale);
      if (attacker.missileNumber) num = attacker.missileNumber;
      if (defender.G_A === 1) {
        if (attacker.missileColor_A) color = attacker.missileColor_A;
        if (attacker.missileWeight_A) weight = attacker.missileWeight_A;
        if (attacker.missileNumber_A) num = attacker.missileNumber_A;
      }

      if (num > 1) {
        for (let i = 0; i < num; i++) {
          if (this.time <= this.flyingTime) {
            this.drawFlamePath(
              this.x1 + 25 + this.bias[i],
              this.y1 + 25 + this.bias[i + num],
              x + this.bias[i],
              y + this.bias[i + num]
            );
          } else {
            let x0 = this.x1 + 25 + this.bias[i] + this.flyingTime * this.dx;
            let y0 =
              this.y1 + 25 + this.bias[i + num] + this.flyingTime * this.dy;
            let r = 0;
            r +=
              ((this.time - this.flyingTime) * this.radius) / this.burningTime;
            this.drawExplosion(x0, y0, r);

            this.drawFlamePath(
              this.x2 + 25 + this.bias[i],
              this.y2 + 25 + this.bias[i + num],
              _x + this.bias[i],
              _y + this.bias[i + num]
            );
          }
        }
      } else {
        if (this.time <= this.flyingTime) {
          this.drawFlamePath(this.x1 + 25, this.y1 + 25, x, y);
        } else {
          let x0 = this.x1 + 25 + this.flyingTime * this.dx;
          let y0 = this.y1 + 25 + this.flyingTime * this.dy;
          let r = 0;
          if (attacker.scale === 1 && weight > 5) r = weight + 10;
          r += ((this.time - this.flyingTime) * this.radius) / this.burningTime;
          this.drawExplosion(x0, y0, r);

          this.drawFlamePath(this.x2 + 25, this.y2 + 25, _x, _y);
        }
      }
    };
  }
}
