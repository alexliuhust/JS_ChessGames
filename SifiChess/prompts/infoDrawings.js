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
  Canvas.drawText(cxt, name, 105, 30, "white", 24);
  Canvas.drawText(cxt, desc, 105, 60, DRC, 16);

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

  let sdText = `${piece.c_shield} / ${piece.shield}`;
  if (piece.shield === 0) sdText = "N/A";
  let hpText = `${piece.c_scale} / ${piece.scale}`;
  if (piece.scale === 1) hpText = `${piece.c_singleHP} / ${piece.singleHP}`;
  let leadText = `${piece.c_leadership} / ${piece.leadership}`;
  let ammoGText = `G: ${piece.c_ammo_G} / ${piece.ammo_G}`;
  let ammoAText = `A: ${piece.c_ammo_A} / ${piece.ammo_A}`;

  let sdLen, hpLen, ldLen, amGLen, amALen;
  sdLen = (114 * piece.c_shield) / piece.shield;
  hpLen = (114 * piece.getTotalHP()) / piece.getOriginalHP();
  if (piece.ammo_G === -1) {
    amGLen = 0;
    ammoGText = "N/A";
  } else {
    amGLen = (114 * piece.c_ammo_G) / piece.ammo_G;
  }
  if (piece.ammo_A === -1) {
    amALen = 0;
    ammoAText = "N/A";
  } else {
    amALen = (114 * piece.c_ammo_A) / piece.ammo_A;
  }
  ldLen = (234 * piece.c_leadership) / piece.leadership;

  let scaleOrHp = piece.scale === 1 ? "HP & Shield:" : "Scale & Shield:";
  if (useMandarin)
    scaleOrHp = piece.scale === 1 ? "生命值 & 护盾:" : "部队数量 & 护盾:";
  let leaderTitle = useMandarin ? "士气:" : "Morale:";
  let ammoTitle = useMandarin ? "单位弹药剩余:" : "Ammo per-unit:";

  let color = "white";
  if (hpLen <= 114 / 8) color = "red";
  Canvas.drawText(cxt, scaleOrHp, leftX, hpY, color, 18);
  color = piece.c_leadership <= piece.leadership * 0.1 ? "red" : "white";
  Canvas.drawText(cxt, leaderTitle, leftX, ldY, color, 18);
  color = "white";
  if (piece.ammo !== -1 && piece.c_ammo <= piece.ammo * 0.1) color = "red";
  Canvas.drawText(cxt, ammoTitle, leftX, amY, color, 18);

  let bX = 160;
  hpY -= 6;
  ldY -= 6;
  amY -= 6;

  Canvas.drawLine(cxt, bX, hpY, bX + 240, hpY, BGC, 18);
  Canvas.drawLine(cxt, bX, ldY, bX + 240, ldY, BGC, 18);
  Canvas.drawLine(cxt, bX, amY, bX + 240, amY, BGC, 18);

  let hpcolor = HC;
  if (hpLen <= 194 / 4) hpcolor = "rgb(255, 180, 0)";
  if (hpLen <= 194 / 8) hpcolor = "rgb(241, 76, 76)";
  Canvas.drawLine(cxt, bX + 3, hpY, bX + hpLen + 3, hpY, hpcolor, 12);
  Canvas.drawLine(cxt, bX + 123, hpY, bX + sdLen + 123, hpY, EC, 12);
  Canvas.drawLine(cxt, bX + 119, hpY, bX + 121, hpY, "black", 18);
  Canvas.drawLine(cxt, bX + 3, ldY, bX + ldLen + 3, ldY, DC, 12);
  Canvas.drawLine(cxt, bX + 3, amY, bX + amGLen + 3, amY, AC, 12);
  Canvas.drawLine(cxt, bX + 123, amY, bX + amALen + 123, amY, AC, 12);
  Canvas.drawLine(cxt, bX + 119, amY, bX + 121, amY, "black", 18);

  let midX = leftX + 285;
  let hpTxtX = midX - hpText.length * 5 - 60;
  let sdTxtX = sdText == "N/A" ? 325 : midX - sdText.length * 5 + 60;
  let leadTxtX = midX - leadText.length * 5;
  let ammoGTxtX = ammoGText == "N/A" ? 210 : midX - ammoGText.length * 5 - 60;
  let ammoATxtX = ammoAText == "N/A" ? 325 : midX - ammoAText.length * 5 + 60;
  Canvas.drawText(cxt, hpText, hpTxtX, hpY + 5, "black", 15);
  Canvas.drawText(cxt, sdText, sdTxtX, hpY + 5, "black", 15);
  Canvas.drawText(cxt, leadText, leadTxtX, ldY + 5, "black", 15);
  Canvas.drawText(cxt, ammoGText, ammoGTxtX, amY + 5, "black", 15);
  Canvas.drawText(cxt, ammoAText, ammoATxtX, amY + 5, "black", 15);
}

