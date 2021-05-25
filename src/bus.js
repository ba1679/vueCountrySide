// ? Event bus 講解 https://medium.com/itsems-frontend/vue-event-bus-15b76f27aeb9
// ? 父元件與子元件傳遞訊息時可用props、emit，而同層要傳遞的話，就可以使用event bus

import Vue from 'vue';

// 將bus變數掛載在vue的原型下(之後可在任何地方直接呼叫bus)，之後注入到main.js檔
Vue.prototype.$bus = new Vue();

// 將Event bus可使用的方法都寫在此檔案才不會忘記

// Alert Message
// this.$bus.$emit("messagePush", message, status);
// message(String): 訊息內容
// status(String): bs4樣式的className
