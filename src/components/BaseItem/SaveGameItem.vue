<script setup lang="ts">
import { Base64 } from "js-base64";
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { ReplaceGameData, ResetStore, store } from "../../store/index";
import useClipboard from "vue-clipboard3";
import { ElMessage, ElMessageBox } from "element-plus";
import { router } from "../../router";
import {
  getCurrentSaveGameData,
  initGameData,
  ResetGameData,
} from "../../core/gameMain/gameSave";

const textarea = ref("");
function onImportClick() {
  try {
    let str = Base64.decode(textarea.value);
    const storage = JSON.parse(str);
    if (
      storage === undefined ||
      storage.sourceArr === undefined ||
      storage.buildArryList === undefined ||
      storage.PoliticalData === undefined ||
      storage.policyArryList === undefined
    ) {
      ElMessage.error({
        showClose: true,
        message: "存档数据不合法，导入失败",
      });
    } else {
      ResetGameData(store.state, storage);
      store.state.haslog = true;
      ElMessage.success({
        showClose: true,
        message: "导入成功，继续游戏吧！",
      });
    }
  } catch {
    ElMessage.error({
      showClose: true,
      message: "存档数据不合法，导入失败",
    });
  }
}

async function onExportClick() {
  if (store.state.gameData === undefined || store.state.haslog === false) {
    ElMessage.error({
      showClose: true,
      message: "没有存档数据",
    });
    return;
  }
  const saveGameData = getCurrentSaveGameData();
  if (saveGameData === undefined) {
    ElMessage.error({
      showClose: true,
      message: "没有存档数据",
    });
    return;
  }
  const str = Base64.encode(JSON.stringify(saveGameData));
  textarea.value = str;
  try {
    await toClipboard(textarea.value);
    ElMessage.success({
      message: "内容已经成功复制到剪切板",
      type: "success",
    });
  } catch (e) {
    ElMessage.error({
      showClose: true,
      message: "失败了",
    });
  }
}
function onClearClick() {
  ElMessageBox.alert(
    "清除存档，删除你的所有进度，重新开始游戏，并且无法撤销！请先至少导出一份存档再执行此操作",
    "警告！危险操作！",
    {
      confirmButtonText: "OK",
      callback: (action: string) => {
        if (action === "confirm") {
          window.localStorage.clear();
          ResetStore();
          router.push("/");
        }
      },
    }
  );
}

function onOpenClearClick() {
  switchValue.value = !switchValue.value;
  if (switchValue.value) {
    switchBtnText.value = "隐藏删除";
  } else switchBtnText.value = "清空进度";
}

const { toClipboard } = useClipboard();
const switchValue = ref(false);
const switchBtnText = ref("清空进度");
</script>

<template>
  <div>
    <div style="margin: 0.2rem">
      <el-input v-model="textarea" :rows="5" type="textarea" />
    </div>
    <el-button class="elbutton" type="primary" @click="onImportClick" plain
      >导入存档</el-button
    >
    <el-button class="elbutton" type="primary" @click="onExportClick" plain
      >导出存档</el-button
    >
    <el-button class="elbutton" type="danger" @click="onOpenClearClick" plain>{{
      switchBtnText
    }}</el-button>
    <el-button
      class="elbutton"
      type="danger"
      @click="onClearClick"
      plain
      v-show="switchValue"
      >确认删除</el-button
    >
    <el-link
      href="https://github.com/Xinyuell/xinyuell.github.io"
      target="_blank"
      type="danger"
      class="href"
      >反馈BUG</el-link
    >
  </div>
</template>

<style scoped>
.elbutton {
  margin-left: 0.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.href {
  margin-left: 0.2rem;
  display: inline-block;
  vertical-align: baseline;
}
</style>