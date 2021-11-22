import Vue from 'vue'
import Vuex from 'vuex'
// vue-axios 套件
import axios from 'axios'
import VueAxios from 'vue-axios'
// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

// loading套件
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// AOS套件
import AOS from 'aos'
import 'aos/dist/aos.css'
// bootstrap 的js
import 'bootstrap'

// 表單驗證套件
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules.js'

// 自行撰寫的程式
import App from './App.vue'
import router from './router'
import './bus'
import currencyFilter from './filters/currency.js'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
AOS.init()
Vue.component('Loading', Loading)
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
localize('zh_TW', TW)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.filter('currency', currencyFilter)

axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
