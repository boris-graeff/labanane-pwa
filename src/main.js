import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import durationFilter from './filters/duration'

Vue.config.productionTip = false

Vue.filter('duration', durationFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
