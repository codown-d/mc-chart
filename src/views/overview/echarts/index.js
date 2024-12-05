import { pxToVw } from '@/utils/ehartsFont'
const viewportWidth = window.innerWidth;
const fontSize = viewportWidth > 1500 ? 12 : viewportWidth > 768 ? 10 : 8;
const itemGap = viewportWidth > 1500 ? 20 : viewportWidth > 768 ? 15 : 12;


export const LayoutBlockLeft = () => {
    const indicators = [
        { text: "设备子系统", max: 100, score: 85 },
        { text: "异常检测评分", max: 100, score: 90 },
        { text: "剩余维护时间", max: 100, score: 70 },
        { text: "预测性维护评分", max: 100, score: 95 }
    ];
    const legendColor = ["#0087D3", "#13B5B3", "#91A2FB", '#FF9F56']
    const legendData = indicators.map(indicator => indicator.text);
    return {
        color: legendColor, //数据蛛网线条的颜色，示例中为红黄绿
        legend: {
            // 图例的设置
            show: true, // 是否显示图例
            top: 'center', // 图例离底部的距离
            left: 10, // 图例离左侧的距离
            orient: 'vertical', // 图例的排列方向，垂直排列
            itemWidth: fontSize, // 图例标记的图形宽度
            itemHeight: fontSize, // 图例标记的图形高度
            itemGap: itemGap, // 图例每项之间的间隔
            selectedMode: false, // 禁用图例的交互功能
            formatter: function (name) {
                const scores = {
                    "设备子系统": "85",
                    "异常检测评分": "90",
                    "剩余维护时间": "70",
                    "预测性维护评分": "95"
                };
                return name + ' ' + '{score|' + scores[name] + '分}';
            },
            textStyle: {
                // 图例文字的样式设置
                fontSize: fontSize,
                color: "#6B767B",
                width: viewportWidth > 1500 ? 120 : 100,
                rich: {
                    score: {
                        color: '#2C3133', // 分数的颜色
                        fontSize: fontSize, // 分数的字体大小
                        fontWeight: 'bold', // 分数的字体粗细
                        align: 'right', // 分数右对齐
                    }
                }
            },
            data: legendData
        },
        radar: [
            {
                //每个网格的指数名称，类似于X轴或Y轴上的数据的值大小
                indicator: indicators,
                center: [viewportWidth > 1500 ? "70%" : "78%", "50%"], //统计图位置，示例是居中
                radius: viewportWidth > 1500 ? '80%' : "75%", //统计图大小
                startAngle: 90, //统计图起始的角度
                splitNumber: 3, //统计图蛛网的网格分段，示例分为三段
                // shape: 'circle',//蛛网是圆角还是尖角
                name: {
                    show: false,
                },
                splitArea: {
                    // 蛛网在 grid 区域中的分隔区域，默认不显示。
                    show: true,
                    areaStyle: {
                        // 分隔区域的样式设置。
                        color: ["#F9FAFC"], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                    },
                },
                axisLine: {
                    //蛛网轴线上的颜色，由内向外发散的那条
                    lineStyle: {
                        color: "#E5E8EE",
                    },
                },
                splitLine: {
                    //蛛网环形的线条颜色
                    lineStyle: {
                        color: "#E5E8EE", // 分隔线颜色
                        width: 1, // 分隔线线宽
                    },
                },
            },
        ],

        series: [
            {
                name: "11",
                type: "radar", //统计图专业名称为雷达图，这里叫做蛛网图
                symbolSize: 0,
                data: legendData.map((items, index) => {
                    return {
                        name: legendData[index],
                        value: index === 0 ? [80, 30, 60, 43] : [0, 0, 0, 0],
                        itemStyle: {
                            fontSize,
                            normal: {
                                color: legendColor[index]
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: "#37A2DA",
                            },
                        },
                    }
                })
            },
        ],
    };
}

export const LayoutBlockRight = () => {
    const indicators = [
        { text: "正常运行", value: 50 },
        { text: "关机", value: 15 },
        { text: "告警", value: 15 },
        { text: "没有数据", value: 20 }
    ];
    const legendColor = ["#15B79A", "#F64D3E", "#FFBF00", '#D9D9D9']
    const legendData = indicators.map(indicator => indicator.text);
    return {
        color: legendColor, //数据蛛网线条的颜色，示例中为红黄绿
        legend: {
            // 图例的设置
            show: true, // 是否显示图例
            top: 'center', // 图例离底部的距离
            left: 10, // 图例离左侧的距离
            orient: 'vertical', // 图例的排列方向，垂直排列
            itemWidth: fontSize, // 图例标记的图形宽度
            itemHeight: fontSize, // 图例标记的图形高度
            itemGap: itemGap, // 图例每项之间的间隔
            selectedMode: false, // 禁用图例的交互功能
            textStyle: {
                // 图例文字的样式设置
                fontSize: fontSize,
                color: "#6B767B",
            },
            data: legendData
        },

        series: [
            {
                name: "Line 1",
                type: "pie",
                clockWise: true,
                radius: ["40%", "60%"],
                center: ['70%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                    },
                },
                hoverAnimation: false,
                data: indicators.map(item => {
                    return {
                        name: item.text,
                        value: item.value,
                    }
                })
            },
        ],
    };
}