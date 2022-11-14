import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ItemMusic from '../views/ItemMusic.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component:()=>import(/* webpackChunkName: 'itemMusic' */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component:()=>import(/* webpackChunkName: 'Search' */ '../views/Search.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
