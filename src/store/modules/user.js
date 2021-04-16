import { login, logout, getInfo, automobileLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 默认状态信息
const getDefaultState = () => {
  return {
    // 获取令牌
    token: getToken(), 
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

// 通过commit调用方法法
const mutations = {
  // 重载状态属性
  RESET_STATE: (state) => {
    // 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖 替换token
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    // 替换token
    state.token = token
  },
  SET_NAME: (state, name) => {
    // 设置name
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    // 设置头像
    state.avatar = avatar
  }
}
// 
const actions = {
  // user login 用户登录
  // commit：用户调用mutations中的方法
  // userInfo: 登录form表单信息
  login({ commit }, userInfo) {
    // 解构对象
    const { username, password } = userInfo
    // 异步请求
    return new Promise((resolve, reject) => {
      // username.trim() 删除用户输入的多余空格
      login({ username: username.trim(), password: password }).then(response => {
        // 获取响应的数据
        const { data } = response
        // 替换全局变量中的token
        commit('SET_TOKEN', data.token)
        // 设置cookie
        setToken(data.token)
        // 回调函数
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  automobileLogin({ commit }, userInfo){
    console.log("开始执行登录")
      // 解构对象
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      automobileLogin({ username: username.trim(), password: password }).then(response => {
        // 获取响应的数据
        // console.log(response)
        // const { data } = response
        // console.log(data)
        // 替换全局变量中的token
        // commit('SET_TOKEN', data.token)
        // 设置cookie
        // setToken(data.token)
        // 回调函数
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

