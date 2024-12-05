<template>
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div>
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
          '09-01',
          '09-02',
          '09-03',
          '09-04',
          '09-05',
          '09-06',
          '09-07',
          '09-08',
          '09-09',
          '09-10',
          '09-11',
          '09-12',
          '09-13',
          '09-14',
          '09-15',
          '09-16',
          '09-17',
          '09-18',
          '09-19',
          '09-20',
          '09-21',
          '09-22',
          '09-23',
          '09-24',
          '09-25',
          '09-26',
          '09-27',
          '09-28',
          '09-29',
          '09-30',
          '09-31',
        ],
        axisTick: {
          show: true, // Hide axis ticks
        },
        axisLine: {
          show: true, // Set to false to hide the axis line
        },
        axisLabel: {
          show: true, // Hide axis labels
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          min: 0,
          max: 24,
          // interval: 10,
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
          max: 24,
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
            19, 22, 24, 24, 4, 4, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            24, 24, 24, 4, 4, 4, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24,
            24, 4, 4, 4, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24,
            24, 24, 24, 24, 24, 24, 24, 24, 24
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
  .chart-container {
    width: 100%;
    height: 90%;
    overflow-x: auto; /* 启用水平滚动 */
  }

  .chart {
    width: 100%; /* 根据内容调整宽度 */
    height: 100%;
  }
  .chart-container::-webkit-scrollbar {
    height: 12px; /* 滚动条的高度 */
  }

  .chart-container::-webkit-scrollbar-thumb {
    background: #a5d0e9; /* 滚动条的颜色 */
    border-radius: 6px; /* 滚动条的圆角 */
  }

  .chart-container::-webkit-scrollbar-track {
    background: rgba(165,208,233,0.2); /* 滚动条轨道的颜色 */
  }
</style>
