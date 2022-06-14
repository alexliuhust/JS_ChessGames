import { Canvas } from "../common/tools.js";

export class SelfDetoEffect {
  constructor(_detonator, _cxt) {
    this.cxt = _cxt;
    this.detonator = _detonator;
    this.time = 0;
    this.maxTime = 32;
    this.isAlive = true;

    this.bias = [];
    for (let i = 0; i < 12; i++) {
      let bias = Math.floor(Math.random() * 50 - 25);
      if (Math.abs(bias - 0) < 5) {
        i--;
        continue;
      } else this.bias.push(bias);
    }
    this.pos = [];
    for (let i = 0; i < 6; i++) {
      this.pos.push([
        this.detonator.positionX * 50 + 25 + this.bias[i],
        this.detonator.positionY * 50 + 25 + this.bias[i + 6],
      ]);
    }

    this.drawExplosion = function (x, y, r) {
      let color = "green";
      if (this.detonator.detoColor) color = this.detonator.detoColor;
      Canvas.drawArc(this.cxt, x, y, r, color, 4);
    };

    this.draw = function () {
      this.time++;
      if (this.time > this.maxTime) {
        this.isAlive = false;
        return;
      }

      let r = this.time + 5;
      for (let i = 0; i < 6; i++) {
        let x = this.pos[i][0];
        let y = this.pos[i][1];
        this.drawExplosion(x, y, r);
      }
    };
  }
}
