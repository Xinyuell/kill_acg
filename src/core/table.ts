export enum ItemType {
  None = 0,
  ShowPanel = 1 << 0,
  Research = 1 << 1,
  AutoUnLock = 1 << 2,
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
  cityName: number;
  OnClickType: BuildClickType;
  UpgradeCostRatio: number;
}

export interface IResearchInfo extends IBaseInfo {
  Cost1: number;
  Cost2: number;
  UnLock: number[];
}

export enum EnumResourceItem{
  None,
  Influence,
  Money,
  Cost1,
  Cost2,
  Believer,
  People
}

export const ItemInfoList: Map<number, IItemInfo> = new Map([
  [
    EnumResourceItem.Influence,
    {
      ID: EnumResourceItem.Influence,
      Name: "影响力",
      Desc: "你对这个社会的影响力，很多事情都需要扩大影响力之后才能办到",
      TipsContent: "每10点影响力获得1点金钱每秒",
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
      TipsContent: "每个信徒提供1点基础的影响力速度，受各项研究和建筑的加成。安排信徒工作，每个信徒提升0.5%的效率。",
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
      TipsContent: "每个从众提供1点额外的影响力速度。安排从众工作，每个从众也提升0.5%的效率。从众每秒消耗自身平方的金钱",
      Type: ItemType.ShowPanel,
    },
  ],
  
]);

export const BuildInfoList: Map<number, IBuildInfo> = new Map([
  [
    1,
    {
      ID: 1,
      Name: "街头闲聊",
      Desc: "在街边闲聊，宣传ACG文化的坏处，扩大你的影响力。点击获得1点影响力",
      Type: ItemType.AutoUnLock,
      cityName: 0,
      OnClickType: BuildClickType.AddInfluence,
      UpgradeCostRatio: 0,
    },
  ],
  [
    2,
    {
      ID: 2,
      Name: "家教服务",
      Desc: "为小镇居民提供家教服务，收取不菲的酬劳。点击获得2点金钱",
      Type: ItemType.None,
      cityName: 0,
      OnClickType: BuildClickType.AddMoeny,
      UpgradeCostRatio: 0,
    },
  ],
  [
    3,
    {
      ID: 3,
      Name: "了解动漫",
      Desc: "在业余时间你了解动漫知识，为伟大的计划奠定良好的基础。消耗2点金钱获得1点动漫知识",
      Type: ItemType.None,
      cityName: 0,
      OnClickType: BuildClickType.AddResearch,
      UpgradeCostRatio: 0,
    },
  ],
]);

export const ResearchInfoList: Map<number, IResearchInfo> = new Map([
  [
    1,
    {
      ID: 1,
      Name: "研究1",
      Desc: "I研究",
      Cost1: 50,
      Cost2: 0,
      UnLock: [2,3],
    },
  ],
  [
    2,
    {
      ID: 2,
      Name: "研究2",
      Desc: "I研究",
      Cost1: 50,
      Cost2: 0,
      UnLock: [4],
    },
  ],
  [
    3,
    {
      ID: 3,
      Name: "研究3",
      Desc: "I研究",
      Cost1: 50,
      Cost2: 0,
      UnLock: [],
    },
  ],
  [
    4,
    {
      ID: 4,
      Name: "研究4",
      Desc: "I研究",
      Cost1: 50,
      Cost2: 0,
      UnLock: [],
    },
  ],
]);
