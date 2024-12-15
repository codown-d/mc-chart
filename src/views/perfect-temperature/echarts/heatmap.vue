<template>
  <div
    class="relative w-full h-full overflow-hidden"
    style="perspective: 150px"
  >
    <img
      src="/images/bw-bj.jpg"
      alt=""
      class="absolute w-full h-full top-0 left-0"
    />
    <div
      class="chart w-full h-full"
      id="myCanvas"
      :class="class"
      ref="barChart"
      style=" transform:translate(0.5px, 0.5px) rotateX(45deg) rotateY(45deg) scale(0.3,0.3) skew(10deg,10deg)"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineExpose, ref, nextTick, watch } from "vue";
import * as echarts from "echarts";
import { merge } from "lodash";
const barChart = ref(null);
const myChart = ref(null);

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
      formatter: "{a} <br/>{b} : {d}%", // 显示百分比
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
    myChart.value.setOption(merge({}, option, option, newValue));
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
