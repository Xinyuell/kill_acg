import { Base64 } from "js-base64";
import { State } from "vue";
import { store } from "../../store";
import {
  ItemInfoList,
  BuildInfoList,
  PolicyInfoList,
  LawInfoList,
} from "../tables/table";
import { ItemType, BuildClickType, EnumResearchProp } from "../tables/Enum";
import { AcgProgressData } from "../tables/GlobalConfig";
import { IBuildInfo, IItemInfo, ILawInfo, IPolicyInfo } from "../tables/ITableInfo";

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
    saveGameData.buildArryList === undefined ||
    saveGameData.PoliticalData === undefined ||
    saveGameData.policyArryList === undefined
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
  gameData.PoliticalData = saveGameData.PoliticalData;

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
  saveGameData.policyArryList.forEach(function (value) {
    if (gameData.policyArryList.has(value.ID)) {
      gameData.policyArryList.get(value.ID)!.level = value.level;
    }
  });
  saveGameData.PoliticalData.LawLevel.forEach(function (value) {
    if (gameData.LawArryList.has(value.ID)) {
      gameData.LawArryList.get(value.ID)!.level = value.level;
    }
  });
  state.haslog = true;
  return true;
}

export function SaveGame(){
  if (!store.state.running) return;
  if (store.state.gameFail) {
    return;
  }
  const saveGameData = getCurrentSaveGameData();
  if (saveGameData === undefined) return;
  const code = Base64.encode(JSON.stringify(saveGameData));
  window.localStorage.setItem(SaveLocalStorageKey, code);
  store.state.haslog = true;
}

