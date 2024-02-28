import request from '@/utils/request'
import type { adminData, reqAddAdminData, updateAdminData } from './type'

// 获取校级管理员信息
export const reqAdminInformation = (pageNum: number) => request.get<any, adminData>(`/api/super/get-gad?pageNum=${pageNum}`)

// 新增校级管理员信息
export const reqAddAdminInformation = (data: reqAddAdminData) => request.post<any, any>(`/api/super/add-adm`, data)

// 修改校级管理员信息
export const reqUpdateAdmin = (data: updateAdminData) => request.post<any,any>('/api/super/mod-gad',data)

// 删除校级管理员信息
export const reqDeleteAdmin = (data: any) => request.post<any,any>('/api/super/del-gad',data)

