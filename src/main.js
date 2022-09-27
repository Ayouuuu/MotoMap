import Vue from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map'
import axios from "axios";
import Config from '@/data/config.json'

Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(BaiduMap,{
  ak: Config.ak
})
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
