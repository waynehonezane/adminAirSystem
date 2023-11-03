<template>
    <div class="contaner1">
        <div class="button">
            <el-button type="primary">录入教室信息</el-button>
            <el-button type="primary">下载模板</el-button>
        </div>
    </div>
    <div class="header">
            <el-table style="margin:10px 0px 10px 0px;" :data="schoolAdmin" :header-cell-style="customHeaderCellStyle">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="楼栋" prop="building"></el-table-column>
                <el-table-column label="教室" prop="buildingName"></el-table-column>
                <el-table-column label="ESPID" prop="ESPID"></el-table-column>
                <el-table-column label="摄像头ID" prop="cameraID"></el-table-column>
                <el-table-column label="最小人数" prop="minNumber"></el-table-column>
                <el-table-column label="通电温度" prop="powerTemperature"></el-table-column>
                <el-table-column label="断电温度" prop="unPowerTemperature"></el-table-column>
                <el-table-column label="分流阈值" prop="shuntThreshold"></el-table-column>
                <el-table-column label="理论容量" prop="theoreticalCapacity"></el-table-column>
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
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="pagination"
            />
    </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'

const pageSize4 = ref(10)
const currentPage4 = ref(1)

let schoolAdmin = ref([
    {
        building: '教学楼',
        buildingName: 'B501',
        ESPID: 'ESP8266',
        cameraID: 'jslb501',
        minNumber: 20,
        powerTemperature: '28°C',
        unPowerTemperature: '17°C',
        shuntThreshold: 30,
        theoreticalCapacity: 120
    },
    {
        building: '教学楼',
        buildingName: '505',
        ESPID: 'ESP8266',
        cameraID: 'jslb505',
        minNumber: 20,
        powerTemperature: '28°C',
        unPowerTemperature: '17°C',
        shuntThreshold: 30,
        theoreticalCapacity: 120
    },
    {
        building: '教学楼',
        buildingName: '201',
        ESPID: 'ESP8266',
        cameraID: 'jslb201',
        minNumber: 20,
        powerTemperature: '28°C',
        unPowerTemperature: '17°C',
        shuntThreshold: 30,
        theoreticalCapacity: 120
    },
])

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
.contaner1 {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-right: 30px;
    height: 40px;
}
.header {
    padding:10px 15px 15px 15px;
    box-sizing: border-box;
    height: 85vh;
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