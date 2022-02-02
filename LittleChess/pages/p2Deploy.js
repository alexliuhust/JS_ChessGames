import { showDeployInfo, addToContainer, toGold } from "../deployMethods.js";

let output = showDeployInfo(2);
let POWER = output[0];
let arms = output[1];
let images = output[2];
let money = output[3];

let containers = [[], [], [], [], [], []];

for (let i = 0; i < 9; i++) {
  let elem = document.getElementById(i).firstChild;

  elem.addEventListener("mousedown", (e) => {
    if (money < arms[i].cost) return;
    addToContainer(arms[i], i, images[i], containers);
    money -= arms[i].cost;

    let moneyLeftSpan = document.getElementById("moneyLeft");
    moneyLeftSpan.textContent = toGold(money);

    window.localStorage.setItem("containers2", JSON.stringify(containers));
  });
}
