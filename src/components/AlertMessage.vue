<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" :class="'alert-' + item.status" v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMsg',
  data() {
    return {
      messages: [
        // {
        //   message: "訊息內容",
        //   status: "danger",
        //   timestamp: 12313
        // }
      ] //之後會傳入物件
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message, //錯誤訊息內容
        status, //綁定bs4 的class用
        timestamp
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 5秒後移除訊息
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    }
  },
  created() {
    const vm = this;
    // 自定義名稱 'messagePush'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // ? 外層$on註冊message:push方法
    vm.$bus.$on('messagePush', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
  // 在組件銷毀前取消監聽，才不會導致一些錯誤
  beforeDestroy() {
    this.$bus.$off('messagePush');
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
