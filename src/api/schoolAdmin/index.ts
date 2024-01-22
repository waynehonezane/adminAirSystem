import request from '@/utils/request'
import type { adminData, reqAddAdminData, addOrUpdateSchoolObj,updateAdminData } from './type'

// 获取校级管理员信息
export const reqAdminInformation = (pageNum: number) => request.get<any, adminData>(`/api/super/get-gad?pageNum=${pageNum}`)

// 新增校级管理员信息
export const reqAddAdminInformation = (data: reqAddAdminData) => request.post<any, any>(`/api/super/add-adm`, data)

// 修改校级管理员信息
export const reqUpdateAdmin = (data: updateAdminData) => request.post<any,any>('/api/super/mod-gad',data)

// 删除校级管理员信息
export const reqDeleteAdmin = (data: any) => request.delete<any,any>('/api/super/del-gad',data)

// 获取学校信息
export const reqSchoolInfomation = (pageNum: number) => request.get<any,any>(`/api/super/get-sch?pageNum=${pageNum}`)

// 新增学校信息
export const reqAddOrUpdateSchool = (data: addOrUpdateSchoolObj[]) => request.post<any,any>(`/api/super/add-sch`,data)
