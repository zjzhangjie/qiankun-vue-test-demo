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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/menu2.vue'),
  },
];
const basePath = '/qiankun/';
const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? `${basePath}children-app-2` : '/',
  mode: 'history',
  routes,
});

export default router;
