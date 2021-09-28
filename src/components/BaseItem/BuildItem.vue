<script lang="ts">
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { ModifyResourceCurValue, store } from "../../core/store";
import {
  BuildClickType,
  EnumBuildItem,
  EnumResourceItem,
  GlobalConfig,
  IBuildInfo,
} from "../../core/table";
import { buildItemData, resourceItemData } from "../../core/gameSave";

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
      const data: buildItemData = this.buildData;
      switch (data.click) {
        case BuildClickType.Upgrade:
          //TODO 建筑的升级检查
          const cost =
            GlobalConfig.BuildUpgradeBase *
            (data.curValue * data.upgradeCostRatio +
              Math.pow(data.upgradeCostPower, data.curValue));
          if (cost <= sourceArr.get(EnumResourceItem.Money)!.cacheValue) {
            sourceArr.get(EnumResourceItem.Money)!.cacheValue -= cost;
            data.curValue++;
          }
          break;
        case BuildClickType.AddInfluence:
          sourceArr.get(EnumResourceItem.Influence)!.cacheValue++;
          break;
        case BuildClickType.AddMoeny:
          sourceArr.get(EnumResourceItem.Money)!.cacheValue += 2;
          break;
        case BuildClickType.AddResearch:
          if (sourceArr.get(EnumResourceItem.Money)!.cacheValue >= 2) {
            sourceArr.get(EnumResourceItem.Cost1)!.cacheValue += 1;
            sourceArr.get(EnumResourceItem.Money)!.cacheValue -= 2;
          }
          break;
      }
    },
  },
};
</script>


<template>
  <el-popover placement="bottom" trigger="hover" transition="" :width="200">
    <template #reference>
      <div>
        <el-button class="buildItem" type="info" plain @click="buildItemClick"
          >{{ buildData.buildName }}
          <span class="count" v-show="buildData.curValue > 0">{{buildData.curValue}}</span>
        </el-button>
        
      </div>
    </template>
    <span style="font-size: 10px">{{ buildData.baseTips }}</span>
  </el-popover>
</template>

<style scoped>
.count{
  float:right;
  text-align: right;
}
.buildItem {
  width: 160px;
  height: 60px;
}
</style>