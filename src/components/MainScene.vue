
<script setup lang="ts">
import { computed, ref } from "vue";
import { store, UpdateGuideTips } from "../store/index";
import BuildPanel from "./Panel/BuildPanel.vue";
import WorkPanel from "./Panel/WorkPanel.vue";
import ResourcePanel from "./Panel/ResourcePanel.vue";
import MiddlePanel from "./Panel/MiddlePanel.vue";
import LogPanel from "./Panel/LogPanel.vue";
import AcgProgress from "./Panel/AcgProgress.vue";
import { EnumBuildItem } from "../core/tables/Enum";
import language from "../core/tables/language";
import { GetCurrentLocalDateTime } from "../core/system/complain";
import { GameTime } from "../core/tables/GlobalConfig";

const headerHeight = computed(() => {
  let base = 0.5;
  if (store.state.gameData.influenceLevel >= 2) base += 0.6;
  return base + "rem";
});

const workShow = computed(() => {
  const buildItemData = store.state.gameData.buildArryList.get(
    EnumBuildItem.InfluenceLevel1
  );
  if (buildItemData !== undefined) {
    if (buildItemData.curValue > 0) return true;
  }
  return false;
});
const dialogVisible = ref(false);
const currentLocalTime = computed(()=>{
return  new Date(
      GameTime.StartDate +
        store.state.gameData.totalTime * GameTime.VrtulTimeRatio
    ).toLocaleDateString('zh-CN',{
      dateStyle:"full"
    });
})
const doubleTime = computed(()=>{
  const time =store.state.gameData.setting.doubleTime
  if(time <= 60000)
    return "";
  const hours = Math.floor(time / 3600000);
  const minute =Math.floor((time - hours*3600000)/60000);
  return hours + ":" + minute;
})


const stopGameIcon = computed(()=>{
  if(store.state.stopGame)
  return "el-icon-video-pause";
  else return "el-icon-caret-right" 
})

const stopTips =computed(()=>{
  if(store.state.stopGame)
  return "继续游戏";
  else return "暂停游戏" 
})

function onClick(){
  store.state.stopGame = !store.state.stopGame;
}
const closeDrawerOnclickModal = ref(false)
function AfterDrawerOpen(){
  setTimeout(() => {
    closeDrawerOnclickModal.value = true;
  }, 500);
}

function AfterDrawerClosed(){
  closeDrawerOnclickModal.value = false;
}

</script>

<template>
  <el-row justify="center" style="height: 0.7rem">
    <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="14" style="height: 100%">
      <div class="head">
        <span class="headtext">
          {{ currentLocalTime }}
        </span>
        <el-tooltip content="加速(2x)，离线5分钟后有效，最大12小时" placement="bottom">
        <span class="headtext" v-show="doubleTime !== ''">
          {{ doubleTime }}
        </span>
        </el-tooltip>
         <el-tooltip :content="stopTips" placement="bottom">
         <el-button type="primary" :icon="stopGameIcon" @click="onClick" size="mini" circle></el-button>
           </el-tooltip>
      </div>
    </el-col>
  </el-row>
  <el-row justify="center" style="margin-top:0.1rem;margin-bottom:0.1rem">
    <el-col :height="headerHeight" :xs="24" :sm="24" :md="24" :lg="20" :xl="14">
      <AcgProgress />
    </el-col>
  </el-row>
  <el-row justify="center">
    <el-col
      :span="4"
      class="mainCol"
      :xs="24"
      :sm="24"
      :md="24"
      :lg="6"
      :xl="4"
    >
      <ResourcePanel />
      <WorkPanel v-if="workShow" style="line-height: 0.1rem" />
    </el-col>
    <el-col
      :span="6"
      class="mainCol"
      :xs="24"
      :sm="24"
      :md="24"
      :lg="8"
      :xl="6"
    >
      <MiddlePanel />
      <router-view></router-view>
    </el-col>
    <el-col
      :span="4"
      class="mainCol"
      :xs="24"
      :sm="24"
      :md="24"
      :lg="6"
      :xl="4"
    >
      <LogPanel />
    </el-col>
  </el-row>

  <el-drawer
    v-model="store.state.openGuide"
    title=""
    direction="ttb"
    size="4rem"
    :close-on-click-modal="closeDrawerOnclickModal"
    :show-close="true"
    @opened="AfterDrawerOpen"
    @closed="AfterDrawerClosed"
  >
    <template #title>
      <span
        style="font-size: 0.4rem; line-height: 0.5rem; display: inline-block"
        >新手指引</span
      >
    </template>
    <el-scrollbar height="2rem">
      <span
        style="
          font-size: 0.3rem;
          line-height: 0.5rem;
          display: inline-block;
          white-space: pre-line;
        "
        >{{ language.guideTips[store.state.guideTipsID] }}</span
      >
    </el-scrollbar>
  </el-drawer>
</template>

<style>
div.head {
  background-color: #dcdfe6;
  padding: 0rem;
  margin: 0rem;
  height: 100%;
  line-height: 0.1rem;
}
span.headtext {
  font-size: 0.35rem;
  color: #000000;
  padding: 0rem;
  margin-right: 0.8rem;
  text-align: center;
  display: inline-block;
  height: 100%;

}

span.right {
  font-size: 0.35rem;
  color: #409eff;
}
.mainCol {
  background-color: #dcdfe6;
  margin: 0.02rem;
}

.head {
  width: 100%;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.news {
  margin-top: 0.1rem;
}

.leftPanel {
  line-height: 0.1rem;
}
</style>

