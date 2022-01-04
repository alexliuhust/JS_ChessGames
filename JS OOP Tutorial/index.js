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

// add two properties
circle3.xPos = 1;
circle3["yPos"] = 2;

// iterate all propeties
for (let key in circle3) {
  console.log(key, circle3[key]);
}

// iterate only the non-function properties
for (let key in circle3) {
  if (typeof circle3[key] !== "function") {
    console.log(key, circle3[key]);
  }
}

// store the names of all the properties into an array
let keys = Object.keys(circle3);
console.log(keys);

// check whether an object has a certain property
if ("xPos" in circle3) {
  console.log("'xPos' is in circle3.");
}
