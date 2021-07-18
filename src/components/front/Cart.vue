<template>
  <div>
    <div class="dropdown">
      <a
        href="#"
        class="position-relative dropdown-btn"
        data-toggle="dropdown"
        @click.prevent="cartDetailOpen"
        ><i class="fas fa-shopping-cart fa-2x text-countryLight"></i
        ><span
          class="badge badge-pill badge-danger position-absolute badge-position"
          v-if="carts.length !== 0"
          >{{ carts.length }}</span
        ></a
      >
      <div class="dropdown-menu dropdown-menu-right">
        <div class="px-4 py-3">
          <h6 v-if="carts.length !== 0">已加入購物車商品</h6>
          <h6 v-else>購物車沒有東西喔</h6>
          <div class="table-responsive">
            <table class="table">
              <tr v-for="item in carts" :key="item.product_id">
                <td>
                  <a
                    href="#"
                    class="far fa-trash-alt text-danger"
                    @click.prevent="toRemoveCart(item)"
                  ></a>
                </td>
                <td class="title-width">{{ item.title }}</td>
                <td>
                  <img :src="item.imageUrl" alt="商品圖" class="cart-img" />
                </td>
                <td>{{ item.qty }}</td>
                <td>{{ item.unit }}</td>
                <td>NT${{ item.total }}</td>
              </tr>
            </table>

            <router-link
              :to="{ name: 'CheckOut' }"
              class="btn btn-primary btn-block"
              v-if="carts.length !== 0"
            >
              結帳去</router-link
            >
            <router-link
              :to="{ name: 'Shopping' }"
              class="btn btn-primary btn-block"
              v-else
              >趕緊購物去</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <modal
      :modalShow="modalShow"
      :text="forModalData.title"
      @ok="removeCart"
      @cancel="modalCancel"
    ></modal>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      modalShow: false,
      forModalData: {}
    }
  },
  computed: {
    ...mapGetters(['carts'])
  },
  methods: {
    cartDetailOpen () {
      if ($(window).outerWidth() > 768) {
        $('.dropdown-menu').dropdown()
      } else {
        $('#cartModal').modal('show')
      }
    },
    toRemoveCart (item) {
      this.modalShow = true
      this.forModalData = item
    },
    removeCart () {
      this.$store.dispatch('removeCart', { item: this.forModalData })
      this.modalShow = false
    },
    modalCancel () {
      this.modalShow = false
      this.forModalData = {}
    },
    mobileHandler () {
      if ($(window).outerWidth() < 768) {
        $('.dropdown-btn').removeAttr('data-toggle')
      }
    }
  },
  mounted () {
    this.mobileHandler()
  }
}
</script>

<style lang="scss">
.badge-position {
  top: -15px;
  right: -15px;
}
.cart-img {
  width: 50px;
  height: 50px;
}
.dropdown-menu {
  max-height: 300px;
  min-width: 250px;
  overflow-y: scroll;
}
.title-width {
  min-width: 160px;
}
@media (max-width: 768px) {
  .dropdown-menu.show {
    display: none;
  }
}
</style>
