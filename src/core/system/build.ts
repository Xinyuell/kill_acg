import {
    store,
    UnlockBuild, UnlockResource
  } from "../../store/index";
  import { EnumResourceItem, EnumBuildItem, BuildInfoList } from "../tables/table";
  import { buildItemData, resourceItemData } from "../gameMain/gameSave";
  import { StartGuideByID } from "../gameMain/gameUpdate";
  
  //建筑的解锁
  export function checkBuildUnlock(
    data: buildItemData,
    sourceArr: Map<number, resourceItemData>,
    buildArryList: Map<number, buildItemData>,
    researchComplete: number[]) {
    if (data.unlock)
      return;
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