export interface responseData {
    code: number,
    message: string
}

export interface loginRequestData {
    password: string,
    username: string
}

export interface loginResponseData extends responseData {
    data1: number,
    data2: null
}

export interface logoutResponseData extends responseData {
    data1: null,
    data2: null
}
