<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { resourceItemData } from "../../core/gameSave";
import { ReplaceGameData, store } from "../../core/store";
import { IWorkInfo, WorkInfoList } from "../../core/table";

interface IWorkConfig extends IWorkInfo {
  count: number;
}

const getData = computed(() => {
  const workConfig: number[] = store.state.gameData.workConfig;
  const data: IWorkConfig[] = [];
  WorkInfoList.forEach(function (value, key) {
    data.push({
      count: workConfig[key - 1] ? workConfig[key - 1] : 0,
      Name: value.Name,
      ID: value.ID,
      Desc: value.Desc,
    });
  });
  return data;
});
const radio = ref(1);
const step = ref(1);
</script>

<template>
  <div class="leftTable workTable">
    <div class="titlep">
      <span>安排信徒/从众工作</span>
      
    </div>

    <el-table
      :data="getData"
      :show-header="false"
      :stripe="true"
      tooltip-effect="dark"
    >
      <el-table-column width="90">
        <template #default="{ row }">
          <el-popover placement="bottom" trigger="hover" :width="400">
            <span style="font-size: 10px">{{ row.Desc }} </span>
            <template #reference>
              <span style="color: #409eff">{{ row.Name }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column min-width="100">
        <template #default="{ row }">
          <el-input-number
            v-model="store.state.gameData.workConfig[row.ID - 1]"
            size="mini"
            :step="step"
          />
        </template>
      </el-table-column>

      <el-table-column width="80" style="text-align: right">
        <template #default="{ row }">
          <el-radio v-model="radio" :label="row.ID"><span>自动</span></el-radio>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.titlep{
text-align: left; 
margin-left: 2%;
margin-bottom :1rem
}
.workTable {
  margin-top: 4rem;
}
</style>