import { Canvas } from "../common/tools.js";

export class LaserEffect {
  constructor(attacker, defender, _cxt) {
    this.cxt = _cxt;
    this.x1 = attacker.x;
    this.y1 = attacker.y;
    this.x2 = defender.x;
    this.y2 = defender.y;
    this.time = 0;
    this.isAlive = true;

    this.flyingTime = 50;
    this.maxTime = this.flyingTime / 2;

    this.bias = [];
    for (let i = 0; i < 20; i++) {
      let bias = Math.floor(Math.random() * 50 - 25);
      if (Math.abs(bias - 0) < 5) {
        i--;
        continue;
      } else this.bias.push(bias);
    }

    let color = "white";
    let maxWeight = 10;
    if (attacker.missileColor) color = attacker.missileColor;
    maxWeight = attacker.missileWeight;

    this.drawLaser = function (x1, y1, x2, y2, weight) {
      if (weight > maxWeight) weight = maxWeight;
      Canvas.drawLine(this.cxt, x1, y1, x2, y2, color, weight);
    };

    this.draw = function () {
      this.time++;
      if (this.time > this.flyingTime) {
        this.isAlive = false;
        return;
      }
      let maxNum = attacker.missileWeight <= 3 ? 10 : 6;
      let num = maxNum;
      if (attacker.scale > 1) num = Math.min(maxNum, attacker.c_scale);
      if (attacker.missileNumber) num = attacker.missileNumber;
      if (defender.G_A === 1) {
        if (attacker.missileColor_A) color = attacker.missileColor_A;
        if (attacker.missileWeight_A) weight = attacker.missileWeight_A;
        if (attacker.missileNumber_A) num = attacker.missileNumber_A;
      }

      let weight = (this.maxTime - Math.abs(this.time - this.maxTime)) / 3;
      if (num > 1) {
        for (let i = 0; i < num; i++) {
          this.drawLaser(
            this.x1 + 25 + this.bias[i],
            this.y1 + 25 + this.bias[i + num],
            this.x2 + 25 + this.bias[i],
            this.y2 + 25 + this.bias[i + num],
            weight
          );
        }
      } else {
        this.drawLaser(
          this.x1 + 25,
          this.y1 + 25,
          this.x2 + 25 + this.bias[0],
          this.y2 + 25 + this.bias[0 + num],
          weight
        );
      }
    };
  }
}
