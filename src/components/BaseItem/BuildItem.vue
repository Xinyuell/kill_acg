<script setup lang="ts">
import { getCurrentInstance, PropType, reactive, ref } from "vue";
import { buildPanelData, resourcePanelData } from "../../core/game";

const props = defineProps({
  buildData: {
    type: Object as PropType<buildPanelData>,
    required: true,
  },
});

const emit = defineEmits(["onClickBuild"])

</script>

<template>
  <el-popover placement="bottom" trigger="hover" :width="200">
    <template #reference>
      <el-button class="buildItem" type="info" plain
        >{{ buildData.buildName }}
      </el-button>
    </template>
    <span style="font-size: 10px">{{ buildData.baseTips }}</span>
  </el-popover>
</template>

<style scoped>
.buildItem {
  width: 160px;
  height: 60px;
}
</style>