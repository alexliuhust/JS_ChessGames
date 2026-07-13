import { calculateDistance } from "../actions/actionTools.js";

export function getParabolaPointSet(x1, y1, x2, y2, hitTime, maxHeight) {
  let N = hitTime / 2;
  let H = maxHeight;

  let points = [];
  let angles = [];
  let x_stepSize = (x2 - x1) / (2 * N);
  let y_stepSize = (y2 - y1) / (2 * N);
  for (let i = 0; i < hitTime; i += 1) {
    let x = x1 + i * x_stepSize;
    let y = y1 + i * y_stepSize - (H - (H / (N * N)) * (i - N) * (i - N));
    points.push({ x: x, y: y });
  }
  points.push({ x: x2, y: y2 });

  for (let i = 0; i < points.length; i++) {
    let cos = 0;
    let sin = 0;
    if (i > 0) {
      let distance = calculateDistance(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
      cos = (points[i].x - points[i - 1].x) / distance;
      sin = (points[i].y - points[i - 1].y) / distance;
    }
    angles.push({ cos: cos, sin: sin });
  }

  return [points, angles];
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSpreadAngles(numPellets) {
  let angles = [];
  let angleStep = 360 / numPellets;
  let bias = angleStep * 0.3;
  let start = randomInt(-180, 180);

  for (let i = 0; i < numPellets; i++) {
    const angleDegrees = start + i * angleStep + randomInt(-bias, bias);
    const angleRadians = (angleDegrees * Math.PI) / 180; // Convert to radians
    angles.push({ cos: Math.cos(angleRadians), sin: Math.sin(angleRadians) });
  }
  return angles;
}

export function addAlphaToRGB(rgbString, alpha) {
  // Extract RGB values using regex
  const match = rgbString.match(/\d+/g);

  if (!match || match.length !== 3) {
    throw new Error("Invalid RGB format");
  }

  const [r, g, b] = match;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getAngle(x1, y1, x2, y2) {
  let distance = calculateDistance(x1, y1, x2, y2);
  let cos = (x2 - x1) / distance;
  let sin = (y2 - y1) / distance;
  return [cos, sin];
}
