import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import registerQiankun from './register/index';
import './common/style/index.less';

Vue.config.productionTip = false;
Vue.use(ElementUI);

let app = null;
app = new Vue({
  el: '#container',
  router,
  render: h => h(App),
});
// 注册子应用 registerMicroApps(apps,lifeCycles)
registerQiankun();
