<script lang="ts">
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { CompleteResearch, ModifyResourceCurValue, store, UnlockResearch } from "../../core/store";
import {
  BuildClickType,
  EnumResourceItem,
  IResearchInfo,
} from "../../core/table";
import { buildItemData, resourceItemData } from "../../core/gameSave";

export default {
  props: {
    researchData: {
      type: Object as PropType<IResearchInfo>,
      required: true,
    },
  },
  methods: {
    buildItemClick: function () {
      //消耗cost 解锁研究
      const data: IResearchInfo = this.researchData;
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      const cost1Data = sourceArr.get(
        EnumResourceItem.Cost1
      ) as resourceItemData;
      const cost2Data = sourceArr.get(
        EnumResourceItem.Cost2
      ) as resourceItemData;

      if (data.Cost1 > cost1Data.cacheValue) return;
      if (data.Cost2 > cost2Data.cacheValue) return;
      cost1Data.cacheValue -= data.Cost1;
      cost2Data.cacheValue -= data.Cost2;

      store.commit(CompleteResearch,data.ID);
      if(data.UnLock.length > 0){
          store.commit(UnlockResearch,data.UnLock)
      }
    },
  },
};
</script>

<template>
  <el-popover placement="bottom" trigger="hover" :width="200">
    <template #reference>
      <el-button class="researchItem" type="info" plain @click="buildItemClick"
        >{{ researchData.Name }}
      </el-button>
    </template>
    <span style="font-size: 10px">{{ researchData.Desc }}</span>
  </el-popover>
</template>

<style scoped>
.researchItem {
  width: 160px;
  height: 60px;
}
</style>