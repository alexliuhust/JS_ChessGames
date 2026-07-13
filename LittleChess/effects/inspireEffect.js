import { Canvas } from "../common/tools.js";
import { LeadColor as LDC } from "../common/const.js";

export class InspireEffect {
  constructor(_x, _y, _cxt) {
    this.cxt = _cxt;
    this.x = _x;
    this.y = _y;
    this.time = 0;
    this.maxTime = 20;
    this.isAlive = true;
  }

  drawCross(x0, y0) {
    let len = 10;
    let weight = 8;
    let x1 = x0 - len;
    let y1 = y0;
    let x2 = x0 + len;
    let y2 = y0;
    let x3 = x0;
    let y3 = y0 - len;
    let x4 = x0;
    let y4 = y0 + len;

    Canvas.drawLine(this.cxt, x1 - 2, y1, x2 + 2, y2, "black", weight + 4);
    Canvas.drawLine(this.cxt, x3, y3 - 2, x4, y4 + 2, "black", weight + 4);

    Canvas.drawLine(this.cxt, x1, y1, x2, y2, LDC, weight);
    Canvas.drawLine(this.cxt, x3, y3, x4, y4, LDC, weight);
  }

  draw() {
    this.time++;
    if (this.time > this.maxTime) {
      this.isAlive = false;
      return;
    }

    let x1 = this.x + 23;
    let x2 = this.x + 43;
    let y1 = this.y + 30 - Math.round(this.time);
    let y2 = this.y + 50 - Math.round(this.time);

    this.drawCross(x1, y1);
    this.drawCross(x2, y2);
  }
}
