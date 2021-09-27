
<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import ResourcePanel from "./ResourcePanel.vue";
import BuildPanel from "./BuildPanel.vue";
import { ReplaceGameData, store } from "../core/store";
import { language } from "../core/language";

const show1 = ref(false);
const show2 = ref(false);
let timeID1 = 0;
let timeID2 = 0;
//新闻词，根据当前影响力的等级决定，这个是一个全局数据，在game那边随机更新ID，然后这里去取
const news_1 = computed(() => {
  const newIDs = store.state.gameData.newID[0];
  if (
    newIDs === undefined ||
    newIDs[0] === undefined ||
    newIDs[1] === undefined
  ) {
    show1.value = false;
    return "";
  }

  clearTimeout(timeID1);
  show1.value = true;
  timeID1 = setTimeout(() => {
    show1.value = false;
  }, 2000);
  return language.news[newIDs[0]][newIDs[1]];
});
const news_2 = computed(() => {
  const newIDs = store.state.gameData.newID[1];
  if (
    newIDs === undefined ||
    newIDs[0] === undefined ||
    newIDs[1] === undefined
  ) {
    show2.value = false;
    return "";
  }

  clearTimeout(timeID2);
  show2.value = true;
  timeID2 = setTimeout(() => {
    show2.value = false;
  }, 2000);
  return language.news[newIDs[0]][newIDs[1]];
});

const drawer = ref(true);
const guideTips = computed(() => {
  const guideID = store.state.guideTipsID
  if (guideID < 0) {
    drawer.value = false;
    return;
  }
  drawer.value = true;
  return language.guideTips[guideID];
});
</script>


<template>
  <el-container>
    <el-header height="200px">
      <el-popover
        placement="bottom"
        title="Title"
        :width="400"
        trigger="hover"
        content="详细的速度来源信息，总值和当前值"
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
      <div v-show="show1">
        <el-alert type="success" center class="head" :closable="false">
          <template #title>
            <p>{{ news_1 }}</p>
          </template>
        </el-alert>
      </div>
      <div v-show="show2">
        <el-alert type="success" center class="head" :closable="false">
          <template #title>
            <p>{{ news_2 }}</p>
          </template>
        </el-alert>
      </div>
    </el-header>
    <el-container>
      <el-aside width="360px">
        <ResourcePanel />
      </el-aside>
      <el-container>
        <el-main> <BuildPanel /></el-main>
        <el-footer height="100px">Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>

  <el-drawer
    v-model="drawer"
    title="引导"
    direction="ttb"
    :close-delay="500"
    size="20%"
  >
    <span>{{guideTips}}</span>
  </el-drawer>
</template>

<style scoped>
.head {
  width: 60%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 30px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  padding: 0px;
  line-height: 60px;
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

