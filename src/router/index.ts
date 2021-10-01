import VueRouter, { createRouter, createWebHashHistory } from "vue-router";
import AppVue from "../App.vue";
import BeforeGameVue from "../components/BeforeGame.vue";
import BuildItemVue from "../components/BaseItem/BuildItem.vuedItem.vue";
import HomeVue from "../components/Home.vue";
import MainSceneVue from "../components/MainScene.vue";
import { SetGameRunning, store } from "../store/index";
import BuildPanelVue from "../components/Panel/BuildPanel.vue";
import ResearchPanelVue from "../components/Panel/ResearchPanel.vue";
import SettingPanelVue from "../components/Panel/SettingPanel.vue";
import PolicyPanelVue from "../components/Panel/PolicyPanel.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeVue,
      meta:{isGame:false},
    },
    {
      path: "/introduction",
      name: "introduction",
      component: BeforeGameVue,
      meta:{isGame:false},
    },
    {
      name: "game",
      path: "/game",
      component: MainSceneVue,
      meta:{isGame:true},
      children:[
        {
          path: "build",
          name: "build",
          component: BuildPanelVue,
          meta:{isGame:true},
        },
        {
          path: "research",
          name: "research",
          component: ResearchPanelVue,
          meta:{isGame:true},
        },
        {
          path: "policy",
          name: "policy",
          component: PolicyPanelVue,
          meta:{isGame:true},
        },
        {
          path: "set",
          name: "set",
          component: SettingPanelVue,
          meta:{isGame:true},
        },

      ]
    },
    
  ],
});
router.afterEach((to, from) => {
  if(to.meta.isGame){
    store.commit(SetGameRunning,true)
  }
  else{
    store.commit(SetGameRunning,false)
  }
})
