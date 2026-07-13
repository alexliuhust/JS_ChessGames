import { Canvas } from "../common/tools.js";
import { calculateDistance } from "../actions/actionTools.js";
import { getParabolaPointSet, randomInt, generateSpreadAngles, addAlphaToRGB, getAngle } from "./effectTools.js";

export class SmallProjectileEffect {
  constructor(attacker, defender, _cxt) {
    this.cxt = _cxt;
    this.xs = attacker.x;
    this.ys = attacker.y;
    this.xt = defender.x;
    this.yt = defender.y;
    this.time = 0;
    this.isAlive = true;
    this.isParabola = attacker.isParabola;
    this.totalDistance = calculateDistance(this.xs, this.ys, this.xt, this.yt);

    // Receive parameters from attacker
    let parameters = attacker.missileParameters;
    this.speed =
      parameters != null && parameters.speed != null
        ? parameters.speed
        : this.isParabola
          ? Math.round(this.totalDistance ** 0.5 / 3)
          : 8.0;
    this.hitTime = Math.floor(this.totalDistance / this.speed);
    this.tailFadeTime = parameters != null && parameters.tailFadeTime != null ? parameters.tailFadeTime : 14;
    this.shape = parameters != null && parameters.shape != null ? parameters.shape : "line";
    this.len = parameters != null && parameters.len != null ? parameters.len : 8;
    this.radius = parameters != null && parameters.radius != null ? parameters.radius : 4;
    this.weight = parameters != null && parameters.weight != null ? parameters.weight : 2;
    this.width = this.shape == "line" || this.shape == "fire" ? this.weight : this.radius * 2;
    this.maxHeightRatio = parameters != null && parameters.maxHeightRatio != null ? parameters.maxHeightRatio : 0.25;
    this.tailShape = parameters != null && parameters.tailShape != null ? parameters.tailShape : null;
    this.color = parameters != null && parameters.color != null ? parameters.color : "white";
    this.color2 = parameters != null && parameters.color2 != null ? parameters.color2 : "rgb(255, 234, 0)";
    this.numFire = parameters != null && parameters.numFire != null ? parameters.numFire : 1;
    this.fireInterval = parameters != null && parameters.fireInterval != null ? parameters.fireInterval : 3;
    if (this.numFire > 1) this.tailFadeTime = this.numFire * this.fireInterval;
    this.afterHitParameters = null;
    if (attacker.missileParameters != null && attacker.missileParameters.afterHitParameters != null) {
      this.afterHitParameters = attacker.missileParameters.afterHitParameters;
    }
    let maxNumProj = 49;
    let factor = this.shape == "line" || this.shape == "fire" ? this.weight : this.radius;
    this.numProj = Math.min(maxNumProj, Math.round((maxNumProj * 1.5) / factor));
    if (attacker.multiShots != null && attacker.multiShots >= 1 && this.numFire <= 1) {
      this.numProj = Math.min(this.numProj, attacker.c_scale * attacker.multiShots);
    } else if (attacker.scale > 1) {
      this.numProj = Math.min(this.numProj, attacker.c_scale);
    }

    // Generate random bias for single projectile's spreading effect
    this.spreadAngles = null;
    if (
      this.afterHitParameters != null &&
      (this.afterHitParameters.shape == "pellets" || this.afterHitParameters.shape == "smoke")
    ) {
      this.spreadAngles = generateSpreadAngles(this.afterHitParameters.numPellets);
    }

    // Generate random bias for multiple projectiles
    this.starts = [];
    for (let p = 0; p < this.numProj; p++) {
      this.starts.push({ x: this.xs + randomInt(0, 50), y: this.ys + randomInt(0, 50) });
    }
    this.ends = [];
    let scatterPixel = Math.round(attacker.currentScatteringLevel * 5);
    if (attacker.marksmanSkill) scatterPixel = -8;
    // console.log(scatterPixel);
    for (let p = 0; p < this.numProj; p++) {
      this.ends.push({
        x: this.xt + randomInt(0 - scatterPixel, 50 + scatterPixel),
        y: this.yt + randomInt(0 - scatterPixel, 50 + scatterPixel),
      });
    }

    // Generate trajectory points
    this.points = [];
    this.angles = [];
    for (let p = 0; p < this.numProj; p++) {
      // Parabolic
      if (this.isParabola) {
        let [points, angles] = getParabolaPointSet(
          this.starts[p].x,
          this.starts[p].y,
          this.ends[p].x,
          this.ends[p].y,
          this.hitTime,
          this.totalDistance * this.maxHeightRatio,
        );
        this.points.push(points);
        this.angles.push(angles);
      }

      // Straight
      else {
        this.points.push([]);
        this.angles.push([]);
        let [cos, sin] = getAngle(this.starts[p].x, this.starts[p].y, this.ends[p].x, this.ends[p].y);
        this.points[p].push({ x: this.starts[p].x, y: this.starts[p].y });
        this.angles[p].push({ cos: cos, sin: sin });
        this.dx = this.speed * cos;
        this.dy = this.speed * sin;
        for (let i = 0; i < this.hitTime; i++) {
          let x = this.starts[p].x + i * this.dx;
          let y = this.starts[p].y + i * this.dy;
          this.points[p].push({ x: x, y: y });
          this.angles[p].push({ cos: cos, sin: sin });
        }
      }
    }
  }

