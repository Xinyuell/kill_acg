import {
  store,
  UpdateProps,
  ModifyResourceMaxValue,
  ModifyResourceCurValue,
  SetResourceSpeed,
  UpdateGuideTips,
} from "../../store/index";
import { intToString } from "../utils";
import { autoWork } from "../system/works";
import { ResearchInfoList } from "../tables/table";
import {
  EnumPolicyItem,
  EnumResearchProp,
  EnumResourceItem,
  EnumWorkType,
} from "../tables/Enum";
import { buildItemData, resourceItemData } from "./gameSave";
import { checkResourceUnlock } from "../system/resource";
import { calculateMoneySpeed, calculatePolicySpeed } from "./calculateSpeed";
import { checkBuildUnlock } from "../system/build";
import { InfluenceLevel, Resource } from "../tables/GlobalConfig";

/** 递减属性的百分比算法 */
function GetReduceProp(level: number, prop: number) {
  return Math.pow(1 - prop, level);
}

function SetPolicyProp(
  researchProp: Map<EnumResearchProp, number>,
  props: Map<EnumResearchProp, number>,
  IsReduceProp: boolean | undefined,
  level: number
) {
  researchProp.forEach(function (value, key) {
    //TODO 如果递减属性有两个来源的话需要额外处理，目前没有
    if (IsReduceProp) {
      props.set(
        key,
        GetReduceProp(level, value) +
          (props.get(key) === undefined ? 0 : props.get(key)!)
      );
    } else {
      props.set(
        key,
        value * level + (props.get(key) === undefined ? 0 : props.get(key)!)
      );
    }
  });
}

/** 重算全局属性，并提交给store */
export function CalculateProps() {
  const props: Map<EnumResearchProp, number> = new Map();
  //属性是动态算的
  store.state.gameData.researchComplete.forEach(function (id) {
    const researchProp = ResearchInfoList.get(id)!.ResearchProp;
    if (researchProp !== undefined) {
      SetPolicyProp(researchProp, props, false, 1);
    }
  });
  //建筑增加的属性
  store.state.gameData.buildArryList.forEach(function (buildData, key) {
    const researchProp = buildData.ResearchProp;
    if (researchProp !== undefined) {
      SetPolicyProp(researchProp, props, false, buildData.curValue);
    }
  });
  //政策
  store.state.gameData.policyArryList.forEach(function (policyItemData, key) {
    const researchProp = policyItemData.ResearchProp;
    if (researchProp !== undefined) {
      SetPolicyProp(
        researchProp,
        props,
        policyItemData.IsReduceProp,
        policyItemData.level
      );
    }
  });
  //政治背景
  store.state.gameData.LawArryList.forEach(function (lawItemData, key) {
    const researchProp = lawItemData.ResearchProp;
    if (researchProp !== undefined) {
      SetPolicyProp(
        researchProp,
        props,
        lawItemData.IsReduceProp,
        lawItemData.level
      );
    }
  });
  if (store.state.gameData.sourceArr.get(EnumResourceItem.Political)) {
    const value = store.state.gameData.sourceArr.get(
      EnumResourceItem.Political
    )!.cacheValue;
    let prop = 0;
    if (value > 0) prop = Math.log(value + 7) / 2 - 1;
    props.set(EnumResearchProp.PoliticalAllRatio, prop);
  }
  store.commit(UpdateProps, props);
  return props;
}

