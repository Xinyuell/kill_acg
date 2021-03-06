import { store } from "../../store";
import { GameTime } from "../tables/GlobalConfig";
import language from "../tables/language";
import {
  AddTimeLineLog,
  EnumTimeLineLogType,
  GetCurrentLocalDateTime,
} from "./complain";

export function GetCurrentUTCTime() {
  const time =
    GameTime.StartDate +
    store.state.gameData.totalTime * GameTime.VrtulTimeRatio;
  return time;
}

export function updateHistory() {
  const currentLogID = store.state.gameData.historyLogID;
  const historyLogs = language.history;
  for (let i = currentLogID + 1; i < historyLogs.length - 1; i++) {
    const data = historyLogs[i];
    if (GetCurrentUTCTime() >= data.time) {
      AddTimeLineLog({
        timestamp: GetCurrentLocalDateTime(data.time),
        iconType: "success",
        color: "#67C23A",
        content: data.log,
        logType: EnumTimeLineLogType.History,
      });
      store.state.gameData.historyLogID = i;
      if (i === 1 || i >= 3) {
        store.state.gameData.acgProgressValue -=
          store.state.gameData.acgProgressValue * 0.1;
      }
      return;
    }
  }
}
