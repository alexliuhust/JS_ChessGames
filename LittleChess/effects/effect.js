import { Canvas } from "../tools.js";
import { ReadyToAttackColor as RC } from "../const.js";

export function addEffect(list, damageType, x, y, cxt) {
  if (damageType === "melee") {
    list.push(new MeleeEffect(x, y, cxt));
  }
}

export class MeleeEffect {
  constructor(_x, _y, _cxt) {
    this.cxt = _cxt;
    this.x = _x;
    this.y = _y;
    this.time = 0;
    this.maxTime = 36;
    this.isAlive = true;

    this.draw = function () {
      this.time++;
      if (this.time > this.maxTime) {
        this.isAlive = false;
        return;
      }

      let t1 = this.maxTime / 4,
        t2 = this.maxTime / 2,
        t3 = this.maxTime * 0.75,
        t4 = this.maxTime;

      if (0 < this.time && this.time <= t1) {
        Canvas.drawLine(
          this.cxt,
          this.x,
          this.y,
          this.x + 40,
          this.y + 40,
          RC,
          4
        );
      } else if (t1 < this.time && this.time <= t2) {
        Canvas.drawLine(
          this.cxt,
          this.x,
          this.y,
          this.x + 40,
          this.y + 40,
          RC,
          4
        );
      } else if (t2 < this.time && this.time <= t3) {
        Canvas.drawLine(
          this.cxt,
          this.x + 40,
          this.y,
          this.x,
          this.y + 40,
          RC,
          4
        );
      } else if (t3 < this.time && this.time <= t4) {
        Canvas.drawLine(
          this.cxt,
          this.x + 40,
          this.y,
          this.x,
          this.y + 40,
          RC,
          4
        );
      }
    };
  }
}
