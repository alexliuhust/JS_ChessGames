import { showDeployInfo, addToContainer, toGold } from "../deployMethods.js";
import { DeployWidth as DW, DeployHeight as DH } from "../const.js";
import { Canvas } from "../tools.js";

const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
};

let output = showDeployInfo(1);
let POWER = output[0];
let arms = output[1];
let images = output[2];
let money = output[3];

let containers = [[], [], [], [], [], []];

for (let i = 0; i < 9; i++) {
  let elem = document.getElementById(i).firstChild;

  elem.addEventListener("mousedown", (e) => {
    if (money < arms[i].cost) return;
    if (addToContainer(arms[i], i, images[i], containers)) {
      money -= arms[i].cost;
    } else return;

    let moneyLeftSpan = document.getElementById("moneyLeft");
    moneyLeftSpan.textContent = toGold(money);

    // window.localStorage.setItem("containers1", JSON.stringify(containers));
  });
}

let maxX = Math.floor(DW / 50);
let maxY = Math.floor(DH / 50);

for (let i = 0; i < maxX; i++) {
  for (let j = 0; j < maxY; j++) {
    Canvas.drawRect(canvasList.map, i * 50, j * 50, 50, 50, "black");
  }
}
