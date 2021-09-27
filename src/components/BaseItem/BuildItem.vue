<script lang="ts">
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { ModifyResourceCurValue, store } from "../../core/store";
import { BuildClickType } from "../../core/table";
import { buildItemData } from '../../core/gameSave';

export default {
  props: {
    buildData: {
      type: Object as PropType<buildItemData>,
      required: true,
    },
  },
  methods: {
    buildItemClick: function () {
      switch (this.buildData.click) {
        case BuildClickType.Upgrade:
          //TODO 建筑的升级检查
          break;
        case BuildClickType.AddInfluence:
          store.state.gameData.sourceArr.get(1).cacheValue++;
          break;
        case BuildClickType.AddMoeny:
           store.state.gameData.sourceArr.get(2).cacheValue++;
          break;
        case BuildClickType.AddResearch:
           store.state.gameData.sourceArr.get(3).cacheValue++;
          break;
      }
    },
  },
};

</script>

<template>
  <el-popover placement="bottom" trigger="hover" :width="200">
    <template #reference>
      <el-button
        class="buildItem"
        ref="buildItems"
        type="info"
        plain
        @click="buildItemClick"
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