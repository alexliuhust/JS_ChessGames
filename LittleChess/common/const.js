export const GameWidth = 1350;
export const GameHeight = 850;
export const DeployWidth = 650;
export const DeployHeight = 850;
export const InfoWidth = 530;
export const InfoHeight = 850;
export const DInfoWidth = 620;
export const DInfoHeight = 570;
export const BannerWidth = 950;
export const BannerHeight = 70;

export const DescrColor = "rgb(172, 226, 102)";
export const LevelColor = "rgb(255, 230, 100)";
export const HpColor = "rgb(100, 200, 100)";
export const AmmoColor = "rgb(250, 150, 70)";
export const LeadColor = "rgb(160, 160, 250)";
export const HealColor = "rgb(70, 200, 240)";
export const ExpColor = "rgb(70, 200, 255)";

export const ArmorDataColor = "rgb(140, 220, 254)";
export const DodgeDataColor = "rgb(58, 193, 255)";
export const DamageDataColor = "rgb(247, 217, 123)";
export const MagicDamageColor = "rgb(210, 75, 255)";
export const RadiusDataColor = "rgb(255, 128, 128)";

export const SelectPieceColor = "rgb(150, 255, 150)";
export const SelectEnemyColor = "rgb(255, 180, 0)";
export const ReadyToAttackColor = "rgb(255, 150, 150)";
export const ReadyToAttackColorL = "rgb(255, 200, 200)";

export const ArmorEnhanceColor = "rgb(85, 155, 200)";
export const AttackEnhanceColor = "rgb(163, 100, 215)";

export const MissileColor = {
  PoisonColor: "rgb(153, 255, 153)",
  FireColor: "rgb(255, 102, 0)",
  ATColor: "rgb(230, 230, 0)",
  GhostColor: "rgb(51, 255, 255)",
  MagicColor: "rgb(217, 102, 255)",
  BombColor: "rgb(210, 121, 121)",
};

export const ColorGradient = ["white"];
function createGradient() {
  let colors = [
    [220, 20, 20], // Red
    [255, 123, 0], // Orange
    [255, 247, 0], // Yellow
    [20, 180, 20], // Green
  ];

  let totalSteps = 99;
  let stepsPerSegment = totalSteps / (colors.length - 1);

  for (let i = 0; i <= totalSteps; i++) {
    // Determine which color segment we're in
    let segmentIndex = Math.floor(i / stepsPerSegment);
    let segmentProgress = (i % stepsPerSegment) / stepsPerSegment;

    // Clamp segmentIndex to valid range
    if (segmentIndex >= colors.length - 1) {
      segmentIndex = colors.length - 2;
      segmentProgress = 1;
    }

    // Get the two colors to interpolate between
    let color1 = colors[segmentIndex];
    let color2 = colors[segmentIndex + 1];

    // Linear interpolation
    let r = Math.round(color1[0] * (1 - segmentProgress) + color2[0] * segmentProgress);
    let g = Math.round(color1[1] * (1 - segmentProgress) + color2[1] * segmentProgress);
    let b = Math.round(color1[2] * (1 - segmentProgress) + color2[2] * segmentProgress);

    ColorGradient.push(`rgb(${r}, ${g}, ${b})`);
  }
}
createGradient();

export const PowerList = [
  "nordfort",
  "dimwoods",
  "stormreef",
  "empire",
  "snowhaupt",
  "polluteland",
  "burningterra",
  "oldcemetery",
  "wildtribe",
];
export const PowerMap = new Map([
  ["nordfort", "Nord Fort"],
  ["dimwoods", "Dim Woods"],
  ["stormreef", "Storm Reef"],
  ["empire", "Terran Empire"],
  ["snowhaupt", "Snow Haupt"],
  ["polluteland", "Polluted Land"],
  ["burningterra", "Burning Terra"],
  ["oldcemetery", "Old Cemetery"],
  ["wildtribe", "Wild Tribe"],
]);
export const M_PowerMap = new Map([
  ["nordfort", "诺德堡"],
  ["dimwoods", "幽暗森林"],
  ["stormreef", "风暴礁"],
  ["empire", "泰伦帝国"],
  ["snowhaupt", "雪顶要塞"],
  ["polluteland", "污染之地"],
  ["burningterra", "燃烧领"],
  ["oldcemetery", "老墓园"],
  ["wildtribe", "蛮荒部落"],
]);

