import { App, State } from "@vue/runtime-core";
import { createStore } from "vuex";
import { GameControl } from "./game";
import { GameData, initGameData } from "./gameSave";

/**
 * 参数，资源enum：index， 值：value
 */
export const ModifyResourceCurValue = "modifyResourceCurValue";
export const ModifyResourceMaxValue = "modifyResourceMaxValue";
export const SetResourceSpeed = "setResourceSpeed";
export const SetGameRunning = "setGameRunning";
export const ReplaceGameData = "replaceGameData";
export const UpdateNews = "updateNews";
export const UpdateGuideTips = "updateGuideTips";
export const CompleteResearch = "completeResearch";
export const UnlockResearch = "unlockResearch";
export const UnlockBuild = "unlockBuild";
export const UnlockResource = "unlockResource";
export const UpdateWorkConfig = "updateWorkConfig";
export const UpdateAutoWorkIndex = "updateAutoWorkIndex";

export const store = createStore({
  state: {
    running: false,
    haslog: false,
    guideTipsID: -1,
    gameData:initGameData()
  },
  mutations: {
    modifyResourceCurValue(state: State, payload: any) {
      if (state.gameData.sourceArr.has(payload.index))
        state.gameData.sourceArr.get(payload.index)!.curValue = payload.value;
    },
    modifyResourceMaxValue(state: State, payload: any) {
      if (state.gameData.sourceArr.has(payload.index))
        state.gameData.sourceArr.get(payload.index)!.maxValue += payload.value;
    },
    setResourceSpeed(state: State, payload: any) {
      if (state.gameData.sourceArr.has(payload.index))
        state.gameData.sourceArr.get(payload.index)!.speed = payload.value;
    },
    setGameRunning(state: State, payload) {
      state.running = payload;
    },
    replaceGameData(state: State, paload: any) {
      state.gameData = paload;
    },
    updateNews(state: State, paload: any) {
      state.gameData.newsID[paload.newsIndex] = paload.news;
    },
    updateGuideTips(state: State, paload: number) {
      state.guideTipsID = paload;
    },
    completeResearch(state: State, paload: any) {
      state.gameData.researchComplete.push(paload);
    },
    unlockResearch(state: State, paload: number[]) {
      paload.forEach(function (id) {
        state.gameData.researchUnLockList.push(id);
      });
    },
    unlockBuild(state: State, paload: any) {
      if (state.gameData.buildArryList.has(paload))
        state.gameData.buildArryList.get(paload)!.unlock = true;
    },
    unlockResource(state: State, paload: any) {
      if (state.gameData.sourceArr.has(paload))
        state.gameData.sourceArr.get(paload)!.unlock = true;
    },
    updateWorkConfig(state: State, paload) {
      state.gameData.workConfig[paload.index] += paload.value;
    },
    updateAutoWorkIndex(state: State, paload: number) {
      state.gameData.autoWorkIndex = paload;
    },
  },
});

//玩家数据初始化的地方
export function initGameStore(app: App) {
  const gameControl = new GameControl();
  gameControl.Start(store.state);
  app.use(store);
}



