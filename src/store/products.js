import axios from 'axios'
export default {
  state: {
    products: []
  },
  actions: {
    getAllProduct (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(api).then((res) => {
        context.commit('SET_ALL_PRODUCT', res.data.products)
        context.commit('LOADING', false)
      }).catch(() => {
        context.commit('ERR_SHOW', true)
      })
    }
  },
  mutations: {
    SET_ALL_PRODUCT (state, payload) {
      state.products = payload
    }
  },
  getters: {
    products: (state) => state.products
  }
}
