import { store, UpdateProps, ModifyResourceMaxValue, ModifyResourceCurValue, SetResourceSpeed, UpdateGuideTips } from "../../store/index";
import { intToString } from "../utils";
import { autoWork } from "../system/works";
import { ResearchInfoList } from "../tables/table";
import { EnumResearchProp, EnumResourceItem, EnumWorkType } from "../tables/Enum";
import { buildItemData, resourceItemData } from "./gameSave";
import { checkResourceUnlock } from "../system/resource";
import { calculateMoneySpeed } from "./calculateMoneySpeed";
import { checkBuildUnlock } from "../system/build";
import { InfluenceLevel, Resource } from "../tables/GlobalConfig";



/** 重算全局属性，并提交给store */
export function CaculateProps(){
  const researchComplete: number[] = store.state.gameData.researchComplete;
  const buildArryList: Map<number, buildItemData> =
  store.state.gameData.buildArryList;
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
  store.commit(UpdateProps,props);
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
  if (data.ID === EnumResourceItem.Influence) {
    InfluenceLevel.forEach((value,index)=>{
      if(data.cacheValue >= value)
      store.state.gameData.influenceLevel = index + 1;//0级无要求 1级是索引0
    })
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
      data.cacheSpeed = Math.max(0.1,Math.pow(data.cacheValue, 0.5) * Resource.BaseBelieverRatio
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

export function StartGuideByID(ID: number) {
  store.commit(UpdateGuideTips, ID);
  store.state.openGuide = true;
}


