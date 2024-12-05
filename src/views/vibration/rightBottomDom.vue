<script setup>
import { onMounted, reactive, ref } from "vue";
import { Chart } from '@antv/g2';
import { median } from 'd3-array';
import dayjs from "dayjs";
import { BottomData } from './echarts/data1'
const scatterData = ref(null); // 引用存储散点数据

onMounted(() => {
    const medianValue = median(BottomData, (d) => d.value);

    const chart = new Chart({
        container: 'BottomData',
        autoFit: true,
    });

    chart
        .line()
        .data(BottomData)
        .scale('y', { nice: true })
        .scale('x', { utc: true })
        .scale('color', {
            type: 'threshold',
            domain: [medianValue],
            range: ['green', 'red'],
        })
        .encode('x', (d) => new Date(d.date))
        .encode('y', 'value')
        .encode('shape', 'hvh')
        .encode('color', 'value')
        .encode('series', () => undefined)
        .style('gradient', 'y')
        .style('lineWidth', 1.5)
        .style('lineJoin', 'round')
        .axis('y', { title: null })
        .axis('x', { title: 'date' });
    chart.legend(false)
    chart.render();
});


</script>

<template>
    <div id="BottomData" class="container-content-blockRow-right-block2-right-dom">
    </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-right-block2-right-dom {
    width: 100%;
    height: 90%;
}
</style>
