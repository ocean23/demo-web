/* eslint-disable no-param-reassign */
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import configEnv from '../config';
import { AxiosCanceler } from './axiosCanceler';
import store from '@/store/index';

function getToken() {
  const token = store.getters['app/token'];
  console.log('token',token);
  return token;
}

export function redirectToPortal() {
  // TODO remove token
  ElMessage({
    message: '登录失效，请重新登录',
    duration: 3000,
    type: 'error',
    onClose: () => {
      window.location.href = configEnv.PORTAL_ADDRESS;
    },
  });
}

const instance: AxiosInstance = axios.create({
  baseURL: configEnv.BACKEND_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    if (getToken) {
      config.headers['X-User-Token'] = getToken();
    }
    AxiosCanceler.removePendingAjax(config);
    AxiosCanceler.addPendingAjax(config);
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(`${new Date()}`) / 1000,
        ...config.params,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    AxiosCanceler.removePendingAjax(response);
    const res = response.data;
    if (res.code !== 0) {
      ElMessage.error(res.msg || '出错了');
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  },
  (error) => {
    if (error.response.status === 401) {
      redirectToPortal();
    }
    // TODO
    return Promise.reject(error);
  }
);

export default instance;
