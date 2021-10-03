import {
  NotificationParamsTyped,
  ElNotification,
  ElMessage,
} from "element-plus";
import language from "../tables/language";
import {
  ModifyResourceCurValue,
  store,
  UpdateAcgProgressValue,
} from "../../store";
import { intToString } from "../utils";
import { EnumResearchItem, EnumResearchProp, EnumWorkType } from "../tables/Enum";
import  { AcgProgressData, GameTime } from "../tables/GlobalConfig";

export enum EnumTimeLineLogType {
  /**举报log */
  Complain,
  /**历史事件Log */
  History,
  /**正常log*/
  Normal,
  /**举报log合并项 */
  ComplainState,
}

export interface TimeLineLog {
  timestamp?: string;
  iconType: "primary" | "success" | "warning" | "danger" | "info";
  color: string;
  content: string;
  rightCount?: number;
  wrongCount?: number;
  logType: EnumTimeLineLogType;
}

const posType: ["top-left", "top-right", "bottom-right", "bottom-left"] = [
  "top-left",
  "top-right",
  "bottom-right",
  "bottom-left",
];

/**增加一条log，默认最多十条，举报信息会合并，其他信息会丢弃 */
export function AddTimeLineLog(log: TimeLineLog) {
  const timelineLog = store.state.timelineLogs;
  if (timelineLog.length >= 6) {
    //举报合并log初始化
    let stateIndex = -1;
    timelineLog.forEach((value, index) => {
      if (value.logType === EnumTimeLineLogType.ComplainState)
        stateIndex = index;
    });
    if (stateIndex < 0) {
      const log: TimeLineLog = {
        iconType: "success",
        color: "#67C23A",
        content: "",
        logType: EnumTimeLineLogType.ComplainState,
        rightCount: 0,
        wrongCount: 0,
      };
      timelineLog.unshift(log);
      stateIndex = 0;
    }
    let length = timelineLog.length - 1;
    let stateLog = timelineLog[stateIndex];
    store.state.timelineLogs = timelineLog.filter(function (value) {
      if (value.logType === EnumTimeLineLogType.Complain) {
        if (value.iconType === "warning") stateLog.wrongCount!++;
        else stateLog.rightCount!++;
        return false;
      }
      return true;
    });
    stateLog.content =
      "你一共举报成功: " +
      stateLog.rightCount! +
      "次；失败：" +
      stateLog.wrongCount +
      "次";
    //如果此时删完所有的举报log还大于6条，就删完除统计外的log
    if (timelineLog.length >= 6) {
      store.state.timelineLogs = timelineLog.filter(function (value) {
        return value.logType === EnumTimeLineLogType.ComplainState;
      });
    }
  }
  store.state.timelineLogs.unshift(log);
}

function onNotiClick(this: NotificationParamsTyped) {
  if ((this as any).logd) {
    ElMessage.error({
      showClose: true,
      message: "已经举报过了。得饶人处且饶人吧",
    });
    return;
  }
  const logStr = (this as any).message;
  const classIndex = parseInt((this as any).title);
  ShowComplainLog(logStr, classIndex);
  (this as any).logd = true;
}

function ShowComplainLog(logstr: string, classIndex: number) {
  logstr += language.comlainLogTips[classIndex];
  const prop = store.state.props.get(EnumResearchProp.ComplainAcgRatio) ? store.state.props.get(EnumResearchProp.ComplainAcgRatio)! : 0;
  const sourceArr = store.state.gameData.sourceArr;
  if (classIndex == 0) {
    const value =
      store.getters.getInfluenceItem *
      AcgProgressData.ComplainWrongValueRatio;
    store.commit(ModifyResourceCurValue, -value);
    logstr += "你降低了" + intToString(value) + "点影响力";
  } else if (classIndex <= 3) {
    const value = AcgProgressData.ComplainAcgLevel1 * (1+prop);
    store.commit(
      UpdateAcgProgressValue,
      -value
    );
    logstr +=
      "ACG文化降低了" +
      intToString(value) +
      "点影响力";
  } else if (classIndex <= 6) {
    const value = AcgProgressData.ComplainAcgLevel2 * (1+prop);
    store.commit(
      UpdateAcgProgressValue,
      -value
    );
    logstr +=
      "ACG文化降低了" +
      intToString(value) +
      "点影响力";
  } else if (classIndex <= 9) {
    const value = AcgProgressData.ComplainAcgLevel3 * (1+prop);
    store.commit(
      UpdateAcgProgressValue,
      -value
    );
    logstr +=
      "ACG文化降低了" +
      intToString(value) +
      "点影响力";
  }
  const log: TimeLineLog = {
    timestamp: GetCurrentLocalDateTime(),
    iconType: classIndex > 0 ? "success" : "warning",
    color: classIndex > 0 ? "#67C23A" : "#E6A23C",
    content: logstr,
    logType: EnumTimeLineLogType.Complain,
  };
  AddTimeLineLog(log);
}

