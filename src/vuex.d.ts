import { Store } from "vuex";
import { GameData } from "./core/gameSave";

declare module '@vue/runtime-core' {
    // 声明自己的 store state
    interface State {
      gameData: GameData
      running: boolean;
      haslog: boolean;
      guideTipsID: number;
    }
}

