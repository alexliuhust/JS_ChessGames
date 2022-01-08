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
  let current1 = arm1.c_scale;
  let original1 = arm1.scale;
  let current2 = arm2.c_scale;
  let original2 = arm2.scale;

  if (original1 === 1) {
    current1 = arm1.c_singleHP;
    original1 = arm1.singleHP;
  }
  if (original2 === 1) {
    current2 = arm2.c_singleHP;
    original2 = arm2.singleHP;
  }

  console.log(`${current1}/${original1}\t\t\t\t${current2}/${original2}`);
  console.log("-----------------------------------------");
};

// let mover = new EmpireArms.SteamTank([0, 0]);
// let blockers = [];
// blockers.push(new EmpireArms.PalaceGuard([2, 0]));
// blockers.push(new EmpireArms.PalaceGuard([4, 0]));

// AttackActions.armAttackArm(mover, blockers[1], blockers);
// printPos_1Arm(mover);
// printData_1Arm(mover);
// printData_1Arm(blockers[0]);
// printData_1Arm(blockers[1]);

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

let arm1;
let arm2;

console.log("===========================================");
arm1 = new EmpireArms.PalaceKnight([3, 0]);
arm2 = new EmpireArms.SteamTank([3, 1]);

AttackActions.armAttackArm(arm1, arm2);
printData_2Arms(arm1, arm2);
AttackActions.armAttackArm(arm2, arm1);
printData_2Arms(arm1, arm2);
AttackActions.armAttackArm(arm1, arm2);
printData_2Arms(arm1, arm2);
AttackActions.armAttackArm(arm2, arm1);
printData_2Arms(arm1, arm2);
AttackActions.armAttackArm(arm1, arm2);
printData_2Arms(arm1, arm2);
