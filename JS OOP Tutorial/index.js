// new version of constructor function:
class Circle {
  constructor(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };

    let computeOptimumLocation = function () {
      // ...
    };

    this.draw = function () {
      computeOptimumLocation();

      console.log("draw 3.0 : " + this.radius);
    };
  }
}

const circle3 = new Circle(2);
