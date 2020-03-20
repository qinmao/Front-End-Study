import axios from 'axios'
import qs from 'qs'
import router from '../router'
import {
  Message
} from 'element-ui'
let httpReq = {}
const instance = axios.create({
  timeout: 3000, // 设置超时时间
  baseURL: process.env.VUE_APP_BASE_URL
})
// 实例默认表单提交
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
// By default, axios serializes JavaScript objects to JSON. 
// To send data in the application/x-www-form-urlencoded format instead, 
// you can use one of the following options.

// In a browser, you can use the URLSearchParams API as follows:
// 方法1
// const params = new URLSearchParams();
// params.append('param1', 'value1');
// params.append('param2', 'value2');
// axios.post('/foo', params);

// 方法2
// const qs = require('qs');
// axios.post('/foo', qs.stringify({ 'bar': 123 }));


instance.interceptors.request.use(config => {
  if (config.method === 'post') {
    const contentType = config.headers['Content-Type']
    if (contentType && contentType.toLowerCase() === 'multipart/form-data') {
      // 文件上传的处理
    } else {
      // 表单处理
      config.data = qs.stringify(config.data)
    }
  }
  // token 授权
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'bearer' + ' ' + token
  }
  return config
}, (error) => {
  return Promise.resolve({ code: 500, message: error })
})

instance.interceptors.response.use(response => {
  const responseCode = response.status
  if (responseCode === 200) {
    if (response.data.code !== 200) {
      // 根据自有业务修改
      const errCodes = [600, 603, 401]
      if (errCodes.includes(response.data.code)) {
        console.log('登录信息过期，请重新登录')
        // 清除token
        localStorage.removeItem('token')
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }, 1000)
      }
    }
    return Promise.resolve(response.data)
  }
}, error => {
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      console.log('超时了')
      Message.warning({
        message: `请求超时了!`
      })
    } else {
      console.log('断网了')
      Message.warning({
        message: `断网了!`
      })
    }
  }
  const responseCode = error.response.status
  switch (responseCode) {
    // 401：未登录
    case 401:
      console.log('跳转登录页')
      Message.warning({
        message: `登陆失效,请重新登录!`
      })
      setTimeout(() => {
        // 跳转登录页
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      break
    // 403: token过期
    case 403:
      console.log('登录信息过期，请重新登录')
      // 清除token
      localStorage.removeItem('token')
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      break
    // 404 请求不存在
    case 404:
      console.log('网络请求不存在')
      Message.warning({
        message: `网络请求不存在!`
      })
      break
      // Gateway Timeout
      case 504:
        console.log('服务端错误')
        Message.warning({
          message: `服务端错误504!`
        })
        break
    // 其他错误，直接抛出错误提示
    default:
      console.log(error.response)
      Message.warning({
        message:error.response.data
      })
  }
  return Promise.reject(error.response)
})

httpReq.install = function (Vue) {
  Vue.prototype.$http = instance
}
export {
  instance as $http, httpReq
}