export const DirectMap = new Map([
  ["ArrowUp", "U"],
  ["ArrowDown", "D"],
  ["ArrowLeft", "L"],
  ["ArrowRight", "R"],
  ["KeyW", "U"],
  ["KeyS", "D"],
  ["KeyA", "L"],
  ["KeyD", "R"],
]);

export const Category = {
  IF: "Infantry",
  S_IF: "Shield-Infantry",
  GS_IF: "Giant-Shield-Infantry",
  A_IF: "Armored-Infantry",
  AS_IF: "Armored-Shield-Infantry",
  CGIF: "Charging-Infantry",
  HUIF: "Hurling-Infantry",
  A_HUIF: "Armored-Hurling-Infantry",

  AC: "Ranged-Infantry",
  MAC: "Melee-Ranged-Infantry",
  S_AC: "Shield-Ranged-Infantry",
  A_AC: "Armored-Ranged-Infantry",
  S_MAC: "Shield-Melee-Ranged-Infantry",
  A_MAC: "Armored-Melee-Ranged-Infantry",

  MLC: "Melee-Cavalry",
  MSC: "Ranged-Cavalry",
  CGC: "Charging-Cavalry",
  MSCGC: "Ranged-Charging-Cavalry",
  A_MLC: "Armored-Melee-Cavalry",
  AS_MLC: "Armored-Shield-Melee-Cavalry",
  S_CGC: "Shield-Charging-Cavalry",
  A_CGC: "Armored-Charging-Cavalry",

  M: "Monster",
  G: "Giant",
  A_G: "Armored-Giant",
  MI: "Monster-Infantry",
  S_MI: "Shield-Monster-Infantry",
  A_MI: "Armored-Monster-Infantry",
  MCI: "Mech-Infantry",
  MC: "Monster-Cavalry",
  A_MC: "Armored-Monster-Cavalry",
  A_MCGC: "Armored-Monster-Charging-Cavalry",
  VC: "Vehicle",
  A_VC: "Armored-Vehicle",
  C_VC: "Charging-Vehicle",
  AT: "Artillery",
  ST: "Stationary-Turret",

  IPR: "Inspirator",
  PTR: "Protector",
  HLR: "Healer",
  RSR: "Rouser",

  HERO: "Hero",
};

export const M_Category = {
  IF: "近战步兵",
  S_IF: "持盾-近战步兵",
  GS_IF: "巨盾-近战步兵",
  A_IF: "装甲-近战步兵",
  AS_IF: "装甲-持盾-近战步兵",
  S_MI: "持盾-怪兽步兵",
  A_MI: "装甲-怪兽步兵",
  CGIF: "冲击步兵",
  HUIF: "投掷步兵",
  A_HUIF: "装甲-投掷步兵",

  AC: "远程步兵",
  MAC: "近战远程步兵",
  S_AC: "持盾-远程步兵",
  A_AC: "装甲-远程步兵",
  S_MAC: "持盾-近战远程步兵",
  A_MAC: "装甲-近战远程步兵",

  MLC: "近战骑兵",
  MSC: "远程骑兵",
  CGC: "冲击骑兵",
  MSCGC: "远程冲击骑兵",
  A_MLC: "装甲-近战骑兵",
  AS_MLC: "装甲-持盾-近战骑兵",
  S_CGC: "持盾-冲击骑兵",
  A_CGC: "装甲-冲击骑兵",

  M: "怪兽",
  G: "巨兽",
  A_G: "装甲-巨兽",
  MI: "怪兽步兵",
  A_MI: "装甲-怪兽步兵",
  MCI: "机甲步兵",
  MC: "怪兽骑兵",
  A_MC: "装甲-怪兽骑兵",
  A_MCGC: "装甲-怪兽冲击骑兵",
  VC: "战车",
  A_VC: "装甲-战车",
  C_VC: "冲击-战车",
  AT: "炮兵",
  ST: "固定炮塔",

  IPR: "鼓舞者",
  PTR: "保护者",
  HLR: "治疗者",
  RSR: "激励者",

  HERO: "英雄",
};

export const StatusName = {
  FT1: "Weary",
  FT2: "Breathless",
  FT3: "Exhausted",
  FL: "Flanks exposed",
  PA: "Pincer attacked",
  SR: "Surrounded",
  SM: "Shaken morale",
  LM: "Low morale",
  IR: "In the rout",
  CR: "Crumbling",
  DI: "Disintegrating",
  FS: "Formation scattered",
  HR: "Horrified",
  UC: "Under cannon fire",
  UB: "Under bombardment",
  PS: "Poisoned",
  IM: "In melee",
  HP: "Hampered",
};

