import {
  IItemInfo,
  IBuildInfo,
  IResearchInfo,
  IWorkInfo,
  IPolicyInfo,
  ILawInfo,
} from "./ITableInfo";
import {
  EnumResourceItem,
  ItemType,
  EnumBuildItem,
  BuildClickType,
  EnumResearchItem,
  EnumResearchProp,
  EnumWorkType,
  EnumPolicyItem,
  EnumLawItem,
} from "./Enum";

export const ItemInfoList: Map<number, IItemInfo> = new Map([
  [
    EnumResourceItem.Influence,
    {
      ID: EnumResourceItem.Influence,
      Name: "影响力",
      Desc: "当前影响力等级：{0}级\n每单位工作基础值为{1}\n影响力解锁游戏进程",
      BaseMax: 100,
      Type: ItemType.AutoUnLock,
    },
  ],
  [
    EnumResourceItem.Money,
    {
      ID: EnumResourceItem.Money,
      Name: "金钱",
      Desc: "当前金钱收集效率：{0}%\n每单位工作基础值为{1}\n你只是为了消灭ACG文化才收集了一点点钱",
      BaseMax: -1,
      Type: ItemType.None,
    },
  ],
  [
    EnumResourceItem.Cost1,
    {
      ID: EnumResourceItem.Cost1,
      Name: "动漫知识",
      Desc: "当前动漫知识研究效率：{0}%\n每单位工作基础值为{1}\n每转化1点动漫知识需要消耗{2}点金钱",
      BaseMax: -1,
      Type: ItemType.None,
    },
  ],
  [
    EnumResourceItem.Cost2,
    {
      ID: EnumResourceItem.Cost2,
      Name: "游戏知识",
      Desc: "当前游戏知识研究效率：{0}%\n每单位工作基础值为{1}\n每转化1点游戏知识需要消耗{2}点金钱\n游戏的荼毒更深，所以需要更多的氪金才能获得",
      BaseMax: -1,
      Type: ItemType.None,
    },
  ],
  [
    EnumResourceItem.Believer,
    {
      ID: EnumResourceItem.Believer,
      Name: "信徒",
      Desc: "安排信徒工作，提供工作基础值\n信徒的增长速度和自身的人数相关，由于聚众效应，人越多增长越快",
      BaseMax: 10,
      Type: ItemType.None,
    },
  ],
  [
    EnumResourceItem.People,
    {
      ID: EnumResourceItem.People,
      Name: "从众",
      Desc: "安排从众工作，提供工作基础值，并额外消耗1点金钱每人\n从众和信徒的增长速度一样，信徒达到上限后，从众增长速度翻倍。",
      BaseMax: 10,
      Type: ItemType.None,
    },
  ],
  [
    EnumResourceItem.Policy,
    {
      ID: EnumResourceItem.Policy,
      Name: "政策点",
      Desc: "当前政策点获取效率：{0}%\n每单位工作基础值为{1}\n每1点政策点需要消耗{2}点金钱, {3}动漫和游戏知识\n颁布新政除了消耗政策点，你还需要有一定的政治背景才能推行。",
      BaseMax: -1,
      Type: ItemType.None,
    },
  ],
  [
    EnumResourceItem.Political,
    {
      ID: EnumResourceItem.Political,
      Name: "政治背景",
      Desc: "提高全局资源的速度，当前全局效率提升{0}%\n这是一种重置资源，在政治分页重置游戏获得，获得数量与信徒数量相关、ACG文化影响力有关",
      BaseMax: -1,
      Type: ItemType.None,
    },
  ],
]);

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
      Desc: "拯救心理问题的ACG青年\n信徒上限+10",
      Type: ItemType.InfluenceBuild,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 4,
      UpgradeCostPower: 3.5,
      Require: EnumResearchItem.BelieverBuildLevel1,
      ResearchProp: new Map([[EnumResearchProp.BelieverMax, 10]]),
    },
  ],
  [
    EnumBuildItem.MoneyLevel1,
    {
      ID: EnumBuildItem.MoneyLevel1,
      Name: "印刷店",
      Desc: "帮助你宣传的同时赚一点钱\n信徒金钱工作效率+10%",
      Type: ItemType.MoneyBuild,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 6,
      UpgradeCostPower: 3,
      Require: EnumResearchItem.MoneyBuildLevel1,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.1]]),
    },
  ],
  [
    EnumBuildItem.ResearchLevel1,
    {
      ID: EnumBuildItem.ResearchLevel1,
      Name: "书店",
      Desc: "在书店研究漫画知识更快\n信徒研究动漫知识效率+10%",
      Type: ItemType.ResearchBuild,
      cityName: 1,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 5,
      UpgradeCostPower: 3.25,
      Require: EnumResearchItem.ResearchBuildLevel1,
      ResearchProp: new Map([[EnumResearchProp.Cost1Ratio, 0.1]]),
    },
  ],
  [
    EnumBuildItem.InfulenceLevel2,
    {
      ID: EnumBuildItem.InfulenceLevel2,
      Name: "网瘾治疗中心",
      Desc: "一种电疗实验\n从众上限+100",
      Type: ItemType.InfluenceBuild,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 12,
      UpgradeCostPower: 3.6,
      Require: EnumResearchItem.BelieverBuildLevel2,
      ResearchProp: new Map([[EnumResearchProp.PeopleMax, 100]]),
    },
  ],
  [
    EnumBuildItem.MoneyLevel2,
    {
      ID: EnumBuildItem.MoneyLevel2,
      Name: "广告公司",
      Desc: "宣传你的思想，同时获得了不菲收益\n信徒金钱工作效率+20%",
      Type: ItemType.MoneyBuild,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 18,
      UpgradeCostPower: 3.1,
      Require: EnumResearchItem.MoneyBuildLevel2,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.2]]),
    },
  ],
  [
    EnumBuildItem.ResearchLevel2,
    {
      ID: EnumBuildItem.ResearchLevel2,
      Name: "运营公司",
      Desc: "运营一些游戏再偷偷搞垮它们\n信徒研究游戏知识效率+5%",
      Type: ItemType.ResearchBuild,
      cityName: 2,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 15,
      UpgradeCostPower: 3.45,
      Require: EnumResearchItem.ResearchBuildLevel2,
      ResearchProp: new Map([[EnumResearchProp.Cost2Ratio, 0.05]]),
    },
  ],
  [
    EnumBuildItem.InfulenceLevel3,
    {
      ID: EnumBuildItem.InfulenceLevel3,
      Name: "区块链平台",
      Desc: "一种加密货币让人狂热追捧\n信徒上限+20",
      Type: ItemType.InfluenceBuild,
      cityName: 3,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 48,
      UpgradeCostPower: 3.7,
      Require: EnumResearchItem.BelieverBuildLevel3,
      ResearchProp: new Map([[EnumResearchProp.BelieverMax, 20]]),
    },
  ],
  [
    EnumBuildItem.MoneyLevel3,
    {
      ID: EnumBuildItem.MoneyLevel3,
      Name: "房地产公司",
      Desc: "人们纷纷为了住房而奔波，这样就没有人去关心ACG了\n信徒金钱工作效率+30%",
      Type: ItemType.MoneyBuild,
      cityName: 3,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 72,
      UpgradeCostPower: 3.2,
      Require: EnumResearchItem.MoneyBuildLevel3,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.3]]),
    },
  ],
  [
    EnumBuildItem.ResearchLevel3,
    {
      ID: EnumBuildItem.ResearchLevel3,
      Name: "政策顾问",
      Desc: "高薪聘请已退休的政府高官，来研究推行各种有利于你的政策\n信徒研究政策点效率+10%",
      Type: ItemType.ResearchBuild,
      cityName: 3,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 60,
      UpgradeCostPower: 3.55,
      Require: EnumResearchItem.ResearchBuildLevel3,
      ResearchProp: new Map([[EnumResearchProp.PolicyRatio, 0.1]]),
    },
  ],
  [
    EnumBuildItem.InfulenceLevel4,
    {
      ID: EnumBuildItem.InfulenceLevel4,
      Name: "互联网社区",
      Desc: "建设属于自己的互联网社区，让人们看到他们以为的真相\n从众上限+500",
      Type: ItemType.InfluenceBuild,
      cityName: 4,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 96,
      UpgradeCostPower: 4,
      Require: EnumResearchItem.BelieverBuildLevel4,
      ResearchProp: new Map([[EnumResearchProp.PeopleMax, 500]]),
    },
  ],
  [
    EnumBuildItem.MoneyLevel4,
    {
      ID: EnumBuildItem.MoneyLevel4,
      Name: "社交平台",
      Desc: "社交平台看起来是免费的，但其实他很赚钱\n信徒金钱工作效率+40%",
      Type: ItemType.MoneyBuild,
      cityName: 4,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 144,
      UpgradeCostPower: 3.5,
      Require: EnumResearchItem.MoneyBuildLevel4,
      ResearchProp: new Map([[EnumResearchProp.MoneyRatio, 0.4]]),
    },
  ],
  [
    EnumBuildItem.ResearchLevel4,
    {
      ID: EnumBuildItem.ResearchLevel4,
      Name: "行业巨头",
      Desc: "横跨多个领域发展才能称为巨头\n信徒研究动漫知识效率、游戏知识效率+20%",
      Type: ItemType.ResearchBuild,
      cityName: 4,
      OnClickType: BuildClickType.Upgrade,
      UpgradeCostRatio: 120,
      UpgradeCostPower: 3.75,
      Require: EnumResearchItem.ResearchBuildLevel4,
      ResearchProp: new Map([
        [EnumResearchProp.Cost1Ratio, 0.2],
        [EnumResearchProp.Cost2Ratio, 0.2],
      ]),
    },
  ],
]);

