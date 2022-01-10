import * as EmpireArms from "./arms/empire/empireArms.js";
import * as NordFortArms from "./arms/nordfort/nordfortArms.js";
import * as AttackActions from "./actions/attack.js";
import * as MoveActions from "./actions/move.js";

var myGamePiece;

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1300;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

class Component {
  constructor(imageScs, x, y) {
    this.type = "image";
    this.image = new Image();
    this.image.src = imageScs;
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y;

    this.update = function () {
      let ctx = myGameArea.context;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
  }
}

function updateGameArea() {
  myGameArea.clear();
  // myGamePiece.newPos();
  myGamePiece.update();
}

function startGame() {
  myGamePiece = new Component("images/empire/SteamTank.png", 100, 200);
  myGameArea.start();
}

window.onload = (event) => {
  startGame();
};