export const M_StatusName = {
  FT1: "略微疲劳",
  FT2: "气喘吁吁",
  FT3: "精疲力竭",
  FL: "侧翼暴露",
  PA: "陷入夹击",
  SR: "陷入包围",
  SM: "士气动摇",
  LM: "士气低落",
  IR: "正在溃逃",
  CR: "正在崩解",
  DI: "灰飞烟灭",
  FS: "阵型冲散",
  HR: "正处惊骇",
  UC: "遭受炮击",
  UB: "遭受轰炸",
  PS: "中毒",
  IM: "陷入近战",
  HP: "受到粘滞",
};

export const Trait = {
  WK: "Weak",
  IS: "Instability",
  AIF: "Anti-infantry",
  ALG: "Anti-large",
  AAM: "High anti-armor",
  BB: "Bombing",
  SA: "Suboptimal accuracy",
  HS: "Holding shields",
  AM: "Armored",
  RC: "Resist charging",
  LS: "Low stature",
  AG: "Agile",
  SH: "Shocking",
  MA: "Missile attack",
  MM: "Melee master",
  HD: "High damage",
  HG: "High dodge",
  LR: "Long range",
  MK: "Marksman skill",
  MH: "Monster hunter",
  LB: "Large bombing-radius",
  SF: "Sparse formation",
  PW: "Poisoned weapon",
  HM: "High morale",
  ST: "Stealth",
  MG: "Magic damage",
  FD: "Forward-deployment",
  EL: "Elite",
  NC: "Necromancy",
};

export const TraitDescription = {
  WK: "Low combat strength and morale.",
  IS: "Undead, spirit, or demonic units\ndo not rout when morale is too\nlow; instead, they continuously\nlose health until they completely\nvanish.",
  AIF: "Higher damage to infantry units.",
  ALG: "Higher damage to large units.",
  AAM: "Attacks possess excellent anti-\narmor properties.",
  BB: "Low accuracy, but deals AoE\ndamage and shakes the target's\nmorale.",
  SA: "Long-range munitions have a\nlarger impact dispersion radius.",
  HS: "Higher armor and evasion again-\nst small-projectile ranged fire,\nand reduce splash radius for ex-\nplosion and penetration damage.",
  AM: "Higher overall armor, giving units\nsignificantly higher morale; While\nunits are easier to get fatigued\nwhen marching around.",
  RC: "Higher armor and evasion again-\nst charge damage; takes reduced\nAoE damage from large units,\nand reduces the attacker's move-\nment for the next turn.",
  LS: "Reduces the accuracy of\nincoming ranged attacks.",
  AG: "Retains remaining movement\npoints after melee or charge att-\nacks; movement further reduces\nthe accuracy of incoming ranged\nattacks.",
  SH: "Attacks severely damage the\ntarget's morale.",
  MA: "Capable of ranged attacks.",
  MM: "Higher melee evasion; does not\nlose movement points next turn\nafter engaging in melee combat.",
  HD: "Higher damage output.",
  HG: "Higher overall evasion.",
  LR: "Above-average attack range.",
  MK: "Ranged attacks never miss.",
  MH: "Highly effective at killing large\nunits (especially giants).",
  LB: "AoE damage has an exceptional-\nly large blast radius.",
  SF: "Allows other units to pass throu-\ngh it; sparse formation makes it\nmore vulnerable to charges but\nmore survivable against ranged\nattacks.",
  PW: "Poisoned weapons poison low-\narmor targets and significantly\nincrease their fatigue.",
  HM: "Morale does not easily drop.",
  ST: "Higher ranged evasion; cannot\nbe targeted by ranged attacks in\n'Auto' mode.",
  MG: "Magical damage ignores armor\n(though evasion still applies).",
  FD: "This unit may be deployed out-\nside the standard deployment\narea.",
  EL: "Elite unit; starts at Level 3 and\ntypically possesses special\nabilities.",
  NC: "Necromancy is more efficient at\nrestoring the health and morale\nof undead and spirit targets.",
};

