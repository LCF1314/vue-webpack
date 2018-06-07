// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/js/index.js'; // 添加资源中js文件
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../theme/index.scss'
import './assets/css/app.scss'
import Http, { http } from './apis'
import utils, { $kgw } from './utils'
import loginHref from './utils/loginHref.js';
import getCookie from './apis/getCookie.js';
import store from './store'
// import echarts from 'echarts'
Vue.config.productionTip = false
// Vue.prototype.$echarts = echarts 
Vue.use(ElementUI);
Vue.use(Http);
Vue.use(utils)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
