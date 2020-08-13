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

export default routes;
