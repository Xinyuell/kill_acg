import { Base64 } from "js-base64";
import {
  buildPanelData,
  GameControl,
  GameData,
  resourcePanelData,
} from "./game";
import { store } from "./store";
import { BuildInfoList, ItemInfoList, ItemType } from "./table";

export const SaveLocalStorageKey = "kill_acg_game";

export function getGameDataByBase64(code: string | undefined) {
  const gameData = initGameData();
  if (code === undefined) return { gameData, success: false };
  const str = Base64.decode(code);
  const saveGameData: ISaveGameData = JSON.parse(str);
  if (
    saveGameData === undefined ||
    saveGameData.cityUnlock === undefined ||
    saveGameData.sourceArr === undefined ||
    saveGameData.buildArryList === undefined
  ) {
    return { gameData, success: false };
  }
  gameData.cityUnlock = saveGameData.cityUnlock;
  gameData.acgProgressData = saveGameData.acgProgressData;
  gameData.influenceLevel = saveGameData.influenceLevel;

  saveGameData.sourceArr.forEach(function (value) {
    if( gameData.sourceArr.has(value.ID))
    {
        gameData.sourceArr.get(value.ID)!.cacheValue = value.cacheValue;
        gameData.sourceArr.get(value.ID)!.cacheMaxValue = value.cacheMaxValue;
        gameData.sourceArr.get(value.ID)!.unlock = value.unlock;
    }
  });

  saveGameData.buildArryList.forEach(function (value) {
    if( gameData.buildArryList.has(value.ID))
    {
        gameData.buildArryList.get(value.ID)!.curValue = value.curValue;
        gameData.buildArryList.get(value.ID)!.unlock = value.unlock;
    }
  });
  return { gameData, success: true};
}

export function getCurrentSaveGameData() {
  if (!store.state.running) return;
  const gameData: GameData = store.state.gameData;
  const saveGameData: ISaveGameData = {
    cityUnlock: gameData.cityUnlock,
    sourceArr: [],
    buildArryList: [],
    acgProgressData: gameData.acgProgressData,
    influenceLevel: gameData.influenceLevel,
  };
  gameData.sourceArr.forEach(function (value, key) {
    saveGameData.sourceArr.push({
      cacheValue: value.cacheValue,
      cacheMaxValue: value.cacheMaxValue,
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
function initGameData() {
  const gameData: GameData = {
    cityUnlock: [true, false, false, false, false, false],
    sourceArr: new Map([]),
    buildArryList: new Map([]),
    acgProgressData: {
      value: 50, //应该有get取值的
      max: 10000000000, //100亿
      cur: 5000000000, //50亿
    },
    influenceLevel: 0,
    newID: [
      [0, -1],
      [1, -1],
    ],
  };
  const sourceArr: Map<number, resourcePanelData> = new Map([]);
  ItemInfoList.forEach(function (value, index) {
    sourceArr.set(value.ID, {
      resourceName: value.Name,
      cacheValue: 0,
      cacheSpeed:0,
      cacheMaxValue:value.BaseMax,
      curValue: "0",
      maxValue: value.BaseMax.toString(),
      speed: "0",
      unlock: (value.Type & ItemType.AutoUnLock) > 0,
      ID: value.ID,
      tip_title: value.Desc,
      tip_content: value.TipsContent,
    });
  });
  const buildArryList: Map<number, buildPanelData> = new Map([]);
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
    });
  });

  gameData.sourceArr = sourceArr;
  gameData.buildArryList = buildArryList;
  return gameData;
}

interface ISaveGameData {
  cityUnlock: boolean[]; //解锁进度
  sourceArr: ISaveResourcePanelData[]; //所有资源
  buildArryList: ISaveBuildPanelData[]; //所有建筑
  acgProgressData: object; //acg全局进度条
  influenceLevel: number; //当前影响力的等级
}

interface ISaveBuildPanelData {
  curValue: number;
  unlock: boolean;
  ID: number;
}

export interface ISaveResourcePanelData {
  cacheValue: number;
  cacheMaxValue: number;
  unlock: boolean;
  ID: number; //
}
