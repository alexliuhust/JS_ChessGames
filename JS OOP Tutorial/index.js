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
