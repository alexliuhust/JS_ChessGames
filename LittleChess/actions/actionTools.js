export function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export function areAligned(x1, y1, x2, y2) {
  return x1 === x2 || y1 === y2;
}
