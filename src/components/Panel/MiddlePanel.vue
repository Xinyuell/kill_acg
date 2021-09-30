<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("/game/build");
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
        <el-menu-item index="/game/research">
          <template #title>研究</template>
        </el-menu-item>
        <el-menu-item index="/game/set">设置</el-menu-item>
        <el-menu-item index="/game/stats" v-if="false">统计</el-menu-item>
      </el-menu>
</template>

