import axios from 'axios'
export default {
  state: {
    backProducts: [],
    pagination: {},
    productItem: '',
    remove: false
  },
  actions: {
    getProductList ({ commit, dispatch }, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${payload}`
      dispatch('updateLoading', true)
      axios.get(api).then((response) => {
        dispatch('updateLoading', false)
        commit('SET_PRODUCTS', response.data.products)
        commit('SET_PAGE', response.data.pagination)
      }).catch(() => {
        dispatch('catchErr', true)
      })
    },
    getItem ({ commit }, payload) {
      commit('SET_ITEM', payload)
    },
    backRemoveModal ({ commit }, payload) {
      commit('BACK_MODAL', payload)
    }
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.backProducts = payload
    },
    SET_PAGE (state, payload) {
      state.pagination = payload
    },
    SET_ITEM (state, payload) {
      state.productItem = payload
    },
    BACK_MODAL (state, payload) {
      state.remove = payload
    }
  },
  getters: {
    productItem: (state) => state.productItem,
    remove: (state) => state.remove,
    backProducts: (state) => state.backProducts,
    pagination: (state) => state.pagination
  }
}
