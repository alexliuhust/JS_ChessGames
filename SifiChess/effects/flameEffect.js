import { Canvas } from "../common/tools.js";

const trace1 = [
  [
    1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18, 19.5, 21, 22.5, 24,
    25.5, 27, 28.5, 30, 31.5, 33, 34.5, 36, 37.5, 39, 40.5, 42, 43.5, 45, 46.5,
    48, 49.5, 51, 49.5, 48, 46.5, 45, 43.5, 42, 40.5, 39, 37.5, 36, 34.5, 33,
    31.5, 30, 28.5, 27,
  ],
  [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
  ],
];
const trace2 = [
  [
    50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32,
    31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13,
    12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
  ],
  [
    48.5, 47, 45.5, 44, 42.5, 41, 39.5, 38, 36.5, 35, 33.5, 32, 30.5, 29, 27.5,
    26, 24.5, 23, 21.5, 20, 18.5, 17, 15.5, 14, 12.5, 11, 9.5, 8, 6.5, 5, 3.5,
    2, 0.5, -1, 0.5, 2, 3.5, 5, 6.5, 8, 9.5, 11, 12.5, 14, 15.5, 17, 18.5, 20,
    21.5, 23,
  ],
];
const trace3 = [
  [
    1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18, 19.5, 21, 22.5, 24,
    25.5, 27, 28.5, 30, 31.5, 33, 34.5, 36, 37.5, 39, 40.5, 42, 43.5, 45, 46.5,
    48, 49.5, 51, 49.5, 48, 46.5, 45, 43.5, 42, 40.5, 39, 37.5, 36, 34.5, 33,
    31.5, 30, 28.5, 27,
  ],
  [
    48.5, 47, 45.5, 44, 42.5, 41, 39.5, 38, 36.5, 35, 33.5, 32, 30.5, 29, 27.5,
    26, 24.5, 23, 21.5, 20, 18.5, 17, 15.5, 14, 12.5, 11, 9.5, 8, 6.5, 5, 3.5,
    2, 0.5, -1, 0.5, 2, 3.5, 5, 6.5, 8, 9.5, 11, 12.5, 14, 15.5, 17, 18.5, 20,
    21.5, 23,
  ],
];
const trace4 = [
  [
    1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18, 19.5, 21, 22.5, 24,
    25.5, 27, 28.5, 30, 31.5, 33, 34.5, 36, 37.5, 39, 40.5, 42, 43.5, 45, 46.5,
    48, 49.5, 51, 49.5, 48, 46.5, 45, 43.5, 42, 40.5, 39, 37.5, 36, 34.5, 33,
    31.5, 30, 28.5, 27,
  ],
  [
    1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18, 19.5, 21, 22.5, 24,
    25.5, 27, 28.5, 30, 31.5, 33, 34.5, 36, 37.5, 39, 40.5, 42, 43.5, 45, 46.5,
    48, 49.5, 51, 49.5, 48, 46.5, 45, 43.5, 42, 40.5, 39, 37.5, 36, 34.5, 33,
    31.5, 30, 28.5, 27,
  ],
];
const ori_traces = [trace1, trace2, trace3, trace4];

export class FlameEffect {
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
      if (Math.abs(bias - 0) < 8) {
        i--;
        continue;
      } else this.bias.push(bias);
    }

    let color = "white";
    let maxWeight = 10;
    if (attacker.missileColor) color = attacker.missileColor;
    maxWeight = attacker.missileWeight;

    let traces = ori_traces.sort((a, b) => 0.5 - Math.random());

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
          if (attacker.scale === 1) {
            if (attacker.scanLaser) {
              this.drawLaser(
                this.x1 + 25,
                this.y1 + 25,
                this.x2 + traces[i % traces.length][0][this.time],
                this.y2 + traces[i % traces.length][1][this.time],
                weight
              );
            } else {
              this.drawLaser(
                this.x1 + 25,
                this.y1 + 25,
                this.x2 + 25 + this.bias[i],
                this.y2 + 25 + this.bias[i + num],
                weight
              );
            }
          } else {
            if (attacker.scanLaser) {
              this.drawLaser(
                this.x1 + 25 + this.bias[i],
                this.y1 + 25 + this.bias[i + num],
                this.x2 + traces[i % traces.length][0][this.time],
                this.y2 + traces[i % traces.length][1][this.time],
                weight
              );
            } else {
              this.drawLaser(
                this.x1 + 25 + this.bias[i],
                this.y1 + 25 + this.bias[i + num],
                this.x2 + 25 + this.bias[i],
                this.y2 + 25 + this.bias[i + num],
                weight
              );
            }
          }
        }
      } else {
        if (attacker.scanLaser) {
          this.drawLaser(
            this.x1 + 25,
            this.y1 + 25,
            this.x2 + traces[0][0][this.time],
            this.y2 + traces[0][1][this.time],
            weight
          );
        } else {
          this.drawLaser(
            this.x1 + 25,
            this.y1 + 25,
            this.x2 + 25 + this.bias[0],
            this.y2 + 25 + this.bias[0 + num],
            weight
          );
        }
      }
    };
  }
}
