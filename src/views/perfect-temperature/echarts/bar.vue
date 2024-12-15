<template>
  <div class="chart" :class="class" ref="barChart" style="height: 100%; width: 100%"></div>
</template>
<script setup lang="ts">
import { onMounted, defineExpose, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as echarts from "echarts";
import { merge } from "lodash";
const barChart = ref(null);
const myChart = ref(null);

const props = defineProps({
  option: {
    type: Object,
    default: {},
  },
  class:{
    type: String,
    default: "",
  }
});
let init = () => {
  if (!barChart.value) return;
  if (!myChart.value) {
    var chart = echarts.init(barChart.value);
    myChart.value = chart;
  }
  var option = {
    tooltip: {
        trigger: 'axis'
    },
  grid: {
    left: '10%',    // 10% of the container's width from the left side
    right: '10%',   // 10% of the container's width from the right side
    top: '20%',     // 20% of the container's height from the top
    bottom: '20%'   // 15% of the container's height from the bottom
  },
    legend: {
      bottom: "0%",
      left: "center",
      icon: 'circle', 
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
nextTick(() => {
  init();
});

defineExpose({
  getChartInstance() {
    return myChart.value;
  },
});
onMounted(() => {
  window.addEventListener("resize", () => {
    myChart.value.resize();
  });
});
</script>
