import request from '@/utils/request'

// 获取教室信息
export const reqClassInformation = (buildingId: number, pageNum: number) =>
  request.get<any,any>(
    `/api/junior/get-classroom?buildingId=${buildingId}&pageNum=${pageNum}`,
  )

// 获取教室总数
export const reqJuniorAdminInformation = () => request.get<any,any>(
  '/api/junior/jun-top'
)

// 根据教室id删除教室信息
export const reqDeleteClassroomData = (data: any) => request.get<any, any>(
  `/api/junior/del-classroom?buildingId=${data.buildingId}&classroomName=${data.classroomName}`
)

// 新增教室信息
export const reqAddOrUpdateClass = (data: any) => request.post<any, any>(
  `/api/junior/add-classroom`,data
)

// 下载模板
export const reqDownloadClasssroom = () => request.get<any,any>(
  '/api/junior/classroomInfoTemplate',{responseType:'blob'}
)

