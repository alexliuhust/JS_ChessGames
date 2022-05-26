import { Deploy } from "../common/deployMethods.js";

const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
};

let deploy = new Deploy(canvasList, 2);
deploy.showDeployInfo();

// ===============================================================
// ==================== Mouse Clicking Events ====================
// ===============================================================
let select = document.getElementById("select");
select.onclick = (e) => {
  deploy.mouseClickingActions(e);
};

window.addEventListener("beforeunload", (e) => {
  deploy.storeArmInfo();
});
