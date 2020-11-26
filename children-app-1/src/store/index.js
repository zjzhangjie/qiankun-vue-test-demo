import Vue from 'vue';
import Vuex from 'vuex';
import eg from './eg';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  // 模块化
  modules: {
    eg,
  },
});
