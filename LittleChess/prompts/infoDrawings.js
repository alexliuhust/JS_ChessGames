import { Canvas, Rect } from "../common/tools.js";
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
  MagicDamageColor as MGC,
  ArmorEnhanceColor as ArEC,
  AttackEnhanceColor as AtEC,
  ColorGradient as CG,
  M_StatusName,
  StatusName,
  Trait,
  M_Trait,
  TraitDescription,
  M_TraitDescription,
} from "../common/const.js";

const leftX = 10;
const BGC = "grey";
const traitStartX = 105;
const traitStartY = 60;
const traitStep = 46;
const traitSize = 42;

export class InfoPanel {
  constructor(_cxt, _useMandarin, _showCost, _showkillAndOutput) {
    this.cxt = _cxt;
    this.useMandarin = _useMandarin;
    this.showCost = _showCost;
    this.showkillAndOutput = _showkillAndOutput;
    this.currentPiece = null;
    this.currentTrait = null;
    this.traits = null;
    this.traitRects = [];
  }

  drawInfoForSelectedPiece(_piece) {
    // Only update the piece info if the piece is diff
    if (_piece != this.currentPiece) {
      this.updatePieceInfoAndRecalculateTraitRects(_piece);
    }

    if (this.currentPiece == null || this.currentPiece.img == null) return;

    // Draw image and arm's name
    this.drawTitle();

    // Draw HP bar and ammo bar
    this.drawHPAndAmmoBars();

    // Draw the combat data
    this.drawCombatData();

    if (!this.showCost) {
      // Draw status
      this.drawStatus();

      // Draw formation
      this.drawFormation();
    }

    // Show hover text for hovered trait rect
    if (this.currentTrait != null) {
      this.drawHovertext();
    }
  }

  updatePieceInfoAndRecalculateTraitRects(_piece) {
    this.currentPiece = _piece;
    this.traits = this.currentPiece.traits;
    this.traitRects = [];
    for (let i = 0; i < this.traits.length; i++) {
      let x = traitStartX + i * traitStep;
      let y = traitStartY;
      let size = traitSize;
      let rect = {
        x: x,
        y: y,
        width: traitStep,
        height: traitStep,
      };
      this.traitRects.push(rect);
    }
  }

  updateTraitInfo(hoverX, hoverY) {
    let hitIdx = -1;
    for (let i = 0; i < this.traitRects.length; i++) {
      if (Rect.pointInRect({ x: hoverX, y: hoverY }, this.traitRects[i])) {
        hitIdx = i;
        break;
      }
    }

    if (hitIdx == -1) {
      this.currentTrait = null;
      return;
    }

    if (this.currentTrait == this.traits[hitIdx]) {
      return;
    }

    this.currentTrait = this.traits[hitIdx];
  }

  drawTitle() {
    Canvas.drawImg(this.cxt, this.currentPiece.img, 2, 6, 46, 44, 10, 10, 85, 85);

    let name = this.useMandarin ? this.currentPiece.m_name : this.currentPiece.name;
    let desc = this.useMandarin ? this.currentPiece.m_description : this.currentPiece.description;
    let idx = desc.indexOf("[");
    let desc1 = "";
    if (idx != -1) {
      desc1 = desc.substring(0, idx);
    } else {
      desc1 = desc;
    }
    Canvas.drawText(this.cxt, name, 105, 30, "white", 24);
    Canvas.drawText(this.cxt, desc1, 105, 52, "white", 16);

    for (let i = 0; i < this.traits.length; i++) {
      let trait = this.traits[i];
      let x = this.traitRects[i].x;
      let y = this.traitRects[i].y;
      let size = traitSize;
      let img = document.getElementById(trait);
      Canvas.drawRect(this.cxt, x, y, size, size, DRC, 4);
      Canvas.drawImg(this.cxt, img, 0, 0, img.width, img.height, x, y, size, size);
    }

    let yBs = this.showCost ? 125 : 95;
    if (this.showCost) {
      let costText = this.useMandarin ? `[花费: ${this.currentPiece.cost}金币]` : `[cost: ${this.currentPiece.cost}G]`;
      Canvas.drawText(this.cxt, costText, leftX, yBs, "yellow", 16);
    }

    let lX = 425;
    let levelInfo = this.useMandarin ? `等级: ${this.currentPiece.level}` : `Level: ${this.currentPiece.level}`;
    Canvas.drawText(this.cxt, levelInfo, lX, yBs + 34, "white", 16);
    if (!this.showCost) {
      let yExb = yBs + 40;
      let expL = (54 * Math.min(this.currentPiece.exp, this.currentPiece.cost)) / this.currentPiece.cost;
      Canvas.drawLine(this.cxt, 450, yExb, 450, yExb + 60, BGC, 70);
      Canvas.drawLine(this.cxt, 450, yExb + 57, 450, yExb + 57 - expL, EC, 64);
      let expTxt = this.useMandarin ? `经验` : `exp`;
      let expInfo = `${this.currentPiece.exp}`;
      let xEx = lX + 22;
      if (this.currentPiece.exp >= 10) xEx -= 4;
      if (this.currentPiece.exp >= 100) xEx -= 4;
      Canvas.drawText(this.cxt, expTxt, lX + 10, yExb + 25, "black", 16);
      Canvas.drawText(this.cxt, expInfo, xEx, yExb + 40, "black", 14);
    }
  }

