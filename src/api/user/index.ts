import request from '@/utils/request'
import type { loginRequestData, loginResponseData } from './type'

enum API {
  // 登录接口
  LOGIN_URL = '/api/web/login',
  // 登出接口
  LOGOUT_URL = '/api/web/logout',
}

export const reqLogin = (data: loginRequestData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
