<template>
  <div>
    <div
        class="modal fade"
        id="delProductModal"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="resetCancel"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{productItem.title}}</strong>
              商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
                @click="resetCancel"
              >
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="deleteProduct">
                確認刪除
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'RemoveBackModal',
  methods: {
    openDelModal () {
      $('#delProductModal').modal('show')
    },
    resetCancel () {
      this.$store.dispatch('backRemoveModal', false)
    },
    deleteProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.productItem.id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateLoading', false)
          $('#delProductModal').modal('hide')
          vm.$store.dispatch('backRemoveModal', false)
        } else {
          vm.$store.dispatch('catchErr', true)
        }
        vm.getProductList(vm.pagination.current_page)
      })
    },
    ...mapActions(['getProductList'])
  },
  computed: {
    remove: {
      get () {
        return this.$store.state.backModule.remove
      },
      set (val) {
        return this.$store.dispatch('backRemoveModal', val)
      }
    },
    ...mapGetters(['productItem', 'pagination'])
  },
  watch: {
    remove () {
      if (this.$store.state.backModule.remove) {
        this.openDelModal()
      }
    }
  }
}
</script>
