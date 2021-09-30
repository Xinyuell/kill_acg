<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ReplaceGameData, store, UpdateGuideTips } from "../../core/store";
import { GlobalConfig } from "../../core/table";
import { intToString } from "../../core/utils";
const precent = computed(()=>{
  const value = 100 * store.state.gameData.acgProgressValue / GlobalConfig.AcgProgressMax;
  return parseFloat(value.toFixed(2)) ;
})

const tips = computed(()=>{
  const value =  100 * store.state.gameData.acgProgressValue / GlobalConfig.AcgProgressMax;
  const precent = parseFloat(value.toFixed(2)) ;
  const time = (GlobalConfig.AcgProgressMax - store.state.gameData.acgProgressValue) / GlobalConfig.AcgProgressSpeed;
  
  let str = "ACG文化对世界造成的影响力" + intToString(store.state.gameData.acgProgressValue) + "；进度：" +  precent + "%\n";
  str += "ACG文化影响力增长速度" + intToString(GlobalConfig.AcgProgressSpeed) + "\n还需" + time.toFixed(1) + "天（现实时间1秒等于游戏时间一天）,世界将被毁灭!\n"
  str += "解锁举报功能后将有效遏制ACG文化的发展"
  return str;
})
</script>

<template>
    <el-popover
        placement="bottom"
        title="ACG文化对世界的影响力"
        :width="400"
        trigger="hover"
        v-if="store.state.gameData.influenceLevel > 1"
      >
        <template #reference>
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="precent"
            status="exception"
            class="head"
          />
        </template>
         <span class="tips">{{ tips }}</span>
      </el-popover>
</template>