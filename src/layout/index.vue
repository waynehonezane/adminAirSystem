<template>
    <div class="layoutContainer">
        <!-- 左侧菜单 -->
        <div class="layoutMenu">
            <div class="logo">
                <svgIcon class="img" :name="'airConditioner'" :width="'50px'" :height="'50px'"></svgIcon>
            </div>
            <div class="title">
                <h2>教室数据</h2>
                <h2>管理数据</h2>
            </div>
            <el-menu class="menu" :default-active="$route.path" background-color="#608cbf" text-color="white" active-text-color="#75D1E6">
                <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
        </div>
        <!-- tabbar -->
        <div class="layoutTabbar">
             <div class="setting">
                <img src="@/assets/images/avatar.jpg" style="width: 30px;height: 30px;border-radius: 50%;" alt="">
                <el-dropdown style="margin-left: 10px;">
                    <span class="el-dropdown-link">
                        管理员:zhh<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
             </div>
        </div>
        <!-- Main -->
        <div class="layoutMain">
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Menu from './menu/index.vue'
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user'
import { ref,onMounted } from 'vue'
import { ElNotification } from 'element-plus';

let $router = useRouter()
let userStore = useUserStore()

const logOut = async ()=>{
    try {
        await userStore.userlogOut()
        $router.replace('/login')
    }catch(err) {
        ElNotification({
            type: 'error',
            message: (err as Error).message
        })
    }
}

</script>

<style scoped lang='scss'>
.layoutContainer {
    width: 100%;
    height: 100vh;
    .layoutMenu {
        height: 100%;
        width: $base-menu-width;
        background: #608cbf;
        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            left: 50%;
            top: $base-logo-top;
            transform: translateX(-50%);
            width: $base-logo-size;
            height: $base-logo-size;
            background: #f0f0f0;
            border-radius: 100%;
        }
        .title {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            left: 50%;
            top: calc($base-logo-top + 20px);
            transform: translateX(-50%);
            color: #fafbfd;
            font-size: 20px;
            width: 100px;
            h2:nth-child(1) {
                margin-bottom: 10px;
            }
        }
        .menu {
            position: relative;
            top: 110px;
        }
    }
    .layoutTabbar {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background: white;
        box-shadow: 4px 4px 6px -3px rgba(0, 0, 0, 0.5);
        .setting {
            display: flex;
            align-items: center;
            margin-right: 20px;
        }
    }
    .layoutMain {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        height: calc(100% - $base-tabbar-height);
        width: calc(100% - $base-menu-width);                  
        overflow: auto;
        .container {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 12px;
            width: 99%;
            // background: red;
        }
    }
}

</style>