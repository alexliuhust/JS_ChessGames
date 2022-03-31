import { Canvas } from "../common/tools.js";
import {
  HpColor as HC,
  AmmoColor as AC,
  LeadColor as DC,
  ExpColor as EC,
} from "../common/const.js";

const leftX = 10;
const BGC = "grey";

export function drawInfoForSelectedPiece(cxt, piece, useMandarin, showCost) {
  // Draw image and arm's name
  drawTitle(cxt, piece, useMandarin, showCost);

  // Draw HP bar and ammo bar
  drawHPAndAmmoBars(cxt, piece, useMandarin);

  // Draw the combat data
  drawCombatData(cxt, piece, useMandarin);

  // Draw status
  drawStatus(cxt, piece, useMandarin);
}

function drawTitle(cxt, piece, useMandarin, showCost) {
  if (piece.img !== null)
    Canvas.drawImg(cxt, piece.img, 2, 6, 46, 44, 10, 10, 85, 85);

  let name = useMandarin ? piece.m_name : piece.name;
  let desc = useMandarin ? piece.m_description : piece.description;
  Canvas.drawText(cxt, name, 105, 30, "white", 24);
  Canvas.drawText(cxt, desc, 105, 60, "white", 16);
  if (showCost) {
    let costText = useMandarin
      ? `[花费: ${piece.cost}金币]`
      : `[cost: ${piece.cost}G]`;
    Canvas.drawText(cxt, costText, 105, 90, "yellow", 16);
  }

  let lX = showCost ? 250 : 105;

  let expL = (144 * Math.min(piece.exp, piece.cost)) / piece.cost;
  Canvas.drawLine(cxt, lX + 70, 83, lX + 220, 83, BGC, 18);
  Canvas.drawLine(cxt, lX + 73, 83, lX + 70 + expL + 3, 83, EC, 12);

  let levelInfo = useMandarin
    ? `等级: ${piece.level}`
    : `Level: ${piece.level}`;
  let expInfo = useMandarin ? `经验: ${piece.exp}` : `exp: ${piece.exp}`;
  Canvas.drawText(cxt, levelInfo, lX, 90, "white", 16);
  Canvas.drawText(cxt, expInfo, lX + 120, 88, "black", 14);
}

function drawHPAndAmmoBars(cxt, piece, useMandarin) {
  let hpY = 140;
  let ldY = hpY + 30;
  let amY = ldY + 30;

  let hpText = `${piece.c_scale} / ${piece.scale}`;
  let leadText = `${piece.c_leadership} / ${piece.leadership}`;
  let ammoText = `${piece.c_ammo} / ${piece.ammo}`;
  let hpLen, ldLen, amLen;

  if (piece.scale === 1) {
    hpLen = (194 * piece.c_singleHP) / piece.singleHP;
    hpText = `${piece.c_singleHP} / ${piece.singleHP}`;
  } else {
    hpLen = (194 * piece.c_scale) / piece.scale;
  }
  if (piece.ammo === -1) {
    amLen = 0;
    ammoText = "   N/A";
  } else {
    amLen = (194 * piece.c_ammo) / piece.ammo;
  }
  ldLen = (194 * piece.c_leadership) / piece.leadership;

  let scaleOrHp = piece.scale === 1 ? "Total HP: " : "Total Scale: ";
  if (useMandarin)
    scaleOrHp = piece.scale === 1 ? "总生命值: " : "总部队数量: ";
  let leaderTitle = useMandarin ? "士气： " : "Morale: ";
  let ammoTitle = useMandarin ? "单位弹药剩余: " : "Ammo per-unit: ";

  let color = "white";
  if (piece.scale === 1 && piece.c_singleHP <= piece.singleHP * 0.1)
    color = "red";
  else if (piece.scale > 1 && piece.c_scale <= piece.scale * 0.1) color = "red";
  Canvas.drawText(cxt, scaleOrHp, leftX, hpY, color, 18);
  color = piece.c_leadership <= piece.leadership * 0.1 ? "red" : "white";
  Canvas.drawText(cxt, leaderTitle, leftX, ldY, color, 18);
  color = "white";
  if (piece.ammo !== -1 && piece.c_ammo <= piece.ammo * 0.1) color = "red";
  Canvas.drawText(cxt, ammoTitle, leftX, amY, color, 18);

  let bX = 170;
  hpY -= 8;
  ldY -= 8;
  amY -= 8;

  Canvas.drawLine(cxt, bX, hpY, bX + 200, hpY, BGC, 18);
  Canvas.drawLine(cxt, bX, ldY, bX + 200, ldY, BGC, 18);
  Canvas.drawLine(cxt, bX, amY, bX + 200, amY, BGC, 18);

  Canvas.drawLine(cxt, bX + 3, hpY, bX + hpLen + 3, hpY, HC, 12);
  Canvas.drawLine(cxt, bX + 3, ldY, bX + ldLen + 3, ldY, DC, 12);
  Canvas.drawLine(cxt, bX + 3, amY, bX + amLen + 3, amY, AC, 12);

  Canvas.drawText(cxt, hpText, leftX + 225, hpY + 5, "black", 15);
  Canvas.drawText(cxt, leadText, leftX + 217, ldY + 5, "black", 15);
  Canvas.drawText(cxt, ammoText, leftX + 225, amY + 5, "black", 15);
}

