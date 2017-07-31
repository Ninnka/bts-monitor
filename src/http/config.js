import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

// function setAxios () {
// 创建axios实例
let axiosInstance = axios.create({
  // baseURL: 'http://v.juhe.cn',
  baseURLBackup: 'http://v.juhe.cn', // NOTE:保存域名，正式开发需要更换
  params: { // 测试用，全局params，需要覆盖可以在调用的地方覆盖，不需要可以删除
    key: 'af9ed4c763c2ddf9235eabf081ef3a43'
  },
  // auth: { //设置Authorization对象在headers中，优先级最高
  //   username: 'un',
  //   password: 'pwd'
  // },
  validateStatus: (status) => {
    // 只过滤出2开头的状态，其他状态通通列为失败
    return /^2\d{2}$/.test(status) || status == 304;
  },
  paramsSerializer: (params) => {
    // 序列化params对象
    return qs.stringify(params);
  },
  transformRequest: (data) => {
    // 请求前对data进行操作
    return qs.stringify(data);
  }
  // transformResponse: (data) => {
  //   // 有需要可以对返回的data进行统一操作
  //   return JSON.parse(data);
  // }
});

// 设置全局axiox属性默认值
// 设置Authorization，正式开发需要更换
axiosInstance.defaults.headers.common['Authorization'] = 'this is a test for Authorization';
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 设置全局请求拦截器
axiosInstance.interceptors.request.use((config) => {
  if (process.env && process.env.NODE_ENV == 'production') {
    config.url = config.url.replace('/api', '');
    config.url = config.baseURLBackup + config.url;
  }
  return config;
}, (error) => {
  // console.log('error in request interceptors', error.response);
  Message({
    type: 'error',
    message: error,
    showClose: true,
    duration: 2000
  });
  return Promise.reject(error.response);
});

// 设置全局响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // NOTE: 测试用数据，正式开发需要删除，数据结构需要核对后修改
  response.data.code = 0;
  response.data.message = '成功';
  // TEST-START: 测试状态处理
  // NOTE:预定将code为0以为的状态都归类为操作失败，并reject
  if (response.data.code !== 0) {
    Message({
      type: 'error',
      message: response.data.message,
      showClose: true,
      duration: 2000
    });
    return Promise.reject(response);
  }else {
    Message({
      type: 'success',
      message: response.data.message,
      showClose: true,
      duration: 2000
    });
  }
  // TEST-END:
  return response;
}, (error) => {
  // console.log('error in response interceptors', error.response);
  Message({
    type: 'error',
    message: error.response.statusText,
    showClose: true,
    duration: 2000
  });
  return Promise.reject(error.response);
});

// 将axios实例挂载到Vue原型链上
// Vue.prototype.$axios = axiosInstance;
// }

export {
  axiosInstance
}