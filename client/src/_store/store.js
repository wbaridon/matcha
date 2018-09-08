import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    isAuth: false
  },
  mutations: {
    logOut: state => {
      state.isAuth = false
    },
    logIn: state => {
      state.isAuth = true
    }
  }
})
