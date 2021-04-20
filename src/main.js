import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets 一个现代的替代CSS重置

import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css' 
import locale from 'element-ui/lib/locale/lang/en' // lang i18n 多语言设置

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon  图标
import '@/permission' // permission control 权限控制

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 判断生成环境是否等于 production
// 将node的环境更改为生成环境
// if (process.env.NODE_ENV === 'production') {
//   console.log(process.env.NODE_ENV)
//   // 导入mock 随机生成数据
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// console.log(process.env.NODE_ENV)
// console.log(process.env)