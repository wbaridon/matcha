import Vue from 'vue'
import App from './app/App'
import router from './_helpers/router'
import io from 'vue-socket.io'
import { store } from './_store/store'

Vue.config.productionTip = false
Vue.config.devtools = false // A desactiver avant rendu
Vue.use(io, 'http://localhost:8081', store)

/* eslint-disable no-new */

new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
