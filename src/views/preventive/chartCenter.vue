<script setup>
import { onMounted, reactive, ref } from "vue";
import Plotly from 'plotly.js/dist/plotly';
import * as echarts from 'echarts';
import 'echarts-gl'
const viewportWidth = window.innerWidth;
const fontSize = viewportWidth > 1500 ? 14 : viewportWidth > 768 ? 10 : 8;
const itemGap = viewportWidth > 1500 ? 30 : viewportWidth > 768 ? 10 : 8;
const preventiveCenterDom = ref(null);
onMounted(() => {
    // 第一个图表 - Annual Aging Status
    let preventiveCenterChart = echarts.init(preventiveCenterDom.value);
    let preventiveCenterOption = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: [
                { name: 'Standard aging', icon: 'rect' },
                {
                    name: 'Estimated aging before monitoring',
                    lineStyle: {
                        width: 3,
                        color: '#ccc',
                    },
                }, // 灰色虚线
                {
                    name: 'Actual aging',
                    lineStyle: {
                        width: 3,
                        color: '#3495fa',
                    },
                }, // 蓝色实线
                {
                    name: 'Average prediction',
                    lineStyle: {
                        width: 3,
                        color: '#3495fa',
                    },
                }, // 蓝色虚线
                {
                    name: 'Current month',
                    lineStyle: {
                        width: 3,
                        color: '#000',
                    },
                }, // 黑色实线
                {
                    name: 'Commissioning day',
                    lineStyle: {
                        width: 3,
                        color: '#ccc',
                    },
                }, // 黑色虚线
                {
                    name: 'Start planning Preventive Maintenance',
                    lineStyle: {
                        width: 3,
                        color: '#ffcc00',
                    },
                }, // 黄色虚线
                {
                    name: 'Execute Preventive Maintenance',
                    lineStyle: {
                        width: 3,
                        color: 'red',
                    },
                }, // 红色虚线
            ],
            formatter: function (name) {
                // const colorMap = {
                //   'Standard aging': '#99ccff',
                //   'Estimated aging before monitoring': '#ccc',
                //   'Actual aging': '#0000ff',
                //   'Average prediction': '#0000ff',
                //   'Current month': '#000000',
                //   'Commissioning day': '#000000',
                //   'Start planning Preventive Maintenance': '#ffcc00',
                //   'Execute Preventive Maintenance': '#ff0000',
                // };

                if (name === 'Standard aging') {
                    return '{rect| } ' + name;
                }
                return '{line| } ' + name;
            },
            textStyle: {
                rich: {
                    rect: {
                        width: 0, // 控制方块的大小
                        height: 30,
                        align: 'center',
                        backgroundColor: 'rgba(153, 204, 255, 0.2)', // 浅蓝色背景
                    },
                    line: {
                        width: 0,
                        height: 30,
                        align: 'center',
                    },
                },
                fontSize: fontSize,
                color: '#000',
            },
            right: '0%',
            top: 'center',
            orient: 'vertical', // 图例垂直排列
        },
        grid: {
            left: '5%',
            right: '30%',
            top: '10%',
            bottom: '10%',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
                '2021-01',
                '2021-02',
                '2021-03',
                '2021-04',
                '2021-05',
                '2021-06',
                '2021-07',
                '2021-08',
                '2021-09',
                '2021-10',
                '2021-11',
                '2021-12',
                '2022-01',
                '2022-02',
                '2022-03',
                '2022-04',
                '2022-05',
                '2022-06',
                '2022-07',
                '2022-08',
                '2022-09',
                '2022-10',
                '2022-11',
                '2022-12',
                '2023-01',
                '2023-02',
                '2023-03',
                '2023-04',
                '2023-05',
                '2023-06',
                '2023-07',
                '2023-08',
                '2023-09',
                '2023-10',
                '2023-11',
                '2023-12',
                '2024-01',
                '2024-02',
                '2024-03',
                '2024-04',
                '2024-05',
                '2024-06',
                '2024-07',
                '2024-08',
                '2024-09',
                '2024-10',
                '2024-11',
                '2024-12',
                '2025-01',
                '2025-02',
                '2025-03',
                '2025-04',
                '2025-05',
                '2025-06',
                '2025-07',
                '2025-08',
                '2025-09',
                '2025-10',
                '2025-11',
                '2025-12',
                '2026-01',
                '2026-02',
                '2026-03',
                '2026-04',
                '2026-05',
                '2026-06',
                '2026-07',
                '2026-08',
                '2026-09',
                '2026-10',
                '2026-11',
                '2026-12',
                '2027-01',
                '2027-02',
                '2027-03',
                '2027-04',
                '2027-05',
                '2027-06',
                '2027-07',
                '2027-08',
                '2027-09',
                '2027-10',
                '2027-11',
                '2027-12',
                '2028-01',
                '2028-02',
                '2028-03',
                '2028-04',
                '2028-05',
                '2028-06',
                '2028-07',
                '2028-08',
                '2028-09',
                '2028-10',
                '2028-11',
                '2028-12',
                '2029-01',
                '2029-02',
                '2029-03',
                '2029-04',
                '2029-05',
                '2029-06',
                '2029-07',
                '2029-08',
                '2029-09',
                '2029-10',
                '2029-11',
                '2029-12',
                '2030-01',
                '2030-02',
                '2030-03',
                '2030-04',
                '2030-05',
                '2030-06',
                '2030-07',
                '2030-08',
                '2030-09',
                '2030-10',
                '2030-11',
                '2030-12',
                '2031-01',
                '2031-02',
                '2031-03',
                '2031-04',
                '2031-05',
                '2031-06',
                '2031-07',
                '2031-08',
                '2031-09',
                '2031-10',
                '2031-11',
                '2031-12',
            ],
            axisLine: {
                lineStyle: {
                    color: '#999',
                },
            },
            axisLabel: {
                color: '#333',
                formatter: function (value) {
                    const year = value.split('-')[0];
                    if (value.endsWith('-01')) {
                        return year; // 只在每年一月份时显示年份
                    }
                    return ''; // 其他月份不显示标签
                },
                interval: 0, // 每 12 个刻度（每年）显示一次标签
            },
            axisTick: {
                alignWithLabel: true,
            },
        },
        yAxis: {
            type: 'value',
            name: 'Available Lifetime (%)',
            max: 100,
            min: 0,
            nameLocation: 'middle', // 将名称显示在中间位置
            nameRotate: 90, // 旋转名称，使其垂直显示在左侧
            nameGap: 50, // 控制名称与Y轴的距离
            axisLine: {
                lineStyle: {
                    color: '#999',
                },
            },
            axisLabel: {
                color: '#333',
                formatter: function (value) {
                    return value + '%'; // 将刻度值格式化为百分比
                },
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
        },

        series: [
            {
                name: 'Standard aging',
                type: 'line',
                areaStyle: {
                    color: 'rgba(153, 204, 255, 0.2)', // 设置为面积图
                },
                data: Array.from(
                    { length: 120 },
                    (_, i) => 100 - (i * 100) / 120,
                ), // 从2016年10月到2025年10月，共109个月，生成从100到0的递减数据
                lineStyle: {
                    color: '#99ccff',
                    width: 0,
                },
                showSymbol: false, // 隐藏圆点，保持为直线
            },
            {
                name: 'Actual aging',
                type: 'line',
                data: Array.from({ length: 130 }, (_, i) =>
                    i < 40 ? null : 100 - (i * 100) / 132,
                ).slice(0, 45), // 前面15个数据用null，保留2018年1月到2019年1月
                lineStyle: {
                    color: '#3495fa',
                    width: 3,
                },
                itemStyle: {
                    color: '#3495fa',
                },
                showSymbol: false, // 隐藏圆点
            },
            {
                name: 'Average prediction',
                type: 'line',
                data: Array.from({ length: 133 }, (_, i) =>
                    i < 45 ? null : 100 - (i * 100) / 132,
                ), // 前28个数据用null，保留从2019年1月以后的数据
                lineStyle: {
                    type: 'dotted', // 虚线样式
                    color: '#3495fa',
                    width: 3,
                },
                itemStyle: {
                    color: '#3495fa',
                },
                showSymbol: false, // 隐藏圆点
            },
            {
                name: 'Estimated aging before monitoring',
                type: 'line',
                data: Array.from(
                    { length: 133 },
                    (_, i) => 100 - (i * 100) / 132,
                ).slice(0, 41), // 获取从2016年10月到2018年1月的前16个月数据
                lineStyle: {
                    type: 'dotted', // 虚线样式
                    color: '#ccc',
                    width: 3,
                },
                itemStyle: {
                    color: '#ccc', // 圆点颜色设置为红色
                },
                showSymbol: false, // 隐藏圆点
            },

            {
                name: 'Commissioning day',
                type: 'line',
                markLine: {
                    data: [{ xAxis: '2024-05' }],
                    lineStyle: {
                        color: 'black',
                        width: 2,
                        color: '#ccc',
                    },
                    symbol: ['none', 'none'], // 去掉箭头
                    label: {
                        show: false, // 隐藏线上的标签
                    },
                },
                itemStyle: {
                    color: '#ccc', // 圆点颜色设置为红色
                },
                showSymbol: false, // 隐藏圆点
            },
            {
                name: 'Current month',
                type: 'line',
                markLine: {
                    data: [{ xAxis: '2024-09' }],
                    lineStyle: {
                        color: 'black',
                        width: 2,
                        type: 'solid', // 确保是直线
                    },
                    symbol: ['none', 'none'], // 去掉箭头

                    label: {
                        show: false, // 隐藏线上的标签
                    },
                },
                itemStyle: {
                    color: '#000', // 圆点颜色设置为红色
                },
                showSymbol: false, // 隐藏圆点
            },
            {
                name: 'Start planning Preventive Maintenance',
                type: 'line',
                markLine: {
                    data: [{ xAxis: '2030-01' }],
                    lineStyle: {
                        color: '#ffcc00',
                        width: 2,
                    },
                    symbol: ['none', 'none'], // 去掉箭头
                    label: {
                        show: false, // 隐藏线上的标签
                    },
                },
                itemStyle: {
                    color: '#ffcc00', // 圆点颜色设置为红色
                },
                showSymbol: false, // 隐藏圆点
            },
            {
                name: 'Execute Preventive Maintenance',
                type: 'line',
                markLine: {
                    data: [{ xAxis: '2031-01' }],
                    lineStyle: {
                        color: '#ff0000',
                        width: 2,
                    },
                    symbol: ['none', 'none'], // 去掉箭头
                    label: {
                        show: false, // 隐藏线上的标签
                    },
                },
                itemStyle: {
                    color: '#red', // 圆点颜色设置为红色
                },
                showSymbol: false, // 隐藏圆点
            },
            {
                type: 'line',
                markArea: {
                    silent: true, // 确保标记区域不会触发鼠标事件
                    data: [
                        [
                            {
                                xAxis: '2021-01',
                                yAxis: 0,
                                itemStyle: { color: '#ccc' },
                            }, // 灰色区域，放置在Y轴底部
                            { xAxis: '2024-05', yAxis: 10 },
                        ],

                        [
                            {
                                xAxis: '2024-05',
                                yAxis: 0,
                                itemStyle: { color: '#22B14C' },
                            }, // 黄色区域
                            { xAxis: '2030-01', yAxis: 10 },
                        ],
                        [
                            {
                                xAxis: '2030-01',
                                yAxis: 0,
                                itemStyle: { color: '#ffd800' },
                            }, // 红色区域
                            { xAxis: '2031-01', yAxis: 10 },
                        ],
                        [
                            {
                                xAxis: '2031-01',
                                yAxis: 0,
                                itemStyle: { color: '#FF4500' },
                            }, // 红色区域
                            { xAxis: '2031-12', yAxis: 10 },
                        ],
                    ],
                    label: {
                        position: 'bottom', // 设置标签的位置
                        color: '#000', // 标签颜色
                        fontSize: 12,
                    },
                },
            },
        ],
    };
    preventiveCenterChart.setOption(preventiveCenterOption);
});


</script>

<template>
    <div ref="preventiveCenterDom" class="container-content-blockRow-right-block2-left-dom"> </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-right-block2-left-dom {
    width: 100%;
    height: 94%;
    overflow: hidden;
}
</style>
