import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
import Posts from '@/components/Posts'

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
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ]
})
