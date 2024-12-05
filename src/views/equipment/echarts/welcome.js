import dayjs from 'dayjs'
const labelStyle = {
  color: "#000",
  fontSize: '12px',
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
        //   color: "#FFF"
        // },
        // axisLabel: {
        //   color: "#FFF"
        // }
      },
      tooltip: {
        trigger: 'axis'
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          startValue:0, 
          left:"center",
          top:"auto",
          right:"auto",                          
          bottom:20,
        },
        {
          type: 'inside',
          realtime: true,
          startValue:0, 
        }
      ],
      yAxis: {
        name: '数值',
        type: 'value',
        nameTextStyle: {
          rotate: 90, // 将名称旋转90度实现横移
        },
        // axisLine: {
        //   lineStyle: {
        //     color: "#FFF",
        //   },
        // },
        // nameTextStyle: {
        //   padding: [0, 0, 0, -35]
        // }
      },
      grid: {
        left: "3%",
        right: "2%",
        top: "10%",
        bottom: "13%"
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

export const EchartsQueOption2 = (legends, serialData) => {
  let option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: "15%",
      left: "2%",
      right: "5%",
      bottom: "1%",
      containLabel: true,
    },
    legend: {
      data: legends,
      textStyle: {
        ...labelStyle,
      },
      top: '2%',
      left: '2%',
      right: '0%',  // 也可以使用像素值，例如 '50px'
      // 设置图例为垂直布局
      // orient: 'vertical'
    },
    xAxis: [
      {
        type: 'value',
        name: 'm³/h',
        boundaryGap: false,
        // axisLine: {
        //   lineStyle: {
        //     ...labelStyle,
        //     type: "dashed",
        //     color: "#000",
        //   },
        // },
        // splitLine: {
        //   lineStyle: {
        //     ...labelStyle,
        //     type: "dashed",
        //     color: "#000",
        //   },
        // },
        min: 50,
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Pa',
        // splitLine: {
        //   lineStyle: {
        //       ...labelStyle,
        //       type: "dashed",
        //       color: "#000",
        //   },
        // },
        // axisLine: {
        //   lineStyle: {
        //       ...labelStyle,
        //       type: "dashed",
        //       color: "#000",
        //   },
        // },
        min: 0,
        // max: 0.95
        // interval: 0.1
      },
    ],
    dataZoom: [
      {
        show: true,
        left: '6%',
        xAxisIndex: null, // 不控制x轴
        yAxisIndex: 0,
        handleIcon: `image://${window.location.origin}/images/icon1.png`,
        handleSize: 15,
        // height: 280,
        width: 10,
        handleStyle: {
          color: '#000',
        },
        textStyle: {
          color: '#000',
          fontSize: 12,
        },
        fillerColor: 'rgba(0,135,211,0.88)',
        // backgroundColor: '#000',
        brushSelect: false,
      },
      {
        show: true,
        bottom: '6%',
        xAxisIndex: 0, // 控制第一个x轴
        yAxisIndex: null, // 不控制y轴
        handleIcon: `image://${window.location.origin}/images/icon1.png`,
        handleSize: 15,
        height: 10,
        handleStyle: {
          color: '#000',
        },
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        fillerColor: 'rgba(0,135,211,0.88)',
        // backgroundColor: '#fff',
        brushSelect: false,
      },
    ],
    series: serialData
  };
  return option
}

export const LayoutBlockLef = (filedData, xdata, serialData, yAxis) => {
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
      //   color: "#000"
      // },
      // axisLabel: {
      //   color: "#FFF"
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
        bottom: '5%',
      },
      {
        type: 'inside',
        realtime: true,
        startValue: 0,
      }
    ],
    yAxis: yAxis,
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '26%'
    },
    legend: {
      top: 20,
      data: filedData,
      // axisLabel: {
      //   color: "#FFF"
      // },
      // textStyle: {
      //   color: "#FFF"
      // }
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

