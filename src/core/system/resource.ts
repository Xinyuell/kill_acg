import { store, UnlockResource } from "../../store/index";
import { EnumResourceItem } from "../tables/Enum";
import { resourceItemData } from "../gameMain/gameSave";

//资源的解锁检查
export function checkResourceUnlock(
  data: resourceItemData,
  sourceArr: Map<number, resourceItemData>) {
  //影响力提升等级和各种解锁
  if (data.unlock)
    return;
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
