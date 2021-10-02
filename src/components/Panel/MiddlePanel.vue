<script lang="ts" setup>
import { computed, ref } from "vue";
import { EnumResearchItem } from "../../core/tables/Enum";
import { store } from "../../store/index";
const activeIndex = ref("/game/build");

const showPolicy = computed(()=>{
  if(import.meta.env.DEV)
    return true;
  return store.state.gameData.researchComplete.indexOf(EnumResearchItem.ResearchBuildLevel3) >= 0;
})


</script>


<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    style="margin-bottom: 0.01rem"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/game/build">家园</el-menu-item>
    <el-menu-item index="/game/research">研究</el-menu-item>
    <el-menu-item index="/game/policy" v-if="showPolicy">政治</el-menu-item>
    <el-menu-item index="/game/set">设置</el-menu-item>
  </el-menu>
</template>

