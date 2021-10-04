<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ReplaceGameData, store, UpdateGuideTips } from "../../store/index";
import { intToString } from "../../core/utils";
import { AcgProgressData } from "../../core/tables/GlobalConfig";
const precent = computed(()=>{
  const value = 100 * store.state.gameData.acgProgressValue / AcgProgressData.AcgProgressMax;
  return parseFloat(value.toFixed(2)) ;
})

const tips = computed(()=>{
  const value =  100 * store.state.gameData.acgProgressValue / AcgProgressData.AcgProgressMax;
  const precent = parseFloat(value.toFixed(2)) ;
  const time = (AcgProgressData.AcgProgressMax - store.state.gameData.acgProgressValue) / AcgProgressData.AcgProgressSpeed / 5;
  
  let str = "ACG文化对世界造成的影响力" + intToString(store.state.gameData.acgProgressValue) + "；进度：" +  precent + "%\n";
  str += "ACG文化影响力增长速度" + intToString(AcgProgressData.AcgProgressSpeed) + "(增长速度低于50%后每降低10%，速度翻倍一次)\n还需" + time.toFixed(1) + "天（现实时间5秒等于游戏时间一天）,世界将被毁灭!\n"
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