<template>
  <div class="relative w-full h-full overflow-hidden">
    <div class="chart w-full h-full" id="myCanvas" :class="class" ref="barChart"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineExpose, ref, nextTick, watch } from "vue";
import * as echarts from "echarts";
import { merge } from "lodash";
const barChart = ref(null);
const myChart = ref(null);

//style="perspective: 150px"
const props = defineProps({
  option: {
    type: Object,
    default: {},
  },
  class: {
    type: String,
    default: "",
  },
});
let init = () => {
  if (!barChart.value) return;
  if (!myChart.value) {
    var chart = echarts.init(barChart.value);
    myChart.value = chart;
  }
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}°C", // 显示百分比
    },
    grid: {
      height: '100%',
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: "0%",
    },
    legend: {
      bottom: "0%",
      left: "center",
      icon: "circle",
    },
    series: [],
  };
  option && chart.setOption(merge({}, option, props.option));
};
watch(
  props,
  (newValue, _oldValue) => {
    const option = myChart.value.getOption();
    myChart.value.setOption(merge({}, option, newValue));
  },
  { deep: true }
);
defineExpose({
  getChartInstance() {
    return myChart.value;
  },
});
nextTick(() => {
  init();
});
onMounted(() => {
  window.addEventListener("resize", () => {
    myChart.value.resize();
  });
});
</script>
