<template>
  <div ref="chart" style="width: 100%; height: 150%;position: absolute;top:-20%"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MixtureComponent',
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
            type: 'cross',
          },
        },

        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: [
            '01月',
            '02月',
            '03月',
            '04月',
            '05月',
            '06月',
            '07月',
            '08月',
            '09月',
            '10月',
            '11月',
            '12月',
          ],
        },
        yAxis: [
          {
            type: 'value',
            name: '总用电量kwh',
            axisLabel: {
              formatter: '{value} ',
            },
            axisPointer: {
              snap: true,
            },
          },
          {
            type: 'value',
            name: '当月电量峰值kwh',
            axisLabel: {
              formatter: '{value} ',
            },
            axisPointer: {
              snap: true,
            },
            splitLine: {
              show: false,
            },
            min: 0,
            max: 15,
            interval: 3,
          },
        ],
        series: [
          {
            name: '柱状图kwh',
            type: 'bar',
            yAxisIndex: 0,
            data: [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
            color: '#0087d3',
          },
          {
            name: '折线图kwh',
            type: 'line',
            yAxisIndex: 1,
            data: [3, 2, 1, 2, 3, 3, 3, 2, 2, 3, 4, 5],
            color: '#91CC75',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: 'rgba(102,205,180,1.00)', // 设置折线为蓝色
            },
            areaStyle: {
              // 添加渐变的阴影效果
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(102,205,180,1.00)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(102,205,180,0)', // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
          },
          {
            name: '折线图kwh',
            type: 'line',
            yAxisIndex: 1,
            data: [4, 3, 5, 6, 4, 4, 5, 6, 5, 5, 4, 5],
            color: '#91CC75',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: 'rgba(255,219,114,1.00)', // 设置折线为蓝色
            },
            areaStyle: {
              // 添加渐变的阴影效果
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255,219,114,1.00)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,219,114,0)', // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
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
