import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 路由对象
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // 判断路由入口是否可见的开关
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    // 项目入口
    path: '/',
    component: Layout,
    // 重定向到子路由中
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { 
        title: 'Dashboard', 
        icon: 'dashboard',
        role: ['admin','editor'] 
      }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
/**
 * 恒定路由表
 * 所有权限通用路由表
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // 判断路由入口是否可见的开关
    hidden: true
  },
  {
    // 项目入口
    path: '/',
    component: Layout,
    // 重定向到子路由中
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { 
        title: 'Dashboard', 
        icon: 'dashboard', 
      }
    }]
  },
]
/**
 * 异步挂载路由
 * 动态根据权限加载路由表
 */
export const testRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '权限测试', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { 
          title: '权限测试', 
          icon: 'table', 
          role: ['admin',]
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true

  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]
/**
 * 动态路由
 */
export const asyncRouterMap = [
  {
    path: '/Maintenance',
    component: Layout,
    redirect: '/Maintenance/workHandle',
    name: 'Maintenance',
    meta: {
      title: '维修接待',
      role: ['管理员','']
    },
    children: [
      {
        path: '/workHandle',
        name: 'workHandle',
        component: () => import('@/views/Maintenance/workHandle/addwordHandle'),
        meta: {
          title: '工单处理',
          role: ['管理员','']
        }
      },
      {
        path: '/pastHistory',
        name: 'pastHistory',
        component: () => import('@/views/Maintenance/HistoryQuery/historyQuery'),
        meta: {
          title: '历史查询',
          role: ['管理员','']
        }
      },
      {
        path: '/make',
        name: 'make',
        component: () => import('@/views/Maintenance/subscribe/subscribeManage'),
        meta: {
          title: '预约管理',
          role: ['管理员','']
        }
      },
      {
        path: '/insurance',
        name: 'insurance',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '保险出单',
          role: ['管理员','']
        }
      },
      {
        path: '/health',
        name: 'health',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '汽车健康档案',
          role: ['管理员','']
        }
      },
      {
        path: '/parts',
        name: 'parts',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '配件基础数据',
          role: ['管理员','']
        }
      }
    ]

  },
  {
    path: '/partsManager',
    name: 'partsManager',
    component: Layout,
    redirect: '/partsMananager/purchase',
    meta: {
      title: '配件管理',
      role: ['管理员','']
    },
    children: [
      {
        path: '/purchase',
        name: 'purchase',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '配件采购',
          role: ['管理员','']
        }
      },
      {
        path: '/delivery',
        name: 'delivery',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '配件出库',
          role: ['管理员','']
        }
      },
      {
        path: '/inventory',
        name: 'inventory',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '库存管理',
          role: ['管理员','']
        }
      },
    ]
  },
  {
    path: '/client',
    name: 'client',
    component: Layout,
    redirect: '/client/datum',
    meta: {
      title: '客户关系',
      role: ['管理员','']
    },
    children: [
      {
        path: '/datum',
        name: 'datum',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '客户资料',
          role: ['管理员','']
        }
      },
      {
        path: '/business',
        name: 'business',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '业务办理',
          role: ['管理员','']

        }
      },
      {
        path: '/promotion',
        name: 'promotion',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '推广设置',
          role: ['管理员','']
        }
      },
      {
        path: '/promotion',
        name: 'promotion',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '业务统计',
          role: ['管理员','']
        }
      }
    ]
  },
  {
    path: '/basics',
    name: 'basics',
    component: Layout,
    redirect: '/basics/company',
    meta: {
      title: '基础资料',
      role: ['管理员','']
    },
    children: [
      {
        path: '/company',
        name: 'company',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '公司管理',
          role: ['管理员','']
        }
      },
      {
        path: '/finance',
        name: 'finance',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '公司财务',
          role: ['管理员','']
        }
      },
      {
        path: '/basicsData',
        name: 'basicsData',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '维修基础数据',
          role: ['管理员','']
        }
      },
      {
        path: '/callback',
        name: 'callback',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '回访基础数据',
          role: ['管理员','']
        }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/sysSet',
    meta: {
      title: '系统配置',
      role: ['管理员','']
    },
    children: [
      {
        path: '/userManage',
        name: 'userManage',
        component: () => import("@/views/systemManage/userManage/index"),
        meta: {
          title: '用户管理',
          role: ['管理员','']
        }
      },
      {
        path: 'roleManage',
        name: 'roleManage',
        component: () => import("@/views/systemManage/roleManage/index"),
        meta: {
          title: '角色管理',
          role: ['管理员','']
        }
      },
      {
        path: 'resourceManage',
        name: 'resourceManage',
        component: () => import("@/views/systemManage/reourceManage/index"),
        meta: {
          title: '资源管理',
          role: ['管理员','']
        }
      },
      {
        path: '/sysSet',
        name: 'sysSet',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '系统配置',
          role: ['管理员','']
        }
      },
      {
        path: '/note',
        name: 'note',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '短信管理',
          role: ['管理员','']
        }
      }
    ]
  },
]

// 创建路由
// 实例化vue的时候只挂载constantRouterMap
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 创建路由对象
const router = createRouter()

// 导出方法路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router 替换原有的路由，更改为默认的路由
}

// 使用默认方法导出路由
export default router
