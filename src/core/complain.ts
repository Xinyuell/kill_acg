import { NotificationParamsTyped, ElNotification } from "element-plus";
import { GameControl } from "./game";
import { language } from "./language";
import { store } from "./store";
import { EnumResearchItem, GlobalConfig } from "./table";

export enum EnumTimeLineLogType {
  /**举报log */
  Complain,
  /**固定时间点Log */
  Fixed,
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
  if (timelineLog.length >= 10) {
    //只保留0-8条
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
    for (let i = 9; i < length; i++) {
      const popLog = timelineLog.pop();
      if (popLog?.logType === EnumTimeLineLogType.Complain) {
        if (popLog.iconType === "warning") stateLog.wrongCount!++;
        else stateLog.rightCount!++;
      }
    }
    stateLog.content = "你一共举报成功: " + stateLog.rightCount! + "次；失败：" + stateLog.wrongCount + "次";
    if(stateIndex >= 9)
      timelineLog.unshift(stateLog);
    
  }
  timelineLog.unshift(log);
}

function onNotiClick(this: NotificationParamsTyped, ...a: any) {
  console.log(a, this as any);
  let logstr = (this as any).message;
  const classIndex = parseInt((this as any).title);
  logstr += language.comlainLogTips[classIndex];
  const log: TimeLineLog = {
    timestamp: GetCurrentTime(),
    iconType: classIndex > 0 ? "success" : "warning",
    color: classIndex > 0 ? "#67C23A" : "#E6A23C",
    content: logstr,
    logType: EnumTimeLineLogType.Complain,
  };
  //TODO 有一个是否保留log的选项
  AddTimeLineLog(log);
}

export function randomComplain() {
  setTimeout(() => {
    randomComplain();
  }, Math.random() * 1000 + 1000);
  //检查举报科技是否解锁
  //   if (
  //     store.state.gameData.researchComplete.indexOf(
  //       EnumResearchItem.ComplainUnLock
  //     ) < 0
  //   )
  //     return;
  //检查自动举报科技是否解锁
  // 随机10%概率出错误的举报；60%国内 25%国外 5%外太空
  const random1 = Math.random() * 100; //大类
  const random2 = Math.floor(Math.random() * 3); //小类
  let classIndex = 0;
  let duration = 1000;
  if (random1 < 10) {
    classIndex = 0;
    duration = 1000;
  } else if (random1 < 70) {
    //  国内1，2，3
    classIndex = random2 + 1;
    duration = 1000;
  } else if (random1 < 95) {
    //  国外4，5，6
    classIndex = random2 + 4;
    duration = 800;
  } else {
    //  外太空7 8 9
    classIndex = random2 + 7;
    duration = 600;
  }
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
  if (classIndex > 0) {
    ElNotification.success(params);
  } else {
    ElNotification.warning(params);
  }
}

export function GetCurrentTime() {
  const time =
    GlobalConfig.StartData +
    store.state.gameData.totalTime * GlobalConfig.VrtulTimeRatio;
  return new Date(time).toLocaleDateString();
}
