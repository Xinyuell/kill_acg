<script lang="ts">
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { ModifyResourceCurValue, store } from "../../core/store";
import { BuildClickType, EnumResourceItem } from "../../core/table";
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
      switch (this.buildData.click) {
        case BuildClickType.Upgrade:
          //TODO 建筑的升级检查
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
      <el-button class="buildItem" type="info" plain @click="buildItemClick"
        >{{ buildData.buildName }}
      </el-button>
    </template>
    <span style="font-size: 10px">{{ buildData.baseTips }}</span>
  </el-popover>
</template>

<style scoped>
.buildItem {
  width: 160px;
  height: 60px;
}
</style>