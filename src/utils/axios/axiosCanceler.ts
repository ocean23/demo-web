/* eslint-disable no-param-reassign */
import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';

// 声明一个Map用于存储每个请求的标识和取消函数
const pendingAjaxMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  /**
   * 添加请求
   * @param config
   */
  static addPendingAjax(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingAjaxMap.has(url)) {
          pendingAjaxMap.set(url, cancel);
        }
      });
  }

  /**
   * 移除所有请求
   */
  static removeAllPendingAjax() {
    pendingAjaxMap.forEach((cancel) => {
      if (cancel && typeof cancel === 'function') {
        cancel();
      }
    });
    pendingAjaxMap.clear();
  }

  /**
   * 移除请求
   * @param config
   */
  static removePendingAjax(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    // 如果请求中存在当前请求，取消当前请求并将其删除
    if (pendingAjaxMap.has(url)) {
      const cancel = pendingAjaxMap.get(url);
      if (cancel) {
        cancel(url);
      }
      pendingAjaxMap.delete(url);
    }
  }
}
