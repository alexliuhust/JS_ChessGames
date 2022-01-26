import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { HpColor, AmmoColor, LeadColor, ExpColor } from "../const.js";

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

  let expLength = (144 * Math.min(piece.exp, piece.cost)) / piece.cost;
  Canvas.drawLine(cxt, 320, 83, 470, 83, "white", 18);
  Canvas.drawLine(cxt, 320 + 3, 83, 320 + expLength + 3, 83, ExpColor, 12);

  let levelInfo = `Level: ${piece.level}`;
  let expInfo = `exp: ${piece.exp}`;
  Canvas.drawText(cxt, levelInfo, 250, 90, "white", 16);
  Canvas.drawText(cxt, expInfo, 370, 88, "black", 14);
}

function drawHPAndAmmoBars(cxt, piece) {
  let hpBarY = 140;
  let leadBarY = hpBarY + 30;
  let ammoBarY = leadBarY + 30;

  let hpText = `${piece.c_scale} / ${piece.scale}`;
  let leadText = `${piece.c_leadership} / ${piece.leadership}`;
  let ammoText = `${piece.c_ammo} / ${piece.ammo}`;
  let hpBarLength, leadBarLength, ammoBarLength;

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
  leadBarLength = (194 * piece.c_leadership) / piece.leadership;

  Canvas.drawText(cxt, "Scale or HP: ", textLeftMostX, hpBarY, "white", 18);
  Canvas.drawText(cxt, "Leadership: ", textLeftMostX, leadBarY, "white", 18);
  Canvas.drawText(cxt, "Ammo per-unit: ", textLeftMostX, ammoBarY, "white", 18);

  let barX = 170;
  hpBarY -= 8;
  leadBarY -= 8;
  ammoBarY -= 8;

  Canvas.drawLine(cxt, barX, hpBarY, barX + 200, hpBarY, "white", 18);
  Canvas.drawLine(cxt, barX, leadBarY, barX + 200, leadBarY, "white", 18);
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
    leadBarY,
    barX + leadBarLength + 3,
    leadBarY,
    LeadColor,
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
    leadText,
    textLeftMostX + 217,
    leadBarY + 5,
    "black",
    15
  );
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
  let textY = 280;

  Canvas.drawLine(
    cxt,
    textLeftMostX,
    textY - 45,
    textLeftMostX + 485,
    textY - 45,
    "white",
    7
  );

  let speedText = `Speed:     ${piece.c_speed}`;
  let armorText = `Armor:     Melee[ ${piece.c_meleeArmor} ]         Missle[ ${piece.c_missleArmor} ]         Charge[ ${piece.c_chargeArmor} ]`;
  let attackText = `Damage:  Melee[ ${piece.c_meleeAttack}(+${piece.meleeAttack_bonus}) ]  Missle[ ${piece.c_missleAttack}(+${piece.missleAttack_bonus}) ]  Charge[ ${piece.c_chargeAttack}(+${piece.chargeAttack_bonus}) ]`;
  let missleInfo = `Missle-range: ${piece.c_missleRange}      Missle-radius: ${piece.c_missleRadius}`;
  let antiArmorText = `Anti-armor:         ${piece.antiArmor}`;

  let color = "white";
  let fontSize = 17;
  Canvas.drawText(cxt, speedText, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, armorText, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, attackText, textLeftMostX, textY, color, fontSize);
  textY += 50;
  Canvas.drawText(cxt, missleInfo, textLeftMostX, textY, color, fontSize);
  textY += 50;
  Canvas.drawText(cxt, antiArmorText, textLeftMostX, textY, color, fontSize);
}
