
<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import BuildPanel from "./Panel/BuildPanel.vue";
import { ReplaceGameData, store, UpdateGuideTips } from "../core/store";
import { language } from "../core/language";
import WorkPanel from "./Panel/WorkPanel.vue";
import ResourcePanel from "./Panel/ResourcePanel.vue";
import { TimeLineLog } from "../core/complain";

import { EnumBuildItem } from "../core/table";
import MiddlePanel from "./Panel/MiddlePanel.vue";
import LogPanel from "./Panel/LogPanel.vue";
import AcgProgress from "./Panel/AcgProgress.vue";

const headerHeight = computed(() => {
  let base = 0.5;
  if (store.state.gameData.influenceLevel >= 2) base += 0.6;
  return base + "rem";
});
const activeIndex = ref("/game/build");
function handleSelect(key: string, keyPath: any) {}

function testclick() {
  store.commit(UpdateGuideTips, Math.floor(Math.random() * 10));
  store.state.openGuide = true;
}
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
</script>

<template>
  <el-row>
    <el-col :span="6" class="hidden-sm-and-down"> </el-col>
    <el-col :height="headerHeight" :span="12" class="hidden-sm-and-down">
      <AcgProgress />
    </el-col>
    <el-col :height="headerHeight" :span="24" class="hidden-md-and-up">
      <AcgProgress />
    </el-col>
  </el-row>
  <el-row style="margin-top: 1rem" class="hidden-sm-and-down">
    <el-col :span="4"> </el-col>
    <el-col :span="5" class="mainCol" style="line-height: 0.1rem">
      <ResourcePanel />
      <WorkPanel v-if="workShow" />
    </el-col>
    <el-col :span="6" class="mainCol">
      <MiddlePanel />
      <router-view></router-view>
    </el-col>
    <el-col :span="5" class="mainCol">
      <LogPanel />
    </el-col>
  </el-row>

  <el-row style="margin-top: 1rem" class="hidden-md-and-up">
    <el-col :span="24" class="mainCol" style="line-height: 0.1rem">
      <ResourcePanel />
      <WorkPanel v-if="workShow" />
    </el-col>
    <el-col :span="24" class="mainCol">
      <MiddlePanel />
      <router-view></router-view>
    </el-col>
    <el-col :span="24" class="mainCol">
      <LogPanel />
    </el-col>
  </el-row>

  <el-drawer
    v-model="store.state.openGuide"
    title=""
    direction="ttb"
    size="4rem"
    :close-on-click-modal="false"
    :show-close="true"
  >
    <template #title>
      <span
        style="font-size: 0.4rem; line-height: 0.5rem; display: inline-block"
        >指引【ESC关闭】</span
      >
    </template>
    <el-scrollbar height="8rem">
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
.el-drawer__header {
  margin-bottom: 0 !important;
}
@media only screen and (max-width: 767px) {
  .hidden-xs-only {
    display: none !important;
  }
}

@media only screen and (min-width: 768px) {
  .hidden-sm-and-up {
    display: none !important;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .hidden-sm-only {
    display: none !important;
  }
}

@media only screen and (max-width: 991px) {
  .hidden-sm-and-down {
    display: none !important;
  }
}

@media only screen and (min-width: 992px) {
  .hidden-md-and-up {
    display: none !important;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .hidden-md-only {
    display: none !important;
  }
}

@media only screen and (max-width: 1199px) {
  .hidden-md-and-down {
    display: none !important;
  }
}

@media only screen and (min-width: 1200px) {
  .hidden-lg-and-up {
    display: none !important;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1919px) {
  .hidden-lg-only {
    display: none !important;
  }
}

@media only screen and (max-width: 1919px) {
  .hidden-lg-and-down {
    display: none !important;
  }
}

@media only screen and (min-width: 1920px) {
  .hidden-xl-only {
    display: none !important;
  }
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