export function resourceUpdate(deltaTime: number) {
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const workConfig: number[] = store.state.gameData.workConfig;
  const researchComplete: number[] = store.state.gameData.researchComplete;
  const props = store.state.props;
  updateResourceMaxValue(props, sourceArr);
  //金钱部分先算,如果金钱会扣到零以下则所有工人全部停工
  const isDebts = calculateMoneySpeed(
    sourceArr,
    buildArryList,
    workConfig,
    props,
    deltaTime
  );
  //再算两种知识和政策的速率
  const isResearchDebts = calculatePolicySpeed(
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
      data.cacheMaxValue = data.BaseMax + prop;
    }
    if (enumKey === EnumResearchProp.PeopleMax) {
      data = sourceArr.get(EnumResourceItem.People)!;
      data.cacheMaxValue =
        sourceArr.get(EnumResourceItem.People)!.BaseMax + prop;
    }
    if (enumKey === EnumResearchProp.BelieverAddInfluenceMax) {
      //影响力上限等于基础值+信徒属性加成*当前信徒总数
      data = sourceArr.get(EnumResourceItem.Influence)!;
      data.cacheMaxValue =
        sourceArr.get(EnumResourceItem.People)!.BaseMax +
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

//根据速度更新资源的值
function updateResourceValue(
  data: resourceItemData,
  deltaTime: number,
  ID: number
) {
  if (!data.unlock) return 0;
  const add = data.cacheSpeed * deltaTime;
  if (
    data.cacheValue === undefined ||
    data.cacheValue === Infinity ||
    data.cacheValue === -Infinity
  )//一些意外保护
    data.cacheValue = 0;
  data.cacheValue += add;
  if (data.cacheMaxValue >= 0 && data.cacheValue > data.cacheMaxValue)
    data.cacheValue = data.cacheMaxValue;
  if (data.cacheValue < 0) {
    data.cacheValue = 0; //金钱小于0，上面会设置停工了；影响力小于0游戏结束，TODO 影响力扣的逻辑
  }
  if (data.ID === EnumResourceItem.Influence) {
    InfluenceLevel.forEach((value, index) => {
      if (data.cacheValue >= value)
        store.state.gameData.influenceLevel = index + 1; //0级无要求 1级是索引0
    });
    if (
      store.state.gameData.influenceLevel > 1 &&
      !store.state.setting.hasShowAcgGuide
    ) {
      StartGuideByID(10);
      store.state.setting.hasShowAcgGuide = true;
    }
  }
  const strValue = intToString(data.cacheValue);
  if (strValue !== data.curValue) {
    store.commit(ModifyResourceCurValue, {
      index: ID,
      value: strValue,
    });
  }
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
  let num2 = researchProps.get(EnumResearchProp.WorkBaseRatio)
    ? researchProps.get(EnumResearchProp.WorkBaseRatio)!
    : 0; //法案提供的工作基础值百分比
  switch (data.ID) {
    case EnumResourceItem.Influence: //影响力的速度公式：每个安排工作的提升1点 后面可能考虑科技
      const num1 = workConfig[EnumWorkType.InfluenceWork] * (1 + num2);
      data.cacheSpeed = num1;
      break;
    case EnumResourceItem.Believer: //信徒的公式，每个现有信徒乘以出生率
      data.cacheSpeed = Math.max(
        0.1,
        Math.pow(data.cacheValue, 0.5) * Resource.BaseBelieverRatio
      );
      break;
    case EnumResourceItem.People: //从众的公式 ，负债也会导致出生率停止
      if (isDebts) data.cacheSpeed = 0;
      else {
        const dataBeliever = sourceArr.get(EnumResourceItem.Believer)!;
        data.cacheSpeed = Math.max(
          0.1,
          Math.pow(dataBeliever.cacheValue, 0.5) * Resource.BaseBelieverRatio
        );
        if (dataBeliever.cacheMaxValue - data.cacheValue <= 0.001) {
          //信徒达到最大值
          data.cacheSpeed *= 2;
        }
      }
      break;
  }
  //这里再乘以全局速度加成,
  const propAllRatio = store.state.props.get(EnumResearchProp.PoliticalAllRatio)
    ? store.state.props.get(EnumResearchProp.PoliticalAllRatio)!
    : 0;
  data.cacheSpeed *= 1 + propAllRatio;
  const strValue = intToString(data.cacheSpeed, 2);
  if (strValue !== data.speed) {
    store.commit(SetResourceSpeed, {
      index: data.ID,
      value: strValue,
    });
  }
}

export function StartGuideByID(ID: number) {
  if (store.state.setting.closeGuide) return;
  if (store.state.gameData.PoliticalData.restartTime > 0) return;
  store.commit(UpdateGuideTips, ID);
  store.state.openGuide = true;
}
