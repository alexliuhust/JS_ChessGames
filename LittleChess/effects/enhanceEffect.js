import { Canvas } from "../common/tools.js";
import {
  ArmorEnhanceColor as ARC,
  AttackEnhanceColor as ATC,
} from "../common/const.js";

export class EnhanceEffect {
  constructor(target, _type, _cxt) {
    this.cxt = _cxt;
    this.color = "";
    this.x = target.x + 25;
    this.y = target.y + 25;

    if (_type === "armor") this.color = ARC;
    else this.color = ATC;

    this.time = 0;
    this.maxTime = 35;
    this.isAlive = true;

    this.drawArmorEnhance = function () {
      let r = 35 + this.time * 0.05;
      Canvas.drawArc(this.cxt, this.x, this.y, r, this.color, 6);
    };

    this.drawAttackEnhance = function () {
      let r = 45 + this.time * 0.05;
      let line1 = [this.x - r * 0.7, this.y, this.x, this.y - r];
      let line2 = [this.x - r * 0.7, this.y, this.x, this.y + r];
      let line3 = [this.x, this.y - r, this.x + r * 0.7, this.y];
      let line4 = [this.x, this.y + r, this.x + r * 0.7, this.y];
      Canvas.drawLine(
        this.cxt,
        line1[0],
        line1[1],
        line1[2],
        line1[3],
        this.color,
        5
      );
      Canvas.drawLine(
        this.cxt,
        line2[0],
        line2[1],
        line2[2],
        line2[3],
        this.color,
        5
      );
      Canvas.drawLine(
        this.cxt,
        line3[0],
        line3[1],
        line3[2],
        line3[3],
        this.color,
        5
      );
      Canvas.drawLine(
        this.cxt,
        line4[0],
        line4[1],
        line4[2],
        line4[3],
        this.color,
        5
      );
    };

    this.draw = function () {
      this.time++;

      // Get rid of this effect
      if (this.time > this.maxTime) {
        this.isAlive = false;
        return;
      }

      if (_type === "armor") this.drawArmorEnhance();
      else this.drawAttackEnhance();
    };
  }
}
