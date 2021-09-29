import { Base64 } from "js-base64";
import { router } from "../router";
import { ModifyResourceCurValue, UpdateNews } from "./store";
import {
  BuildClickType,
  BuildInfoList,
  GlobalConfig,
  ItemInfoList,
  ItemType,
} from "./table";
import { intToString } from "./utils";
import { store } from "./store";
import { resourceUpdate } from "./gameUpdate";
import {
  GameData,
  getCurrentSaveGameData,
  setStoreGameDataByBase64,
  SaveLocalStorageKey,
} from "./gameSave";
import { State } from "@vue/runtime-core";
import { language } from "./language";
import {
  ElMessage,
  ElNotification,
  NotificationHandle,
  NotificationParamsTyped,
} from "element-plus";
import { randomComplain } from "./complain";

export class GameControl {
  timer: number;
  resourceIDMap: Map<number, number>;
  buildIDMap: Map<number, [number, number]>;

  static buildLevelMax: number = 4;
  static theme: number = 0;
  private now: number;
  public totalTime: number;

  constructor() {
    this.resourceIDMap = new Map<number, number>();
    this.buildIDMap = new Map<number, [number, number]>();
    this.timer = 0;

    this.now = Date.now();
    this.totalTime = 0;
  }

  public Start(state: State) {
    setStoreGameDataByBase64(state, window.localStorage[SaveLocalStorageKey]);
    this.timer = setInterval(() => {
      this.update();
    }, GlobalConfig.UpdateTime);

    setInterval(() => {
      this.saveGame();
    }, GlobalConfig.SaveTime);

    setTimeout(() => {
      this.randomNews();
    }, 30000);

    setTimeout(() => {
      randomComplain();
    }, 1000);

    this.now = Date.now();
  }

  private randomNews() {
    setTimeout(() => {
      this.randomNews();
    }, Math.random() * 120000 + 20000);
    if (store.state.gameData.influenceLevel <= 0) return;
    if (!store.state.running) {
      return;
    }

    const curNews = language.news[store.state.gameData.influenceLevel - 1];
    const newsIndex = Math.floor(Math.random() * curNews.length);
    ElMessage.success({
      message: curNews[newsIndex],
      duration: 10000,
      showClose: true,
      center: true,
      iconClass: "info",
    });
  }
  private saveGame() {
    const saveGameData = getCurrentSaveGameData();
    const code = Base64.encode(JSON.stringify(saveGameData));
    window.localStorage.setItem(SaveLocalStorageKey, code);
  }

  private update() {
    if (!store.state.running) {
      this.now = Date.now();
      return;
    }
    //正式开始游戏才会计时
    const pass = Date.now() - this.now;
    store.state.gameData.totalTime += pass;
    this.now = Date.now();
    resourceUpdate(pass / 1000);
  }
}
