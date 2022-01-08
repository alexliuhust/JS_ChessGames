import * as ArmPrimary from "../arms/arm.js";

export function moveToPosition(mover, toPosition, blockers) {
  ArmPrimary.checkArmClass(mover);

  let distance =
    Math.abs(mover.positionX - toPosition[0]) +
    Math.abs(mover.positionY - toPosition[1]);

  let aligned =
    mover.positionX === toPosition[0] || mover.positionY === toPosition[1];

  if (aligned && distance <= mover.c_speed) {
    if (blockers !== null) {
      toPosition = getRealDestination(mover, toPosition, blockers);
    }

    distance =
      Math.abs(mover.positionX - toPosition[0]) +
      Math.abs(mover.positionY - toPosition[1]);

    mover.positionX = toPosition[0];
    mover.positionY = toPosition[1];

    console.log("distance", distance);

    mover.c_speed -= distance;
  }
}

function getRealDestination(mover, toPosition, blockers) {
  let realDestination = [toPosition[0], toPosition[1]];

  if (mover.positionX === toPosition[0]) {
    for (let i = 0; i < blockers.length; i++) {
      let blocker = blockers[i];
      if (blocker.positionX == toPosition[0]) {
        if (
          mover.positionY < toPosition[1] &&
          blocker.positionY > mover.positionY
        ) {
          realDestination[1] = Math.min(
            realDestination[1],
            blocker.positionY - 1
          );
        } else if (
          mover.positionY > toPosition[1] &&
          blocker.positionY < mover.positionY
        ) {
          realDestination[1] = Math.max(
            realDestination[1],
            blocker.positionY + 1
          );
        }
      }
    }
  } else {
    for (let i = 0; i < blockers.length; i++) {
      let blocker = blockers[i];
      if (blocker.positionY == toPosition[1]) {
        if (
          mover.positionX < toPosition[0] &&
          blocker.positionX > mover.positionX
        ) {
          realDestination[0] = Math.min(
            realDestination[0],
            blocker.positionX - 1
          );
        } else if (
          mover.positionX > toPosition[0] &&
          blocker.positionX < mover.positionX
        ) {
          realDestination[0] = Math.max(
            realDestination[0],
            blocker.positionX + 1
          );
        }
      }
    }
  }

  return realDestination;
}
