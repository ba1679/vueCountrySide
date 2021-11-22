import Vue from 'vue'
Vue.prototype.$bus = new Vue()

// Alert Message
// this.$bus.$emit("messagePush", message, status);
// message(String): 訊息內容
// status(String): bs4樣式的className
