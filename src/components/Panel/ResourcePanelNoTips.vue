<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { resourceItemData } from "../../core/gameSave";
import { ReplaceGameData, store } from "../../core/store";
import Tips from "../BaseItem/Tips.vue";

const getData = computed(() => {
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
    const data:resourceItemData[] = [];
    sourceArr.forEach(function(value,key){
      if(value.unlock)
      data.push(value);
    });
    return data;
});
</script>

<template>
  <div class="leftTable">
    <el-table
      :data="getData"
      :show-header="false"
      :stripe="true"
      tooltip-effect="dark"
    >
      <el-table-column width="110">
        <template #default="{ row }">
            <span>{{ row.resourceName }}</span>
        </template>
      </el-table-column>

      <el-table-column  >
        <template #default="{ row }" >
           <p style="text-align:center">{{
                row.maxValue > 0
                  ? row.curValue + "/" + row.maxValue
                  : row.curValue
              }}</p>
        </template>
      </el-table-column>

      <el-table-column width="80" >
        <template #default="{ row }">
           <span>{{ row.speed + "/s" }}</span>
        </template>
      </el-table-column>
    </el-table>

     
  </div>
</template>

<style>
.leftTable {
  width: 90%;
  margin-left: 0.1rem;
  margin-right: 0;
  margin-top: 0.1rem;
  margin-bottom: 0%;
  float:inline-start;
}

</style>