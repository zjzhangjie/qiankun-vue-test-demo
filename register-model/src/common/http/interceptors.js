// 配置请求拦截器
import * as Code from './code';
// 请求拦截
export const requestInterceptor = (config) => {
  return config;
};
export const requestErrorInterceptor = (error) => {
  throw error;
};
// 响应拦截
export const responseInterceptor = (response) => {
  if (response.data.code === Code.TOKEN_EXPIRED) { // token过期
  }
  return response;
};

export const responseErrorInterceptor = (error) => {
  throw error;
};
