import {
  SwordInfantry,
  PalaceGuard,
  Musketeer,
} from "./arms/empire/empireArms.js";

let myArm1 = new SwordInfantry();
let knight = new SwordInfantry();
console.log(myArm1.name, myArm1.type);

knight.type = "cavalry";
console.log(myArm1.getAntiArmor("melee", knight));
console.log(myArm1.getRawTotalDamage("melee", knight));

knight.type = "infantry";
console.log(myArm1.getAntiArmor("melee", knight));
console.log(myArm1.getRawTotalDamage("melee", knight));

myArm1.c_scale = myArm1.scale;
myArm1.decreaseScale("melee", 0, 1234);
console.log(`${myArm1.c_scale}/${myArm1.scale}`);

myArm1.c_scale = myArm1.scale;
myArm1.decreaseScale("missle", 0, 1152);
console.log(`${myArm1.c_scale}/${myArm1.scale}`);

myArm1.c_scale = myArm1.scale;
myArm1.decreaseScale("charge", 0, 1234);
console.log(`${myArm1.c_scale}/${myArm1.scale}`);

console.log("=====================================");

let myArm2 = new Musketeer();
knight = new SwordInfantry();
console.log(myArm2.name, myArm2.type);

knight.type = "cavalry";
console.log(myArm2.getAntiArmor("missle", knight));
console.log(myArm2.getRawTotalDamage("missle", knight));

knight.type = "infantry";
console.log(myArm2.getAntiArmor("missle", knight));
console.log(myArm2.getRawTotalDamage("missle", knight));

myArm2.c_scale = myArm2.scale;
myArm2.decreaseScale("melee", 0, 1234);
console.log(`${myArm2.c_scale}/${myArm2.scale}`);

myArm2.c_scale = myArm2.scale;
myArm2.decreaseScale("missle", 0, 1234);
console.log(`${myArm2.c_scale}/${myArm2.scale}`);

myArm2.c_scale = myArm2.scale;
myArm2.decreaseScale("charge", 0, 1234);
console.log(`${myArm2.c_scale}/${myArm2.scale}`);
