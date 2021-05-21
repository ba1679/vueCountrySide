<template>
  <div>
    <div class="dropdown">
      <a href="#" class="position-relative" data-toggle="dropdown"
        ><i class="fas fa-shopping-cart fa-2x text-countryLight"></i
        ><span class="badge badge-pill badge-danger position-absolute badge-position" v-if="cartList.length !== 0">{{
          cartList.length
        }}</span></a
      >
      <div class="dropdown-menu dropdown-menu-right">
        <div class="px-4 py-3">
          <h6 v-if="cartList.length !== 0">已加入購物車商品</h6>
          <h6 v-else>購物車沒有東西喔</h6>
          <div class="table-responsive">
            <table class="table">
              <tr v-for="item in cartList" :key="item.id">
                <td>
                  <a
                    href="#"
                    class="far fa-trash-alt text-danger"
                    data-title="100%台灣好米"
                    @click.prevent="removeCart(item)"
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

            <router-link :to="{ name: 'CheckOut' }" class="btn btn-primary btn-block" v-if="cartList.length !== 0">
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
export default {
  name: 'CartInfo',
  data() {
    return {
      cartList: JSON.parse(localStorage.getItem('cart')) || []
    };
  },
  methods: {
    updateCart(carts) {
      this.cartList = carts;
    },
    removeCart(item) {
      this.$swal({
        title: '確定要從購物車移除此商品?',
        showCancelButton: true,
        cancelButtonText: `取消`,
        confirmButtonText: `確定`
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal('刪除成功', '', 'success');
          this.cartList.forEach((cartItem, index) => {
            if (item.product_id === cartItem.product_id) {
              this.cartList.splice(index, 1);
            }
          });
          localStorage.setItem('cart', JSON.stringify(this.cartList));
        }
      });
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
.mobile-cart {
  background-color: #e3f2fd;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  width: 100%;
  height: 100vh;
}
</style>
