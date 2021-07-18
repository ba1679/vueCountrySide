<template>
  <div id="app">
    <loading :active.sync="isLoading" loader="dots"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading', 'err', 'confirmCancel', 'productId'])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all';
</style>
