import router from '@/router'
// @ts-expect-error
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore(pinia)

router.beforeEach(async (to, from, next) => {
  nprogress.start()

  if (userStore.token) {
    if (to.path == '/login') {
      userStore.handleAsyncRoute(userStore.routes)
      if (userStore.role === '0') {
        next({ path: '/schoolAdmin1/schoolAdmin' })
      } else if (userStore.role === '1') {
        next({ path: '/buildingAdmin1/buildingAdmin' })
      } else if (userStore.role === '2') {
        next({ path: '/classInformation1/classInformation' })
      }
    } else {
      if (userStore.flag) {
        next()
      } else {
        try {
          await userStore.handleAsyncRoute(userStore.routes)
          next({ ...to, replace: true })
        } catch (error) {
          next({ path: '/login' })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})
