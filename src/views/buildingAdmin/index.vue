<template>
    <div class="container1">
        <div class="information">
            <div class="schoolQuantity" style="background-color: #E87D7D;">
                <svgIcon :name="'school'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>楼栋管理员总数</span>
                    <span>3</span>
                </div>
            </div>
            <div class="schoolQuantity">
                <svgIcon :name="'my'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>楼栋总数</span>
                    <span>3</span>
                </div>
            </div>
        </div>
        <div class="button">
            <el-button type="primary">录入楼栋管理员信息</el-button>
            <el-button type="primary">下载模板</el-button>
        </div>
    </div>
    <div class="header">
            <el-table style="margin:10px 0px 10px 0px;" :data="schoolAdmin" :header-cell-style="customHeaderCellStyle">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="账号拥有者姓名" prop="name"></el-table-column>
                <el-table-column label="楼栋权限" prop="buildingPermissions"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="pagination"
            />
    </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue'

const pageSize4 = ref(10)
const currentPage4 = ref(1)

// 假数据
let schoolAdmin = ref([
    {
        username: 'Nick',
        password: 'mima123',
        name: '张三',
        buildingPermissions: '教学楼、英东楼'
    },
    {
        username: 'zhh',
        password: 'mimafdfdas',
        name: '李四',
        buildingPermissions: '教学楼'
    },
    {
        username: 'waynehong',
        password: 'mima2321fff',
        name: '王五',
        buildingPermissions: '英东楼'
    }
])

// 表格圆角
const customHeaderCellStyle = ({row, column, rowIndex, columnIndex})=>{
    if(columnIndex === 0) {
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopLeftRadius: '11px', // 设置左上角为圆角
            borderBottomLeftRadius: '11px', // 设置左下角为圆角
        }
    }else if(columnIndex === 5) {   
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopRightRadius: '11px', // 设置右上角为圆角
            borderBottomRightRadius: '11px', // 设置右下角为圆角
        }
    }else if(columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
        return {
            color: 'white',
            backgroundColor: '#608CBF',
        }
    }
}

</script>

<style scoped lang='scss'>
.container1 {
    display: flex;
    .information {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width:75%;
    height: 130px;
    background: #FAF7F7;
    box-shadow: 4px 4px 6px -3px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    .schoolQuantity {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 300px;
        height: 100px;
        border-radius: 10px;
        background: #E8A23A;
            .quantityInformation {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #FFFFFF;
                font-size: 22px;
                span:nth-child(1) {
                    margin-bottom: 10px;
                }
            }
        }
        .schoolAdmin {
            width: 300px;
            height: 100px;
            border-radius: 10px;
            background: #E87D7D;
        }
    }
    .button {
        margin: 0 auto;
        margin-top: 90px;
    }
}
.header {
    padding:10px 15px 15px 15px;
    box-sizing: border-box;
    height: 75vh;
    margin-top: 10px;
    border-radius: 10px;
    background: #F7F7F7;
    box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.2);
    .pagination {
        position: fixed;
        bottom: 20px;
    }
}
</style>