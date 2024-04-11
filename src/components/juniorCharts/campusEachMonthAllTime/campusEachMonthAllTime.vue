<template>
    <div ref="campusAllTime-layout" class="campusAllTime-layout">
        <div class="title">{{ title }}</div>
        <div class="title">近12个月每个月的合计通电时长</div>
        <div ref="campusAllTime" id="campusAllTime" class="campusAllTime"></div>
    </div>
</template>
    
<script setup name="campusEachMonthAllTime">
import {ref,computed,onMounted} from 'vue'
import * as echarts from 'echarts'
import {reqCampusEachMonthAllTime} from '@/api/buildingChart'

let schoolName = ref("")
let campusName = ref("")
let campusAllTime = ref()
let monthTimes = ref([])
let title = computed(() => {
    return schoolName.value+campusName.value   
})
let month = []
let times = []
// 获取数据
const getAllTime = async() => {
    let result = await reqCampusEachMonthAllTime()
    console.log("数据", result)
    schoolName.value = result.data1.schoolName
    campusName.value = result.data1.campusName
    monthTimes.value = result.data1.monthTimes
    month = monthTimes.value.map((e) => e.month)
    console.log("month", month)
    times = monthTimes.value.map((e) => e.total)
    console.log("total",times)
}
onMounted(() => {
    let campusAllTimeChart = echarts.init(campusAllTime.value)
    getAllTime()
    let option = {
        xAxis: {
            type: 'category',
            data: ['2023-05','2023-06','2023-07','2023-08','2023-09','2023-10','2023-11','2023-12','2024-01','2024-02','2024-03','2024-04']
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
    campusAllTimeChart.setOption(option)
})


</script>
    
<style lang='scss' scoped>
.campusAllTime-layout{
    width: 100%;
    height: 100%;
    .title{
        display: flex;
        height: 20px;
        line-height: 20px;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    .campusAllTime{
        width: 100%;
        height: 300px;
        
    }
}
</style>