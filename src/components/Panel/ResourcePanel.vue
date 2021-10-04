<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { ReplaceGameData, store } from "../../store/index";
import { ItemInfoList } from "../../core/tables/table";
import { EnumResourceItem, EnumResearchProp, EnumWorkType } from "../../core/tables/Enum";
import { intToString, stringFormat } from "../../core/utils";
import { resourceItemData } from "../../core/gameMain/gameSave";
import { Resource } from "../../core/tables/GlobalConfig";

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
    const researchProps = store.state.props;
    const workBaseRatio = researchProps.get(EnumResearchProp.WorkBaseRatio)
      ? researchProps.get(EnumResearchProp.WorkBaseRatio)!
      : 0; //法案提供的工作基础值百分比
    const moneyCostRatio = researchProps.get(EnumResearchProp.MoneyCostRatio)
      ? researchProps.get(EnumResearchProp.MoneyCostRatio)!
      : 0; //法案提供的工作金钱消耗降低
    const researchCostRatio = researchProps.get(EnumResearchProp.ResearchCostRatio)
      ? researchProps.get(EnumResearchProp.ResearchCostRatio)!
      : 0; //法案提供的工作知识消耗降低

    switch (id) {
      case EnumResourceItem.Influence:
        return stringFormat(
          data.Desc,
          store.state.gameData.influenceLevel.toString(),
          intToString(1 * (1 + workBaseRatio))
        );
      case EnumResourceItem.Money:
        const ratio1 = researchProps.get(EnumResearchProp.MoneyRatio)
          ? researchProps.get(EnumResearchProp.MoneyRatio)!
          : 0;
        return stringFormat(
          data.Desc,
          intToString(ratio1 * 100, 0),
          intToString(Resource.GetMoneyRatio * (1 + workBaseRatio)),
        );
      case EnumResourceItem.Cost1:
        const ratio2 = researchProps.get(EnumResearchProp.Cost1Ratio)
          ? researchProps.get(EnumResearchProp.Cost1Ratio)!
          : 0;
        return stringFormat(
          data.Desc,
          intToString(ratio2 * 100, 0),
          intToString(1 * (1 + workBaseRatio)),
          intToString(Resource.Cost1MoneyRatio * moneyCostRatio)
        );
      case EnumResourceItem.Cost2:
        const ratio3 = researchProps.get(EnumResearchProp.Cost2Ratio)
          ? researchProps.get(EnumResearchProp.Cost2Ratio)!
          : 0;
        return stringFormat(
          data.Desc,
          intToString(ratio3 * 100, 0),
          intToString(1 * (1 + workBaseRatio)),
          intToString(Resource.Cost2MoneyRatio * moneyCostRatio)
        );
      case EnumResourceItem.Believer:
        return data.Desc;
      case EnumResourceItem.People:
        return data.Desc;
      case EnumResourceItem.Policy:
        const ratio4 = researchProps.get(EnumResearchProp.PolicyRatio)
          ? researchProps.get(EnumResearchProp.PolicyRatio)!
          : 0;
        return stringFormat(
          data.Desc,
          intToString(ratio4 * 100, 0),
          intToString(Resource.PolicyAddBase * (1 + workBaseRatio), 2),
          intToString(Resource.PolicyCostBaseRatio * moneyCostRatio),
          intToString(Resource.PolicyCostBaseRatio * researchCostRatio)
        );
      case EnumResourceItem.Political:
        const prop = store.state.props.get(EnumResearchProp.PoliticalAllRatio) ? store.state.props.get(EnumResearchProp.PoliticalAllRatio)!  : 0;
        return stringFormat(data.Desc,intToString(prop * 100)); //TODO 描述序列化
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
            :width="350"
            transition="124"
          >
            <span class="tips">{{ getTips(row.ID) }}</span>
            <template #reference>
              <span>{{ row.Name }}</span>
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