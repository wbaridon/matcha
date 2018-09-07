import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Reset from '@/components/Reset'
import Posts from '@/components/Posts'
import Profile from '@/components/Profile'
import Myprofile from '@/components/Myprofile'
import Suggestion from '@/components/Suggestion'

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
      path: '/suggestion',
      name: 'suggestion',
      component: Suggestion
    },
    {
      path: '/profile',
      name: 'myprofile',
      component: Myprofile,
      /*meta: {
        isAuth: true
      }*/
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: Profile
    }
  ]
})
