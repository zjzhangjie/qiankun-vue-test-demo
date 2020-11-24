/**
 *公共数据
 * Created by zhangJie on 2020/11/23
 */
import commonUi from '../common/components/';
import utils from '../common/utils';
import { initGlobalState } from 'qiankun';
import Vue from 'vue';
// 传入子应用的公共数据
const props = {
  data: {
    publicPath: 'qiankun',
    commonUi, // 公共组件
    utils, // 公共方法
  },
};
/**
 *state - Record<string, any> - 必选
 * 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。
 */
function initGlState() {
  const info = {
    userName: 'admin', // 初始化state
  };
  const actions = initGlobalState(info);
  // 设置新的值
  actions.setGlobalState(info);
  // 注册 观察者 函数 - 响应 globalState 变化，在 globalState 发生改变时触发该 观察者 函数。
  actions.onGlobalStateChange((newState, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    Vue.prototype.$userName = newState.userName;
    console.log('********全局数据改变*********');
    console.log(newState, prev);
  });
  // 将action对象绑到Vue原型上，为了项目中其他地方使用方便
  Vue.prototype.$actions = actions;
}


export default {
  props,
  initGlState,
};
