import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { TimeLineLog } from './core/complain'
import { GameData } from './core/gameSave'
import { EnumResearchProp } from './core/table'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  export interface State{
    /** 游戏数据 存档的 */
    gameData: GameData
    /** 是否在主场景 跑帧更新 */
    running: boolean;
    /** 是否有存档 */
    haslog: boolean;
    /** 开启的引导ID  */
    guideTipsID: number;
    /** 打开新手引导  */
    openGuide:boolean;
    /** 日志信息  */
    timelineLogs:TimeLineLog[];
    /** 是否游戏结束  */
    gameFail:boolean;
    /** 动态属性（不存档，登录重算，更新建筑等逻辑都会重算）  */
    props:Map<EnumResearchProp, number>;
}

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}