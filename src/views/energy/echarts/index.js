import dayjs from 'dayjs'
const labelStyle = {
    // color: "#000",
    fontSize: '12px',
}
export const LayoutBlockLef = (legends, serialData, dayList) => {
  const newArray = Array.from({ length: serialData[0].data.length }, () => '');
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    // title: {
    //   text: '设备可用性分析',
    //   left: '50%',
    //   textStyle: {
    //     color: "#FFF"
    //   }
    // },
    grid: {
      top: "30%",
      left: "4%",
      right: "0%",
      bottom: "16%",
      containLabel: true,
    },
    dataZoom: [
      {
        show: true,
        bottom: '10%',
        // start: 0,
        // end: serialData[0].data.length,
        handleIcon: `image://${window.location.origin}/images/icon1.png`,
        handleSize: 12,
        height: 10,
        handleStyle: {
          color: '#000',
        },
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        fillerColor: '#302939',
        backgroundColor: '#fff',
        brushSelect: false,
        type: 'slider',
      },
      // {
      //   type: 'slider',
      // }
    ],
    legend: {
      data: legends,
      top: 20,
      left: 'center',
      textStyle: {
        ...labelStyle,
      },
    },
    xAxis: {
      data: newArray,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgb(15 11 50)',
        }
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        inverse: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            ...labelStyle,
          },
        },
        splitLine: {
          show: false, // 不显示 Y 轴分隔线
        },
        min: 0,
        max: 24
      },
      {
        type: 'value',
        // inverse: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            ...labelStyle,
          },
        },
        splitLine: {
          show: false, // 不显示 Y 轴分隔线
        },
        min: 0,
        max: 10,
        interval: 5
      },
    ],
    series: serialData,
  };
}

export const LayoutBlockCenter = () => {
  return {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color: '#0087D3',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 210,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: false,
        },
        pointer: {
          show: false,
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 16,
          offsetCenter: [0, '5%']
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 45,
        },
        axisLine: {
          lineStyle: {
            width: 40,
            color: [
              [0.7, '#0087D3'],
              [1, '#fd666d']
            ]
          }
        },
        title: {
          show: false
        },
        detail: {
          backgroundColor: '#fff',
          borderColor: '#999',
          // borderWidth: 2,
          width: '60%',
          lineHeight: 20,
          height: 120,
          borderRadius: 8,
          offsetCenter: [0, '35%'],
          valueAnimation: true,
          formatter: function (value) {
            return '{value|' + value.toFixed(0) + '}{unit|%}';
          },
          rich: {
            value: {
              fontSize: 50,
              fontWeight: 'bolder',
              color: '#777'
            },
            unit: {
              fontSize: 20,
              color: '#999',
              padding: [0, 0, -20, 10]
            }
          }
        },
        data: [
          {
            value: 70
          }
        ]
      }
    ]
  }
}