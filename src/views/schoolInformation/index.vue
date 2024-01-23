<template>
    <div class="container1">
        <div class="information">
            <div class="schoolQuantity">
                <svgIcon :name="'school'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>学校总数</span>
                    <span>3</span>
                </div>
            </div>
            <div class="schoolQuantity" style="background-color: #E87D7D;">
                <svgIcon :name="'my'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>校级管理员总数</span>
                    <span>3</span>
                </div>
            </div>
        </div>
        <div class="button">
            <el-button type="primary" @click="addSchool">录入学校信息</el-button>
        </div>
    </div>
    <div class="header">
            <el-table style="margin:10px 0px 10px 0px;" :data="schoolInformation" :header-cell-style="customHeaderCellStyle">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="学校名称" prop="schoolName"></el-table-column>
                <el-table-column label="校区" prop="campus"></el-table-column>
                <el-table-column label="对应地理位置" prop="location"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-button type="primary">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[9]"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="400"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            class="pagination"
            />
            <el-dialog v-model="dialogVisible" :title="formData.schoolCode?'更新学校信息':'录入学校信息'">
                <el-form :model="formData" :rules="rules" ref="form">
                    <el-form-item label="学校名称" prop="schoolName">
                        <el-input v-model="formData.schoolName"></el-input>
                    </el-form-item>
                    <el-form-item label="校区" prop="campusName">
                        <el-input v-model="formData.campusName"></el-input>
                    </el-form-item>
                    <el-form-item label="对应地理位置" prop="location">
                        <el-input v-model="formData.location"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="save">确定</el-button>
                </span>
                </template>
            </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref,reactive,onMounted,nextTick } from 'vue'
import { reqSchoolInfomation,reqAddOrUpdateSchool } from '@/api/schoolAdmin'
import type { responseSchoolData,hasSchoolData,addOrUpdateSchoolObj } from '@/api/schoolAdmin/type'
import { ElMessage } from 'element-plus';

const currentPage = ref(1)
const pageSize = ref(9)
let dialogVisible = ref<boolean>(false)
let form = ref()
let formData = reactive<addOrUpdateSchoolObj>({
    campusName: '',
    location: '',
    schoolCode: '',
    schoolName: ''
})
let formDataArr = ref<addOrUpdateSchoolObj[]>([])

onMounted(()=>{
    getHasSchool()
})

let schoolInformation = ref<hasSchoolData[]>([])
// 获取已有的学校信息
const getHasSchool = async ()=>{
    let result: responseSchoolData = await reqSchoolInfomation(currentPage.value)
    console.log(result)
    schoolInformation.value = result.data1
}

// 添加已有的学校
const addSchool = ()=>{
    // 表单数据初始化
    Object.assign(formData,{
        campusName: '',
        location: '',
        schoolCode: '',
        schoolName: ''
    })
    formDataArr.value = []
    // 清空表单校验规则
    nextTick(()=>{
        form.value.clearValidate('schoolName')
        form.value.clearValidate('campusName')
        form.value.clearValidate('location')
    })
    dialogVisible.value = true
}

const save = async ()=>{
    await form.value.validate()
    formDataArr.value.push(formData)
    console.log(formDataArr.value)
    let result: any = await reqAddOrUpdateSchool(formDataArr.value)
    console.log(result)
    if(result.code == 200) {
        ElMessage({
            type: 'success',
            message: formData.schoolCode ? '更新成功' : '录入成功'
        })
        getHasSchool()
    }else {
        ElMessage({
            type: 'error',
            message: formData.schoolCode ? '更新失败' : '录入失败'
        })
    }
    dialogVisible.value = false
}

// 当前页数发生改变的回调
const handleCurrentChange = ()=>{
    getHasSchool()
}

// 每页条数发生改变的回调
const handleSizeChange = ()=>{

}

const validatorSchoolName = (rules: any, value: any, callback: any) => {
    if(value.trim().length > 0) {
        callback()
    }else {
        callback(new Error('学校不能为空'))
    }
}
const validatorCampusName = (rules: any, value: any, callback: any) => {
    if(value.trim().length > 0) {
        callback()
    }else {
        callback(new Error('校区不能为空'))
    }
}
const validatorLocation = (rules: any, value: any, callback: any) => {
    if(value.trim().length > 0) {
        callback()
    }else {
        callback(new Error('地理位置不能为空'))
    }
}

// 表单校验
const rules = {
    schoolName: [{required: true, trigger: 'blur', validator: validatorSchoolName}],
    campusName: [{required: true, trigger: 'blur', validator: validatorCampusName}],
    location: [{required: true, trigger: 'blur', validator: validatorLocation}]
}

// 圆角样式
const customHeaderCellStyle = ({row, column, rowIndex, columnIndex})=>{
    if(columnIndex === 0) {
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopLeftRadius: '11px', // 设置左上角为圆角
            borderBottomLeftRadius: '11px', // 设置左下角为圆角
        }
    }else if(columnIndex === 4) {   
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopRightRadius: '11px', // 设置右上角为圆角
            borderBottomRightRadius: '11px', // 设置右下角为圆角
        }
    }else if(columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
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
    height: 77vh;
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