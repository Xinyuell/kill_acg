<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { store } from "../../store/index";
import { PolicyInfoList, ResearchInfoList } from "../../core/tables/table";
import { IResearchInfo } from "../../core/tables/ITableInfo";
import { initGameData, lawItemData, policyItemData } from "../../core/gameMain/gameSave";
import PolicyItem from "../BaseItem/PolicyItem.vue";
import LawItem from "../BaseItem/LawItem.vue";
import { ElMessageBox } from "element-plus";
import { router } from "../../router";

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
  ElMessageBox.alert("这将重新开始游戏，请在发展停滞不前的时候使用（ACG文化胜利也会强制进行此步骤）。除了政治背景、法案等级之外的所有升级、建筑、资源均会清零。将根据当前的信徒数量获得政治背景，政治背景是一种稀缺资源，可以提高全局资源效率以及解锁法案，祝你投个好胎！", "注意！", {
    confirmButtonText: "OK",
    callback: (action: string) => {
      if (action === "confirm") {
        //TODO 重置的逻辑 
        router.push("/");
      }
    },
  });
}

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
        <el-button
          class="button"
          type="danger"
          @click="onClearClick"
          plain
          >进入下周目</el-button
        >
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.resourcePanel {
  width: 6remx;
  margin: 0.3rem;
}
.item {
  display: inline;
}
</style>