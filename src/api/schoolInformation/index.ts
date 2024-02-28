import request from '@/utils/request'
import type { reqAddSchoolData, reqRemoveData } from './type'

// 获取学校信息
export const reqSchoolInfomation = (pageNum: number) => request.get<any,any>(`/api/super/get-sch?pageNum=${pageNum}`)

// 新增学校信息
export const reqAddSchool = (data: reqAddSchoolData) => request.post<any,any>(`/api/super/add-sch`,data)

// 删除学校信息
export const reqRemoveSchool = (delAdminDTO: any) => request.post<any,any>(`/api/super/del-sch`,delAdminDTO)
