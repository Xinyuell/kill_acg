import { Base64 } from "js-base64";
import { router } from "../router";
import { ModifyResourceCurValue, UpdateNews } from "./store";
import { BuildClickType, BuildInfoList, ItemInfoList, ItemType } from "./table";
import { intToString } from "./utils";
import { store } from "./store";
import { resourceUpdate } from "./gameUpdate";
import { GameData, getCurrentSaveGameData, getGameDataByBase64, SaveLocalStorageKey } from "./gameSave";

export class GameControl {
  static saveTime = 20000;
  static updateTime = 50;
  timer: number;
  resourceIDMap: Map<number, number>;
  buildIDMap: Map<number, [number, number]>;

  static buildLevelMax: number = 4;
  static theme: number = 0;
  private now: number;
  public totalTime:number;

  constructor() {
    this.resourceIDMap = new Map<number, number>();
    this.buildIDMap = new Map<number, [number, number]>();
    this.timer = 0;
  
    this.now = Date.now();
    this.totalTime = 0;
  }

  public Start(): GameData {
    const {gameData, success} = getGameDataByBase64(window.localStorage[SaveLocalStorageKey])
    store.state.haslog = success;
    this.timer = setInterval(() => {
      this.update();
    }, GameControl.updateTime);

    setInterval(() => {
      this.saveGame();
    }, GameControl.saveTime);

    setTimeout(() => {
      this.randomNews()
    }, 5000);

    this.now = Date.now();
    return gameData;
  }

  private randomNews(){
    //TODO 新闻的随机算法
    // store.commit(UpdateNews,{
    //   newsIndex:0,
    //   news:[0,3]
    // })
    // store.commit(UpdateNews,{
    //   newsIndex:1,
    //   news:[0,2]
    // })
    setTimeout(() => {
      this.randomNews()
    }, Math.random()*5000+50000);
  }

  private saveGame(){
      const saveGameData = getCurrentSaveGameData();
      const code = Base64.encode(JSON.stringify(saveGameData));
      window.localStorage.setItem(SaveLocalStorageKey, code);
  }

  private update() {
    if (!store.state.running) {
      this.now = Date.now();
      return;
    }
    const pass = (Date.now() - this.now)/1000;
    this.now = Date.now();
    resourceUpdate(pass);
  }
}
