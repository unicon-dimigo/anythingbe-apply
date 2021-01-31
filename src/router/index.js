import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Application',
    beforeEnter (from, to, next) {
      const { innerWidth: width } = window
      if (width < 1000) next('/m')
      next()
    },
    component: () => import('../views/Application.vue')
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
