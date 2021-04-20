import Cookies from 'js-cookie'
/**
 * sidebar：侧边栏
 * opened：获取cookie中是否包含sidebarStatus的cookie
 */
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 侧边栏初始状态
    withoutAnimation: false
  },
  device: 'desktop'
}
/**
 * TOGGLE_SIDEBAR：切换侧边栏
 * CLOSE_SIDEBAR：关闭测边栏
 * TOGGLE_DEVICE：切换设备
 */
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}
/**
 * 异步方法
 * 切换侧边栏
 * 关闭侧边栏
 * 切换设备
 */
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
