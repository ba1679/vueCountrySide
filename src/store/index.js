import Vue from 'vue'
import Vuex from 'vuex'
import productModule from './products'
import cartModule from './cart'
import backModule from './back'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    err: false,
    confirmCancel: false,
    removeCancel: false
  },
  actions: {
    updateLoading ({ commit }, status) {
      commit('LOADING', status)
    },
    catchErr ({ commit }, status) {
      commit('ERR_SHOW', status)
    },
    openModal ({ commit }, status) {
      commit('REMOVE_MODAL_SHOW', status)
    },
    openCancelModal ({ commit }, status) {
      commit('CANCEL_MODAL_SHOW', status)
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    ERR_SHOW (state, status) {
      state.err = status
    },
    REMOVE_MODAL_SHOW (state, status) {
      state.confirmCancel = status
    },
    CANCEL_MODAL_SHOW (state, status) {
      state.removeCancel = status
    }
  },
  getters: {
    err: (state) => state.err,
    isLoading: (state) => state.isLoading,
    confirmCancel: (state) => state.confirmCancel,
    removeCancel: (state) => state.removeCancel
  },
  modules: {
    productModule,
    cartModule,
    backModule
  }
})
