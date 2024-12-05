<script setup>
import { onMounted, reactive, ref } from "vue";
import * as echarts from 'echarts';
import 'echarts-gl';
import API from "@/api";

const scatterChart = ref(null); // 用于引用散点图 DOM
const chart3D = ref(null); // 用于引用3D图 DOM
let chart3DInstance = null; // 3D 图的实例

// 模拟数据
const devices = ref([]);
// const scatterData = []; // 每个设备在散点图中唯一的点
// const deviceData = devices.map(() => []); // 每个设备有多个3dData点位

// let baseTime = new Date('2020-11-19T12:00').getTime();

// // 为每个设备生成一个唯一的散点图点和多个3D点
// devices.forEach((device, index) => {
//     // 生成唯一的散点图数据
//     const randomYValue = (Math.random() * 1.5).toFixed(2);
//     scatterData.push({
//         name: device,
//         value: [
//             new Date(baseTime + index * 10 * 60 * 1000)
//                 .toISOString()
//                 .substring(0, 16),
//             randomYValue,
//         ],
//     });

//     // 生成每个设备的 3D 数据点
//     let baseX = 0;
//     const points = [];
//     for (let j = 0; j < 5; j++) {
//         baseX += Math.random() * 10; // X轴逐步增加
//         points.push({
//             xx: baseX,
//             zz: Math.random() * 1, // Z轴在0到500的范围内
//         });
//     }
//     deviceData[index] = points; // 存储每个设备的 3D 数据
// });

const state = reactive({
  deviceData: [],
  devices: [],
  scatterData: []
});


// 挂载后初始化图表
onMounted(() => {

  API.getDeviceInfo().then((resEqu) => {
    var equData = resEqu.data;
    devices.value = equData;
    equData.forEach((euq, index) => {
      let params = {}
      params.deviceName = euq.Device_Name
      params.dataType = "DeviceDetectionRecently"
      params.output = "Device_Name,recently_v,recently_t"
      API.getData(params).then(res => {
        var data = res.data;

        state.scatterData = []
        var times = []
        data.forEach(dt => {
          state.scatterData.push({
            name: dt.Device_Name,
            value: [dt.recently_v, dt.recently_t],
            time: dt.date
          })
          times.push(dt.date)
        })
        initScatterChart(state.scatterData, times);
      })
    })
  })
  

  init3DChart();
});

// 初始化散点图
const initScatterChart = (scatterData, time) => {
    const scatterInstance = echarts.init(scatterChart.value);
    const scatterOption = {
        grid: {
            left: '10%',
            top: '15%',
            bottom: '25%',
            right: '10%'
        },
        tooltip: {
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
          data: time
        },
        yAxis: {
          name: '数值',
          type: 'value',
        },
        series: [
            {
                name: '设备数据',
                type: 'scatter',
                data: scatterData, // 每个设备对应唯一的散点图点
                itemStyle: {
                    color: '#1f78b4', // 设置单一颜色
                },
            },
        ],
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

    const option3D = {
        grid: {
            left: '5%',
            top: '10%',
            bottom: '10%',
            right: '5%'
        },
        tooltip: {},
        xAxis3D: {
            type: 'value',
            name: 'X轴',
            // min: 0,
            // max: 50
        },
        yAxis3D: {
            type: 'category',
            name: '时间', // Y轴显示时间值
            data: ['123', '456'], // 初始为空，由选中点填充
        },
        zAxis3D: {
            type: 'value',
            name: 'Z轴 (Hz)',
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
        series: [
          {
            name: "123",
            data: [
              [[12, 14, 10], [34, 50, 15], [56, 30, 20], [10, 15, 12], [23, 10, 14]]
            ]
          },
          {
            name: "456",
            data: [
              [[12, 14, 10], [34, 50, 15], [56, 30, 20], [10, 15, 12], [23, 10, 14]]
            ]
          },
        ], // 初始为空
    };
    chart3DInstance.setOption(option3D); // 初始化3D图
};

// 处理圈选数据
const handleBrushSelected = (params, scatterOption) => {
  // state.scatterData = devices.value
  // const selectedTimes = [];

  // // 遍历圈选结果
  // params.batch[0].selected.forEach((selection) => {
  //     selection.dataIndex.forEach((index) => {
  //         state.scatterData = []
  //         const time = state.scatterData[index].time; // 获取时间值
  //         selectedTimes.push(time);

  //         const deviceIndex = index; // 设备索引
  //         if (
  //             state.deviceData[deviceIndex] &&
  //             state.deviceData[deviceIndex].length > 0
  //         ) {
  //             // 遍历每个设备的 3D 数据
  //             state.deviceData[deviceIndex].forEach((point) => {
  //               state.scatterData.push([point.xx, time, point.zz]); // 将设备的 3D 点保留
  //             });
  //         }
  //     });
  // });

  // // 去重时间
  // const uniqueTimes = [...new Set(selectedTimes)];

  // console.log(params)

  update3DChart(state.scatterData, uniqueTimes); // 更新3D图
};

// 更新3D图表
const update3DChart = (data, selectedTimes) => {
    chart3DInstance.setOption({
        yAxis3D: {
            data: selectedTimes, // 选中的时间作为Y轴
        },
        series: devices.value.map((device, index) => ({
            name: device.Device_Name,
            type: 'line3D', // 每个设备独立线条
            data: data[index], // 设备的3D数据
            lineStyle: {
                width: 2,
                curveness: 0.5,
                color:
                    index === 0
                        ? '#ff7f0e'
                        : index === 1
                            ? '#2ca02c'
                            : '#1f77b4', // 每个设备不同颜色
            },
            symbolSize: 2,
        })),
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
