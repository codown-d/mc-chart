<template>
  <div class="relative w-full h-full">
    <div class="flex">
      <div class='flex items-center mb-4' 
      v-for="item in legendList">
        <div class="w-4 h-4 mx-3" :style="'background:'+item?.color"></div> {{ item?.label }}
      </div>
    </div>
    <div class="chart" :class="class" ref="chartContainer" style="height: 100%; width: 100%"></div>
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
interface PointData {
  x: number;
  y: number;
  color: string; // 每个点的颜色
}
const props = defineProps<{
  data: ChartData;
  legendList: {
    type: Array<{
      label:String;
      color:String;
    }>,
    required: false, // 设置为 false，使其成为可选项
    default: [] // 设置默认值为 true
  },
  pointSets: {
    type: PointData[],
    default: [] // 设置默认值为 true
  }
}>();

// 动态计算 isReady，判断数据是否已经准备好
const isReady = computed(() => {
  return props.data && props.data.values.length > 0;
});

// 获取容器的引用
const chartContainer = ref<HTMLElement | null>(null);

// 绘制图表的函数

let chart = ref()
const drawChart = () => {
  if (!chartContainer.value) return; // 确保容器存在
  chart.value && chartContainer.value?.removeChild(chart.value)
  const data = props.data;
  const pointSets = props?.pointSets || [];
  console.log(pointSets)
  chart.value = Plot.plot({
    color: {
      legend: false,
      padding: 20,
      transform: (y) => (y) / 1,
      labelOffset: 20,
      tickPadding: 10,
    },
    marks: [
      Plot.contour(data.values, {
        width: data.width,
        height: data.height,
        fill: Plot.identity,
        stroke: "black",
      }),
      Plot.dot(pointSets, {
        x: 'x',
        y: 'y',
        fill: (d) => d.color,
        r: 5,
        stroke: 'black'
      }),

    ],
    y: {
      label: "吹灰压力", tickSize: 0, tickFormat: (d: any, i: number) => d * 10
    },
    x: {
      label: "吹灰温度", tickSize: 0, tickFormat: (d: any, i: number) => d
    }
  });
  chartContainer.value.appendChild(chart.value);
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
watch(
  () => props.pointSets,
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
