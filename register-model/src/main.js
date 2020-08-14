import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps, setDefaultMountApp, start, runAfterFirstMounted, addGlobalUncaughtErrorHandler, initGlobalState, MicroAppStateActions } from 'qiankun';

Vue.config.productionTip = false;
Vue.use(ElementUI);

let app = null;
/**
 * 渲染函数
 * appContent 子应用html内容
 * loading 子应用加载效果，可选
 */
/* eslint-disable */
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

/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

function initApp() {
  render({ appContent: '', loading: true });// 必选，微应用的容器节点的选择器或者 Element 实例。如container: '#root' 或 container: document.querySelector('#root')。
}

initApp();

// 传入子应用的数据
const msg = {
  data: {
    auth: false,
  },
  fns: [
    {
      name: '_LOGIN',
      _LOGIN(data) {
        console.log(`父应用返回信息${data}`);
      },
    },
  ],
};
// 注册子应用 registerMicroApps(apps,lifeCycles)
// apps - Array<RegistrableApp> - 必选，微应用的一些注册信息
// lifeCycles - LifeCycles - 可选，全局的微应用生命周期钩子
// 注册微应用的基础配置信息。当浏览器 url 发生变化时，会自动检查每一个微应用注册的 activeRule 规则，符合规则的应用将会被自动激活。
registerMicroApps(
  [
    {
      name: 'children-app-1', // 必选，微应用的名称，微应用之间必须确保唯一。
      entry: '//localhost:8092', // 必选，微应用的 entry 地址。
      render,
      activeRule: genActiveRule('/app1'), // 微应用的激活规则。
      // 支持直接配置字符串或字符串数组，如 activeRule: '/app1' 或 activeRule: ['/app1', '/app2']，当配置为字符串时会直接跟 url 中的路径部分做前缀匹配，匹配成功表明当前应用会被激活。
      // 支持配置一个 active function 函数或一组 active function。函数会传入当前 location 作为参数，函数返回 true 时表明当前微应用会被激活。如 location => location.pathname.startsWith('/app1')。
      props: msg, // 可选，主应用需要传递给微应用的数据。
      loader: (boolean) => { console.log(`loading状态${boolean}`); }, // 可选，loading 状态发生变化时会调用的方法。
    },
    {
      name: 'children-app-2',
      entry: '//localhost:8093',
      render,
      activeRule: genActiveRule('/app2'),
    },
  ],
  {
    beforeLoad: [
      loadApp => {
        console.log('before load', loadApp);
      },
    ], // 挂载前回调
    beforeMount: [
      mountApp => {
        console.log('before mount', mountApp);
      },
    ],
    afterMount: [
      mountApp => {
        console.log('before mount', mountApp);
      },
    ],
    // 挂载后回调
    afterUnmount: [
      unloadApp => {
        console.log('after unload', unloadApp);
      },
    ], // 卸载后回调
  },
);

// 设置默认子应用,与 genActiveRule中的参数保持一致
setDefaultMountApp('/app1');
// 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
runAfterFirstMounted(() => console.log('开启监控'));
// 添加全局的未捕获异常处理器。
addGlobalUncaughtErrorHandler(event => console.log(event));

// 初始化 state
const info = {
    userName:'admin'//初始化state
};
const actions = initGlobalState(info);
// 设置新的值
actions.setGlobalState(info);
//注册 观察者 函数 - 响应 globalState 变化，在 globalState 发生改变时触发该 观察者 函数。
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    Vue.prototype.$userName = state.userName;
    console.log(state, prev);
});

//取消 观察者 函数 - 该实例不再响应 globalState 变化。
//actions.offGlobalStateChange();
// 将action对象绑到Vue原型上，为了项目中其他地方使用方便
Vue.prototype.$actions = actions;
// 启动
start({
  // prefetch: true, // 可选，是否开启预加载，默认为 true。
  // sandbox: true, // 可选，是否开启沙箱，默认为 true。//从而确保微应用的样式不会对全局造成影响。
  // singular: true, // 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
  // fetch: () => {}, // 可选，自定义的 fetch 方法。
  // getPublicPath: (url) => { console.log(url); },
  // getTemplate: (tpl) => { console.log(tpl); },
  // excludeAssetFilter: (assetUrl) => { console.log(assetUrl); }, // 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被qiankun 劫持处理
});

