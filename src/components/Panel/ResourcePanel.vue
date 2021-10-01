<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { resourceItemData } from "../../core/gameSave";
import { ReplaceGameData, store } from "../../store/index";
import { EnumResourceItem, ItemInfoList } from "../../core/table";
import { stringFormat } from "../../core/utils";

const getData = computed(() => {
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
  const data: resourceItemData[] = [];
  sourceArr.forEach(function (value, key) {
    if (value.unlock) data.push(value);
  });
  return data;
});

const getTips = computed(function () {
  return (id: EnumResourceItem) => {
    const data = ItemInfoList.get(id)!;
    switch (id) {
      case EnumResourceItem.Influence:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case EnumResourceItem.Money:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case EnumResourceItem.Cost1:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case EnumResourceItem.Cost2:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case EnumResourceItem.Believer:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case EnumResourceItem.People:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case EnumResourceItem.Policy:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case EnumResourceItem.Policy:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      default:
        break;
    }
  };
});
</script>

<template>
  <div class="leftTable">
    <el-table
      :data="getData"
      :show-header="false"
      :stripe="true"
      tooltip-effect="dark"
      size="small"
    >
      <el-table-column width="110">
        <template #default="{ row }">
          <el-popover
            placement="bottom"
            trigger="hover"
            :width="200"
            transition="124"
          >
            <span class="tips">{{ getTips(row.ID) }}</span>
            <template #reference>
              <span>{{ row.resourceName }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column>
        <template #default="{ row }">
          <p style="text-align: center">
            {{
              row.cacheMaxValue > 0
                ? row.curValue + "/" + row.maxValue
                : row.curValue
            }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="90">
        <template #default="{ row }">
          <span>{{ row.speed + "/s" }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.leftTable {
  width: 100%;
  margin-bottom: 0;
  float: inline-start;
}
</style>