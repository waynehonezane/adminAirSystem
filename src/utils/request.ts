import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'

const request = axios.create({
  baseURL: 'http://111.230.101.139:8023',
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.token
  

  if (token) {
    config.headers['token'] = token
  }

  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功的回调

    return response.data
  },
  (error) => {
    // console.log(error)
    // 失败的回调
    const status = error.response.status
    let message = ''
    const router = useRouter()

    switch (status) {
      case 401:
        message = 'Token过期'
        router.push('/login')  
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '500'
        break
      default:
        message = '网络出现错误'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    // if (status === 500) {
    //   localStorage.removeItem('role')
    //   localStorage.removeItem('routes')
    //   localStorage.removeItem('TOKEN')
    //   const $router = useRouter()
    //   $router.push('/login')
    //   window.location.reload()
    // }

    return Promise.reject(error)
  },
)

export default request
