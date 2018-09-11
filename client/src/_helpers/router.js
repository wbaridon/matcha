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

var VueCookie = require('vue-cookie')

Vue.use(VueCookie)
Vue.use(Router)

export default new Router({
  mode: 'history',
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
      beforeEnter: (to, from, next) => {
        console.log(to.params.isAuth)
        if (to.params.isAuth) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/profile',
      name: 'myprofile',
      component: Myprofile,
      beforeEnter: (to, from, next) => {
        console.log(to.params.isAuth)
        if (to.params.isAuth) {
          next()
        } else {
          next('/')
        }
      }
    },
    { path: '/profile/:userId', name: 'profile', component: Profile },
    { path: '*', redirect: '/' }
  ]
})
