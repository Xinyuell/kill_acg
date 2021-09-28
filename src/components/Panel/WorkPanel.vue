<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { resourceItemData } from "../../core/gameSave";
import { ReplaceGameData, store } from "../../core/store";
import { EnumResourceItem, IWorkInfo, WorkInfoList } from "../../core/table";

interface IWorkConfig extends IWorkInfo {
  count: number;
}

const getData = computed(() => {
  const workConfig: number[] = store.state.gameData.workConfig;
  const data: IWorkConfig[] = [];
  WorkInfoList.forEach(function (value, key) {
    data.push({
      count: workConfig[key] ? workConfig[key] : 0,
      Name: value.Name,
      ID: value.ID,
      Desc: value.Desc,
    });
  });
  return data;
});
const radio = ref(1);
const step = ref(1);
const maxCount = computed(()=>{
  const sourceArr: Map<number, resourceItemData> = store.state.gameData.sourceArr;
  const workConfig: number[] = store.state.gameData.workConfig;
  let total = 0;
  if(sourceArr.has(EnumResourceItem.Believer))
    total += sourceArr.get(EnumResourceItem.Believer)!.cacheValue; 
  if(sourceArr.has(EnumResourceItem.People))
    total += sourceArr.get(EnumResourceItem.People)!.cacheValue; 
  workConfig.forEach(function(value){

  });
})
const inputNumber =ref(0);
const believerCount = computed(()=>{
    const sourceArr: Map<number, resourceItemData> = store.state.gameData.sourceArr;
  return (sourceArr.has(EnumResourceItem.Believer) && sourceArr.get(EnumResourceItem.Believer).cacheValue > 0)? sourceArr.get(EnumResourceItem.Believer)?.curValue : 0
});
</script>

<template>
  <div class="leftTable workTable">
    <div class="titlep">
      <span>安排信徒/从众工作</span>
      <span>信徒人数：{{believerCount}}</span>
    </div>

    <el-table
      :data="getData"
      :show-header="false"
      :stripe="true"
      tooltip-effect="dark"
    >
      <el-table-column min-width="110">
        <template #default="{ row }">
          <el-popover placement="bottom" trigger="hover" :width="300">
            <span style="font-size: 10px">{{ row.Desc }} </span>
            <template #reference>
              <span style="color: #409eff"> {{store.state.gameData.workConfig[row.ID]}}人在{{ row.Name }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column width="140">
        <template #default="{ row }">
          <el-input-number
            v-model="inputNumber"
            size="mini"
            :step="step"
            align="right"
            :min="0"
          />
        </template>
      </el-table-column>

      <el-table-column width="80" style="text-align: right">
        <template #default="{ row }">
          <el-radio v-model="radio" :label="row.ID"><span style="font-size: 8px;">自动</span></el-radio>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.titlep {
  text-align: left;
  margin-bottom: 1rem;
}
.workTable {
  margin-top: 4rem;
  margin-bottom: 1rem;
}
</style>