<template>
  <div class="relative w-full h-full">
    <div
      class="chart"
      :class="class"
      ref="chart"
      style="height: 100%; width: 100%"
    ></div>
    <a-spin v-if="!isReady" class="absolute z-10 top-[50%] left-[50%]" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref, nextTick, watch } from "vue";
import * as echarts from "echarts";
import { merge } from "lodash";
const chart = ref(null);
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
const isReady = computed(() => {
  const currentOption = myChart.value?.getOption();
  return currentOption?.series.length != 0;
});

const option = {
  series: [
    {
      type: "gauge",
      axisLine: {
        lineStyle: {
          width: 5,
          color: [
            [0.3, "#67e0e3"],
            [0.7, "#37a2da"],
            [1, "#fd666d"],
          ],
        },
      },
      pointer: {
        itemStyle: {
          color: "auto",
        },
      },
      axisTick: {
        distance: -10,
        length: 8,
        lineStyle: {
          color: "#fff",
          width: 1,
        },
      },
      splitLine: {
        distance: -18,
        lineStyle: {
          color: "#fff",
          width: 1,
        },
      },
      detail: {
        valueAnimation: true,
        fontSize: 16,  
      },
      data: [],
    },
  ],
};
let init = () => {
  if (!chart.value) return;
  if (!myChart.value) {
    var ct = echarts.init(chart.value);
    myChart.value = ct;
    ct.setOption(merge({}, option, props.option), true);
  }
};

watch(
  props,
  (newValue, _oldValue) => {
    const opt = myChart.value.getOption();
    myChart.value.setOption(Object.assign({}, opt, newValue.option));
  },
  { deep: true }
);
nextTick(() => {
  init();
});
defineExpose({
  setChartInit() {
    myChart.value.dispose();
    var chart = echarts.init(chart.value);
    chart.setOption(merge({}, option, props.option));
    myChart.value = chart;
    return myChart.value;
  },

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
