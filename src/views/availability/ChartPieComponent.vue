<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'ChartPieComponent',
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        const     option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'center',
          bottom: '24%',
          textStyle: {
            color: '#333', // 设置字体颜色
            fontSize: 12, // 设置字体大小
            fontFamily: 'Arial, sans-serif', // 设置字体类型
            lineHeight: 30, // 增加行高以添加垂直间隔
          },
          formatter: function (name) {
            var total = 0;
            var target;
            option.series[0].data.forEach(function (item) {
              total += item.value;
              if (item.name === name) {
                target = item.value;
              }
            });
            var percent = ((target / total) * 100).toFixed(2) + '%'; // 计算百分比
            // 正确使用富文本格式化标签
            return `{nameLabel|${name}} {percentLabel|${percent}}`;
          },
          textStyle: {
            rich: {
              nameLabel: {
                align: 'left', // 左对齐
                width: 100, // 确定宽度，避免文字重叠
              },
              percentLabel: {
                align: 'right', // 右对齐
                width: 50, // 确定宽度
                color:"#000"
              },
            },
          },
        },


        series: [
          {
            name: '设备状态',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['50%', '30%'], // 将中心点上移，原来默认是 '50%'
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false, // 确保突出显示时也不展示任何文字
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 335,
                name: '累计运行时间',
                itemStyle: { color: 'rgba(0,135,211,1.00)' },
              },
              {
                value: 310,
                name: '停机时间',
                itemStyle: { color: 'rgb(246,77,62,1)' },
              },
              {
                value: 234,
                name: '未知运行时间',
                itemStyle: { color: 'rgba(217,217,217,1.00)' },
              },
            ],
          },

          {
            name: '设备状态',
            type: 'pie',
            radius: ['40%', '80%'], // 修改内半径使环变粗
            avoidLabelOverlap: false,
            center: ['50%', '30%'], // 将中心点上移，原来默认是 '50%'
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false, // 确保突出显示时也不展示任何文字
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              borderColor: 'rgba(255, 255, 255, 0.5)', // 添加淡色边框
              borderWidth: 2, // 边框宽度
            },
            data: [
              {
                value: 335,
                name: '累计运行时间',
                itemStyle: { color: 'rgba(0,135,211,0.2)' },
              },
              {
                value: 310,
                name: '停机时间',
                itemStyle: { color: 'rgb(246,77,62,0.2)' },
              },
              {
                value: 234,
                name: '未知运行时间',
                itemStyle: { color: 'rgba(217,217,217,0.2)' },
              },
            ],
          },
        ],
      }
     
    


  
        chart.setOption(option);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  