<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import BuildItem from "../BaseItem/BuildItem.vue";
import { ReplaceGameData, store } from "../../core/store";
import { buildItemData } from "../../core/gameSave";

const activeNames = ref(["0,1,2"]);
const buildArry0 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 0) data.push(value);
  });
  return data;
});
const buildArry1 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 0) data.push(value);
  });
  return data;
});
const buildArry2 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 0) data.push(value);
  });
  return data;
});
const buildArry3 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 0) data.push(value);
  });
  return data;
});
const buildArry4 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 0) data.push(value);
  });
  return data;
});
</script>

<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="0" v-if="store.state.gameData.cityUnlock[0]">
        <template #title>
          <h3 class="title">村口</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry0" :key="buildData.ID">
            <BuildItem class="buildItem" :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="title" title="小镇" name="1" v-if="store.state.gameData.cityUnlock[1]">
        <template #title>
          <h3 class="title">小镇</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry1" :key="buildData.ID">
            <BuildItem class="buildItem" :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="title" title="县城" name="2" v-if="store.state.gameData.cityUnlock[2]">
        <template #title>
          <h3 class="title">县城</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry2" :key="buildData.ID">
            <BuildItem class="buildItem" :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="title" title="城市" name="3" v-if="store.state.gameData.cityUnlock[3]">
        <template #title>
          <h3 class="title">城市</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry3" :key="buildData.ID">
            <BuildItem class="buildItem" :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="title" title="都市" name="4" v-if="store.state.gameData.cityUnlock[4]">
        <template #title>
          <h3 class="title">都市</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry4" :key="buildData.ID">
            <BuildItem class="buildItem" :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.title {
  margin: 1rem;
  font-size: 1rem;
}

.resourcePanel {
  width: 450px;
  margin: 20px;
}
.buildItem {
  display: inline;
}
</style>