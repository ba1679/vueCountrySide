<template>
  <div id="app">
    <ErrAlert/>
    <loading :active.sync="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import ErrAlert from '@/components/ErrAlert.vue'
export default {
  name: 'App',
  components: {
    ErrAlert
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all';
</style>
