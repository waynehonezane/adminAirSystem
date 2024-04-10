<template>
    <div class="container1">
        <div class="information">
            <div class="schoolQuantity" style="background-color: #E87D7D;">
                <svgIcon :name="'school'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>楼栋管理员总数</span>
                    <span>{{junAdmNum}}</span>
                </div>
            </div>
            <div class="schoolQuantity">
                <svgIcon :name="'my'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>楼栋总数</span>
                    <span>{{buildingNum}}</span>
                </div>
            </div>
        </div>
        <div class="button">
            <el-button type="danger" @click="addAdmin">新增楼栋管理员</el-button>
        </div>
    </div>
    <div class="header">
            <el-table style="margin:10px 0px 10px 0px;" :data="schoolAdmin" :header-cell-style="customHeaderCellStyle">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="账号拥有者" prop="nickname"></el-table-column>
                <el-table-column label="楼栋权限" prop="buildingName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-button type="primary" @click="editData(row)">编辑</el-button>
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteAdmin(row)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
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
    <!-- 添加的表单 -->
    <el-dialog v-model="addDialogVisible" title="录入管理员信息">
        <el-form :model="addFormData" :rules="Rules" ref="addForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addFormData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addFormData.password"></el-input>
            </el-form-item>
            <el-form-item label="账号拥有者" prop="nickname">
                <el-input v-model="addFormData.nickname"></el-input>
            </el-form-item>
            <el-form-item label="楼栋权限" prop="buildingId">
                <el-select v-model="addFormData.buildingId" placeholder="请选择所属楼栋" @change="selectBuilding">
                    <el-option v-for="(item) in hasBuilding" :key="item.buildingId" :value="item.buildingId" :label="item.buildingName" ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addSave(addFormData)">确定</el-button>
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
            <el-form-item label="楼栋权限" prop="buildingId">
                <el-select v-model="updateForm.buildingId" placeholder="请选择楼栋">
                    <el-option v-for="(item) in hasBuilding" :key="item.buildingId" :value="item.buildingId" :label="item.buildingName"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateSave">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { reqJuniorAdminInformation,addJuniorAdminInformation,updateJuniorAdminInformation,delJuniorAdmin } from '@/api/buildingAdmin';
import { ref, onMounted, nextTick,reactive } from 'vue'
import useUserStore from '@/store/modules/user'
import usebuildingInformationStore from '@/store/modules/buildingInformation'
import form from 'element-plus/es/components/form/index.mjs';
import { ElMessage } from 'element-plus'


const pageSize4 = ref(8)
const currentPage4 = ref(1)
const userStore = useUserStore()
const useBuildingInfo = usebuildingInformationStore()
let updateDialogVisible = ref<boolean>(false)
// 控制添加管理员表单的出现
let addDialogVisible = ref<boolean>(false)
// 保存新增楼栋管理员表单数据
let addForm = ref()

// 所有初级管理员数据
let schoolAdmin = ref([])

// 获取初级管理员数据所需参数
let allAdminAndBuilding = {
    "campusId": userStore.campusId,
    "pageNum":currentPage4.value
}
// 调接口获取所有初级管理员信息
const getJuniorAdminInfo = async () => {
    console.log("campusId",userStore.campusId)
    let result = await reqJuniorAdminInformation(allAdminAndBuilding)
    console.log("初级管理员1", result)
    schoolAdmin.value = result.data1
    console.log("初级管理员信息",schoolAdmin.value)
}

// 所有楼栋管理员数量
let junAdmNum = ref()
// 楼栋总数
let buildingNum = ref()
// 渲染中级管理员顶部信息
const getGeneralTopInfo = async()=> {
    junAdmNum.value = userStore.junAdmNum
    buildingNum.value = userStore.buildingNum
}

// 拥有哪些楼栋
let hasBuilding = ref<any>([])
const getHasBuilding = async () => {
    
    hasBuilding.value = useBuildingInfo.buildingInformation
}
// 选择楼栋
const selectBuilding = (e) => {
    // console.log("选择楼栋",e)
}


// 新增楼栋管理员所需的数据
let addFormData = ref({
    buildingId: '',
	nickname: '',
	password: '',
	username: ''
})
// 点击新增楼栋管理员
const addAdmin = () => {
    // 初始化表单对象
    Object.assign(addFormData, {
        buildingId: '',
        nickname: '',
        password: '',
        username: ''
    })
    // 清空上一次的表单校验
    nextTick(() => {
        // addForm.value.clearValidate()
        addFormData.value = {
            buildingId: '',
            nickname: '',
            password: '',
            username: ''
        }
    })    
    addDialogVisible.value = true
}
// 确定新增楼栋管理员
const addSave = async(addFromData) => {    
    // console.log("新的楼栋管理员信息", addFromData)
    let result: any = await addJuniorAdminInformation(addFromData) 
    // console.log("添加管理员结果", result)
    if (result.code === 200) {
        addDialogVisible.value = false
        ElMessage({
            type:"success",
            message:"新增成功"
        })
        getJuniorAdminInfo()
    }
    addDialogVisible.value = false
}

// 编辑的管理员信息
let updateForm = reactive({
    adminId: 0,
	buildingId: '',
	nickname: '',
	password: '',
	username: ''
})

// 修改初级管理员信息
const editData = (row) => {
    
    console.log("初级管理员个人row",row)
    Object.assign(updateForm,{
        adminId: row.adminId,
        buildingId: row.buildingId,
        nickname: row.nickname,
        password: row.password,
        username: row.username
    })
    updateDialogVisible.value = true
    // console.log("表格信息",updateForm)
}
// 确认修改管理员信息
const updateSave = async() => {
    let result:any = await updateJuniorAdminInformation(updateForm)
    // console.log("修改信息",result)
    if(result.code === 200){
        ElMessage({
            type: 'success',
            message: '修改成功'
        })
        getJuniorAdminInfo()
        updateDialogVisible.value = false
    }
    updateDialogVisible.value = false
}
let delForm = reactive({
    adminId:0
})
// 确认删除管理员
const deleteAdmin = async(row) => {
    console.log("row",row)
    console.log("row",row.adminId)
    Object.assign(delForm,{
        adminId: row.adminId
    })
    console.log("删除",delForm)
    let result:any = await delJuniorAdmin(delForm)
    if(result.code === 200){
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getJuniorAdminInfo()
    }
}

getJuniorAdminInfo()
// 页面挂载
onMounted(() => {
    getJuniorAdminInfo()
    getGeneralTopInfo()
    getHasBuilding()
})
// 当前页数发生改变时触发
const handleCurrentChange = () => {
    
}
// 每页条数发生改变时触发
const handleSizeChange = () => {
    
}

// 楼栋id验证
const validatorBuildingId = (rule: any, value: any, callback: any) => {
    if (typeof value === 'number') {
        callback()
    } else {
        callback(new Error('请选择所属楼栋'))
    }
}
// 账号拥有者昵称验证
const validatorNickname = (rule: any, value: any, callback: any)=>{
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error("账号拥有者昵称至少2位以上"))
    }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('密码长度必须大于或等于5位'))
    }
}
const validatorUsername = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户名必须大于或等于5位'))
    }
}

// 表单规则
const Rules = reactive({
    buildingId: [{required: true, trigger: 'blur', validator: validatorBuildingId}],
    nickname:  [{required: true, trigger: 'blur', validator: validatorNickname}],
    password:  [{required: true, trigger: 'blur', validator: validatorPassword}],
    username: [{required: true, trigger: 'blur', validator: validatorUsername}]
})



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