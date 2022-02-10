import { PowerMap, M_PowerMap, PowerList } from "./const.js";

let powersForPlayer1 = document.getElementById("powersForPlayer1");
let powersForPlayer2 = document.getElementById("powersForPlayer2");
let maxCost = document.getElementById("maxCost");
let language = document.getElementById("useMandarin");

function selectClear() {
  let len1 = powersForPlayer1.options.length - 1;
  let len2 = powersForPlayer2.options.length - 1;
  for (let i = len1; i >= 0; i--) powersForPlayer1.remove(i);
  for (let i = len2; i >= 0; i--) powersForPlayer2.remove(i);
}

function updatePowerName(selectElement) {
  let useMandarin = language.value === "true";
  for (let i = 0; i < PowerList.length; i++) {
    let option = document.createElement("option");
    option.value = PowerList[i];
    let powerRealName = useMandarin
      ? M_PowerMap.get(option.value)
      : PowerMap.get(option.value);
    option.text = powerRealName;
    selectElement.add(option);
    selectElement.add(option);
  }
}

function updateInfo() {
  window.localStorage.clear();
  let power1 = powersForPlayer1.value;
  let power2 = powersForPlayer2.value;
  let cost = parseInt(maxCost.value);
  let useMandarin = language.value;
  window.localStorage.setItem("power1", power1);
  window.localStorage.setItem("power2", power2);
  window.localStorage.setItem("maxCost", cost);
  window.localStorage.setItem("useMandarin", useMandarin);
}

window.addEventListener("load", (e) => {
  updatePowerName(powersForPlayer1);
  updatePowerName(powersForPlayer2);
  updateInfo();
});

powersForPlayer1.addEventListener("input", (e) => {
  updateInfo();
});

powersForPlayer2.addEventListener("input", (e) => {
  updateInfo();
});

maxCost.addEventListener("input", (e) => {
  updateInfo();
});

language.addEventListener("input", (e) => {
  selectClear();
  updatePowerName(powersForPlayer1);
  updatePowerName(powersForPlayer2);
  updateInfo();
});
