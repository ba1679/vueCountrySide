import Vue from 'vue';
import Vuex from 'vuex';
// vue-axios 套件
import axios from 'axios';
import VueAxios from 'vue-axios';
// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

// Alert套件
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// loading套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// AOS套件
import AOS from 'aos';
import 'aos/dist/aos.css';
// bootstrap 的js
import 'bootstrap'; // 官方文件說明寫這樣就可載入,https://getbootstrap.com/docs/4.5/getting-started/webpack/

// 表單驗證套件
import {
  ValidationObserver, // input驗證元件
  ValidationProvider, // 整體<form>驗證元件
  extend, // 擴充功能
  localize, // 語系設定
  configure, // 設定檔
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules.js';

// 自行撰寫的程式
import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency.js';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios); // 套件使用use
const options = {
  confirmButtonColor: '#0077b6',
};
Vue.use(VueSweetalert2, options);
Vue.use(VueAwesomeSwiper);
Vue.use(Vuex);
AOS.init();
Vue.component('Loading', Loading); // 將此套件作為元件使用
// 以下為啟用vee-validate套件相關方法
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]); // 將規則全部導出至擴充功能內
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
configure({
  classes: {
    valid: 'is-valid', // 針對bs4設定的className
    invalid: 'is-invalid',
  },
});

Vue.filter('currency', currencyFilter);

axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// 切換頁面時做驗證，避免用戶透過網址切換畫面
router.beforeEach((to, from, next) => {
  // 若要到達的頁面有meta.requiresAuth為true的話，進行驗證，沒有的話就直接放行
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`; // 檢查用戶使否持續登入的api
    // 在router函式內無法直接使用this.$http，要用axios取代
    axios.post(api).then((response) => {
      // 若登入成功就到達下個頁面，失敗則回到login頁面
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
