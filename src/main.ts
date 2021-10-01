import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "animate.css"
import App from './App.vue'
import { router } from './router'
import { initGameStore } from './core/store'
import VueCustomTooltip, { TooltipOptions } from '@adamdehaven/vue-custom-tooltip'

const app = createApp(App)

//先加路由
app.use(router)
//再加vuex，初始化玩家数据这里，没存档的玩家和有存档的玩家会开不同的界面
initGameStore(app);

app.use(VueCustomTooltip)
app.use(ElementPlus)
app.mount('#app')

