import request from '@/utils/request'

export const reqClassInformation = (buildingId: number, pageNum: number) =>
  request.get(
    `/api/junior/get-classroom?buildingId=${buildingId}&pageNum=${pageNum}`,
  )
