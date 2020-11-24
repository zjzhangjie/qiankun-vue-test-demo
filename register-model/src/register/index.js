/**
 *qiankun基础配置
 * Created by zhangJie on 2020/11/23.
 */
import { registerMicroApps, setDefaultMountApp, start, runAfterFirstMounted, addGlobalUncaughtErrorHandler, initGlobalState, MicroAppStateActions } from 'qiankun';
import loading from '../progress/index';
import common from '@/share/';
/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */
// 定义全局状态
common.initGlState();
const { props } = common;
function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}
/**
 * 注册子应用 registerMicroApps(apps,lifeCycles)
 *apps - Array<RegistrableApp> - 必选，微应用的一些注册信息
 * 注册微应用的基础配置信息。当浏览器 url 发生变化时，会自动检查每一个微应用注册的 activeRule 规则，符合规则的应用将会被自动激活。
 */
function register() {
  registerMicroApps(
    [
      {
        name: 'children-app-1', // 必选，微应用的名称，微应用之间必须确保唯一。
        entry: '//localhost:8092', // 必选，微应用的 entry 地址。
        container: '#content', // 子应用挂载的div
        activeRule: genActiveRule('/qiankun/children-app-1'), // 微应用的激活规则。
        // 支持直接配置字符串或字符串数组，如 activeRule: '/app1' 或 activeRule: ['/app1', '/app2']，当配置为字符串时会直接跟 url 中的路径部分做前缀匹配，匹配成功表明当前应用会被激活。
        // 支持配置一个 active function 函数或一组 active function。函数会传入当前 location 作为参数，函数返回 true 时表明当前微应用会被激活。如 location => location.pathname.startsWith('/app1')。
        props, // 可选，主应用需要传递给微应用的数据。
        loader: (boolean) => { console.log(`loading状态${boolean}`); }, // 可选，loading 状态发生变化时会调用的方法。
      },
      {
        name: 'children-app-2',
        entry: '//localhost:8093',
        container: '#content', // 子应用挂载的div
        props,
        activeRule: genActiveRule('/children-app-2'),
      },
    ],
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
  setDefaultMountApp('/qiankun/children-app-1');
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

export default register;
