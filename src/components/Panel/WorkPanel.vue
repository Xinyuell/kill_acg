<script  setup lang="ts">
import { computed, ComputedRef, PropType, reactive, ref, State } from "vue";
import {
  ReplaceGameData,
  store,
  UpdateAutoWorkIndex,
  UpdateWorkConfig,
} from "../../store/index";
import {
  EnumResearchItem,
  EnumResourceItem,
  EnumWorkType,
  GlobalConfig,
  IWorkInfo,
  WorkInfoList,
} from "../../core/tables/table";
import { intToString } from "../../core/utils";
/**
 * 我也不想这样的，有空研究清楚了再改
 * 太菜了 搞不定了
 */
import { GetAutoComplainCD } from "../../core/system/complain";
import { resourceItemData } from "../../core/gameMain/gameSave";
import { GetTotalPeople, GetTotalWorks } from "../../core/system/works";

export interface IWorkConfig extends IWorkInfo {
  count: number;
  clickAdd: Function;
  clickSub: Function;
}
const IsShow = computed(function () {
  return (id:number) => {
    if (id < 3) return true;
    const researchComplete = store.state.gameData.researchComplete;
    if (
      id == 3 &&
      researchComplete.indexOf(EnumResearchItem.ResearchBuildLevel2) < 0
    ) {
      return false;
    }
    if (
      id == 4 &&
      researchComplete.indexOf(EnumResearchItem.BelieverInfluenceMax2) < 0
    ) {
      return false;
    }
    return true;
  };
});

const GetTips = computed(function(){
  return (data:IWorkConfig)=>{
    let str = data.Desc;
    if(data.ID === EnumWorkType.ComplainWork){
      const researchComplete = store.state.gameData.researchComplete;
      if( researchComplete.indexOf(EnumResearchItem.AutoComplainLevel1) > 0){
        str += "\n当前信徒会自动举报国内、国外的ACG事件"
      }
      else if(researchComplete.indexOf(EnumResearchItem.AutoComplainLevel2) > 0){
        str += "\n当前信徒会自动举报国内、国外和外太空的ACG事件"
      }
      else{
          str += "\n当前信徒仅自动举报国内的ACG事件"
      }
      str += "\n当前举报一次的CD" + GetAutoComplainCD().toFixed(2);
      str += ",增加人数会加速举报的进度"
    }
    return str;
  }
});

const clickAddFunctions = [
  clickAdd1,
  clickAdd2,
  clickAdd3,
  clickAdd4,
  clickAdd5,
];
const clickSubFunctions = [
  clickSub1,
  clickSub2,
  clickSub3,
  clickSub4,
  clickSub5,
];

const getData = computed(() => {
  const workConfig: number[] = store.state.gameData.workConfig;
  const data: IWorkConfig[] = [];
  WorkInfoList.forEach(function (value, key) {
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
let old = -1;
//选哪个自动，上传store
function radioChange(curValue: number) {
  if (curValue >= 0) {
    switchValue.value = true;
  }
  store.commit(UpdateAutoWorkIndex, curValue);
}

const switchValue = ref(false);
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

//根据按键来增加人数
function clickAdd(e: MouseEvent, index: number) {
  let value = 1;
  if (e.ctrlKey) value *= 10;
  if (e.shiftKey) value *= 25;
  if (e.altKey) value *= 100;
  //如果金钱小于0
  const moneyData = store.state.gameData.sourceArr.get(EnumResourceItem.Money)!;
  let max = moneyData.cacheValue + moneyData.cacheSpeed; // TODO 需要考虑工人的消耗
  if (index === EnumWorkType.Cost1Work) max /= GlobalConfig.Resource.Cost1MoneyRatio;
  else index === EnumWorkType.Cost2Work;
  max /= GlobalConfig.Resource.Cost2MoneyRatio;
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
function clickAdd5(e: any) {
  clickAdd(e, 4);
}
function clickSub5(e: any) {
  clickSub(e, 4);
}
</script>

<template>
  <div class="leftTable workTable">
    <div style="margin-bottom: 0.2rem">
      <span id="spantitle">剩余人数：{{ notWork }}</span>
      <el-switch
        v-model="switchValue"
        @change="cancelAuto"
        active-text="自动分配"
        inactive-text="关闭"
        style="margin-left: 0.4rem; font-size: 0.4rem; display: inline-block"
      />
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
            <span class="tips" >{{ GetTips(data) }}</span>
          </el-popover>
          <span class="number">
            {{ intToString(store.state.gameData.workConfig[data.ID], 0) }}</span
          >
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
            v-model="radio"
            @change="radioChange"
            :label="data.ID"
            ><span></span
          ></el-radio>
        </li>
      </template>
      <!-- <li class="worktab">
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
          style="margin-left: 0.2rem"
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
          style="margin-left: 0.2rem"
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
          style="margin-left: 0.2rem"
          v-model="radio"
          @change="radioChange"
          :label="getData[2].ID"
          ><span></span
        ></el-radio>
      </li>
      <li class="worktab" v-if="showCost2">
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
          style="margin-left: 0.2rem"
          v-model="radio"
          @change="radioChange"
          :label="getData[3].ID"
          ><span></span
        ></el-radio>
      </li>
      <li class="worktab" v-if="showComplain">
        <span class="title"> {{ getData[4].Name }}</span>
        <span class="number">
          {{
            intToString(store.state.gameData.workConfig[getData[4].ID], 0)
          }}</span
        >
        <el-button
          type="info"
          @click="clickSub5"
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
          @click="clickAdd5"
        ></el-button>
        <el-radio
          style="margin-left: 0.2rem"
          v-model="radio"
          @change="radioChange"
          :label="getData[4].ID"
          ><span></span
        ></el-radio>
      </li> -->
    </ul>
  </div>
</template>

<style scoped>
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
  width: 2rem;
  text-align: left;
  display: inline-block;
}

span.number {
  width: 2rem;
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