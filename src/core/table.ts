export const GlobalConfig = {
  /**
   * 每次点击获得资源基础值
   */
  ClickAddBase: import.meta.env.DEV ? 1000 : 1,
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
   * 基础的出生率0.05
   */
  BaseBelieverRatio: import.meta.env.DEV ? 1 : 0.05,
  /**
   * 信徒满人数后，从众的额外出生率倍率
   */
  PeopleBelieverMaxRatio: 2,
  /**
   * 全局建筑基础消耗10
   */
  BuildUpgradeBase: import.meta.env.DEV ? 0.1 : 5,
  /**
   * 游戏时间,找一个有意义时间
   */
  StartData: Date.UTC(2016, 6, 1),
  /**
   * 自动存档时间
   */
  SaveTime: 30000,
  /**
   * 刷新毫秒数,每秒20帧
   */
  UpdateTime: 50,
  /**
   * 虚拟时间放大倍数，1秒=1天
   */
  VrtulTimeRatio: 86400,
  /**
   * acg进度的上限，100亿
   */
  AcgProgressMax: 10000000000,
  /**
   * acg进度的基础值，1千万
   */
  AcgProgressBae: 100000000,
  /**
   * acg进度的速度，2百万
   */
  AcgProgressSpeed: import.meta.env.DEV ? 20000000 : 2000000,
  /**
   * 举报失败降低影响力百分比
   */
  ComplainWrongValueRatio: 0.05,
  /**
   * 1级举报降低ACG影响力
   */
  ComplainAcgLevel1: import.meta.env.DEV ? 200000000 : 10000,
  /**
   * 2级举报降低ACG影响力
   */
  ComplainAcgLevel2: import.meta.env.DEV ? 200000000 : 50000,
  /**
   * 3级举报降低ACG影响力
   */
  ComplainAcgLevel3: import.meta.env.DEV ? 200000000 : 200000,
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
  Require: EnumResearchItem;
  /**提供属性，乘以数量 */
  ResearchProp: Map<EnumResearchProp, number>;
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

export interface IWorkInfo extends IBaseInfo {
  Type?: ItemType;
}

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
  /**
   * 信徒自动举报国外
   */
  AutoComplainLevel1,
  /**
   * 信徒自动举报外太空
   */
  AutoComplainLevel2,
  /**
   * 信徒自动举报错误率降低50%
   */
  AutoComplainWrongLevel1,
  /**
   * 信徒自动举报不会进行错误举报了
   */
  AutoComplainWrongLevel2,
}

/**
 * 科技增加的资源属性
 */
export enum EnumResearchProp {
  /**
   * 影响力转化金钱百分比
   */
  InfluenceMoney,
  /**
   * 信徒增加影响力上限
   */
  BelieverAddInfluenceMax,
  /**
   * 影响力类型的建筑成本蠕变
   */
  InfluenceBuildCost,
  /**
   * 金钱类型的建筑成本蠕变
   */
  MoneyBuildCost,
  /**
   * 研究类型的建筑成本蠕变
   */
  ResearchBuildCost,
  /**
   * 提升工人金钱效率
   */
  MoneyRatio,
  /**
   * 提升工人漫画知识效率
   */
  Cost1Ratio,
  /**
   * 提升工人游戏知识效率
   */
  Cost2Ratio,
  /**
   * 信徒的上限
   */
  BelieverMax,
  /**
   * 从众的上限
   */
  PeopleMax,
}

