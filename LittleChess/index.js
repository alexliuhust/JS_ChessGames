import { SwordInfantry } from "./arms/empire/empireArms.js";

let swordInfantry = new SwordInfantry();
let knight = new SwordInfantry();
console.log(swordInfantry.name, swordInfantry.type);

knight.type = "cavalry";
console.log(swordInfantry.getAntiArmor("melee", knight));
console.log(swordInfantry.getRawTotalDamage("melee", knight));

knight.type = "infantry";
console.log(swordInfantry.getAntiArmor("melee", knight));
console.log(swordInfantry.getRawTotalDamage("melee", knight));

swordInfantry.c_scale = swordInfantry.scale;
swordInfantry.decreaseScale("melee", 0, 1234);
console.log(`${swordInfantry.c_scale}/${swordInfantry.scale}`);

swordInfantry.c_scale = swordInfantry.scale;
swordInfantry.decreaseScale("missle", 0, 1234);
console.log(`${swordInfantry.c_scale}/${swordInfantry.scale}`);

swordInfantry.c_scale = swordInfantry.scale;
swordInfantry.decreaseScale("charge", 0, 1234);
console.log(`${swordInfantry.c_scale}/${swordInfantry.scale}`);
