import * as ITableInfo from "./ITableInfo";
import * as Enum from "./Enum";

export const ItemInfoList: Map<number, ITableInfo.IItemInfo> = new Map([
  [
    Enum.EnumResourceItem.Influence,
    {
      ID: Enum.EnumResourceItem.Influence,
      Name: "影响力",
      Desc: "当前影响力等级：{0}级，每单位工作基础值为1\n影响力解锁游戏进程",
      TipsContent: "",
      BaseMax: 100,
      Type:  Enum.ItemType.AutoUnLock,
    },
  ],
  [
    Enum.EnumResourceItem.Money,
    {
      ID: Enum.EnumResourceItem.Money,
      Name: "金钱",
      Desc: "当前金钱收集效率：{0}%，每单位工作基础值为2\n你只是为了消灭ACG文化才收集了一点点钱",
      TipsContent: "",
      BaseMax: -1,
      Type: Enum.ItemType.None,
    },
  ],
  [
    Enum.EnumResourceItem.Cost1,
    {
      ID: Enum.EnumResourceItem.Cost1,
      Name: "动漫知识",
      Desc: "当前动漫知识研究效率：{0}%，每单位工作基础值为1\n每转化1点动漫知识需要消耗2点金钱",
      TipsContent: "",
      BaseMax: -1,
      Type: Enum.ItemType.Research,
    },
  ],
  [
    Enum.EnumResourceItem.Cost2,
    {
      ID: Enum.EnumResourceItem.Cost2,
      Name: "游戏知识",
      Desc: "当前游戏知识研究效率：{0}%，每单位工作基础值为1\n每转化1点游戏知识需要消耗10点金钱\n游戏的荼毒更深，所以需要更多的氪金才能获得",
      BaseMax: -1,
      TipsContent: "",
      Type: Enum.ItemType.Research,
    },
  ],
  [
    Enum.EnumResourceItem.Believer,
    {
      ID: Enum.EnumResourceItem.Believer,
      Name: "信徒",
      Desc: "安排信徒工作，提供工作基础值\n信徒的增长速度和自身的人数相关，由于聚众效应，人越多增长越快",
      BaseMax: 10,
      TipsContent: "",
      Type: Enum.ItemType.AutoUnLock,
    },
  ],
  [
    Enum.EnumResourceItem.People,
    {
      ID: Enum.EnumResourceItem.People,
      Name: "从众",
      Desc: "按排信徒工作，提供工作基础值，并额外消耗{0}点金钱每人\n从众和信徒的增长速度一样，信徒达到上限后，从众增加速度翻倍。",
      BaseMax: 10,
      TipsContent: "",
      Type: Enum.ItemType.AutoUnLock,
    },
  ],
  [
    Enum.EnumResourceItem.Policy,
    {
      ID: Enum.EnumResourceItem.Policy,
      Name: "政策点",
      Desc: "当前政策点获取效率：{0}%，每单位工作基础值为0.1\n每1点政策点需要消耗10点金钱、动漫和游戏知识\n颁布新政除了消耗政策点，你还需要有一定的政治背景才能推行。",
      BaseMax: -1,
      TipsContent: "",
      Type: Enum.ItemType.AutoUnLock,
    },
  ],
  [
    Enum.EnumResourceItem.Political,
    {
      ID: Enum.EnumResourceItem.Political,
      Name: "政治背景",
      Desc: "提高全局资源的速度，当前全局效率提升{0}%\n这是一种重置资源，在政治分页重置游戏获得，获得数量与信徒数量相关\n当前重置游戏将获得{1}点资源",
      BaseMax: +1,
      TipsContent: "",
      Type: Enum.ItemType.AutoUnLock,
      
    },
  ],
]);

