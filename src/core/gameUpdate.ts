import { buildItemData, resourceItemData } from "./gameSave";
import {
  ModifyResourceCurValue,
  ModifyResourceMaxValue,
  SetResourceSpeed,
  store,
  UnlockBuild,
  UnlockResearch,
  UnlockResource,
  UpdateGuideTips,
  UpdateWorkConfig,
} from "./store";
import {
  BuildInfoList,
  EnumBuildItem,
  EnumResearchItem,
  EnumResearchProp,
  EnumResourceItem,
  EnumWorkType,
  GlobalConfig,
  ResearchInfoList,
  WorkInfoList,
} from "./table";
import { intToString } from "./utils";

let oldPeople = 0;
let currentPeople = 0;
export function resourceUpdate(deltaTime: number) {
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const workConfig: number[] = store.state.gameData.workConfig;
  const researchComplete: number[] = store.state.gameData.researchComplete;
  const props: Map<EnumResearchProp, number> = new Map();
  //属性是动态算的
  researchComplete.forEach(function (id) {
    const researchProp = ResearchInfoList.get(id)!.ResearchProp;
    if (researchProp !== undefined) {
      researchProp.forEach(function (value, key) {
        props.set(
          key,
          value + (props.get(key) === undefined ? 0 : props.get(key)!)
        );
      });
    }
  });
  //建筑增加的属性
  buildArryList.forEach(function (buildData, key) {
    const researchProp = buildData.ResearchProp;
    if (researchProp !== undefined) {
      researchProp.forEach(function (value, key) {
        props.set(
          key,
          value * buildData.curValue +
            (props.get(key) === undefined ? 0 : props.get(key)!)
        );
      });
    }
  });
  updateResourceMaxValue(props,sourceArr);
  //金钱部分先算,如果金钱会扣到零以下则所有工人全部停工
  const isDebts = calculateMoneySpeed(
    sourceArr,
    buildArryList,
    workConfig,
    props,
    deltaTime
  );
  sourceArr.forEach(function (data, ID) {
    setResourceSpeed(
      data,
      sourceArr,
      buildArryList,
      workConfig,
      props,
      isDebts
    );
    checkResourceUnlock(data, sourceArr);
    updateResourceValue(data, deltaTime, ID);
  });

  buildArryList.forEach(function (data, ID) {
    checkBuildUnlock(data, sourceArr, buildArryList, researchComplete);
  });
  autoWork(workConfig);
}

/**
 * 更新最大值
 */
function updateResourceMaxValue(
  props: Map<EnumResearchProp, number>,
  sourceArr: Map<number, resourceItemData>
) {
  props.forEach(function (prop, enumKey) {
    let data: resourceItemData | undefined = undefined;
    if (enumKey === EnumResearchProp.BelieverMax) {
      data = sourceArr.get(EnumResourceItem.Believer)!;
      data.cacheMaxValue = data.baseMaxValue + prop;
    }
    if (enumKey === EnumResearchProp.PeopleMax) {
      data = sourceArr.get(EnumResourceItem.People)!;
      data.cacheMaxValue =
        sourceArr.get(EnumResourceItem.People)!.baseMaxValue + prop;
    }
    if (enumKey === EnumResearchProp.BelieverAddInfluenceMax) {
      //影响力上限等于基础值+信徒属性加成*当前信徒总数
      data = sourceArr.get(EnumResourceItem.Influence)!;
      data.cacheMaxValue =
        sourceArr.get(EnumResourceItem.People)!.baseMaxValue +
        prop * sourceArr.get(EnumResourceItem.Believer)!.cacheValue;
    }
    if (data === undefined) return;
    const strValue = intToString(data.cacheMaxValue);
    if (strValue !== data.maxValue) {
      store.commit(ModifyResourceMaxValue, {
        index: data.ID,
        value: strValue,
      });
    }
  });
}

/**
 * 获取正在工作的总人数
 */
export function GetTotalWorks() {
  let result = 0; //总工人数量
  store.state.gameData.workConfig.forEach(function (value) {
    result += value;
  });
  return result;
}

/**
 * 获取总信徒/从众数量
 */
export function GetTotalPeople() {
  let result = 0;
  if (store.state.gameData.sourceArr.has(EnumResourceItem.Believer))
    result += store.state.gameData.sourceArr.get(
      EnumResourceItem.Believer
    )!.cacheValue;
  if (store.state.gameData.sourceArr.has(EnumResourceItem.People))
    result += store.state.gameData.sourceArr.get(
      EnumResourceItem.People
    )!.cacheValue;
  return result;
}

