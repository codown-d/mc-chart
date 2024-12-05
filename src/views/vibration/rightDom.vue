<script setup>
import { onMounted, reactive, ref } from "vue";
import * as echarts from 'echarts';
import 'echarts-gl';
import API from "@/api";
import dayjs from 'dayjs'

const scatterChart = ref(null); // 用于引用散点图 DOM
const chart3D = ref(null); // 用于引用3D图 DOM
let chart3DInstance = null; // 3D 图的实例

const state = reactive({
  deviceData: [],
  scatterData: [],
  times: [],
  devices: [
    { Device_Name: "VPA1" },
    { Device_Name: "VPA2" },
    { Device_Name: "VPA3" },
    { Device_Name: "VPA4" },
    { Device_Name: "VPA5" },
  ]
});



// 挂载后初始化图表
onMounted(() => {
    var params = {
      dataType: "DeviceData",
      timeFrom: "2024-08-01T00:00:00+08:00",
      timeEnd: "2024-08-31T00:00:00+08:00",
      output: [
          {
              "field": "DE_Radial_Vib_Y",
              "func": "avg"
          },
          {
              "field": "DE_Radial_Vib_X",
              "func": "avg"
          }
      ],
      group: {
          "timeInterval": 36000 / 60
      }
    }
    API.getDataAgg(params).then(res => {
      state.times = res.times;
      var data = res.data;
      state.scatterData = []
      state.devices.forEach(equ => {
        var filedData = []
        var filed3DData = []
        data.forEach(dt => {
          filedData.push(dt.DE_Radial_Vib_X) 
          filed3DData.push([dt.DE_Radial_Vib_X])
        })
        // 散点
        state.scatterData.push({
          name: equ.Device_Name,
          type: 'scatter',
          itemStyle: {
            color: '#1f78b4', // 设置单一颜色
          },
          data: filedData
        })
        // 3D
        state.deviceData.push({
          name: equ.Device_Name,
          data: filed3DData
        })
      })
      initScatterChart(state.scatterData, state.times);
    })

    init3DChart();
});

// 初始化散点图
const initScatterChart = (scatterData, xAxisData) => {
    const scatterInstance = echarts.init(scatterChart.value);
    const scatterOption = {
        grid: {
            left: '10%',
            top: '15%',
            bottom: '25%',
            right: '10%'
        },
        tooltip: {
          trigger: 'axis',
          position: ['50%', '30%'],
          feature: {
            dataZoom: {
                yAxisIndex: false
            },
            brush: {
                type: ['lineX', 'clear']
            }
          }
        },
        xAxis: {
          name: '时间',
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
            name: '数值',
            type: 'value',
        },
        series: scatterData,
        brush: {
            toolbox: ['rect'],
            toolbox: ['lineX', 'clear'],
            xAxisIndex: 0,
        },
    };
    scatterInstance.setOption(scatterOption);
    // 监听圈选事件，处理选择的数据
    scatterInstance.on('brushSelected', (params) => {
        handleBrushSelected(params, scatterOption);
    });
};

// 初始化3D图
const init3DChart = () => {
    chart3DInstance = echarts.init(chart3D.value);
    var devList = ["VPA1", "VPA2", "VPA3", "VPA4", "VPA5"]
    const option3D = {
        grid: {
          left: '5%',
          top: '10%',
          bottom: '10%',
          right: '5%'
        },
        tooltip: {},
        xAxis3D: {
          type: 'category',
          name: '时间',
          axisLabel: {
            rotate: -45,
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
          type: 'category',
          name: '设备', // Y轴显示时间值
          data: devList,
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
        dimensions: [
          '时间',
          '设备',
          '振幅'
        ],
        zAxis3D: {
          type: 'value',
          name: '振幅',
        },
        grid3D: {
            viewControl: {
              autoRotate: false, // 关闭自动旋转
              projection: 'orthographic', // 使用正交投影
              orthographicSize: 95,
              beta: 6,
              maxAlpha: 10,
              center: [10,0,0]
            },
            boxWidth: 230,
            boxDepth: 300,
            boxHeight: 30,
        },
        series: [], // 初始为空
    };
    chart3DInstance.setOption(option3D); // 初始化3D图
};

// 处理圈选数据
const handleBrushSelected = (params, scatterOption) => {
  var selectedTimes = []
  var series = []

  state.devices.forEach(dev => {
    series.push(
      {
        name: dev.Device_Name,
        type: 'line3D', // 每个设备独立线条
        data: [], // 设备的3D数据
        encode: {
          x: '时间',
          y: '设备',
          z: '振幅',
        },
        lineStyle: {
          width: 2,
          color: '#ff7f0e'
        },
        symbolSize: 2,
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
    )
  })

  // 遍历圈选结果
  params.batch[0].selected.forEach((selection) => {
    selection.dataIndex.forEach((index) => {
      const time = state.times[index]; // 获取时间值
      selectedTimes.push(time);
      state.devices.forEach((device, idx) => {
        var yAxios = state.deviceData[0].data[index][0]
        series[idx].data.push([time, device.Device_Name, yAxios])
      })
    });
  });

  // 去重时间
  const uniqueTimes = [...new Set(selectedTimes)];
  update3DChart(series, uniqueTimes); // 更新3D图
};

// 更新3D图表
const update3DChart = (seriesData, selectedTimes) => {
    chart3DInstance.setOption({
      xAxis3D: {
        data: selectedTimes, // 选中的时间作为Y轴
      },
      series: seriesData
    });
};



</script>

<template>
    <div class="container-content-blockRow-right-block1-dom">
        <div ref="scatterChart" class="scatterChart"></div>
        <div ref="chart3D" class="chart3D"></div>
    </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-right-block1-dom {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.scatterChart {
    width: 100%;
    height: 20%;
}

.chart3D {
    width: 100%;
    height: 80%;
}
</style>
