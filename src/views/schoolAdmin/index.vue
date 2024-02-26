<template>
    <div class="container1">
        <div class="information">
            <div class="schoolQuantity">
                <svgIcon :name="'school'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>学校总数</span>
                    <span>{{ userStore.schoolNum }}</span>
                </div>
            </div>
            <div class="schoolQuantity" style="background-color: #E87D7D;">
                <svgIcon :name="'my'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>校级管理员总数</span>
                    <span>{{ userStore.adminNum }}</span>
                </div>
            </div>
        </div>
        <div class="button">
            <el-button type="primary" @click="addAdmin">录入校级管理员信息</el-button>
        </div>
    </div>
    <div class="header">
        <el-table style="margin:10px 0px 10px 0px;" :data="schoolAdmin" :header-cell-style="customHeaderCellStyle">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="账号拥有者姓名" prop="nickname"></el-table-column>
            <el-table-column label="所属学校" prop="schoolName"></el-table-column>
            <el-table-column label="校区" prop="campus"></el-table-column>
            <el-table-column label="操作">
                <template #="{ row, $index }">
                    <el-button type="primary" @click="editData(row)">编辑</el-button>
                    <el-popconfirm title="确定要删除吗?" @confirm="deleteAdmin(row)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[9]"
            layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @current-change="handleCurrentPage"
            @size-change="handlePageSize" class="pagination" />
    </div>
    <!-- 添加的表单 -->
    <el-dialog v-model="addDialogVisible" title="录入管理员信息">
        <el-form :model="addFormData" :rules="Rules" ref="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addFormData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addFormData.password"></el-input>
            </el-form-item>
            <el-form-item label="账号拥有者姓名" prop="nickname">
                <el-input v-model="addFormData.nickname"></el-input>
            </el-form-item>
            <el-form-item label="所属学校" prop="schoolId">
                <el-select v-model="addFormData.schoolId" placeholder="请选择所属学校" @change="selectSchool">
                    <el-option v-for="(item) in hasSchool" :key="item.schoolId" :value="item.schoolId" :label="item.schoolName" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="校区" prop="campusId">
                <el-select v-model="addFormData.campusId" placeholder="请选择校区">
                    <el-option v-for="(item) in campus" :key="item.campusId" :value="item.campusId" :label="item.campus" ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addSave">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 修改的表单 -->
    <el-dialog v-model="updateDialogVisible" title="更改管理员信息">
        <el-form :model="updateForm" :rules="Rules" ref="form2">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="updateForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="updateForm.password"></el-input>
            </el-form-item>
            <el-form-item label="账号拥有者姓名" prop="nickname">
                <el-input v-model="updateForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="校区" prop="campusId">
                <el-select v-model="updateForm.campusId" placeholder="请选择校区">
                    <el-option v-for="(item) in updateCampus" :key="item.campusId" :value="item.campusId" :label="item.campus"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateSave">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { reqAdminInformation, reqAddAdminInformation, reqDeleteAdmin,reqUpdateAdmin } from '@/api/schoolAdmin'
import { reqSchoolInfomation } from '@/api/schoolInformation'
import type { adminData, arrayData, reqAddAdminData, updateAdminData } from '@/api/schoolAdmin/type'
import type { responseSchoolData } from '@/api/schoolInformation/type'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
let currentPage = ref<number>(1)
let pageSize = ref<number>(9)
let total = ref<number>(30)
let addDialogVisible = ref<boolean>(false)
let updateDialogVisible = ref<boolean>(false)
let form = ref()
let form2 = ref()

onMounted(() => {
    getHasAdmin()
    getHasSchool()
})

// 录入校级管理员功能
// #region
let hasSchool = ref<any>([])
let campus = ref<any>([])
const getHasSchool = async ()=>{
    let result: responseSchoolData = await reqSchoolInfomation(1)
    let schoolArr = result.data1.map(item => ({
        schoolId: item.schoolId, 
        schoolName: item.schoolName
    }))
    hasSchool.value = Array.from(new Set(schoolArr.map(item => item.schoolId))).map(schoolId => schoolArr.find(item => item.schoolId == schoolId))
}
// 选择学校
const selectSchool = async (value: number)=>{
    campus.value = []
    addFormData.campusId = ''
    let result: responseSchoolData = await reqSchoolInfomation(1)
    let campusArr = result.data1.filter(item => item.schoolId == value).map(item => ({
        campusId: item.campusId,
        campus: item.campus
    }))
    campus.value = campusArr
}
// table表格依赖的数据
let schoolAdmin = ref<arrayData[]>([])
const getHasAdmin = async () => {
    let result: adminData = await reqAdminInformation(currentPage.value)
    schoolAdmin.value = result.data1
}
// 新增校级管理员信息请求需要的数据
let addFormData = reactive<reqAddAdminData>({
    schoolId: '',
    campusId: '',
    nickname: '',
    password: '',
    username: ''
})
// 新增校级管理员
const addAdmin = () => {
    // 初始化表单对象
    Object.assign(addFormData, {
        schoolId: '',
        campusId: '',
        nickname: '',
        password: '',
        username: ''
    })
    // 清空上一次的表单校验
    nextTick(() => {
        form.value.clearValidate('schoolId')
        form.value.clearValidate('campusId')
        form.value.clearValidate('username')
        form.value.clearValidate('password')
        form.value.clearValidate('nickname')
    })
    addDialogVisible.value = true
}
// 新增校级管理员确定按钮
const addSave = async () => {
    await form.value.validate()
    let result: any = await reqAddAdminInformation(addFormData)
    if (result.code == 200) {
        addDialogVisible.value = false
        ElMessage({
            type: 'success',
            message: '录入成功'
        })
        getHasAdmin()
    }
    addDialogVisible.value = false
}
// #endregion

