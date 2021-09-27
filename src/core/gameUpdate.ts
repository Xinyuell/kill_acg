import { buildItemData, resourceItemData } from "./gameSave";
import {
  ModifyResourceCurValue,
  SetResourceSpeed,
  store,
  UpdateGuideTips,
} from "./store";
import { EnumResourceItem } from "./table";
import { intToString } from "./utils";

export function resourceUnpate(deltaTime: number) {
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  //第二个循环算值

  sourceArr.forEach(function (data, ID) {
    setResourceSpeed(data, sourceArr, buildArryList);
    checkResourceUnlock(data, sourceArr);
    updateResourceValue(data, deltaTime, ID);
  });

  buildArryList.forEach(function (data, ID) {
    checkBuildUnlock(data, sourceArr, buildArryList);
  });
}

//根据速度更新资源的值
function updateResourceValue(
  data: resourceItemData,
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
  data: resourceItemData,
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>
) {
  if (!data.unlock) return;
  switch (data.ID) {
    case EnumResourceItem.Influence: //影响力的速度公式：每个信徒提升1点基础值 * 各种建筑的加成 + 从众
      const num1 = sourceArr.get(EnumResourceItem.Believer)!.cacheValue;
      const num2 = sourceArr.get(EnumResourceItem.People)!.cacheValue;
      data.cacheSpeed = num1 + num2;

      break;
    case EnumResourceItem.Money: //金钱的公式，每点影响力提供0.1
      const num3 = sourceArr.get(EnumResourceItem.Influence)!.cacheValue;
      data.cacheSpeed = num3 / 20;
      break;
    case EnumResourceItem.Cost1: //动漫知识的公式
      break;
    case EnumResourceItem.Cost2: //游戏知识的公式
      break;
    case EnumResourceItem.Believer: //信徒的公式
      break;
    case EnumResourceItem.People: //从众的公式
      break;
  }
  const strValue = intToString(data.cacheSpeed);
  if (strValue !== data.speed) {
    store.commit(SetResourceSpeed, {
      index: data.ID,
      value: strValue,
    });
  }
}

//建筑的解锁，城市的解锁是单独通过影响力等级决定的
function checkBuildUnlock(
  data: buildItemData,
  sourceArr: Map<number, resourceItemData>,
  buildArryList: Map<number, buildItemData>
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
  data: resourceItemData,
  sourceArr: Map<number, resourceItemData>
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
