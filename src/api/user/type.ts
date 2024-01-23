export interface responseData {
  code: number
  message: string
}

export interface loginRequestData {
  password: string
  username: string
}

export interface data1 {
  level: number
  token: string
}

export interface loginResponseData extends responseData {
  data1: data1
  routes: string[]
}

export interface logoutResponseData extends responseData {
  data1: null
  data2: null
}
