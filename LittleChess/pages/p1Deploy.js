import { Deploy } from "../deployMethods.js";
import { DeployWidth as DW, DeployHeight as DH } from "../const.js";
import { Canvas } from "../tools.js";

const canvasList = {
  map: document.getElementById("map").getContext("2d"),
  piece: document.getElementById("piece").getContext("2d"),
  select: document.getElementById("select").getContext("2d"),
};

let deploy = new Deploy(canvasList, 1);
deploy.showDeployInfo();

// ===============================================================
// ==================== Mouse Clicking Events ====================
// ===============================================================
let select = document.getElementById("select");
select.onclick = (e) => {
  deploy.mouseClickingActions(e);
};
