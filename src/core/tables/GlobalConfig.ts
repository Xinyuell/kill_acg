export const Resource = {
  /** * 每次点击获得资源基础值*/
  ClickAddBase: import.meta.env.DEV ? 1000 : 1,
  /** * 每次点击、信徒获得金钱基础值 */
  GetMoneyRatio: 2,
  /** * 金钱转化漫画知识基础倍率 */
  Cost1MoneyRatio: 2,
  /** * 金钱转化游戏知识基础倍率 */
  Cost2MoneyRatio: 10,
  /** * 政策需要金钱、知识的倍率 */
  PolicyCostBaseRatio: 10,
  /** * 基础的出生率0.05 */
  BaseBelieverRatio: import.meta.env.DEV ? 1 : 0.05,
  /** * 信徒满人数后，从众的额外出生率倍率 */
  PeopleBelieverMaxRatio: 2,
  /** * 全局建筑基础消耗10 */
  BuildUpgradeBase: 10,
  /** 政策转化基础值 */
  PolicyAddBase:0.1,
};
//时间相关
export const GameTime = {
  /** * 游戏时间,找一个有意义时间 */
  StartDate: Date.UTC(2016, 6, 1),
  /** * 自动存档时间 */
  SaveTime: 20000,
  /** * 刷新毫秒数,每秒20帧 */
  UpdateTime: 50,
  /** * 虚拟时间放大倍数，5秒=1天 */
  VrtulTimeRatio: 17280,
};
//ACG进度相关
export const AcgProgressData = {
  /** * acg进度的上限，100亿*/
  AcgProgressMax: 10 * 1000 * 1000 * 1000,
  /** * acg进度的基础值，50亿 */
  AcgProgressBae: 5 * 1000 * 1000 * 1000,
  /** * acg进度的速度，1百万 */
  AcgProgressSpeed: import.meta.env.DEV ? 1000 * 1000 * 1000 : 1 * 1000 * 1000,
  /** * 举报失败降低影响力百分比 */
  ComplainWrongValueRatio: 0.1,
  /** * 1级举报降低ACG影响力1百万 */
  ComplainAcgLevel1: import.meta.env.DEV ? 200000000 : 1000 * 1000,
  /** * 2级举报降低ACG影响力5百万  */
  ComplainAcgLevel2: import.meta.env.DEV ? 200000000 : 5 * 1000 * 1000,
  /** * 3级举报降低ACG影响力1千万 */
  ComplainAcgLevel3: import.meta.env.DEV ? 200000000 : 10 * 1000 * 1000,
};
/**政治等级 */
export const InfluenceLevel = [
  /** * 1级100点影响力 */
  100,
  /** * 2级1000点影响力 */
  1000,
  /** * 3级3000点影响力 */
  3000,
  /** * 4级50K点影响力 */
  50 * 1000,
  /** * 5级500K 50万点影响力 */
  500 * 1000,
  /** * 6级10M 1千万点影响力 */
  10 * 1000 * 1000,
  /** * 7级1B点 10亿影响力 */
  1000 * 1000 * 1000,
];
/**政治背景等级 */
export const PoliticalLevel = [
  /** * 1级100点政治背景 */
  500 /** * 2级1000点政治背景*/, 2000 /** * 3级10000点政治背景*/,
  10000 /** * 4级50000点政治背景*/, 50000,
];

export const CityBuildCostBase = [10, 100, 1000, 5000, 20000, 100000];
