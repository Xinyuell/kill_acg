<script setup lang="ts">
import SaveGameItem from "../BaseItem/SaveGameItem.vue";
import { language } from "../../core/tables/language";

const tips = language.settingTips;
</script>

<template>
  <div>
    <SaveGameItem/>
    <p class="tips">一些说明</p>
    <p class="tips">{{tips.content}}</p>
    <p class="tips">Q&A</p>
    <p class="tips">{{tips.tips1}}</p>
    <p class="tips">{{tips.tips2}}</p>

  </div>
</template>


<style scoped>
p.tips{
  font-size: 0.3rem;
}
</style>