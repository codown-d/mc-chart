<template>
  <div class="relative w-full h-full">
    <div
      class="chart"
      :class="class"
      ref="chartContainer"
      style="height: 100%; width: 100%"
    ></div>
    <a-spin v-if="!isReady" class="absolute z-10 top-[50%] left-[50%]" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, computed, watch } from "vue";
import * as Plot from "@observablehq/plot";

// 定义 props 类型
interface ChartData {
  width: number;
  height: number;
  values: number[];
}

const props = defineProps<{
  data: ChartData;
  legend: {
    type: Boolean,
    required: false, // 设置为 false，使其成为可选项
    default: false // 设置默认值为 true
  },
}>();

// 动态计算 isReady，判断数据是否已经准备好
const isReady = computed(() => {
  return props.data && props.data.values.length > 0;
});

// 获取容器的引用
const chartContainer = ref<HTMLElement | null>(null);

// 绘制图表的函数
const drawChart = () => {
  if (!chartContainer.value) return; // 确保容器存在
  const data = props.data;
  const randomPoints = Array.from({ length: 10 }, () => [
    Math.random() * data.width,  // 随机生成 X 坐标
    Math.random() * data.height, // 随机生成 Y 坐标
  ]);
  console.log(data.width)
  const chart = Plot.plot({
    color: {
      legend: props.legend,
      padding:20,
      transform:(y) => (y) /1,
      labelOffset:20,
      tickPadding: 10,
      label: "Elevation (m)",
    },
    marks: [
      Plot.contour(data.values, {
        width: data.width,
        height: data.height,
        fill: Plot.identity,
        stroke: "black",
      }),
    Plot.dot(randomPoints , { fill: 'red', r: 5,stroke: 'black' }),  
    ],
  });
  chartContainer.value.appendChild(chart);
};

// 监听数据变化，自动重新绘制图表
watch(
  () => props.data,
  (newData, oldData) => {
    console.log(newData);
    if (newData !== oldData) {
      drawChart(); // 数据变化时重新绘制图表
    }
  },
  { immediate: true }
);

onMounted(() => {
  drawChart();
});
</script>

<style scoped>
.chart {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
