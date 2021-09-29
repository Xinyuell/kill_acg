<script  setup lang="ts">
import { computed, PropType, reactive, ref, State } from "vue";
import { resourceItemData } from "../../core/gameSave";
import {
  ReplaceGameData,
  store,
  UpdateAutoWorkIndex,
  UpdateWorkConfig,
} from "../../core/store";
import {
  EnumResourceItem,
  EnumWorkType,
  GlobalConfig,
  IWorkInfo,
  WorkInfoList,
} from "../../core/table";
import { intToString } from "../../core/utils";
import { IWorkConfig } from "../BaseItem/WorkItem.vue";
import WorkItem from "../BaseItem/WorkItem.vue";
import { GetTotalPeople, GetTotalWorks } from "../../core/gameUpdate";
/**
 * 我也不想这样的，实在是往组件传参了
 * 太菜了 搞不定了
 */
const getData = computed(() => {
  const workConfig: number[] = store.state.gameData.workConfig;
  const data: IWorkConfig[] = [];
  WorkInfoList.forEach(function (value, key) {
    data.push({
      count: workConfig[key] ? workConfig[key] : 0,
      Name: value.Name,
      ID: value.ID,
      Desc: value.Desc,
    });
  });

  return data;
});

const notWork = computed(() => {
  const workConfig: number[] = store.state.gameData.workConfig;
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
  let people = 0;
  if (sourceArr.has(EnumResourceItem.Believer))
    people += sourceArr.get(EnumResourceItem.Believer)!.cacheValue;
  if (sourceArr.has(EnumResourceItem.People))
    people += sourceArr.get(EnumResourceItem.People)!.cacheValue;

  let total = 0;
  workConfig.forEach((element) => {
    total += element;
  });
  return Math.floor(people - total + 0.00001);
});
const radio = ref(-1);

//选哪个自动，上传store
function radioChange(curValue: number) {
  store.commit(UpdateAutoWorkIndex, curValue);
}

//根据按键来增加人数
function clickAdd(e: MouseEvent, index: number) {
  let value = 1;
  if (e.ctrlKey) value *= 10;
  if (e.shiftKey) value *= 25;
  if (e.altKey) value *= 100;
  //如果金钱小于0
  const moneyData = store.state.gameData.sourceArr.get(EnumResourceItem.Money)!;
  let max = moneyData.cacheValue + moneyData.cacheSpeed; // TODO 需要考虑工人的消耗
  if (index === EnumWorkType.Cost1Work) max /= GlobalConfig.Cost1MoneyRatio;
  else index === EnumWorkType.Cost2Work;
  max /= GlobalConfig.Cost2MoneyRatio;
  max = Math.floor(max);
  if (max < 0) return;
  value = Math.min(value, max); //取更小的，如果钱不够了最大能加的人则有限
  let people = GetTotalPeople();
  let total = GetTotalWorks();
  if (people >= total + value) {
    store.commit(UpdateWorkConfig, { index, value });
  } else {
    value = Math.floor(people - total + 0.00001); //人是整数
    if (value > 0) store.commit(UpdateWorkConfig, { index, value });
  }
}

function clickSub(e: MouseEvent, index: number) {
  let value = 1;
  if (e.ctrlKey) value *= 10;
  if (e.shiftKey) value *= 25;
  if (e.altKey) value *= 100;
  const workConfig: number[] = store.state.gameData.workConfig;

  //减少人数只要对应的index人数满足就够了
  if (workConfig[index] >= value) {
    store.commit(UpdateWorkConfig, { index, value: -value });
  } else {
    value = -workConfig[index]; //直接减少到0
    store.commit(UpdateWorkConfig, { index, value });
  }
}

