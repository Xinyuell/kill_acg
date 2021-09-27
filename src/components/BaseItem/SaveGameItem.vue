<script setup lang="ts">
import { Base64 } from "js-base64";
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { buildPanelData, resourcePanelData } from "../../core/game";
import { ReplaceGameData, store } from "../../core/store";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";

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
      ElMessage.error({
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
     ElMessage.error({
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
function onExportFileClick() {}

const { toClipboard } = useClipboard();
const onCopy = async () => {
  try {
    await toClipboard(textarea.value);
     ElMessage.error({
      message: "内容已经成功复制到剪切板",
      type: "success",
    });
  } catch (e) {
    ElMessage.error({
      showClose: true,
      message: "失败了",
    });
  }
};
</script>

<template>
  <el-input v-model="textarea" :rows="5" type="textarea" />
  <el-button type="primary" @click="onImportClick" plain>导入存档</el-button>
  <el-button type="primary" @click="onExportClick" plain>导出存档</el-button>
  <el-button type="info" @click="onCopy" size="mini" plain>复制</el-button>
</template>

<style scoped>
.el-button {
  margin-top: 2%;
}
</style>