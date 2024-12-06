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
import * as d3 from "d3";
import { max, min } from "lodash";
import * as Plot from "@observablehq/plot";

// 定义 props 类型
interface ChartData {
  date: string;
  temperature: number;
}

const props = defineProps<{
  data: ChartData[];
}>();

// 动态计算 isReady，判断数据是否已经准备好
const isReady = computed(() => {
  return props.data && props.data.length > 0;
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
  const chart = Plot.line(data, {x: "date", y: "temperature", z: null, stroke: "temperature", curve: "step-before"}).plot({nice: true})
  chartContainer.value.appendChild(chart);
};

// 监听数据变化，自动重新绘制图表
watch(
  () => props.data,
  (newData, oldData) => {
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
