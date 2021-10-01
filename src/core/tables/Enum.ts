
export enum ItemType {
  None = 0,
  /** * 是否研究资源 */
  Research = 1 << 0,
  /** * 是否初始解锁 */
  AutoUnLock = 1 << 1,
  /** * 是否可升级 */
  Upgrade = 1 << 2
}
export enum BuildClickType {
  None,
  Upgrade,
  AddInfluence,
  AddMoeny,
  AddResearch
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
  Political
}

export enum EnumResearchItem {
  None,
  /** * 影响力获得金钱1级 */
  InfluenceMoneyLevel1,
  /** * 解锁1级信徒建筑 */
  BelieverBuildLevel1,
  /** * 解锁1级金钱建筑 */
  MoneyBuildLevel1,
  /** * 解锁1级研究建筑 */
  ResearchBuildLevel1,
  /** * 信徒提升影响力上限1级 */
  BelieverInfluenceMax1,
  /** * 影响力获得金钱2级 */
  InfluenceMoneyLevel2,
  /** * 解锁2级信徒建筑 */
  BelieverBuildLevel2,
  /** * 解锁2级金钱建筑 */
  MoneyBuildLevel2,
  /** * 解锁2级研究建筑 */
  ResearchBuildLevel2,
  /** * 影响力获得金钱3级 */
  InfluenceMoneyLevel3,
  /** * 信徒提升影响力上限2级 */
  BelieverInfluenceMax2,
  /** * 信徒建筑成本蠕变降低1 */
  BelieverBuildCost1,
  /** * 金钱建筑成本蠕变降低1 */
  MoneyBuildCost1,
  /** * 研究建筑成本蠕变降低1 */
  ResearchBuildCost1,
  /** * 解锁举报 */
  ComplainUnLock,
  /** * 信徒自动举报国外 */
  AutoComplainLevel1,
  /** * 信徒自动举报外太空 */
  AutoComplainLevel2,
  /** * 信徒自动举报错误率降低50% */
  AutoComplainWrongLevel1,
  /** * 信徒自动举报不会进行错误举报了 */
  AutoComplainWrongLevel2
}
/**
 * 科技增加的资源属性
 */

export enum EnumResearchProp {
  /** * 影响力转化金钱百分比 */
  InfluenceMoney,
  /** * 信徒增加影响力上限 */
  BelieverAddInfluenceMax,
  /** * 影响力类型的建筑成本蠕变 */
  InfluenceBuildCost,
  /** * 金钱类型的建筑成本蠕变 */
  MoneyBuildCost,
  /** * 研究类型的建筑成本蠕变 */
  ResearchBuildCost,
  /** * 提升工人金钱效率 */
  MoneyRatio,
  /** * 提升工人漫画知识效率 */
  Cost1Ratio,
  /** * 提升工人游戏知识效率 */
  Cost2Ratio,
  /** * 信徒的上限 */
  BelieverMax,
  /** * 从众的上限  */
  PeopleMax
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
  ResearchLevel2
}

export enum EnumWorkType {
  InfluenceWork,
  MoneyWork,
  Cost1Work,
  Cost2Work,
  ComplainWork
}