  drawProjectiles() {
    let t = this.time;

    switch (this.shape) {
      case "line": {
        for (let p = 0; p < this.numProj; p++) {
          let x1 = this.points[p][t].x;
          let y1 = this.points[p][t].y;
          let x2 = x1 + this.angles[p][t].cos * this.len;
          let y2 = y1 + this.angles[p][t].sin * this.len;
          Canvas.drawLine(this.cxt, x1, y1, x2, y2, this.color, this.width);
          Canvas.fillArc(this.cxt, x2, y2, this.width * 0.5, this.color);
        }
        break;
      }

      case "ball": {
        for (let p = 0; p < this.numProj; p++) {
          let x = this.points[p][t].x;
          let y = this.points[p][t].y;
          Canvas.fillArc(this.cxt, x, y, this.radius, this.color);
        }
        break;
      }

      default:
        break;
    }
  }

  _drawContinuousBullets(t) {
    for (let f = 0; f < this.numFire; f++) {
      let ct = t - f * this.fireInterval;
      if (ct < this.fireInterval) break; // Do not draw tails before the trajectory starts
      if (ct >= this.points[0].length) continue; // Do not draw tails after the trajectory ends

      for (let p = 0; p < this.numProj; p++) {
        let x1 = this.points[p][ct].x;
        let y1 = this.points[p][ct].y;
        let x2 = x1 - this.angles[p][ct].cos * this.len;
        let y2 = y1 - this.angles[p][ct].sin * this.len;
        Canvas.drawLine(this.cxt, x1, y1, x2, y2, this.color, this.width);
        Canvas.fillArc(this.cxt, x1, y1, this.width * 0.5, this.color);
      }
    }
  }

  _drawTrace(t) {
    for (let j = 1; j < this.tailFadeTime; j++) {
      if (t - j < 0) break; // Do not draw tails before the trajectory starts
      if (t - (j - 1) >= this.points[0].length) continue; // Do not draw tails after the trajectory ends
      let weight = this.width - (this.width / this.tailFadeTime) * j;

      for (let p = 0; p < this.numProj; p++) {
        let x1 = this.points[p][t - j].x;
        let y1 = this.points[p][t - j].y;
        let x2 = this.points[p][t - (j - 1)].x;
        let y2 = this.points[p][t - (j - 1)].y;
        Canvas.drawLine(this.cxt, x1, y1, x2, y2, "rgba(150, 150, 150, 0.75)", weight);
      }
    }
  }

  _drawSmokeTail(t) {
    let interval = 3;
    let numSmokes = 10;
    this.tailFadeTime = interval * numSmokes;

    for (let p = 0; p < this.numProj; p++) {
      for (let ct = 0; ct < t; ct += interval) {
        if (ct >= this.points[0].length) continue;
        if (t - ct > this.tailFadeTime) continue;

        let x = this.points[p][ct].x;
        let y = this.points[p][ct].y;

        let radius = 2 + ((t - ct) / this.tailFadeTime) * this.width * 0.75;
        let alpha = 1 - (t - ct) / this.tailFadeTime;
        let color = `rgba(200, 200, 200, ${alpha})`;
        Canvas.fillArc(this.cxt, x, y, radius, color);
      }
    }
  }

  _drawFire(t) {
    for (let j = 1; j < this.tailFadeTime; j++) {
      if (t - j < 0) break; // Do not draw tails before the trajectory starts
      if (t - (j - 1) >= this.points[0].length) continue; // Do not draw tails after the trajectory ends
      let weight = this.width - (this.width / this.tailFadeTime) * j;

      for (let p = 0; p < this.numProj; p++) {
        let x1 = this.points[p][t - j].x;
        let y1 = this.points[p][t - j].y;

        let r1 = weight / 2;
        let r2 = weight / 4;
        if (j == 1) {
          Canvas.fillArc(this.cxt, x1, y1, r1, this.color);
          Canvas.fillArc(this.cxt, x1, y1, r2, this.color2);
        } else {
          let x2 = this.points[p][t - (j - 1)].x;
          let y2 = this.points[p][t - (j - 1)].y;
          Canvas.drawLine(this.cxt, x1, y1, x2, y2, this.color, weight);
          Canvas.drawLine(this.cxt, x1, y1, x2, y2, this.color2, weight / 2);
        }
      }
    }
  }

