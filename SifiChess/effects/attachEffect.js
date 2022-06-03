import { Canvas } from "../common/tools.js";
import { calculateDistance } from "../actions/actionTools.js";

export class AttachEffect {
  constructor(attacker, defender, _cxt) {
    this.cxt = _cxt;
    this.x1 = attacker.x;
    this.y1 = attacker.y;
    this.x2 = defender.x;
    this.y2 = defender.y;
    this.time = 0;
    this.isAlive = true;

    this.speed = 6.0;
    this.len = 4;
    this.totalDistance = calculateDistance(this.x1, this.y1, this.x2, this.y2);
    this.cos = Math.abs(this.x1 - this.x2) / this.totalDistance;
    this.sin = Math.abs(this.y1 - this.y2) / this.totalDistance;
    if (this.x2 < this.x1) this.cos = -this.cos;
    if (this.y2 < this.y1) this.sin = -this.sin;

    this.dx = this.speed * this.cos;
    this.dy = this.speed * this.sin;
    this.maxTime = this.totalDistance / this.speed;
    this.flyingTime = this.maxTime;
    this.midTime = Math.round((this.flyingTime * 2) / 3);
    // this.midTime = this.flyingTime - 30;
    this.x_a = this.x1;
    this.y_a = this.y1;

    this.bias = [];
    for (let i = 0; i < 20; i++) {
      let bias = Math.floor(Math.random() * 30 - 15);
      if (Math.abs(bias - 0) < 5) {
        i--;
        continue;
      } else this.bias.push(bias);
    }

    let color = "white";
    let weight = 2;
    if (attacker.missileColor) color = attacker.missileColor;
    if (attacker.missileWeight) weight = attacker.missileWeight;

    this.drawLine = function (x1, y1, x2, y2) {
      Canvas.drawLine(this.cxt, x1, y1, x2, y2, color, weight);
    };
    this.drawCircle = function (x, y, r) {
      Canvas.drawArc(this.cxt, x, y, r, color, weight - 1);
    };
    this.drawAttach = function (x, y, gc) {
      Canvas.drawImg(this.cxt, attacker.img2, 0, 0, 100, 100, x, y, 30, 30);
    };

    this.draw = function () {
      this.time++;
      if (this.time > 2 * this.midTime) {
        this.isAlive = false;
        return;
      }

      let x = this.x1 + 25 + this.time * this.dx;
      let y = this.y1 + 25 + this.time * this.dy;
      let Dx = this.dx * this.len;
      let Dy = this.dy * this.len;

      let num = 6;
      if (this.time >= this.midTime && this.time <= this.maxTime) {
        for (let i = 0; i < num; i++) {
          this.drawLine(
            x + this.bias[i],
            y + this.bias[i + num],
            x + this.bias[i] + Dx,
            y + this.bias[i + num] + Dy
          );
        }
      }

      if (this.time <= this.midTime) {
        this.dx_a = this.dx;
        this.dy_a = this.dy;
        this.x_a = this.x1;
        this.y_a = this.y1;
        x = this.x_a + 25 + this.time * this.dx_a;
        y = this.y_a + 25 + this.time * this.dy_a;
      } else {
        this.dx_a = -this.dx;
        this.dy_a = -this.dy;
        this.x_a = this.x1 + this.midTime * this.dx;
        this.y_a = this.y1 + this.midTime * this.dy;
        x = this.x_a + 25 + (this.time - this.midTime) * this.dx_a;
        y = this.y_a + 25 + (this.time - this.midTime) * this.dy_a;
      }
      let gc = attacker.player.playerColor;
      this.drawAttach(x - 15, y - 15, gc);
    };
  }
}