function clickAdd1(e: any) {
  clickAdd(e, 0);
}
function clickSub1(e: any) {
  clickSub(e, 0);
}
function clickAdd2(e: any) {
  clickAdd(e, 1);
}
function clickSub2(e: any) {
  clickSub(e, 1);
}
function clickAdd3(e: any) {
  clickAdd(e, 2);
}
function clickSub3(e: any) {
  clickSub(e, 2);
}
function clickAdd4(e: any) {
  clickAdd(e, 3);
}
function clickSub4(e: any) {
  clickSub(e, 3);
}
const switchValue = ref(false);
let old = -1;
function cancelAuto(value: boolean) {
  if (value === false) {
    old = radio.value;
    radio.value = -1;
  } else {
    if (old < 0) old = 0;
    radio.value = old;
  }
  store.commit(UpdateAutoWorkIndex, radio.value);
}
</script>

<template>
  <div class="leftTable workTable">
    <div class="titlep">
      <span>剩余人数：{{ notWork }}</span>
      <el-switch
        v-model="switchValue"
        @change="cancelAuto"
        active-text="自动分配"
        inactive-text="关闭"
        style="margin-left: 15px"
      />
    </div>
    <ul id="workDataul">
      <li class="worktab">
        <span class="title"> {{ getData[0].Name }}</span>
        <span class="number">
          {{
            intToString(store.state.gameData.workConfig[getData[0].ID], 0)
          }}</span
        >
        <el-button
          type="info"
          @click="clickSub1"
          icon="el-icon-d-arrow-left"
          size="mini"
          circle
        >
        </el-button>
        <el-button
          type="info"
          icon="el-icon-d-arrow-right"
          size="mini"
          circle
          @click="clickAdd1"
        ></el-button>
        <el-radio
          style="margin-left: 15px"
          v-model="radio"
          @change="radioChange"
          :label="getData[0].ID"
          ><span></span
        ></el-radio>
      </li>
      <li class="worktab">
        <span class="title"> {{ getData[1].Name }}</span>
        <span class="number">
          {{
            intToString(store.state.gameData.workConfig[getData[1].ID], 0)
          }}</span
        >
        <el-button
          @click="clickSub2"
          type="info"
          icon="el-icon-d-arrow-left"
          size="mini"
          circle
        >
        </el-button>
        <el-button
          type="info"
          icon="el-icon-d-arrow-right"
          size="mini"
          @click="clickAdd2"
          circle
        ></el-button>
        <el-radio
          style="margin-left: 15px"
          v-model="radio"
          @change="radioChange"
          :label="getData[1].ID"
          ><span></span
        ></el-radio>
      </li>
      <li class="worktab">
        <span class="title"> {{ getData[2].Name }}</span>
        <span class="number">
          {{
            intToString(store.state.gameData.workConfig[getData[2].ID], 0)
          }}</span
        >
        <el-button
          type="info"
          @click="clickSub3"
          icon="el-icon-d-arrow-left"
          size="mini"
          circle
        >
        </el-button>
        <el-button
          type="info"
          icon="el-icon-d-arrow-right"
          size="mini"
          @click="clickAdd3"
          circle
        ></el-button>
        <el-radio
          style="margin-left: 15px"
          v-model="radio"
          @change="radioChange"
          :label="getData[2].ID"
          ><span></span
        ></el-radio>
      </li>
      <li class="worktab">
        <span class="title"> {{ getData[3].Name }}</span>
        <span class="number">
          {{
            intToString(store.state.gameData.workConfig[getData[3].ID], 0)
          }}</span
        >
        <el-button
          type="info"
          @click="clickSub4"
          icon="el-icon-d-arrow-left"
          size="mini"
          circle
        >
        </el-button>
        <el-button
          type="info"
          icon="el-icon-d-arrow-right"
          size="mini"
          circle
          @click="clickAdd4"
        ></el-button>
        <el-radio
          style="margin-left: 15px"
          v-model="radio"
          @change="radioChange"
          :label="getData[3].ID"
          ><span></span
        ></el-radio>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.titlep {
  text-align: left;
  margin-bottom: 1rem;
}
.workTable {
  margin-top: 4rem;
  margin-bottom: 10px;
}
#workDataul {
  padding-inline-start: 1px;
  margin-block-end: 0;
}

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