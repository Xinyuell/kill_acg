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
      <el-table-column width="110">
        <template #default="{ row }">
          <el-popover placement="bottom" trigger="hover" :width="200">
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

      <el-table-column  >
        <template #default="{ row }" >
          <el-popover placement="bottom" trigger="hover" :width="200" >
            <span style="font-size: 10px"
              >{{ row.tip_title }} <br />
              {{ row.tip_content }}</span
            >
            <template #reference>
              <p style="text-align:center">{{
                row.maxValue > 0
                  ? row.curValue + "/" + row.maxValue
                  : row.curValue
              }}</p>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column width="80" >
        <template #default="{ row }">
          <el-popover placement="bottom" trigger="hover" :width="200">
            <template #reference>
              <span>{{ row.speed + "/s" }}</span></template
            >
            <span style="font-size: 10px;text-align: right"
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
  margin-left: 10px;
  margin-right: 0;
  margin-top: 10px;
  margin-bottom: 0%;
  float:inline-start;
}

</style>