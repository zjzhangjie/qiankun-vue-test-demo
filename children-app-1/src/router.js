import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'menu1',
    component: () => import(/* webpackChunkName: "about" */ '@/views/menu1.vue'),
  },
  {
    path: '/menu2',
    name: 'menu2',
    component: () => import(/* webpackChunkName: "about" */ '@/views/menu2.vue'),
  },
];
const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/children-app-1' : '/',
  mode: 'history',
  routes,
});

export default router;
