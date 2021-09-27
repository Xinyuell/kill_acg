import { buildPanelData, resourcePanelData } from "./game";
import { ModifyResourceCurValue, store, UpdateGuideTips } from "./store";
import { intToString } from "./utils";

export function resourceUnpate(deltaTime: number) {
  const sourceArr: Map<number, resourcePanelData> =
    store.state.gameData.sourceArr;
  const buildArryList: Map<number, buildPanelData> =
    store.state.gameData.buildArryList;
  //第一个循环算出速度
  //第二个循环算值

  sourceArr.forEach(function (data, ID) {
    checkResourceUnlock(data, sourceArr);
    const add = data.speed * deltaTime;
    data.cacheValue += add;
    const strValue = intToString(data.cacheValue);
    if (strValue !== data.curValue) {
      store.commit(ModifyResourceCurValue, {
        index: ID,
        value: strValue,
      });
    }
  });

  buildArryList.forEach(function (data, ID) {
    checkBuildUnlock(data, sourceArr,buildArryList);
  });
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
          data.unlock = true
          store.commit(UpdateGuideTips,0);
        }
      break;
    case 3: //解锁获得知识按钮
      if (sourceArr.get(1)!.cacheValue >= 20) {
        data.unlock = true
        store.commit(UpdateGuideTips,1);
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
