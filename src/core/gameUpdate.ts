import { buildPanelData, resourcePanelData } from "./game";
import {
  ModifyResourceCurValue,
  SetResourceSpeed,
  store,
  UpdateGuideTips,
} from "./store";
import { intToString } from "./utils";

export function resourceUnpate(deltaTime: number) {
  const sourceArr: Map<number, resourcePanelData> =
    store.state.gameData.sourceArr;
  const buildArryList: Map<number, buildPanelData> =
    store.state.gameData.buildArryList;
  //第二个循环算值

  sourceArr.forEach(function (data, ID) {
    checkResourceUnlock(data, sourceArr);
    updateResourceValue(data, deltaTime, ID);
  });

  buildArryList.forEach(function (data, ID) {
    checkBuildUnlock(data, sourceArr, buildArryList);
  });
}

//根据速度更新资源的值
function updateResourceValue(
  data: resourcePanelData,
  deltaTime: number,
  ID: number
) {
  const add = data.cacheSpeed * deltaTime;
  data.cacheValue += add;
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
  data: resourcePanelData,
  sourceArr: Map<number, resourcePanelData>,
  buildArryList: Map<number, buildPanelData>
) {
  if (!data.unlock) return;
  switch (data.ID) {
    case 1: //影响力的速度公式：每个信徒提升1点基础值 * 各种建筑的加成 + 从众
      const num1 = sourceArr.get(5)!.cacheValue;
      const num2 = sourceArr.get(6)!.cacheValue;
      data.cacheSpeed = num1 + num2;
      const strValue = intToString(data.cacheSpeed);
      if (strValue !== data.speed) {
        store.commit(SetResourceSpeed, {
          index: 1,
          value: strValue,
        });
      }
      break;
    case 2: //金钱的公式，主要根据建筑的加成来算
      break;
    case 3: //动漫知识的公式
      break;
    case 4: //游戏知识的公式
      break;
    case 5: //信徒的公式
      break;
    case 6: //从众的公式
      break;
  }
}

//建筑的解锁，城市的解锁是单独通过影响力等级决定的
function checkBuildUnlock(
  data: buildPanelData,
  sourceArr: Map<number, resourcePanelData>,
  buildArryList: Map<number, buildPanelData>
) {
  if (data.unlock) return;
  switch (data.ID) {
    case 2: //解锁获得金钱按钮
      if (sourceArr.get(1)!.cacheValue >= 10) {
        data.unlock = true;
        store.commit(UpdateGuideTips, 0);
      }
      break;
    case 3: //解锁获得知识按钮
      if (sourceArr.get(1)!.cacheValue >= 20) {
        data.unlock = true;
        store.commit(UpdateGuideTips, 1);
      }
      break;
  }
}

//资源的解锁检查
function checkResourceUnlock(
  data: resourcePanelData,
  sourceArr: Map<number, resourcePanelData>
) {
  if (data.unlock) return;
  switch (data.ID) {
    case 2: //解锁金钱，需要影响力大于10
      if (sourceArr.get(1)!.cacheValue >= 10) data.unlock = true;
      break;
    case 3: //解锁知识，影响力大于20
      if (sourceArr.get(1)!.cacheValue >= 20) data.unlock = true;
      break;
  }
}
