import { Trait } from "./const.js";

export function getAllIconImages() {
  let keys = Object.keys(Trait);
  let output = [];
  for (let key of keys) {
    let src = `../images/icons/${key}.png`;
    let id = `${key}`;
    output.push([src, id]);
  }
  return output;
}
