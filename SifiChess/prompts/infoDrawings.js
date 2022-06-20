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
  drawSwitchInfo(cxt, piece, useMandarin, showCost);
}

function drawTitle(cxt, piece, useMandarin, showCost) {
  Canvas.drawImg(cxt, piece.img, 5, 10, 90, 90, 10, 10, 85, 85);

  let name = useMandarin ? piece.m_name : piece.name;
  let desc = useMandarin ? piece.m_description : piece.description;
  let extra = "";
  let index = desc.indexOf("|");
  if (index != -1) {
    extra = desc.substring(index + 1);
    desc = desc.substring(0, index);
  }
  Canvas.drawText(cxt, name, 105, 30, "white", 24);
  Canvas.drawText(cxt, desc, 105, 60, "white", 16);
  Canvas.drawText(cxt, extra, 105, 90, DRC, 16);

  let yBs = showCost ? 125 : 95;
  if (showCost) {
    let costText = useMandarin
      ? `[花费: ${piece.cost}金币]`
      : `[cost: ${piece.cost}G]`;
    Canvas.drawText(cxt, costText, leftX, yBs, "yellow", 16);
  }
}

function drawHPAndAmmoBars(cxt, piece, useMandarin, showCost) {
  let hpY = showCost ? 160 : 130;
  let ldY = hpY + 30;
  let amY = ldY + 30;

  // draw the bar titles
  let scaleOrHp = piece.scale === 1 ? "HP & Shield:" : "Scale & Shield:";
  if (piece.shield === 0) scaleOrHp = scaleOrHp.replace(" & Shield", "");
  if (useMandarin) {
    scaleOrHp = piece.scale === 1 ? "生命值 & 护盾:" : "部队数量 & 护盾:";
    if (piece.shield === 0) scaleOrHp = scaleOrHp.replace(" & 护盾", "");
  }
  let leaderTitle = useMandarin ? "士气:" : "Morale:";
  let ammoTitle = useMandarin ? "单位弹药剩余:" : "Ammo per-unit:";
  let color = "white";
  Canvas.drawText(cxt, scaleOrHp, leftX, hpY, color, 18);
  color = piece.c_leadership <= piece.leadership * 0.1 ? "red" : "white";
  Canvas.drawText(cxt, leaderTitle, leftX, ldY, color, 18);
  color = "white";
  if (piece.ammo !== -1 && piece.c_ammo <= piece.ammo * 0.1) color = "red";
  Canvas.drawText(cxt, ammoTitle, leftX, amY, color, 18);

  // set the on-bar info
  let sdText = `${piece.c_shield} / ${piece.shield}`;
  if (piece.shield === 0) sdText = "";
  let hpText = `${piece.c_scale} / ${piece.scale}`;
  if (piece.scale === 1) hpText = `${piece.c_singleHP} / ${piece.singleHP}`;
  let leadText = `${piece.c_leadership} / ${piece.leadership}`;
  let ammoGText = `G: ${piece.c_ammo_G} / ${piece.ammo_G}`;
  let ammoAText = `A: ${piece.c_ammo_A} / ${piece.ammo_A}`;
  let ammoGAText = `G & A: ${piece.c_ammo_G} / ${piece.ammo_G}`;

  // Calculate the length of the bars
  let sdLen, hpLen, ldLen, amGLen, amALen, amGALen;
  sdLen = (144 * piece.c_shield) / piece.shield;
  hpLen = (144 * piece.getTotalHP()) / piece.getOriginalHP();
  ldLen = (294 * piece.c_leadership) / piece.leadership;
  if (piece.shield === 0)
    hpLen = (294 * piece.getTotalHP()) / piece.getOriginalHP();
  if (piece.ammo_G === -1) {
    amGLen = 0;
    ammoGText = "N/A";
  } else {
    amGLen = (144 * piece.c_ammo_G) / piece.ammo_G;
  }
  if (piece.ammo_A === -1) {
    amALen = 0;
    ammoAText = "N/A";
  } else {
    amALen = (144 * piece.c_ammo_A) / piece.ammo_A;
  }
  if (piece.ammo_G === -1 && piece.ammo_A === -1) {
    amGALen = 0;
    ammoGAText = "N/A";
  } else {
    amGALen = (294 * piece.c_ammo_G) / piece.ammo_G;
  }

  // draw bar background
  let bX = 160;
  hpY -= 6;
  ldY -= 6;
  amY -= 6;
  Canvas.drawLine(cxt, bX, hpY, bX + 300, hpY, BGC, 18);
  Canvas.drawLine(cxt, bX, ldY, bX + 300, ldY, BGC, 18);
  Canvas.drawLine(cxt, bX, amY, bX + 300, amY, BGC, 18);

  // draw the bars
  let hpcolor = HC;
  if (hpLen <= 144 / 4) hpcolor = "rgb(255, 180, 0)";
  if (hpLen <= 144 / 8) hpcolor = "rgb(241, 76, 76)";
  Canvas.drawLine(cxt, bX + 3, hpY, bX + hpLen + 3, hpY, hpcolor, 12);
  Canvas.drawLine(cxt, bX + 153, hpY, bX + sdLen + 153, hpY, EC, 12);
  if (piece.shield !== 0)
    Canvas.drawLine(cxt, bX + 149, hpY, bX + 151, hpY, "black", 18);
  Canvas.drawLine(cxt, bX + 3, ldY, bX + ldLen + 3, ldY, DC, 12);

  if (!piece.GAtogether) {
    Canvas.drawLine(cxt, bX + 3, amY, bX + amGLen + 3, amY, AC, 12);
    Canvas.drawLine(cxt, bX + 153, amY, bX + amALen + 153, amY, AC, 12);
    Canvas.drawLine(cxt, bX + 149, amY, bX + 151, amY, "black", 18);
  } else {
    Canvas.drawLine(cxt, bX + 3, amY, bX + amGALen + 3, amY, AC, 12);
  }

  // write the on-bar info
  let midX = leftX + 315;
  let hpTxtX = midX - hpText.length * 5;
  if (piece.shield !== 0) hpTxtX -= 75;
  let sdTxtX = midX - sdText.length * 5 + 75;
  let leadTxtX = midX - leadText.length * 5;
  let ammoGTxtX = ammoGText == "N/A" ? 225 : midX - ammoGText.length * 5 - 75;
  let ammoATxtX = ammoAText == "N/A" ? 370 : midX - ammoAText.length * 5 + 75;
  let ammoGATxtX = midX - ammoGAText.length * 5;
  Canvas.drawText(cxt, hpText, hpTxtX, hpY + 5, "black", 15);
  Canvas.drawText(cxt, sdText, sdTxtX, hpY + 5, "black", 15);
  Canvas.drawText(cxt, leadText, leadTxtX, ldY + 5, "black", 15);
  if (!piece.GAtogether) {
    Canvas.drawText(cxt, ammoGText, ammoGTxtX, amY + 5, "black", 15);
    Canvas.drawText(cxt, ammoAText, ammoATxtX, amY + 5, "black", 15);
  } else {
    Canvas.drawText(cxt, ammoGAText, ammoGATxtX, amY + 5, "black", 15);
  }
}

