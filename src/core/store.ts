import { App } from "@vue/runtime-core"
import {createStore} from "vuex"
import { GameControl, GameData, GameDataPayLoad } from "./game";

export const ModifyResourceCurValue = "modifyResourceCurValue";
export const ModifyResourceMaxValue = "modifyResourceCurValue";
export const SetResourceSpeed = "modifyResourceCurValue";
export const SetGameRunning = "setGameRunning";
export const ReplaceGameData = "replaceGameData";
export const UpdateNews = "updateNews";


export const store = createStore({
    state:{
        running:false,
        haslog:false,
    },
    mutations:{
        modifyResourceCurValue(state:any,payload:GameDataPayLoad){
            const data:GameData = state.gameData;
            data.sourceArr[payload.index].curValue = payload.value;
        },
        modifyResourceMaxValue(state:any,payload:any){
            const data:GameData = state.gameData;
            data.sourceArr[payload.index].maxValue += payload.value;
        },
        setResourceSpeed(state:any,payload:any){
            const data:GameData = state.gameData;
            data.sourceArr[payload.index].speed = payload.value;
        },
        setGameRunning(state:any,payload){
            state.running = payload;
        },
        replaceGameData(state:any,paload:any){
            state.gameData = paload;
        },
        updateNews(state:any,paload:any){
            const data:GameData = state.gameData;
            data.newID[paload.newsIndex] = paload.news;
        }
    }
})

//玩家数据初始化的地方
export function initGameStore(app:App){
    
    const gameControl = new GameControl();
    const gameData:GameData = gameControl.Start()
    store.state.gameData = gameData;
    app.use(store);
}


