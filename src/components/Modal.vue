<template>
  <div
    id="remove-Modal"
    class="modal fade"
    role="dialog"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-warning">
          <h5 class="modal-title">注意!</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="modalCancel"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>確認要刪除 {{ text }} 嗎?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="modalCancel"
          >
            按錯了
          </button>
          <button type="button" class="btn btn-warning" @click="modalOk">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Modal',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    }
  },
  methods: {
    openModal () {
      $('#remove-Modal').appendTo('body').modal('show')
    },
    // confirmRemove () {
    //   this.$store.dispatch('removeItemApi')
    //   $('#remove-Modal').modal('hide')
    //   this.$store.dispatch('openModal', false)
    // },
    modalOk () {
      this.$emit('ok')
      $('#remove-Modal').appendTo('body').modal('hide')
    },
    modalCancel () {
      // this.$store.dispatch('openModal', false)
      this.$emit('cancel')
      $('#remove-Modal').appendTo('body').modal('hide')
    }
  },
  // computed: {
  //   confirmCancel: {
  //     get () {
  //       return this.$store.state.confirmCancel
  //     },
  //     set (val) {
  //       return this.$store.dispatch('openModal', val)
  //     }
  //   }
  // },
  watch: {
    // confirmCancel () {
    //   if (this.$store.state.confirmCancel) {
    //     this.openModal()
    //   }
    // },
    modalShow: {
      immediate: true,
      handler (val) {
        if (val) {
          this.openModal()
        } else {
          $('#remove-Modal').appendTo('body').modal('hide')
        }
      }
    }
  }
}
</script>
