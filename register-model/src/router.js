import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/children-app-1*',
    name: 'children-app-1',
    component: Layout,
  },
  {
    path: '/children-app-2*',
    name: 'children-app-2',
    component: Layout,
  },
];

const router = new VueRouter({
  routes,
  base: 'qiankun',
  mode: 'history',
});
// 进入验证
router.beforeEach((to, from, next) => {
  console.log('**********路由变化***********', to.name);
  next();
});
export default router;
