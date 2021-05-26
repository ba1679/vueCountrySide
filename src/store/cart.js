import Vue from 'vue';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
const options = {
  confirmButtonColor: '#0077b6',
};
Vue.use(VueSweetalert2, options);
export default {
  state: {
    cartData: JSON.parse(localStorage.getItem('cart')) || [],
  },
  actions: {
    addToCart({ commit, state }, { item, num }) {
      const cacheCartID = [];
      state.cartData.forEach((cartItem) => {
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
        commit('CART_PUSH', cartContent);
        localStorage.setItem('cart', JSON.stringify(state.cartData));
      } else {
        let cache = {};
        state.cartData.forEach((cartItem, keys) => {
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
            commit('SPLICE_CART', keys);
          }
        });
        // 將數量已經增加的資料推回陣列中
        commit('CART_PUSH', cache);
        // 重新寫入 localStorage
        localStorage.setItem('cart', JSON.stringify(state.cartData));
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
          context.state.cartData.forEach((cartItem, index) => {
            if (item.product_id === cartItem.product_id) {
              context.commit('SPLICE_CART', index);
            }
          });
          localStorage.setItem('cart', JSON.stringify(context.state.cartData));
        }
      });
    },
    plusItem(context, item) {
      context.state.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          context.commit('PLUS_ITEM', cartItem);
        }
      });
      localStorage.setItem('cart', JSON.stringify(context.state.cartData));
    },
    minusItem(context, item) {
      context.state.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          if (cartItem.qty > 1) {
            context.commit('MINUS_ITEM', cartItem);
          }
        }
      });
      localStorage.setItem('cart', JSON.stringify(context.state.cartData));
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
    CART_PUSH(state, payload) {
      state.cartData.push(payload);
    },
    SPLICE_CART(state, payload) {
      state.cartData.splice(payload, 1);
    },
    PLUS_ITEM(state, payload) {
      payload.qty += 1;
      payload.total = payload.price * payload.qty;
    },
    MINUS_ITEM(state, payload) {
      payload.qty -= 1;
      payload.total = payload.price * payload.qty;
    },
  },
  getters: {
    carts: (state) => state.cartData,
  },
};
