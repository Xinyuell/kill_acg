import * as store from "../../store/index";
import { intToString } from "../utils";
import { autoWork } from "../system/works";
import * as table from "../tables/table";
import * as ItemType from "../tables/Enum";
import * as GlobalConfig from "../tables/GlobalConfig";
import { buildItemData, resourceItemData } from "./gameSave";
import { checkResourceUnlock } from "../system/resource";
import { calculateMoneySpeed } from "./calculateMoneySpeed";
import { checkBuildUnlock } from "../system/build";



/** 重算全局属性，并提交给store */
export function CaculateProps(){
  const researchComplete: number[] = store.store.state.gameData.researchComplete;
  const buildArryList: Map<number, buildItemData> =
  store.store.state.gameData.buildArryList;
  const props: Map<table.EnumResearchProp, number> = new Map();
  //属性是动态算的
  researchComplete.forEach(function (id) {
    const researchProp = table.ResearchInfoList.get(id)!.ResearchProp;
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
  store.store.commit(store.UpdateProps,props);
  return props;
}

export function resourceUpdate(deltaTime: number) {
  const sourceArr: Map<number, resourceItemData> =
    store.store.state.gameData.sourceArr;
  const buildArryList: Map<number, buildItemData> =
    store.store.state.gameData.buildArryList;
  const workConfig: number[] = store.store.state.gameData.workConfig;
  const researchComplete: number[] = store.store.state.gameData.researchComplete;
  const props = CaculateProps();
  updateResourceMaxValue(props, sourceArr);
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
  props: Map<table.EnumResearchProp, number>,
  sourceArr: Map<number, resourceItemData>
) {
  props.forEach(function (prop, enumKey) {
    let data: resourceItemData | undefined = undefined;
    if (enumKey === ItemType.EnumResearchProp.BelieverMax) {
      data = sourceArr.get(ItemType.EnumResourceItem.Believer)!;
      data.cacheMaxValue = data.baseMaxValue + prop;
    }
    if (enumKey === ItemType.EnumResearchProp.PeopleMax) {
      data = sourceArr.get(ItemType.EnumResourceItem.People)!;
      data.cacheMaxValue =
        sourceArr.get(ItemType.EnumResourceItem.People)!.baseMaxValue + prop;
    }
    if (enumKey === ItemType.EnumResearchProp.BelieverAddInfluenceMax) {
      //影响力上限等于基础值+信徒属性加成*当前信徒总数
      data = sourceArr.get(ItemType.EnumResourceItem.Influence)!;
      data.cacheMaxValue =
        sourceArr.get(ItemType.EnumResourceItem.People)!.baseMaxValue +
        prop * sourceArr.get(ItemType.EnumResourceItem.Believer)!.cacheValue;
    }
    if (data === undefined) return;
    const strValue = intToString(data.cacheMaxValue);
    if (strValue !== data.maxValue) {
      store.store.commit(store.ModifyResourceMaxValue, {
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
  data.cacheValue += add;
  if (data.cacheMaxValue >= 0 && data.cacheValue > data.cacheMaxValue)
    data.cacheValue = data.cacheMaxValue;
  if (data.cacheValue < 0) {
    data.cacheValue = 0; //金钱小于0，上面会设置停工了；影响力小于0游戏结束，TODO 影响力扣的逻辑
  }
  if (data.ID === ItemType.EnumResourceItem.Influence) {
    GlobalConfig.GlobalConfig.InfluenceLevel.forEach((value,index)=>{
      if(data.cacheValue >= value)
      store.store.state.gameData.influenceLevel = index + 1;//0级无要求 1级是索引0
    })
  }
  const strValue = intToString(data.cacheValue);
  if (strValue !== data.curValue) {
    store.store.commit(store.ModifyResourceCurValue, {
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
  researchProps: Map<table.EnumResearchProp, number>,
  isDebts: boolean
) {
  if (!data.unlock) return;
  switch (data.ID) {
    case ItemType.EnumResourceItem.Influence: //影响力的速度公式：每个安排工作的提升1点 后面可能考虑科技
      const num1 = workConfig[ItemType.EnumWorkType.InfluenceWork];
      data.cacheSpeed = num1;
      break;
    case ItemType.EnumResourceItem.Cost1: //动漫知识的公式,工人转化*建筑提升
      let num5 = workConfig[ItemType.EnumWorkType.Cost1Work];
      if (researchProps.has(ItemType.EnumResearchProp.Cost1Ratio))
        num5 *= 1 + researchProps.get(ItemType.EnumResearchProp.Cost1Ratio)!;
      data.cacheSpeed = num5;
      break;
    case ItemType.EnumResourceItem.Cost2: //游戏知识的公式，工人转化*建筑提升
      let num6 = workConfig[ItemType.EnumWorkType.Cost2Work];
      if (researchProps.has(ItemType.EnumResearchProp.Cost2Ratio))
        num6 *= 1 + researchProps.get(ItemType.EnumResearchProp.Cost2Ratio)!;
      data.cacheSpeed = num6;
      break;
    case ItemType.EnumResourceItem.Believer: //信徒的公式，每个现有信徒乘以出生率
      data.cacheSpeed = Math.max(0.1,Math.pow(data.cacheValue, 0.5) * GlobalConfig.GlobalConfig.Resource.BaseBelieverRatio
      );
      break;
    case ItemType.EnumResourceItem.People: //从众的公式 ，负债也会导致出生率停止
      if (isDebts) data.cacheSpeed = 0;
      else {
        const dataBeliever = sourceArr.get(ItemType.EnumResourceItem.Believer)!;
        data.cacheSpeed = Math.max(
          0.1,
          Math.pow(dataBeliever.cacheValue, 0.5) * GlobalConfig.GlobalConfig.Resource.BaseBelieverRatio
        );
        if (dataBeliever.cacheMaxValue - data.cacheValue <= 0.00001) {
          //信徒达到最大值
          data.cacheSpeed *= 2;
        }
      }
      break;
  }
  const strValue = intToString(data.cacheSpeed, 2);
  if (strValue !== data.speed) {
    store.store.commit(store.SetResourceSpeed, {
      index: data.ID,
      value: strValue,
    });
  }
}

export function StartGuideByID(ID: number) {
  store.store.commit(store.UpdateGuideTips, ID);
  store.store.state.openGuide = true;
}


