import { AddTimeLineLog, EnumTimeLineLogType, GetCurrentLocalDateTime } from "./complain";
import { language } from "./language";
import { store } from "./store";
import { GlobalConfig } from "./table";

export function GetCurrentUTCTime() {
    const time =
      GlobalConfig.StartData +
      store.state.gameData.totalTime * GlobalConfig.VrtulTimeRatio;
    return time;
}
  

export function updateHistory(){
    const currentLogID = store.state.gameData.historyLogID;
    const historyLogs = language.history;
    for(let i= currentLogID + 1;i<historyLogs.length-1;i++){
        const data = historyLogs[i];
        if(GetCurrentUTCTime() >= data.time){
            AddTimeLineLog({
                timestamp: GetCurrentLocalDateTime(data.time),
                iconType: "success" ,
                color: "#67C23A",
                content: data.log,
                logType: EnumTimeLineLogType.History
            })
            store.state.gameData.historyLogID = i;
            return;
        }
    }
}