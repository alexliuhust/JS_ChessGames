import { Game } from "./game.js";
import * as EmpireArms from "./arms/empire/empireArms.js";
import * as NordFortArms from "./arms/nordfort/nordfortArms.js";

let pos = [
  [10, 2],
  [9, 3],
  [10, 4],
  [11, 1],
  [11, 5],
  [12, 2],
  [13, 3],
  [12, 4],
];
let pieces = [
  new EmpireArms.EmpireMortar([11, 10]),

  new EmpireArms.SwordInfantry(pos[0]),
  new EmpireArms.PalaceGuard(pos[1]),
  new EmpireArms.Musketeer(pos[2]),
  new EmpireArms.MusketRider(pos[3]),
  new EmpireArms.Vanguard(pos[4]),
  new EmpireArms.PalaceKnight(pos[5]),
  new EmpireArms.SteamTank(pos[6]),
  new EmpireArms.SteamTank(pos[7]),

  // new NordFortArms.HallwayGuard(pos[0]),
  // new NordFortArms.NordExecutioner(pos[1]),
  // new NordFortArms.CoastDefender(pos[2]),
  // new NordFortArms.CoastDefenderShield(pos[3]),
  // new NordFortArms.BallistaSquad(pos[4]),
  // new NordFortArms.FlameKnight(pos[5]),
  // new NordFortArms.CoralCavalry(pos[6]),
  // new NordFortArms.StoneGiant(pos[7]),

  // new EmpireArms.SwordInfantry([1, 5]),
  // new EmpireArms.PalaceGuard([3, 5]),
  // new EmpireArms.Musketeer([5, 5]),
  // new EmpireArms.MusketRider([7, 5]),
  // new EmpireArms.Vanguard([9, 5]),
  // new EmpireArms.PalaceKnight([11, 5]),
  // new EmpireArms.CannonGroup([13, 5]),
  // new EmpireArms.EmpireMortar([15, 5]),
  // new EmpireArms.SteamTank([17, 5]),

  // new NordFortArms.HallwayGuard([1, 7]),
  // new NordFortArms.NordExecutioner([3, 7]),
  // new NordFortArms.CoastDefender([5, 7]),
  // new NordFortArms.CoastDefenderShield([7, 7]),
  // new NordFortArms.BallistaSquad([9, 7]),
  // new NordFortArms.FlameKnight([11, 7]),
  // new NordFortArms.CoralCavalry([13, 7]),
  // new NordFortArms.GiantBallista([15, 7]),
  // new NordFortArms.StoneGiant([17, 7]),
];

let game = new Game(pieces);
game.start();
