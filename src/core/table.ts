export const GlobalConfig = {
  /**
   * 每次点击、信徒获得金钱基础值
   */
  GetMoneyRatio: 2,
  /**
   * 金钱转化漫画知识基础倍率
   */
  Cost1MoneyRatio: 2,
  /**
   * 金钱转化游戏知识基础倍率
   */
  Cost2MoneyRatio: 10,
  /**
   * 基础的出生率
   */
  BaseBelieverRatio:0.001,
  /**
   * 信徒满人数后，从众的额外出生率倍率
   */
   PeopleBelieverMaxRatio:2,
  /**
   * 全局建筑基础消耗
   */
   BuildUpgradeBase:10,
};

export enum ItemType {
  None = 0,
  /**
   * 是否显示在界面上
   */
  ShowPanel = 1 << 0,
  /**
   * 是否研究资源
   */
  Research = 1 << 1,
  /**
   * 是否初始解锁
   */
  AutoUnLock = 1 << 2,
  /**
   * 是否可升级
   */
  Upgrade = 1 << 3,
}
export enum BuildClickType {
  None,
  Upgrade,
  AddInfluence,
  AddMoeny,
  AddResearch,
}

interface IBaseInfo {
  ID: number;
  Name: string;
  Desc: string;
}

export interface IItemInfo extends IBaseInfo {
  BaseMax: number;
  Type: ItemType;
  TipsContent: string;
}

export interface IBuildInfo extends IBaseInfo {
  Type: ItemType;
  /**UI分类 */
  cityName: number;
  /**点击反馈类型 后面的都是升级建筑 */
  OnClickType: BuildClickType;
  /**成本公式 线性倍率*/
  UpgradeCostRatio: number;
  /**成本公式 指数倍率*/
  UpgradeCostPower: number;
  /**解锁需要完成科技*/
  Require:EnumResearchItem;
}

export interface IResearchInfo extends IBaseInfo {
   /**动漫知识消耗 */
  Cost1: number;
    /**游戏知识消耗 */
  Cost2: number;
  /**
   * 解锁下一步研究ID
   */
  UnLock: number[];
  /**
   * 当前影响力值的条件
   */
  Condition: number;
  /**
   * 解锁后增加的资源属性
   */
  ResearchProp?: Map<EnumResearchProp, number>;
}

export interface IWorkInfo extends IBaseInfo {}

export enum EnumResourceItem {
  None,
  /**影响力 */
  Influence,
  Money,
   /**动漫知识 */
  Cost1,
  /**游戏知识 */
  Cost2,
  /**信徒 */
  Believer,
  /**从众 */
  People,
}

export enum EnumResearchItem {
  None,
  /**
   * 影响力获得金钱1级
   */
  InfluenceMoneyLevel1,
  /**
   * 解锁1级信徒建筑
   */
  BelieverBuildLevel1,
  /**
   * 解锁1级金钱建筑
   */
  MoneyBuildLevel1,
  /**
   * 解锁1级研究建筑
   */
  ResearchBuildLevel1,
  /**
   * 信徒提升影响力上限1级
   */
  BelieverInfluenceMax1,
  /**
   * 影响力获得金钱2级
   */
  InfluenceMoneyLevel2,
  /**
   * 解锁2级信徒建筑
   */
  BelieverBuildLevel2,
  /**
   * 解锁2级金钱建筑
   */
  MoneyBuildLevel2,
  /**
   * 解锁2级研究建筑
   */
  ResearchBuildLevel2,
  /**
   * 影响力获得金钱3级
   */
  InfluenceMoneyLevel3,
  /**
   * 信徒提升影响力上限2级
   */
  BelieverInfluenceMax2,
  /**
   * 信徒建筑成本蠕变降低1
   */
  BelieverBuildCost1,
  /**
   * 金钱建筑成本蠕变降低1
   */
  MoneyBuildCost1,
  /**
   * 研究建筑成本蠕变降低1
   */
  ResearchBuildCost1,
  /**
   * 解锁举报
   */
  ComplainUnLock,
}

/**
 * 科技增加的资源属性
 */
export enum EnumResearchProp {
  /**
   * 影响力转化金钱速率
   */
  InfluenceMoney,
  /**
   * 信徒增加影响力上限
   */
  BelieverAddInfluenceMax,
  /**
   * 影响力建筑成本降低
   */
  InfluenceBuildCost,
  /**
   * 金钱建筑成本降低
   */
  MoneyBuildCost,
  /**
   * 研究建筑成本降低
   */
  ResearchBuildCost,
  /**
   * 金钱建筑金钱效率提升
   */
  MoneyRatio,
  /**
   * 研究建筑漫画知识效率提升
   */
  Cost1Ratio,
  /**
   * 研究建筑游戏知识效率提升
   */
  Cost2Ratio,
}