export function randomComplain() {
  setTimeout(() => {
    randomComplain();
  }, Math.random() * 10000 + 10000);
  if (!store.state.running) {
    return;
  }
  if (store.state.gameFail) {
    return;
  }
  if (
    store.state.gameData.researchComplete.indexOf(
      EnumResearchItem.ComplainUnLock
    ) < 0
  )
    return;
  const params = GetRandomComplain();
  if (params === undefined) return;
  if (params.title !== "0") {
    ElNotification.success(params);
  } else {
    ElNotification.warning(params);
  }
}

function GetRandomComplain() {
  const random1 = Math.random() * 100; //大类
  const random2 = Math.floor(Math.random() * 3); //小类
  let classIndex = 0;
  let duration = 1000;
  const researchComplete = store.state.gameData.researchComplete;
  const hasAuto =
    researchComplete.indexOf(EnumResearchItem.BelieverInfluenceMax2) >= 0;
  const hasAutoLevel1 =
    researchComplete.indexOf(EnumResearchItem.AutoComplainLevel1) >= 0;
  const hasAutoLevel2 =
    researchComplete.indexOf(EnumResearchItem.AutoComplainLevel2) >= 0;
  if (random1 < 10) {
    classIndex = 0;
    duration = 1000;
  } else if (random1 < 70) {
    //  国内1，2，3
    classIndex = random2 + 1;
    duration = 800;
  } else if (random1 < 95) {
    //  国外4，5，6
    classIndex = random2 + 4;
    duration = 600;
  } else {
    //  外太空7 8 9
    classIndex = random2 + 7;
    duration = 400;
  }
  if (hasAuto && classIndex <= 3) {
    return;
  }
  if (hasAutoLevel1 && classIndex <= 6) {
    return;
  }
  if (hasAutoLevel2 && classIndex <= 9) {
    return;
  }
  return GetTimelogParams(classIndex, duration);
}

function GetTimelogParams(classIndex: number, duration: number) {
  const complainContent = language.complain[classIndex];
  const index = Math.floor(Math.random() * complainContent.length);
  const pos = Math.floor(Math.random() * 4);
  const offset = Math.random() * 500;
  const params: NotificationParamsTyped = {
    title: classIndex.toString(),
    message: complainContent[index],
    duration: duration,
    position: posType[pos],
    offset: offset,
    showClose: false,
    onClick: onNotiClick,
  };
  return params;
}

export function autoRandomComplain() {
  const researchComplete = store.state.gameData.researchComplete;
  const sourceArr = store.state.gameData.sourceArr;
  const workPeople = store.state.gameData.workConfig[EnumWorkType.ComplainWork];
  if (
    store.state.running &&
    !store.state.gameFail &&
    researchComplete.indexOf(EnumResearchItem.BelieverInfluenceMax2) >= 0 &&
    workPeople > 0
  ) {
    const CD = GetAutoComplainCD();
    const hasAutoLevel1 =
      researchComplete.indexOf(EnumResearchItem.AutoComplainLevel1) >= 0;
    const hasAutoLevel2 =
      researchComplete.indexOf(EnumResearchItem.AutoComplainLevel2) >= 0;
    const random1 = Math.random() * 100; //大类
    const random2 = Math.floor(Math.random() * 3); //小类
    let classIndex = 1;
    if (hasAutoLevel2) {
      //5:3:2 国内国外外太空
      if (random1 <= 50) {
        classIndex += random2;
      } else if (random1 <= 80) {
        classIndex += random2 + 3;
      } else {
        classIndex += random2 + 6;
      }
    } else if (hasAutoLevel1) {
      //6：4
      if (random1 <= 60) {
        classIndex += random2;
      } else if (random1 <= 40) {
        classIndex += random2 + 3;
      }
    } else classIndex += random2;

    const complainContent = language.complain[classIndex];
    const index = Math.floor(Math.random() * complainContent.length);
    ShowComplainLog(complainContent[index], classIndex);
    setTimeout(() => {
      autoRandomComplain();
    }, CD * 1000);
  } else {
    setTimeout(() => {
      autoRandomComplain();
    }, 3000);
  }
}

export function GetAutoComplainCD() {
  const workPeople = store.state.gameData.workConfig[EnumWorkType.ComplainWork];
  if (workPeople <= 0) return -1;
  const prop = store.state.props.get(EnumResearchProp.ComplainCD) ? store.state.props.get(EnumResearchProp.ComplainCD)! : 0
  return 200 / Math.pow(workPeople + 50, (0.4 + prop));
}

/**获取指定毫秒数转化的时间戳 */
export function GetCurrentLocalDateTime(time: number): string;
/**获取当前的时间戳 */
export function GetCurrentLocalDateTime(): string;
export function GetCurrentLocalDateTime(time?: number): string {
  if (time === undefined) {
    return new Date(
      GameTime.StartDate +
        store.state.gameData.totalTime * GameTime.VrtulTimeRatio
    ).toLocaleDateString();
  }
  return new Date(time).toLocaleDateString();
}
