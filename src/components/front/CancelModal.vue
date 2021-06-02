<template>
    <div id="cancel-Modal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">注意!
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>確認要取消購買嗎?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetCancel">按錯了</button>
            <button type="button" class="btn btn-primary" @click="confirm">確認取消</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { mapActions } from 'vuex'
export default {
  name: 'CancelModal',
  methods: {
    openModal () {
      $('#cancel-Modal').modal('show')
    },
    confirm () {
      this.cleanCart()
      $('#cancel-Modal').modal('hide')
      this.$store.dispatch('openCancelModal', false)
      this.$router.push('/shopping')
    },
    resetCancel () {
      this.$store.dispatch('openCancelModal', false)
    },
    ...mapActions(['cleanCart'])
  },
  computed: {
    removeCancel: {
      get () {
        return this.$store.state.removeCancel
      },
      set (val) {
        return this.$store.dispatch('openCancelModal', val)
      }
    }
  },
  watch: {
    removeCancel () {
      if (this.$store.state.removeCancel) {
        this.openModal()
      }
    }
  }
}
</script>
