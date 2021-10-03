import { App, State } from "@vue/runtime-core";
import { createStore  } from "vuex";
import { GameControl } from "../core/gameMain/game";
import { initGameData } from "../core/gameMain/gameSave";
import { TimeLineLog } from "../core/system/complain";
import { EnumResearchProp } from "../core/tables/Enum";
import { getters } from "./getters";
import { mutations } from "./mutations";

/*** 参数，资源enum：index， 值：value*/
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
export const UpdateAcgProgressValue = "updateAcgProgressValue";
export const UpdateProps = "updateProps";


export const store = createStore<State>({
  state: {
    running: false,
    haslog: false,
    guideTipsID: -1,
    gameData: initGameData(),
    openGuide:false,
    timelineLogs:[],
    gameFail:false,
    props:new Map<EnumResearchProp,number>([]),
    setting:{
      closeGuide :false,
      closeLog:false,
      closeNew:false,
      hasShowAcgGuide:false,
    }
  },
  mutations:mutations,
  getters:getters,
  
});

export function ResetStore(){
  store.state.haslog = false;
  store.state.running = false;
  store.state.guideTipsID = -1;
  store.state.gameData = initGameData();
  store.state.openGuide = false;
  store.state.timelineLogs = [];
  store.state.gameFail = false;
  store.state.props = new Map();
}

//玩家数据初始化的地方
export function initGameStore(app: App) {
  const gameControl = new GameControl();
  gameControl.Start(store.state);
  app.use(store);
}

