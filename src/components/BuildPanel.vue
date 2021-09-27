<script setup lang="ts">
import { PropType, reactive, ref } from "vue";
import { buildPanelData, resourcePanelData } from "../core/game";
import BuildItem from "./BaseItem/BuildItem.vue";
import { ReplaceGameData, store } from "../core/store";

const activeNames = ref(["0,1,2"]);
</script>

<template>
  <div >
    <el-collapse v-model="activeNames" >
      <el-collapse-item  name="0" v-if="store.state.gameData.cityUnlock[0]">
        <template #title>
          <h3 class="title">村口</h3>
        </template>
        <ul>
            <template v-for="(buildData) in store.state.gameData.buildArryList[0]" :key="buildData.ID">
                <BuildItem class="buildItem" :build-data="buildData" v-if="buildData.unlock" ></BuildItem>
            </template>
        </ul>
      </el-collapse-item>
      <el-collapse-item class="title" title="小镇" name="1" v-if="store.state.gameData.cityUnlock[1]">
        <div></div>
      </el-collapse-item>
      <el-collapse-item class="title" title="县城" name="2" v-if="store.state.gameData.cityUnlock[2]">
        <div></div>
        
      </el-collapse-item>
      <el-collapse-item class="title" title="城市" name="3" v-if="store.state.gameData.cityUnlock[3]">
      </el-collapse-item>
      <el-collapse-item class="title" title="都市" name="4" v-if="store.state.gameData.cityUnlock[4]">
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>

.title{
  margin: 1rem;
  font-size: 1rem;
}

.resourcePanel {
  width: 450px;
  margin: 20px;
}
.buildItem{
    display: inline;
}
</style>