# qiankun-vue-test-demo
## 基于qiankun+vue微应用初实践
# 主应用
## 首先在环境配置文件中配置子应用的信息
```
ENV = 'development'

BASE_URL="/qiankun/"
# 项目title
VUE_APP_TITLE="qiankun+vue基础模板"
# 接口地址
VUE_APP_BASE_API = 'http://113.207.43.93:29999/'
# VUE_APP_XXX xxx请与微应用名保持一致，微应用入口，用于本地构建测试
VUE_APP_CHILD_children-app-1 = '//localhost:8092'
VUE_APP_CHILD_children-app-2 = '//localhost:8093'
```
## main.js
将注册qiankun的方法封装到register文件
```
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import registerApps from './register/index';
import './common/style/index.less';

Vue.config.productionTip = false;
Vue.use(ElementUI);

let app = null;
app = new Vue({
  el: '#container',
  router,
  store,
  render: h => h(App),
});
// 注册子应用 registerMicroApps(apps,lifeCycles)
registerApps();
```
## register.js
```
/**
 *qiankun基础配置
 * Created by zhangJie on 2020/11/23.
 */
import { registerMicroApps, setDefaultMountApp, start, runAfterFirstMounted, addGlobalUncaughtErrorHandler } from 'qiankun';
import loading from '../progress/index';

import { props, initGlState } from '@/share/';
import { apps, defaultActiveRule } from './apps';
import Vue from 'vue';

const baseurl = `${process.env.BASE_URL}`;
/**
 * 重构apps
 */
function filterApps() {
  apps.forEach((item) => {
    item.props = props; // 可选，主应用需要传递给微应用的数据。
    item.activeRule = genActiveRule(baseurl + item.activeRule);
  });
  return apps;
}
/**
 * 注册子应用 registerMicroApps(apps,lifeCycles)
 *apps - Array<RegistrableApp> - 必选，微应用的一些注册信息
 * 注册微应用的基础配置信息。当浏览器 url 发生变化时，会自动检查每一个微应用注册的 activeRule 规则，符合规则的应用将会被自动激活。
 */
function registerApps() {
  const _apps = filterApps();
  registerMicroApps(
    _apps,
    {
      beforeLoad: [
        loadApp => {
          console.log('before load', loadApp);
          //  loading.start();
        },
      ],
      beforeMount: [
        mountApp => {
          loading.done();
          console.log('before mount', mountApp);
        },
      ],
      afterMount: [
        mountApp => {
          console.log('before mount', mountApp);
        },
      ],
      afterUnmount: [
        unloadApp => {
          console.log('after unload', unloadApp);
        },
      ],
    },
  );
  // 设置默认子应用,与 genActiveRule中的参数保持一致
  // setDefaultMountApp();
  // 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
  runAfterFirstMounted(() => console.log('开启监控'));
  // 添加全局的未捕获异常处理器。
  addGlobalUncaughtErrorHandler(event => console.log(event));
  // 定义全局状态
  initGlState();
  // 启动
  // const isExist = document.getElementById('content');
  // if (!isExist) {
  //   const content = document.createElement('container');
  //   content.id = 'content';
  //   document.body.appendChild(content);
  // }
  start({
    // prefetch: true, // 可选，是否开启预加载，默认为 true。
    // sandbox: true, // 可选，是否开启沙箱，默认为 true。//从而确保微应用的样式不会对全局造成影响。
    // singular: true, // 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
    // fetch: () => {}, // 可选，自定义的 fetch 方法。
    // getPublicPath: (url) => { console.log(url); },
    // getTemplate: (tpl) => { console.log(tpl); },
    // excludeAssetFilter: (assetUrl) => { console.log(assetUrl); }, // 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被qiankun 劫持处理
  });
}

/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */
function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}
export default registerApps;

```
## app.js
```
/**
   *微应用apps
   * @name: 微应用名称 - 具有唯一性
   * @entry: 微应用入口.必选 - 通过该地址加载微应用，
   * @container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * @activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
const _apps = [];
for (const key in process.env) {
  if (key.includes('VUE_APP_CHILD_')) {
    const name = key.split('VUE_APP_CHILD_')[1];
    const obj = {
      name,
      entry: process.env[key],
      container: '#content',
      activeRule: name,
    };
    _apps.push(obj);
  }
}
/**
 * 添加微应用路由
 * @param Layout: 基础框架
 */
export function addAppsRouter(Layout) {
  const appsRouter = [];
  _apps.forEach((item) => {
    const obj = {
      path: `/${item.name}*`,
      name: item.name,
      component: Layout,
    };
    appsRouter.push(obj);
  });
  return appsRouter;
}
export const apps = _apps;
export const defaultActiveRule = _apps[0].activeRule;
```
## 添加子应用的路由
```
import { addAppsRouter } from '@/register/apps';
// 添加子应用的路由
routes = [...routes, ...addAppsRouter(Layout)];
```
# 微应用
## main.js
```
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
}
export async function mount(props) {
  common.initGlState(props)
  render();
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
// 增加 update 钩子以便主应用手动更新微应用
export async function update(props) {
  common.setCommonData(props)
  common.initGlState(props)
}
```
## common.js
```
import Vue from 'vue';
/**
 * 接受主应用的传参
 * @param props 主应用穿的公共数据
 */
function setCommonData(props) {
  const { data } = props;
  const { publicPath, commonUi, utils, http } = data;
  Vue.prototype.$utils = utils;
  Vue.prototype.$publicPath = publicPath;
  Vue.prototype.$http = http;
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

```
# 打包
## 将所有的应用打包到一个文件夹里
```
const fs = require('fs-extra');
const path = require('path');
const outputDir = 'qiankun';
// 拷贝文件
fs.copySync(path.join(process.cwd(), '../children-app-1/children-app-1'), path.join(process.cwd(), outputDir, 'children-app-1'));
fs.copySync(path.join(process.cwd(), '../children-app-2/children-app-2'), path.join(process.cwd(), outputDir, 'children-app-2'));
```
## 在package.json的scripts中配置
```
  "scripts": {
    "serve:register": "vue-cli-service serve",
    "serve:app1": "cd ../children-app-1 && yarn serve",
    "serve:app2": "cd ../children-app-2 && yarn serve",
    "serve:all": "yarn serve:register && yarn serve:app1 && yarn serve:app2",
    "build:all": "yarn build:register && yarn build:app1 && yarn build:app2 && yarn copyDir",
    "build:register": "vue-cli-service build",
    "build:app1": "cd ../children-app-1 && yarn build",
    "build:app2": "cd ../children-app-2 && yarn build",
    "copyDir": "node ./script/build.js",
    "lint": "vue-cli-service lint"
  },
```
