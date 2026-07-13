import { PowerMap, M_PowerMap, PowerList } from "./common/const.js";

const powersForPlayer1 = document.getElementById("powersForPlayer1");
const powersForPlayer2 = document.getElementById("powersForPlayer2");
const maxCost = document.getElementById("maxCost");
const language = document.getElementById("useMandarin");

const saveAndContinueButton = document.getElementById("saveAndContinue");

function updatePowerName(selectElement, player) {
  let useMandarin = window.localStorage.getItem("useMandarin") === "true";

  for (let i = 0; i < PowerList.length; i++) {
    let option = document.createElement("option");
    option.value = PowerList[i];
    let powerRealName = useMandarin ? M_PowerMap.get(option.value) : PowerMap.get(option.value);
    option.text = powerRealName;
    selectElement.add(option);
    selectElement.add(option);
  }

  let powerNum = `power${player}`;
  if (window.localStorage.getItem(powerNum) != null) selectElement.value = window.localStorage.getItem(powerNum);
}

function updateLanguage(selectElement) {
  if (window.localStorage.getItem("useMandarin") != null)
    selectElement.value = window.localStorage.getItem("useMandarin");
}

function updateMaxCost(selectElement) {
  if (window.localStorage.getItem("maxCost") != null) selectElement.value = window.localStorage.getItem("maxCost");
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

window.addEventListener("load", () => {
  updateLanguage(language);
  updatePowerName(powersForPlayer1, 1);
  updatePowerName(powersForPlayer2, 2);
  updateMaxCost(maxCost);
  updateLocalStorage();
});

powersForPlayer1.addEventListener("input", () => {
  updateLocalStorage();
});

powersForPlayer2.addEventListener("input", () => {
  updateLocalStorage();
});

maxCost.addEventListener("input", () => {
  updateLocalStorage();
});

language.addEventListener("input", () => {
  updatePowerName(powersForPlayer1, 1);
  updatePowerName(powersForPlayer2, 2);
  updateLocalStorage();
  location.reload();
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey) {
    // Press ctrl + shift + L to switch language
    if (e.key === "L" || e.key === "l") {
      e.preventDefault();
      let useMandarin = window.localStorage.getItem("useMandarin") == "true";
      window.localStorage.setItem("useMandarin", !useMandarin);
      location.reload();
    }
    // Press ctrl + shift + S to save and continue
    else if (e.key === "S" || e.key === "s") {
      e.preventDefault();
      saveAndContinueButton.click();
    }
  }
});

// TEST
// function calculateStdDev(arr) {
//   if (arr.length <= 1) return 0; // Standard deviation is 0 or undefined for arrays with 0 or 1 element

//   const sum = arr.reduce((acc, val) => acc + val, 0);

//   const mean = sum / arr.length;

//   // Calculate the sum of squared differences from the mean
//   const sumOfSquaredDifferences = arr.reduce((acc, val) => {
//     return acc + Math.pow(val - mean, 2);
//   }, 0);

//   // Calculate variance (divide by n-1 for sample std dev)
//   const variance = sumOfSquaredDifferences / (arr.length - 1);

//   // Standard deviation is the square root of the variance
//   return [mean, Math.sqrt(variance)];
// }

// let dodge = -10;

// const probList = [0.47, 0.62, 0.72, 0.78, 0.84, 0.88, 0.91, 0.95, 0.97, 1.0];
// console.log(probList);
// let result = [];
// let numExp = 50;
// for (let k = 0; k < numExp; k++) {
//   let rand = Math.random().toFixed(2);
//   let idx = 0;
//   for (let i = 9; i >= 0; i--) {
//     if (rand >= probList[i]) {
//       idx = i + 1;
//       break;
//     }
//   }
//   let realDodge = Math.round(dodge + (idx - 2) * 0.1962 * Math.abs(dodge) ** 0.75);
//   result.push(realDodge);
//   console.log(`rand = ${rand}, idx = ${idx}, realDodge = ${realDodge}`);
// }
// let mean, std;
// [mean, std] = calculateStdDev(result);
// console.log(`avg = ${mean.toFixed(2)}, std/dodge = ${(std / dodge).toFixed(4) * 100}%`);
