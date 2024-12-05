<script setup>
import { onMounted, reactive, ref } from "vue";
import Plotly from 'plotly.js/dist/plotly';
import * as echarts from 'echarts';
import 'echarts-gl'
import API from "@/api";

import { echartsData } from './echarts/data'
const scatterData = ref(null); // 引用存储散点数据
const contourData = ref(null); // 引用存储等高线数据

// 计算刻度的合适范围，并增加10%的缓冲区
const getAdjustedRange = (min, max) => {
    const buffer = (max - min) * 0.2; // 10%的缓冲区
    return [min - buffer, max + buffer];
};

// 获取数据的函数
const fetchDataTime = () => {
    try {
        // Use the imported data from data.js
        // const responseData = echartsData;

        const responseData = [];
        let params = {}
        params.Device_Name = "VPA1"
        params.dataType = "DeviceDetectionRecently"
        params.output = "Device_Name,recently_v,recently_t"
        API.getData(params).then(res => {

            const responseData = res.data

            // 提取 scatterX 和 scatterY
            const scatterX = responseData.map((item) => item.recently_v);
            const scatterY = responseData.map((item) => item.recently_t);

            // 计算 x 和 y 的最小值和最大值
            const xMin = Math.min(...scatterX);
            const xMax = Math.max(...scatterX);
            const yMin = Math.min(...scatterY);
            const yMax = Math.max(...scatterY);

            // 调整后的 x 和 y 轴范围，增加缓冲区
            const [adjustedXMin, adjustedXMax] = getAdjustedRange(xMin, xMax);
            const [adjustedYMin, adjustedYMax] = getAdjustedRange(yMin, yMax);

            // 构建散点图数据
            scatterData.value = {
                x: scatterX,
                y: scatterY,
                mode: 'markers',
                name: '散点数据',
                marker: {
                    color: 'rgba(0, 0, 0, 0.3)', // 灰色点
                    size: 3, // 点大小
                },
                type: 'scatter',
            };

            // 构建等高线数据
            contourData.value = {
                x: scatterX,
                y: scatterY,
                type: 'histogram2dcontour',
                colorscale: 'Jet', // 使用颜色渐变
                contours: {
                    // start: 0, // 等高线从0开始
                    // end: 10000, // 到10000结束
                    // size: 100000, // 控制每个等高圈的大小
                    coloring: 'heatmap',
                    showlines: true, // 显示等高线
                },
                opacity: 0.4, // 设置透明度
            };

            // 渲染图表
            renderPlotlyChart(
                adjustedXMin,
                adjustedXMax,
                adjustedYMin,
                adjustedYMax,
            );

        })

        // let params = {}
        // params.Device_Name = equ.Device_Name
        // params.dataType = "DeviceDetectionHistory"
        // params.output = "Device_Name,recently_v,recently_t"
        // API.getData(params).then(res => {

        // })
    } catch (error) {
        console.error('Error processing data:', error);
    }
};

// 渲染 Plotly 图表
const renderPlotlyChart = (xMin, xMax, yMin, yMax) => {
    if (scatterData.value && contourData.value) {
        const data = [contourData.value, scatterData.value];

        const layout = {
            title: '',
            xaxis: {
                title: '振动',
                gridcolor: 'rgba(200, 200, 200, 0.3)', // X轴网格线颜色
                tickvals: [xMin, (xMin + xMax) / 2, xMax], // 动态生成刻度
                range: [xMin, xMax], // 根据数据动态设置 x 轴范围
            },
            yaxis: {
                title: '温度',
                gridcolor: 'rgba(200, 200, 200, 0.3)', // Y轴网格线颜色
                tickvals: [yMin, (yMin + yMax) / 2, yMax], // 动态生成刻度
                range: [yMin, yMax], // 根据数据动态设置 y 轴范围
            },
            showlegend: false, // 不显示图例
            autosize: true,
            paper_bgcolor: '#ffffff', // 背景白色
            plot_bgcolor: '#ffffff', // 图表区域背景白色
            margin: {
                l: 90,
                r: 10,
                b: 50,
                t: 20,
                pad: 4,
            },
            colorbar: {
                title: 'Density',
                thickness: 20, // 增加图例宽度
                len: 1, // 让图例覆盖整个高度
                titleside: 'right',
                // tickvals: [10, 100, 1000, 10000], // 修改为与图片中相同的刻度
                ticks: 'outside', // 刻度显示在外部
                // ticktext: ['10', '100', '1000', '10000'], // 正确显示10, 100, 1000, 10000
                tickfont: {
                    size: 14, // 刻度字体大小
                    // color: '#4F4F4F', // 刻度字体颜色
                },
                outlinewidth: 1, // 图例外框线宽度
                // outlinecolor: 'black', // 图例外框线颜色
            },
        };

        const config = { responsive: true };
        Plotly.newPlot('plot', data, layout, config);
    }
};

onMounted(() => {
    fetchDataTime(); // 获取数据
});


</script>

<template>
    <div id="plot" class="container-content-blockRow-right-block2-left-dom"> </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-right-block2-left-dom {
    width: 100%;
    height: 90%;
    overflow: hidden;
    background-color: red;
}
</style>
