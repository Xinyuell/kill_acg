<script  setup lang="ts">
import { computed, ref } from "vue";
import {
  store,
  UpdateAutoWorkIndex,
  UpdateWorkConfig,
} from "../../store/index";
import * as table from "../../core/tables/table";
import { intToString } from "../../core/utils";
/**
 * 我也不想这样的，有空研究清楚了再改
 */
import { GetAutoComplainCD } from "../../core/system/complain";
import { resourceItemData } from "../../core/gameMain/gameSave";
import { GetTotalPeople, GetTotalWorks } from "../../core/system/works";
import { IWorkInfo } from "../../core/tables/ITableInfo";
import * as Enum from "../../core/tables/Enum";
import { Resource } from "../../core/tables/GlobalConfig";
import language from "../../core/tables/language";

export interface IWorkConfig extends IWorkInfo {
  count: number;
  clickAdd: Function;
  clickSub: Function;
}
const percentRadioValue = ref("1");

const IsShow = computed(function () {
  return (id: number) => {
    if (id < Enum.EnumWorkType.Cost2Work) return true;
    const researchComplete = store.state.gameData.researchComplete;
    if (
      id == Enum.EnumWorkType.Cost2Work &&
      researchComplete.indexOf(Enum.EnumResearchItem.ResearchBuildLevel2) < 0
    ) {
      return false;
    }
    if (
      id == Enum.EnumWorkType.ComplainWork &&
      researchComplete.indexOf(Enum.EnumResearchItem.BelieverInfluenceMax2) < 0
    ) {
      return false;
    }
    if (
      id == Enum.EnumWorkType.PolicyWork &&
      researchComplete.indexOf(Enum.EnumResearchItem.ResearchBuildLevel3) < 0
    ) {
      return false;
    }
    return true;
  };
});

const GetTips = computed(function () {
  return (data: IWorkConfig) => {
    let str = data.Desc;
    if (data.ID === Enum.EnumWorkType.ComplainWork) {
      const researchComplete = store.state.gameData.researchComplete;
      if (
        researchComplete.indexOf(Enum.EnumResearchItem.AutoComplainLevel1) > 0
      ) {
        str += "\n当前信徒会自动举报国内、国外的ACG事件";
      } else if (
        researchComplete.indexOf(Enum.EnumResearchItem.AutoComplainLevel2) > 0
      ) {
        str += "\n当前信徒会自动举报国内、国外和外太空的ACG事件";
      } else {
        str += "\n当前信徒仅自动举报国内的ACG事件";
      }
      str += "\n当前举报一次的CD" + GetAutoComplainCD().toFixed(2);
      str += ",增加人数会加速举报的进度";
    }
    return str;
  };
});

const clickAddFunctions = [
  clickAdd1,
  clickAdd2,
  clickAdd3,
  clickAdd4,
  clickAdd5,
  clickAdd6,
];
const clickSubFunctions = [
  clickSub1,
  clickSub2,
  clickSub3,
  clickSub4,
  clickSub5,
  clickSub6,
];

const getData = computed(() => {
  const workConfig: number[] = store.state.gameData.workConfig;
  const data: IWorkConfig[] = [];
  table.WorkInfoList.forEach(function (value, key) {
    data.push({
      count: workConfig[key] ? workConfig[key] : 0,
      Name: value.Name,
      ID: value.ID,
      Desc: value.Desc,
      clickAdd: clickAddFunctions[key],
      clickSub: clickSubFunctions[key],
    });
  });

  return data;
});

const notWork = computed(() => {
  const workConfig: number[] = store.state.gameData.workConfig;
  const sourceArr: Map<number, resourceItemData> =
    store.state.gameData.sourceArr;
  let people = 0;
  if (sourceArr.has(Enum.EnumResourceItem.Believer))
    people += sourceArr.get(Enum.EnumResourceItem.Believer)!.cacheValue;
  if (sourceArr.has(Enum.EnumResourceItem.People))
    people += sourceArr.get(Enum.EnumResourceItem.People)!.cacheValue;

  let total = 0;
  workConfig.forEach((element) => {
    total += element;
  });
  return Math.floor(people - total + 0.00001);
});

const autoWorkRadio = ref(-1);
const switchValue = ref(false);
let old = -1;
//选哪个自动，上传store
function radioChange(curValue: number) {
  if (curValue >= 0) {
    switchValue.value = true;
  }
  store.commit(UpdateAutoWorkIndex, curValue);
}


function cancelAuto(value: boolean) {
  if (value === false) {
    old = autoWorkRadio.value;
    autoWorkRadio.value = -1;
  } else {
    if (old < 0) old = 0;
    autoWorkRadio.value = old;
  }
  store.commit(UpdateAutoWorkIndex, autoWorkRadio.value);
}

