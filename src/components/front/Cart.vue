<template>
  <div>
    <div class="dropdown">
      <a href="#" class="position-relative" data-toggle="dropdown"
        ><i class="fas fa-shopping-cart fa-2x text-countryLight"></i
        ><span class="badge badge-pill badge-danger position-absolute badge-position" v-if="cartLength !== 0">{{
          cartLength
        }}</span></a
      >
      <div class="dropdown-menu dropdown-menu-right">
        <div class="px-4 py-3">
          <h6 v-if="cartLength !== 0">已加入購物車商品</h6>
          <h6 v-else>購物車沒有東西喔</h6>
          <div class="table-responsive">
            <table class="table">
              <tr v-for="item in cartList" :key="item.id">
                <td>
                  <a
                    href="#"
                    class="far fa-trash-alt text-danger"
                    data-title="100%台灣好米"
                    @click.prevent="showAlert(item.id)"
                  ></a>
                </td>
                <td class="title-width">{{ item.product.title }}</td>
                <td>
                  <img :src="item.product.imageUrl" alt="商品圖" class="cart-img" />
                </td>
                <td>{{ item.qty }}</td>
                <td>{{ item.product.unit }}</td>
                <td>NT${{ item.total }}</td>
              </tr>
            </table>

            <router-link :to="{ name: 'CheckOut' }" class="btn btn-primary btn-block" v-if="cartLength !== 0">
              結帳去</router-link
            >
            <router-link :to="{ name: 'Shopping' }" class="btn btn-primary btn-block" v-else>趕緊購物去</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartHandler from '../../mixins/getCart.js';
export default {
  name: 'CartInfo',
  data() {
    return {
      cartList: [], //之後會傳入物件
      cartLength: 0
    };
  },
  mixins: [cartHandler],
  methods: {
    updateCart(carts) {
      this.cartList = carts;
      this.cartLength = this.cartList.length;
    },
    busEvent() {
      const vm = this;
      // 自定義名稱 'cartPush'
      // ? 外層$on註冊cartPush方法
      vm.$bus.$on('cartPush', (carts) => {
        vm.updateCart(carts);
      });
    }
  },
  mounted() {
    this.busEvent();
  }
};
</script>

<style lang="scss" scope>
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
  .title-width {
    min-width: 160px;
  }
}
</style>
