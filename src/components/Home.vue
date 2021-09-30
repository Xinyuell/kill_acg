<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { store } from "../core/store";
import { router } from "../router";
import SaveGameItem from "./BaseItem/SaveGameItem.vue";

const dialogVisible = ref(false);
function OnNewGameClick() {
  if (store.state.haslog) {
    router.push("/game/build");
  } else {
    router.push("/introduction");
  }
}
function OnLoadClick() {
  dialogVisible.value = true;
}

function OnAchievementClick() {
  ElMessage.warning({
    message: "敬请期待",
    type: "warning",
  });
}
function GetGameName() {
  return store.state.haslog ? "继续游戏" : "新游戏";
}
</script>

<template>
  <!-- <el-row class="hidden-sm-and-down">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <div class="home">
        <div>
          <el-button
            class="elButton"
            type="success"
            @click="OnNewGameClick"
            round
            >{{ GetGameName() }}</el-button
          >
        </div>
        <div>
          <el-button class="elButton" type="success" @click="OnLoadClick" round
            >载入/导出存档</el-button
          >
        </div>
        <div>
          <el-button
            class="elButton"
            type="success"
            @click="OnAchievementClick"
            round
            >成就</el-button
          >
        </div>
      </div>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row> -->

  <el-row>
    <el-link href="https://github.com/Xinyuell/xinyuell.github.io" target="_blank" type="danger" >反馈BUG</el-link>
    <el-col :span="24" >
      <div class="home">
        <div>
          <el-button
            class="elButton"
            type="success"
            @click="OnNewGameClick"
            round
            >{{ GetGameName() }}</el-button
          >
        </div>
        <div>
          <el-button class="elButton" type="success" @click="OnLoadClick" round
            >载入/导出存档</el-button
          >
        </div>
        <div>
          <el-button
            class="elButton"
            type="success"
            @click="OnAchievementClick"
            round
            >成就</el-button
          >
        </div>
        <p style="font-size: 0.3rem">本故事纯属虚构，如有雷同，纯属巧合</p>
  
      </div>
    </el-col>
  </el-row>

  <el-dialog
    v-model="dialogVisible"
    title="导入之前最好保存一份存档"
    width="30%"
  >
    <SaveGameItem />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.home {
  width: 10rem;
  height: 10rem;
  margin: auto;
}
.elButton {
  width: 5rem;
  margin: 0rem;
  font-size: 0.4rem;
}
</style>