
// 状态管理数据:this.$store.state获取，mapState辅助函数
const states = {
  userInfo: {
    userName: 'admin',
  },
};
// 用来处理数据函数,其接收唯一参数值state，必须为同步函数，以免数据混乱 this.$store.commit(mutationName)，mapMutations辅助函数
const mutations = {
  // 更新语言环境信息
  UPDATEUSERINFO(state, data) {
    state.userInfo = data;
  },
};
// 通过触发mutation实现的数据变化，可以异步操作，this.$store.dispatch(actionName)，mapActions辅助函数
const actions = {
  setUserInfo(context, userInfo) {
    context.commit('UPDATEUSERINFO', userInfo);
  },
};
// 有些状态需要做二次处理,this.$store.getters.valueName,mapGetters辅助函数
const getters = {

};
const user = {
  state: states,
  mutations,
  actions,
  getters,
};
export default user;
