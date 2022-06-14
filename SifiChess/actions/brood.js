import { GameWidth, GameHeight } from "../common/const.js";

const maxX = GameWidth / 50;
const maxY = GameHeight / 50;

export function broodAnArm(brooder, brooded) {
  let pos = candidatePositions(brooder);

  let blockers = new Set();
  let pieces = brooder.player.pieceList;
  let enemies = brooder.player.enemyList;
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

function candidatePositions(brooder) {
  let pos = [
    [brooder.positionX + 1, brooder.positionY],
    [brooder.positionX, brooder.positionY - 1],
    [brooder.positionX, brooder.positionY + 1],
    [brooder.positionX - 1, brooder.positionY],
  ];
  if (brooder.player.playerNumber === 2) {
    pos[3] = [brooder.positionX + 1, brooder.positionY];
    pos[0] = [brooder.positionX - 1, brooder.positionY];
  }
  return pos;
}

function withinBounds(position) {
  return (
    position[0] >= 0 &&
    position[0] < maxX &&
    position[1] >= 0 &&
    position[1] < maxY
  );
}
