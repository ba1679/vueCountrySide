/** @format */

import axios from 'axios'
export default {
  state: {
    cartData: JSON.parse(localStorage.getItem('cart')) || [],
    cartApiList: [],
    cacheId: ''
  },
  actions: {
    getCartList (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then((res) => {
        context.commit('GET_CART', res.data.data)
      }).catch(() => {
        context.dispatch('catchErr', true)
      })
    },
    addToCart ({ commit, state }, { item, num = 1 }) {
      const cacheCartID = []
      state.cartData.forEach((cartItem) => {
        cacheCartID.push(cartItem.product_id)
      })
      if (cacheCartID.indexOf(item.id) === -1) {
        const cartContent = {
          product_id: item.id,
          qty: num,
          title: item.title,
          origin_price: item.origin_price,
          price: item.price,
          unit: item.unit,
          imageUrl: item.imageUrl
        }
        cartContent.total = item.price * cartContent.qty
        commit('CART_PUSH', cartContent)
        localStorage.setItem('cart', JSON.stringify(state.cartData))
      } else {
        let cache = {}
        state.cartData.forEach((cartItem, keys) => {
          if (cartItem.product_id === item.id) {
            let { qty } = cartItem
            cache = {
              product_id: item.id,
              qty: (qty += num),
              title: item.title,
              origin_price: item.origin_price,
              price: item.price,
              unit: item.unit,
              imageUrl: item.imageUrl
            }
            cache.total = item.price * cache.qty
            // 移除現有 localStorage 購物車的資料，否則 localStorage 會重複加入
            commit('SPLICE_CART', keys)
          }
        })
        // 將數量已經增加的資料推回陣列中
        commit('CART_PUSH', cache)
        // 重新寫入 localStorage
        localStorage.setItem('cart', JSON.stringify(state.cartData))
      }
    },
    removeCart (context, item) {
      context.state.cartData.forEach((cartItem, index) => {
        if (item.product_id === cartItem.product_id) {
          context.commit('SPLICE_CART', index)
        }
      })
      localStorage.setItem('cart', JSON.stringify(context.state.cartData))
    },
    removeItemApi (context) {
      context.commit('LOADING', true)
      const id = context.state.cacheId
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      axios
        .delete(api).then(() => {
          context.dispatch('getCartList')
          context.commit('LOADING', false)
        })
        .catch(() => {
          context.dispatch('catchErr', true)
        })
    },
    plusItem (context, item) {
      context.state.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          context.commit('PLUS_ITEM', cartItem)
        }
      })
      localStorage.setItem('cart', JSON.stringify(context.state.cartData))
    },
    minusItem (context, item) {
      context.state.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          if (cartItem.qty > 1) {
            context.commit('MINUS_ITEM', cartItem)
          }
        }
      })
      localStorage.setItem('cart', JSON.stringify(context.state.cartData))
    },
    cleanCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cacheID = []
      axios
        .get(api)
        .then((res) => {
          const cacheData = res.data.data.carts
          cacheData.forEach((item) => {
            cacheID.push(item.id)
          })
        })
        .then(() => {
          cacheID.forEach((item) => {
            axios.delete(
              `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`
            )
          })
        })
    },
    cleanAllCart ({ commit, state }) {
      commit('SPLICE_ALL_CART')
      localStorage.setItem('cart', JSON.stringify(state.cartData))
    },
    saveCacheId ({ commit }, id) {
      commit('CACHE_ID', id)
    }
  },
  mutations: {
    GET_CART (state, payload) {
      state.cartApiList = payload
    },
    CART_PUSH (state, payload) {
      state.cartData.push(payload)
    },
    SPLICE_CART (state, payload) {
      state.cartData.splice(payload, 1)
    },
    SPLICE_ALL_CART (state) {
      state.cartData.splice(0, state.cartData.length)
    },
    PLUS_ITEM (state, payload) {
      payload.qty += 1
      payload.total = payload.price * payload.qty
    },
    MINUS_ITEM (state, payload) {
      payload.qty -= 1
      payload.total = payload.price * payload.qty
    },
    CACHE_ID (state, payload) {
      state.cacheId = payload
    }
  },
  getters: {
    carts: (state) => state.cartData,
    cartApi: (state) => state.cartApiList
  }
}
