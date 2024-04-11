<template>
    <div class="charts" ref="charts">
        buildingChart
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

let charts = ref()

onMounted(()=>{
    let myCharts = echarts.init(charts.value)
    myCharts.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
})

</script>

<style scoped lang='scss'>
.charts {
    width: 100%;
    height: 500px;
}
</style>