export const ItemInfoList: Map<number, IItemInfo> = new Map([
  [
    EnumResourceItem.Influence,
    {
      ID: EnumResourceItem.Influence,
      Name: "影响力",
      Desc: "你对这个社会的影响力，很多事情都需要扩大影响力之后才能办到。\n影响力解锁游戏进程，通过各种研究提高影响力上限",
      TipsContent: "",
      BaseMax: 100,
      Type: ItemType.ShowPanel | ItemType.AutoUnLock,
    },
  ],
  [
    EnumResourceItem.Money,
    {
      ID: EnumResourceItem.Money,
      Name: "金钱",
      Desc: "钱不是目的，只是手段，金钱对你来说如同粪土。\n你只是为了消灭ACG文化才收集了一点点钱",
      TipsContent: "",
      BaseMax: -1,
      Type: ItemType.ShowPanel,
    },
  ],
  [
    EnumResourceItem.Cost1,
    {
      ID: EnumResourceItem.Cost1,
      Name: "动漫知识",
      Desc: "知己知彼百战百胜，我不入地狱谁入地狱。\n每2点金钱转化1点动漫知识，需要买漫画书或者安排信徒研究\n在研究分页解锁各项研究",
      TipsContent: "",
      BaseMax: -1,
      Type: ItemType.ShowPanel | ItemType.Research,
    },
  ],
  [
    EnumResourceItem.Cost2,
    {
      ID: EnumResourceItem.Cost2,
      Name: "游戏知识",
      Desc: "游戏的荼毒更深，所以需要更多的氪金才能获得游戏知识。\n每10点金钱转化1点动漫知识，仅靠信徒研究获得\n在研究分页解锁各项研究",
      BaseMax: -1,
      TipsContent: "",
      Type: ItemType.ShowPanel | ItemType.Research,
    },
  ],
  [
    EnumResourceItem.Believer,
    {
      ID: EnumResourceItem.Believer,
      Name: "信徒",
      Desc: "信徒是一群彻底追随你消灭ACG的助手，会帮你扩大影响力。\n每个信徒提供1点影响力、2点金钱或1点动漫/游戏知识，且研究会按比例消耗金钱，可通过各种建筑提升效率\n信徒的增长速度和自身的人数相关，由于聚众效应，人越多增长越快",
      BaseMax: 10,
      TipsContent: "",
      Type: ItemType.ShowPanel,
    },
  ],
  [
    EnumResourceItem.People,
    {
      ID: EnumResourceItem.People,
      Name: "从众",
      Desc: "从众是一群伪信徒，他们暂时性的追随你，但你需要付出一些金钱。\n从众与信徒工作能力一样，但每人消耗1点金钱。\n从众和信徒的增长速度一样，信徒达到上限后，从众增加速度翻倍。",
      BaseMax: 10,
      TipsContent: "",
      Type: ItemType.ShowPanel,
    },
  ],
]);

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
}

export const BuildInfoList: Map<number, IBuildInfo> = new Map([
  [
    EnumBuildItem.AddInfluence,
    {
      ID: EnumBuildItem.AddInfluence,
      Name: "街头闲聊",
      Desc: "点击获得1点影响力\n在街边闲聊，宣传ACG文化的坏处，扩大你的影响力",
      Type: ItemType.AutoUnLock,
      cityName: 0,
      OnClickType: BuildClickType.AddInfluence,
      UpgradeCostRatio: 0,
      Require: EnumResearchItem.None,
      UpgradeCostPower: 0,
      ResearchProp: new Map(),
    },
  ],
  [
    EnumBuildItem.AddMoney,
    {
      ID: EnumBuildItem.AddMoney,
      Name: "家教服务",
      Desc: "点击获得2点金钱\n为小镇居民提供家教服务，收取不菲的酬劳",
      Type: ItemType.None,
      cityName: 0,
      OnClickType: BuildClickType.AddMoeny,
      UpgradeCostRatio: 0,
      UpgradeCostPower: 0,
      Require: EnumResearchItem.None,
      ResearchProp: new Map(),
    },
  ],
  [
    EnumBuildItem.AddResearch,
    {
      ID: EnumBuildItem.AddResearch,
      Name: "买漫画书",
      Desc: "点击获得1点动漫知识（消耗2点金钱）\n在业余时间你了解动漫知识，为伟大的计划奠定良好的基础",
      Type: ItemType.None,
      cityName: 0,
      OnClickType: BuildClickType.AddResearch,
      UpgradeCostRatio: 0,
      UpgradeCostPower: 0,
      Require: EnumResearchItem.None,
      ResearchProp: new Map(),
    },
  ],
  [
    EnumBuildItem.InfluenceLevel1,
    {
      ID: EnumBuildItem.InfluenceLevel1,
      Name: "心理诊所",
      Desc: "拯救心理问题的ACG青年，信徒上限+10",
      Type: ItemType.None,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 3,
      UpgradeCostPower: 2,
      Require: EnumResearchItem.BelieverBuildLevel1,
      ResearchProp: new Map([[EnumResearchProp.BelieverMax, 10]]),
    },
  ],
  [
    EnumBuildItem.MoneyLevel1,
    {
      ID: EnumBuildItem.MoneyLevel1,
      Name: "印刷店",
      Desc: "帮助你宣传的同时赚一点钱，信徒金钱工作效率+10%",
      Type: ItemType.None,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 4,
      UpgradeCostPower: 2,
      Require: EnumResearchItem.MoneyBuildLevel1,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.1]]),
    },
  ],
  [
    EnumBuildItem.ResearchLevel1,
    {
      ID: EnumBuildItem.ResearchLevel1,
      Name: "书店",
      Desc: "在书店研究漫画知识更快，信徒研究动漫知识效率+10%",
      Type: ItemType.None,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 4,
      UpgradeCostPower: 2.2,
      Require: EnumResearchItem.ResearchBuildLevel1,
      ResearchProp: new Map([[EnumResearchProp.Cost1Ratio, 0.1]]),
    },
  ],
  [
    EnumBuildItem.InfulenceLevel2,
    {
      ID: EnumBuildItem.InfulenceLevel2,
      Name: "网瘾治疗中心",
      Desc: "一种电疗实验，从众上限+100",
      Type: ItemType.None,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 6,
      UpgradeCostPower: 2.05,
      Require: EnumResearchItem.BelieverBuildLevel2,
      ResearchProp: new Map([[EnumResearchProp.PeopleMax, 100]]),
    },
  ],
  [
    EnumBuildItem.MoneyLevel2,
    {
      ID: EnumBuildItem.MoneyLevel2,
      Name: "广告公司",
      Desc: "宣传你的思想，同时获得了不菲收益。信徒金钱工作效率+20%",
      Type: ItemType.None,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 8,
      UpgradeCostPower: 2.05,
      Require: EnumResearchItem.MoneyBuildLevel2,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.2]]),
    },
  ],
  [
    EnumBuildItem.ResearchLevel2,
    {
      ID: EnumBuildItem.ResearchLevel2,
      Name: "运营公司",
      Desc: "运营一些游戏再偷偷搞垮它们，获得了不少游戏的知识。信徒研究游戏知识效率+5%",
      Type: ItemType.None,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 8,
      UpgradeCostPower: 2.1,
      Require: EnumResearchItem.ResearchBuildLevel2,
      ResearchProp: new Map([[EnumResearchProp.Cost2Ratio, 0.05]]),
    },
  ],
]);

