<template>
  <div class="relative w-full h-full">
    <div
      class="chart  w-full h-full"
      :class="class"
      ref="barChart"
    ></div>
    <a-spin v-if="!isReady" class="absolute z-10 top-[50%] left-[50%]" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Popover } from "ant-design-vue";
import * as echarts from "echarts";
import { merge } from "lodash";
import dayjs from "dayjs";
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
const isReady = computed(() => {
  const currentOption = myChart.value?.getOption();
  return currentOption?.series.length != 0;
});

const option = {
  title: {
    left: "8%",
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: [
    {
      axisLabel: {
        formatter: function (value) {
          return dayjs(value).format('YY/M/D HH:mm');
        },
        // rotate: 45,  
      }
    }
  ],
  grid: {
    left: "8%",
    right: "6%",
    top: "20%",
    bottom: "20%",
  },
  legend: {
    bottom: "0%",
    left: "center",
    icon: "circle",
    z: 99,
  },
  series: [],
};
let init = () => {
  if (!barChart.value) return;
  if (!myChart.value) {
    var chart = echarts.init(barChart.value);
    myChart.value = chart;
  }
  chart.setOption(merge({}, option, props.option), true);
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
    var chart = echarts.init(barChart.value);
    chart.setOption(merge({}, option,props.option));
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
