import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import './public-path';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

let router = null;
let instance = null;
/* eslint-disable */
function render() {
  // 直接启动微应用从而更方便的开发调试，你可以使用window.__POWERED_BY_QIANKUN__来区分当前是否运行在 qiankun 的主应用的上下文中：
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/children-app-1' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props) {
  console.log(props)
    // 注册主应用下发的组件
  Vue.use(props.data.commonUi);
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('父应用传的值', props);
    // 设置通讯
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange;
  Vue.prototype.$setGlobalState = props.setGlobalState;
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
