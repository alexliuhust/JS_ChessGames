import { PowerMap, M_PowerMap, PowerList } from "./common/const.js";

const inputIDList = [
  "useMandarin",
  "maxCost",
  "maxNumEliteAndHero",
  "uniqueEliteAndHero",
  "strictDeploymentArea",
  "techLimit",
  "powersForPlayer1",
  "powersForPlayer2",
];

const labelList = [
  "Language",
  "Max Cost",
  "Elites & Heroes Limit",
  "Unique Elite & Hero",
  "Strict Deployment Area",
  "Technology Limit",
  "Player 1 Power",
  "Player 2 Power",
];

const m_labelList = [
  "语言",
  "资金上限",
  "精英和英雄上限",
  "精英和英雄独一性",
  "严格布阵区域",
  "科技限制",
  "玩家1势力",
  "玩家2势力",
];

const powersForPlayer1 = document.getElementById("powersForPlayer1");
const powersForPlayer2 = document.getElementById("powersForPlayer2");
const maxCost = document.getElementById("maxCost");
const language = document.getElementById("useMandarin");
const maxNumEliteAndHero = document.getElementById("maxNumEliteAndHero");
const techLimit = document.getElementById("techLimit");
const moneyUnit = document.getElementById("moneyUnit");
const saveAndContinueButton = document.getElementById("saveAndContinue");
const uniqueEliteAndHeroRadios = document.querySelectorAll('input[name="uniqueEliteAndHero"]');
const strictDeploymentAreaRadios = document.querySelectorAll('input[name="strictDeploymentArea"]');

function getRadioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`).value;
}

function setRadioValue(name, value) {
  const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (radio) radio.checked = true;
}

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

function updateUniqueEliteAndHero() {
  if (window.localStorage.getItem("uniqueEliteAndHero") != null)
    setRadioValue("uniqueEliteAndHero", window.localStorage.getItem("uniqueEliteAndHero"));
}

function updateStrictDeploymentArea() {
  if (window.localStorage.getItem("strictDeploymentArea") != null)
    setRadioValue("strictDeploymentArea", window.localStorage.getItem("strictDeploymentArea"));
}

function updateTechLimit(selectElement) {
  if (window.localStorage.getItem("techLimit") != null) selectElement.value = window.localStorage.getItem("techLimit");
}

function updateLocalStorage() {
  let power1 = powersForPlayer1.value;
  let power2 = powersForPlayer2.value;
  let cost = parseInt(maxCost.value);
  let useMandarin = language.value;
  let maxNumEliteAndHeroValue = parseInt(maxNumEliteAndHero.value);
  let uniqueEliteAndHeroValue = getRadioValue("uniqueEliteAndHero");
  let strictDeploymentAreaValue = getRadioValue("strictDeploymentArea");
  let techLimitValue = parseInt(techLimit.value);
  window.localStorage.setItem("power1", power1);
  window.localStorage.setItem("power2", power2);
  window.localStorage.setItem("maxCost", cost);
  window.localStorage.setItem("useMandarin", useMandarin);
  window.localStorage.setItem("maxNumEliteAndHero", maxNumEliteAndHeroValue);
  window.localStorage.setItem("uniqueEliteAndHero", uniqueEliteAndHeroValue);
  window.localStorage.setItem("strictDeploymentArea", strictDeploymentAreaValue);
  window.localStorage.setItem("techLimit", techLimitValue);
}

function updateLabels() {
  let useMandarin = language.value === "true";
  for (let i = 0; i < inputIDList.length; i++) {
    let inputID = inputIDList[i];
    let label = document.getElementById(`${inputID}Label`);
    label.innerHTML = useMandarin ? m_labelList[i] : labelList[i];
  }
  saveAndContinueButton.innerHTML = useMandarin ? "开始部署" : "Go to Deployment";
  moneyUnit.innerHTML = useMandarin ? "金币" : "G";
}

window.addEventListener("load", () => {
  updateLanguage(language);
  updatePowerName(powersForPlayer1, 1);
  updatePowerName(powersForPlayer2, 2);
  updateMaxCost(maxCost);
  updateMaxNumEliteAndHero(maxNumEliteAndHero);
  updateUniqueEliteAndHero();
  updateStrictDeploymentArea();
  updateTechLimit(techLimit);
  updateLabels();
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

uniqueEliteAndHeroRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    updateLocalStorage();
  });
});

strictDeploymentAreaRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    updateLocalStorage();
  });
});

techLimit.addEventListener("input", () => {
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