export function getCurrentSaveGameData() {
  if (!store.state.running) return;
  if (store.state.gameFail) return;
  const gameData: GameData = store.state.gameData;
  const saveGameData: ISaveGameData = {
    sourceArr: [],
    buildArryList: [],
    policyArryList: [],
    acgProgressValue: gameData.acgProgressValue,
    influenceLevel: gameData.influenceLevel,
    researchUnLockList: gameData.researchUnLockList,
    researchComplete: gameData.researchComplete,
    workConfig: gameData.workConfig,
    autoWorkIndex: gameData.autoWorkIndex,
    newsID: Array.from(gameData.newsID),
    totalTime: gameData.totalTime,
    historyLogID: gameData.historyLogID,
    PoliticalData: gameData.PoliticalData,
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
  gameData.policyArryList.forEach(function (value, key) {
    saveGameData.policyArryList.push({
      ID: value.ID,
      level: value.level,
    });
  });
  saveGameData.PoliticalData.LawLevel.length = 0;
  gameData.LawArryList.forEach(function (value, key) {
    saveGameData.PoliticalData.LawLevel.push({
      ID: value.ID,
      level: value.level,
    });
  });
  return saveGameData;
}

//初始化数据
export function initGameData() {
  const gameData: GameData = {
    sourceArr: new Map([]),
    buildArryList: new Map([]),
    acgProgressValue: AcgProgressData.AcgProgressBae,
    influenceLevel: 0,
    newsID: new Set(),
    researchUnLockList: [1], //第一个研究默认解锁
    researchComplete: [],
    workConfig: [0, 0, 0, 0, 0, 0],
    autoWorkIndex: -1,
    totalTime: 0,
    historyLogID: -1,
    PoliticalData: {
      value: 0,
      restartTime: 0,
      totalTimes: 0,
      LawLevel: [],
    },
    policyArryList: new Map([]),
    LawArryList: new Map([]),
  };
  ItemInfoList.forEach(function (value, index) {
    gameData.sourceArr.set(value.ID, {
      Name: value.Name,
      cacheValue: 0,
      cacheSpeed: 0,
      cacheMaxValue: value.BaseMax,
      BaseMax: value.BaseMax,
      curValue: "0",
      maxValue: value.BaseMax.toString(),
      speed: "0",
      unlock: (value.Type & ItemType.AutoUnLock) > 0,
      ID: value.ID,
      Type:value.Type,
      Desc:value.Desc,
    });
  });
  BuildInfoList.forEach(function (value, index) {
    gameData.buildArryList.set(value.ID, {
      Name: value.Name,
      curValue: 0,
      unlock: (value.Type & ItemType.AutoUnLock) > 0,
      cityName: value.cityName,
      ID: value.ID,
      OnClickType: value.OnClickType,
      Desc: value.Desc,
      UpgradeCostRatio: value.UpgradeCostRatio,
      UpgradeCostPower: value.UpgradeCostPower,
      ResearchProp: value.ResearchProp,
      Type:value.Type,
      Require:value.Require
    });
  });

  LawInfoList.forEach(function (value, index) {
    gameData.LawArryList.set(value.ID, {
      Name: value.Name,
      level: 0,
      ID: value.ID,
      Desc: value.Desc,
      Cost: value.Cost,
      ResearchProp:value.ResearchProp,
    });
  });

  PolicyInfoList.forEach(function (value, index) {
    gameData.policyArryList.set(value.ID, {
      Name: value.Name,
      level: 0,
      ID: value.ID,
      Desc: value.Desc,
      UpgradeRatio: value.UpgradeRatio,
      Cost: value.Cost,
      Condition: value.Condition,
      ResearchProp:value.ResearchProp,
    });
  });

  return gameData;
}

interface ISavePolicyData {
  level: number;
  ID: number;
}

interface ISaveBuildData {
  curValue: number;
  unlock: boolean;
  ID: number;
}

interface ISaveResourceData {
  cacheValue: number;
  unlock: boolean;
  ID: number; //
}

export interface buildItemData extends IBuildInfo {
  curValue: number;
  unlock: boolean;
}

export interface resourceItemData extends IItemInfo {
  /**当前值：真实数值 */
  cacheValue: number;
  /**当前增长速度：真实数值 */
  cacheSpeed: number;
  /**当前最大值：真实数值 */
  cacheMaxValue: number;

  /**当前值：显示值，字符串，有变化的才更新，忽视较小的数 */
  curValue: string;
  /**当前值：显示值，字符串，有变化的才更新，忽视较小的数 */
  maxValue: string;
  /**当前值：显示值，字符串，有变化的才更新，忽视较小的数 */
  speed: string;

  unlock: boolean;
}

export interface policyItemData extends IPolicyInfo {
  /** 政策的等级 */
  level: number;
}

export interface lawItemData extends ILawInfo {
  /** 政策的等级 */
  level: number;
}

interface ISaveGameData {
  sourceArr: ISaveResourceData[];
  buildArryList: ISaveBuildData[];
  policyArryList: ISavePolicyData[];
  acgProgressValue: number;
  influenceLevel: number;
  researchUnLockList: number[];
  researchComplete: number[];
  workConfig: number[];
  autoWorkIndex: number;
  /**政治背景值、永久解锁的政治背景等级 */
  PoliticalData: PoliticalData;
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

/**重置资源 */
export interface PoliticalData {
  /**政治背景值 */
  value: number;
  /**重置次数 */
  restartTime: number;
  /**总游戏时长 */
  totalTimes: number;
  /**法案的存档信息 */
  LawLevel: ISavePolicyData[];
}

export interface GameData {
  /**政治背景值、永久解锁的政治背景等级 */
  PoliticalData: PoliticalData;
  /**
   * 所有资源的信息
   */
  sourceArr: Map<number, resourceItemData>;
  /**
   * 所有建筑的信息
   */
  buildArryList: Map<number, buildItemData>;
  /** 当前政策信息 */
  policyArryList: Map<number, policyItemData>;
  /** 当前法案的信息 */
  LawArryList: Map<number, lawItemData>;
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
   * 当前游戏的总时间
   */
  totalTime: number;
}
