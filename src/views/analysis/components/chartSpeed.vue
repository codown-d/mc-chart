<script setup>
import { onMounted, reactive, ref } from "vue";
import Plotly from 'plotly.js/dist/plotly';
import * as echarts from 'echarts';
import 'echarts-gl'
const viewportWidth = window.innerWidth;
const chartSpeed = ref(null);
const fontSize = viewportWidth > 1500 ? 14 : viewportWidth > 768 ? 10 : 8;
const axisLineWidth = viewportWidth > 1500 ? 30 : viewportWidth > 768 ? 20 : 18;
const titleSize = viewportWidth > 1500 ? 18 : viewportWidth > 768 ? 12 : 12;
const props = defineProps({
    title: {
        type: String,
        default: false
    },
    value: {
        type: String,
        default: false
    },
    style: {
        type: Object,
        default: {}
    }
});

onMounted(() => {
    // 第一个图表 - Annual Aging Status
    let chartSpeedChart = echarts.init(chartSpeed.value);
    var dataArr = [
        {
            value: props.value,
            name: props.title,
        },
    ];

    let speedOption = {
        title: {
            text: props.title,
            left: "center",
            bottom: "0%",
            textStyle: {
                color: "#6B767B",
                fontSize: titleSize,
            },
        },
        tooltip: {
            formatter: "{a} <br/>{b}",
        },
        series: [
            {
                type: "gauge",
                radius: "80%",
                startAngle: "245",
                endAngle: "-60",
                splitNumber: 2,
                center: ["50%", "45%"],
                min: 0,
                max: 8000,
                pointer: {
                    show: true,
                },
                detail: {
                    formatter: function (value) {
                        var num = Math.round(value);
                        return `[${num}]`
                    },
                    textStyle: {
                        color: '#0087D3',
                        fontSize: titleSize
                    },
                    offsetCenter: ["5%", "90%"],
                },
                data: dataArr,
                title: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [[0.9, '#0087D3'], [1, '#FFBF00']],
                        width: axisLineWidth,
                        // shadowBlur: 15,
                        // shadowColor: '#B0C4DE',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        opacity: 1,
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    length: 10,
                    lineStyle: {
                        color: "#00377a",
                        width: 2,
                        type: "solid",
                    },
                },

                axisLabel: {
                    color: "#0087D3",
                    fontSize: fontSize,
                },
                animationDuration: 4000,
            },

            {
                name: "白色圈刻度",
                type: "gauge",
                radius: "60%",
                startAngle: 245,
                endAngle: -65,
                center: ["50%", "45%"],
                min: 0,
                max: 400,
                splitNumber: 2,
                z: 4,
                axisTick: {
                    show: false,
                },
                splitLine: {
                    length: 0, //刻度节点线长度
                    lineStyle: {
                        width: 2,
                        color: "#0087D3",
                    }, //刻度节点线
                },
                //刻度节点文字颜色
                pointer: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        opacity: 0,
                    },
                },
                detail: {
                    show: false,
                },
                data: [
                    {
                        value: 2,
                        name: "",
                    },
                ],
            },
            {
                //内圆
                type: "pie",
                radius: "40%",
                center: ["50%", "45%"],
                z: 1,
                itemStyle: {
                    normal: {
                        color: '#EBF5FB',
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                    },
                },
                hoverAnimation: false,
                label: {
                    show: false,
                },
                tooltip: {
                    show: false,
                },
                data: [2],
                animationType: "scale",
            },

        ],
    };

    chartSpeedChart.setOption(speedOption);
});


</script>

<template>
    <div ref="chartSpeed" class="chartSpeed" :style="props.style"> </div>
</template>

<style lang="less" scoped>
.chartSpeed {
    width: 25%;
    height: 92%;
    padding-top: 20px;
    overflow: hidden;
}
</style>
