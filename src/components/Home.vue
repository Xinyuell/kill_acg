<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { store } from "../store/index";
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
  <el-row style="height: 100%">
    <el-col
      :span="24"
      style="align-items: center; justify-content: center; height: 100%"
    >
      <div class="flexdiv">
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
            <el-button
              class="elButton"
              type="success"
              @click="OnLoadClick"
              round
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
          <p style="font-size: 0.3rem;text-align:center">本故事纯属虚构</p>
          <p style="font-size: 0.3rem;text-align:center">如有雷同纯属巧合</p>
        </div>
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
.flexdiv {
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
  height: 100%;
}
h1.title {
  width: 12rem;
  height: 4rem;
  margin: 0 auto;
  font-size: 2rem;
  color: #f56c6c;
}

.home {

  width: 5rem;
  height: 6rem;
  margin: 0 auto;
}
.elButton {
  width: 5rem;
  margin: 0rem;
  font-size: 0.4rem;
}
</style>