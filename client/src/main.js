// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './_helpers/router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.config.devtools = false

var VueCookie = require('vue-cookie')
// Tell Vue to use the plugin
Vue.use(VueCookie)
/* eslint-disable no-new */
/*const store = new Vuex.Store({
  state: {
    isAuth: false
  },
  mutations: {
    newAuth (state) {
      state.isAuth = true
    },
    destroyAuth (state) {
      state.isAuth = false
    }
  }
})*/

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
