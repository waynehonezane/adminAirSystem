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
            <el-button type="primary" @click="addBuilding">录入楼栋信息</el-button>
            <el-button type="primary" @click="downloadBuilding">下载模板</el-button>
        </div>
    </div>
    <div class="header">
            <el-table style="margin:10px 0px 10px 0px;" :data="schoolBuilding" :header-cell-style="customHeaderCellStyle">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="楼栋名称" prop="buildingName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-popconfirm title="确定要删除吗?" @confirm="deleteBuilding(row)">
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
            <el-dialog v-model="dialogVisible" title="上传教室信息文件">
                <el-upload
                    class="upload-demo"
                    drag
                    :file-list="FileList"
                    action="#"
                    :auto-upload="false"
                    :on-change="handleChange"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传Excel格式文件</div>
                </el-upload>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false,FileList = []">取消</el-button>
                    <el-button type="primary" @click="upload()">上传</el-button>
                </span>
                </template>
            </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted,reactive } from 'vue'
import useUserStore from '@/store/modules/user'
import usebuildingInformationStore from '@/store/modules/buildingInformation'
import { reqDownloadBuilding, reqAddOrUpdateBuilding ,reqBuildingInformation,reqdelBuilding} from '@/api/buildingInformation';
import { ElMessage } from 'element-plus';
import { FileRaw } from '@/api/juniorAdmin/type';


const pageSize4 = ref(9)
const currentPage4 = ref(1)
const userStore = useUserStore()
const useBuildingInfo = usebuildingInformationStore()

// 所有楼栋信息
let schoolBuilding = ref([])
const getAllSchoolBuilding = async() => {
    // 获取楼栋所需参数
    let allAdminAndBuilding = {
        "campusId": userStore.campusId,
        "pageNum": 1
      }
      // console.log("参数",allAdminAndBuilding)
      let result = await reqBuildingInformation(allAdminAndBuilding)
    schoolBuilding.value = result.data1
      console.log("schoolbuilding",schoolBuilding.value)
    // useBuildingInfo.getBuildingInfo()
    // schoolBuilding.value = useBuildingInfo.buildingInformation
    // console.log("所有楼栋", schoolBuilding.value)

    
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

// 下载模板
const downloadBuilding = () => {
    reqDownloadBuilding().then(res => {
        console.log(res)
        const fileName = 'buildingInfoTemplate.xlsx'
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }).catch(err => {
        console.log(err.response.data.message)
    })
}

let dialogVisible = ref<boolean>(false)
let FileList = []
let TemFilelist = reactive<FileRaw[]>([])
// 录入楼栋信息
const addBuilding = () => {
    dialogVisible.value = true
}
// 上传的文件数量改变
const handleChange = (file,fileList) => {
    FileList = fileList
    console.log('文件列表', FileList)
    TemFilelist = fileList
    console.log('文件列表111', TemFilelist[0].raw)
}
const upload = async () => {
    let param = new FormData()
    param.append("file",TemFilelist[0].raw)
    console.log("上传参数", param.get("file"))
    let result: any = await reqAddOrUpdateBuilding(param)
    console.log("上传文件情况", result)
    if(result.code == 200) {
        ElMessage({
            type: 'success',
            message: '上传成功'
        })
        getAllSchoolBuilding()
    }else {
        ElMessage({
            type: 'error',
            message: '上传失败'
        })
    }
    dialogVisible.value = false
}

let delBuildingData = reactive<any>({
    buildingId: 0,
})
// 删除楼栋信息
const deleteBuilding = async(row) => {
    console.log("del", row)
    Object.assign(delBuildingData, {
        buildingId: row.buildingId,
    })
    console.log("del",delBuildingData.buildingId)
    let result: any = await reqdelBuilding(delBuildingData.buildingId)
    console.log("delresult",result)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getAllSchoolBuilding()
        userStore.generalInformation
    }
}

onMounted(()=>{
    getGeneralTopInfo()
    getAllSchoolBuilding()
})

// 当前页数发生改变时触发
const handleSizeChange = () => {
    
}

// 每页条数发生改变时触发
const handleCurrentChange = () => {
    getAllSchoolBuilding()
}

const customHeaderCellStyle = ({row, column, rowIndex, columnIndex})=>{
    if(columnIndex === 0) {
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopLeftRadius: '11px', // 设置左上角为圆角
            borderBottomLeftRadius: '11px', // 设置左下角为圆角
        }
    }else if(columnIndex === 3) {   
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopRightRadius: '11px', // 设置右上角为圆角
            borderBottomRightRadius: '11px', // 设置右下角为圆角
        }
    }else if(columnIndex === 1 || columnIndex === 2) {
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