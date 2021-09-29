
<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import BuildPanel from "./Panel/BuildPanel.vue";
import { ReplaceGameData, store, UpdateGuideTips } from "../core/store";
import { language } from "../core/language";
import WorkPanel from "./Panel/WorkPanel.vue";
import ResourcePanel from "./Panel/ResourcePanel.vue";
import { TimeLineLog } from "../core/complain";
import { EnumTimeLineLogType } from "../core/complain";

const headerHeight = computed(() => {
  let base = 50;
  if (store.state.gameData.influenceLevel >= 2) base += 60;
  return base + "px";
});
const activeIndex = ref("/game/build");
function handleSelect(key: string, keyPath: any) {
  console.log(key, keyPath);
}

function testclick() {
  store.commit(UpdateGuideTips, Math.floor(Math.random() * 10));
  store.state.openGuide = true;
}
</script>

<template>
  <el-row>
    <el-col :height="headerHeight" :span="24">
      <el-popover
        placement="bottom"
        title="Title"
        :width="400"
        trigger="hover"
        content="详细的速度来源信息，总值和当前值"
        v-if="store.state.gameData.influenceLevel >= 2"
      >
        <template #reference>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="store.state.gameData.acgProgressData.value"
            status="exception"
            class="head"
          />
        </template>
      </el-popover>
    </el-col>
  </el-row>
  <el-row :gutter="40">
    <el-col :span="1"> </el-col>
    <el-col :span="6" class="leftPanel" style="padding: 5px">
      <ResourcePanel />
      <WorkPanel />
    </el-col>
    <el-col :span="9">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
        style="margin-bottom: 0.5rem"
      >
        <el-menu-item index="/game/build">家园</el-menu-item>
        <el-menu-item index="/game/research">
          <template #title>研究</template>
        </el-menu-item>
        <el-menu-item index="/game/policy" v-if="false">政治</el-menu-item>
        <el-menu-item index="/game/stats" v-if="false">统计</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </el-col>
    <el-col :span="6" class="leftPanel" style="padding: 40px 10px 10px 0px">
      <el-scrollbar height="600px" >
        <el-timeline>
          <el-timeline-item
            v-for="(log, index) in store.state.timelineLogs"
            :key="index"
            :type="log.iconType"
            :color="log.color"
            :timestamp="log.timestamp"
            :hide-timestamp="log.logType === EnumTimeLineLogType.ComplainState"
            class="timelineItem"
          >
            {{ log.content }}
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </el-col>
    <el-col :span="1"> </el-col>
    <!-- <el-footer height="100px">Footer</el-footer> -->
  </el-row>

  <el-drawer
    v-model="store.state.openGuide"
    title="指引"
    direction="rtl"
    size="20%"
  >
    <span>{{ language.guideTips[store.state.guideTipsID] }}</span>
  </el-drawer>
</template>

<style scoped>
.timelineItem {
  line-height: 15px;
}
.head {
  width: 60%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.news {
  margin-top: 10px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 30px;
}

.leftPanel {
  background-color: #d3dce6;
  line-height: 10px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: left;
  padding: 10px;
  line-height: 60px;
}

/* body > .el-container {
  margin-bottom: 40px;
} */
/* 
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */

/* .tabBg {
  background-color: aliceblue;
  widows: 100%;
  height: 100%;
}
.promoBar {
  background-color: #d5c4a1;
  bottom: 20;
  display: inline-flex;
  height: 2rem;
  line-height: 2rem;
  width: 100%;
  position: fixed;
} */
</style>

