<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'LineComponent',
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        const data = [
        ['2000-06-05', 116],
        ['2000-06-06', 129],
        ['2000-06-07', 135],
        ['2000-06-08', 86],
        ['2000-06-09', 73],
        ['2000-06-10', 85],
        ['2000-06-11', 73],
        ['2000-06-12', 68],
        ['2000-06-13', 92],
        ['2000-06-14', 130],
        ['2000-06-15', 245],
        ['2000-06-16', 139],
        ['2000-06-17', 115],
        ['2000-06-18', 111],
        ['2000-06-19', 230],
        ['2000-06-20', 206],
        ['2000-06-21', 137],
        ['2000-06-22', 128],
        ['2000-06-23', 85],
        ['2000-06-24', 94],
        ['2000-06-25', 71],
        ['2000-06-26', 106],
        ['2000-06-27', 84],
        ['2000-06-28', 93],
        ['2000-06-29', 85],
        ['2000-06-30', 73],
        ['2000-07-01', 83],
        ['2000-07-02', 125],
        ['2000-07-03', 107],
        ['2000-07-04', 82],
        ['2000-07-05', 44],
        ['2000-07-06', 72],
        ['2000-07-07', 106],
        ['2000-07-08', 107],
        ['2000-07-09', 66],
        ['2000-07-10', 91],
        ['2000-07-11', 92],
        ['2000-07-12', 113],
        ['2000-07-13', 107],
        ['2000-07-14', 131],
        ['2000-07-15', 111],
        ['2000-07-16', 64],
        ['2000-07-17', 69],
        ['2000-07-18', 88],
        ['2000-07-19', 77],
        ['2000-07-20', 83],
        ['2000-07-21', 111],
        ['2000-07-22', 57],
        ['2000-07-23', 55],
        ['2000-07-24', 60],
      ];

      const dateList = data.map(function (item) {
        return '04号'; // 将所有日期标签替换为 '04号'
      });
      const valueList = data.map(function (item) {
        return item[1];
      });

    const  option = {
       
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          data: dateList, // x轴显示 '04号'
          axisLabel: {
            rotate: 0,
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 250,
          interval: 50,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed', // 设置Y轴为虚线
            },
          },
        },
        grid: {
          bottom: '10%',
        },
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: valueList,
            lineStyle: {
              color: '#0f8dd4', // 设置折线为蓝色
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
                    color: '#0f8dd4', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'white', // 100% 处的颜色
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
  