export const ResearchInfoList: Map<number, IResearchInfo> = new Map([
  [
    EnumResearchItem.InfluenceMoneyLevel1,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel1,
      Name: "流量引导",
      Desc: "消耗20点动漫知识。影响力有了，钱就有了。每1点影响力获得0.01点的金钱速度。",
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
      Desc: "消耗50点动漫知识。解锁心理诊所建筑。这将解锁信徒这种重要资源",
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
      Desc: "消耗100点动漫知识。解锁印刷店建筑，这将有助于信徒金钱工作的效率。",
      Cost1: 100,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.ResearchBuildLevel1,
    {
      ID: EnumResearchItem.ResearchBuildLevel1,
      Name: "书店",
      Desc: "消耗200点动漫知识。解锁书店建筑，这将有助于信徒研究工作的效率。",
      Cost1: 200,
      Cost2: 0,
      UnLock: [
        EnumResearchItem.BelieverInfluenceMax1,
        EnumResearchItem.InfluenceMoneyLevel2,
        EnumResearchItem.BelieverBuildLevel2,
      ],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.BelieverInfluenceMax1,
    {
      ID: EnumResearchItem.BelieverInfluenceMax1,
      Name: "虔诚信徒",
      Desc: "消耗500点动漫知识。信徒更加虔诚了，消灭ACG的思想也广为流传。每个信徒提升150点影响力上限",
      Cost1: 500,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.BelieverAddInfluenceMax, 150]]),
    },
  ],
  [
    EnumResearchItem.InfluenceMoneyLevel2,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel2,
      Name: "流量变现",
      Desc: "消耗2000点动漫知识。你的影响力越高，你获得的钱就更多，每1点影响力增加额外0.05的金钱速度",
      Cost1: 2000,
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
      Desc: "进入下一级城市，需要影响力达到3000点。消耗5000点动漫知识。你来到了电力时代，解锁新的建筑，这将获得一大批从众。",
      Cost1: 5000,
      Cost2: 0,
      UnLock: [EnumResearchItem.ComplainUnLock],
      Condition: 3000,
    },
  ],
  [
    EnumResearchItem.ComplainUnLock,
    {
      ID: EnumResearchItem.ComplainUnLock,
      Name: "举报",
      Desc: "消耗10K的动漫知识。举报是一项划时代的发明，从此你可以真正打击ACG的发展了。",
      Cost1: 10000,
      Cost2: 0,
      UnLock: [
        EnumResearchItem.MoneyBuildLevel2,
        EnumResearchItem.ResearchBuildLevel2,
      ],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.MoneyBuildLevel2,
    {
      ID: EnumResearchItem.MoneyBuildLevel2,
      Name: "广告公司",
      Desc: "消耗20K点动漫知识。解锁广告公司，进一步提高信徒/从众的工作效率",
      Cost1: 20000,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.ResearchBuildLevel2,
    {
      ID: EnumResearchItem.ResearchBuildLevel2,
      Name: "运营中心",
      Desc: "消耗20K点动漫知识。解锁运营公司，进一步提高信徒/从众的研究效率",
      Cost1: 20000,
      Cost2: 0,
      Condition: 0,
      UnLock: [
        EnumResearchItem.InfluenceMoneyLevel3,
        EnumResearchItem.BelieverInfluenceMax2,
      ],
    },
  ],

  [
    EnumResearchItem.InfluenceMoneyLevel3,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel3,
      Name: "精准投放",
      Desc: "消耗50K点动漫知识和5000点游戏知识。一些人对你的思想还不感冒，你得找到合适的受众来宣传ACG的坏处。影响力额外增加0.1的金钱速度",
      Cost1: 50000,
      Cost2: 5000,
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
      Desc: "消耗100K的动漫知识和10K的游戏知识。\n狂热的信徒四处宣传ACG的坏处，每名信徒额外提升500点影响力上限\n开启自动举报的工作，可以安排信徒去自动举报了",
      Cost1: 100000,
      Cost2: 10000,
      UnLock: [
        EnumResearchItem.AutoComplainLevel1,
        EnumResearchItem.AutoComplainWrongLevel1,
      ],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.BelieverAddInfluenceMax, 500]]),
    },
  ],
  [
    EnumResearchItem.AutoComplainLevel1,
    {
      ID: EnumResearchItem.AutoComplainLevel1,
      Name: "海外信徒",
      Desc: "消耗200K的动漫知识和100K的游戏知识。\n你开始发展海外的信徒，信徒将会自动举报海外的ACG事件了。",
      Cost1: 200000,
      Cost2: 100000,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.AutoComplainWrongLevel1,
    {
      ID: EnumResearchItem.AutoComplainWrongLevel1,
      Name: "精准打击",
      Desc: "消耗200K的动漫知识和100K的游戏知识。\n降低50%信徒错误举报的概率。",
      Cost1: 200000,
      Cost2: 100000,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.AutoComplainLevel2,
    {
      ID: EnumResearchItem.AutoComplainLevel2,
      Name: "威慑银河系",
      Desc: "消耗2M的动漫知识和1M的游戏知识。\n你在整个银河系都赫赫有名，没有人敢发展ACG文化了。\n信徒将会自动举报外太空的ACG事件了",
      Cost1: 2000000,
      Cost2: 1000000,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.AutoComplainWrongLevel2,
    {
      ID: EnumResearchItem.AutoComplainWrongLevel2,
      Name: "完美打击",
      Desc: "消耗2M的动漫知识和1M的游戏知识。\n完美的打击ACG文化，再也不会有错误的举报了。",
      Cost1: 2000000,
      Cost2: 1000000,
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
  ComplainWork,
}
/**
 * 工作默认信息，map索引从1开始
 */
export const WorkInfoList: Map<number, IWorkInfo> = new Map([
  [
    EnumWorkType.InfluenceWork,
    {
      ID: EnumWorkType.InfluenceWork,
      Name: "扩大影响",
      Desc: "每个信徒/从众提升1点影响力每秒。",
      Type: ItemType.ShowPanel | ItemType.AutoUnLock,
    },
  ],
  [
    EnumWorkType.MoneyWork,
    {
      ID: EnumWorkType.MoneyWork,
      Name: "赚取金钱",
      Desc: "每个信徒/从众提升2点金钱每秒",
      Type: ItemType.ShowPanel | ItemType.AutoUnLock,
    },
  ],
  [
    EnumWorkType.Cost1Work,
    {
      ID: EnumWorkType.Cost1Work,
      Name: "研究动漫",
      Desc: "每个信徒/从众消耗2点金钱，提升1点动漫知识每秒。（提升效率后消耗同比增加）",
      Type: ItemType.ShowPanel | ItemType.AutoUnLock,
    },
  ],
  [
    EnumWorkType.Cost2Work,
    {
      ID: EnumWorkType.Cost2Work,
      Name: "研究游戏",
      Desc: "每个信徒/从众消耗10点金钱，提升1点游戏知识每秒。（提升效率后消耗同比增加）",
      Type: ItemType.ShowPanel,
    },
  ],
  [
    EnumWorkType.ComplainWork,
    {
      ID: EnumWorkType.ComplainWork,
      Name: "举报",
      Desc: "信徒/从众替你完成自动举报，人数越多举报的间隔越快。",
      Type: ItemType.ShowPanel,
    },
  ],
]);
