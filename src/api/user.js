import request from '@/utils/request'
/**
 * 用户登录
 * @param {账号密码} data 
 */
export function login(data) {
  return request({
    url: 'loginCheck',
    method: 'post',
    params: {
      loginName: data.username,
      userPwd: data.password
    }
  })
}
/**
 * 
 * @param {*} data 
 */
export function getRole(data) {
  return request({
    url: '/user/getRole/'+data,
    method: 'post',
  })
}
/**
 * 获取用户信息
 * @param {令牌} token 
 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
/**
 * 获取所有用户信息
 */
export function getUserInfoAll(){
  return request({
    url: '/getInfoAll',
    method: 'get',
  })
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
    withCredentials: true
  })
}

export function automobileLogin(data){
  return request({
    url: '/loginCheck',
    method: 'post',
    params: {
      loginName: data.username,
      userPwd: data.password
    }
  })
}

export function getRouter(data) {
  return request({
    url: '/user/getRouter/'+data,
    method: 'post'
  })
}