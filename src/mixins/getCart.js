export default {
  data() {
    return {
      carts: {},
      cartSelect: 1
    };
  },
  methods: {
    getCartList() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((res) => {
        vm.carts = res.data.data;
        localStorage.setItem('cartList', JSON.stringify(vm.carts.carts));
        vm.$bus.$emit('cartPush', vm.carts.carts);
      });
    },
    addToCart(id, num) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      // 處理購物車內重複商品問題
      let cartsAry = vm.carts.carts;
      let newQty = 1;
      cartsAry.forEach((item) => {
        // 若有重複的，則將數量重新定義為=>原有數量+欲加入數量
        if (id == item.product_id) {
          newQty = item.qty + num;
          let cartId = item.id;
          // 刪除重複的購物車商品
          const deletApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartId}`;
          vm.$http.delete(deletApi).then((res) => {
            // console.log('刪除重複購物車商品');
          });
        }
      });
      vm.isLoading = true;
      let cartData = { product_id: id, qty: newQty };
      this.$http.post(api, { data: cartData }).then(function(res) {
        vm.$swal('加入購物車成功!');
        vm.$bus.$emit('cartPush', vm.carts.carts);
        vm.getCartList();
        vm.isLoading = false;
      });
    },
    showAlert(id) {
      const vm = this;
      vm.$swal({
        title: '確定要從購物車移除此商品?',
        showCancelButton: true,
        cancelButtonText: `取消`,
        confirmButtonText: `確定`
      }).then((result) => {
        if (result.isConfirmed) {
          vm.$swal('刪除成功', '', 'success');
          vm.deleteCart(id);
        }
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.$http
        .delete(api)
        .then((res) => {
          console.log(res);
          this.getCartList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
