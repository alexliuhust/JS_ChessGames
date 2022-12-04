import { PowerMap, M_PowerMap, PowerList } from "./common/const.js";
import { dodgePercent } from "./arms/armTools.js";

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

function updateLanguage(selectElement) {
  if (window.localStorage.getItem("useMandarin") != null)
    selectElement.value = window.localStorage.getItem("useMandarin");
}

function updatePowerName(selectElement, player) {
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

  let powerNum = `power${player}`;
  if (window.localStorage.getItem(powerNum) != null)
    selectElement.value = window.localStorage.getItem(powerNum);
}

function updateMaxCost(selectElement) {
  if (window.localStorage.getItem("maxCost") != null)
    selectElement.value = window.localStorage.getItem("maxCost");
}

function updateLocalStorage() {
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
  updateLanguage(language);
  updatePowerName(powersForPlayer1, 1);
  updatePowerName(powersForPlayer2, 2);
  updateMaxCost(maxCost);
  updateLocalStorage();
});

powersForPlayer1.addEventListener("input", (e) => {
  updateLocalStorage();
});

powersForPlayer2.addEventListener("input", (e) => {
  updateLocalStorage();
});

maxCost.addEventListener("input", (e) => {
  updateLocalStorage();
});

language.addEventListener("input", (e) => {
  selectClear();
  updatePowerName(powersForPlayer1, 1);
  updatePowerName(powersForPlayer2, 2);
  updateLocalStorage();
});

// TEST
while (false) {
  let input = prompt("Input the dodge value: ");
  if (input == "" || input == null) break;

  let dodge = parseInt(input);
  console.log(`The dodge value = ${dodge}`);
  let num = 1000;
  let sum = 0;
  let arr = [];
  let min = 100000;
  let max = -100000;
  for (let i = 0; i < num; i++) {
    let per = dodgePercent(dodge);
    arr.push(per);
    sum += per;
    min = Math.min(min, per);
    max = Math.max(max, per);
  }
  sum /= num;
  console.log(`Minimum: ${min}`);
  console.log(`Maximun: ${max}`);
  console.log(`Average: ${sum}`);
}
