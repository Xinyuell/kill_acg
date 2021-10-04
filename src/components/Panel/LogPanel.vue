<script setup lang="ts">
import { ReplaceGameData, store, UpdateGuideTips } from "../../store/index";
import { EnumTimeLineLogType } from "../../core/system/complain";
</script>

<template>
  <el-scrollbar max-height="10rem">
    <el-timeline style="padding: 0.2rem 0.1rem 0.1rem 0.1rem">
      <el-timeline-item
        v-for="(log, index) in store.state.timelineLogs"
        :key="index"
        :type="log.iconType"
        :color="log.color"
        :timestamp="log.timestamp"
        :hide-timestamp="log.logType === EnumTimeLineLogType.ComplainState"
        class="timelineItem"
      >
        {{ log.content }}
      </el-timeline-item>
    </el-timeline>
  </el-scrollbar>
</template>

<style scoped>
.timelineItem {
  line-height: 0.4rem;
}
</style>