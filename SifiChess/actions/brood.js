import { GameWidth, GameHeight } from "../common/const.js";

const maxX = GameWidth / 50;
const maxY = GameHeight / 50;

export function broodAnArm(brooder, brooded) {
  let blockers = new Set();
  let pieces = brooder.player.pieceList;
  let enemies = brooder.player.enemyList;
  let pos = candidatePositions(brooder, enemies);

  for (let i = 0; i < pieces.length; i++)
    blockers.add(`${pieces[i].positionX}-${pieces[i].positionY}`);
  for (let i = 0; i < enemies.length; i++)
    blockers.add(`${enemies[i].positionX}-${enemies[i].positionY}`);

  let target = null;
  for (let i = 0; i < pos.length; i++) {
    let nextPoCode = `${pos[i][0]}-${pos[i][1]}`;
    if (withinBounds(pos[i]) && !blockers.has(nextPoCode)) {
      target = pos[i];
      break;
    }
  }

  if (target != null) {
    brooded.positionX = target[0];
    brooded.positionY = target[1];
    brooder.player.pieceList.push(brooded);
    // console.log(brooder.positionX, brooder.positionY);
    // console.log(brooded.positionX, brooded.positionY);
    return true;
  }
  return false;
}

function withinBounds(position) {
  return (
    position[0] >= 0 &&
    position[0] < maxX &&
    position[1] >= 0 &&
    position[1] < maxY
  );
}

/**
 * Get the candidate positions in the order of most-enemies directions.
 * @param {*} brooder
 * @param {*} enemies
 * @returns
 */
function candidatePositions(brooder, enemies) {
  let numU = 0;
  let numD = 0;
  let numL = 0;
  let numR = 0;
  for (let i = 0; i < enemies.length; i++) {
    let x = enemies[i].positionX - brooder.positionX;
    let y = enemies[i].positionY - brooder.positionY;
    if (y <= x && y <= -x) numU++;
    if (y >= x && y >= -x) numD++;
    if (y >= x && y <= -x) numL++;
    if (y <= x && y >= -x) numR++;
  }

  let dirOrder = [
    { dir: "U", num: numU, signX: 0, signY: -1 },
    { dir: "D", num: numD, signX: 0, signY: 1 },
    { dir: "L", num: numL, signX: -1, signY: 0 },
    { dir: "R", num: numR, signX: 1, signY: 0 },
  ];

  dirOrder.sort(function (a, b) {
    return b.num - a.num;
  });

  let pos = [];
  for (let d = 0; d < 4; d++) {
    for (let i = brooder.broodRange; i >= 1; i--) {
      let biasX = i * dirOrder[d].signX;
      let biasY = i * dirOrder[d].signY;
      pos.push([brooder.positionX + biasX, brooder.positionY + biasY]);
    }
  }

  //console.log(dirOrder);
  //console.log(`U:${numU} D:${numD} L:${numL} R:${numR}`);
  return pos;
}