//根据按键来增加人数
function clickAdd(e: MouseEvent, index: number) {
  let value = 1;
  if (percentRadioValue.value === "1") {
    if (e.ctrlKey) value *= 10;
    if (e.shiftKey) value *= 25;
    if (e.altKey) value *= 100;
  } else if (percentRadioValue.value === "25%") {
    value = Math.floor(notWork.value * 0.25);
  } else if (percentRadioValue.value === "50%") {
    value = Math.floor(notWork.value * 0.5);
  } else if (percentRadioValue.value === "100%") {
    value = notWork.value;
  }

  //如果金钱小于0
  const moneyData = store.state.gameData.sourceArr.get(
    Enum.EnumResourceItem.Money
  )!;
  let max = moneyData.cacheValue + moneyData.cacheSpeed; // TODO 需要考虑工人的消耗
  if (index === Enum.EnumWorkType.Cost1Work) max /= Resource.Cost1MoneyRatio;
  else index === Enum.EnumWorkType.Cost2Work;
  max /= Resource.Cost2MoneyRatio;
  max = Math.floor(max);
  if (max < 0){

    return;
  } 
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
  const workConfig: number[] = store.state.gameData.workConfig;
  const curValue = workConfig[index];
  let value = 1;
  if (percentRadioValue.value === "1") {
    if (e.ctrlKey) value *= 10;
    if (e.shiftKey) value *= 25;
    if (e.altKey) value *= 100;
  } else if (percentRadioValue.value === "25%") {
    value = Math.floor(curValue * 0.25);
  } else if (percentRadioValue.value === "50%") {
    value = Math.floor(curValue * 0.5);
  } else if (percentRadioValue.value === "100%") {
    value = curValue;
  }
  //减少人数只要对应的index人数满足就够了
  if (curValue >= value) {
    store.commit(UpdateWorkConfig, { index, value: -value });
  } else {
    store.commit(UpdateWorkConfig, { index, value: -curValue });
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
function clickAdd5(e: any) {
  clickAdd(e, 4);
}
function clickSub5(e: any) {
  clickSub(e, 4);
}
function clickAdd6(e: any) {
  clickAdd(e, 5);
}
function clickSub6(e: any) {
  clickSub(e, 5);
}
</script>

<template>
  <div class="leftTable workTable">
    <div style="margin-left: 0.2rem">
      <p id="spantitle">剩余人数：{{ notWork }}</p>
      <div style="vertical-align:">
        <el-radio-group
          v-model="percentRadioValue"
          size="mini"
          style="display: inline-block"
        >
          <el-radio-button label="1"></el-radio-button>
          <el-radio-button label="25%"></el-radio-button>
          <el-radio-button label="50%"></el-radio-button>
          <el-radio-button label="100%"></el-radio-button>
        </el-radio-group>
        <el-popover
          placement="bottom"
          trigger="hover"
          :width="200"
          transition="124"
        >
          <span class="tips">{{ language.workTips }}</span>
          <template #reference>
            <el-switch
              v-model="switchValue"
              @change="cancelAuto"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="自动"
              class="elswitch"
            />
          </template>
        </el-popover>
      </div>
    </div>
    <ul id="workDataul">
      <template v-for="data in getData" :key="data.ID">
        <li class="worktab" v-if="IsShow(data.ID)">
          <el-popover
            placement="bottom"
            trigger="hover"
            transition=""
            :width="200"
          >
            <template #reference>
              <span class="title"> {{ data.Name }}</span>
            </template>
            <span class="tips">{{ GetTips(data) }}</span>
          </el-popover>
          <span class="number">
            {{ intToString(store.state.gameData.workConfig[data.ID], 0) }}</span
          >
          <div style="display: inline;">
            <el-button
              type="info"
              @click="data.clickSub"
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
              @click="data.clickAdd"
            ></el-button>
            <el-radio
              style="margin-left: 0.2rem"
              v-model="autoWorkRadio"
              @change="radioChange"
              :label="data.ID"
              ><span></span
            ></el-radio>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.elswitch {
  margin-right: 0.3rem;
  display: inline;
  float: right;
  text-align:center;
}

#spantitle {
  font-size: 0.4rem;
  padding: 0.1rem;
  margin-bottom: 0.2rem;
}
.workTable {
  margin-top: 0.6rem;
}
#workDataul {
  padding-inline-start: 0rem;
  margin-block-end: 0;
}

span.title {
  min-width: 1.5rem;
  text-align: left;
  display: inline-block;
}

span.number {
  min-width: 2rem;
  text-align: center;
  display: inline-block;
}
li.worktab {
  padding-left: 0.1rem;
  padding-top: 0rem;
  margin-bottom: 0.02rem;
  background-color: #ffffff;
  height: 0.9rem;
  font-size: 0.3rem;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}
</style>