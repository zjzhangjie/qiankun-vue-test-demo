import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/home.vue';
import loading from '@/progress/index';
import { addAppsRouter } from '@/register/apps';

Vue.use(VueRouter);

let routes = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/children-app-1', // 默认加载的路由
    children: [
      {
        path: 'example',
        name: 'example',
        meta: { title: '实例' },
        component: resolve => require(['@/views/example/index.vue'], resolve),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
];
// 添加子应用的路由
routes = [...routes, ...addAppsRouter(Layout)];
const router = new VueRouter({
  routes,
  base: 'qiankun',
  mode: 'history',
});
// 进入验证
router.beforeEach((to, from, next) => {
  console.log('**********路由变化***********', to.name);
  loading.start();
  next();
});
router.afterEach((to, from) => {
  loading.done();
});
export default router;
