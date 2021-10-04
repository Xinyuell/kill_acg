
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
</script>

<template>
  <el-row justify="center">
    <el-col :height="headerHeight" :xs="18" :sm="18" :md="24" :lg="12" :xl="12">
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
    :close-on-click-modal="false"
    :show-close="true"
  >
    <template #title>
      <span
        style="font-size: 0.4rem; line-height: 0.5rem; display: inline-block"
        >指引【ESC关闭】</span
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

