<script lang="ts">
import { PropType } from "vue";
import {
  ModifyResourceCurValue,
  store,
  UnlockResource,
} from "../../store/index";
import { CalculateProps, StartGuideByID } from "../../core/gameMain/gameUpdate";
import { intToString, stringFormat } from "../../core/utils";
import {
  buildItemData,
  policyItemData,
  resourceItemData,
} from "../../core/gameMain/gameSave";
import {
  BuildClickType,
  EnumBuildItem,
  EnumPolicyItem,
  EnumResourceItem,
} from "../../core/tables/Enum";
import { CityBuildCostBase, Resource } from "../../core/tables/GlobalConfig";

function getUpgradeCost(data: policyItemData) {
  const cost = (data.level * data.UpgradeRatio + 1) * data.Cost;
  return cost;
}

export default {
  props: {
    policyItemData: {
      type: Object as PropType<policyItemData>,
      required: true,
    },
  },
  methods: {
    policyItemClick: function () {
      if (store.state.stopGame || store.state.gameFail || !store.state.running)
        return;
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      const data: policyItemData = (this as any).policyItemData;
      if (import.meta.env.DEV) {
        data.level++;
        CalculateProps();
        return;
      }
      const cost = getUpgradeCost(data);
      if (cost > sourceArr.get(EnumResourceItem.Policy)!.cacheValue) return;
      sourceArr.get(EnumResourceItem.Policy)!.cacheValue -= cost;
      data.level++;
      CalculateProps();
    },
  },

  computed: {
    tips: function () {
      const data: policyItemData = (this as any).policyItemData;
      let str = "";
      str += "消耗" + intToString(getUpgradeCost(data)) + "政策点\n";
      str += data.Desc;

      let prop = 0;
      data.ResearchProp.forEach((value) => {
        prop = value;
      });
      return stringFormat(
        str,
        intToString((1 - Math.pow(1 - prop, data.level)) * 100, 4)
      );
    },
    canClick: function () {
      const data: policyItemData = (this as any).policyItemData;
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      if (
        getUpgradeCost(data) >
        sourceArr.get(EnumResourceItem.Policy)!.cacheValue
      )
        return true;
      return false;
    },
  },
};
</script>


<template>
  <el-popover placement="bottom" trigger="hover" transition="" :width="200">
    <template #reference>
      <el-button
        :plain="canClick"
        class="buildItem"
        type="success"
        @click="policyItemClick"
        >{{ policyItemData.Name }}
        <span class="buildCount">{{ policyItemData.level }}</span>
      </el-button>
    </template>
    <span class="tips">{{ tips }}</span>
  </el-popover>
</template>

<style>
.el-button.buildItem {
  width: 3rem;
  height: 1rem;
  display: inline-block;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}
.buildCount {
  float: right;
  text-align: right;
  color: #409eff;
}
</style>