export const ItemInfoList: Map<number, IItemInfo> = new Map([
  [
    EnumResourceItem.Influence,
    {
      ID: EnumResourceItem.Influence,
      Name: "影响力",
      Desc: "你对这个社会的影响力，很多事情都需要扩大影响力之后才能办到",
      TipsContent: "每20点影响力获得1点金钱每秒",
      BaseMax: 100,
      Type: ItemType.ShowPanel | ItemType.AutoUnLock,
    },
  ],
  [
    EnumResourceItem.Money,
    {
      ID: EnumResourceItem.Money,
      Name: "金钱",
      Desc: "钱不是目的，只是手段，金钱对你来说如同粪土",
      TipsContent: "你只是为了消灭ACG文化才收集了一点点钱",
      BaseMax: -1,
      Type: ItemType.ShowPanel,
    },
  ],
  [
    EnumResourceItem.Cost1,
    {
      ID: EnumResourceItem.Cost1,
      Name: "动漫知识",
      Desc: "知己知彼百战百胜，我不入地狱谁入地狱。",
      TipsContent: "在研究分页解锁各项研究",
      BaseMax: -1,
      Type: ItemType.ShowPanel | ItemType.Research,
    },
  ],
  [
    EnumResourceItem.Cost2,
    {
      ID: EnumResourceItem.Cost2,
      Name: "游戏知识",
      Desc: "知己知彼百战百胜，我不入地狱谁入地狱。",
      BaseMax: -1,
      TipsContent: "在研究分页解锁各项研究",
      Type: ItemType.ShowPanel | ItemType.Research,
    },
  ],
  [
    EnumResourceItem.Believer,
    {
      ID: EnumResourceItem.Believer,
      Name: "信徒",
      Desc: "信徒是一群彻底追随你消灭ACG的助手，会帮你扩大影响力。",
      BaseMax: -1,
      TipsContent:
        "每个信徒提供1点基础的影响力速度，受各项研究和建筑的加成。安排信徒工作，每个信徒提升0.5%的效率。",
      Type: ItemType.ShowPanel,
    },
  ],
  [
    EnumResourceItem.People,
    {
      ID: EnumResourceItem.People,
      Name: "从众",
      Desc: "从众是一群伪信徒，他们暂时性的追随你，但你需要付出一些金钱",
      BaseMax: -1,
      TipsContent:
        "每个从众提供1点额外的影响力速度。安排从众工作，每个从众也提升0.5%的效率。从众每秒消耗自身平方的金钱",
      Type: ItemType.ShowPanel,
    },
  ],
]);

export enum EnumBuildItem {
  None,
  AddInfluence,
  AddMoney,
  AddResearch,
  InfluenceLevel1,
  MoneyLevel1,
  ResearchLevel1,
  InfulenceLevel2,
  MoneyLevel2,
  ResearchLevel2,
}

