import { SwordInfantry } from "./arms/empire/empireArms.js";

let powersForPlayer1 = document.getElementById("powersForPlayer1");
let powersForPlayer2 = document.getElementById("powersForPlayer2");
let maxCost = document.getElementById("maxCost");
let language = document.getElementById("useMandarin");

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
  updateInfo();
});
