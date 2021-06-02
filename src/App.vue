<template>
  <div id="app">
    <RemoveModal/>
    <RemoveBackModal/>
    <CancelModal/>
    <ErrAlert/>
    <loading :active.sync="isLoading" loader="dots"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import ErrAlert from '@/components/ErrAlert.vue'
import RemoveModal from '@/components/RemoveModal.vue'
import CancelModal from '@/components/front/CancelModal.vue'
import RemoveBackModal from '@/components/back/RemoveBackModal.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    ErrAlert,
    RemoveModal,
    CancelModal,
    RemoveBackModal
  },
  computed: {
    ...mapGetters(['isLoading', 'err', 'confirmCancel', 'productId'])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all';
</style>
