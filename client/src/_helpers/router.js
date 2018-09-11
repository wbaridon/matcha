import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Register from '@/components/Register'
import Reset from '@/components/Reset'
import Posts from '@/components/Posts'
import Profile from '@/components/Profile'
import Myprofile from '@/components/Myprofile'
import Suggestion from '@/components/Suggestion'
import Activate from '@/components/Activate'
import { store } from '../_store/store'
import Login from '@/services/LoginService'

var VueCookie = require('vue-cookie')

Vue.use(VueCookie)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  store: store,
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/register', name: 'Register', component: Register },
    { path: '/activate', name: 'activate', component: Activate },
    { path: '/login/reset', name: 'Reset', component: Reset },
    { path: '/posts', name: 'Posts', component: Posts },
    {
      path: '/suggestion',
      name: 'suggestion',
      component: Suggestion,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'myprofile',
      component: Myprofile,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/profile/:userId', name: 'profile', component: Profile },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Login.checkAuth(VueCookie.get('authToken')).then(res => {
      if (res.result === true) {
        next()
        store.commit('logIn')
      } else {
        next('/')
      }
    })
  } else {
    next()
  }
})

export default router
