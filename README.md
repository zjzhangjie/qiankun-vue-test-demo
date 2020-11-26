# qiankun-vue-test-demo
## 基于qiankun+vue微应用初实践
# 主应用
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
// 定义全局状态
initGlState();
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
          loading.start();
        },
      ],
      beforeMount: [
        mountApp => {
          console.log('before mount', mountApp);
          loading.done();
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
  setDefaultMountApp(baseurl + defaultActiveRule);
  // 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
  runAfterFirstMounted(() => console.log('开启监控'));
  // 添加全局的未捕获异常处理器。
  addGlobalUncaughtErrorHandler(event => console.log(event));
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
抽离app.js 方便配置
import { props } from '@/share/';

export const apps = [
  {
    name: 'children-app-1', // 必选，微应用的名称，微应用之间必须确保唯一。
    entry: '//localhost:8092', // 必选，微应用的 entry 地址。
    container: '#content', // 子应用挂载的div
    activeRule: 'children-app-1', // 微应用的激活规则。
    loader: (boolean) => { console.log(`loading状态${boolean}`); }, // 可选，loading 状态发生变化时会调用的方法。
  },
  {
    name: 'children-app-2',
    entry: '//localhost:8093',
    container: '#content', // 子应用挂载的div
    activeRule: 'children-app-2',
  },
];
export const defaultActiveRule = 'children-app-1';
export default {
  apps,
  defaultActiveRule,
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
"build:all": "yarn build:register && yarn build:app1 && yarn build:app2 && yarn copyDir",
"build:register": "vue-cli-service build",
"build:app1": "cd ../children-app-1 && yarn build",
"build:app2": "cd ../children-app-2 && yarn build",
"copyDir": "node ./script/build.js",
```
