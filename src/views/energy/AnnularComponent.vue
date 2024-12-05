<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'AnnularComponent',
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        const      option = {
    title: {
        text: '-2%',
        x: 'center',
        y: 'center',
        textStyle: {
        fontWeight: 'normal',
        color: '#5ecdb9', // 修改颜色为橙红色
        fontSize: '18' // 修改字体大小为30
    }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'Percentage',
            type:'pie',
            radius: ['60%', '103%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data:[
                {value: 2, name: 'Negative', itemStyle: {color: '#0580f2'}},
                {value: 98, name: 'Remaining', itemStyle: {color: '#ccc'}}
            ]
        }
    ]
};

     
    


  
        chart.setOption(option);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  