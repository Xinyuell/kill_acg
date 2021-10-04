import { State } from "vue";
import { ResetGameData } from "../core/gameMain/gameSave";
import { EnumResearchProp } from "../core/tables/Enum";

export const mutations = {
  modifyResourceCurValue(state: State, payload: any) {
    if (state.gameData.sourceArr.has(payload.index))
      state.gameData.sourceArr.get(payload.index)!.curValue = payload.value;
  },
  modifyResourceMaxValue(state: State, payload: any) {
    if (state.gameData.sourceArr.has(payload.index))
      state.gameData.sourceArr.get(payload.index)!.maxValue = payload.value;
  },
  setResourceSpeed(state: State, payload: any) {
    if (state.gameData.sourceArr.has(payload.index))
      state.gameData.sourceArr.get(payload.index)!.speed = payload.value;
  },
  updateProps(state: State, payload: Map<EnumResearchProp, number>) {
    state.props = payload;
  },
  setGameRunning(state: State, payload: boolean) {
    state.running = payload;
  },
  replaceGameData(state: State, paload: any) {
    ResetGameData(state,paload);
  },
  updateNews(state: State, paload: number) {
    state.gameData.newsID.add(paload);
  },
  updateGuideTips(state: State, paload: number) {
    state.guideTipsID = paload;
  },
  completeResearch(state: State, paload: any) {
    if (state.gameData.researchComplete.indexOf(paload) < 0)
      state.gameData.researchComplete.push(paload);
  },
  unlockResearch(state: State, paload: number[]) {
    paload.forEach(function (id) {
      if (state.gameData.researchUnLockList.indexOf(id) < 0)
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
  updateWorkConfig(state: State, paload: { index: number; value: number }) {
    state.gameData.workConfig[paload.index] += paload.value;
    if (state.gameData.workConfig[paload.index] < 0)
      state.gameData.workConfig[paload.index] = 0;
  },
  updateAutoWorkIndex(state: State, paload: number) {
    state.gameData.autoWorkIndex = paload;
  },
  updateAcgProgressValue(state: State, paload: number) {
    state.gameData.acgProgressValue += paload;
  },
};
