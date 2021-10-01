<script lang="ts">
import { PropType } from "vue";
import {
  ModifyResourceCurValue,
  store,
  UnlockResource,
} from "../../store/index";
import * as table from "../../core/tables/table";
import { CaculateProps, StartGuideByID } from "../../core/gameMain/gameUpdate";
import { intToString } from "../../core/utils";
import { buildItemData, resourceItemData } from "../../core/gameMain/gameSave";

function getUpgradeCost(data: buildItemData) {
  const cost =
    table.GlobalConfig.Resource.BuildUpgradeBase *
    (data.curValue * data.upgradeCostRatio +
      Math.pow(data.upgradeCostPower, data.curValue));
  return cost;
}

function buildGuideTips(data: buildItemData) {
  //建筑第一次升级的额外处理
  if (data.ID === table.EnumBuildItem.InfluenceLevel1 && data.curValue === 1) {
    store.commit(UnlockResource, table.EnumResourceItem.Believer);
    store.commit(ModifyResourceCurValue, {
      index: table.EnumResourceItem.Believer,
      value: 1,
    });
    StartGuideByID(3);
  }
  if (data.ID === table.EnumBuildItem.MoneyLevel1 && data.curValue === 1) {
    //StartGuideByID(4);
  }
  if (data.ID === table.EnumBuildItem.ResearchLevel1 && data.curValue === 1) {
    //StartGuideByID(5);
  }
  if (data.ID === table.EnumBuildItem.InfulenceLevel2 && data.curValue === 1) {
    store.commit(UnlockResource, table.EnumResourceItem.People);
    StartGuideByID(6);
  }
  if (data.ID === table.EnumBuildItem.ResearchLevel2 && data.curValue === 1) {
    StartGuideByID(7);
  }
}

export default {
  props: {
    buildData: {
      type: Object as PropType<buildItemData>,
      required: true,
    },
  },
  methods: {
    buildItemClick: function () {
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      const data: buildItemData = (this as any).buildData;
      switch (data.click) {
        case table.BuildClickType.Upgrade:
          //TODO 建筑的升级检查
          const cost = getUpgradeCost(data);
          if (cost > sourceArr.get(table.EnumResourceItem.Money)!.cacheValue)
            return;
          sourceArr.get(table.EnumResourceItem.Money)!.cacheValue -= cost;
          data.curValue++;
          buildGuideTips(data);
          CaculateProps();
          break;
        case table.BuildClickType.AddInfluence:
          sourceArr.get(table.EnumResourceItem.Influence)!.cacheValue +=
            table.GlobalConfig.Resource.ClickAddBase;
          break;
        case table.BuildClickType.AddMoeny:
          sourceArr.get(table.EnumResourceItem.Money)!.cacheValue +=
            table.GlobalConfig.Resource.ClickAddBase *
            table.GlobalConfig.Resource.GetMoneyRatio;
          break;
        case table.BuildClickType.AddResearch:
          if (
            sourceArr.get(table.EnumResourceItem.Money)!.cacheValue >=
            table.GlobalConfig.Resource.Cost1MoneyRatio
          ) {
            sourceArr.get(table.EnumResourceItem.Cost1)!.cacheValue +=
              table.GlobalConfig.Resource.ClickAddBase;
            sourceArr.get(table.EnumResourceItem.Money)!.cacheValue -=
              table.GlobalConfig.Resource.Cost1MoneyRatio;
          }
          break;
      }
    },
  },

  computed: {
    tips: function () {
      const data: buildItemData = (this as any).buildData;
      let str = "";
      if (data.click === table.BuildClickType.Upgrade) {
        str += "消耗" + intToString(getUpgradeCost(data)) + "金钱\n";
        const sourceArr: Map<number, resourceItemData> =
          store.state.gameData.sourceArr;
        if (
          getUpgradeCost(data) >
          sourceArr.get(table.EnumResourceItem.Money)!.cacheValue
        ) {
          str +=
            "当前金钱" +
            intToString(
              sourceArr.get(table.EnumResourceItem.Money)!.cacheValue
            ) +
            "无法升级\n";
        }
      }
      str += data.baseTips;
      return str;
    },
    canClick: function () {
      const data: buildItemData = (this as any).buildData;
      if (data.click === table.BuildClickType.Upgrade) {
        const sourceArr: Map<number, resourceItemData> =
          store.state.gameData.sourceArr;
        if (
          getUpgradeCost(data) >
          sourceArr.get(table.EnumResourceItem.Money)!.cacheValue
        )
          return true;
      }
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
        @click="buildItemClick"
        >{{ buildData.buildName }}
        <span class="buildCount" v-show="buildData.curValue > 0">{{
          buildData.curValue
        }}</span>
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