import * as Enum from "./Enum";

interface IBaseInfo {
  ID: number;
  Name: string;
  Desc: string;
}

export interface IItemInfo extends IBaseInfo {
  BaseMax: number;
  Type: Enum.ItemType;
  TipsContent: string;
}

export interface IBuildInfo extends IBaseInfo {
  Type: Enum.ItemType;
  /**UI分类 */
  cityName: number;
  /**点击反馈类型 后面的都是升级建筑 */
  OnClickType: Enum.BuildClickType;
  /**成本公式 线性倍率*/
  UpgradeCostRatio: number;
  /**成本公式 指数倍率*/
  UpgradeCostPower: number;
  /**解锁需要完成科技*/
  Require: Enum.EnumResearchItem;
  /**提供属性，乘以数量 */
  ResearchProp: Map<Enum.EnumResearchProp, number>;
}

export interface IResearchInfo extends IBaseInfo {
  /**动漫知识消耗 */
  Cost1: number;
  /**游戏知识消耗 */
  Cost2: number;
  /** * 解锁下一步研究ID*/
  UnLock: number[];
  /** * 当前影响力值的条件*/
  Condition: number;
  /** * 解锁后增加的资源属性 */
  ResearchProp?: Map<Enum.EnumResearchProp, number>;
}

export interface IPolicyInfo extends IBaseInfo {
  /**消耗的政策点 */
  Cost: number;
  /**需要的政治背景等级 */
  Condition: number;
  /** * 解锁后增加的资源属性 */
  ResearchProp?: Map<Enum.EnumResearchProp, number>;
}

export interface ILawInfo extends IBaseInfo {
  /**消耗的政治背景 */
  Cost: number;
  /** * 解锁后增加的资源属性 */
  ResearchProp?: Map<Enum.EnumResearchProp, number>;
}

export interface IWorkInfo extends IBaseInfo {
  Type?: Enum.ItemType;
}