function drawCombatData(cxt, piece, useMandarin, showCost) {
  let textY = showCost ? 280 : 250;
  Canvas.drawLine(cxt, leftX, textY - 30, leftX + 485, textY - 30, "white", 7);
  textY = showCost ? 285 : 255;

  let speedText = `Speed: ${piece.c_speed}`;
  if (piece.slowdown_countdown > 0) speedText += " (Slowed Down)";
  let armorText = `Armor: ${piece.c_armor}%`;
  let dodgeText = `Dodge: ${piece.c_dodge}%`;

  let dataTitle = ["Melee", "Missile-Ground", "Missile-Air"];
  if (piece.GAtogether || (piece.c_missile_G == 0 && piece.c_missile_A == 0)) {
    if (piece.c_missile_G * piece.c_missile_A > 0)
      dataTitle = ["Melee", "Missile-Ground & Air", ""];
    else dataTitle = ["Melee", "Missile", ""];
  }

  let attackText = `Damage:`;
  let attackDt = [
    `${piece.c_melee} (+${piece.melee_bonus})`,
    `${piece.c_missile_G} (+${piece.missile_G_bonus})`,
    `${piece.c_missile_A} (+${piece.missile_A_bonus})`,
  ];
  if (piece.c_missile_G === 0) attackDt[1] = "N/A";
  if (piece.c_missile_A === 0) attackDt[2] = "N/A";
  if (piece.GAtogether || (piece.c_missile_G == 0 && piece.c_missile_A == 0))
    attackDt[2] = "";

  let rangeText = `Range:`;
  let rangeDt = ["N/A", `${piece.range_G}`, `${piece.range_A}`];
  if (piece.range_G === 0) rangeDt[1] = "N/A";
  if (piece.range_A === 0) rangeDt[2] = "N/A";
  if (piece.GAtogether || (piece.c_missile_G == 0 && piece.c_missile_A == 0))
    rangeDt[2] = "";

  let dataX = [105, 225, 382];
  if (piece.GAtogether || (piece.c_missile_G == 0 && piece.c_missile_A == 0))
    dataX[1] = 260;

  let healText = `Healing: ${piece.c_totalHeal} / ${piece.totalHeal}`;
  let chargeText = `Charging: ${piece.c_totalCharge} / ${piece.totalCharge}`;
  let inspText = `Inspiring: ${piece.inspiring}`;
  let arEnhText = `Armor Enhance: ${piece.armorEnhance}%`;
  let atEnhText = `Attack Enhance: ${piece.attackEnhance}%`;

  if (useMandarin) {
    speedText = `速度: ${piece.c_speed}`;
    if (piece.slowdown_countdown > 0) speedText += " (减速)";
    armorText = `护甲: ${piece.c_armor}%`;
    dodgeText = `闪避: ${piece.c_dodge}%`;
    dataTitle = ["近战", "远程-对地", "远程-对空"];
    if (
      piece.GAtogether ||
      (piece.c_missile_G == 0 && piece.c_missile_A == 0)
    ) {
      if (piece.c_missile_G * piece.c_missile_A > 0)
        dataTitle = ["近战", "远程-对地 & 对空", ""];
      else dataTitle = ["近战", "远程", ""];
    }
    attackText = `伤害:`;
    rangeText = `射程:`;
    healText = `治疗量: ${piece.c_totalHeal} / ${piece.totalHeal}`;
    chargeText = `充能量: ${piece.c_totalCharge} / ${piece.totalCharge}`;
    inspText = `鼓舞: ${piece.inspiring}`;
    arEnhText = `抗性增强: ${piece.armorEnhance}%`;
    atEnhText = `伤害增强: ${piece.attackEnhance}%`;
  }
  let color = "white";
  if (piece.slowdown_countdown > 0) color = RDC;
  if (piece.c_speed === 0) color = "red";
  let fontSize = 17;
  Canvas.drawText(cxt, speedText, leftX, textY, color, fontSize);
  Canvas.drawText(cxt, armorText, leftX + 250, textY, ADC, fontSize);
  Canvas.drawText(cxt, dodgeText, leftX + 380, textY, GDC, fontSize);

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

  let pos = [
    [leftX, textY + 30],
    [leftX + 250, textY + 30],
  ];
  let cur = 0;
  if (piece.healing > 0) {
    Canvas.drawText(cxt, healText, pos[cur][0], pos[cur][1], HC, fontSize);
    cur++;
  }
  if (piece.charging > 0) {
    Canvas.drawText(cxt, chargeText, pos[cur][0], pos[cur][1], EC, fontSize);
    cur++;
  }
  if (piece.inspiring > 0) {
    Canvas.drawText(cxt, inspText, pos[cur][0], pos[cur][1], DC, fontSize);
    cur++;
  }
  if (piece.armorEnhance > 0) {
    Canvas.drawText(cxt, arEnhText, pos[cur][0], pos[cur][1], ArEC, fontSize);
    cur++;
  }
  if (piece.attackEnhance > 0) {
    Canvas.drawText(cxt, atEnhText, pos[cur][0], pos[cur][1], AtEC, fontSize);
    cur++;
  }
}

