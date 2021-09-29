import { Base64 } from "js-base64";
import { State } from "vue";
import { store } from "./store";
import { BuildClickType, BuildInfoList, ItemInfoList, ItemType } from "./table";

export const SaveLocalStorageKey = "kill_acg_game";

export function setStoreGameDataByBase64(state:State,code: string | undefined) {
  const gameData = state.gameData;
  if (code === undefined) {
    state.haslog = false;
    return false;
  }
  const str = Base64.decode(code);
  const saveGameData: ISaveGameData = JSON.parse(str);
  if (
    saveGameData === undefined ||
    saveGameData.sourceArr === undefined ||
    saveGameData.buildArryList === undefined
  ) {
    state.haslog = false;
    return false;
  }
  gameData.acgProgressData = saveGameData.acgProgressData;
  gameData.influenceLevel = saveGameData.influenceLevel;
  gameData.researchUnLockList = saveGameData.researchUnLockList;
  gameData.researchComplete = saveGameData.researchComplete;
  gameData.workConfig = saveGameData.workConfig;
  gameData.autoWorkIndex = saveGameData.autoWorkIndex;

  saveGameData.sourceArr.forEach(function (value) {
    if (gameData.sourceArr.has(value.ID)) {
      gameData.sourceArr.get(value.ID)!.cacheValue = value.cacheValue;
      gameData.sourceArr.get(value.ID)!.unlock = value.unlock;
    }
  });

  saveGameData.buildArryList.forEach(function (value) {
    if (gameData.buildArryList.has(value.ID)) {
      gameData.buildArryList.get(value.ID)!.curValue = value.curValue;
      gameData.buildArryList.get(value.ID)!.unlock = value.unlock;
    }
  });
  return true;
}

export function getCurrentSaveGameData() {
  if (!store.state.running) return;
  const gameData: GameData = store.state.gameData;
  const saveGameData: ISaveGameData = {
    sourceArr: [],
    buildArryList: [],
    acgProgressData: gameData.acgProgressData,
    influenceLevel: gameData.influenceLevel,
    researchUnLockList: gameData.researchUnLockList, 
    researchComplete: gameData.researchComplete, 
    workConfig:gameData.workConfig,
    autoWorkIndex:gameData.autoWorkIndex,
  };
  gameData.sourceArr.forEach(function (value, key) {
    saveGameData.sourceArr.push({
      cacheValue: value.cacheValue,
      unlock: value.unlock,
      ID: value.ID,
    });
  });
  gameData.buildArryList.forEach(function (value, key) {
    saveGameData.buildArryList.push({
      curValue: value.curValue,
      unlock: value.unlock,
      ID: value.ID,
    });
  });
  return saveGameData;
}

//初始化数据
export function initGameData() {
  const gameData: GameData = {
    sourceArr: new Map([]),
    buildArryList: new Map([]),
    acgProgressData: {
      value: 50, //应该有get取值的
      max: 10000000000, //100亿
      cur: 5000000000, //50亿
    },
    influenceLevel: 0,
    newsID: [
      [0, -1],
      [1, -1],
    ],
    researchUnLockList: [1], //第一个研究默认解锁
    researchComplete: [],
    workConfig: [0,0,0,0],
    autoWorkIndex:-1
  };
  const sourceArr: Map<number, resourceItemData> = new Map([]);
  ItemInfoList.forEach(function (value, index) {
    sourceArr.set(value.ID, {
      resourceName: value.Name,
      cacheValue: 0,
      cacheSpeed: 0,
      cacheMaxValue: value.BaseMax,
      curValue: "0",
      maxValue: value.BaseMax.toString(),
      speed: "0",
      unlock: (value.Type & ItemType.AutoUnLock) > 0,
      ID: value.ID,
      tip_title: value.Desc,
      tip_content: value.TipsContent,
    });
  });
  const buildArryList: Map<number, buildItemData> = new Map([]);
  BuildInfoList.forEach(function (value, index) {
    buildArryList.set(value.ID, {
      buildName: value.Name,
      curValue: 0,
      unlock: (value.Type & ItemType.AutoUnLock) > 0,
      cityName: value.cityName,
      ID: value.ID,
      click: value.OnClickType,
      baseTips: value.Desc,
      upgradeCostRatio: value.UpgradeCostRatio,
      upgradeCostPower:value.UpgradeCostPower,
    });
  });

  gameData.sourceArr = sourceArr;
  gameData.buildArryList = buildArryList;
  return gameData;
}

interface ISaveGameData {
  sourceArr: ISaveResourcePanelData[]; 
  buildArryList: ISaveBuildPanelData[]; 
  acgProgressData: object; 
  influenceLevel: number; 
  researchUnLockList: number[]; 
  researchComplete: number[]; 
  workConfig:number[];
  autoWorkIndex:number;
}

interface ISaveBuildPanelData {
  curValue: number;
  unlock: boolean;
  ID: number;
}

interface ISaveResourcePanelData {
  cacheValue: number;
  unlock: boolean;
  ID: number; //
}

export interface buildItemData {
  buildName: string;
  curValue: number;
  unlock: boolean;
  cityName: number;
  click: BuildClickType;
  ID: number;
  baseTips: string;
  upgradeCostRatio: number;
  upgradeCostPower:number;
}

export interface resourceItemData {
  resourceName: string;
  cacheValue: number;
  cacheSpeed: number;
  cacheMaxValue: number;

  curValue: string;
  maxValue: string;
  speed: string;

  unlock: boolean;
  ID: number; //
  tip_title: string;
  tip_content: string;
}


export interface GameData {
  /**
   * 所有资源的信息
   */
  sourceArr: Map<number, resourceItemData>;
  /**
   * 所有建筑的信息
   */
  buildArryList: Map<number, buildItemData>;
  /**
   * acg全局进度条数据
   */
  acgProgressData: object;
  /**
   * 当前影响力的等级,主要决定新闻随机出现的水平和各种事件
   */
  influenceLevel: number;
  /**
   * 随机的新闻ID
   */
  newsID: number[][];
  /**
   * 已经解锁的研究,里面也包含已经完成的研究
   */
  researchUnLockList: number[];
  /**
   * 已经完成的研究
   */
  researchComplete: number[];
  /**
   * 工作配置，每个工作安排了多少人
   */
  workConfig: number[];
  autoWorkIndex:number;
}
