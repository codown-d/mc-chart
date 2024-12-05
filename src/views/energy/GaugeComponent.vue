<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'GaugeComponent',
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        const      option = {
        series: [
          {
            type: 'gauge',
            startAngle: 170, // 开始角度，180 度在底部
            endAngle: 10, // 结束角度，0 度在顶部
            center: ['50%', '90%'], // 仪表位置
            radius: '180%', // 仪表大小
            splitNumber: 3, // 设置10个分割段，用于显示刻度线
            axisLine: {
              lineStyle: {
                width: 18, // 减少轴线宽度使环看起来更扁
                color: [
                  [0.7655, 'rgb(246,77,62)'],
                  [1, 'rgb(0,123,255)'],
                ],
              },
            },
            pointer: {
              show: false,
            },

            axisLabel: {
              show: true,
              formatter: function (value) {
                if (value === 0) {
                  return '{moveDown|0%}';
                } else if (value === 100) {
                  return '{moveDown1|100%}';
                }
                return '';
              },
              rich: {
                moveDown: {
                  color: '#999',
                  padding: [20, 0, 0, -40], // 在富文本中添加顶部内边距以向下移动
                },
                moveDown1: {
                  color: '#999',
                  padding: [20, -40, 0, 0], // 在富文本中添加顶部内边距以向下移动
                },
              },
            },
            axisTick: {
              show: true,
              splitNumber: 5,
              length: 10,
              lineStyle: {
                color: '#ccc', // 设置刻度线颜色为灰色
                width: 2,
              },
            },
            splitLine: {
              show: true,
              length: 10,
              lineStyle: {
                color: '#ccc', // 主刻度线颜色调整为灰色
                width: 2,
              },
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, '-20%'], // 数值显示的位置调整
              formatter: '{value}%',
            },

            data: [{ value: 18 }],
          },
        ],
        title: {
          show: true,
          text: '累计使用与总安装比的使用量', // 更改此处以显示您的具体文本
          left: 'center', // 位置居中
          top: '90%', // 调整距顶部的位置，适合您的布局
          textStyle: {
            color: '#bec3c9', // 文字颜色
            fontWeight: 'bold', // 字体加粗
            fontSize: 12, // 字体大小
          },
        },
      };

     
    


  
        chart.setOption(option);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  