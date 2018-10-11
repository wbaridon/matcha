import Vue from 'vue'
import Vuex from 'vuex'

import NotificationsService from '@/services/Profile/NotificationsService.js'
var VueCookie = require('vue-cookie')

Vue.use(VueCookie)
Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true, // a retirer au deploiement
  state: {
    isAuth: false,
    messages: [],
    notifNumber: 0
  },
  mutations: {
    logOut: state => {
      state.isAuth = false
    },
    logIn: state => {
      state.isAuth = true
    },
    SOCKET_MESSAGE: (state, data) => {
      if (data[0].messageReceive !== 1) {
        state.messages[data[0].recipient].push(data[0])
      } else {
        state.messages[data[0].userid].push(data[0])
      }

    //  state.messages.push(data)
    },
    SOCKET_GET_MESSAGES: (state, data) => {
      Vue.set(state.messages, data[0].recipient, data[0].res)
    },
    SOCKET_UPDATE_NOTIF: (state) => {
      NotificationsService.getAllNotifications(VueCookie.get('authToken'), callback => {
        var notif = callback
        var j = 0
        for (var i = 0; i < notif.length; i++) {
          if (notif[i].readed === 0) {
            j++
          }
        }
        state.notifNumber = j
      })
    }
  }

})
