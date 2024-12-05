import dayjs from 'dayjs'
const labelStyle = {
    color: "#000000",
    fontSize: 12,
}

export const LayoutScatter3D = (data) => {
    var equipment = ['GFJ1', 'GFJ2', 'GFJ3',
        'GFJ4', 'GFJ5', 'GFJ6'];
    var option = {
        // title: {
        //     text: '振动分布',
        //     left: 'center',
        //     textStyle: {
        //         color: '#ffffff',
        //         fontSize: 24
        //     }
        // },
        tooltip: {},
        visualMap: {
            top: 10,
            max: 50,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            textStyle: {
                color: '#000'
            }
        },
        xAxis3D: {
            name: "时间",
            type: 'category',
            axisLabel: {
                color: "#000"
            },
            axisLine: {
                lineStyle: {
                    color: "#666"
                }
            },
            axisPointer: {
                lineStyle: {
                    color: "#000"
                }
            },
        },
        yAxis3D: {
            name: "设备",
            type: 'category',
            data: equipment,
            axisLabel: {
                color: "#000"
            },
            axisLine: {
                lineStyle: {
                    color: "#666"
                }
            },
            axisPointer: {
                lineStyle: {
                    color: "#000"
                }
            },
        },
        zAxis3D: {
            name: "振幅",
            type: 'value',
            axisLabel: {
                color: "#000"
            },
            axisLine: {
                lineStyle: {
                    color: "#666"
                }
            },
            axisPointer: {
                lineStyle: {
                    color: "#000"
                }
            },
        },
        grid3D: {
            boxWidth: 380,
            boxDepth: 180,
            viewControl: {
                distance: 400,              //默认缩放比例
                alpha: 25,
                beta: 205,
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: true
                },
                ambient: {
                    intensity: 0.2
                }
            }
        },
        dimensions: [
            '时间',
            '设备',
            '振幅'
        ],
        series: [
            {
                type: 'bar3D',
                shading: 'lambert',
                encode: {
                    x: '时间',
                    y: '设备',
                    z: '振幅',
                    // tooltip: [0, 1, 2, 3, 4, 5]
                },
                data: data.map(function (item) {
                    return {
                        value: [item[1], item[0], item[2]]
                    };
                }),
                shading: 'color',
                label: {
                    show: false,
                    fontSize: 16,
                    borderWidth: 1
                },
                itemStyle: {
                    opacity: 0.8
                },
                emphasis: {
                    label: {
                        fontSize: 20,
                        color: '#900'
                    },
                    itemStyle: {
                        color: '#900'
                    }
                }
            }
        ]
    }
    return option;
}

export const LayoutEchartsQue1 = (times, serialData, scales) => {
    return {
        tooltip: {
            trigger: 'axis',
            formatter: function (params, ticket, callback) {
                var res = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                    if (params[i].seriesType === 'line') {
                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + 'h';
                    } else {
                        res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '个';
                    }
                }
                return res;
            }
        },
        grid: {
            containLabel: false,
            top: '10%',
            bottom: '9%',
            left: '10%',
            right: '0%'
        },
        legend: {
            show: false,
            data: ['喘振风险趋势'],
            left: 'center',
            top: 0,
            right: '0%',
            bottom: '0%',
            textStyle: {
                color: '#000'
            },
        },
        color: ['#40b22f', '#f3d71c', '#f4b9a9'],
        xAxis: [{
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: times,
            axisLine: {
                show: false,
                lineStyle: {
                    ...labelStyle,
                },
            },
            left: 'center',
            right: '8%',
            bottom: '0%',
        }],
        yAxis: [
            {
                type: 'value',
                // name: '次数',
                min: scales.minDv,
                max: scales.maxDv,
                interval: 5,
                // inverse: true,
                axisLabel: {
                    color: "#000"
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    color: "#000",
                    show: false,
                    lineStyle: {
                        ...labelStyle,
                    },
                },
            }
        ],
        series: [{
            name: '喘震风险趋势',
            type: 'line',
            color: "blue",
            lineStyle: {
                normal: {
                    width: 3,
                    shadowColor: 'rgba(0,0,0,1.4)',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                }
            },
            data: serialData,
        }]
    }
}


export const LayoutEquLef = (filedData, xdata, serialData) => {
    return {
        toolbox: {
            feature: {
                brush: {
                    type: ['lineX', 'clear'], // 提供勾选工具
                    title: {
                        lineX: '横向选择',
                        clear: '清除选择'
                    }
                }
            }
        },
        xAxis: {
            type: 'category',
            data: xdata,
            // axisLine: {
            //     color: "#FFF"
            // },
            // axisLabel: {
            //     color: "#FFF"
            // }
        },
        tooltip: {
            trigger: 'axis'
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                startValue: 0,
                left: "center",
                top: "auto",
                right: "auto",
                bottom: 20,
            },
            {
                type: 'inside',
                realtime: true,
                startValue: 0,
            }
        ],
        yAxis: {
            name: '数值',
            type: 'value',
            nameTextStyle: {
                rotate: 90, // 将名称旋转90度实现横移
            },
            // axisLine: {
            //     lineStyle: {
            //         color: "#FFF",
            //     },
            // },
            // nameTextStyle: {
            //     padding: [0, 0, 0, -35]
            // }
        },
        grid: {
            left: "5%",
            right: "5%",
            top: "15%",
            bottom: "10%"
        },
        legend: {
            top: 20,
            data: filedData,
            axisLabel: {
                color: "#FFF"
            },
            textStyle: {
                color: "#FFF"
            }
        },
        series: serialData,
        brush: {
            toolbox: ['lineX', 'clear'],
            xAxisIndex: 0,
            throttleType: 'debounce',//开启选中延迟后调用回调延迟
            throttleDelay: 600,//选中延迟后调用回调延迟时间
        },
    };
}
