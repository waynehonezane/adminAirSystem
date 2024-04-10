import request from '@/utils/request'

// 获取整个校区近十二个月每个月的合计通电时长
export const reqCampusEachMonthAllTime = () => request.get<any, any>(
    `/api/general/campus-eachmonth-time`
)

// 获取该校区所有楼本月通电时长
export const reqCampusAllBuildingThisMonthTime = () => request.get<any, any>(
    `/api/general/all-building-thismonth-time`
)

// 获取整栋楼每个月的合计通电时长
export const reqBuildingEachMonthAllTime = (data:any) => request.get<any, any>(
    `/api/general/all-building-thismonth-time?buildingId=${data}`
)