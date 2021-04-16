import axios from 'axios'
// elementUI 消息弹框
import { MessageBox, Message } from 'element-ui'
// 导入状态管理器
import store from '@/store' 
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  // 设置主机名url
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://localhost/Automobile',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor  请求拦截器
service.interceptors.request.use(config => {
    // do something before request is sent

    // 调用状态中的getters方法中的token
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation

      // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error 
    console.log(error) // for debug 打印错误信息
    return Promise.reject(error) // 
  }
)

// response interceptor 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 获取响应的数据
    const res = response.data
    console.log(res)
    return res;

    // if the custom code is not 20000, it is judged as an error.
    // 如果定制代码不是20000，则判定为错误。
    if (res.code !== 20000) {
      // 执行elementUI中的消息提示
      Message({
        // 如果响应数据中的message为空，返回Error
        message: res.message || '20000 Error',
        // 类型为错误
        type: 'error',

        // 持续时间
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 50008：非法令牌；   50012：其他已登录的客户端      50014：令牌过期
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login 弹框
        // 提示信息为：您以注销，您可以取消以停留在此页面上或再次登录
        // Confirm logout：确认注销
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          // 类型为警告
          type: 'warning'
        }).then(() => {
          // 下一步通过调用vuex中的action中的方法跳转路径
          store.dispatch('user/resetToken').then(() => {
            // 刷新页面
            location.reload()
          })
        })
      }
      // 返回一个错误
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 返回获取的数据
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // 消息提示框
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
