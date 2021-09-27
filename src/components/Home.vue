<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from 'element-plus'
import { store } from "../core/store";
import { router } from "../router";
import SaveGameItem from "./BaseItem/SaveGameItem.vue";

const dialogVisible = ref(false);
function OnNewGameClick() {
  if (store.state.haslog) {
    router.push("/game");
  } else {
    router.push("/introduction");
  }
}
function OnLoadClick() {
  dialogVisible.value = true;
}

function OnAchievementClick() {
   ElMessage.error({
    message: "敬请期待",
    type: "warning",
  });
}
function GetGameName() {
  return store.state.haslog ? "继续游戏" : "新游戏";
}
</script>

<template>
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
  position: absolute;
  width: 400px;
  height: 500px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.elButton {
  width: 20rem;
  margin: 1rem;
  font-size: 1.5rem;
}
</style>