export const ResearchInfoList: Map<number, IResearchInfo> = new Map([
  [
    EnumResearchItem.InfluenceMoneyLevel1,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel1,
      Name: "流量引导",
      Desc: "影响力有了，钱就有了\n每1点影响力获得0.01点的金钱速度\n 消耗20点动漫知识",
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
      Desc: "拯救问题青年的场所\n解锁心理诊所建筑\n消耗30点动漫知识",
      Cost1: 30,
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
      Desc: "解锁印刷店建筑，这将有助于信徒金钱工作的效率\n消耗50点动漫知识",
      Cost1: 50,
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
      Desc: "解锁书店建筑，这将有助于信徒研究工作的效率\n消耗100点动漫知识",
      Cost1: 100,
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
      Desc: "信徒更加虔诚了，消灭ACG的思想也广为流传\n每个信徒提升150点影响力上限\n消耗500点动漫知识",
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
      Desc: "你的影响力越高，你获得的钱就更多\n每1点影响力增加额外0.01的金钱速度\n消耗2000点动漫知识",
      Cost1: 2000,
      Cost2: 0,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceMoney, 0.01]]),
    },
  ],
  [
    EnumResearchItem.BelieverBuildLevel2,
    {
      ID: EnumResearchItem.BelieverBuildLevel2,
      Name: "网瘾治疗中心",
      Desc: "你来到了电力时代, 进入下一级城市\n解锁新的建筑，这将获得一大批从众\n消耗5000点动漫知识,需要影响力达到3000点",
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
      Desc: "举报是一项划时代的发明，从此你可以真正打击ACG的发展了\n消耗10K的动漫知识",
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
      Desc: "解锁广告公司，进一步提高信徒/从众的工作效率\n消耗20K点动漫知识",
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
      Desc: "解锁运营公司，进一步提高信徒/从众的研究效率\n消耗20K点动漫知识",
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
      Desc: "一些人对你的思想还不感冒，你得找到合适的受众来宣传ACG的坏处\n影响力额外增加0.02的金钱速度\n消耗50K点动漫知识和5000点游戏知识",
      Cost1: 50000,
      Cost2: 5000,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceMoney, 0.02]]),
    },
  ],
  [
    EnumResearchItem.BelieverInfluenceMax2,
    {
      ID: EnumResearchItem.BelieverInfluenceMax2,
      Name: "狂热信徒",
      Desc: "狂热的信徒四处宣传ACG的坏处\n每名信徒额外提升500点影响力上限\n开启自动举报的工作了\n消耗100K的动漫知识和10K的游戏知识",
      Cost1: 100000,
      Cost2: 10000,
      UnLock: [
        EnumResearchItem.AutoComplainLevel1,
        EnumResearchItem.BelieverBuildLevel3,
      ],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.BelieverAddInfluenceMax, 500]]),
    },
  ],
  [
    EnumResearchItem.BelieverBuildLevel3,
    {
      ID: EnumResearchItem.BelieverBuildLevel3,
      Name: "区块链平台",
      Desc: "进入下一级城市，区块链平台能收获一大批虔诚的信徒\n解锁区块链平台，提高信徒上限\n消耗500K的动漫知识和游戏知识",
      Cost1: 500 * 1000,
      Cost2: 500 * 1000,
      UnLock: [
        EnumResearchItem.MoneyBuildLevel3,
        EnumResearchItem.InfluenceMoneyLevel4,
      ],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.MoneyBuildLevel3,
    {
      ID: EnumResearchItem.MoneyBuildLevel3,
      Name: "房地产公司",
      Desc: "解锁房地产公司，进一步提高信徒/从众的工作效率\n消耗300K的动漫知识游戏知识",
      Cost1: 300 * 1000,
      Cost2: 300 * 1000,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.InfluenceMoneyLevel4,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel4,
      Name: "病毒营销",
      Desc: "影响力已经非常的高了\n影响力额外增加0.02的金钱速度\n消耗500K的动漫知识游戏知识",
      Cost1: 500 * 1000,
      Cost2: 500  * 1000,
      UnLock: [EnumResearchItem.ResearchBuildLevel3],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceMoney, 0.02]]),
    },
  ],
  [
    EnumResearchItem.ResearchBuildLevel3,
    {
      ID: EnumResearchItem.ResearchBuildLevel3,
      Name: "政策顾问",
      Desc: "高价聘请已退休的政府人员作为政策顾问\n解锁政策顾问，信徒们可以开会获得政策点\n解锁政治面板，可以手动重置了\n消耗1M的动漫知识游戏知识",
      Cost1: 1 * 1000 * 1000,
      Cost2: 1 * 1000 * 1000,
      UnLock: [EnumResearchItem.BelieverInfluenceMax3],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.BelieverInfluenceMax3,
    {
      ID: EnumResearchItem.BelieverInfluenceMax3,
      Name: "科学信仰",
      Desc: "消灭ACG文化是一种科学的信仰\n每名信徒提高额外1000点影响力上限\n消耗10M的动漫知识游戏知识",
      Cost1: 10 * 1000 * 1000,
      Cost2: 10 * 1000 * 1000,
      UnLock: [EnumResearchItem.BelieverBuildLevel4],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.BelieverAddInfluenceMax, 1000]]),
    },
  ],
  [
    EnumResearchItem.BelieverBuildLevel4,
    {
      ID: EnumResearchItem.BelieverBuildLevel4,
      Name: "互联网社区",
      Desc: "进入下一级城市，互联网社区能收获一大批从众\n解锁互联网社区，提高从众上限\n消耗20M的动漫知识和游戏知识",
      Cost1: 20 * 1000 * 1000,
      Cost2: 20 * 1000 * 1000,
      UnLock: [
        EnumResearchItem.MoneyBuildLevel4,
        EnumResearchItem.InfluenceMoneyLevel5,
      ],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.MoneyBuildLevel4,
    {
      ID: EnumResearchItem.MoneyBuildLevel4,
      Name: "社交平台",
      Desc: "解锁社交平台，进一步提高信徒/从众的工作效率\n消耗50M的动漫知识游戏知识",
      Cost1: 50 * 1000 * 1000,
      Cost2: 50 * 1000 * 1000,
      UnLock: [],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.InfluenceMoneyLevel5,
    {
      ID: EnumResearchItem.InfluenceMoneyLevel5,
      Name: "洗脑",
      Desc: "影响力大幅度提高金钱效率\n影响力额外增加0.04的金钱速度\n消耗50M的动漫知识游戏知识",
      Cost1: 50 * 1000 * 1000,
      Cost2: 50 * 1000 * 1000,
      UnLock: [EnumResearchItem.ResearchBuildLevel4],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.InfluenceMoney, 0.04]]),
    },
  ],
  [
    EnumResearchItem.ResearchBuildLevel4,
    {
      ID: EnumResearchItem.ResearchBuildLevel4,
      Name: "行业巨头",
      Desc: "作为行业巨头，你横跨多个产业\n解锁行业巨头，同时提高游戏和动漫知识的效率\n消耗200M的动漫知识游戏知识",
      Cost1: 200 * 1000 * 1000,
      Cost2: 200 * 1000 * 1000,
      UnLock: [EnumResearchItem.BelieverInfluenceMax4],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.BelieverInfluenceMax4,
    {
      ID: EnumResearchItem.BelieverInfluenceMax4,
      Name: "最终信仰",
      Desc: "你和你的信徒将付出一生\n每名信徒提高额外2000点影响力上限\n消耗500M的动漫知识游戏知识",
      Cost1: 500 * 1000 * 1000,
      Cost2: 500 * 1000 * 1000,
      UnLock: [],
      Condition: 0,
      ResearchProp: new Map([[EnumResearchProp.BelieverAddInfluenceMax, 2000]]),
    },
  ],
  [
    EnumResearchItem.AutoComplainLevel1,
    {
      ID: EnumResearchItem.AutoComplainLevel1,
      Name: "海外信徒",
      Desc: "你开始发展海外的信徒\n信徒将会自动举报海外的ACG事件了\n消耗2M的动漫知识和游戏知识",
      Cost1: 2 * 1000 * 1000,
      Cost2: 2 * 1000 * 1000,
      UnLock: [EnumResearchItem.AutoComplainLevel2],
      Condition: 0,
    },
  ],
  [
    EnumResearchItem.AutoComplainLevel2,
    {
      ID: EnumResearchItem.AutoComplainLevel2,
      Name: "威慑银河系",
      Desc: "你在整个银河系都赫赫有名，没有人敢发展ACG文化了\n信徒将会自动举报外太空的ACG事件了\n消耗200M的动漫知识和游戏知识",
      Cost1: 200 * 1000 * 1000,
      Cost2: 200 * 1000 * 1000,
      UnLock: [],
      Condition: 0,
    },
  ],
]);

