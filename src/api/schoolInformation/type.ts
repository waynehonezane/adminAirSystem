export interface responseData {
    code: number
    message: string,
    routes: null
}

export interface addSchoolObj {
    campusName: string,
    location: string,
    schoolCode: string,
    schoolName: string
}

export type reqAddSchoolData = addSchoolObj[]

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

export interface reqRemoveData {
    campus: string,
    campusId: number,
    schoolId: number,
    schoolName: string
}