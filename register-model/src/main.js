import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import register from './register/index';
import common from './share/index';
import './common/style/index.less';

Vue.config.productionTip = false;
Vue.use(ElementUI);

let app = null;
/**
 * 渲染函数
 * appContent 子应用html内容
 * loading 子应用加载效果，可选
 */
function render({ appContent, loading } = {}) {
  if (!app) {
    app = new Vue({
      el: '#container',
      router,
      data() {
        return {
          content: appContent,
          loading,
        };
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading,
          },
        });
      },
    });
  } else {
    app.content = appContent;
    app.loading = loading;
  }
}
function initApp() {
  render({ appContent: '', loading: true });// 必选，微应用的容器节点的选择器或者 Element 实例。如container: '#root' 或 container: document.querySelector('#root')。
}
initApp();
// 定义全局状态
common.initGlState();
// 注册子应用 registerMicroApps(apps,lifeCycles)
register(render, common.props);
