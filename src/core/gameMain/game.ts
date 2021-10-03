import { Base64 } from "js-base64";
import { State } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { store } from "../../store";
import { randomComplain, autoRandomComplain } from "../system/complain";
import { updateHistory } from "../system/history";
import language from "../tables/language";
import { acgProgressUpdate } from "./acgUpdate";
import {
  setStoreGameDataByBase64,
  SaveLocalStorageKey,
  getCurrentSaveGameData,
  SaveGame,
} from "./gameSave";
import { CalculateProps, resourceUpdate } from "./gameUpdate";
import { GameTime } from "../tables/GlobalConfig";

export class GameControl {
  resourceIDMap: Map<number, number>;
  buildIDMap: Map<number, [number, number]>;

  static buildLevelMax: number = 4;
  static theme: number = 0;
  private now: number;
  public totalTime: number;

  constructor() {
    this.resourceIDMap = new Map<number, number>();
    this.buildIDMap = new Map<number, [number, number]>();

    this.now = Date.now();
    this.totalTime = 0;
  }

  public Start(state: State) {
    setStoreGameDataByBase64(state, window.localStorage[SaveLocalStorageKey]);
    CalculateProps(); //初始化要重算一次属性
    setInterval(() => {
      this.update();
    }, GameTime.UpdateTime);
    //
    setInterval(() => {
      this.saveGame();
    }, GameTime.SaveTime);

    setTimeout(() => {
      this.randomNews();
    }, 30000);

    setTimeout(() => {
      randomComplain();
    }, 1000);

    setTimeout(() => {
      autoRandomComplain();
    }, 1000);

    this.now = Date.now();
  }

  private randomNews() {
    setTimeout(() => {
      this.randomNews();
    }, Math.random() * 60000 + 30000);
    if (!store.state.running) {
      return;
    }
    if (store.state.gameFail) {
      return;
    }
    const newsIndex = Math.floor(Math.random() * language.news.length);
    ElMessage.success({
      message: "今日新闻：" + language.news[newsIndex],
      duration: 10000,
      showClose: true,
      center: true,
      iconClass: "success",
    });
  }
  private saveGame() {
    SaveGame();
  }

  private update() {
    if (!store.state.running) {
      this.now = Date.now();
      return;
    }
    if (store.state.gameFail) {
      this.now = Date.now();
      return;
    }
    updateHistory();
    //正式开始游戏才会计时
    const pass = Date.now() - this.now;
    store.state.gameData.totalTime += pass;
    this.now = Date.now();
    resourceUpdate(pass / 1000);
    acgProgressUpdate(pass / 1000);
  }
}
