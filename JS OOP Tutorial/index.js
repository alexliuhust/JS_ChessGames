// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log("draw 1.0 : " + radius);
    },
  };
}
const circle1 = createCircle(4);

// Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw 2.0 : " + this.radius);
  };
}
const circle2 = new Circle(3);

// new version of constructor function:
class NewCircle {
  constructor(radius) {
    this.radius = radius;
    this.draw = function () {
      console.log("draw 3.0 : " + this.radius);
    };
  }
}
const circle3 = new NewCircle(2);
circle3.draw();

console.log(circle1.constructor);
console.log(circle2.constructor);
console.log(circle3.constructor);
console.log(NewCircle.constructor);
