<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { store } from "../../store/index";
import { PolicyInfoList, ResearchInfoList } from "../../core/tables/table";
import { IResearchInfo } from "../../core/tables/ITableInfo";
import { lawItemData, policyItemData } from "../../core/gameMain/gameSave";
import PolicyItem from "../BaseItem/PolicyItem.vue";
import LawItem from "../BaseItem/LawItem.vue";

const activeNames = ref(["0"]);
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