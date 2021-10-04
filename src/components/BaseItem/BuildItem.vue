<script lang="ts">
import { PropType } from "vue";
import {
  ModifyResourceCurValue,
  store,
  UnlockResource,
} from "../../store/index";
import { CalculateProps, StartGuideByID } from "../../core/gameMain/gameUpdate";
import { intToString } from "../../core/utils";
import { buildItemData, resourceItemData } from "../../core/gameMain/gameSave";
import {
  BuildClickType,
  EnumBuildItem,
  EnumResearchProp,
  EnumResourceItem,
  ItemType,
} from "../../core/tables/Enum";
import { CityBuildCostBase, Resource } from "../../core/tables/GlobalConfig";

function getUpgradeCost(data: buildItemData) {
  let cost =
    Resource.BuildUpgradeBase *
      (data.curValue * data.UpgradeCostRatio +
        Math.pow(data.UpgradeCostPower, data.curValue)) +
    CityBuildCostBase[data.cityName]!;
  let reduce = 1;
  if ((data.Type & ItemType.InfluenceBuild) > 0) {
    reduce = store.state.props.get(EnumResearchProp.ReduceInfluenceBuildCost)
      ? store.state.props.get(EnumResearchProp.ReduceInfluenceBuildCost)!
      : 0;
  } else if ((data.Type & ItemType.MoneyBuild) > 0) {
    reduce = store.state.props.get(EnumResearchProp.ReduceMoneyBuildCost)
      ? store.state.props.get(EnumResearchProp.ReduceMoneyBuildCost)!
      : 0;
  } else if ((data.Type & ItemType.ResearchBuild) > 0) {
    reduce = store.state.props.get(EnumResearchProp.ReduceResearchBuildCost)
      ? store.state.props.get(EnumResearchProp.ReduceResearchBuildCost)!
      : 0;
  }
  return cost * reduce;
}

function buildGuideTips(data: buildItemData) {
  //建筑第一次升级的额外处理
  if (data.ID === EnumBuildItem.InfluenceLevel1 && data.curValue === 1) {
    store.commit(UnlockResource, EnumResourceItem.Believer);
    store.commit(ModifyResourceCurValue, {
      index: EnumResourceItem.Believer,
      value: 1,
    });
    StartGuideByID(3);
  }
  if (data.ID === EnumBuildItem.MoneyLevel1 && data.curValue === 1) {
    //StartGuideByID(4);
  }
  if (data.ID === EnumBuildItem.ResearchLevel1 && data.curValue === 1) {
    //StartGuideByID(5);
  }
  if (data.ID === EnumBuildItem.InfulenceLevel2 && data.curValue === 1) {
    store.commit(UnlockResource, EnumResourceItem.People);
    StartGuideByID(6);
  }
  if (data.ID === EnumBuildItem.ResearchLevel2 && data.curValue === 1) {
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
      const propAllRatio = store.state.props.get(
        EnumResearchProp.PoliticalAllRatio
      )
        ? store.state.props.get(EnumResearchProp.PoliticalAllRatio)!
        : 0;
      switch (data.OnClickType) {
        case BuildClickType.Upgrade:
          if (import.meta.env.DEV) {
            data.curValue++;
            buildGuideTips(data);
            CalculateProps();
            return;
          }
          const cost = getUpgradeCost(data);
          if (cost > sourceArr.get(EnumResourceItem.Money)!.cacheValue) return;
          sourceArr.get(EnumResourceItem.Money)!.cacheValue -= cost;
          data.curValue++;
          buildGuideTips(data);
          CalculateProps();
          break;
        case BuildClickType.AddInfluence:
          sourceArr.get(EnumResourceItem.Influence)!.cacheValue +=
            Resource.ClickAddBase * (1 + propAllRatio);
          break;
        case BuildClickType.AddMoeny:
          sourceArr.get(EnumResourceItem.Money)!.cacheValue +=
            Resource.ClickAddBase * Resource.GetMoneyRatio * (1 + propAllRatio);
          break;
        case BuildClickType.AddResearch:
          if (
            sourceArr.get(EnumResourceItem.Money)!.cacheValue >=
            Resource.Cost1MoneyRatio * (1 + propAllRatio)
          ) {
            sourceArr.get(EnumResourceItem.Cost1)!.cacheValue +=
              Resource.ClickAddBase * (1 + propAllRatio);
            sourceArr.get(EnumResourceItem.Money)!.cacheValue -=
              Resource.Cost1MoneyRatio * (1 + propAllRatio);
          }
          break;
      }
    },
  },

  computed: {
    tips: function () {
      const data: buildItemData = (this as any).buildData;
      let str = "";
      if (data.OnClickType === BuildClickType.Upgrade) {
        str += "消耗" + intToString(getUpgradeCost(data)) + "金钱\n";
        const sourceArr: Map<number, resourceItemData> =
          store.state.gameData.sourceArr;
        if (
          getUpgradeCost(data) >
          sourceArr.get(EnumResourceItem.Money)!.cacheValue
        ) {
          str +=
            "当前金钱" +
            intToString(sourceArr.get(EnumResourceItem.Money)!.cacheValue) +
            "无法升级\n";
        }
      }
      str += data.Desc;
      return str;
    },
    canClick: function () {
      const data: buildItemData = (this as any).buildData;
      if (data.OnClickType === BuildClickType.Upgrade) {
        const sourceArr: Map<number, resourceItemData> =
          store.state.gameData.sourceArr;
        if (
          getUpgradeCost(data) >
          sourceArr.get(EnumResourceItem.Money)!.cacheValue
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
        >{{ buildData.Name }}
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