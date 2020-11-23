/**
 * 进度条配置
 * Created by zhangJie on 2020/11/23.
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
const loading = {
  start() {
    NProgress.start();
  },
  done() {
    NProgress.done();
  },
};
export default loading;
