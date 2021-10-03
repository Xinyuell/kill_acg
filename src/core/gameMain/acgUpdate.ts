import { ElMessage } from "element-plus";
import { store, UpdateAcgProgressValue } from "../../store";
import {
  AddTimeLineLog,
  GetCurrentLocalDateTime,
  EnumTimeLineLogType,
} from "../system/complain";
import { AcgProgressData } from "../tables/GlobalConfig";
import language from "../tables/language";

/** 当前获取的政治背景的值,传入信徒人数和重置次数 */
export function GetPoliticalCount(count: number, times: number) {
  return (count / 3) * Math.log(times + 3) / Math.log(3);
}



export function acgProgressUpdate(deltaTime: number) {
  if (store.state.gameData.influenceLevel <= 1) return;
  store.commit(
    UpdateAcgProgressValue,
    deltaTime * AcgProgressData.AcgProgressSpeed
  );
  if (store.state.gameData.acgProgressValue >= AcgProgressData.AcgProgressMax) {
    ElMessage.error({
      showClose: true,
      message: language.endGame.fail1,
    });
    setTimeout(() => {
      ElMessage.warning({
        showClose: true,
        message: language.endGame.fail2,
      });
    }, 4000);
    AddTimeLineLog({
      timestamp: GetCurrentLocalDateTime(),
      iconType: "warning",
      color: "#67C23A",
      content: language.endGame.fail3,
      logType: EnumTimeLineLogType.Normal,
    });
    store.state.gameFail = true;
  } else if (store.state.gameData.acgProgressValue <= 0) {
    store.state.gameData.acgProgressValue = 0;
    ElMessage.success({
      showClose: true,
      message: language.endGame.success1,
    });
    setTimeout(() => {
      ElMessage.warning({
        showClose: true,
        message: language.endGame.success2,
      });
    }, 4000);
    AddTimeLineLog({
      timestamp: GetCurrentLocalDateTime(),
      iconType: "warning",
      color: "#67C23A",
      content: language.endGame.success3,
      logType: EnumTimeLineLogType.Normal,
    });
    store.state.gameFail = true;
  }
}
