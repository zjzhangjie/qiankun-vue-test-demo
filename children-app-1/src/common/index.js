import Vue from 'vue';
/**
 * 接受主应用的传参
 * @param props 主应用穿的公共数据
 */
function setCommonData(props) {
  const { data } = props;
  const { publicPath, commonUi, utils, http, router } = data;
  Vue.prototype.$utils = utils;// 公共方法
  Vue.prototype.$publicPath = publicPath;// 公共路径
  Vue.prototype.$http = http;// 公共请求
  Vue.prototype.$parentRouter = router;// 主应用实例
  Vue.use(commonUi);// 注册公共组件
  return {
    publicPath,
    commonUi,
    utils,
  };
}

/**
 * 设置微应用全局状态
 * @param props 主应用穿的公共数据
 */
function initGlState(props) {
  console.log('父应用传的值', props);
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange;
  Vue.prototype.$setGlobalState = props.setGlobalState;
  // 设置通讯
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    alert('子应用监听到主应用改变啦');
  });
}
export default {
  setCommonData,
  initGlState,
};

