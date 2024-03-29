import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home/_Home'
import Register from '@/components/Register'
import Reset from '@/components/Reset'
import ConfirmReset from '@/components/ConfirmReset'
import Profile from '@/components/Profile/Public/Profile'
import Myprofile from '@/components/Profile/_UserProfile'
import Suggestion from '@/components/Suggestion/_Suggestion'
import Activate from '@/components/Activate'
import Chat from '@/components/Chat'
import Matches from '@/components/Matches'
import Notifications from '@/components/Notifications'
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
    { path: '/login/Confirmreset', name: 'ConfirmReset', component: ConfirmReset },
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
    { path: '/profile/:userId',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Matches,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat/:userId',
      name: 'chatwith',
      component: Chat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
      meta: {
        requiresAuth: true
      }
    },
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
