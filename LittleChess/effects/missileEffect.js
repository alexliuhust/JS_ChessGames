import { Canvas } from "../tools.js";
import { calculateDistance } from "../actions/actionTools.js";
import { SelectPieceColor as SPC } from "../const.js";

export class MissileEffect {
  constructor(attacker, defender, _cxt) {
    this.cxt = _cxt;
    this.x1 = attacker.x;
    this.y1 = attacker.y;
    this.x2 = defender.x;
    this.y2 = defender.y;
    this.time = 0;
    this.isAlive = true;

    this.speed = 10.0;
    this.len = 3;
    this.totalDistance = calculateDistance(this.x1, this.y1, this.x2, this.y2);
    this.cos = Math.abs(this.x1 - this.x2) / this.totalDistance;
    this.sin = Math.abs(this.y1 - this.y2) / this.totalDistance;
    this.dx = this.speed * this.cos;
    this.dy = this.speed * this.sin;
    this.maxTime = this.totalDistance / this.speed;

    this.bias = [];
    for (let i = 0; i < 12; i++) {
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

    this.drawLine = function (x1, y1, x2, y2) {
      Canvas.drawLine(this.cxt, x1, y1, x2, y2, color, weight);
    };

    this.draw = function () {
      this.time++;
      if (this.time > this.maxTime) {
        this.isAlive = false;
        return;
      }

      let x = this.x1 + 25 + this.time * this.dx;
      let y = this.y1 + 25 + this.time * this.dy;
      let Dx = this.dx * this.len;
      let Dy = this.dy * this.len;

      for (let i = 0; i < 6; i++)
        this.drawLine(
          x + this.bias[i],
          y + this.bias[i + 6],
          x + this.bias[i] + Dx,
          y + this.bias[i + 6] + Dy
        );
    };
  }
}
