import { ElMessage, ElMessageBox } from "element-plus";
import { router } from "../../router";
import { ResetStore, store, UpdateAcgProgressValue } from "../../store";
import {
  AddTimeLineLog,
  GetCurrentLocalDateTime,
  EnumTimeLineLogType,
} from "../system/complain";
import { EnumResearchProp, EnumResourceItem } from "../tables/Enum";
import { AcgProgressData } from "../tables/GlobalConfig";
import language from "../tables/language";
import { SaveGame } from "./gameSave";
import { CalculateProps } from "./gameUpdate";

/** 当前获取的政治背景的值,传入信徒人数和重置次数 */
export function GetPoliticalCount(count: number, curRatio?: number) {
  let speed = 1;
  if (curRatio === undefined)
    curRatio =
      store.state.gameData.acgProgressValue / AcgProgressData.AcgProgressMax;
  if (curRatio <= 0.2) {
    speed = 4;
  } else if (curRatio <= 0.3) {
    speed = 3;
  } else if (curRatio <= 0.4) {
    speed = 2;
  } else if (curRatio <= 0.5) {
    speed = 1.5;
  }
  if (count < 200) return count * 0.2 * speed;
  else if (count < 400) return count * 0.3 * speed;
  return count * 0.4 * speed;
}

/**政治背景转化为全局加成公示 */
export function GetPropRatioByPolitical(value: number) {
  if (value <= 5) return value / 100;
  return Math.log(value + 1) * 0.8 - 1.5;
}

export function ResetGame() {
  const PoliticalData = store.state.gameData.PoliticalData;
  const setting = store.state.gameData.setting;
  let believer = 0;
  if (store.state.gameData.sourceArr.has(EnumResourceItem.Believer))
    believer = store.state.gameData.sourceArr.get(
      EnumResourceItem.Believer
    )!.cacheValue;

  const newPoliticalValue = GetPoliticalCount(Math.floor(believer));
  const LawArryList = store.state.gameData.LawArryList;
  PoliticalData.value =
    store.state.gameData.sourceArr.get(EnumResourceItem.Political)!.cacheValue +
    newPoliticalValue;
  PoliticalData.restartTime++;
  PoliticalData.totalTimes += store.state.gameData.totalTime;
  PoliticalData.LawLevel.length = 0;
  store.state.gameData.LawArryList.forEach(function (lawItemData, id) {
    PoliticalData.LawLevel.push({
      ID: lawItemData.ID,
      level: lawItemData.level,
    });
  });
  ResetStore();

  store.state.gameData.PoliticalData = PoliticalData;
  store.state.gameData.LawArryList = LawArryList;
  store.state.gameData.setting = setting;
  const resourcePolitical = store.state.gameData.sourceArr.get(
    EnumResourceItem.Political
  )!;
  resourcePolitical.cacheValue = PoliticalData.value;
  resourcePolitical.unlock = true;
  CalculateProps();
  store.state.haslog = true;
  store.state.running = true;
  SaveGame();
  store.state.running = false;
  router.push("/introduction");
}

export function acgProgressUpdate(deltaTime: number) {
  if (store.state.gameData.influenceLevel <= 1) return;
  //ACG进度速度从40% 翻倍 30%翻倍 20%翻倍 10%翻倍
  let speed = AcgProgressData.AcgProgressSpeed;
  const curRatio =
    store.state.gameData.acgProgressValue / AcgProgressData.AcgProgressMax;
  if (curRatio <= 0.2) {
    speed *= 16;
  } else if (curRatio <= 0.3) {
    speed *= 8;
  } else if (curRatio <= 0.4) {
    speed *= 4;
  } else if (curRatio <= 0.5) {
    speed *= 2;
  }
  const prop = store.state.props.get(
    EnumResearchProp.ReduceAcgProgressSpeedRatio
  )
    ? store.state.props.get(EnumResearchProp.ReduceAcgProgressSpeedRatio)!
    : 0;
  speed *= prop;
  store.commit(UpdateAcgProgressValue, deltaTime * speed);
  //游戏成功失败的结算
  if (store.state.gameData.acgProgressValue >= AcgProgressData.AcgProgressMax) {
    ElMessageBox.alert(language.endGame.fail, "注意！", {
      dangerouslyUseHTMLString: true,
      confirmButtonText: "OK",
      callback: (action: string) => {
        ResetGame();
      },
    });
    store.state.gameFail = true;
  } else if (store.state.gameData.acgProgressValue <= 0) {
    store.state.gameData.acgProgressValue = 0;
    ElMessageBox.alert(language.endGame.success, "游戏胜利！此处应有烟花", {
      dangerouslyUseHTMLString: true,
      confirmButtonText: "OK",
      callback: (action: string) => {
        ResetGame();
      },
    });
    store.state.gameFail = true;
  }
}
