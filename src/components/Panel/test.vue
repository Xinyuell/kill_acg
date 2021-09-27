 <el-container>
    <el-header :height="headerHeight">
      <el-popover
        placement="bottom"
        title="Title"
        :width="400"
        trigger="hover"
        content="详细的速度来源信息，总值和当前值"
        v-if="store.state.gameData.influenceLevel >= 2"
      >
        <template #reference>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="store.state.gameData.acgProgressData.value"
            status="exception"
            class="head"
          />
        </template>
      </el-popover>
      <div v-show="show1">
        <el-alert type="success" center class="head" :closable="false">
          <template #title>
            <p>{{ news_1 }}</p>
          </template>
        </el-alert>
      </div>
      <div v-show="show2">
        <el-alert type="success" center class="head" :closable="false">
          <template #title>
            <p>{{ news_2 }}</p>
          </template>
        </el-alert>
      </div>
    </el-header>
    <el-container>
      <el-aside width="360px">
        <ResourcePanel />
        <WorkPanel/>
      </el-aside>
      <el-container>
        <el-main>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#F2F6FC"
            text-color="#000"
            active-text-color="#E6A23C"
            @select="handleSelect"
            router
            style="margin-bottom:0.5rem"
          >
            <el-menu-item index="/game/build">家园</el-menu-item>
            <el-menu-item index="/game/research">
              <template #title>研究</template>
            </el-menu-item>
            <el-menu-item index="/game/build">政治</el-menu-item>
            <el-menu-item index="/game/build">统计</el-menu-item>
          </el-menu>
          <router-view></router-view>
        </el-main>
        <!-- <el-footer height="100px">Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>

  <el-drawer
    v-model="drawer"
    title="引导"
    direction="ttb"
    :close-delay="500"
    size="20%"
  >
    <span>{{ guideTips }}</span>
  </el-drawer>