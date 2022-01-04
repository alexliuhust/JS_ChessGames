class Arm {
  constructor() {
    this.positionX = 0;
    this.positionY = 0;
  }

  getScale() {
    console.log(this.scale);
  }
}

class Swordman extends Arm {
  constructor() {
    super();
    this.name = "Swordman";
    this.scale = 30;
  }
}

class Spearman extends Arm {
  constructor() {
    super();
    this.name = "Spearman";
    this.scale = 25;
  }
}

let arm = new Arm();
let swordman = new Swordman();
let spearman = new Spearman();

arm.getScale();
swordman.getScale();
spearman.getScale();
