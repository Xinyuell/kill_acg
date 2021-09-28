<script  lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import { resourceItemData } from "../../core/gameSave";
import { ReplaceGameData, store, UpdateWorkConfig } from "../../core/store";
import { EnumResourceItem, IWorkInfo, WorkInfoList } from "../../core/table";
import { intToString } from "../../core/utils";

export interface IWorkConfig extends IWorkInfo {
  count: number;
}

export default {
  name: "WorkItem",
  props: {
    workData: {
      type: Object as PropType<IWorkConfig>,
      required: true,
    },
    radio:Number,
  },
  methods: {
    valueChange: function (newValue: number, oldValue: number) {
      const workConfig: number[] = store.state.gameData.workConfig;
      const sourceArr: Map<number, resourceItemData> =
        store.state.gameData.sourceArr;
      let total = 0;
      if (sourceArr.has(EnumResourceItem.Believer))
        total += sourceArr.get(EnumResourceItem.Believer)!.cacheValue;
      if (sourceArr.has(EnumResourceItem.People))
        total += sourceArr.get(EnumResourceItem.People)!.cacheValue;
    },
    clickAdd:function(){

    },
    clickSub:function(){

    }
  },
  setup(props) {
    const step = ref(1);
    const inputNumber = ref(0);
    return {
      inputNumber,
      step,
      store,
      intToString,
    };
  },
};
</script>

<template>
  <div class="worktab">
      <span class="title"> {{ workData.Name }}</span>
      <span class="number">
        {{ intToString(store.state.gameData.workConfig[workData.ID], 0) }}</span
      >
    <el-button type="info"  icon="el-icon-d-arrow-left" size="mini" circle>
    </el-button>
    <el-button
      type="info"
      icon="el-icon-d-arrow-right"
      size="mini"
      circle
    ></el-button>
    <el-radio style="margin-left: 15px;" v-model="radio" :label="workData.ID" ><span></span></el-radio>
  </div>
</template>

<style scoped>

span.title {
  width: 100px;
  text-align: left;
  display: inline-block;
}

span.number {
  width: 80px;
  text-align: center;
  display: inline-block;
}
.worktab {
  padding-left: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  margin-bottom: 2px;
  background-color: #ffffff;
  height: 60px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
}
</style>