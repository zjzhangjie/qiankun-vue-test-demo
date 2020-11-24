import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  // 模块化
  modules: {
    user,
  },
});
