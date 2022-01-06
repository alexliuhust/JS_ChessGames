import * as EmpireArms from "./arms/empire/empireArms.js";
import * as AttackActions from "./actions/attack.js";

let printData = function (arm1, arm2) {
  console.log(`${arm1.name}\t\t${arm2.name}`);
  console.log(
    `${arm1.c_scale}/${arm1.scale}\t\t\t\t${arm2.c_scale}/${arm2.scale}`
  );
};

let arm1 = new EmpireArms.PalaceKnight();
let arm2 = new EmpireArms.PalaceGuard();

AttackActions.armAttackArm(arm1, "melee", arm2);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, "melee", arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm1, "melee", arm2);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, "melee", arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm1, "melee", arm2);
printData(arm1, arm2);

console.log("===========================================");
arm1 = new EmpireArms.SwordInfantry();
arm2 = new EmpireArms.MusketRider();

AttackActions.armAttackArm(arm2, "missle", arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, "missle", arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, "missle", arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, "missle", arm1);
printData(arm1, arm2);
AttackActions.armAttackArm(arm2, "missle", arm1);
printData(arm1, arm2);

console.log("===========================================");