export const WorkInfoList: Map<number, IWorkInfo> = new Map([
  [
    EnumWorkType.InfluenceWork,
    {
      ID: EnumWorkType.InfluenceWork,
      Name: "扩大影响",
      Desc: "每个信徒/从众提升1点影响力每秒。",
      Type: ItemType.AutoUnLock,
    },
  ],
  [
    EnumWorkType.MoneyWork,
    {
      ID: EnumWorkType.MoneyWork,
      Name: "赚取金钱",
      Desc: "每个信徒/从众提升2点金钱每秒",
      Type: ItemType.AutoUnLock,
    },
  ],
  [
    EnumWorkType.Cost1Work,
    {
      ID: EnumWorkType.Cost1Work,
      Name: "研究动漫",
      Desc: "每个信徒/从众消耗2点金钱，提升1点动漫知识每秒（提升效率后消耗同比增加）",
      Type: ItemType.AutoUnLock,
    },
  ],
  [
    EnumWorkType.Cost2Work,
    {
      ID: EnumWorkType.Cost2Work,
      Name: "研究游戏",
      Desc: "每个信徒/从众消耗10点金钱，提升1点游戏知识每秒（提升效率后消耗同比增加）",
      Type: ItemType.None,
    },
  ],
  [
    EnumWorkType.ComplainWork,
    {
      ID: EnumWorkType.ComplainWork,
      Name: "举报",
      Desc: "信徒/从众替你完成自动举报，人数越多举报的间隔越快。",
      Type: ItemType.None,
    },
  ],
  [
    EnumWorkType.PolicyWork,
    {
      ID: EnumWorkType.PolicyWork,
      Name: "开会",
      Desc: "信徒/从众开会商讨政策，获得政策点\n每个信徒/从众消耗10点金钱、动漫知识和游戏知识，提升0.1点政策点每秒",
      Type: ItemType.None,
    },
  ],
]);