  drawTails() {
    let t = this.time - (this.shape == "fire" ? 0 : 1);
    if (t < 0) return;

    let contFire = this.numFire > 1;

    if (!contFire) {
      switch (this.shape) {
        case "fire": {
          this._drawFire(t);
          break;
        }

        default: {
          if (this.tailShape == "smoke") {
            this._drawSmokeTail(t);
          } else {
            this._drawTrace(t);
          }
          break;
        }
      }
    } else {
      this._drawContinuousBullets(t);
    }
  }

  drawAfterHitEffect(contFire) {
    let t = this.time - this.hitTime;

    if (contFire) {
      let afterTime = this.afterHitParameters != null ? this.afterHitParameters.expendTime : 0;
      t = t % afterTime;
    }

    let ps = this.afterHitParameters;
    for (let p = 0; p < this.numProj; p++) {
      let x0 = this.ends[p].x;
      let y0 = this.ends[p].y;

      switch (ps.shape) {
        case "circle": {
          let radius = ps.expendSpeed * t;
          let weight = ps.maxWeight - ps.maxWeight * (t / ps.expendTime);
          Canvas.drawArc(this.cxt, x0, y0, radius, ps.color, weight);
          break;
        }

        case "pellets": {
          let midTime = ps.expendTime / 2;
          for (let angle of this.spreadAngles) {
            let cosSpeed = angle.cos * ps.expendSpeed;
            let sinSpeed = angle.sin * ps.expendSpeed;
            let x1, y1, x2, y2;
            if (t < midTime) {
              x1 = x0;
              y1 = y0;
              x2 = x0 + t * cosSpeed;
              y2 = y0 + t * sinSpeed;
            } else {
              x1 = x0 + (t - midTime) * cosSpeed;
              y1 = y0 + (t - midTime) * sinSpeed;
              x2 = x0 + midTime * cosSpeed;
              y2 = y0 + midTime * sinSpeed;
            }
            Canvas.drawLine(this.cxt, x1, y1, x2, y2, ps.color, ps.weight);
          }
          break;
        }

        case "smoke": {
          let midTime = ps.expendTime / 2;
          for (let i = 0; i < this.spreadAngles.length; i++) {
            let angle = this.spreadAngles[i];
            let cosSpeed = angle.cos * ps.expendSpeed;
            let sinSpeed = angle.sin * ps.expendSpeed;
            let x1 = x0 + t * cosSpeed;
            let y1 = y0 + t * sinSpeed;
            let alpha = 1;
            if (t >= midTime) alpha = 1 - (2 * (t - midTime)) / ps.expendTime;
            let radius = (ps.radius * (0.5 + 2 * t)) / ps.expendTime;
            let color = i % 2 == 0 ? addAlphaToRGB("rgb(150,150,150)", alpha) : addAlphaToRGB(ps.color, alpha);
            Canvas.fillArc(this.cxt, x1, y1, radius, color);

            if (ps.hasShrapnel == null || ps.hasShrapnel) {
              cosSpeed = angle.cos * ps.expendSpeed * 1.5;
              sinSpeed = angle.sin * ps.expendSpeed * 1.5;
              x1 = x0 + t * cosSpeed;
              y1 = y0 + t * sinSpeed;
              radius = this.radius * 0.5;
              color = "rgb(70,70,70)";
              Canvas.fillArc(this.cxt, x1, y1, radius, color);
            }
          }
          break;
        }

        default:
          break;
      }
    }
  }

  draw() {
    this.time++;

    let afterTime = this.afterHitParameters != null ? this.afterHitParameters.expendTime : 0;
    let maxTime = this.hitTime + Math.max(this.tailFadeTime, afterTime);

    if (this.time >= maxTime) {
      this.isAlive = false;
      return;
    }

    if (this.time < this.hitTime + this.tailFadeTime) this.drawTails(); // Draw tails first, so they won't block projectiles

    if (this.time <= this.hitTime) {
      this.drawProjectiles();
    } else if (this.afterHitParameters != null && this.hitTime < this.time) {
      if (this.numFire <= 1 && this.time <= this.hitTime + afterTime) this.drawAfterHitEffect(false);
      else if (this.numFire > 1 && this.time < this.hitTime + this.tailFadeTime) this.drawAfterHitEffect(true);
    }
  }
}
