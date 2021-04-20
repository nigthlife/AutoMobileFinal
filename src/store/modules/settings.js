import defaultSettings from '@/settings'
/**
 * 结构对象
 * showSettings = 标题
 * fixedHeader = 默认不固定标题
 * sidebarLogo = 默认不显示徽标
 */
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings
/**
 * 设置全局状态属性
 */
const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}
/**
 * 改变设置
 * 传入需要改变的属性和值
 */
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    // 
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}
/**
 * 异步改变设置
 * 解构对象context 获取其中的commit
 */
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

