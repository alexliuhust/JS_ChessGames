// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log("draw:" + radius);
    },
  };
}

const circle = createCircle(4);
circle.draw();

// Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw 2.0:" + this.radius);
  };
}

// new version of constructor function:
class NewCircle {
  constructor(radius) {
    this.radius = radius;
    this.draw = function () {
      console.log("draw 2.0:" + this.radius);
    };
  }
}

const circle2 = new Circle(3);
circle2.draw();
