import axios from 'axios'
import { ElMessage } from 'element-plus'

let request = axios.create({
    baseURL: 'http://47.120.4.5:8023',
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config)=>{


    return config
})

// 响应拦截器
request.interceptors.response.use((response)=>{
    // 成功的回调

    return response.data
},(error)=>{
    // 失败的回调
    let status = error.response.status
    let message = ''

    switch (status) {
        case 401:
            message = 'Token过期'
            break;
        case 403:
            message = '无权访问'
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器出现错误'
            break;
        default:
            message = '网络出现错误'
            break;
    }
    ElMessage({
        type: 'error',
        message
    })

    return Promise.reject(error)
})

export default request