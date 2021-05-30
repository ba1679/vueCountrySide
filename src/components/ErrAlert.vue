<template>
  <div class="err-message">
    <div class="alert alert-danger alert-dismissible fade" role="alert">
      <strong>錯誤!</strong> 發生不明錯誤，請稍後再試!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  name: 'ErrAlert',
  computed: {
    ...mapGetters(['err'])
  },
  methods: {
    showAlert () {
      if (this.err) {
        $('.alert-danger').addClass('show')
      }
    }
  },
  mounted () {
    this.showAlert()
  }
}
</script>
<style scoped>
.err-message{
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
