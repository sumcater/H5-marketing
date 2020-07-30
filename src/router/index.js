import Vue from 'vue'
import Router from 'vue-router'
import configRouters from "./main";

const home = r => require.ensure([], () => r(require('@/page/home/index.vue')), 'chunkname5');
Vue.use(Router)
export default new Router({
  routes: [{
      path: "/",
      redirect: {
        name: 'demo'
      }
    },
    {
      path: "/",
      redirect: {
        name: 'demo'
      }
    },
    {
      path: "/demo",
      name: "demo",
      component: () => import('@/page/demo/index.vue'),
      meta: {
        title: "demo",
        keepAlive: true
      }
    },
    {
      path: "/home",
      name: "home",
      component: home,
      meta: {
        title: "营销管理系统",
        keepAlive: true
      }
    },
    ...configRouters
  ]
})