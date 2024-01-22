export interface responseData {
  code: number
  message: string,
  routes: null
}

export interface arrayData {
  adminId: number,
  campus: string
  nickname: string
  password: null,
  schoolName: string
  username: string
}

export interface adminData extends responseData {
  data1: arrayData[]
}

export interface reqAddAdminData {
  campusId: number | string,
  nickname: string,
  password: string,
  schoolId: number | string,
  username: string,
}

export interface hasSchoolData {
    campus: string,
    campusId: number,
    location: string,
    schoolId: number,
    schoolName: string
}

export interface responseSchoolData extends responseData {
    data1: hasSchoolData[],
}

export interface addOrUpdateSchoolObj {
    campusName: string,
    location: string,
    schoolCode: string,
    schoolName: string
}

export interface updateAdminData {
  adminId: number,
  campusId: string | number,
  nickname: string,
  password: string,
  username: string
}

