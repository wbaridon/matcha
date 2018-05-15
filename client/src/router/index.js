import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Reset from '@/components/Reset'
import Posts from '@/components/Posts'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login/reset',
      name: 'Reset',
      component: Reset
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
