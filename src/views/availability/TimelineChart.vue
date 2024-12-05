<template>
  <div id="scroll-container" >
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart } from '@antv/g2';
import * as echarts from "echarts";

const container = ref(null);

onMounted(() => {
  // 检查 container 是否为 null
  if (!container.value) {
    console.error('Chart container is not available.');
    return;
  }

  const data = [
    {
      time: '2024-03-03',
      name: 'operation',
      index: 2,
      color: 'red',
      status: '重点关注',
    },
    {
      time: '2024-03-04',
      name: 'operation',
      index: 2,
      color: 'blue',
      status: '',
    },
    {
      time: '2024-03-05',
      name: 'operation',
      index: 2,
      color: 'gray',
      status: '',
    },
    {
      time: '2024-03-06',
      name: 'operation',
      index: 2,
      color: 'blue',
      status: '',
    },
  ];

  // 初始化图表
  const chart = new Chart({
    container: container.value,  // 使用 ref 获取的容器
    autoFit: true,  // 自动适应宽度
    height: 300,  // 设置图表高度
    padding: [40, 20, 50, 40],  // 内边距
  });

  // 配置数据
  chart.data(data);

  // 配置 X 轴和 Y 轴
  chart.scale({
    time: {
      type: 'timeCat',  // X 轴使用时间分类
      tickInterval: 1,
      range: [0, 1],
    },
    index: {
      nice: true,  // 让 Y 轴（index）更加平滑
    },
  });

  // 隐藏 Y 轴的标签
  chart.axis('index', {
    label: null,  // 隐藏 Y 轴标签
  });

  // 隐藏图例
  chart.legend(false);

  // 创建数据点
  chart
    .point()
    .position('time*index')  // 将时间映射到 X 轴，将 index 映射到 Y 轴
    .color('color')  // 通过 color 属性给每个点上色
    .shape('circle')  // 点的形状为圆形
    .style({
      stroke: '#fff',  // 点的外边框为白色
      lineWidth: 2,  // 边框宽度
    });

  // 添加注释（文本和线条）
  data.forEach((item) => {
    // 注释文本
    chart.annotation().text({
      position: [item.time, item.index],
      content: item.status ? `${item.time}\n${item.name}\n${item.status}` : `${item.time}\n${item.name}`,
      style: {
        textAlign: 'center',
        textBaseline: 'middle',
        fill: item.color,  // 使用数据中定义的颜色
        fontSize: 12,  // 字体大小
        fontWeight: 'bold',  // 字体加粗
      },
      offsetY: item.status ? -40 : -30,  // 根据状态调整偏移量
    });

    // 注释线条
    chart.annotation().line({
      start: [item.time, item.index - 0.2],  // 线的起点
      end: [item.time, item.index],  // 线的终点
      style: {
        stroke: item.color,  // 使用数据中的颜色
        lineWidth: 10,  // 线条宽度
      },
    });
  });

  // 渲染图表
  chart.render();
});
</script>

<style scoped>
  #scroll-container {
    overflow-x: scroll;
    position: relative;
  }
  #container {
    width: 1200px;
    height: 300px;
  }
  .chart-label {
    text-align: center;
    color: #666;
  }
  #scroll-container::-webkit-scrollbar {
    height: 12px; /* 滚动条的高度 */
  }

  #scroll-container::-webkit-scrollbar-thumb {
    background: #a5d0e9; /* 滚动条的颜色 */
    border-radius: 6px; /* 滚动条的圆角 */
  }

  #scroll-container::-webkit-scrollbar-track {
    background: rgba(165,208,233,0.2); /* 滚动条轨道的颜色 */
  }
</style>
