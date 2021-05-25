import Vue from 'vue';
import Vuex from 'vuex';
import productModule from './products';
import cartModule from './cart';
Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  modules: {
    productModule,
    cartModule,
  },
});
