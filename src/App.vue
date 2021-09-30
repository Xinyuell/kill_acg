<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ElButton, ElRow } from "element-plus";
import { reactive, ref } from "vue";
import { language } from "./core/language";

</script>

<template>
  <router-view></router-view> 
</template>

<style >
.Collapsetitle {
  margin-top: 0.03rem;
}

.CollapsetitleText{
  margin: 0.2rem;
  font-size: 0.35rem;
}

.resourcePanel {
  width: 4.5rem;
  margin: 0.2px;
}
span.tips{
  white-space: pre-line;
}
</style>