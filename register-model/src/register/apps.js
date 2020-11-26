import { props } from '@/share/';

export const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口.必选 - 通过该地址加载微应用，
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  {
    name: 'children-app-1',
    entry: '//localhost:8092',
    container: '#content',
    activeRule: 'children-app-1',
    loader: (boolean) => { console.log(`loading状态${boolean}`); }, // 可选，loading 状态发生变化时会调用的方法。
  },
  {
    name: 'children-app-2',
    entry: '//localhost:8093',
    container: '#content',
    activeRule: 'children-app-2',
  },
];
export const defaultActiveRule = 'children-app-1';
export default {
  apps,
  defaultActiveRule,
};