export const M_Trait = {
  WK: "孱弱",
  IS: "不稳定性",
  AIF: "反步兵",
  ALG: "反大型",
  AAM: "高破甲",
  BB: "轰炸",
  SA: "精度欠佳",
  HS: "持盾",
  AM: "装甲",
  RC: "抵御冲锋",
  LS: "低矮身形",
  AG: "迅捷如风",
  SH: "惊骇敌军",
  MA: "远程攻击",
  MM: "近战大师",
  HD: "高伤害",
  HG: "高闪避",
  LR: "长程",
  MK: "神射技艺",
  MH: "怪物猎人",
  LB: "大爆炸半径",
  SF: "稀疏阵型",
  PW: "淬毒武器",
  HM: "士气高昂",
  ST: "匿踪",
  MG: "魔法伤害",
  FD: "先锋部署",
  EL: "精英",
  NC: "死灵术",
};

export const M_TraitDescription = {
  WK: "战斗力和士气较低。",
  IS: "亡灵、灵体或恶魔单位在士气过低\n时不会溃逃，但其生命值会不断损\n失，直至完全消逝。",
  AIF: "可对步兵单位造成更多伤害。",
  ALG: "可对大型单位造成更多伤害。",
  AAM: "攻击具有优秀的破甲属性。",
  BB: "该单位命中率较低，但可对目标造\n成范围伤害，并对其士气造成打击。",
  SA: "远程弹药的落点有更大的散布半径。",
  HS: "面对小型远程弹药时，拥有更高的\n护甲和闪避率，并减少爆炸和贯穿\n伤害的溅射范围。",
  AM: "更高的综合护甲，显著提升士气；\n但单位在行军时会更容易疲劳。",
  RC: "面对冲杀伤害时，拥有更高的护甲\n和闪避率；大型单位对其造成的范\n围伤害更有限，且下回合移动力会\n降低。",
  LS: "降低远程单位对其命中率。",
  AG: "该单位在近战攻击或冲杀攻击后会\n保留剩余移动力；其移动时，会进\n一步降低远程单位对其命中率。",
  SH: "攻击时会严重打击目标的士气。",
  MA: "可进行远程攻击。",
  MM: "拥有更高的近战闪避率，且陷入近\n战后，其在下回合不会损失移动力。",
  HD: "拥有更高的伤害输出。",
  HG: "拥有更高的综合闪避率。",
  LR: "拥有超过平均水平的远程攻击范围。",
  MK: "远程攻击永不落空。",
  MH: "在击杀大型单位(尤其是巨兽)时更\n加高效。",
  LB: "其范围伤害拥有超大的杀伤半径。",
  SF: "允许其他单位与其相互穿越；稀疏\n的阵型面对冲杀伤害时更脆弱，但\n面对远程攻击时有更高的存活率。",
  PW: "淬毒武器会使低护甲目标中毒，大\n幅增加其疲劳度。",
  HM: "该单位的士气不会轻易降低。",
  ST: "该单位拥有更高的远程闪避率，且\n不会成为远程攻击'自动模式'的目\n标。",
  MG: "魔法伤害无视目标护甲(但闪避依然\n对其生效)。",
  FD: "可在常规部署区域外部署该单位。",
  EL: "精英单位入场时直接升至等级3，\n且其通常拥有特殊能力。",
  NC: "死灵术在面对亡灵和灵体目标时，\n回复其生命值和士气的效率更高。",
};

const TraitOrder = [
  ["EL", "HM", "FD", "WK", "IS", "SF", "LS", "ST", "AG", "SH"], // Special traits
  ["AM", "HS", "RC", "HG"], // Defence traits
  ["MM", "MA", "LR", "MG", "PW", "MK", "BB", "SA", "LB"], // Special attack traits
  ["AAM", "AIF", "ALG", "MH", "HD"], // Attack traits
];
const TraitOrderFlat = TraitOrder.flat();

export function getDescription(arm, categories, traits) {
  categories = categories != null ? categories.split(",") : [];
  traits = traits != null ? traits.split(",") : [];
  traits.sort((a, b) => TraitOrderFlat.indexOf(a) - TraitOrderFlat.indexOf(b));
  arm.traits = traits;

  let description = "";
  let m_description = "";
  for (let i = 0; i < categories.length; i++) {
    if (i > 0) {
      description += ", ";
      m_description += " ";
    }
    description += Category[categories[i]];
    m_description += M_Category[categories[i]];
  }
  description += " [";
  m_description += " [";
  for (let i = 0; i < traits.length; i++) {
    if (i > 0) {
      description += ", ";
      m_description += " ";
    }
    description += Trait[traits[i]];
    m_description += M_Trait[traits[i]];
  }
  description += "]";
  m_description += "]";

  return [description, m_description];
}
