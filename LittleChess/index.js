import { PowerMap, M_PowerMap, PowerList } from "./common/const.js";

const powersForPlayer1 = document.getElementById("powersForPlayer1");
const powersForPlayer2 = document.getElementById("powersForPlayer2");
const maxCost = document.getElementById("maxCost");
const language = document.getElementById("useMandarin");
const maxNumEliteAndHero = document.getElementById("maxNumEliteAndHero");
const strictDeploymentArea = document.getElementById("strictDeploymentArea");

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

function updateMaxNumEliteAndHero(selectElement) {
  if (window.localStorage.getItem("maxNumEliteAndHero") != null)
    selectElement.value = window.localStorage.getItem("maxNumEliteAndHero");
}

function updateStrictDeploymentArea(selectElement) {
  if (window.localStorage.getItem("strictDeploymentArea") != null)
    selectElement.value = window.localStorage.getItem("strictDeploymentArea");
}

function updateLocalStorage() {
  let power1 = powersForPlayer1.value;
  let power2 = powersForPlayer2.value;
  let cost = parseInt(maxCost.value);
  let useMandarin = language.value;
  let maxNumEliteAndHeroValue = parseInt(maxNumEliteAndHero.value);
  let strictDeploymentAreaValue = strictDeploymentArea.value;
  window.localStorage.setItem("power1", power1);
  window.localStorage.setItem("power2", power2);
  window.localStorage.setItem("maxCost", cost);
  window.localStorage.setItem("useMandarin", useMandarin);
  window.localStorage.setItem("maxNumEliteAndHero", maxNumEliteAndHeroValue);
  window.localStorage.setItem("strictDeploymentArea", strictDeploymentAreaValue);
}

window.addEventListener("load", () => {
  updateLanguage(language);
  updatePowerName(powersForPlayer1, 1);
  updatePowerName(powersForPlayer2, 2);
  updateMaxCost(maxCost);
  updateMaxNumEliteAndHero(maxNumEliteAndHero);
  updateStrictDeploymentArea(strictDeploymentArea);
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

maxNumEliteAndHero.addEventListener("input", () => {
  updateLocalStorage();
});

strictDeploymentArea.addEventListener("input", () => {
  updateLocalStorage();
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
