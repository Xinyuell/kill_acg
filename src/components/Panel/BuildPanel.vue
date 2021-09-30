<script setup lang="ts">
import { computed, PropType, reactive, ref } from "vue";
import BuildItem from "../BaseItem/BuildItem.vue";
import { ReplaceGameData, store } from "../../core/store";
import { buildItemData } from "../../core/gameSave";

const activeNames = ref(["0","1","2","3","4"]);
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
    if (value.unlock && value.cityName === 1) data.push(value);
  });
  return data;
});
const buildArry2 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 2) data.push(value);
  });
  return data;
});
const buildArry3 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 3) data.push(value);
  });
  return data;
});
const buildArry4 = computed(() => {
  const buildArryList: Map<number, buildItemData> =
    store.state.gameData.buildArryList;
  const data: buildItemData[] = [];
  buildArryList.forEach(function (value, key) {
    if (value.unlock && value.cityName === 4) data.push(value);
  });
  return data;
});


</script>

<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="0" class="Collapsetitle" >
        <template #title>
          <h3 class="CollapsetitleText">村口</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry0" :key="buildData.ID">
            <BuildItem  :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="Collapsetitle"  name="1" v-if="buildArry1 && buildArry1.length>0">
        <template #title>
          <h3 class="CollapsetitleText">小镇</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry1" :key="buildData.ID">
            <BuildItem :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="Collapsetitle"  name="2" v-if="buildArry2 && buildArry2.length>0">
        <template #title>
          <h3 class="CollapsetitleText">县城</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry2" :key="buildData.ID">
            <BuildItem  :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="Collapsetitle"  name="3" v-if="buildArry3 && buildArry3.length>0">
        <template #title>
          <h3 class="CollapsetitleText">城市</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry3" :key="buildData.ID">
            <BuildItem  :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="Collapsetitle"  name="4" v-if="buildArry4 && buildArry4.length>0">
        <template #title>
          <h3 class="CollapsetitleText">都市</h3>
        </template>
        <ul>
          <template v-for="buildData in buildArry4" :key="buildData.ID">
            <BuildItem  :build-data="buildData"></BuildItem>
          </template>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style>
ul {
  padding: 0.1rem;
  margin-block-start: 0;
  margin-block-end: 0;

}
</style>