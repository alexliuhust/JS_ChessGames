import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { HpColor, AmmoColor } from "../const.js";

const textLeftMostX = 20;

export function drawInfoForSelectedPiece(cxt, piece) {
  ArmPrimary.checkArmClass(piece);

  // Draw image and arm's name
  drawTitle(cxt, piece);

  // Draw HP bar and ammo bar
  drawHPAndAmmoBars(cxt, piece);

  drawCombatData(cxt, piece);
}

function drawTitle(cxt, piece) {
  Canvas.drawImg(cxt, piece.img, 0, 0, 50, 50, 10, 10, 85, 85);
  Canvas.drawText(cxt, piece.name, 105, 30, "white", 24);
  Canvas.drawText(cxt, piece.description, 105, 60, "white", 16);
  Canvas.drawText(cxt, `[cost: ${piece.cost}G]`, 105, 90, "white", 16);
}

function drawHPAndAmmoBars(cxt, piece) {
  let hpBarY = 140;
  let ammoBarY = hpBarY + 20;

  let hpText = `${piece.c_scale} / ${piece.scale}`;
  let ammoText = `${piece.c_ammo} / ${piece.ammo}`;
  let hpBarLength, ammoBarLength;
  if (piece.scale === 1) {
    hpBarLength = (194 * piece.c_singleHP) / piece.singleHP;
    hpText = `${piece.c_singleHP} / ${piece.singleHP}`;
  } else {
    hpBarLength = (194 * piece.c_scale) / piece.scale;
  }
  if (piece.ammo === -1) {
    ammoBarLength = 0;
    ammoText = "   N/A";
  } else {
    ammoBarLength = (194 * piece.c_ammo) / piece.ammo;
  }

  Canvas.drawText(cxt, "Scale or HP: ", textLeftMostX, hpBarY, "white", 18);
  Canvas.drawText(cxt, "Ammo per-unit: ", textLeftMostX, ammoBarY, "white", 18);

  let barX = 170;
  hpBarY -= 8;
  ammoBarY -= 8;

  Canvas.drawLine(cxt, barX, hpBarY, barX + 200, hpBarY, "white", 18);
  Canvas.drawLine(cxt, barX, ammoBarY, barX + 200, ammoBarY, "white", 18);

  Canvas.drawLine(
    cxt,
    barX + 3,
    hpBarY,
    barX + hpBarLength + 3,
    hpBarY,
    HpColor,
    12
  );
  Canvas.drawLine(
    cxt,
    barX + 3,
    ammoBarY,
    barX + ammoBarLength + 3,
    ammoBarY,
    AmmoColor,
    12
  );

  Canvas.drawText(cxt, hpText, textLeftMostX + 225, hpBarY + 5, "black", 15);
  Canvas.drawText(
    cxt,
    ammoText,
    textLeftMostX + 225,
    ammoBarY + 5,
    "black",
    15
  );
}

function drawCombatData(cxt, piece) {
  let textY = 200;
  let speedText = `Speed:     ${piece.c_speed}`;
  let armorText = `Armor:     Melee[ ${piece.c_meleeArmor} ]         Missle[ ${piece.c_missleArmor} ]         Charge[ ${piece.c_chargeArmor} ]`;
  let attackText = `Damage:  Melee[ ${piece.c_meleeAttack}(+${piece.meleeAttack_bonus}) ]  Missle[ ${piece.c_missleAttack}(+${piece.missleAttack_bonus}) ]  Charge[ ${piece.c_chargeAttack}(+${piece.chargeAttack_bonus}) ]`;
  let missleRange = `Missle-range:     ${piece.c_missleRange}`;
  let missleRadius = `Missle-radius:    ${piece.c_missleRadius}`;
  let antiArmorText = `Anti-armor:         ${piece.antiArmor}`;

  let color = "white";
  let fontSize = 17;
  Canvas.drawText(cxt, speedText, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, armorText, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, attackText, textLeftMostX, textY, color, fontSize);
  textY += 50;
  Canvas.drawText(cxt, missleRange, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, missleRadius, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, antiArmorText, textLeftMostX, textY, color, fontSize);
}
