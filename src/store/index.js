import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
const options = {
  confirmButtonColor: '#0077b6',
};
Vue.use(VueSweetalert2, options);
Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    cartData: JSON.parse(localStorage.getItem('cart')) || [],
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getAllProduct(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(api).then((res) => {
        context.commit('SETALLPRODUCT', res.data.products);
        context.commit('LOADING', false);
      });
    },
    addToCart(context, { item, num }) {
      const cacheCartID = [];
      this.state.cartData.forEach((cartItem) => {
        cacheCartID.push(cartItem.product_id);
      });
      if (cacheCartID.indexOf(item.id) === -1) {
        const cartContent = {
          product_id: item.id,
          qty: 1,
          title: item.title,
          origin_price: item.origin_price,
          price: item.price,
          unit: item.unit,
          imageUrl: item.imageUrl,
        };
        cartContent.total = item.price * cartContent.qty;
        context.commit('CARTPUSH', cartContent);
        localStorage.setItem('cart', JSON.stringify(this.state.cartData));
      } else {
        let cache = {};
        this.state.cartData.forEach((cartItem, keys) => {
          if (cartItem.product_id === item.id) {
            let { qty } = cartItem;
            cache = {
              product_id: item.id,
              qty: (qty += num),
              title: item.title,
              origin_price: item.origin_price,
              price: item.price,
              unit: item.unit,
              imageUrl: item.imageUrl,
            };
            cache.total = item.price * cache.qty;
            // 移除現有 localStorage 購物車的資料，否則 localStorage 會重複加入
            context.commit('SPLICECART', keys);
          }
        });
        // 將數量已經增加的資料推回陣列中
        context.commit('CARTPUSH', cache);
        // 重新寫入 localStorage
        localStorage.setItem('cart', JSON.stringify(this.state.cartData));
      }
    },
    removeCart(context, item) {
      Vue.swal({
        title: '確定要從購物車移除此商品?',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定',
      }).then((result) => {
        if (result.isConfirmed) {
          Vue.swal('刪除成功', '', 'success');
          this.state.cartData.forEach((cartItem, index) => {
            if (item.product_id === cartItem.product_id) {
              context.commit('SPLICECART', index);
            }
          });
          localStorage.setItem('cart', JSON.stringify(this.state.cartData));
        }
      });
    },
    plusItem(context, item) {
      this.state.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          context.commit('PLUSITEM', cartItem);
        }
      });
      localStorage.setItem('cart', JSON.stringify(this.state.cartData));
    },
    minusItem(context, item) {
      this.state.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          if (cartItem.qty > 1) {
            context.commit('MINUSITEM', cartItem);
          }
        }
      });
      localStorage.setItem('cart', JSON.stringify(this.state.cartData));
    },
    cleanCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cacheID = [];
      axios
        .get(api)
        .then((res) => {
          const cacheData = res.data.data.carts;
          cacheData.forEach((item) => {
            cacheID.push(item.id);
          });
        })
        .then(() => {
          cacheID.forEach((item) => {
            axios.delete(
              `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`
            );
          });
        });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    SETALLPRODUCT(state, payload) {
      state.products = payload;
    },
    CARTPUSH(state, payload) {
      state.cartData.push(payload);
    },
    SPLICECART(state, payload) {
      state.cartData.splice(payload, 1);
    },
    PLUSITEM(state, payload) {
      payload.qty += 1;
      payload.total = payload.price * payload.qty;
    },
    MINUSITEM(state, payload) {
      payload.qty -= 1;
      payload.total = payload.price * payload.qty;
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    carts(state) {
      return state.cartData;
    },
  },
});