/**
 * 安排自动工作
 */
function autoWork(workConfig: number[]) {
  currentPeople = GetTotalPeople();
  let addPeople = Math.floor(currentPeople - oldPeople + 0.000001);
  if (addPeople < 0)
    //增加的人数取整不到一人直接返回
    return;

  let total = GetTotalWorks();
  //异常处理，当前工人数小于已工作数
  if (currentPeople < total) {
    let isClear = false;
    store.state.gameData.workConfig = workConfig.map(function (value) {
      if (isClear) return 0;
      if (currentPeople < value) {
        isClear = true;
        return -currentPeople;
      }
      currentPeople -= value;
      return 0;
    });
    return;
  } else if (currentPeople > total && store.state.gameData.autoWorkIndex >= 0) {
    store.commit(UpdateWorkConfig, {
      index: store.state.gameData.autoWorkIndex,
      value: 1,
    });
    oldPeople++; //没有异常了，每帧最多分配一给人
  }
}

//根据速度更新资源的值
function updateResourceValue(
  data: resourceItemData,
  deltaTime: number,
  ID: number
) {
  if (!data.unlock) return 0;
  const add = data.cacheSpeed * deltaTime;
  data.cacheValue += add;
  if (data.cacheMaxValue >= 0 && data.cacheValue > data.cacheMaxValue)
    data.cacheValue = data.cacheMaxValue;
  if (data.cacheValue < 0) {
    data.cacheValue = 0; //金钱小于0，上面会设置停工了；影响力小于0游戏结束，TODO 影响力扣的逻辑
  }
  if(data.ID === EnumResourceItem.Influence){
    if(data.cacheValue > 1000000000){
      store.state.gameData.influenceLevel = 4;
    }
    else if(data.cacheValue > 10000000){
      store.state.gameData.influenceLevel = 3;
    }
    else if(data.cacheValue > 3000){
      store.state.gameData.influenceLevel = 2;
    }
    else if(data.cacheValue > 100){
      store.state.gameData.influenceLevel = 1;
    }
  }
  const strValue = intToString(data.cacheValue);
  if (strValue !== data.curValue) {
    store.commit(ModifyResourceCurValue, {
      index: ID,
      value: strValue,
    });
  }
  //自动工人的计算逻辑
}

/**
 * 先算金钱
 */
function calculateMoneySpeed(
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>,
  workConfig: number[],
  researchProps: Map<EnumResearchProp, number>,
  deltaTime: number
) {
  const moneyData = sourceArr.get(EnumResourceItem.Money)!;
  let num1 = workConfig[EnumWorkType.Cost1Work]; //动漫知识工人
  let num2 = workConfig[EnumWorkType.Cost2Work]; //游戏知识工人
  let num3 = sourceArr.get(EnumResourceItem.Believer)!.cacheValue; //信徒数量
  let num4 = GetTotalWorks(); //正在工作的工人数量
  let num5 = Math.max(0, num4 - num3); //从众正在工作的数量,至少0，说明信徒没安排买
  let num6 = num5 * 1; //TODO 每个从众额外消耗多少金钱用分段函数
  //工人数量 * 效率加成 * 金钱消耗倍率 = 最终消耗金钱
  num1 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost1Ratio)
        ? researchProps.get(EnumResearchProp.Cost1Ratio)!
        : 0)) *
    GlobalConfig.Cost1MoneyRatio;
  num2 *=
    (1 +
      (researchProps.get(EnumResearchProp.Cost2Ratio)
        ? researchProps.get(EnumResearchProp.Cost2Ratio)!
        : 0)) *
    GlobalConfig.Cost2MoneyRatio;
  //工人支出、cost1转化、cost2转化

  //影响力收入
  let num7: number = sourceArr.get(EnumResourceItem.Influence)!.cacheValue; //影响力总数
  let num8 = workConfig[EnumWorkType.MoneyWork] * GlobalConfig.GetMoneyRatio; //金钱工人数量
  if (researchProps.has(EnumResearchProp.InfluenceMoney)) {
    num7 *= researchProps.get(EnumResearchProp.InfluenceMoney)!; //影响力转化金钱
  } else num7 = 0;
  if (researchProps.has(EnumResearchProp.MoneyRatio)) {
    num8 *= 1 + researchProps.get(EnumResearchProp.MoneyRatio)!; //金钱工人总收入
  }
  let num9 = num8 + num7 - num6 - num1 - num2; //金钱工人收入+影响力收入 - 从众工人支持-研究1消耗-研究2消耗
  moneyData.cacheSpeed = num9;
  let isDebts = false;
  if (num9 * deltaTime + moneyData.cacheValue <= 0) {
    //这一帧金钱会扣到0以下，所有工人全部停工
    for (let i = 0; i < workConfig.length; i++) {
      workConfig[i] = 0;
    }
    isDebts = true;
  }
  return isDebts;
}

