<script lang="ts">
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import {
  CompleteResearch,
  ModifyResourceCurValue,
  store,
  UnlockResearch,
  UnlockResource,
} from "../../core/store";
import {
  BuildClickType,
  EnumResearchItem,
  EnumResourceItem,
  IResearchInfo,
} from "../../core/table";
import { buildItemData, resourceItemData } from "../../core/gameSave";
import { StartGuideByID } from "../../core/gameUpdate";

export default {
  props: {
    researchData: {
      type: Object as PropType<IResearchInfo>,
      required: true,
    },
  },
  methods: {
    researchItemClick: function () {
      //消耗cost 解锁研究。还需要考虑影响力的因素
      const data: IResearchInfo = (this as any).researchData;
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      const cost1Data = sourceArr.get(
        EnumResourceItem.Cost1
      ) as resourceItemData;
      const cost2Data = sourceArr.get(
        EnumResourceItem.Cost2
      ) as resourceItemData;
      const influenceData = sourceArr.get(
        EnumResourceItem.Influence
      ) as resourceItemData;

      if (data.Condition > influenceData.cacheValue) return;
      if (data.Cost1 > cost1Data.cacheValue) return;
      if (data.Cost2 > cost2Data.cacheValue) return;

      cost1Data.cacheValue -= data.Cost1;
      cost2Data.cacheValue -= data.Cost2;

      store.commit(CompleteResearch, data.ID);
      if (data.UnLock.length > 0) {
        store.commit(UnlockResearch, data.UnLock);
      }
      if (data.ID == EnumResearchItem.BelieverBuildLevel1) {
        StartGuideByID(2); //解锁第一个信徒建筑
      }
      if (data.ID === EnumResearchItem.ComplainUnLock) {
        StartGuideByID(8);
      }
    },
  },
};
</script>

<template>
  <el-popover placement="bottom" trigger="hover" :width="200">
    <template #reference>
      <el-button
        class="researchItem"
        type="info"
        plain
        @click="researchItemClick"
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
  margin-left: 0px;
  margin-top: 10px;
  margin-right: 10px;
}
</style>