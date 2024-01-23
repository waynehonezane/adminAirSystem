import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { constantRouter } from './routers'

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
