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
  Condition: number[];
}

export const ItemInfoList: Map<number, IItemInfo> = new Map([
  [
    1,
    {
      ID: 1,
      Name: "影响力",
      Desc: "你对这个社会的影响力，很多事情都需要扩大影响力之后才能办到。",
      TipsContent: "影响力达到一万点后，会带来少量的金钱速度",
      BaseMax: 100,
      Type: ItemType.ShowPanel | ItemType.AutoUnLock,
    },
  ],
  [
    2,
    {
      ID: 2,
      Name: "金钱",
      Desc: "钱不是目的，只是手段，金钱对你来说如同粪土",
      TipsContent: "你只是为了消灭ACG文化才收集了一点点钱",
      BaseMax: -1,
      Type: ItemType.ShowPanel,
    },
  ],
  [
    3,
    {
      ID: 3,
      Name: "动漫知识",
      Desc: "知己知彼百战百胜，我不入地狱谁入地狱。这是一种研究资源",
      TipsContent: "这是一种研究资源",
      BaseMax: -1,
      Type: ItemType.ShowPanel | ItemType.Research,
    },
  ],
  [
    4,
    {
      ID: 4,
      Name: "游戏知识",
      Desc: "知己知彼百战百胜，我不入地狱谁入地狱。",
      BaseMax: -1,
      TipsContent: "这是一种研究资源",
      Type: ItemType.ShowPanel | ItemType.Research,
    },
  ],
  [
    5,
    {
      ID: 5,
      Name: "信徒",
      Desc: "信徒是一群彻底追随你消灭ACG的助手，会帮你扩大影响力，根据科技水平提升影响上限。",
      BaseMax: -1,
      TipsContent: "这是一种研究资源",
      Type: ItemType.ShowPanel,
    },
  ],
  [
    6,
    {
      ID: 6,
      Name: "从众",
      Desc: "从众是一群伪信徒",
      BaseMax: -1,
      TipsContent: "这是一种研究资源",
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
      Desc: "在街边闲聊，宣传ACG文化的坏处，扩大你的影响力。",
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
      Desc: "为小镇居民提供家教服务，收取不菲的酬劳，还能借机打击ACG文化，何乐而不为呢。",
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
      Desc: "在业余时间你了解动漫知识，为伟大的计划奠定良好的基础",
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
      Condition: [],
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
      Condition: [1],
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
      Condition: [2],
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
      Condition: [2],
    },
  ],
]);
