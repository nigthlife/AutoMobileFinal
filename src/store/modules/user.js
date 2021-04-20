import { login, logout, getRouter, automobileLogin, getRole } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,constantRouterMap,asyncRouterMap } from '@/router'

/**
 * 获取默认状态信息
 */
const getDefaultState = () => {
  return {
    // 获取令牌
    token: getToken(), 
    // userId
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    role: [],
    user: '',
    addRouters: '',
    allRouters: ''
  }
}

const state = getDefaultState()


// 通过commit调用方法法
const mutations = {
  // 重设状态属性
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
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_ROUTERS: (state,route) => {
    state.addRouters = route,
    state.allRouters = constantRouterMap.concat(route)
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
        // const { data } = response
        // 替换全局变量中的token
        commit('SET_TOKEN', response.token)
        commit('SET_NAME', response.userId)
        commit('SET_AVATAR', response.loginName)
        commit('SET_USER',response.username)
        // 设置cookie
        setToken(response.token)
        // 回调函数
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  automobileLogin({ commit }, userInfo) {
    console.log("开始执行登录")
      // 解构对象
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      automobileLogin({ username: username.trim(), password: password }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfoAll({commit}) {
    return new Promise((resolve,reject) => {
      user.getUserInfoAll().then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 创建路由
   * @param {*} param0 
   * @param {角色对象} data 
   */
  createRouters({ commit },data) {
    return new Promise((resolve,reject) => {
        getRouter(data).then(response => {
            console.log(response)

            const role = response.data.filter(item => {

              // 将结果集对象中的roleName遍历出来
              return item.roleName
            })

            // 设置角色信息
            commit('SET_ROLE',role);

            // 将异步符合条件对象筛选出来
            const addRouters = asyncRouterMap.filter(item => {
              if(role.includes(item.meta.role)){
                return item
              }
            })
            
            // 更新路由
            commit("SET_ROUTERS",addRouters)
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
  },
  /**
   * 获取用户角色信息
   * @param {} param0 
   */
  getRoleName({ commit }) {
    return new Promise((resolve, reject, userId) => {
      console.log(userId)
        getRole(userId).then(response => {
            resolve()
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
  },
  



  // get user info 获取用户信息
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       // const { data } = response

  //       if (!response) {
  //         return reject('Verification failed, please Login again.')
  //       }
  //       commit('SET_NAME', response.userName)
  //       commit('SET_AVATAR', response.loginName)
  //       resolve(response)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

