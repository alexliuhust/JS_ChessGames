import { Canvas, Rect } from "../tools.js";
import * as ArmPrimary from "../arms/arm.js";
import { HpColor, AmmoColor, LeadColor, ExpColor } from "../const.js";

const textLeftMostX = 20;
const BGC = "grey";

export function drawInfoForSelectedPiece(cxt, piece, useMandarin) {
  ArmPrimary.checkArmClass(piece);

  // Draw image and arm's name
  drawTitle(cxt, piece, useMandarin);

  // Draw HP bar and ammo bar
  drawHPAndAmmoBars(cxt, piece, useMandarin);

  // Draw the combat data
  drawCombatData(cxt, piece, useMandarin);
}

function drawTitle(cxt, piece, useMandarin) {
  if (piece.img !== null)
    Canvas.drawImg(cxt, piece.img, 0, 0, 50, 50, 10, 10, 85, 85);

  let name = useMandarin ? piece.m_name : piece.name;
  let desc = useMandarin ? piece.m_description : piece.description;
  Canvas.drawText(cxt, name, 105, 30, "white", 24);
  Canvas.drawText(cxt, desc, 105, 60, "white", 16);
  let costText = useMandarin
    ? `[花费: ${piece.cost}金币]`
    : `[cost: ${piece.cost}G]`;
  Canvas.drawText(cxt, costText, 105, 90, "yellow", 16);

  let expLength = (144 * Math.min(piece.exp, piece.cost)) / piece.cost;
  Canvas.drawLine(cxt, 320, 83, 470, 83, BGC, 18);
  Canvas.drawLine(cxt, 320 + 3, 83, 320 + expLength + 3, 83, ExpColor, 12);

  let levelInfo = useMandarin
    ? `等级: ${piece.level}`
    : `Level: ${piece.level}`;
  let expInfo = useMandarin ? `经验: ${piece.exp}` : `exp: ${piece.exp}`;
  Canvas.drawText(cxt, levelInfo, 250, 90, "white", 16);
  Canvas.drawText(cxt, expInfo, 370, 88, "black", 14);
}

function drawHPAndAmmoBars(cxt, piece, useMandarin) {
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

  let scaleOrHp = piece.scale === 1 ? "Total HP: " : "Total Scale: ";
  if (useMandarin)
    scaleOrHp = piece.scale === 1 ? "总生命值: " : "总部队数量: ";
  let leaderTitle = useMandarin ? "士气： " : "Leadership: ";
  let ammoTitle = useMandarin ? "单位弹药剩余: " : "Ammo per-unit: ";
  Canvas.drawText(cxt, scaleOrHp, textLeftMostX, hpBarY, "white", 18);
  Canvas.drawText(cxt, leaderTitle, textLeftMostX, leadBarY, "white", 18);
  Canvas.drawText(cxt, ammoTitle, textLeftMostX, ammoBarY, "white", 18);

  let barX = 170;
  hpBarY -= 8;
  leadBarY -= 8;
  ammoBarY -= 8;

  Canvas.drawLine(cxt, barX, hpBarY, barX + 200, hpBarY, BGC, 18);
  Canvas.drawLine(cxt, barX, leadBarY, barX + 200, leadBarY, BGC, 18);
  Canvas.drawLine(cxt, barX, ammoBarY, barX + 200, ammoBarY, BGC, 18);

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

function drawCombatData(cxt, piece, useMandarin) {
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
  let armorText = `Armor:     Melee[ ${piece.c_meleeArmor} ]         Missile[ ${piece.c_missileArmor} ]         Charge[ ${piece.c_chargeArmor} ]`;
  let dodgeText = `Dodge:     Melee[ ${piece.c_meleeDodge} ]         Missile[ ${piece.c_missileDodge} ]         Charge[ ${piece.c_chargeDodge} ]`;
  let attackText = `Damage:  Melee[ ${piece.c_meleeAttack}(+${piece.meleeAttack_bonus}) ]  Missile[ ${piece.c_missileAttack}(+${piece.missileAttack_bonus}) ]  Charge[ ${piece.c_chargeAttack}(+${piece.chargeAttack_bonus}) ]`;
  let rangeInfo = `Missile-range: ${piece.c_missileRange}`;
  let radiusInfo = `Explose-radius: ${piece.c_missileRadius}`;
  let antiArmorText = `Anti-armor: ${piece.antiArmor}`;
  if (piece.isBombing) antiArmorText = `Anti-armor: *Ignore any type of armor`;

  if (useMandarin) {
    speedText = `速度:     ${piece.c_speed}`;
    armorText = `护甲:     近战[ ${piece.c_meleeArmor} ]         远程[ ${piece.c_missileArmor} ]         冲杀[ ${piece.c_chargeArmor} ]`;
    dodgeText = `闪避:     近战[ ${piece.c_meleeDodge} ]         远程[ ${piece.c_missileDodge} ]         冲杀[ ${piece.c_chargeDodge} ]`;
    attackText = `伤害:     近战[ ${piece.c_meleeAttack}(+${piece.meleeAttack_bonus}) ]  远程[ ${piece.c_missileAttack}(+${piece.missileAttack_bonus}) ]  冲杀[ ${piece.c_chargeAttack}(+${piece.chargeAttack_bonus}) ]`;
    rangeInfo = `远程范围: ${piece.c_missileRange}`;
    radiusInfo = `爆炸半径: ${piece.c_missileRadius}`;
    antiArmorText = `破甲: ${piece.antiArmor}`;
    if (piece.isBombing) antiArmorText = `破甲: *无视所有类型护甲`;
  }

  let color = "white";
  let fontSize = 17;
  Canvas.drawText(cxt, speedText, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, armorText, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, dodgeText, textLeftMostX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, attackText, textLeftMostX, textY, color, fontSize);
  if (piece.missileAttack > 0) {
    textY += 50;
    Canvas.drawText(cxt, rangeInfo, textLeftMostX, textY, color, fontSize);
    if (piece.isBombing) {
      Canvas.drawText(
        cxt,
        radiusInfo,
        textLeftMostX + 200,
        textY,
        color,
        fontSize
      );
    }
  }
  textY += 50;
  Canvas.drawText(cxt, antiArmorText, textLeftMostX, textY, color, fontSize);
}
