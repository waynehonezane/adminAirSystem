import request from '@/utils/request'

// 获取教学楼信息
export const reqBuildingInformation = (data: any) => request.get<any, any>(
    `/api/general/get-build?campusId=${data.campusId}&pageNum=${data.pageNum}`
)
  
// 下载模板
export const reqDownloadBuilding = () => request.get<any, any>(
  '/api/general/buildingInfoTemplate',{responseType:'blob'}
)

// 录入楼栋信息
export const reqAddOrUpdateBuilding = (data:any) => request.post<any, any>(
  `/api/general/add-build`,data
)

// 删除学校楼栋信息
export const reqdelBuilding = (data:any) => request.get<any, any>(
  `/api/general/del-build?buildingId=${data}`
)