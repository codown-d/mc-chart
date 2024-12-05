<script setup>
import { onMounted, reactive, ref } from "vue";
import Plotly from 'plotly.js/dist/plotly';
import * as echarts from 'echarts';
import { Chart } from '@antv/g2';
import 'echarts-gl'

const chartCurve = ref(null);


const props = defineProps({
    refId: {
        type: String,
        default: ''
    },
});

// console.log('props', props);


onMounted(() => {

    const data = [
        { month: 'Jan', city: 'Tokyo', temperature: 7 },
        { month: 'Jan', city: 'London', temperature: 3.9 },
        { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
        { month: 'Feb', city: 'London', temperature: 4.2 },
        { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
        { month: 'Mar', city: 'London', temperature: 5.7 },
        { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
        { month: 'Apr', city: 'London', temperature: 8.5 },
    ];

    const chart = new Chart({
        container: props.refId,
        autoFit: true,
    });

    chart
        .data(data)
        .encode('x', 'month')
        .encode('y', 'temperature')
        .encode('color', 'city')
        .scale('y', {
            nice: true,
        })
        .scale('x', {
            range: [0, 1],
        })


    // 绘制线条
    chart
        .line().encode('shape', 'smooth')
        .scale('y', {
            nice: true,
        })
        .axis('x', {
            // 隐藏 x 轴的标签和轴线，但保留网格线
            label: null,
            line: null,
            title: null,
        })
        .axis('y', {
            // 隐藏 y 轴的标签和轴线，但保留网格线
            label: null,
            line: null,
            title: null,

        })
        .legend(false) // 禁用图例
        .tooltip(false) // 禁用工具提示
    // .coordinate().reflect('y'); // 反射坐标系，使其适应数据

    chart.render();
});


</script>

<template>
    <div ref="chartCurve" class="chartCurve" :id="props.refId"> </div>
</template>

<style lang="less" scoped>
.chartCurve {
    width: 100%;
    height: 90%;
    overflow: hidden;
}
</style>
