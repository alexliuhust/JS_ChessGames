import * as EmpireArms from "./arms/empire/empireArms.js";
import * as AttackActions from "./actions/attack.js";
import * as MoveActions from "./actions/move.js";

let printPos_1Arm = function (arm) {
  console.log(
    `${arm.name}(${arm.positionX}, ${arm.positionY})  ${arm.c_speed}/${arm.speed}`
  );
};

let printData_1Arm = function (arm) {
  console.log(`${arm.name}(${arm.c_ammo})\t${arm.c_scale}/${arm.scale}`);
};

let printData_2Arms = function (arm1, arm2) {
  console.log(`${arm1.name}(${arm1.c_ammo})\t\t${arm2.name}(${arm2.c_ammo})`);
  console.log(
    `${arm1.c_scale}/${arm1.scale}\t\t\t\t${arm2.c_scale}/${arm2.scale}`
  );
  console.log("-----------------------------------------");
};

let mover = new EmpireArms.Vanguard([0, 0]);
MoveActions.moveToPosition(mover, [0, 2]);
printPos_1Arm(mover);
MoveActions.moveToPosition(mover, [1, 3]);
printPos_1Arm(mover);
MoveActions.moveToPosition(mover, [3, 2]);
printPos_1Arm(mover);

// let attacker = new EmpireArms.EmpireMortar([0, 0]);
// let center = [9, 3];
// let defenders = [];
// defenders.push(new EmpireArms.SwordInfantry([8, 2]));
// defenders.push(new EmpireArms.SwordInfantry([9, 1]));
// defenders.push(new EmpireArms.SwordInfantry([10, 4]));
// defenders.push(new EmpireArms.SwordInfantry([7, 4]));
// defenders.push(new EmpireArms.SwordInfantry([7, 6]));

// AttackActions.armBombArea(attacker, center, defenders);
// for (let i = 0; i < defenders.length; i++) {
//   printData_1Arm(defenders[i]);
// }

// let arm1;
// let arm2;

// console.log("===========================================");
// arm1 = new EmpireArms.SwordInfantry([3, 0]);
// arm2 = new EmpireArms.MusketRider([2, 5]);

// AttackActions.armAttackArm(arm1, arm2);
// printData_2Arms(arm1, arm2);
// AttackActions.armAttackArm(arm2, arm1);
// printData_2Arms(arm1, arm2);
// AttackActions.armAttackArm(arm1, arm2);
// printData_2Arms(arm1, arm2);
// AttackActions.armAttackArm(arm2, arm1);
// printData_2Arms(arm1, arm2);
// AttackActions.armAttackArm(arm1, arm2);
// printData_2Arms(arm1, arm2);
