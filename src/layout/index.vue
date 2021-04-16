<template>
<!-- 绑定一个计算属性 classObj用于显示或隐藏侧边栏  -->
  <div :class="classObj" class="app-wrapper">

    <!-- 判断设备状态是否是可移动状态 和 侧边栏是否打开状态  并且设置了一个点击事件-->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />

    <!-- 使用侧边栏组件 -->
    <sidebar class="sidebar-container" />

    <div class="main-container">

      <!-- 动态绑定class样式 -->
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 导航栏 -->
        <navbar />
      </div>

      <!-- 使用应用程序组件 -->
      <app-main />
    </div>

  </div>
</template>

<script>
// 导入子组件中的
// Navbar 导航栏
// SideBar 侧边栏
// AppMain 应用程序界面
import { Navbar, Sidebar, AppMain } from './components'
// 调整大小处理程序
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  // 注册组件
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  // 
  mixins: [ResizeMixin],
  computed: {
    // 获取vuex中的侧边栏的状态
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 获取vuex中设备的状态
    device() {
      return this.$store.state.app.device
    },
    // 获取vuex中的固定标题状态
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 通过子组件中的内容动态绑定class样式
    classObj() {
      return {
        // 获取侧边栏中的opened中值取反 用于隐藏侧边栏
        hideSidebar: !this.sidebar.opened,
        // 获取侧边栏中的opened中值 用于显示侧边栏
        openSidebar: this.sidebar.opened,
        // 外部动画
        withoutAnimation: this.sidebar.withoutAnimation,
        // 给属性赋值 判断当前从vuex中获取的状态是否为可移动状态
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    // 处理点击出侧边栏
    handleClickOutside() {
      // 调用一个getters函数中的方法
      this.$store.dispatch('app/closeSideBar', { 
        withoutAnimation: false 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  // 导入一个函数
  @import "~@/styles/mixin.scss";
  // 导入变量
  @import "~@/styles/variables.scss";

  .app-wrapper {
    // 调用一个scss/sass函数
    @include clearfix;
    // 设置位置为相对位置
    position: relative;
    height: 100%;
    width: 100%;
    // 
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
