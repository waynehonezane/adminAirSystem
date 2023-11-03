// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import {defineStore} from 'pinia'
import {reqLogin,reqLogout} from '@/api/user'
import {constantRouter,asyncRouter,anyRouter} from '@/router/routers'
import type {loginRequestData,loginResponseData} from '@/api/user/type'
import router from '@/router'
import {GET_TOKEN,SET_TOKEN} from '@/utils/token'
import pinia from '@/store'


// 过滤用户需要展示的异步路由
const filterAsyncRoute = (asyncRoute:any,userRoute:any)=>{
    return asyncRoute.filter((item:any)=>{
        if(userRoute.includes(item.name)) {
            if(item.children && item.children.length > 1) {
                item.children = filterAsyncRoute(item.children,userRoute)
            }
            return true
        }
    })
}

let useUserStore = defineStore('User',{
    state: ()=>{
        return {
            menuRoutes: constantRouter,
            token: GET_TOKEN(),
            role: localStorage.getItem('role') || '',
            routes: JSON.parse(localStorage.getItem('routes') || '[]'),
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            flag: '',
            // 假的响应数据
            result: {
                code: '' as string | number,
                data1: 0 as number,
                routes: [] as string[],
                token: '',
            }
        }
    },
    actions: {
        // 登录功能
        /* 
        超级
            "username": "zhkuhzjxl"
            "password": "123456",
        校级
            1234567
        教室管理员
            12345678
        */  
        async userLogin(data:loginRequestData) {
            this.username = data.username
            this.password = data.password
            localStorage.setItem('username',data.username)
            localStorage.setItem('password',data.password)
            // let result:loginResponseData = await reqLogin(data)
            // console.log(result)
            if(data.username == 'zhkuhzjxl' && data.password == '123456') {
                this.result = {
                    code: 200,
                    data1: 0,// 0:超级管理员，1:校级管理员，2:楼栋管理员
                    routes: ['schoolAdmin','schoolInformation'],
                    token: '123123sdasdwqadas'
                }
            }else if(data.username == 'zhkuhzjxl' && data.password == '1234567') {
                this.result = {
                    code: 200,
                    data1: 1,
                    routes: ['buildingAdmin','buildingInformation'],
                    token: '123123sdasdwasdasadas'
                }
            }else if(data.username == 'zhkuhzjxl' && data.password == '12345678') {
                this.result = {
                    code: 200,
                    data1: 2,
                    routes: ['classInformation'],
                    token: '123123sdasdwqweqqwewqadas'
                }
            }
            if(this.result.code == 200) {
                this.token = this.result.token
                this.role = JSON.stringify(this.result.data1)
                this.routes = JSON.stringify(this.result.routes)
                SET_TOKEN(this.result.token)
                localStorage.setItem('role',JSON.stringify(this.result.data1))
                localStorage.setItem('routes',JSON.stringify(this.result.routes))

                this.handleAsyncRoute(this.routes)

                if(this.role === '0') {
                    return '/schoolAdmin1/schoolAdmin'
                }else if(this.role === '1') {
                    return '/buildingAdmin1/buildingAdmin'
                }else if(this.role === '2') {
                    return '/classInformation1/classInformation'
                }

                return 'ok'
            }else {
                return Promise.reject(new Error('登录失败'))
            }
        },
        async userlogOut() {
            let result = await reqLogout()
            console.log(result)
            if(result.code == 200) {
                this.token = ''
                this.role = ''
                this.routes = []
                localStorage.removeItem('TOKEN')
                localStorage.removeItem('role')
                localStorage.removeItem('routes')
                return 'ok'
            }else {
                return Promise.reject(new Error('登出失败'))
            }
        },
        async handleAsyncRoute(userSyncRoute:string[]) {
            // 过滤出用户需要的异步路由
            let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRouter),userSyncRoute)
            // 菜单依赖的数据
            this.menuRoutes = [...constantRouter,...userAsyncRoute,...anyRouter]
            // 动态追加路由
            userAsyncRoute.concat(anyRouter).forEach((item:any)=>{
                router.addRoute(item)
            })
            this.flag = this.role
            return 'ok'
        }
    },
    getters: {

    }
})

export default useUserStore