<script setup lang="ts">
import SaveGameItem from "../BaseItem/SaveGameItem.vue";
import language from "../../core/tables/language";
import { computed, reactive, ref } from "vue";
import { store } from "../../store";
import { EnumResourceItem } from "../../core/tables/Enum";
import { intToString } from "../../core/utils";
import {
  GetPoliticalCount,
  GetPropRatioByPolitical,
} from "../../core/gameMain/acgUpdate";
function getTotalByLevel(level: number) {
  return (level * (level + 1)) / 2;
}
const politicalValue = computed(() => {
  let value = store.state.gameData.sourceArr.get(EnumResourceItem.Political)
    ? store.state.gameData.sourceArr.get(EnumResourceItem.Political)!.cacheValue
    : 0;
  store.state.gameData.LawArryList.forEach((element) => {
    value += element.level * (element.level + 1) * 0.5 * element.Cost;
  });
  return intToString(value);
});
const politicalCheckValue = ref(0);
const politicalCheckRatio = ref("0%");

const form1 = reactive({ believer: 0, acgProgressPercent: 0 });
const form2 = reactive({ politicalCount: 0 });

const onCheck1 = function () {
  politicalCheckValue.value = GetPoliticalCount(
    form1.believer,
    form1.acgProgressPercent / 100
  );
};
const onCheck2 = function () {
  politicalCheckRatio.value =
    intToString(GetPropRatioByPolitical(form2.politicalCount) * 100, 3) + "%";
};
</script>

<template>
  <div>
    <SaveGameItem />
    <div class="content">
      <el-switch
        v-model="store.state.gameData.setting.closeGuide"
        active-text="关闭新手引导"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
      <el-switch
        v-model="store.state.gameData.setting.closeNew"
        active-text="关闭新闻"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
      <el-switch
        v-model="store.state.gameData.setting.closeLog"
        active-text="关闭举报日志"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
      <el-switch
        v-model="store.state.gameData.setting.closeComplain"
        active-text="关闭举报弹窗"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
    </div>
    <div class="content">
      <p class="tips">
        游戏总天数：
        {{
          intToString(
            (store.state.gameData.PoliticalData.totalTimes +
              store.state.gameData.totalTime) /
              5000,
            0
          )
        }}天
      </p>
      <p class="tips">
        本轮游戏天数：
        {{ intToString(store.state.gameData.totalTime / 5000, 0) }}天
      </p>
      <p class="tips">
        重置次数： {{ store.state.gameData.PoliticalData.restartTime }}次
      </p>
      <p class="tips">政治背景总计获得： {{ politicalValue }}点</p>
    </div>
    <div class="content">
      <p class="tips">政治背景的获取量以及效果计算：</p>
      <el-form :model="form1" :inline="true">
        <el-form-item label="信徒数量">
          <el-input
            v-model.number="form1.believer"
            @change="onCheck1"
            class="elInput"
          ></el-input>
        </el-form-item>
        <el-tooltip content="填影响力进度的百分比" placement="bottom">
          <el-form-item label="ACG文化">
            <el-input
              v-model.number="form1.acgProgressPercent"
              @change="onCheck1"
              class="elInput"
            ></el-input>
          </el-form-item>
        </el-tooltip>
        <span class="formTitle">可获得政治背景：{{ politicalCheckValue }}</span>
      </el-form>
      <el-form :model="form2" :inline="true">
        <el-form-item label="政治背景">
          <el-input
            v-model.number="form2.politicalCount"
            @change="onCheck2"
            class="elInput"
          ></el-input>
        </el-form-item>
        <span class="formTitle">全局效率加成：{{ politicalCheckRatio }}</span>
      </el-form>
    </div>
  </div>
</template>


<style scoped>
p.tips {
  font-size: 0.3rem;
  color: #303133;
}

.formTitle {
  font-size: 0.3rem;
}

.elInput {
  width: 2rem;
}

div.content {
  background-color: #f2f6fc;
  padding: 0.2rem;
  margin: 0.2rem;
  line-height: 0.4rem;
}

.elswitch {
  margin-left: 0.25rem;
}
</style>