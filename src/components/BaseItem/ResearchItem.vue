<script lang="ts">
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import {
  CompleteResearch,
  ModifyResourceCurValue,
  store,
  UnlockResearch,
  UnlockResource,
} from "../../store/index";
import { CalculateProps, StartGuideByID } from "../../core/gameMain/gameUpdate";
import { resourceItemData } from "../../core/gameMain/gameSave";
import { IResearchInfo } from "../../core/tables/ITableInfo";
import { EnumResearchItem, EnumResourceItem } from "../../core/tables/Enum";

function getUpgradeCost(
  data: IResearchInfo
): [boolean, resourceItemData, resourceItemData] {
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
  const cost1Data = sourceArr.get(EnumResourceItem.Cost1) as resourceItemData;
  const cost2Data = sourceArr.get(EnumResourceItem.Cost2) as resourceItemData;
  const influenceData = sourceArr.get(
    EnumResourceItem.Influence
  ) as resourceItemData;

  if (data.Condition > influenceData.cacheValue)
    return [false, cost1Data, cost2Data];
  if (data.Cost1 > cost1Data.cacheValue) return [false, cost1Data, cost2Data];
  if (data.Cost2 > cost2Data.cacheValue) return [false, cost1Data, cost2Data];
  return [true, cost1Data, cost2Data];
}

export default {
  props: {
    researchData: {
      type: Object as PropType<IResearchInfo>,
      required: true,
    },
  },
  methods: {
    researchItemClick: function () {
      if (store.state.stopGame || store.state.gameFail || !store.state.running)
        return;
      //消耗cost 解锁研究。还需要考虑影响力的因素
      const data: IResearchInfo = (this as any).researchData;
      const complete = store.state.gameData.researchComplete;
      if (complete.indexOf(data.ID) >= 0) return;
      let [isUpgrade, cost1Data, cost2Data] = getUpgradeCost(data);
      if (!isUpgrade && !import.meta.env.DEV) return;
      cost1Data.cacheValue -= data.Cost1;
      cost2Data.cacheValue -= data.Cost2;

      store.commit(CompleteResearch, data.ID);
      if (data.UnLock.length > 0) {
        store.commit(UnlockResearch, data.UnLock);
      }
      CalculateProps();
      if (data.ID == EnumResearchItem.BelieverBuildLevel1) {
        StartGuideByID(2); //解锁第一个信徒建筑
      }
      if (data.ID == EnumResearchItem.ResearchBuildLevel2) {
        store.commit(UnlockResource, EnumResourceItem.Cost2);
      }
      if (data.ID === EnumResearchItem.ComplainUnLock) {
        StartGuideByID(8);
      }
      if (data.ID === EnumResearchItem.ResearchBuildLevel3) {
        store.commit(UnlockResource, EnumResourceItem.Policy);
        store.commit(UnlockResource, EnumResourceItem.Political);
        StartGuideByID(9);
      }
    },
  },
  computed: {
    canClick: function () {
      let [IsClick] = getUpgradeCost((this as any).researchData);
      return !IsClick;
    },
  },
};
</script>

<template>
  <el-popover placement="bottom" trigger="hover" :width="250">
    <template #reference>
      <el-button
        class="buildItem"
        type="success"
        :plain="canClick"
        @click="researchItemClick"
        >{{ researchData.Name }}
      </el-button>
    </template>
    <span class="tips">{{ researchData.Desc }}</span>
  </el-popover>
</template>

