
<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import ResourcePanel from "./ResourcePanel.vue";
import BuildPanel from "./BuildPanel.vue";
import { ReplaceGameData, store } from "../core/store";
import { language } from "../core/language";

//新闻词，根据当前影响力的等级决定，这个是一个全局数据，在game那边随机更新ID，然后这里去取
function SetActiveItem(index:number){
   this.$refs.carousel.setActiveItem(index);
}


const newID = ref([0,1,2]);
</script>


<template>
  <el-container>
    <el-header height="100px">
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
            id="acg-progress"
          />
        </template>
      </el-popover>
     
    </el-header>
    <el-container>
      <el-aside width="360px">
        <ResourcePanel />
      </el-aside>
      <el-container>
        <el-main>
          <BuildPanel
        /></el-main>
        <el-footer height="100px">Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
#acg-progress {
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
  line-height: 60px;
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

