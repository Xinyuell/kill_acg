<script setup lang="ts">
import SaveGameItem from "../BaseItem/SaveGameItem.vue";
import language from "../../core/tables/language";
import { computed, ref } from "vue";
import { store } from "../../store";
import { EnumResourceItem } from "../../core/tables/Enum";
import { intToString } from "../../core/utils";
function getTotalByLevel(level: number) {
  return (level * (level + 1)) / 2;
}
const politicalValue = computed(() => {
  let value = store.state.gameData.sourceArr.get(EnumResourceItem.Political)
    ? store.state.gameData.sourceArr.get(EnumResourceItem.Political)!.cacheValue
    : 0;
  store.state.gameData.LawArryList.forEach((element) => {
    value += element.level * (element.level + 1) * 0.5 * element.Cost;
  });
  return intToString(value);
});
</script>

<template>
  <div>
    <SaveGameItem />
    <div class="content">
      <el-switch
        v-model="store.state.setting.closeGuide"
        active-text="关闭新手引导弹窗"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
      <el-switch
        v-model="store.state.setting.closeNew"
        active-text="关闭新闻"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
      <el-switch
        v-model="store.state.setting.closeLog"
        active-text="关闭举报日志"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
    </div>
    <div class="content" >
      <p class="tips">
        游戏总天数：
        {{
          intToString((store.state.gameData.PoliticalData.totalTimes + store.state.gameData.totalTime)  / 5000, 0)
        }}天
      </p>
      <p class="tips">
        本轮游戏天数：
        {{ intToString(store.state.gameData.totalTime / 5000, 0) }}天
      </p>
      <p class="tips">
        重置次数： {{ store.state.gameData.PoliticalData.restartTime }}次
      </p>
      <p class="tips">政治背景总计获得： {{ politicalValue }}点</p>
    </div>
  </div>
</template>


<style scoped>
p.tips {
  font-size: 0.3rem;
  color: #303133;
}

div.content {
  background-color: #F2F6FC;
  padding: 0.1rem;
  margin: 0.2rem;
}

.elswitch {
  margin-left: 0.25rem;
}
</style>