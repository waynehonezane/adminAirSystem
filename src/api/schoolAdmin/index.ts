import request from "@/utils/request";

// 获取中级管理员信息
export const reqAdminInformation = (pageNum: number) => request.get<any, any>(`/api/super/get-gad?pageNum=${pageNum}`)