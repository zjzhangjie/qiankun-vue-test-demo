import { props } from '@/share/';

const apps = [
  {
    name: 'children-app-1', // 必选，微应用的名称，微应用之间必须确保唯一。
    entry: '//localhost:8092', // 必选，微应用的 entry 地址。
    container: '#content', // 子应用挂载的div
    activeRule: '/qiankun/children-app-1', // 微应用的激活规则。
    loader: (boolean) => { console.log(`loading状态${boolean}`); }, // 可选，loading 状态发生变化时会调用的方法。
  },
  {
    name: 'children-app-2',
    entry: '//localhost:8093',
    container: '#content', // 子应用挂载的div
    activeRule: '/children-app-2',
  },
];
export default apps;
