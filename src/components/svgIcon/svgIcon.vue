<template>
    <svg :style="{width,height}">
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang='ts'>
defineProps({
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    }
})

</script>

<style scoped lang='scss'>

</style>