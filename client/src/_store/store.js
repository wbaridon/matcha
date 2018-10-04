import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    isAuth: false,
    messages: []
  },
  mutations: {
    logOut: state => {
      state.isAuth = false
    },
    logIn: state => {
      state.isAuth = true
    },
    SOCKET_MESSAGE: (state, data) => {
      state.messages.push(data[0])
    },
    SOCKET_GET_MESSAGES: (state, data) => {
      state.messages = data[0]
    }
  }
})