// 删除校级管理员功能 !!!
// #region
let delAdminData = reactive<any>({
    adminId: 0
})
const deleteAdmin = async (row: any)=>{
    let { adminId } = row
    Object.assign(delAdminData,{
        adminId: adminId
    })
    console.log(delAdminData)
    let result: any = await reqDeleteAdmin(delAdminData)
    console.log(result)
    if(result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasAdmin()
    }
}
// #endregion

// 更改校级管理员
// #region
let updateForm = reactive<updateAdminData>({
    adminId: 0,
    campusId: '',
    nickname: '',
    password: '',
    username: ''
})
let updateCampus = ref<any>([])
// 点击编辑按钮的回调
const editData = async (row) => {
    let result = await reqSchoolInfomation(1)
    updateCampus.value = result.data1.filter((item) => item.schoolName == row.schoolName).map((item) => ({
        campus: item.campus,
        campusId: item.campusId
    }))
    let adminId = row.adminId
    let updateCampusId = updateCampus.value.filter(item => item.campus == row.campus)[0].campusId
    Object.assign(updateForm,{
        adminId: adminId,
        campusId: updateCampusId,
        nickname: row.nickname,
        password: row.password,
        username: row.username
    })
    nextTick(()=>{
        form2.value.clearValidate('username')
        form2.value.clearValidate('password')
        form2.value.clearValidate('nickname')
        form2.value.clearValidate('campusId')
    })
    updateDialogVisible.value = true
}
// 确定按钮的回调
const updateSave = async ()=>{
    await form2.value.validate()
    let result = await reqUpdateAdmin(updateForm)
    if(result.code == 200) {
        ElMessage({
            type: 'success',
            message: '更新成功'
        })
        getHasAdmin()
        updateDialogVisible.value = false
    }
}
// #endregion

// 当前页数发生改变时触发
const handleCurrentPage = () => {
    getHasAdmin()
}

// 每页条数发生改变时触发
const handlePageSize = () => {

}

// 表单校验
// #region
const validatorUsername = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('用户名称至少2位'))
    }
}

const validatorPassword1 = (rule: any, value: any, callback: any) => {
    if(typeof value == 'string') {
        callback()
    }else {
        callback(new Error('密码不能为空'))
    }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('密码长度必须大于或等于5位'))
    }
}

const validatorNickname = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('用户拥有者名称至少2位'))
    }
}

const validatorSchoolId = (rule: any, value: any, callback: any) => {
    if (typeof value === 'number') {
        callback()
    } else {
        callback(new Error('请选择所属学校'))
    }
}

const validatorCampusId = (rule: any, value: any, callback: any) => {
    if(typeof value == 'number') {
        callback()
    }else {
        callback(new Error('请选择校区'))
    }
}

// 规则对象
const Rules = reactive({
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    password: [{required: true, trigger: 'blur', validator: validatorPassword1},{ required: true, trigger: 'blur', validator: validatorPassword }],
    nickname: [{ required: true, trigger: 'blur', validator: validatorNickname }],
    schoolId: [{ required: true, trigger: 'blur', validator: validatorSchoolId }],
    campusId: [{ required: true, trigger: 'blur', validator: validatorCampusId }]
})
// #endregion


// 圆角样式
const customHeaderCellStyle = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopLeftRadius: '11px', // 设置左上角为圆角
            borderBottomLeftRadius: '11px', // 设置左下角为圆角
        }
    } else if (columnIndex === 5) {
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopRightRadius: '11px', // 设置右上角为圆角
            borderBottomRightRadius: '11px', // 设置右下角为圆角
        }
    } else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
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
        width: 75%;
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
    padding: 10px 15px 15px 15px;
    box-sizing: border-box;
    height: 77vh;
    margin-top: 10px;
    border-radius: 10px;
    background: #F7F7F7;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.2);

    .pagination {
        position: fixed;
        bottom: 20px;
    }
}
</style>