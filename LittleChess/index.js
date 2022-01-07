import * as EmpireArms from "./arms/empire/empireArms.js";
import * as AttackActions from "./actions/attack.js";

let printData = function (arm1, arm2) {
  console.log(`${arm1.name}(${arm1.c_ammo})\t\t${arm2.name}(${arm2.c_ammo})`);
  console.log(
    `${arm1.c_scale}/${arm1.scale}\t\t\t\t${arm2.c_scale}/${arm2.scale}`
  );
  console.log("-----------------------------------------");
};

let arm1;
let arm2;

console.log("===========================================");
arm1 = new EmpireArms.SwordInfantry([3, 0]);
arm2 = new EmpireArms.MusketRider([2, 5]);

AttackActions.armAttackArm(arm1, arm2);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm1, arm2);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm1, arm2);
printData(arm1, arm2);