export const BuildInfoList: Map<number, ITableInfo.IBuildInfo> = new Map([
  [
    Enum.EnumBuildItem.AddInfluence,
    {
      ID: Enum.EnumBuildItem.AddInfluence,
      Name: "街头闲聊",
      Desc: "点击获得1点影响力\n在街边闲聊，宣传ACG文化的坏处，扩大你的影响力",
      Type: Enum.ItemType.AutoUnLock,
      cityName: 0,
      OnClickType: Enum.BuildClickType.AddInfluence,
      UpgradeCostRatio: 0,
      Require: Enum.EnumResearchItem.None,
      UpgradeCostPower: 0,
      ResearchProp: new Map(),
    },
  ],
  [
    Enum.EnumBuildItem.AddMoney,
    {
      ID: Enum.EnumBuildItem.AddMoney,
      Name: "家教服务",
      Desc: "点击获得2点金钱\n为小镇居民提供家教服务，收取不菲的酬劳",
      Type: Enum.ItemType.None,
      cityName: 0,
      OnClickType: Enum.BuildClickType.AddMoeny,
      UpgradeCostRatio: 0,
      UpgradeCostPower: 0,
      Require: Enum.EnumResearchItem.None,
      ResearchProp: new Map(),
    },
  ],
  [
    Enum.EnumBuildItem.AddResearch,
    {
      ID: Enum.EnumBuildItem.AddResearch,
      Name: "买漫画书",
      Desc: "点击获得1点动漫知识（消耗2点金钱）\n在业余时间你了解动漫知识，为伟大的计划奠定良好的基础",
      Type: Enum.ItemType.None,
      cityName: 0,
      OnClickType: Enum.BuildClickType.AddResearch,
      UpgradeCostRatio: 0,
      UpgradeCostPower: 0,
      Require: Enum.EnumResearchItem.None,
      ResearchProp: new Map(),
    },
  ],
  [
    Enum.EnumBuildItem.InfluenceLevel1,
    {
      ID: Enum.EnumBuildItem.InfluenceLevel1,
      Name: "心理诊所",
      Desc: "拯救心理问题的ACG青年，信徒上限+10",
      Type: Enum.ItemType.None,
      cityName: 1,
      OnClickType: Enum.BuildClickType.Upgrade,
      UpgradeCostRatio: 3,
      UpgradeCostPower: 2,
      Require: Enum.EnumResearchItem.BelieverBuildLevel1,
      ResearchProp: new Map([[Enum.EnumResearchProp.BelieverMax, 10]]),
    },
  ],
  [
    Enum.EnumBuildItem.MoneyLevel1,
    {
      ID: Enum.EnumBuildItem.MoneyLevel1,
      Name: "印刷店",
      Desc: "帮助你宣传的同时赚一点钱，信徒金钱工作效率+10%",
      Type: Enum.ItemType.None,
      cityName: 1,
      OnClickType: Enum.BuildClickType.Upgrade,
      UpgradeCostRatio: 4,
      UpgradeCostPower: 2,
      Require: Enum.EnumResearchItem.MoneyBuildLevel1,
      ResearchProp: new Map([[Enum.EnumResearchProp.MoneyRatio, 0.1]]),
    },
  ],
  [
    Enum.EnumBuildItem.ResearchLevel1,
    {
      ID: Enum.EnumBuildItem.ResearchLevel1,
      Name: "书店",
      Desc: "在书店研究漫画知识更快，信徒研究动漫知识效率+10%",
      Type: Enum.ItemType.None,
      cityName: 1,
      OnClickType: Enum.BuildClickType.Upgrade,
      UpgradeCostRatio: 4,
      UpgradeCostPower: 2.2,
      Require: Enum.EnumResearchItem.ResearchBuildLevel1,
      ResearchProp: new Map([[Enum.EnumResearchProp.Cost1Ratio, 0.1]]),
    },
  ],
  [
    Enum.EnumBuildItem.InfulenceLevel2,
    {
      ID: Enum.EnumBuildItem.InfulenceLevel2,
      Name: "网瘾治疗中心",
      Desc: "一种电疗实验，从众上限+100",
      Type: Enum.ItemType.None,
      cityName: 2,
      OnClickType: Enum.BuildClickType.Upgrade,
      UpgradeCostRatio: 6,
      UpgradeCostPower: 2.05,
      Require: Enum.EnumResearchItem.BelieverBuildLevel2,
      ResearchProp: new Map([[Enum.EnumResearchProp.PeopleMax, 100]]),
    },
  ],
  [
    Enum.EnumBuildItem.MoneyLevel2,
    {
      ID: Enum.EnumBuildItem.MoneyLevel2,
      Name: "广告公司",
      Desc: "宣传你的思想，同时获得了不菲收益。信徒金钱工作效率+20%",
      Type: Enum.ItemType.None,
      cityName: 2,
      OnClickType: Enum.BuildClickType.Upgrade,
      UpgradeCostRatio: 8,
      UpgradeCostPower: 2.05,
      Require: Enum.EnumResearchItem.MoneyBuildLevel2,
      ResearchProp: new Map([[Enum.EnumResearchProp.MoneyRatio, 0.2]]),
    },
  ],
  [
    Enum.EnumBuildItem.ResearchLevel2,
    {
      ID: Enum.EnumBuildItem.ResearchLevel2,
      Name: "运营公司",
      Desc: "运营一些游戏再偷偷搞垮它们，获得了不少游戏的知识。信徒研究游戏知识效率+5%",
      Type: Enum.ItemType.None,
      cityName: 2,
      OnClickType: Enum.BuildClickType.Upgrade,
      UpgradeCostRatio: 8,
      UpgradeCostPower: 2.1,
      Require: Enum.EnumResearchItem.ResearchBuildLevel2,
      ResearchProp: new Map([[Enum.EnumResearchProp.Cost2Ratio, 0.05]]),
    },
  ],
]);

