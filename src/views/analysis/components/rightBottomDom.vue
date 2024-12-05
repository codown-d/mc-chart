<script setup>
import { onMounted, reactive, ref } from "vue";
import { Chart } from '@antv/g2';
import { median } from 'd3-array';
import dayjs from "dayjs";
import { BottomData } from '../../preventive/echarts/data1'
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
        .axis('x', { title: 'date' });
    chart.legend(false)
    chart.render();
});

</script>

<template>
    <div class="container-content-blockRow-right-block1-dom">
        <div id="BottomData"></div>
    </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-right-block1-dom {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 95%;
}
.container-content-blockRow-right-block1-dom-dd {
    width: 100%;
    height: 100%;
}
</style>
