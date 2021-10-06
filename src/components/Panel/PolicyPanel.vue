<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { ResetStore, store } from "../../store/index";
import { PolicyInfoList, ResearchInfoList } from "../../core/tables/table";
import { IResearchInfo } from "../../core/tables/ITableInfo";
import {
  getCurrentSaveGameData,
  initGameData,
  lawItemData,
  policyItemData,
  SaveGame,
  SaveLocalStorageGameDataKey,
} from "../../core/gameMain/gameSave";
import PolicyItem from "../BaseItem/PolicyItem.vue";
import LawItem from "../BaseItem/LawItem.vue";
import { ElMessageBox } from "element-plus";
import { router } from "../../router";
import { GetPoliticalCount, ResetGame } from "../../core/gameMain/acgUpdate";
import { EnumResourceItem } from "../../core/tables/Enum";
import { intToString } from "../../core/utils";
import { Base64 } from "js-base64";
import { CalculateProps } from "../../core/gameMain/gameUpdate";

const activeNames = ref(["0", "1"]);
const policyArry = computed(() => {
  const data: policyItemData[] = [];
  store.state.gameData.policyArryList.forEach(function (value, key) {
    data.push(value);
  });
  return data;
});

const lawList = computed(() => {
  const data: lawItemData[] = [];
  store.state.gameData.LawArryList.forEach(function (value, key) {
    data.push(value);
  });
  return data;
});

function onClearClick() {
  ElMessageBox.alert(
    "这将重新开始游戏，请在发展停滞不前的时候使用<br>ACG文化影响力达到满值也会自动重置<br>除<strong>政治背景、法案</strong>等级外，所有升级、建筑、资源均会清零<br>根据<strong>信徒数量</strong>和<strong>ACG文化影响进度</strong>获得政治背景<br>政治背景可以提高全局资源效率以及解锁法案<br>祝你投个好胎！",
    "注意！",
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: "OK",
      callback: (action: string) => {
        if (action === "confirm") {
          ResetGame();
        }
      },
    }
  );
}

const tips = computed(() => {
  let believer = 0;
  if (store.state.gameData.sourceArr.has(EnumResourceItem.Believer))
    believer = store.state.gameData.sourceArr.get(
      EnumResourceItem.Believer
    )!.cacheValue;
  const value = GetPoliticalCount(Math.floor(believer));
  return "当前重置将获得" + intToString(value, 0) + "点政治背景\n信徒数量越多，ACG文化影响力越低，获得的政治背景越多\n设置界面可以查看相关计算器";
});
</script>

<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="0" class="Collapsetitle">
        <template #title>
          <h3 class="CollapsetitleText">政策</h3>
        </template>
        <ul>
          <template v-for="data in policyArry" :key="data.ID">
            <PolicyItem class="item" :policy-item-data="data"></PolicyItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="1" class="Collapsetitle">
        <template #title>
          <h3 class="CollapsetitleText">法案</h3>
        </template>
        <ul>
          <template v-for="data in lawList" :key="data.ID">
            <LawItem class="item" :law-item-data="data"></LawItem>
          </template>
        </ul>

        <el-popover
          placement="bottom"
          trigger="hover"
          transition=""
          :width="250"
        >
          <template #reference>
            <el-button
              class="elbutton"
              type="danger"
              @click="onClearClick"
              plain
              >进入下周目</el-button
            >
          </template>
          <span class="tips">{{ tips }}</span>
        </el-popover>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.elbutton {
  margin-left: 0.4rem;
  margin-top: 0.4rem;
  margin-bottom: 0.2rem;
}
.resourcePanel {
  width: 6remx;
  margin: 0.3rem;
}
.item {
  display: inline;
}
</style>