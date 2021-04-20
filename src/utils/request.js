import axios from 'axios'
// elementUI 消息弹框
import { Message } from 'element-ui'
// 导入状态管理器
import store from '@/store' 
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  // 设置主机名url
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://localhost:80/Automobile',
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
    console.log(response)
    const { data } = response
    console.log(data)
    return data
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
