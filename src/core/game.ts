import { Base64 } from "js-base64";
import { router } from "../router";
import { ModifyResourceCurValue, UpdateNews } from "./store";
import { BuildClickType, BuildInfoList, ItemInfoList, ItemType } from "./table";
import { intToString } from "./utils";
import { store } from "./store";

export class GameControl {
  static saveName = "kill-ACG";
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

  public initSourceArray(gameData:GameData) {
    const sourceArr: resourcePanelData[] = [];
    ItemInfoList.forEach(function (value, index) {
      sourceArr.push({
        resourceName: value.Name,
        cacheValue: 0,
        curValue: "0",
        maxValue: value.BaseMax,
        speed: 0,
        unlock: (value.Type & ItemType.AutoUnLock) > 0,
        ID: value.ID,
        tip_title: value.Desc,
        tip_content: value.TipsContent,
      });
    });
    const buildArryList: buildPanelData[][] = [];
    for (let i = 0; i < GameControl.buildLevelMax; i++) {
      buildArryList[i] = [];
    }
    BuildInfoList.forEach(function (value, index) {
      buildArryList[value.cityName].push({
        buildName: value.Name,
        curValue: 0,
        maxValue: value.BaseMax,
        unlock: (value.Type & ItemType.AutoUnLock) > 0,
        cityName: value.cityName,
        ID: value.ID,
        click: value.OnClickType,
        baseTips: value.Desc,
        upgradeCostRatio: value.UpgradeCostRatio,
      });
    });

    gameData.sourceArr = sourceArr;
    gameData.buildArryList = buildArryList;
  }

  static LoadGameData(str:string){
    
  }

  public Start(): GameData {
    let gameData:GameData = {
      cityUnlock: [true, false, false, false, false, false],
      sourceArr: [],
      buildArryList: [],
      acgProgressData:{
        value:50,//应该有get取值的
        max:10000000000,//100亿
        cur:5000000000//50亿
      },
      influenceLevel:0,
      newID:[
        [0,1],
        [1,1],
      ]
    };
    if (window.localStorage[GameControl.saveName]) {
      const str = Base64.decode(window.localStorage[GameControl.saveName]);
      const storage = JSON.parse(str);
      if (storage !== undefined) {
        gameData = storage;
        store.state.haslog = true;
      } else {
        this.initSourceArray(gameData);
      }
    } else {
      this.initSourceArray(gameData);
    }
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
    store.commit(UpdateNews,{
      newsIndex:0,
      news:[0,3]
    })
    store.commit(UpdateNews,{
      newsIndex:1,
      news:[0,2]
    })
    setTimeout(() => {
      this.randomNews()
    }, Math.random()*5000+50000);
  }

  private saveGame(){
    //TODO 读档和存档的数据简化，模板数据走读表
    if (!store.state.running) return;
    const b = Base64.encode(JSON.stringify(store.state.gameData))
    window.localStorage.setItem(GameControl.saveName,b);
  }

  private update() {
    if (!store.state.running) {
      this.now = Date.now();
      return;
    }
    const pass = (Date.now() - this.now)/1000;
    this.now = Date.now();
    //第一个循环算出速度
    //第二个循环算值
    for (let i = 0; i < store.state.gameData.sourceArr.length; i++) {
      const data = store.state.gameData.sourceArr[i]
      const add = data.speed * pass;
      data.cacheValue += add;
      const strValue = intToString(data.cacheValue)
      if(strValue !== data.curValue){
        store.commit(ModifyResourceCurValue, {
          index: i,
          value: strValue,
        });
      }
     
      
    }
  }
}

export interface buildPanelData {
  buildName: string;
  curValue: number;
  maxValue: number;
  unlock: boolean;
  cityName: number;
  click: BuildClickType;
  ID: number;
  baseTips: string;
  upgradeCostRatio: number;
}
export interface resourcePanelData {
  resourceName: string;
  cacheValue:number;
  curValue: string;
  maxValue: number;
  speed: number;
  unlock: boolean;
  ID: number; //
  tip_title: string;
  tip_content: string;
}



export interface GameDataPayLoad {
  index: number;
  value: string;
}

export interface GameData {
  cityUnlock: boolean[];//解锁进度
  sourceArr: resourcePanelData[];//所有资源
  buildArryList: buildPanelData[][];//所有建筑
  acgProgressData:object;//acg全局进度条
  influenceLevel:number,//当前影响力的等级
  newID:number[][]
}