export const PolicyInfoList: Map<number, IPolicyInfo> = new Map([
  [
    EnumPolicyItem.ReduceInfluenceBuildCost,
    {
      ID: EnumPolicyItem.ReduceInfluenceBuildCost,
      Name: "扶持教育",
      Desc: "政府大力扶持教育产业\n每级降低信徒、从众类建筑成本5%\n当前降低了{0}%",
      Condition: [0, 1, 2, 3, 4, 5],
      Cost: 10 * 1000,
      UpgradeRatio: 4,
      ResearchProp: new Map([[EnumResearchProp.ReduceInfluenceBuildCost, 0.05]]),
      IsReduceProp:true,
    },
  ],
  [
    EnumPolicyItem.ReduceMoneyBuildCost,
    {
      ID: EnumPolicyItem.ReduceMoneyBuildCost,
      Name: "扶持经济",
      Desc: "政府大力扶持经济产业\n每级降低金钱类建筑成本5%\n当前降低了{0}%",
      Condition: [0, 1, 2, 3, 4, 5],
      Cost: 10 * 1000,
      UpgradeRatio: 4,
      ResearchProp: new Map([[EnumResearchProp.ReduceMoneyBuildCost, 0.05]]),
      IsReduceProp:true,

    },
  ],
  [
    EnumPolicyItem.ReduceResearchBuildCost,
    {
      ID: EnumPolicyItem.ReduceResearchBuildCost,
      Name: "扶持正统文化",
      Desc: "政府大力扶持正统文化产业\n每级降低研究类建筑成本5%\n当前降低了{0}%",
      Condition: [0, 1, 2, 3, 4, 5],
      Cost: 10 * 1000,
      UpgradeRatio: 4,
      ResearchProp: new Map([[EnumResearchProp.ReduceResearchBuildCost, 0.05]]),
      IsReduceProp:true,
    },
  ],
  [
    EnumPolicyItem.ReduceAcgProgressSpeedRatio,
    {
      ID: EnumPolicyItem.ReduceAcgProgressSpeedRatio,
      Name: "打击ACG文化",
      Desc: "政府大力打击ACG文化产业\n每级ACG影响速度降低5%\n当前降低{0}%",
      Condition: [0, 1, 2, 3, 4, 5],
      Cost: 20 * 1000,
      UpgradeRatio: 8,
      ResearchProp: new Map([
        [EnumResearchProp.ReduceAcgProgressSpeedRatio, 0.05],
      ]),
      IsReduceProp:true,
    },
  ],
]);