  drawHPAndAmmoBars() {
    let hpY = this.showCost ? 160 : 130;
    let ldY = hpY + 30;
    let amY = ldY + 30;

    let hpText = `${this.currentPiece.c_scale} / ${this.currentPiece.scale}`;
    if (this.currentPiece.scale === 1) hpText = `${this.currentPiece.c_singleHP} / ${this.currentPiece.singleHP}`;
    let leadText = `${this.currentPiece.c_leadership} / ${this.currentPiece.leadership}`;
    let ammoText = `${this.currentPiece.c_ammo} / ${this.currentPiece.ammo}`;
    let hpLen, scLen, ldLen, amLen;

    hpLen = (194 * this.currentPiece.getTotalHP()) / this.currentPiece.getOriginalHP();
    scLen = (194 * this.currentPiece.getCurrentScale()) / this.currentPiece.getOriginalScale();
    let hpperc = Math.round((100 * this.currentPiece.getTotalHP()) / this.currentPiece.getOriginalHP());
    let hpcolor = CG[hpperc == 0 ? 1 : hpperc];
    if (this.currentPiece.ammo === -1) {
      amLen = 0;
      ammoText = "N/A";
    } else {
      amLen = (194 * this.currentPiece.c_ammo) / this.currentPiece.ammo;
    }
    ldLen = (194 * Math.max(this.currentPiece.c_leadership, 0)) / this.currentPiece.leadership;

    let scaleOrHp = this.currentPiece.scale === 1 ? "Total HP: " : "Total Scale: ";
    if (this.useMandarin) scaleOrHp = this.currentPiece.scale === 1 ? "总生命值: " : "总部队数量: ";
    let leaderTitle = this.useMandarin ? "士气： " : "Morale: ";
    let ammoTitle = this.useMandarin ? "单位弹药剩余: " : "Ammo per-unit: ";

    let color = "white";
    Canvas.drawText(this.cxt, scaleOrHp, leftX, hpY, color, 18);
    Canvas.drawText(this.cxt, leaderTitle, leftX, ldY, color, 18);
    if (ammoText != "N/A") Canvas.drawText(this.cxt, ammoTitle, leftX, amY, color, 18);

    let bX = 170;
    hpY -= 8;
    ldY -= 8;
    amY -= 8;

    Canvas.drawLine(this.cxt, bX, hpY, bX + 200, hpY, BGC, 22);
    Canvas.drawLine(this.cxt, bX, ldY, bX + 200, ldY, BGC, 22);
    if (ammoText != "N/A") Canvas.drawLine(this.cxt, bX, amY, bX + 200, amY, BGC, 22);
    Canvas.drawLine(this.cxt, bX + 3, hpY, bX + 197, hpY, "white", 14);
    Canvas.drawLine(this.cxt, bX + 3, ldY, bX + 197, ldY, "white", 14);
    if (ammoText != "N/A") Canvas.drawLine(this.cxt, bX + 3, amY, bX + 197, amY, "white", 14);

    Canvas.drawLine(this.cxt, bX + 3, hpY, bX + scLen + 3, hpY, "rgb(180,180,180)", 14);
    Canvas.drawLine(this.cxt, bX + 3, hpY, bX + hpLen + 3, hpY, hpcolor, 14);
    Canvas.drawLine(this.cxt, bX + 3, ldY, bX + ldLen + 3, ldY, DC, 14);
    if (ammoText != "N/A") Canvas.drawLine(this.cxt, bX + 3, amY, bX + amLen + 3, amY, AC, 14);

    let midX = leftX + 269;
    let hpTxtX = midX - hpText.length * 5;
    let leadTxtX = midX - leadText.length * 5;
    let ammoTxtX = ammoText == "N/A" ? 252 : midX - ammoText.length * 5;
    Canvas.drawText(this.cxt, hpText, hpTxtX, hpY + 5, "black", 15);
    Canvas.drawText(this.cxt, leadText, leadTxtX, ldY + 5, "black", 15);
    if (ammoText != "N/A") Canvas.drawText(this.cxt, ammoText, ammoTxtX, amY + 5, "black", 15);
  }

