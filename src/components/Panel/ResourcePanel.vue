<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { ReplaceGameData, store } from "../../store/index";
import * as table from "../../core/tables/table";
import * as Enum from "../../core/tables/Enum";
import { stringFormat } from "../../core/utils";
import { resourceItemData } from "../../core/gameMain/gameSave";

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
  return (id: Enum.EnumResourceItem) => {
    const data = table.ItemInfoList.get(id)!;
    switch (id) {
      case Enum.EnumResourceItem.Influence:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case Enum.EnumResourceItem.Money:
        if(store.state.props.get(Enum.EnumResearchProp.MoneyRatio) === undefined)
          return data.Desc;
        return stringFormat(
          data.Desc,
          store.state.props.get(Enum.EnumResearchProp.MoneyRatio)!.toString()
        );
      case Enum.EnumResourceItem.Cost1:
        if(store.state.props.get(Enum.EnumResearchProp.Cost1Ratio) === undefined)
          return data.Desc;        
        return stringFormat(
          data.Desc,
          store.state.props.get(Enum.EnumResearchProp.Cost1Ratio)!.toString()
        );
      case Enum.EnumResourceItem.Cost2:
        if(store.state.props.get(Enum.EnumResearchProp.Cost2Ratio) === undefined)
          return data.Desc;           
        return stringFormat(
          data.Desc,
          store.state.props.get(Enum.EnumResearchProp.Cost2Ratio)!.toString()
        );
      case Enum.EnumResourceItem.Believer:
           return data.Desc;  
      case Enum.EnumResourceItem.People:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case Enum.EnumResourceItem.Policy:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString()
        );
      case Enum.EnumResourceItem.Policy:
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