export const BuildInfoList: Map<number, IBuildInfo> = new Map([
  [
    EnumBuildItem.AddInfluence,
    {
      ID: EnumBuildItem.AddInfluence,
      Name: "街头闲聊",
      Desc: "在街边闲聊，宣传ACG文化的坏处，扩大你的影响力。点击获得1点影响力",
      Type: ItemType.AutoUnLock,
      cityName: 0,
      OnClickType: BuildClickType.AddInfluence,
      UpgradeCostRatio: 0,
      Require:EnumResearchItem.None,
      UpgradeCostPower:0,
    },
  ],
  [
    EnumBuildItem.AddMoney,
    {
      ID: EnumBuildItem.AddMoney,
      Name: "家教服务",
      Desc: "为小镇居民提供家教服务，收取不菲的酬劳。点击获得2点金钱",
      Type: ItemType.None,
      cityName: 0,
      OnClickType: BuildClickType.AddMoeny,
      UpgradeCostRatio: 0,
      UpgradeCostPower:0,
      Require:EnumResearchItem.None,
    },
  ],
  [
    EnumBuildItem.AddResearch,
    {
      ID: EnumBuildItem.AddResearch,
      Name: "买漫画书",
      Desc: "在业余时间你了解动漫知识，为伟大的计划奠定良好的基础。消耗5点金钱获得1点动漫知识",
      Type: ItemType.None,
      cityName: 0,
      OnClickType: BuildClickType.AddResearch,
      UpgradeCostRatio: 0,
      UpgradeCostPower:0,
      Require:EnumResearchItem.None,
    },
  ],
  [
    EnumBuildItem.InfluenceLevel1,
    {
      ID: EnumBuildItem.InfluenceLevel1,
      Name: "心理诊所",
      Desc: "",
      Type: ItemType.None,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 1.5,
      UpgradeCostPower:3,
      Require:EnumResearchItem.BelieverBuildLevel1,
    },
  ],
  [
    EnumBuildItem.MoneyLevel1,
    {
      ID: EnumBuildItem.MoneyLevel1,
      Name: "印刷店",
      Desc: "",
      Type: ItemType.None,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 3,
      UpgradeCostPower:2,
      Require:EnumResearchItem.MoneyBuildLevel1,
    },
  ],
  [
    EnumBuildItem.ResearchLevel1,
    {
      ID: EnumBuildItem.ResearchLevel1,
      Name: "书店",
      Desc: "",
      Type: ItemType.None,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 2.5,
      UpgradeCostPower:2.5,
      Require:EnumResearchItem.ResearchBuildLevel1,
    },
  ],
  [
    EnumBuildItem.InfulenceLevel2,
    {
      ID: EnumBuildItem.InfulenceLevel2,
      Name: "网瘾治疗中心",
      Desc: "",
      Type: ItemType.None,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 4,
      UpgradeCostPower:3.05,
      Require:EnumResearchItem.BelieverBuildLevel2,
    },
  ],
  [
    EnumBuildItem.MoneyLevel2,
    {
      ID: EnumBuildItem.MoneyLevel2,
      Name: "广告公司",
      Desc: "",
      Type: ItemType.None,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 6,
      UpgradeCostPower:2.2,
      Require:EnumResearchItem.MoneyBuildLevel2,
    },
  ],
  [
    EnumBuildItem.ResearchLevel2,
    {
      ID: EnumBuildItem.ResearchLevel2,
      Name: "运营公司",
      Desc: "",
      Type: ItemType.None,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 5,
      UpgradeCostPower:2.7,
      Require:EnumResearchItem.ResearchBuildLevel2,
    },
  ],
]);