export const LawInfoList: Map<number, ILawInfo> = new Map([
  [
    EnumLawItem.ComplainCD,
    {
      ID: EnumLawItem.ComplainCD,
      Name: "自律公约",
      Desc: "从严落实各项管理新规，把握好政治方向、舆论导向、价值取向\n每级提高举报CD因子0.02，降低举报CD\n当前提高{0}",
      Cost: 50,
      ResearchProp: new Map([[EnumResearchProp.ComplainCD, 0.02]]),
    },
  ],
  [
    EnumLawItem.ComplainAcgRatio,
    {
      ID: EnumLawItem.ComplainAcgRatio,
      Name: "严格审查",
      Desc: "越做审核工作，越倾向严格\n每级提高举报效果10%\n当前提高{0}%",
      Cost: 50,
      ResearchProp: new Map([[EnumResearchProp.ComplainAcgRatio, 0.1]]),
    },
  ],
  [
    EnumLawItem.WorkBaseRatio,
    {
      ID: EnumLawItem.WorkBaseRatio,
      Name: "996",
      Desc: "996是一种福报\n每级提高工作效果基础值10%\n当前提高{0}%",
      Cost: 100,
      ResearchProp: new Map([[EnumResearchProp.WorkBaseRatio, 0.1]]),
    },
  ],
  [
    EnumLawItem.MoneyCostRatio,
    {
      ID: EnumLawItem.MoneyCostRatio,
      Name: "共同富裕",
      Desc: "先富带动后富\n每级降低工作金钱转化消耗5%\n当前降低消耗{0}%",
      Cost: 100,
      ResearchProp: new Map([[EnumResearchProp.MoneyCostRatio, 0.05]]),
      IsReduceProp:true,
    },
  ],
  [
    EnumLawItem.ResearchCostRatio,
    {
      ID: EnumLawItem.ResearchCostRatio,
      Name: "学术包装",
      Desc: "这不是造假，只是一种暂时性的合理包装\n每级降低工作知识转化消耗5%\n当前降低消耗{0}%",
      Cost: 100,
      ResearchProp: new Map([[EnumResearchProp.ResearchCostRatio, 0.05]]),
      IsReduceProp:true,
    },
  ],
]);
