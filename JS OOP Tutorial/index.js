class Circle {
  constructor(radius) {
    this.radius = radius;

    var defaultLocation = { x: 0, y: 0 };

    this.getDefaultLocation = function () {
      return defaultLocation;
    };
    this.setDefaultLocation = function (value) {
      if (!value.x || !value.y) {
        throw new Error("Invalid Location!");
      }
      defaultLocation = value;
    };

    this.draw = function () {
      console.log("draw 3.0 : " + this.radius);
    };
  }
}

const circle = new Circle(2);
console.log(circle.defaultLocation);
console.log(circle.getDefaultLocation());
circle.setDefaultLocation({ x: 3, y: 9 });
console.log(circle.getDefaultLocation());
