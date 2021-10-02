import { store, UpdateWorkConfig } from "../../store";
import { EnumResourceItem } from "../tables/Enum";

/**
 * 获取正在工作的总人数
 */
 export function GetTotalWorks() {
    let result = 0; //总工人数量
    store.state.gameData.workConfig.forEach(function (value: number) {
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
 export function autoWork(workConfig: number[]) {
    let currentPeople = GetTotalPeople();
    //异常处理，当前工人数小于已工作数
    let total = GetTotalWorks();
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
    }
    //此时如果是关闭自动分配就直接返回了
    if (store.state.gameData.autoWorkIndex < 0) return;
  
    //这是一层保险，当前人数当然要比现有人数大1个才能+1
    if (Math.floor(currentPeople - total + 0.000001) >= 1) {
      store.commit(UpdateWorkConfig, {
        index: store.state.gameData.autoWorkIndex,
        value: 1,
      });
    }
  }