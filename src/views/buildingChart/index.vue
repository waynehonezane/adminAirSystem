<template>
    <div class="charts-layout">
        <campusEachMonthAllTime class="charts1"/>
        <campusAllBuildingThisMonthTime class="charts2"/>
        <buildingEachMonthAllTime class="charts3"/>
    </div>
</template>

<script setup lang='ts' name="buildingChart">
import campusEachMonthAllTime from '@/components/juniorCharts/campusEachMonthAllTime/campusEachMonthAllTime.vue'
import campusAllBuildingThisMonthTime from '@/components/juniorCharts/campusAllBuildingThisMonthTime/campusAllBuildingThisMonthTime.vue'
import buildingEachMonthAllTime from '@/components/juniorCharts/buildingEachMonthAllTime/buildingEachMonthAllTime.vue'
</script>

<style scoped lang='scss'>
.charts-layout{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .charts1{
        width: 100%;
        height: 33%;
    }
    .charts2{
        width: 100%;
        height: 33%;
    }
    .charts3{
        width: 100%;
        height: 33%;
    }

}
</style>