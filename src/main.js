import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
// import store from "./store";

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

Vue.config.productionTip = false
// pageTitle
import pageTitle from "@/components/pageTitle";
Vue.component("pageTitle", pageTitle);

import http from '@/api'
Vue.prototype.$http = http

import utils from '@/assets/utils'
Vue.prototype.$utils = utils


import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
