import * as ArmPrimary from "../arms/arm.js";

export function moveToPosition(mover, toPosition, blockers) {
  let distance =
    Math.abs(mover.positionX - toPosition[0]) +
    Math.abs(mover.positionY - toPosition[1]);

  let aligned =
    mover.positionX === toPosition[0] || mover.positionY === toPosition[1];

  if (aligned && distance <= mover.c_speed) {
    if (blockers !== null) {
      toPosition = getRealDestination(mover, toPosition, blockers)[0];
    }

    distance =
      Math.abs(mover.positionX - toPosition[0]) +
      Math.abs(mover.positionY - toPosition[1]);

    mover.positionX = toPosition[0];
    mover.positionY = toPosition[1];

    mover.c_speed -= distance;
  }
}

export function getRealDestination(mover, toPosition, blockers) {
  let realDestination = [toPosition[0], toPosition[1]];
  let closestBlocker = null;

  if (mover.positionX === toPosition[0]) {
    for (let i = 0; i < blockers.length; i++) {
      let blocker = blockers[i];
      if (blocker === mover) continue;

      if (blocker.positionX === toPosition[0]) {
        if (
          mover.positionY < toPosition[1] &&
          blocker.positionY > mover.positionY
        ) {
          if (blocker.positionY - 1 < realDestination[1]) {
            realDestination[1] = blocker.positionY - 1;
            closestBlocker = blocker;
          }
        } else if (
          mover.positionY > toPosition[1] &&
          blocker.positionY < mover.positionY
        ) {
          if (blocker.positionY + 1 > realDestination[1]) {
            realDestination[1] = blocker.positionY + 1;
            closestBlocker = blocker;
          }
        }
      }
    }
  } else {
    for (let i = 0; i < blockers.length; i++) {
      let blocker = blockers[i];

      if (blocker.positionY === toPosition[1]) {
        if (
          mover.positionX < toPosition[0] &&
          blocker.positionX > mover.positionX
        ) {
          if (blocker.positionX - 1 < realDestination[0]) {
            realDestination[0] = blocker.positionX - 1;
            closestBlocker = blocker;
          }
        } else if (
          mover.positionX > toPosition[0] &&
          blocker.positionX < mover.positionX
        ) {
          if (blocker.positionX + 1 > realDestination[0]) {
            realDestination[0] = blocker.positionX + 1;
            closestBlocker = blocker;
          }
        }
      }
    }
  }

  let result = [realDestination, closestBlocker];
  return result;
}
