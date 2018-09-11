import Vue from 'vue'
import App from './app/App'
import router from './_helpers/router'
import { store } from './_store/store'

Vue.config.productionTip = false
Vue.config.devtools = true // A desactiver avant rendu

/* eslint-disable no-new */

new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