function drawSwitchInfo(cxt, piece, useMandarin, showCost) {
  let textY = showCost ? 460 : 430;
  Canvas.drawLine(cxt, leftX, textY - 45, leftX + 485, textY - 45, "white", 7);

  textY -= 20;
  if (piece.switchable) {
    let name = null;
    if (piece.status === 0) {
      Canvas.drawImg(cxt, piece.img2, 5, 10, 90, 90, 10, textY - 15, 60, 60);
      name = useMandarin ? piece.m_name2 : piece.name2;
    } else {
      Canvas.drawImg(cxt, piece.img1, 5, 10, 90, 90, 10, textY - 15, 60, 60);
      name = useMandarin ? piece.m_name1 : piece.name1;
    }
    let title = useMandarin ? "可切换至 " : "Can switch to ";
    if (piece.status === 1)
      title = useMandarin ? "可切换回 " : "Can switch back to ";
    title += `[ ${name} ]`;
    Canvas.drawText(cxt, title, 80, textY, "white", 18);
  }
  if (piece.attached || piece.brooder || piece.canRelease) {
    Canvas.drawImg(cxt, piece.img2, 0, 0, 100, 100, 10, textY - 15, 60, 60);
    let names = piece.getAttachedName();
    let name = useMandarin ? names[1] : names[0];
    let title = useMandarin ? "可孵化 " : "Can brood ";
    if (piece.canRelease) title = useMandarin ? "可释放 " : "Can release ";
    title += `[ ${name} ]`;
    Canvas.drawText(cxt, title, 80, textY, "white", 18);
  }
}
