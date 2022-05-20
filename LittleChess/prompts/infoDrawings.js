import { Canvas } from "../common/tools.js";
import {
  DescrColor as DRC,
  HpColor as HC,
  AmmoColor as AC,
  LeadColor as DC,
  ExpColor as EC,
  ArmorDataColor as ADC,
  DodgeDataColor as GDC,
  DamageDataColor as DDC,
  RadiusDataColor as RDC,
  ArmorEnhanceColor as ArEC,
  AttackEnhanceColor as AtEC,
} from "../common/const.js";

const leftX = 10;
const BGC = "grey";

export function drawInfoForSelectedPiece(cxt, piece, useMandarin, showCost) {
  // Draw image and arm's name
  drawTitle(cxt, piece, useMandarin, showCost);

  // Draw HP bar and ammo bar
  drawHPAndAmmoBars(cxt, piece, useMandarin, showCost);

  // Draw the combat data
  drawCombatData(cxt, piece, useMandarin, showCost);

  // Draw status
  drawStatus(cxt, piece, useMandarin);
}

function drawTitle(cxt, piece, useMandarin, showCost) {
  if (piece.img !== null)
    Canvas.drawImg(cxt, piece.img, 2, 6, 46, 44, 10, 10, 85, 85);

  let name = useMandarin ? piece.m_name : piece.name;
  let desc = useMandarin ? piece.m_description : piece.description;
  let idx = desc.indexOf("[");
  let desc1 = "";
  let desc2 = "";
  if (idx != -1) {
    desc1 = desc.substring(0, idx);
    desc2 = desc.substring(idx + 1, desc.length - 1);
  } else {
    desc1 = desc;
  }

  if (idx === desc.length) desc2 = "";
  Canvas.drawText(cxt, name, 105, 30, "white", 24);
  Canvas.drawText(cxt, desc1, 105, 60, "white", 16);
  Canvas.drawText(cxt, desc2, 105, 82, DRC, 16);

  let yBs = showCost ? 125 : 95;
  if (showCost) {
    let costText = useMandarin
      ? `[花费: ${piece.cost}金币]`
      : `[cost: ${piece.cost}G]`;
    Canvas.drawText(cxt, costText, leftX, yBs, "yellow", 16);
  }

  let lX = 425;
  let yExb = yBs + 16;
  let expL = (75 * Math.min(piece.exp, piece.cost)) / piece.cost;
  Canvas.drawLine(cxt, 450, yExb, 450, yExb + 80, BGC, 70);
  Canvas.drawLine(cxt, 450, yExb + 77, 450, yExb + 77 - expL, EC, 64);

  let levelInfo = useMandarin
    ? `等级: ${piece.level}`
    : `Level: ${piece.level}`;
  let expTxt = useMandarin ? `经验` : `exp`;
  let expInfo = `${piece.exp}`;
  let xEx = lX + 22;
  if (piece.exp >= 10) xEx -= 4;
  if (piece.exp >= 100) xEx -= 4;
  Canvas.drawText(cxt, levelInfo, lX, yBs + 10, "white", 16);
  Canvas.drawText(cxt, expTxt, lX + 10, yExb + 30, "black", 16);
  Canvas.drawText(cxt, expInfo, xEx, yExb + 50, "black", 14);
}

