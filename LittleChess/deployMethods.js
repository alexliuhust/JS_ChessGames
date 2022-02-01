import { exportPower } from "./arms/exportArm.js";

function firstLetterUp(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toGold(string) {
  return string + " G";
}

export function showDeployInfo(player) {
  let powerNumber = "power" + player;

  let powerSpan = document.getElementById("power");
  let moneyLeftSpan = document.getElementById("moneyLeft");
  powerSpan.textContent = firstLetterUp(
    window.localStorage.getItem(powerNumber)
  );
  moneyLeftSpan.textContent = toGold(window.localStorage.getItem("maxCost"));

  let POWER = exportPower(window.localStorage.getItem(powerNumber));

  let arms = POWER.getTestArms(0);
  let images = POWER.getImages();
  let simpleInfoSpan1 = document.getElementById("simpleInfo1");
  let simpleInfoSpan2 = document.getElementById("simpleInfo2");
  for (let i = 0; i < 9; i++) {
    let div = document.getElementById(i);
    let elem = document.createElement("img");
    elem.src = images[i];
    div.appendChild(elem);
    elem.height = "60";
    elem.width = elem.height;
    elem.addEventListener("mouseover", (e) => {
      simpleInfoSpan1.textContent = `${arms[i].name} [${arms[i].cost} G]`;
      simpleInfoSpan2.textContent = arms[i].description;
    });
  }
}
