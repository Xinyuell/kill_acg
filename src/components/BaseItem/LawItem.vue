<script lang="ts">
import { PropType } from "vue";
import {
  ModifyResourceCurValue,
  store,
  UnlockResource,
} from "../../store/index";
import { CalculateProps, StartGuideByID } from "../../core/gameMain/gameUpdate";
import { intToString, stringFormat } from "../../core/utils";
import { lawItemData, resourceItemData } from "../../core/gameMain/gameSave";
import { EnumLawItem, EnumResourceItem } from "../../core/tables/Enum";

function getUpgradeCost(data: lawItemData) {
  const cost = (data.level + 1) * data.Cost;
  return cost;
}

export default {
  props: {
    lawItemData: {
      type: Object as PropType<lawItemData>,
      required: true,
    },
  },
  methods: {
    lawItemClick: function () {
      if (store.state.stopGame || store.state.gameFail || !store.state.running)
        return;
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      const data: lawItemData = (this as any).lawItemData;
      if (import.meta.env.DEV) {
        data.level++;
        CalculateProps();
        return;
      }
      const cost = getUpgradeCost(data);
      if (cost > sourceArr.get(EnumResourceItem.Political)!.cacheValue) return;
      sourceArr.get(EnumResourceItem.Political)!.cacheValue -= cost;
      data.level++;
      CalculateProps();
    },
  },

  computed: {
    tips: function () {
      const data: lawItemData = (this as any).lawItemData;
      let str = "";
      str += "消耗" + intToString(getUpgradeCost(data)) + "政治背景\n";
      str += data.Desc;
      let prop = 0;
      data.ResearchProp.forEach((value) => {
        prop = value;
      });
      if (data.IsReduceProp) {
        return stringFormat(
          str,
          intToString((1 - Math.pow(1 - prop, data.level)) * 100)
        );
      } else {
        if (data.ID === EnumLawItem.ComplainCD)
          return stringFormat(str, intToString(data.level * prop, 2));
        else return stringFormat(str, intToString(data.level * prop * 100, 2)); //百分比属性显示
      }
    },
    canClick: function () {
      const data: lawItemData = (this as any).lawItemData;
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      if (
        getUpgradeCost(data) >
        sourceArr.get(EnumResourceItem.Political)!.cacheValue
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
        @click="lawItemClick"
        >{{ lawItemData.Name }}
        <span class="buildCount">{{ lawItemData.level }}</span>
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