function drawHPAndAmmoBars(cxt, piece, useMandarin, showCost) {
  let hpY = showCost ? 160 : 130;
  let ldY = hpY + 30;
  let amY = ldY + 30;

  let hpText = `${piece.c_scale} / ${piece.scale}`;
  if (piece.scale === 1) hpText = `${piece.c_singleHP} / ${piece.singleHP}`;
  let leadText = `${piece.c_leadership} / ${piece.leadership}`;
  let ammoText = `${piece.c_ammo} / ${piece.ammo}`;
  let hpLen, ldLen, amLen;

  hpLen = (194 * piece.getTotalHP()) / piece.getOriginalHP();
  if (piece.ammo === -1) {
    amLen = 0;
    ammoText = "N/A";
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
  if (hpLen <= 194 / 8) color = "red";
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

  let hpcolor = HC;
  if (hpLen <= 194 / 4) hpcolor = "rgb(255, 180, 0)";
  if (hpLen <= 194 / 8) hpcolor = "rgb(241, 76, 76)";
  Canvas.drawLine(cxt, bX + 3, hpY, bX + hpLen + 3, hpY, hpcolor, 12);
  Canvas.drawLine(cxt, bX + 3, ldY, bX + ldLen + 3, ldY, DC, 12);
  Canvas.drawLine(cxt, bX + 3, amY, bX + amLen + 3, amY, AC, 12);

  let midX = leftX + 269;
  let hpTxtX = midX - hpText.length * 5;
  let leadTxtX = midX - leadText.length * 5;
  let ammoTxtX = ammoText == "N/A" ? 252 : midX - ammoText.length * 5;
  Canvas.drawText(cxt, hpText, hpTxtX, hpY + 5, "black", 15);
  Canvas.drawText(cxt, leadText, leadTxtX, ldY + 5, "black", 15);
  Canvas.drawText(cxt, ammoText, ammoTxtX, amY + 5, "black", 15);
}

function drawCombatData(cxt, piece, useMandarin, showCost) {
  let textY = showCost ? 280 : 250;
  Canvas.drawLine(cxt, leftX, textY - 30, leftX + 485, textY - 30, "white", 7);
  textY = showCost ? 285 : 255;

  let speedText = `Speed:        ${piece.c_speed}`;
  let dataTitle = ["Melee (bonus)", "Missile (bonus)", "Charge (bonus)"];
  let armorText = `Armor:`;
  let dodgeText = `Dodge:`;
  let attackText = `Damage:`;
  let armorDt = [piece.c_meleeArmor, piece.c_missileArmor, piece.c_chargeArmor];
  let dodgeDt = [piece.c_meleeDodge, piece.c_missileDodge, piece.c_chargeDodge];
  let attackDt = [
    `${piece.c_meleeAttack} (+${piece.meleeAttack_bonus})`,
    `${piece.c_missileAttack} (+${piece.missileAttack_bonus})`,
    `${piece.c_chargeAttack} (+${piece.chargeAttack_bonus})`,
  ];
  let dataX = [105, 235, 372];

  let rangeInfo = `Missile-range: ${piece.c_missileRange}`;
  let radiusInfo = `Explose-radius: ${piece.c_missileRadius}`;
  let antiArmorText = `Anti-armor: ${piece.antiArmor}`;
  if (piece.isBombing || piece.type === "artillery")
    antiArmorText = `Anti-armor: *Ignore armor`;
  let healText = `Healing: ${piece.c_totalHeal} / ${piece.totalHeal}`;
  let inspText = `Inspiring: ${piece.inspiring}`;
  let arEnhText = `Armor Enhance: ${piece.armorEnhance}%`;
  let atEnhText = `Attack Enhance: ${piece.attackEnhance}%`;

  if (useMandarin) {
    speedText = `速度:            ${piece.c_speed}`;
    dataTitle = ["近战 (加成)", "远程 (加成)", "冲杀 (加成)"];
    armorText = `护甲:`;
    dodgeText = `闪避:`;
    attackText = `伤害:`;
    rangeInfo = `远程范围: ${piece.c_missileRange}`;
    radiusInfo = `爆炸半径: ${piece.c_missileRadius}`;
    antiArmorText = `破甲: ${piece.antiArmor}`;
    if (piece.isBombing || piece.type === "artillery")
      antiArmorText = `破甲: *无视护甲`;
    healText = `治疗量: ${piece.c_totalHeal} / ${piece.totalHeal}`;
    inspText = `鼓舞: ${piece.inspiring}`;
    arEnhText = `抗性增强: ${piece.armorEnhance}%`;
    atEnhText = `伤害增强: ${piece.attackEnhance}%`;
  }

  let color = piece.c_speed === 0 ? "red" : "white";
  let fontSize = 17;
  Canvas.drawText(cxt, speedText, leftX, textY, color, fontSize);
  color = "white";
  textY += 30;
  Canvas.drawText(cxt, dataTitle[0], dataX[0], textY, color, fontSize);
  Canvas.drawText(cxt, dataTitle[1], dataX[1], textY, color, fontSize);
  Canvas.drawText(cxt, dataTitle[2], dataX[2], textY, color, fontSize);
  textY += 22;
  Canvas.drawText(cxt, armorText, leftX, textY, ADC, fontSize);
  Canvas.drawText(cxt, armorDt[0], dataX[0], textY, ADC, fontSize);
  Canvas.drawText(cxt, armorDt[1], dataX[1], textY, ADC, fontSize);
  Canvas.drawText(cxt, armorDt[2], dataX[2], textY, ADC, fontSize);
  textY += 22;
  Canvas.drawText(cxt, dodgeText, leftX, textY, GDC, fontSize);
  Canvas.drawText(cxt, dodgeDt[0], dataX[0], textY, GDC, fontSize);
  Canvas.drawText(cxt, dodgeDt[1], dataX[1], textY, GDC, fontSize);
  Canvas.drawText(cxt, dodgeDt[2], dataX[2], textY, GDC, fontSize);
  textY += 22;
  Canvas.drawText(cxt, attackText, leftX, textY, DDC, fontSize);
  Canvas.drawText(cxt, attackDt[0], dataX[0], textY, DDC, fontSize);
  Canvas.drawText(cxt, attackDt[1], dataX[1], textY, DDC, fontSize);
  Canvas.drawText(cxt, attackDt[2], dataX[2], textY, DDC, fontSize);
  if (piece.missileAttack > 0) {
    textY += 30;
    Canvas.drawText(cxt, rangeInfo, leftX, textY, color, fontSize);
    if (piece.isBombing) {
      Canvas.drawText(cxt, radiusInfo, leftX + 200, textY, RDC, fontSize);
    }
  }
  textY += 30;
  Canvas.drawText(cxt, antiArmorText, leftX, textY, color, fontSize);
  textY -= 20;
  if (piece.healing > 0) {
    textY += 20;
    Canvas.drawText(cxt, healText, leftX + 310, textY, HC, fontSize);
  }
  if (piece.inspiring > 0) {
    textY += 20;
    Canvas.drawText(cxt, inspText, leftX + 310, textY, DC, fontSize);
  }
  if (piece.armorEnhance > 0) {
    textY += 20;
    Canvas.drawText(cxt, arEnhText, leftX + 310, textY, ArEC, fontSize);
  }
  if (piece.attackEnhance > 0) {
    textY += 20;
    Canvas.drawText(cxt, atEnhText, leftX + 310, textY, AtEC, fontSize);
  }
}

function drawStatus(cxt, piece, useMandarin) {
  let textY = 510;
  Canvas.drawLine(cxt, leftX, textY - 45, leftX + 485, textY - 45, "white", 7);

  if (piece.c_leadership <= 0) {
    let shockText = useMandarin ? "*士气低迷" : "*Low Morale";
    let color = "red";
    let fontSize = 17;
    Canvas.drawText(cxt, shockText, leftX, textY, color, fontSize);
  }
}
