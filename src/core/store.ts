import { App } from "@vue/runtime-core";
import { createStore } from "vuex";
import { GameControl} from "./game";
import {  GameData } from "./gameSave";

export const ModifyResourceCurValue = "modifyResourceCurValue";
export const ModifyResourceMaxValue = "modifyResourceMaxValue";
export const SetResourceSpeed = "setResourceSpeed";
export const SetGameRunning = "setGameRunning";
export const ReplaceGameData = "replaceGameData";
export const UpdateNews = "updateNews";
export const UpdateGuideTips = "updateGuideTips";
export const CompleteResearch = "completeResearch";
export const UnlockResearch = "unlockResearch";

export const store = createStore({
  state: {
    running: false,
    haslog: false,
    guideTipsID: -1,
  },
  mutations: {
    modifyResourceCurValue(state: any, payload: any) {
      const data: GameData = state.gameData;
      if (data.sourceArr.has(payload.index))
        data.sourceArr.get(payload.index)!.curValue = payload.value;
    },
    modifyResourceMaxValue(state: any, payload: any) {
      const data: GameData = state.gameData;
      if (data.sourceArr.has(payload.index))
        data.sourceArr.get(payload.index)!.maxValue += payload.value;
    },
    setResourceSpeed(state: any, payload: any) {
      const data: GameData = state.gameData;
      if (data.sourceArr.has(payload.index))
        data.sourceArr.get(payload.index)!.speed = payload.value;
    },
    setGameRunning(state: any, payload) {
      state.running = payload;
    },
    replaceGameData(state: any, paload: any) {
      state.gameData = paload;
    },
    updateNews(state: any, paload: any) {
      const data: GameData = state.gameData;
      data.newsID[paload.newsIndex] = paload.news;
    },
    updateGuideTips(state: any, paload: number) {
      state.guideTipsID = paload;
    },
    completeResearch(state:any,paload:any){
      const data: GameData = state.gameData;
      data.researchComplete.push(paload);
    },
    unlockResearch(state:any,paload:number[]){
      const data: GameData = state.gameData;
      paload.forEach(function(id){
        data.researchUnLockList.push(id);
      })
    }
  },
});

//玩家数据初始化的地方
export function initGameStore(app: App) {
  const gameControl = new GameControl();
  const gameData: GameData = gameControl.Start();
  store.state.gameData = gameData;
  app.use(store);
}