export const ResearchInfoList: Map<number, IResearchInfo> = new Map([
  [
    EnumResearchItem.InfluenceMoneyLevel1,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel1,
      Name: "流量引导",
      Desc: "I研究",
      Cost1: 20,
      Cost2: 0,
      UnLock: [EnumResearchItem.BelieverBuildLevel1],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceMoney, 0.01]]),
    },
  ],
  [
    EnumResearchItem.BelieverBuildLevel1,
    {
      ID: EnumResearchItem.BelieverBuildLevel1,
      Name: "心理诊所",
      Desc: "I研究",
      Cost1: 50,
      Cost2: 0,
      UnLock: [
        EnumResearchItem.MoneyBuildLevel1,
        EnumResearchItem.ResearchBuildLevel1,
      ],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.MoneyBuildLevel1,
    {
      ID: EnumResearchItem.MoneyBuildLevel1,
      Name: "印刷店",
      Desc: "I研究",
      Cost1: 100,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.1]]),
    },
  ],
  [
    EnumResearchItem.ResearchBuildLevel1,
    {
      ID: EnumResearchItem.ResearchBuildLevel1,
      Name: "书店",
      Desc: "I研究",
      Cost1: 200,
      Cost2: 0,
      UnLock: [
        EnumResearchItem.BelieverInfluenceMax1,
        EnumResearchItem.InfluenceMoneyLevel2,
        EnumResearchItem.BelieverBuildLevel2,
      ],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.Cost1Ratio, 0.1]]),
    },
  ],
  [
    EnumResearchItem.BelieverInfluenceMax1,
    {
      ID: EnumResearchItem.BelieverInfluenceMax1,
      Name: "虔诚信徒",
      Desc: "I研究",
      Cost1: 500,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.BelieverAddInfluenceMax, 100]]),
    },
  ],
  [
    EnumResearchItem.InfluenceMoneyLevel2,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel2,
      Name: "流量变现",
      Desc: "I研究",
      Cost1: 500,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceMoney, 0.05]]),
    },
  ],
  [
    EnumResearchItem.BelieverBuildLevel2,
    {
      ID: EnumResearchItem.BelieverBuildLevel2,
      Name: "网瘾治疗中心",
      Desc: "I研究",
      Cost1: 2000,
      Cost2: 0,
      UnLock: [
        EnumResearchItem.MoneyBuildLevel2,
        EnumResearchItem.ResearchBuildLevel2,
      ],
      Condition: 10000,
    },
  ],
  [
    EnumResearchItem.MoneyBuildLevel2,
    {
      ID: EnumResearchItem.MoneyBuildLevel2,
      Name: "广告公司",
      Desc: "I研究",
      Cost1: 4000,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.2]]),
    },
  ],
  [
    EnumResearchItem.ResearchBuildLevel2,
    {
      ID: EnumResearchItem.ResearchBuildLevel2,
      Name: "运营中心",
      Desc: "I研究",
      Cost1: 8000,
      Cost2: 0,
      UnLock: [
        EnumResearchItem.InfluenceMoneyLevel3,
        EnumResearchItem.BelieverInfluenceMax2,
      ],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.Cost2Ratio, 0.1]]),
    },
  ],
  [
    EnumResearchItem.InfluenceMoneyLevel3,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel3,
      Name: "精准投放",
      Desc: "I研究",
      Cost1: 10000,
      Cost2: 1000,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceMoney, 0.1]]),
    },
  ],
  [
    EnumResearchItem.BelieverInfluenceMax2,
    {
      ID: EnumResearchItem.BelieverInfluenceMax2,
      Name: "狂热信徒",
      Desc: "I研究",
      Cost1: 10000,
      Cost2: 2000,
      UnLock: [
        EnumResearchItem.BelieverBuildCost1,
        EnumResearchItem.MoneyBuildCost1,
        EnumResearchItem.ResearchBuildCost1,
        EnumResearchItem.ComplainUnLock,
      ],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.BelieverAddInfluenceMax, 500]]),
    },
  ],
  [
    EnumResearchItem.BelieverBuildCost1,
    {
      ID: EnumResearchItem.BelieverBuildCost1,
      Name: "地方扶持教育",
      Desc: "I研究",
      Cost1: 10000,
      Cost2: 5000,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceBuildCost, 0.1]]),
    },
  ],
  [
    EnumResearchItem.MoneyBuildCost1,
    {
      ID: EnumResearchItem.MoneyBuildCost1,
      Name: "地方扶持发展",
      Desc: "I研究",
      Cost1: 10000,
      Cost2: 5000,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.MoneyBuildCost, 0.1]]),
    },
  ],
  [
    EnumResearchItem.ResearchBuildCost1,
    {
      ID: EnumResearchItem.ResearchBuildCost1,
      Name: "地方扶持文化",
      Desc: "I研究",
      Cost1: 10000,
      Cost2: 5000,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.ResearchBuildCost, 0.1]]),
    },
  ],
  [
    EnumResearchItem.ComplainUnLock,
    {
      ID: EnumResearchItem.ComplainUnLock,
      Name: "举报",
      Desc: "I研究",
      Cost1: 20000,
      Cost2: 20000,
      UnLock: [],
      Condition: 0,
    },
  ],
]);

export enum EnumWorkType {
  InfluenceWork,
  MoneyWork,
  Cost1Work,
  Cost2Work,
}
/**
 * 工作默认信息，map索引从1开始
 */
export const WorkInfoList: Map<number, IWorkInfo> = new Map([
  [
    EnumWorkType.InfluenceWork,
    {
      ID: EnumWorkType.InfluenceWork,
      Name: "扩大影响力",
      Desc: "每个信徒/从众提升1点影响力每秒",
    },
  ],
  [
    EnumWorkType.MoneyWork,
    {
      ID: EnumWorkType.MoneyWork,
      Name: "赚取金钱",
      Desc: "每个信徒/从众提升2点金钱每秒",
    },
  ],
  [
    EnumWorkType.Cost1Work,
    {
      ID: EnumWorkType.Cost1Work,
      Name: "研究动漫",
      Desc: "每个信徒/从众消耗2点金钱，提升1点动漫知识每秒。（提升效率后消耗同比增加）",
    },
  ],
  [
    EnumWorkType.Cost2Work,
    {
      ID: EnumWorkType.Cost2Work,
      Name: "研究游戏",
      Desc: "每个信徒/从众消耗10点金钱，提升1点游戏知识每秒。（提升效率后消耗同比增加）",
    },
  ],
]);
