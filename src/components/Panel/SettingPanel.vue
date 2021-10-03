<script setup lang="ts">
import SaveGameItem from "../BaseItem/SaveGameItem.vue";
import language from "../../core/tables/language";
import { ref } from "vue";
import { store } from "../../store";
</script>

<template>
  <div>
    <SaveGameItem />
    <div>
      <el-switch
        v-model="store.state.setting.closeGuide"
        active-text="关闭新手引导弹窗"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
      <el-switch
        v-model="store.state.setting.closeNew"
        active-text="关闭新闻"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
      <el-switch
        v-model="store.state.setting.closeLog"
        active-text="关闭举报日志"
        active-color="#13ce66"
        inactive-color="#ff4949"
        class="elswitch"
      >
      </el-switch>
    </div>
  </div>
</template>


<style scoped>
p.tips {
  font-size: 0.3rem;
}
.elswitch {
  margin-left: 0.25rem;
}
</style>