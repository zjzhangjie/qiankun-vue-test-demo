import axios from 'axios';
import { httpConfig } from './config';
import { requestErrorInterceptor, requestInterceptor, responseErrorInterceptor, responseInterceptor } from './interceptors';

axios.defaults.baseURL = '';

export const http = axios.create(httpConfig);

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
