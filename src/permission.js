import router from './router' 
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 进度条（内置函数）
import 'nprogress/nprogress.css' // progress bar style 进度条样式
import { getToken } from '@/utils/auth' // get token from cookie 获取cookie中获取token
import getPageTitle from '@/utils/get-page-title' // 获取页面的标题

NProgress.configure({ showSpinner: false }) // NProgress Configuration 页面顶部加载进度条配置

const whiteList = ['/login'] // no redirect whitelist 没有重定向白名单

// 在路由创建之前回调函数
// 通过router创建一个全局守卫
// 前置守卫
router.beforeEach(async(to, from, next) => {

  // start progress bar 设置开始进度条
  NProgress.start()

  // set page title 设置页面标题
  // 将即将要进入的目标的路由对象中的meat中的标题设置为当前网页标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 
  const hasToken = getToken()

  // 确认用户是否登录
  if (hasToken) {
    // 判断当前url路径是否是登录页面
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // 如果已登录，重定向到主页
      next({ path: '/' })
      // 完成进度条
      NProgress.done()
    } else {
      // 获取vuex中的用户状态信息
      const hasGetUserInfo = store.getters.name
      // 判断用户信息是否为空
      if (hasGetUserInfo) {
        // 不为空放行
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          // 完成进度条
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 判断是否在免登录白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {

      // other pages that do not have permission to access are redirected to the login page.
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 后置守卫（hook）
// 在离开当前路由前调用
router.afterEach(() => {
  // finish progress bar 完成进度条
  NProgress.done()
})
