function countNumFriendsThrough(xs, ys, xd, yd, seenFriends) {
  let count = 0;
  if (xs == xd) {
    let y1 = Math.min(ys, yd);
    let y2 = Math.max(ys, yd);
    for (let i = y1; i <= y2; i++) {
      let str = `${xs},${i}`;
      if (str in seenFriends) {
        count++;
      }
    }
  } else if (ys == yd) {
    let x1 = Math.min(xs, xd);
    let x2 = Math.max(xs, xd);
    for (let i = x1; i <= x2; i++) {
      let str = `${i},${ys}`;
      if (str in seenFriends) {
        count++;
      }
    }
  }
  return count;
}

export function moveToPosition(mover, toPosition, blockers) {
  let seenFriends = {};
  for (let blocker of blockers) {
    if (blocker !== mover && blocker.player.playerNumber == mover.player.playerNumber) {
      seenFriends[`${blocker.positionX},${blocker.positionY}`] = blocker;
    }
  }

  let distance = Math.abs(mover.positionX - toPosition[0]) + Math.abs(mover.positionY - toPosition[1]);

  let aligned = mover.positionX === toPosition[0] || mover.positionY === toPosition[1];

  if (aligned && distance <= mover.c_speed) {
    if (blockers !== null) {
      toPosition = getRealDestination(mover, toPosition, blockers)[0];
    }

    distance = Math.abs(mover.positionX - toPosition[0]) + Math.abs(mover.positionY - toPosition[1]);
    // Go through each friendly piece results 1 speed penalty
    distance += countNumFriendsThrough(mover.positionX, mover.positionY, toPosition[0], toPosition[1], seenFriends);

    let dir = null;
    if (toPosition[0] > mover.positionX) dir = "R";
    if (toPosition[0] < mover.positionX) dir = "L";
    if (toPosition[1] > mover.positionY) dir = "D";
    if (toPosition[1] < mover.positionY) dir = "U";

    // If a friendly piece is on the toPosition cell, it must be swappable
    let toPosStr = `${toPosition[0]},${toPosition[1]}`;
    if (toPosStr in seenFriends) {
      let friend = seenFriends[toPosStr];
      friend.positionX = mover.positionX;
      friend.positionY = mover.positionY;
      friend.c_speed = 0;
      mover.c_speed = 0;
      friend.updateCurrentFatigue("move", distance);
    } else {
      mover.c_speed -= distance;
    }
    mover.positionX = toPosition[0];
    mover.positionY = toPosition[1];
    mover.updateCurrentFatigue("move", distance);

    // Detach from melee
    for (let enemy of mover.inMeleeWith) {
      enemy.inMeleeWith.delete(mover);
    }
    mover.inMeleeWith.clear();
    mover.removeStatus("IM");
    mover.removeStatus("HP");

    if (dir != null) mover.preAct = "mov " + dir;
    else mover.preAct = null;

    // Reform formation
    mover.reform();

    return distance;
  }
  return 0;
}

export function getRealDestination(mover, toPosition, blockers) {
  const realDestination = [...toPosition];
  let closestBlocker = null;

  const isBlockingUnit = (blocker) => {
    if (blocker === mover) return false;
    const isFriendly = blocker.player.playerNumber === mover.player.playerNumber;
    const isSparse = blocker.isSparse() || mover.isSparse();
    return !(isFriendly && isSparse);
  };

  const checkVerticalBlocker = (blocker) => {
    if (blocker.positionX !== toPosition[0]) return;

    const movingDown = mover.positionY < toPosition[1];
    const blockerInPath = movingDown ? blocker.positionY > mover.positionY : blocker.positionY < mover.positionY;

    if (!blockerInPath) return;

    const newY = movingDown ? blocker.positionY - 1 : blocker.positionY + 1;
    const isBetter = movingDown ? newY < realDestination[1] : newY > realDestination[1];

    if (isBetter) {
      realDestination[1] = newY;
      closestBlocker = blocker;
    }
  };

  const checkHorizontalBlocker = (blocker) => {
    if (blocker.positionY !== toPosition[1]) return;

    const movingRight = mover.positionX < toPosition[0];
    const blockerInPath = movingRight ? blocker.positionX > mover.positionX : blocker.positionX < mover.positionX;

    if (!blockerInPath) return;

    const newX = movingRight ? blocker.positionX - 1 : blocker.positionX + 1;
    const isBetter = movingRight ? newX < realDestination[0] : newX > realDestination[0];

    if (isBetter) {
      realDestination[0] = newX;
      closestBlocker = blocker;
    }
  };

  const isVerticalMovement = mover.positionX === toPosition[0];

  for (const blocker of blockers) {
    if (!isBlockingUnit(blocker)) continue;

    if (isVerticalMovement) {
      checkVerticalBlocker(blocker);
    } else {
      checkHorizontalBlocker(blocker);
    }
  }

  return [realDestination, closestBlocker];
}
