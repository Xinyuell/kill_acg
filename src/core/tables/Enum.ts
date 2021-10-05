import exp from "constants";

export enum ItemType {
  None = 0,
  /** * 是否初始解锁 */
  AutoUnLock = 1 << 0,
  /** * 是否影响力建筑 */
  InfluenceBuild = 1 << 1,
  /** * 是否金钱建筑 */
  MoneyBuild = 1 << 2,
  /** * 是否研究建筑 */
  ResearchBuild = 1 << 3,
}
export enum BuildClickType {
  None,
  Upgrade,
  AddInfluence,
  AddMoeny,
  AddResearch,
}

export enum EnumResourceItem {
  None,
  /**影响力 */
  Influence,
  /**金钱 */
  Money,
  /**动漫知识 */
  Cost1,
  /**游戏知识 */
  Cost2,
  /**信徒 */
  Believer,
  /**从众 */
  People,
  /**政策点 */
  Policy,
  /**政治背景 */
  Political,
}

export enum EnumResearchItem {
  None,
  /** * 影响力获得金钱1级0.01 */
  InfluenceMoneyLevel1,
  /** * 影响力获得金钱2级0.01 */
  InfluenceMoneyLevel2,
  /** * 影响力获得金钱3级0.02 */
  InfluenceMoneyLevel3,
  /** * 影响力获得金钱4级0.02 */
  InfluenceMoneyLevel4,
  /** * 影响力获得金钱5级0.04 */
  InfluenceMoneyLevel5,
  /** * 影响力获得金钱6级0.05 */
  InfluenceMoneyLevel6,
  /** * 影响力获得金钱7级0.05 */
  InfluenceMoneyLevel7,
  /** * 影响力获得金钱8级0.05 */
  InfluenceMoneyLevel8,
  /** * 影响力获得金钱9级0.05 */
  InfluenceMoneyLevel9,

  /** * 解锁1级信徒建筑 */
  BelieverBuildLevel1,
  /** * 解锁1级金钱建筑 */
  MoneyBuildLevel1,
  /** * 解锁1级研究建筑 */
  ResearchBuildLevel1,

  /** * 解锁2级信徒建筑 */
  BelieverBuildLevel2,
  /** * 解锁2级金钱建筑 */
  MoneyBuildLevel2,
  /** * 解锁2级研究建筑 */
  ResearchBuildLevel2,

  /** * 解锁3级信徒建筑区块链 */
  BelieverBuildLevel3,
  /** * 解锁3级金钱建筑房产公司 */
  MoneyBuildLevel3,
  /** * 解锁3级研究建筑政策顾问 */
  ResearchBuildLevel3,

  /** * 解锁4级信徒建筑互联网社区 */
  BelieverBuildLevel4,
  /** * 解锁4级金钱建筑社交平台 */
  MoneyBuildLevel4,
  /** * 解锁4级研究建筑行业巨头 */
  ResearchBuildLevel4,

  /** * 信徒提升影响力上限1级 */
  BelieverInfluenceMax1,
  /** * 信徒提升影响力上限2级 */
  BelieverInfluenceMax2,
  /** * 信徒提升影响力上限3级 */
  BelieverInfluenceMax3,
  /** * 信徒提升影响力上限4级 */
  BelieverInfluenceMax4,
  /** * 信徒提升影响力上限5级 */
  BelieverInfluenceMax5,
  /** * 信徒提升影响力上限6级 */
  BelieverInfluenceMax6,
  /** * 信徒提升影响力上限7级 */
  BelieverInfluenceMax7,
  /** * 信徒提升影响力上限8级 */
  BelieverInfluenceMax8,
  /** * 信徒提升影响力上限9级 */
  BelieverInfluenceMax9,
  /** * 信徒提升影响力上限10级 */
  BelieverInfluenceMax10,

  /** * 解锁举报 */
  ComplainUnLock,
  /** * 信徒自动举报国外 */
  AutoComplainLevel1,
  /** * 信徒自动举报外太空 */
  AutoComplainLevel2,
}
/**
 * 科技增加的资源属性
 */
export enum EnumResearchProp {
  /** * 影响力转化金钱百分比 */
  InfluenceMoney,
  /** * 信徒增加影响力上限 */
  BelieverAddInfluenceMax,
  /** * 提升工人金钱效率 */
  MoneyRatio,
  /** * 提升工人漫画知识效率 */
  Cost1Ratio,
  /** * 提升工人游戏知识效率 */
  Cost2Ratio,
  /** * 提升工人政策点效率 */
  PolicyRatio,
  /** * 信徒的上限 */
  BelieverMax,
  /** * 从众的上限  */
  PeopleMax,
  /** 影响力建筑成本蠕变 */
  ReduceInfluenceBuildCost,
  /** 金钱建筑成本蠕变 */
  ReduceMoneyBuildCost,
  /** 研究建筑成本蠕变 */
  ReduceResearchBuildCost,
  /** 降低ACG进度条的速度 */
  ReduceAcgProgressSpeedRatio,
  /** 举报CD */
  ComplainCD,
  /** 举报效率提高 */
  ComplainAcgRatio,
  /** 工作的基础值提高百分比 */
  WorkBaseRatio,
  /** 工作金钱消耗降低百分比 */
  MoneyCostRatio,
  /** 工作知识消耗降低百分比 */
  ResearchCostRatio,
  /** 政治背景加速全局效率 */
  PoliticalAllRatio,
}

export enum EnumPolicyItem {
  /** 影响力建筑成本蠕变 */
  ReduceInfluenceBuildCost,
  /** 金钱建筑成本蠕变 */
  ReduceMoneyBuildCost,
  /** 研究建筑成本蠕变 */
  ReduceResearchBuildCost,
  /** 降低ACG进度条的速度 */
  ReduceAcgProgressSpeedRatio,
}

export enum EnumLawItem {
  /** 举报CD */
  ComplainCD,
  /** 举报效率提高 */
  ComplainAcgRatio,
  /** 工作的基础值提高百分比 */
  WorkBaseRatio,
  /** 工作金钱消耗降低百分比 */
  MoneyCostRatio,
  /** 工作知识消耗降低百分比 */
  ResearchCostRatio,
}

export enum EnumBuildItem {
  None,
  /**点击获得影响力 */
  AddInfluence,
  /**点击获得金钱 */
  AddMoney,
  /**点击获得动漫知识 */
  AddResearch,
  /**点击升级心理诊所 */
  InfluenceLevel1,
  /**点击升级印刷店 */
  MoneyLevel1,
  /**点击升级书店 */
  ResearchLevel1,
  /**点击升级网瘾治疗中心 */
  InfulenceLevel2,
  /**点击升级广告公司*/
  MoneyLevel2,
  /**点击升级运营中心 */
  ResearchLevel2,
  /**点击升级区块链 */
  InfulenceLevel3,
  /**点击升级房产公司*/
  MoneyLevel3,
  /**点击获取政策顾问 */
  ResearchLevel3,
  /**点击升级互联网社区 */
  InfulenceLevel4,
  /**点击升级社交平台*/
  MoneyLevel4,
  /**点击升级行业巨头 */
  ResearchLevel4,
}

export enum EnumWorkType {
  InfluenceWork,
  MoneyWork,
  Cost1Work,
  Cost2Work,
  ComplainWork,
  PolicyWork,
}