function drawCombatData(cxt, piece, useMandarin, showCost) {
  let textY = showCost ? 280 : 250;
  Canvas.drawLine(cxt, leftX, textY - 30, leftX + 485, textY - 30, "white", 7);
  textY = showCost ? 285 : 255;

  let speedText = `Speed: ${piece.c_speed}`;
  let armorText = `Armor: ${piece.c_armor}%`;
  let dodgeText = `Dodge: ${piece.c_dodge}%`;

  let dataTitle = ["Melee", "Missile-Ground", "Missile-Air"];
  let attackText = `Damage:`;
  let attackDt = [
    `${piece.c_melee} (+${piece.melee_bonus})`,
    `${piece.c_missile_G} (+${piece.missile_G_bonus})`,
    `${piece.c_missile_A} (+${piece.missile_A_bonus})`,
  ];
  if (piece.c_missile_G === 0) attackDt[1] = "N/A";
  if (piece.c_missile_A === 0) attackDt[2] = "N/A";
  let rangeText = `Range:`;
  let rangeDt = ["N/A", `${piece.range_G}`, `${piece.range_A}`];
  if (piece.range_G === 0) rangeDt[1] = "N/A";
  if (piece.range_A === 0) rangeDt[2] = "N/A";
  let dataX = [105, 225, 382];

  let healText = `Healing: ${piece.c_totalHeal} / ${piece.totalHeal}`;
  let inspText = `Inspiring: ${piece.inspiring}`;
  let arEnhText = `Armor Enhance: ${piece.armorEnhance}%`;
  let atEnhText = `Attack Enhance: ${piece.attackEnhance}%`;

  if (useMandarin) {
    speedText = `速度: ${piece.c_speed}`;
    armorText = `护甲: ${piece.c_armor}%`;
    dodgeText = `闪避: ${piece.c_dodge}%`;
    dataTitle = ["近战", "远程-对地", "远程-对空"];
    attackText = `伤害:`;
    rangeText = `射程:`;
    healText = `治疗量: ${piece.c_totalHeal} / ${piece.totalHeal}`;
    inspText = `鼓舞: ${piece.inspiring}`;
    arEnhText = `抗性增强: ${piece.armorEnhance}%`;
    atEnhText = `伤害增强: ${piece.attackEnhance}%`;
  }

  let color = piece.c_speed === 0 ? "red" : "white";
  let fontSize = 17;
  Canvas.drawText(cxt, speedText, leftX, textY, color, fontSize);
  Canvas.drawText(cxt, armorText, leftX + 150, textY, ADC, fontSize);
  Canvas.drawText(cxt, dodgeText, leftX + 330, textY, GDC, fontSize);

  textY += 40;
  color = "white";
  Canvas.drawText(cxt, dataTitle[0], dataX[0], textY, color, fontSize);
  Canvas.drawText(cxt, dataTitle[1], dataX[1], textY, color, fontSize);
  Canvas.drawText(cxt, dataTitle[2], dataX[2], textY, color, fontSize);
  textY += 22;
  Canvas.drawText(cxt, attackText, leftX, textY, DDC, fontSize);
  Canvas.drawText(cxt, attackDt[0], dataX[0], textY, DDC, fontSize);
  Canvas.drawText(cxt, attackDt[1], dataX[1], textY, DDC, fontSize);
  Canvas.drawText(cxt, attackDt[2], dataX[2], textY, DDC, fontSize);
  textY += 22;
  Canvas.drawText(cxt, rangeText, leftX, textY, RDC, fontSize);
  Canvas.drawText(cxt, rangeDt[0], dataX[0], textY, RDC, fontSize);
  Canvas.drawText(cxt, rangeDt[1], dataX[1], textY, RDC, fontSize);
  Canvas.drawText(cxt, rangeDt[2], dataX[2], textY, RDC, fontSize);

  textY += 20;
  if (piece.healing > 0) {
    textY += 20;
    Canvas.drawText(cxt, healText, leftX, textY, HC, fontSize);
  }
  if (piece.inspiring > 0) {
    textY += 20;
    Canvas.drawText(cxt, inspText, leftX, textY, DC, fontSize);
  }
  if (piece.armorEnhance > 0) {
    textY += 20;
    Canvas.drawText(cxt, arEnhText, leftX, textY, ArEC, fontSize);
  }
  if (piece.attackEnhance > 0) {
    textY += 20;
    Canvas.drawText(cxt, atEnhText, leftX, textY, AtEC, fontSize);
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
