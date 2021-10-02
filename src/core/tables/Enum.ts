export enum ItemType {
  None = 0,
  /** * 是否研究资源 */
  Research = 1 << 0,
  /** * 是否初始解锁 */
  AutoUnLock = 1 << 1,
  /** * 是否可升级 */
  Upgrade = 1 << 2,
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
  /** * 影响力获得金钱2级0.02 */
  InfluenceMoneyLevel2,
  /** * 影响力获得金钱3级0.04 */
  InfluenceMoneyLevel3,
  /** * 影响力获得金钱4级0.06 */
  InfluenceMoneyLevel4,
  /** * 影响力获得金钱5级0.08 */
  InfluenceMoneyLevel5,
  /** * 无限科技，影响力获得金钱6级0.1 */
  InfluenceMoneyLevel6,

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

  /** * 解锁举报 */
  ComplainUnLock,
  /** * 信徒自动举报国外 */
  AutoComplainLevel1,
  /** * 信徒自动举报外太空 */
  AutoComplainLevel2,
  /** * 信徒自动举报错误率降低20% */
  AutoComplainWrongLevel1,
  /** * 信徒自动举报错误率降低40%  */
  AutoComplainWrongLevel2,
  /** * 信徒自动举报错误率降低60%  */
  AutoComplainWrongLevel3,
  /** * 信徒自动举报错误率降低80%  */
  AutoComplainWrongLevel4,
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
  /** * 信徒自动举报错误率百分比 */
  AutoComplainWrongRatio,
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