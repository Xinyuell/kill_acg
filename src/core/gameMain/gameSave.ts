import { Base64 } from "js-base64";
import { State } from "vue";
import { store } from "../../store";
import * as table from "../tables/table";
import * as ItemType from "../tables/Enum";
import * as GlobalConfig from "../tables/GlobalConfig";


export const SaveLocalStorageKey = "kill_acg_game";

export function setStoreGameDataByBase64(
  state: State,
  code: string | undefined
) {
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
  gameData.acgProgressValue = saveGameData.acgProgressValue;
  gameData.influenceLevel = saveGameData.influenceLevel;
  gameData.researchUnLockList = saveGameData.researchUnLockList;
  gameData.researchComplete = saveGameData.researchComplete;
  gameData.workConfig = saveGameData.workConfig;
  gameData.autoWorkIndex = saveGameData.autoWorkIndex;
  gameData.newsID = new Set(saveGameData.newsID);
  gameData.totalTime = saveGameData.totalTime;
  gameData.historyLogID = saveGameData.historyLogID;

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
  state.haslog = true;
  return true;
}

export function getCurrentSaveGameData() {
  if (!store.state.running) return;
  if(store.state.gameFail) return;
  const gameData: GameData = store.state.gameData;
  const saveGameData: ISaveGameData = {
    sourceArr: [],
    buildArryList: [],
    acgProgressValue: gameData.acgProgressValue,
    influenceLevel: gameData.influenceLevel,
    researchUnLockList: gameData.researchUnLockList,
    researchComplete: gameData.researchComplete,
    workConfig: gameData.workConfig,
    autoWorkIndex: gameData.autoWorkIndex,
    newsID: Array.from(gameData.newsID),
    totalTime: gameData.totalTime,
    historyLogID:gameData.historyLogID,
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
    acgProgressValue:GlobalConfig.GlobalConfig.AcgProgressData.AcgProgressBae,
    influenceLevel: 0,
    newsID: new Set(),
    researchUnLockList: [1], //第一个研究默认解锁
    researchComplete: [],
    workConfig: [0, 0, 0, 0, 0],
    autoWorkIndex: -1,
    totalTime: 0,
    historyLogID:-1,
  };
  const sourceArr: Map<number, resourceItemData> = new Map([]);
  table.default.forEach(function (value, index) {
    sourceArr.set(value.ID, {
      resourceName: value.Name,
      cacheValue: 0,
      cacheSpeed: 0,
      cacheMaxValue: value.BaseMax,
      baseMaxValue: value.BaseMax,
      curValue: "0",
      maxValue: value.BaseMax.toString(),
      speed: "0",
      unlock: (value.Type & ItemType.ItemType.AutoUnLock) > 0,
      ID: value.ID,
    });
  });
  const buildArryList: Map<number, buildItemData> = new Map([]);
  table.BuildInfoList.forEach(function (value, index) {
    buildArryList.set(value.ID, {
      buildName: value.Name,
      curValue: 0,
      unlock: (value.Type & ItemType.ItemType.AutoUnLock) > 0,
      cityName: value.cityName,
      ID: value.ID,
      click: value.OnClickType,
      baseTips: value.Desc,
      upgradeCostRatio: value.UpgradeCostRatio,
      upgradeCostPower: value.UpgradeCostPower,
      ResearchProp: value.ResearchProp,
    });
  });

  gameData.sourceArr = sourceArr;
  gameData.buildArryList = buildArryList;
  return gameData;
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
  click: table.BuildClickType;
  ID: number;
  baseTips: string;
  upgradeCostRatio: number;
  upgradeCostPower: number;
  /**提供属性，乘以数量 */
  ResearchProp: Map<table.EnumResearchProp, number>;
}

export interface resourceItemData {
  resourceName: string;
  /**当前值：真实数值 */
  cacheValue: number;
  /**当前增长速度：真实数值 */
  cacheSpeed: number;
  /**当前最大值：真实数值 */
  cacheMaxValue: number;
  /**基础最大值：填表 */
  baseMaxValue: number;

  /**当前值：显示值，字符串，有变化的才更新，忽视较小的数 */
  curValue: string;
  /**当前值：显示值，字符串，有变化的才更新，忽视较小的数 */
  maxValue: string;
  /**当前值：显示值，字符串，有变化的才更新，忽视较小的数 */
  speed: string;

  unlock: boolean;
  ID: number; //
}

interface ISaveGameData {
  sourceArr: ISaveResourcePanelData[];
  buildArryList: ISaveBuildPanelData[];
  acgProgressValue: number;
  influenceLevel: number;
  researchUnLockList: number[];
  researchComplete: number[];
  workConfig: number[];
  autoWorkIndex: number;
  /**
   * 记录最后一个显示的历史
   */
   historyLogID: number;
  /**
   * 已获得新闻的ID（加属性的才记录）
   */
  newsID: number[];
  /**
   * 游戏的总时间
   */
  totalTime: number;
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
   * acg全局进度
   */
  acgProgressValue: number;
  /**
   * 当前影响力的等级,主要决定新闻随机出现的水平和各种事件
   */
  influenceLevel: number;
  /**
   * 记录最后一个显示的历史
   */
  historyLogID: number;
  /**
   * 已获得新闻的ID（加属性的才记录）
   */
  newsID: Set<number>;
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
  autoWorkIndex: number;
  /**
   * 游戏的总时间
   */
  totalTime: number;
}
