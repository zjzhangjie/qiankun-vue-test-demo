import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);
const prefix = '';
// 判断是 qiankun 环境则增加路由前缀
if (window.__POWERED_BY_QIANKUN__) {
  // prefix = '/children-app-1';
}

const routes = [
  {
    path: `${prefix}/`,
    name: 'menu1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/menu1.vue'),
  },
  {
    path: `${prefix}/menu2`,
    name: 'menu2',
    component: () => import(/* webpackChunkName: "about" */ '@/views/menu2.vue'),
  },
];
const _this = Vue.prototype;
const basePath = '/qiankun/';
if (Vue.prototype.$publicPath) {
  console.log(Vue.prototype.$publicPath);
}
const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? `${basePath}children-app-1` : '/',
  mode: 'history',
  routes,
});

export default router;
