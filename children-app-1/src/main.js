import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './public-path';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import common from './common/index';

Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable */
let instance = null;
function render() {
  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
}
if (!window.__POWERED_BY_QIANKUN__) {render();}

export async function bootstrap(props) {
  common.setCommonData(props)
  console.log('vue app bootstraped');
}

export async function mount(props) {
  common.initGlState(props)
  render();
}
export async function unmount() {
  instance.$destroy();
}