function drawCombatData(cxt, piece, useMandarin) {
  let textY = 280;

  Canvas.drawLine(cxt, leftX, textY - 45, leftX + 485, textY - 45, "white", 7);

  let speedText = `Speed:     ${piece.c_speed}`;
  let armorText = `Armor:     Melee[ ${piece.c_meleeArmor} ]         Missile[ ${piece.c_missileArmor} ]         Charge[ ${piece.c_chargeArmor} ]`;
  let dodgeText = `Dodge:     Melee[ ${piece.c_meleeDodge} ]         Missile[ ${piece.c_missileDodge} ]         Charge[ ${piece.c_chargeDodge} ]`;
  let attackText = `Damage:  Melee[ ${piece.c_meleeAttack}(+${piece.meleeAttack_bonus}) ]  Missile[ ${piece.c_missileAttack}(+${piece.missileAttack_bonus}) ]  Charge[ ${piece.c_chargeAttack}(+${piece.chargeAttack_bonus}) ]`;
  let rangeInfo = `Missile-range: ${piece.c_missileRange}`;
  let radiusInfo = `Explose-radius: ${piece.c_missileRadius}`;
  let antiArmorText = `Anti-armor: ${piece.antiArmor}`;
  if (piece.isBombing || piece.type === "artillery")
    antiArmorText = `Anti-armor: *Ignore any type of armor`;
  let healText = `Healing: ${piece.c_totalHeal} / ${piece.totalHeal}`;
  let inspText = `Inspiring: ${piece.inspiring}`;
  // let arEnhText = `Armor Enhancing: ${piece.armorEnhance}%`;
  // let atEnhText = `Attack Enhancing: ${piece.attackEnhance}%`;

  if (useMandarin) {
    speedText = `速度:     ${piece.c_speed}`;
    armorText = `护甲:     近战[ ${piece.c_meleeArmor} ]         远程[ ${piece.c_missileArmor} ]         冲杀[ ${piece.c_chargeArmor} ]`;
    dodgeText = `闪避:     近战[ ${piece.c_meleeDodge} ]         远程[ ${piece.c_missileDodge} ]         冲杀[ ${piece.c_chargeDodge} ]`;
    attackText = `伤害:     近战[ ${piece.c_meleeAttack}(+${piece.meleeAttack_bonus}) ]  远程[ ${piece.c_missileAttack}(+${piece.missileAttack_bonus}) ]  冲杀[ ${piece.c_chargeAttack}(+${piece.chargeAttack_bonus}) ]`;
    rangeInfo = `远程范围: ${piece.c_missileRange}`;
    radiusInfo = `爆炸半径: ${piece.c_missileRadius}`;
    antiArmorText = `破甲: ${piece.antiArmor}`;
    if (piece.isBombing || piece.type === "artillery")
      antiArmorText = `破甲: *无视所有类型护甲`;
    healText = `治疗量: ${piece.c_totalHeal} / ${piece.totalHeal}`;
    inspText = `鼓舞: ${piece.inspiring}`;
    // arEnhText = `护甲增强: ${piece.armorEnhance}%`;
    // atEnhText = `伤害增强: ${piece.attackEnhance}%`;
  }

  let color = piece.c_speed === 0 ? "red" : "white";
  let fontSize = 17;
  Canvas.drawText(cxt, speedText, leftX, textY, color, fontSize);
  textY += 30;
  color = "white";
  Canvas.drawText(cxt, armorText, leftX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, dodgeText, leftX, textY, color, fontSize);
  textY += 30;
  Canvas.drawText(cxt, attackText, leftX, textY, color, fontSize);
  if (piece.missileAttack > 0) {
    textY += 50;
    Canvas.drawText(cxt, rangeInfo, leftX, textY, color, fontSize);
    if (piece.isBombing) {
      Canvas.drawText(cxt, radiusInfo, leftX + 200, textY, color, fontSize);
    }
  }
  textY += 40;
  Canvas.drawText(cxt, antiArmorText, leftX, textY, color, fontSize);
  if (piece.healing > 0)
    Canvas.drawText(cxt, healText, leftX + 250, textY, color, fontSize);
  else if (piece.inspiring > 0)
    Canvas.drawText(cxt, inspText, leftX + 250, textY, color, fontSize);
  // else if (piece.armorEnhance > 0)
  //   Canvas.drawText(cxt, arEnhText, leftX + 300, textY, color, fontSize);
  // else if (piece.attackEnhance > 0)
  //   Canvas.drawText(cxt, atEnhText, leftX + 300, textY, color, fontSize);
}

function drawStatus(cxt, piece, useMandarin) {
  let textY = 560;
  Canvas.drawLine(cxt, leftX, textY - 45, leftX + 485, textY - 45, "white", 7);

  if (piece.c_leadership <= 0) {
    let shockText = useMandarin ? "*士气低迷" : "*Low Morale";
    let color = "red";
    let fontSize = 17;
    Canvas.drawText(cxt, shockText, leftX, textY, color, fontSize);
  }
}
