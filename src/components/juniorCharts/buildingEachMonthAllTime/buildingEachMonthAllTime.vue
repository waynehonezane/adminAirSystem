<template>
    <div class="buildingEachMonthAllTime-layout">
        <div class="title">{{ title }}</div>
        <div class="title">各个楼栋本月通电时长</div>
        <div ref="buildingEachMonthAllTime" id="buildingEachMonthAllTime" class="buildingEachMonthAllTime"></div>
    </div>
</template>
    
<script setup name="buildingEachMonthAllTime">
import {ref,computed,onMounted} from 'vue'
import * as echarts from 'echarts'
import { reqBuildingEachMonthAllTime } from '@/api/buildingChart'

let schoolName = ref("仲恺农业工程学院")
let campusName = ref("海珠校区")
let buildingEachMonthAllTime = ref()
let buildingsTime = ref([])
let buildingId = ref(1)
let title = computed(() => {
    return schoolName.value+campusName.value   
})
let buildingName = []
let timesValue = []
// 获取数据
const getAllTime = async() => {
    let result = await reqBuildingEachMonthAllTime(buildingId)
    console.log("数据3", result)
    schoolName.value = result.data1.schoolName
    campusName.value = result.data1.campusName
    buildingsTime.value = result.data1.buildingsThisMonthTime
    buildingName = buildingsTime.value.map((e) => e.buildingName)
    // console.log("buildingName", buildingName)
    timesValue = buildingsTime.value.map((e) => e.total)
    // console.log("total2",times)
}
onMounted(() => {
    let buildingEachMonthAllTimeChart = echarts.init(buildingEachMonthAllTime.value)
    // getAllTime()
    let option = {
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [120, 200, 150, 80, 70, 110, 130,150,100,75,85,99],
            type: 'bar'
            }
        ]
    }
    buildingEachMonthAllTimeChart.setOption(option)
})
</script>
    
<style lang='scss' scoped>
.buildingEachMonthAllTime-layout{
    width: 100%;
    height: 100%;
    .title{
        display: flex;
        height: 20px;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    .buildingEachMonthAllTime{
        width: 100%;
        height: 300px;
    }
}
</style>