<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'MultiLineComponent',
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const data = [];

for (let i = 0; i < 50; i++) { // 生成50组随机数据
  const randomData = [
    generateRandomNumber(30, 70),    // 第一项，范围在30到70之间
    generateRandomNumber(90, 150),   // 第二项，范围在90到120之间
    generateRandomNumber(160, 220),  // 第三项，范围在130到150之间
  ];
  data.push(randomData);
}

      const dateList = data.map(function (item) {
        return '2024/04/11'; // 将所有日期标签替换为 '04号'
      });
      const valueList1 = data.map(function (item) {
        return item[0];
      });
      const valueList2 = data.map(function (item) {
        return item[1];
      });
      const valueList3 = data.map(function (item) {
        return item[2];
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
          max: 225,
          interval: 75,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed', // 设置Y轴为虚线
            },
          },
          axisLabel: {
            formatter: function (value) {
              // 根据数值映射到自定义标签
              const labels = {
                0: 'SG6234-4',
                75: 'SG6234-3',
                150: 'SG6234-2',
                225: 'SG6234-1',
              };
              return labels[value];
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
            data: valueList1,
            lineStyle: {
              color: 'rgba(249,192,146,1.00)', // 设置折线为蓝色
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
                    color: 'rgba(249,192,146,0.6)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(249,192,146,0)', // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
          },
          {
            type: 'line',
            showSymbol: false,
            data: valueList2,
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
                    color: 'rgba(15,141,212,0.3)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(15,141,212,0)', // 100% 处的颜色
                  },
                ],
                global: false,
              },
            },
          },
          {
            type: 'line',
            showSymbol: false,
            data: valueList3,
            lineStyle: {
              color: 'rgba(69,197,174,1.00)', // 设置折线为蓝色
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
                    color: 'rgba(69,197,174,0.3)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(69,197,174,0)', // 100% 处的颜色
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
  