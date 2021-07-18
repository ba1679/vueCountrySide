import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap'

import {
  ValidationObserver, // input驗證元件
  ValidationProvider, // 整體<form>驗證元件
  extend, // 擴充功能
  localize, // 語系設定
  configure // 設定檔
} from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules.js'

import App from './App.vue'
import router from './router'
import './bus'
import currencyFilter from './filters/currency.js'
import store from './store'

import Alert from '@/components/Alert.vue'
import Modal from '@/components/Modal.vue'
// import CancelModal from '@/components/front/CancelModal.vue'
// import RemoveBackModal from '@/components/back/RemoveBackModal.vue'
Vue.component('alert', Alert)
Vue.component('modal', Modal)

Vue.config.productionTip = false
Vue.use(VueAxios, axios) // 套件使用use

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
    valid: 'is-valid', // 針對bs4設定的className
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
