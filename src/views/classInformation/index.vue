<template>
    <div class="container1">
        <div class="information">
            <div class="schoolQuantity" style="background-color: #53BD58;"> 
                <svgIcon :name="'class'" :width="'50px'" :height="'50px'"></svgIcon>
                <div class="quantityInformation">
                    <span>教室总数</span>
                    <span>{{classroomNum}}</span>
                </div>
            </div>
        </div>
        <div class="button">
            <el-button type="primary" @click="addClassroom">录入教室信息</el-button>
            <el-button type="primary" @click="downloadClassroom()">下载模板</el-button>
        </div>
    </div>
    <div class="header">
            <el-table style="margin:10px 0px 10px 0px;" :data="classRoomInformation" :header-cell-style="customHeaderCellStyle">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="楼栋" prop="building"></el-table-column>
                <el-table-column label="教室" prop="classroomName"></el-table-column>
                <el-table-column label="ESPID" prop="espId"></el-table-column>
                <el-table-column label="摄像头ID" prop="cameraId"></el-table-column>
                <el-table-column label="最小人数" prop="numLimitOn"></el-table-column>
                <el-table-column label="通电温度" prop="temperatureLimitOn"></el-table-column>
                <el-table-column label="断电温度" prop="temperatureLimitOff"></el-table-column>
                <el-table-column label="分流阈值" prop="numPeakFlow"></el-table-column>
                <el-table-column label="理论容量" prop="classroomCapacity"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                    <el-popconfirm title="确定要删除吗?" @confirm="deleteClass(row)">
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
import { ref,onMounted,reactive,nextTick } from 'vue'
import { reqClassInformation,reqJuniorAdminInformation,reqDeleteClassroomData,reqAddOrUpdateClass,reqDownloadClasssroom } from '@/api/juniorAdmin'
import type { hasClassData, responseClassData,responseClassroomNumData,FileRaw } from '@/api/juniorAdmin/type'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus';
const pageSize4 = ref(10)
const currentPage4 = ref(1)
const UserStore = useUserStore()
let classroomNum = ref(3)
console.log(typeof (parseInt(UserStore.buildingId)))
let dialogVisible = ref<boolean>(false)
let FileList = []
let TemFilelist = reactive<FileRaw[]>([])

let classRoomInformation = ref<hasClassData[]>([])

// 获取楼栋信息
const getHasClass = async ()=>{
    let result:responseClassData = await reqClassInformation(parseInt(UserStore.buildingId),currentPage4.value)
    console.log(result)
    if (parseInt(UserStore.buildingId) == 1) {
        result.data1.forEach((item, index) => {
            //  console.log(index,item)
            item['building'] = '教学楼'
            // console.log(item)
        })
    }    
    // console.log(result.data1)
    classRoomInformation.value = result.data1
    // console.log(classRoomInformation.value)
    
}

onMounted(()=>{
    getHasClass()
    reqClassroomNum()
})
// 获取教室数量
const reqClassroomNum = async() => {
    // 获取教室数量
    let result:responseClassroomNumData = await reqJuniorAdminInformation()
    console.log("顶端", result)
    classroomNum.value = result.data1.classroomNum
}

let delClassData = reactive<any>({
    buildingId: parseInt(UserStore.buildingId),
    classroomName:'201'
})
// 删除教室信息
const deleteClass = async (row: any) => {
    let { classroomName } = row
    let buildingId = parseInt(UserStore.buildingId)
    Object.assign(delClassData, {
        buildingId: buildingId,
        classroomName:classroomName
    })
    console.log(delClassData)
    let result: any = await reqDeleteClassroomData(delClassData)
    console.log("删除教室信息", result)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasClass()
        reqClassroomNum()
    }
}

// 录入教室信息
const addClassroom = () => {
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
    let result: any = await reqAddOrUpdateClass(param)
    console.log("上传文件情况", result)
    if(result.code == 200) {
        ElMessage({
            type: 'success',
            message: '上传成功'
        })
        getHasClass()
        reqClassroomNum()
    }else {
        ElMessage({
            type: 'error',
            message: '上传失败'
        })
    }
    dialogVisible.value = false
}


// 下载模板
const downloadClassroom = () => {
    reqDownloadClasssroom().then(res => {
        // console.log(res)
        const fileName = 'classroomInfoTemplate.xlsx'
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


// 当前页数发生改变时触发
const handleSizeChange = () => {
    getHasClass()
    reqClassroomNum()
}

// 每页条数发生改变时触发
const handleCurrentChange = () => {
    getHasClass()
    reqClassroomNum()
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
    }else if(columnIndex === 10) {   
        return {
            color: 'white',
            backgroundColor: '#608CBF',
            borderTopRightRadius: '11px', // 设置右上角为圆角
            borderBottomRightRadius: '11px', // 设置右下角为圆角
        }
    }else if(columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8 || columnIndex === 9) {
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