import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GAuth from 'vue-google-oauth2'

Vue.use(GAuth, {
  clientId: '824660339822-eobgr5cp36cu2hbs38s2u5t7ti1hsbq1.apps.googleusercontent.com',
  scope: 'email profile ../auth/youtube.readonly'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
