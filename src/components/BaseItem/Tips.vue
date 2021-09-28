<script lang="ts" setup>

const props = defineProps({
  show: Boolean
})

</script>

<template>
<div class="tips" v-show="show" >
    
</div>

</template>

<style scoped>
.tips {
  --el-popper-border-radius: var(--el-popover-border-radius, 4px);
}
.tips {
  position: absolute;
  border-radius: var(--el-popper-border-radius);
  padding: 10px;
  z-index: 2000;
  font-size: 12px;
  line-height: 1.2;
  min-width: 10px;
  word-wrap: break-word;
  visibility: visible;
   background: var(--el-color-white);
  border: 1px solid var(--el-border-color-light);
   border: 1px solid var(--el-border-color-light);
  background: var(--el-color-white);
  right: 0;
    border-bottom-color: transparent;
  border-right-color: transparent;
}


</style>