  drawCombatData() {
    let textY = this.showCost ? 280 : 250;
    Canvas.drawLine(this.cxt, leftX, textY - 30, leftX + 485, textY - 30, "white", 7);
    textY = this.showCost ? 285 : 255;

    let fatiguePercent = Math.round((this.currentPiece.currentFatigue / this.currentPiece.totalStamina) * 100);
    let speedText = `Speed: ${this.currentPiece.c_speed}/${this.currentPiece.speed}`;
    let fatigueText = `Fatigue: ${fatiguePercent}%`;
    // let fatigueText = `Fatigue: ${this.piece.currentFatigue}/${this.piece.totalStamina}`;
    let dataTitle = ["Melee (bonus)", "Missile (bonus)", "Charge (bonus)"];
    let armorText = `Armor:`;
    let dodgeText = `Dodge:`;
    let attackText = `Damage:`;
    let armorDt = [this.currentPiece.c_meleeArmor, this.currentPiece.c_missileArmor, this.currentPiece.c_chargeArmor];
    let dodgeDt = [this.currentPiece.c_meleeDodge, this.currentPiece.c_missileDodge, this.currentPiece.c_chargeDodge];
    let attackDt = [
      `${this.currentPiece.c_meleeAttack}(+${this.currentPiece.c_meleeAttack_bonus})`,
      `${this.currentPiece.c_missileAttack}(+${this.currentPiece.c_missileAttack_bonus})`,
      `${this.currentPiece.c_chargeAttack}(+${this.currentPiece.c_chargeAttack_bonus})`,
    ];
    if (this.currentPiece.multiShots && this.currentPiece.multiShots > 1) {
      let ma = Math.round(this.currentPiece.c_missileAttack / this.currentPiece.multiShots);
      let mab = Math.round(this.currentPiece.c_missileAttack_bonus / this.currentPiece.multiShots);
      attackDt[1] = `${ma}(+${mab}) x${this.currentPiece.multiShots}`;
    }
    let dataX = [105, 235, 372];

    let rangeInfo = `Missile-range: ${this.currentPiece.c_missileRange}   ${this.currentPiece.isParabola ? "Parabolic Traj." : "Straight Traj."}`;
    let radiusInfo = `Explose-radius: ${this.currentPiece.explosionRadius}`;
    let antiArmorText = `Anti-armor: ${this.currentPiece.antiArmor}`;
    if (this.currentPiece.isBombing || this.currentPiece.canArtilleryAttack())
      antiArmorText = `Anti-armor: Ignore armor`;
    let healText = `Healing: ${this.currentPiece.c_totalHeal} / ${this.currentPiece.totalHeal}`;
    let inspText = `Inspiring: ${this.currentPiece.inspiring}`;
    let arEnhText = `Armor Enhance: ${this.currentPiece.armorEnhance}%`;
    let atEnhText = `Attack Enhance: ${this.currentPiece.attackEnhance}%`;
    let killAndOutputText = `Kill count: ${this.currentPiece.killCount}      Damage output: ${this.currentPiece.damageOutput}`;

    if (this.useMandarin) {
      speedText = `速度: ${this.currentPiece.c_speed}/${this.currentPiece.speed}`;
      fatigueText = `疲劳度: ${fatiguePercent}%`;
      // fatigueText = `疲劳度: ${this.piece.currentFatigue}/${this.piece.totalStamina}`;
      dataTitle = ["近战 (加成)", "远程 (加成)", "冲杀 (加成)"];
      armorText = `护甲:`;
      dodgeText = `闪避:`;
      attackText = `伤害:`;
      rangeInfo = `远程范围: ${this.currentPiece.c_missileRange}   ${this.currentPiece.isParabola ? "抛射弹道" : "平射弹道"}`;
      radiusInfo = `爆炸半径: ${this.currentPiece.explosionRadius}`;
      antiArmorText = `破甲: ${this.currentPiece.antiArmor}`;
      if (this.currentPiece.isBombing || this.currentPiece.canArtilleryAttack()) antiArmorText = `破甲: 无视护甲`;
      healText = `治疗量: ${this.currentPiece.c_totalHeal} / ${this.currentPiece.totalHeal}`;
      inspText = `鼓舞: ${this.currentPiece.inspiring}`;
      arEnhText = `抗性增强: ${this.currentPiece.armorEnhance}%`;
      atEnhText = `伤害增强: ${this.currentPiece.attackEnhance}%`;
      killAndOutputText = `杀敌数: ${this.currentPiece.killCount}      伤害输出: ${this.currentPiece.damageOutput}`;
    }

    let fontSize = 17;
    let color = this.currentPiece.c_speed === 0 ? "red" : "white";
    Canvas.drawText(this.cxt, speedText, leftX, textY, color, fontSize);
    if (!this.showCost) {
      color = CG[100 - fatiguePercent == 0 ? 1 : 100 - fatiguePercent];
      Canvas.drawText(this.cxt, fatigueText, leftX + 150, textY, color, fontSize);
    }
    color = "white";
    textY += 30;
    Canvas.drawText(this.cxt, dataTitle[0], dataX[0], textY, color, fontSize);
    Canvas.drawText(this.cxt, dataTitle[1], dataX[1], textY, color, fontSize);
    Canvas.drawText(this.cxt, dataTitle[2], dataX[2], textY, color, fontSize);
    textY += 22;
    Canvas.drawText(this.cxt, armorText, leftX, textY, ADC, fontSize);
    Canvas.drawText(this.cxt, armorDt[0], dataX[0], textY, ADC, fontSize);
    Canvas.drawText(this.cxt, armorDt[1], dataX[1], textY, ADC, fontSize);
    Canvas.drawText(this.cxt, armorDt[2], dataX[2], textY, ADC, fontSize);
    textY += 22;
    Canvas.drawText(this.cxt, dodgeText, leftX, textY, GDC, fontSize);
    Canvas.drawText(this.cxt, dodgeDt[0], dataX[0], textY, GDC, fontSize);
    Canvas.drawText(this.cxt, dodgeDt[1], dataX[1], textY, GDC, fontSize);
    Canvas.drawText(this.cxt, dodgeDt[2], dataX[2], textY, GDC, fontSize);
    textY += 22;
    Canvas.drawText(this.cxt, attackText, leftX, textY, DDC, fontSize);
    Canvas.drawText(
      this.cxt,
      attackDt[0],
      dataX[0],
      textY,
      this.currentPiece.isDamageMagic("melee") ? MGC : DDC,
      fontSize,
    );
    Canvas.drawText(
      this.cxt,
      attackDt[1],
      dataX[1],
      textY,
      this.currentPiece.isDamageMagic("missile") ? MGC : DDC,
      fontSize,
    );
    Canvas.drawText(
      this.cxt,
      attackDt[2],
      dataX[2],
      textY,
      this.currentPiece.isDamageMagic("charge") ? MGC : DDC,
      fontSize,
    );
    if (this.currentPiece.missileAttack > 0) {
      textY += 30;
      Canvas.drawText(this.cxt, rangeInfo, leftX, textY, color, fontSize);
      if (this.currentPiece.isBombing) {
        Canvas.drawText(this.cxt, radiusInfo, leftX + 300, textY, RDC, fontSize);
      }
    }
    textY += 30;
    Canvas.drawText(this.cxt, antiArmorText, leftX, textY, color, fontSize);
    textY -= 20;
    if (this.currentPiece.healing > 0) {
      textY += 20;
      Canvas.drawText(this.cxt, healText, leftX + 310, textY, HC, fontSize);
    }
    if (this.currentPiece.inspiring > 0) {
      textY += 20;
      Canvas.drawText(this.cxt, inspText, leftX + 310, textY, DC, fontSize);
    }
    if (this.currentPiece.armorEnhance > 0) {
      textY += 20;
      Canvas.drawText(this.cxt, arEnhText, leftX + 310, textY, ArEC, fontSize);
    }
    if (this.currentPiece.attackEnhance > 0) {
      textY += 20;
      Canvas.drawText(this.cxt, atEnhText, leftX + 310, textY, AtEC, fontSize);
    }

    if (this.showkillAndOutput) {
      textY = 480;
      Canvas.drawText(this.cxt, killAndOutputText, leftX, textY, color, fontSize);
    }
  }

