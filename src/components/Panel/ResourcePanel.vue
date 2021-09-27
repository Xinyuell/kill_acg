<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { resourceItemData } from "../../core/gameSave";
import { ReplaceGameData, store } from "../../core/store";

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
      <el-table-column width="90">
        <template #default="{ row }">
          <el-popover placement="bottom" trigger="hover" :width="400">
            <span style="font-size: 10px"
              >{{ row.tip_title }} <br />
              {{ row.tip_content }}</span
            >
            <template #reference>
              <span>{{ row.resourceName }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column min-width="120">
        <template #default="{ row }">
          <el-popover placement="bottom" trigger="hover" :width="400">
            <span style="font-size: 10px"
              >{{ row.tip_title }} <br />
              {{ row.tip_content }}</span
            >
            <template #reference>
              <span>{{
                row.maxValue > 0
                  ? row.curValue + "/" + row.maxValue
                  : row.curValue
              }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column width="80" style="text-align: right">
        <template #default="{ row }">
          <el-popover placement="bottom" trigger="hover" :width="400">
            <template #reference>
              <span>{{ row.speed + "/s" }}</span></template
            >
            <span style="font-size: 10px"
              >{{ row.tip_title }} <br />
              {{ row.tip_content }}</span
            >
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

     
  </div>
</template>

<style>
.leftTable {
  width: 90%;
  margin: 2%;
}

</style>