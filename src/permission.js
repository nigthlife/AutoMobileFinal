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

  // 设置开始进度条
  NProgress.start()

  // 将即将要进入的目标的路由对象中的meat中的标题设置为当前网页标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 
  const hasToken = getToken()
  console.log("hasToken => " + hasToken)
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
      console.log("name => " + hasGetUserInfo)
      // 判断用户信息是否存在
      if (hasGetUserInfo) {

        //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        next()
      } else {
        try {
          let role = store.getters['user/role']
          // 判断角色是否为空
          if(!role){
            store.dispatch('user/getRoleName',store.getters['user/name']).then(resp => {
                // 1.获取结果集中的角色
                // 2.调用获取动态路由的action中

                store.dispatch('user/createRouter').then(res => {
                  let addRouters = store.getters['user/addRouters'];
                  let allRouters = store.getters['user/allRouters'];

                  // 更新路由
                  router.options.routes = allRouters;

                  // 添加
                  router.addRoutes(addRouters)
                  next({...to,replace:true})
                })
            })
          }else{
            next()
          }
         
          // await store.dispatch('user/getRouters',hasGetUserInfo).then(res =>{
            // 获取用户角色
            // console.log("获取用户角色")

            // 生成可访问路由表
            // store.commit('SET_ROUTERS',res.data)

            // next({ ...to,replace:true})
            // store.dispatch('user/getInfo').then(() => {
            //   router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
            // })
          // })
          // console.log("结束请求报表")
          // next()
        } catch (error) {
          // 删除令牌，转到登录页面重新登录
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
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 否则全部重定向到登录页
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
