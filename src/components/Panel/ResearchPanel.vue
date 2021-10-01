<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import BuildItem from "../BaseItem/BuildItem.vue";
import {  store } from "../../store/index";
import { IResearchInfo, ResearchInfoList } from "../../core/tables/table";
import ResearchItem from "../BaseItem/ResearchItem.vue";

const activeNames = ref(["0"]);
const unlock = computed(() => {
    const data:IResearchInfo[] = [];
    const unlocklist:number[] = store.state.gameData.researchUnLockList;
    const complete:number[] = store.state.gameData.researchComplete;
    unlocklist.forEach(function(id:number){
        if(complete.indexOf(id) < 0)
            data.push(ResearchInfoList.get(id)!)
    });

  return data;
});
const complete = computed(() => {
    const data:IResearchInfo[] = [];
    const complete:number[] = store.state.gameData.researchComplete;
    complete.forEach(function(id:number){
        data.push(ResearchInfoList.get(id)!)
    });
  return data;
});
</script>

<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="0" class="Collapsetitle">
        <template #title>
          <h3 class="CollapsetitleText">未完成</h3>
        </template>
        <ul>
          <template v-for="data in unlock" :key="data.ID">
            <ResearchItem :research-data="data"></ResearchItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="1" class="Collapsetitle">
        <template #title>
          <h3 class="CollapsetitleText">已完成</h3>
        </template>
        <ul>
          <template v-for="data in complete" :key="data.ID">
            <ResearchItem class="buildItem" :research-data="data"></ResearchItem>
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
.buildItem {
  display: inline;
}
</style>