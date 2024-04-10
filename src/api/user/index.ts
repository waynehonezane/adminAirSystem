import request from '@/utils/request'
import type { loginRequestData, loginResponseData } from './type'

// 登录
export const reqLogin = (data: loginRequestData) => request.post<any, loginResponseData>('/api/web/login', data)

// 登出
export const reqLogout = () => request.post<any, any>('/api/web/logout')

// 获取超级管理员顶部信息
export const reqSuperInformation = () => request.get<any,any>('/api/super/super-top')

// 获取中级管理员顶部信息
export const reqGeneralInformation = () => request.get('/api/general/gen-top')

// 获取初级管理员顶部信息
export const reqJuniorInformation = () => request.get('/api/junior/jun-top')