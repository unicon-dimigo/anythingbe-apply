import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Application',
    component: () => import(/* webpackChunkName: "Application" */ '../views/Application.vue')
  },
  {
    path: '/m',
    name: 'Application-Mobile',
    component: () => import(/* webpackChunkName: "Application-Mobile" */ '../views/MobileApplication.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import(/* webpackChunkName: "Success" */ '../views/Success.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
