import { Canvas } from "../tools.js";

export class MeleeEffect {
  constructor(_x, _y, _cxt) {
    this.cxt = _cxt;
    this.x = _x;
    this.y = _y;
    this.time = 0;
    this.maxTime = 20;
    this.isAlive = true;

    this.drawLine = function (x1, y1, x2, y2) {
      Canvas.drawLine(this.cxt, x1, y1, x2, y2, "red", 5);
    };

    this.draw = function () {
      this.time++;
      if (this.time > this.maxTime) {
        this.isAlive = false;
        return;
      }

      let timeItv = this.maxTime / 4;
      let t1 = this.maxTime / 4;
      let t2 = this.maxTime / 2;
      let t3 = this.maxTime * 0.75;
      let t4 = this.maxTime;

      let x = this.x + 5;
      let y = this.y + 10;

      if (0 < this.time && this.time <= t1) {
        let curLength = Math.round(((this.time - 0) * 40) / timeItv);
        let x1 = x;
        let y1 = y;
        let x2 = x + curLength;
        let y2 = y + curLength;
        this.drawLine(x1, y1, x2, y2);
      } else if (t1 < this.time && this.time <= t2) {
        let curLength = Math.round(((this.time - t1) * 40) / timeItv);
        let x1 = x + curLength;
        let y1 = y + curLength;
        let x2 = x + 40;
        let y2 = y + 40;
        this.drawLine(x1, y1, x2, y2);
      } else if (t2 < this.time && this.time <= t3) {
        let curLength = Math.round(((this.time - t2) * 40) / timeItv);
        let x1 = x + 40;
        let y1 = y;
        let x2 = x + 40 - curLength;
        let y2 = y + curLength;
        this.drawLine(x1, y1, x2, y2);
      } else if (t3 < this.time && this.time <= t4) {
        let curLength = Math.round(((this.time - t3) * 40) / timeItv);
        let x1 = x + 40 - curLength;
        let y1 = y + curLength;
        let x2 = x;
        let y2 = y + 40;
        this.drawLine(x1, y1, x2, y2);
      }
    };
  }
}
