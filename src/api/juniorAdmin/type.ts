export interface responseData {
    code: number
    message: string,
    routes: null,
  }
export interface hasClassData {
    classroomName: string,
    espId: string,
    cameraId: string,
    numLimitOn: number,
    temperatureLimitOn: number,
    temperatureLimitOff: number,
    numPeakFlow: number,
    classroomCapacity: number
}

export interface responseClassData extends responseData {
    data1: hasClassData[],
}

export interface hasClassroomData {
    classroomNum:number
}

export interface responseClassroomNumData extends responseData{
    data1: hasClassroomData,
}

export interface addOrUpdateClassroomObj {
    name: string,
    percentage: number,
    size: number,
    status: string,
    uid:number
}
export interface FileRaw extends addOrUpdateClassroomObj{
    raw:File
}
