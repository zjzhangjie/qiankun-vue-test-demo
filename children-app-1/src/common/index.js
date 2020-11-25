import Vue from 'vue';
import commonUi from '../../../register-model/src/share';
import utils from '../../../register-model/src/common/utils';
// 接受主应用传的值
function setCommonData(props) {
  const { data } = props;
  Vue.use(data.commonUi);
}
function initGlState(props) {
  console.log('父应用传的值', props);
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange;
  Vue.prototype.$setGlobalState = props.setGlobalState;
  // 设置通讯
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    alert('子应用监听到主应用改变啦');
    console.log(state, prev);
  });
}
export default {
  setCommonData,
  initGlState,
};
