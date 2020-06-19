import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Application',
    beforeEnter (from, to, next) {
      const { innerWidth: width } = window
      alert(width)
      if (width < 1000) next('/m')
    },
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
  base: process.env.BASE_URL,
  routes
})

export default router
