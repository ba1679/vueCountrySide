import Vue from 'vue'

// 將bus變數掛載在vue的原型下(之後可在任何地方直接呼叫bus)，之後注入到main.js檔
Vue.prototype.$bus = new Vue()

// 將Event bus可使用的方法都寫在此檔案才不會忘記

// Alert Message
// this.$bus.$emit("messagePush", message, status);
// message(String): 訊息內容
// status(String): bs4樣式的className
