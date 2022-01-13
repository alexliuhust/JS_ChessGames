import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { HpColor, AmmoColor } from "../const.js";

const textLeftMostX = 70;

export function drawInfoForSelectedPiece(cxt, piece) {
  ArmPrimary.checkArmClass(piece);

  // Draw image and arm's name
  drawTitle(cxt, piece);

  // Draw HP bar and ammo bar
  drawHPAndAmmoBars(cxt, piece);
}

function drawTitle(cxt, piece) {
  Canvas.drawImg(cxt, piece.img, 10, 20);
  Canvas.drawText(cxt, piece.name, textLeftMostX, 35, "white", 25);
}

function drawHPAndAmmoBars(cxt, piece) {
  let hpBarY = 65;
  let ammoBarY = hpBarY + 20;

  let hpText = `[${piece.c_scale} / ${piece.scale}]`;
  let ammoText = `[${piece.c_ammo} / ${piece.ammo}]`;
  let hpBarLength, ammoBarLength;
  if (piece.scale === 1) {
    hpBarLength = (200 * piece.c_singleHP) / piece.singleHP;
    hpText = `[${piece.c_singleHP} / ${piece.singleHP}]`;
  } else {
    hpBarLength = (200 * piece.c_scale) / piece.scale;
  }
  if (piece.ammo === -1) {
    ammoBarLength = 0;
    ammoText = "   none";
  } else {
    ammoBarLength = (200 * piece.c_ammo) / piece.ammo;
  }

  Canvas.drawText(cxt, " Total HP: ", textLeftMostX, hpBarY, "white", 18);
  Canvas.drawText(cxt, "Ammo left: ", textLeftMostX, ammoBarY, "white", 18);

  let barX = 170;
  hpBarY -= 8;
  ammoBarY -= 8;

  Canvas.drawLine(cxt, barX, hpBarY, barX + 200, hpBarY, "white", 18);
  Canvas.drawLine(cxt, barX, ammoBarY, barX + 200, ammoBarY, "white", 18);

  Canvas.drawLine(cxt, barX, hpBarY, barX + hpBarLength, hpBarY, HpColor, 18);
  Canvas.drawLine(
    cxt,
    barX,
    ammoBarY,
    barX + ammoBarLength,
    ammoBarY,
    AmmoColor,
    18
  );

  Canvas.drawText(cxt, hpText, textLeftMostX + 170, hpBarY + 5, "black", 16);
  Canvas.drawText(
    cxt,
    ammoText,
    textLeftMostX + 170,
    ammoBarY + 5,
    "black",
    16
  );
}
