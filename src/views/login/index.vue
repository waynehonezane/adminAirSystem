<template>
    <div class="loginBackground">
        <div class="loginCard" :body-style="{padding: '0px'}">
            <el-card class="card">
                <div class="cardTop">
                    <div class="img">
                        <svgIcon class="svgIcon" :name="'airConditioner'" :width="'16px'" :height="'16px'"></svgIcon>
                    </div>
                    <span>高校教室智慧空调后台管理系统</span>
                </div>
                <div class="cardCenter">
                    <h1 class="title">欢迎回来</h1>
                    <span class="title2">这是一款智慧空调管控平台</span>
                    <span>绿色、环保是我们永恒的主题</span>
                </div>
                <div class="cardBottom">
                    <el-button class="btn">没账号，联系我们</el-button>
                </div>
            </el-card>
            <el-card class="cardRight">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="ruleFormRef">
                    <h1>后台登录</h1>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" prefix-icon="User" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" show-password prefix-icon="Lock" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>  
    </div>

</template>

<script setup lang='ts'>
import {reactive,ref} from 'vue'
import useUserStore from '@/store/modules/user'
import {ElNotification} from 'element-plus'
import { useRouter } from 'vue-router';

const userStore = useUserStore()
let loginForm = reactive({username:'zhkuhzjxl',password:'123456'})
let ruleFormRef = ref()
let $router = useRouter()

const login = async ()=>{
    await ruleFormRef.value.validate()
    try {
        let path = await userStore.userLogin(loginForm)
        $router.push(path)
    }catch(error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}

const validateUsername = (rule:any, value:any, callback:any)=>{
    if(value.length >= 5) {
        callback()
    }else {
        callback(new Error('账号长度至少5位'))
    }
}

const validatorPassword = (rule:any, value:any, callback:any)=>{
    if(value.length >= 5) {
        callback()
    }else {
        callback(new Error('密码长度至少5位'))
    }
}

const rules = {
    username: [{trigger:'blur', validator: validateUsername}],
    password: [{trigger:'blur', validator: validatorPassword}]
}



</script>

<style scoped lang='scss'>
.loginBackground {
    width: 100vw;
    height: 100vh;
    background: url('../../assets/images/loginBackground.png') no-repeat;
    background-size: cover; 
    .loginCard {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 995px;
    height: 680px;
    background: #F7F7F7;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.2);
    // background: url('../../assets/images/rain.png') no-repeat;
    // background-size: cover;
    .card {
        position: relative;
        width: 300px;
        height: 680px;
        border-radius: 20px;
        background: #7EAEE6;
        .cardTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 50px;
            .img {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #F7F7F7;
                width: 20px;
                height: 20px;
                border-radius: 100%;
            }
            span {
                color: #FFFFFF;
            }
        }
        .cardCenter {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 220px;
            color: #F7F7F7;
            position: absolute;
            top: 200px;
            left: 50%;
            transform: translateX(-50%);
            .title {
                font-size: 36px;
                margin-bottom: 15px;
            }
            .title2 {
                margin-bottom: 10px;
            }
        }
        .cardBottom {
            position: absolute;
            top: 365px;
            left: 50%;
            transform: translateX(-50%);
            .btn {
                // letter-spacing: 4px;
                width: 173px;
                height: 50px;
                color: #4F9AF0;
                border-radius: 40px;
            }
        }
    }
    .cardRight {
        margin-right: 50px;
        margin-top: 175px;
        height: 300px;
        border-radius: 20px;
        text-align: center;
        .login_form {
            width: 550px;
            h1 {
                letter-spacing: 5px;
                font-size: 30px;
                color: #4F9AF0;
                margin-bottom: 20px;
            }
        }
        .login {
            margin: 0 auto;
            margin-top: 30px;
            font-size: 20px;
            color: #FFFFFF;
            background: #7EAEE6;
            width: 200px;
            height: 45px;
            border-radius: 20px;
        }
    }

}
}

</style>