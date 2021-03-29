import Vue from 'vue'
import VueRouter from 'vue-router'
import AfterLogin from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: AfterLogin
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
