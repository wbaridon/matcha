import Vue from 'vue'
import App from './app/App'
import router from './_helpers/router'

Vue.config.productionTip = false
Vue.config.devtools = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