export const ResearchInfoList: Map<number, ITableInfo.IResearchInfo> = new Map([
  [
    Enum.EnumResearchItem.InfluenceMoneyLevel1,
    {
      ID: Enum.EnumResearchItem.InfluenceMoneyLevel1,
      Name: "流量引导",
      Desc: "消耗20点动漫知识。影响力有了，钱就有了。每1点影响力获得0.01点的金钱速度。",
      Cost1: 20,
      Cost2: 0,
      UnLock: [Enum.EnumResearchItem.BelieverBuildLevel1],
      Condition: 0,
      ResearchProp: new Map([[Enum.EnumResearchProp.InfluenceMoney, 0.01]]),
    },
  ],
  [
    Enum.EnumResearchItem.BelieverBuildLevel1,
    {
      ID: Enum.EnumResearchItem.BelieverBuildLevel1,
      Name: "心理诊所",
      Desc: "消耗50点动漫知识。解锁心理诊所建筑。这将解锁信徒这种重要资源",
      Cost1: 50,
      Cost2: 0,
      UnLock: [
        Enum.EnumResearchItem.MoneyBuildLevel1,
        Enum.EnumResearchItem.ResearchBuildLevel1,
      ],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.MoneyBuildLevel1,
    {
      ID: Enum.EnumResearchItem.MoneyBuildLevel1,
      Name: "印刷店",
      Desc: "消耗100点动漫知识。解锁印刷店建筑，这将有助于信徒金钱工作的效率。",
      Cost1: 100,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.ResearchBuildLevel1,
    {
      ID: Enum.EnumResearchItem.ResearchBuildLevel1,
      Name: "书店",
      Desc: "消耗200点动漫知识。解锁书店建筑，这将有助于信徒研究工作的效率。",
      Cost1: 200,
      Cost2: 0,
      UnLock: [
        Enum.EnumResearchItem.BelieverInfluenceMax1,
        Enum.EnumResearchItem.InfluenceMoneyLevel2,
        Enum.EnumResearchItem.BelieverBuildLevel2,
      ],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.BelieverInfluenceMax1,
    {
      ID: Enum.EnumResearchItem.BelieverInfluenceMax1,
      Name: "虔诚信徒",
      Desc: "消耗500点动漫知识。信徒更加虔诚了，消灭ACG的思想也广为流传。每个信徒提升150点影响力上限",
      Cost1: 500,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[Enum.EnumResearchProp.BelieverAddInfluenceMax, 150]]),
    },
  ],
  [
    Enum.EnumResearchItem.InfluenceMoneyLevel2,
    {
      ID: Enum.EnumResearchItem.InfluenceMoneyLevel2,
      Name: "流量变现",
      Desc: "消耗2000点动漫知识。你的影响力越高，你获得的钱就更多，每1点影响力增加额外0.05的金钱速度",
      Cost1: 2000,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[Enum.EnumResearchProp.InfluenceMoney, 0.05]]),
    },
  ],
  [
    Enum.EnumResearchItem.BelieverBuildLevel2,
    {
      ID: Enum.EnumResearchItem.BelieverBuildLevel2,
      Name: "网瘾治疗中心",
      Desc: "进入下一级城市，需要影响力达到3000点。消耗5000点动漫知识。你来到了电力时代，解锁新的建筑，这将获得一大批从众。",
      Cost1: 5000,
      Cost2: 0,
      UnLock: [Enum.EnumResearchItem.ComplainUnLock],
      Condition: 3000,
    },
  ],
  [
    Enum.EnumResearchItem.ComplainUnLock,
    {
      ID: Enum.EnumResearchItem.ComplainUnLock,
      Name: "举报",
      Desc: "消耗10K的动漫知识。举报是一项划时代的发明，从此你可以真正打击ACG的发展了。",
      Cost1: 10000,
      Cost2: 0,
      UnLock: [
        Enum.EnumResearchItem.MoneyBuildLevel2,
        Enum.EnumResearchItem.ResearchBuildLevel2,
      ],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.MoneyBuildLevel2,
    {
      ID: Enum.EnumResearchItem.MoneyBuildLevel2,
      Name: "广告公司",
      Desc: "消耗20K点动漫知识。解锁广告公司，进一步提高信徒/从众的工作效率",
      Cost1: 20000,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.ResearchBuildLevel2,
    {
      ID: Enum.EnumResearchItem.ResearchBuildLevel2,
      Name: "运营中心",
      Desc: "消耗20K点动漫知识。解锁运营公司，进一步提高信徒/从众的研究效率",
      Cost1: 20000,
      Cost2: 0,
      Condition: 0,
      UnLock: [
        Enum.EnumResearchItem.InfluenceMoneyLevel3,
        Enum.EnumResearchItem.BelieverInfluenceMax2,
      ],
    },
  ],

  [
    Enum.EnumResearchItem.InfluenceMoneyLevel3,
    {
      ID: Enum.EnumResearchItem.InfluenceMoneyLevel3,
      Name: "精准投放",
      Desc: "消耗50K点动漫知识和5000点游戏知识。一些人对你的思想还不感冒，你得找到合适的受众来宣传ACG的坏处。影响力额外增加0.1的金钱速度",
      Cost1: 50000,
      Cost2: 5000,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[Enum.EnumResearchProp.InfluenceMoney, 0.1]]),
    },
  ],
  [
    Enum.EnumResearchItem.BelieverInfluenceMax2,
    {
      ID: Enum.EnumResearchItem.BelieverInfluenceMax2,
      Name: "狂热信徒",
      Desc: "消耗100K的动漫知识和10K的游戏知识。\n狂热的信徒四处宣传ACG的坏处，每名信徒额外提升500点影响力上限\n开启自动举报的工作，可以安排信徒去自动举报了",
      Cost1: 100000,
      Cost2: 10000,
      UnLock: [
        Enum.EnumResearchItem.AutoComplainLevel1,
        Enum.EnumResearchItem.AutoComplainWrongLevel1,
      ],
      Condition: 0,
      ResearchProp: new Map([[Enum.EnumResearchProp.BelieverAddInfluenceMax, 500]]),
    },
  ],
  [
    Enum.EnumResearchItem.AutoComplainLevel1,
    {
      ID: Enum.EnumResearchItem.AutoComplainLevel1,
      Name: "海外信徒",
      Desc: "消耗200K的动漫知识和100K的游戏知识。\n你开始发展海外的信徒，信徒将会自动举报海外的ACG事件了。",
      Cost1: 200000,
      Cost2: 100000,
      UnLock: [Enum.EnumResearchItem.AutoComplainLevel2],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.AutoComplainWrongLevel1,
    {
      ID: Enum.EnumResearchItem.AutoComplainWrongLevel1,
      Name: "精准打击",
      Desc: "消耗200K的动漫知识和100K的游戏知识。\n降低50%信徒错误举报的概率。",
      Cost1: 200000,
      Cost2: 100000,
      UnLock: [Enum.EnumResearchItem.AutoComplainWrongLevel2],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.AutoComplainLevel2,
    {
      ID: Enum.EnumResearchItem.AutoComplainLevel2,
      Name: "威慑银河系",
      Desc: "消耗2M的动漫知识和1M的游戏知识。\n你在整个银河系都赫赫有名，没有人敢发展ACG文化了。\n信徒将会自动举报外太空的ACG事件了",
      Cost1: 2000000,
      Cost2: 1000000,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    Enum.EnumResearchItem.AutoComplainWrongLevel2,
    {
      ID: Enum.EnumResearchItem.AutoComplainWrongLevel2,
      Name: "完美打击",
      Desc: "消耗2M的动漫知识和1M的游戏知识。\n完美的打击ACG文化，再也不会有错误的举报了。",
      Cost1: 2000000,
      Cost2: 1000000,
      UnLock: [],
      Condition: 0,
    },
  ],
]);

export const WorkInfoList: Map<number, ITableInfo.IWorkInfo> = new Map([
  [
    Enum.EnumWorkType.InfluenceWork,
    {
      ID: Enum.EnumWorkType.InfluenceWork,
      Name: "扩大影响",
      Desc: "每个信徒/从众提升1点影响力每秒。",
      Type:  Enum.ItemType.AutoUnLock,
    },
  ],
  [
    Enum.EnumWorkType.MoneyWork,
    {
      ID: Enum.EnumWorkType.MoneyWork,
      Name: "赚取金钱",
      Desc: "每个信徒/从众提升2点金钱每秒",
      Type:  Enum.ItemType.AutoUnLock,
    },
  ],
  [
    Enum.EnumWorkType.Cost1Work,
    {
      ID: Enum.EnumWorkType.Cost1Work,
      Name: "研究动漫",
      Desc: "每个信徒/从众消耗2点金钱，提升1点动漫知识每秒。（提升效率后消耗同比增加）",
      Type:Enum.ItemType.AutoUnLock,
    },
  ],
  [
    Enum.EnumWorkType.Cost2Work,
    {
      ID: Enum.EnumWorkType.Cost2Work,
      Name: "研究游戏",
      Desc: "每个信徒/从众消耗10点金钱，提升1点游戏知识每秒。（提升效率后消耗同比增加）",
      Type: Enum.ItemType.None,
    },
  ],
  [
    Enum.EnumWorkType.ComplainWork,
    {
      ID: Enum.EnumWorkType.ComplainWork,
      Name: "举报",
      Desc: "信徒/从众替你完成自动举报，人数越多举报的间隔越快。",
      Type: Enum.ItemType.None,
    },
  ],
]);


