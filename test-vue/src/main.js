import Vue from 'vue'
import App from './App.vue'

import Test from './test.vue'
Vue.component('test', Test)
new Vue({
  el: '#app',
  render: h => h(App)
})
