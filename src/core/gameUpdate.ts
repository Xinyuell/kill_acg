import { resourcePanelData } from "./game";
import { ModifyResourceCurValue, store } from "./store";
import { intToString } from "./utils";

export function resourceUnpate(deltaTime: number) {
  //第一个循环算出速度
  //第二个循环算值
  const sourceArr: Map<number, resourcePanelData> =
    store.state.gameData.sourceArr;
  sourceArr.forEach(function (data, ID, sourceArr) {
    checkResourceUnlock(data);
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
}

//资源的解锁检查
function checkResourceUnlock(data: resourcePanelData) {
  if (data.unlock) return;
  const sourceArr = store.state.gameData.sourceArr;
  switch (data.ID) {
    case 1: //解锁金钱，影响力大于10
      break;
  }
}
