import * as ArmPrimary from "../arms/arm.js";

export function moveToPosition(mover, toPosition) {
  ArmPrimary.checkArmClass(mover);

  let distance =
    Math.abs(mover.positionX - toPosition[0]) +
    Math.abs(mover.positionY - toPosition[1]);

  let aligned =
    mover.positionX === toPosition[0] || mover.positionY === toPosition[1];

  if (aligned && distance <= mover.c_speed) {
    mover.positionX = toPosition[0];
    mover.positionY = toPosition[1];
    mover.c_speed -= distance;
  }
}
