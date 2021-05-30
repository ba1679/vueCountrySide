import Vue from 'vue'
import Vuex from 'vuex'
import productModule from './products'
import cartModule from './cart'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    err: false
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    catchErr ({ commit }, status) {
      commit('ERR_SHOW', status)
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    ERR_SHOW (state, status) {
      state.err = status
    }
  },
  getters: {
    err: (state) => state.err
  },
  modules: {
    productModule,
    cartModule
  }
})
