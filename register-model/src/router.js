import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: 'about',
    component: () => import('@/views/404.vue'),
  },
];

const router = new VueRouter({
  routes,
  base: 'qiankun',
  mode: 'history',
});
export default router;
