<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
// '~'代表node_modules路徑 最後的bootstrap.scss 附檔名可省略
// @import "~bootstrap/scss/bootstrap"; 也可另外獨立出來寫在assets/all.scss裡面
//這邊import的是bootstrap的樣式部分
@import './assets/all';
</style>
