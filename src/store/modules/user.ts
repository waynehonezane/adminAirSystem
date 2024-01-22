// @ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'
import { reqLogin, reqLogout } from '@/api/user'
import { constantRouter, asyncRouter, anyRouter } from '@/router/routers'
import type { loginRequestData, loginResponseData } from '@/api/user/type'
import router from '@/router'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import pinia from '@/store'

// 过滤用户需要展示的异步路由
const filterAsyncRoute = (asyncRoute: any, userRoute: any) => {
  return asyncRoute.filter((item: any) => {
    if (userRoute.includes(item.name)) {
      if (item.children && item.children.length > 1) {
        item.children = filterAsyncRoute(item.children, userRoute)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: () => {
    return {
      menuRoutes: constantRouter,
      token: GET_TOKEN() || '',
      role: localStorage.getItem('role') || '',
      routes: JSON.parse(localStorage.getItem('routes') || '[]'),
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      flag: '',
    }
  },
  actions: {
    async userLogin(data: loginRequestData) {
      this.username = data.username
      this.password = data.password
      localStorage.setItem('username', data.username)
      localStorage.setItem('password', data.password)
      const result: loginResponseData = await reqLogin(data)

      if (result.code == 200) {
        this.token = result.data1.token
        this.role = JSON.stringify(result.data1.level)
        this.routes = JSON.stringify(result.routes)
        SET_TOKEN(result.data1.token)
        localStorage.setItem('role', JSON.stringify(result.data1.level))
        localStorage.setItem('routes', JSON.stringify(result.routes))

        this.handleAsyncRoute(this.routes)

        if (this.role === '0') {
          return '/schoolAdmin1/schoolAdmin'
        } else if (this.role === '1') {
          return '/buildingAdmin1/buildingAdmin'
        } else if (this.role === '2') {
          return '/classInformation1/classInformation'
        }

        return 'ok'
      } else {
        return Promise.reject(new Error('登陆失败'))
      }
    },
    async userlogOut() {
      const result = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.role = ''
        this.routes = []
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('role')
        localStorage.removeItem('routes')
        return 'ok'
      } else {
        return Promise.reject(new Error('登出失败'))
      }
    },
    async handleAsyncRoute(userSyncRoute: string[]) {
      // 过滤出用户需要的异步路由
      const userAsyncRoute = filterAsyncRoute(
        cloneDeep(asyncRouter),
        userSyncRoute,
      )
      // 菜单依赖的数据
      this.menuRoutes = [...constantRouter, ...userAsyncRoute, ...anyRouter]
      // 动态追加路由
      userAsyncRoute.concat(anyRouter).forEach((item: any) => {
        router.addRoute(item)
      })
      this.flag = this.role
      return 'ok'
    },
  },
  getters: {},
})

export default useUserStore
