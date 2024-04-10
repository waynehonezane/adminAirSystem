import request from '@/utils/request'

// 获取初级管理员信息
export const reqJuniorAdminInformation = (data: any) => request.get<any, any>(
    `/api/general/get-jad?campusId=${data.campusId}&pageNum=${data.pageNum}`
)
  
// 添加管理员
export const addJuniorAdminInformation = (data:any) => request.post(
  '/api/general/add-adm',data
)

// 修改管理员信息
export const updateJuniorAdminInformation = (data: any) => request.post(
  '/api/general/mod-jad',data
)

// 删除管理员
export const delJuniorAdmin = (data: any) => request.post(
  '/api/general/del-jad',data
)