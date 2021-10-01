<script setup lang="ts">
import { Base64 } from "js-base64";
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { ReplaceGameData, store } from "../../store/index";
import useClipboard from "vue-clipboard3";
import { ElMessage, ElMessageBox } from "element-plus";
import { SaveLocalStorageKey } from "../../core/gameSave";
import { router } from "../../router";

const textarea = ref("");
function onImportClick() {
  try {
    let str = Base64.decode(textarea.value);
    const storage = JSON.parse(str);
    if (
      storage !== undefined &&
      storage.cityUnlock !== undefined &&
      storage.sourceArr !== undefined &&
      storage.buildArryList !== undefined
    ) {
      store.commit(ReplaceGameData, storage);
      store.state.haslog = true;
      ElMessage.success({
        showClose: true,
        message: "导入成功，继续游戏吧！",
      });
    } else {
      ElMessage.error({
        showClose: true,
        message: "存档数据不合法，导入失败",
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
  const str = Base64.encode(JSON.stringify(store.state.gameData));
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
  ElMessageBox.alert("清除存档，重置你的所有进度", "危险操作！", {
    confirmButtonText: "OK",
    callback: (action: string) => {
      if(action === "confirm"){
        window.localStorage.clear();
        router.push("/");
      }
    },
  });
}

const { toClipboard } = useClipboard();
</script>

<template>
  <div>
    <el-input v-model="textarea" :rows="5" type="textarea" />
    <el-button class="button" type="primary" @click="onImportClick" plain
      >导入存档</el-button
    >
    <el-button class="button" type="primary" @click="onExportClick" plain
      >导出存档</el-button
    >
    <el-button class="button" type="danger" @click="onClearClick" plain
      >重置游戏</el-button
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
.button {
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