//设置各个资源的速率
function setResourceSpeed(
  data: resourceItemData,
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>,
  workConfig: number[],
  researchProps: Map<EnumResearchProp, number>,
  isDebts: boolean
) {
  if (!data.unlock) return;
  switch (data.ID) {
    case EnumResourceItem.Influence: //影响力的速度公式：每个安排工作的提升1点 后面可能考虑科技
      const num1 = workConfig[EnumWorkType.InfluenceWork];
      data.cacheSpeed = num1;
      break;
    case EnumResourceItem.Cost1: //动漫知识的公式,工人转化*建筑提升
      let num5 = workConfig[EnumWorkType.Cost1Work];
      if (researchProps.has(EnumResearchProp.Cost1Ratio))
        num5 *= 1 + researchProps.get(EnumResearchProp.Cost1Ratio)!;
      data.cacheSpeed = num5;
      break;
    case EnumResourceItem.Cost2: //游戏知识的公式，工人转化*建筑提升
      let num6 = workConfig[EnumWorkType.Cost2Work];
      if (researchProps.has(EnumResearchProp.Cost2Ratio))
        num6 *= 1 + researchProps.get(EnumResearchProp.Cost2Ratio)!;
      data.cacheSpeed = num6;
      break;
    case EnumResourceItem.Believer: //信徒的公式，每个现有信徒乘以出生率
      data.cacheSpeed =
        Math.max(0.1, Math.pow(data.cacheValue,0.5) * GlobalConfig.BaseBelieverRatio)
      break;
    case EnumResourceItem.People: //从众的公式 ，负债也会导致出生率停止
      if (isDebts) data.cacheSpeed = 0;
      else {
        const dataBeliever = sourceArr.get(EnumResourceItem.Believer)!;
        data.cacheSpeed =
          Math.max(0.1, Math.pow(data.cacheValue,0.5) * GlobalConfig.BaseBelieverRatio)
        if (dataBeliever.cacheMaxValue - data.cacheValue <= 0.00001) {
          //信徒达到最大值
          data.cacheSpeed *= 2;
        }
      }
      break;
  }
  const strValue = intToString(data.cacheSpeed, 2);
  if (strValue !== data.speed) {
    store.commit(SetResourceSpeed, {
      index: data.ID,
      value: strValue,
    });
  }
}

export function StartGuideByID(ID:number){
  store.commit(UpdateGuideTips, ID)
  store.state.openGuide = true;
}

//建筑的解锁
function checkBuildUnlock(
  data: buildItemData,
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>,
  researchComplete: number[]
) {
  if (data.unlock) return;
  switch (data.ID) {
    case EnumBuildItem.AddMoney: //解锁获得金钱按钮
      if (sourceArr.get(1)!.cacheValue >= 10) {
        store.commit(UnlockBuild, data.ID);
        StartGuideByID(0);
      }
      break;
    case EnumBuildItem.AddResearch: //解锁获得知识按钮
      if (sourceArr.get(1)!.cacheValue >= 20) {
        store.commit(UnlockBuild, data.ID);
        StartGuideByID(1);
      }
      break;
    default:
      //其他全走require科技的逻辑
      const Require = BuildInfoList.get(data.ID)!.Require;
      if (researchComplete.indexOf(Require) > 0) {
        store.commit(UnlockBuild, data.ID);
      }
      break;
  }
}

//资源的解锁检查
function checkResourceUnlock(
  data: resourceItemData,
  sourceArr: Map<number, resourceItemData>
) {
  //影响力提升等级和各种解锁

  if (data.unlock) return;
  switch (data.ID) {
    case EnumResourceItem.Money: //解锁金钱，需要影响力大于10
      if (sourceArr.get(1)!.cacheValue >= 10)
        store.commit(UnlockResource, EnumResourceItem.Money);
      break;
    case EnumResourceItem.Cost1: //解锁知识，影响力大于20
      if (sourceArr.get(1)!.cacheValue >= 20)
        store.commit(UnlockResource, EnumResourceItem.Cost1);
      break;
  }
}