  drawStatus() {
    let textY = 520;
    Canvas.drawLine(this.cxt, leftX, textY - 25, leftX + 485, textY - 25, "white", 7);

    let fontSize = 17;
    let title = this.useMandarin ? "负面状态:" : "Negative status:";
    Canvas.drawText(this.cxt, title, leftX, textY, "white", fontSize);
    textY += 30;
    if (this.currentPiece.statusList.size > 0) {
      let color = "rgb(255, 100, 100)";
      for (let statusCodeNAme of this.currentPiece.statusList) {
        let status = this.useMandarin ? M_StatusName[statusCodeNAme] : StatusName[statusCodeNAme];
        Canvas.drawText(this.cxt, status, leftX, textY, color, fontSize);
        textY += 20;
      }
    }
  }

  drawFormation() {
    let textX = leftX + 210;
    let textY = 520;
    let title = this.useMandarin ? "阵型:" : "Formation:";
    let fontSize = 17;
    Canvas.drawText(this.cxt, title, textX, textY, "white", fontSize);

    let size = Math.round(150 / this.currentPiece.formation[0].length);
    let interval = Math.round(size * 1.1);
    // let interval = Math.round(size * (this.piece.scale > 1 ? 1.1 : 1));
    // textY += 10 + size;
    textY += 10;

    if (this.currentPiece.formation) {
      let formation = this.currentPiece.formation;
      for (let y = 0; y < formation.length; y++) {
        for (let x = 0; x < formation[y].length; x++) {
          let hppercent = Math.round((100 * formation[y][x]) / this.currentPiece.singleHP);
          if (this.currentPiece.gunPositions != null && this.currentPiece.gunPositions.has(`${y},${x}`)) {
            let weight = Math.round(size * 0.12);
            let bias = weight / 2;
            Canvas.drawRect(
              this.cxt,
              textX + x * interval - bias,
              textY + y * interval - bias,
              size + weight,
              size + weight,
              "white",
              weight,
            );
          }
          if (this.currentPiece.type != "artillery" || hppercent > 0) {
            let color = CG[hppercent];
            if (this.currentPiece.scale > 1) {
              Canvas.fillArc(
                this.cxt,
                textX + x * interval + size / 2,
                textY + y * interval + size / 2,
                size / 2,
                color,
              );
            } else {
              Canvas.fillRect(this.cxt, textX + x * interval, textY + y * interval, size, size, color);
            }
          }
        }
      }
    }
  }

  drawHovertext() {
    let startX = 50;
    let startY = 130;
    let width = 420;
    let height = 205;
    Canvas.drawRect(this.cxt, startX, startY, width, height, "rgb(128, 49, 1)", 16);
    Canvas.fillRect(this.cxt, startX, startY, width, height, "rgb(33, 33, 33)");

    let trait = this.currentTrait;
    let img = document.getElementById(trait);

    startX += 14;
    startY += 14;
    Canvas.drawRect(this.cxt, startX, startY, 100, 100, "rgb(128, 50, 1)", 12);
    Canvas.drawImg(this.cxt, img, 0, 0, img.width, img.height, startX, startY, 100, 100);

    startX += 115;
    startY += 15;
    let title = this.useMandarin ? M_Trait[trait] : Trait[trait];
    Canvas.drawText(this.cxt, title, startX, startY, "white", 24);

    startY += 35;
    let text = this.useMandarin ? M_TraitDescription[trait] : TraitDescription[trait];
    let textLines = text.split("\n");
    for (let line of textLines) {
      Canvas.drawText(this.cxt, line, startX, startY, "white", 18);
      startY += 26;
    }
  }
}
