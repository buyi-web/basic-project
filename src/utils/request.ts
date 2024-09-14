import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as Message } from 'antd';
import storage from './storage';

interface Result<T = any> {
  code: number;
  data: T;
  message: string;
}

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (!res.data) throw new Error('请求出错，请稍候重试');
    const { code, data, message } = res.data;

    if (code === 200) {
      // 业务请求成功
      return data;
    } else if (code === 401) {
      // token 过期，清除 token 并跳转到登录页
      storage.remove('token');
      window.location.href = '/login';
    } else {
      // 业务请求错误
      Message.error(message);
      throw new Error(message || '请求出错，请稍候重试');
    }
  },
  (error: AxiosError<Result>) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message || '操作失败,系统异常!';
    Message.error(errMsg);
    const status = response?.status;
    // TODO: 错误处理
    if (status === 503) {
    }

    return Promise.reject(error);
  },
);

class Request {
  private request<T = any>(method: string, url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance({
      method,
      url,
      data: method === 'get' || method === 'delete' ? undefined : params,
      params: method === 'get' || method === 'delete' ? params : undefined,
      ...config,
    });
  }
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request('get', url, params, config);
  }
  post<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request('post', url, params, config);
  }

  put<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request('put', url, params, config);
  }

  delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request('delete', url, params, config);
  }
}

export default new Request();
