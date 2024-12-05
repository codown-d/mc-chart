<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'ChartComponent',
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        const   option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: [
            '设备运行时间的总和',
            '设备运行代表未知的总和',
            '设备停机时间的总和',
            '设备启动次数的总和',
          ],
          left: 'left', // 将图例对齐到左侧
  top: 'top' // 将图例对齐到顶部
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [
            '标签1',
            '标签2',
            '标签3',
            '标签4',
            '标签5',
            '标签6',
            '标签7',
            '标签8',
            '标签9',
            '标签10',
            '标签11',
            '标签12',
            '标签13',
            '标签14',
            '标签15',
            '标签1',
            '标签2',
            '标签3',
            '标签4',
            '标签5',
            '标签6',
            '标签7',
            '标签8',
            '标签9',
            '标签10',
            '标签11',
            '标签12',
            '标签13',
            '标签14',
            '标签15',
            '标签1',
            '标签2',
            '标签3',
            '标签4',
            '标签5',
            '标签6',
            '标签7',
            '标签8',
            '标签9',
            '标签10',
            '标签11',
            '标签12',
            '标签13',
            '标签14',
            '标签15',
            '标签1',
            '标签2',
            '标签3',
            '标签4',
            '标签5',
            '标签6',
            '标签7',
            '标签8',
            '标签9',
            '标签10',
            '标签11',
            '标签12',
            '标签13',
            '标签14',
            '标签15',
          ],
          axisTick: {
            show: false, // Hide axis ticks
          },
          axisLine: {
            show: false, // Set to false to hide the axis line
          },
          axisLabel: {
            show: false, // Hide axis labels
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            min: 0,
            max: 20,
            interval: 10,
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            axisLabel: {
              color: '#666',
            },
          },
          {
            type: 'value',
            name: '',
            min: 0,
            max: 10,
            interval: 5,
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
            axisLabel: {
              color: '#666',
            },
          },
        ],
        series: [
          {
            name: '设备运行时间的总和',
            type: 'bar',
            stack: 'total',
            data: [
              5, 18, 19, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 20, 20, 20, 5, 18,
              19, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 20, 20, 20, 5, 18, 19, 0,
              0, 0, 0, 0, 20, 20, 20, 20, 20, 20, 20, 20, 5, 18, 19, 0, 0, 0, 0,
              0, 20, 20, 20, 20, 20, 20, 20, 20,
            ],
            itemStyle: {
              color: '#0087d3',
            },
          },
          {
            name: '设备运行代表未知的总和',
            type: 'bar',
            stack: 'total',
            data: [
              0, 0, 0, 20, 20, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20,
              20, 20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20,
              20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 20, 0,
              0, 0, 0, 0, 0, 0,
            ],
            itemStyle: {
              color: '#dddddd',
            },
          },
          {
            name: '设备停机时间的总和',
            type: 'bar',
            stack: 'total',
            data: [
              15, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 2, 1, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 15, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            itemStyle: {
              color: '#ff4500',
            },
          },
          {
            name: '设备启动次数的总和',
            type: 'line',
            yAxisIndex: 1,
            data: [
              3, 5, 2, 4, 3, 5, 4, 2, 3, 5, 4, 2, 5, 3, 2, 4, 3, 5, 2, 4, 5, 2,
              3, 4, 5, 2, 3, 4, 2, 5, 3, 4, 2, 5, 3, 2, 4, 5, 3, 2, 4, 5, 2, 3,
              4, 2, 5, 3, 4, 2, 2, 5, 3, 4, 2, 2, 5, 3, 4, 2, 2, 5, 3, 4,
            ],
            itemStyle: {
              color: '#ffa500',
            },
            lineStyle: {
              width: 2,
              color: '#ffa500',
            },
            showSymbol: false,
          },
        ],
      };

  
        chart.setOption(option);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  