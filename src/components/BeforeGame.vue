<script setup lang="ts">
import { ElButton, ElRow } from "element-plus";
import { reactive, ref } from "vue";
import language from "../core/tables/language";
import { router } from "../router";
const beforeGameTitle = reactive(language.startGame.enterTitle);
const btns = reactive(language.startGame.btns);
let click = 0;
const onClick = function () {
  if (click == 0) {
    beforeGameTitle[0] = language.startGame.enterTitle1[0];
    beforeGameTitle[1] = language.startGame.enterTitle1[1];
  } else if (click == 1) {
    beforeGameTitle[0] = language.startGame.enterTitle2[0];
    beforeGameTitle[1] = language.startGame.enterTitle2[1];
  } else if (click == 2) {
    router.push("/game/build");
  }
  click++;
};
</script>

<template>
  <div>
    <el-container style="height: 100%">
      <el-main>
        <div class="gametitle">
          <div>{{ beforeGameTitle[0] }}</div>
          <div>{{ beforeGameTitle[1] }}</div>
        </div>
        <div>
          <el-button class="elButton" type="success" @click="onClick">{{ btns[0] }}</el-button>
        </div>
        <div>
          <el-button class="elButton" type="success" @click="onClick">{{ btns[1] }}</el-button>
        </div>
        <div>
          <el-button class="elButton" type="success" @click="onClick">{{ btns[2] }}</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.elButton {
  width: 4rem;
  margin: 0.05rem;
}

.gametitle {
  font-size: 0.8rem;
  margin-top: 5%;
  margin-bottom: 2%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
}

.el-main {
  text-align: center;
}
</style>