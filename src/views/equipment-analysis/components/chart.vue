<template>
  <div class="w-full h-full relative">
    <div class="absolute h-full w-full top-0 left-0 " style="z-index: 99;"></div>
    <Pie :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Pie from "../echarts/pie.vue";
import { findIndex } from "lodash";
const echartComponent = ref(null);

const props = defineProps({
  device_info: {
    type: Object,
    default: {},
  },
  data: {
    type: Object,
    default: {},
  },
  list: {
    type: Array,
    default: [],
  },
});
let colors = [
  "#c23531",
  "#2f4554",
  "#61a0a8",
  "#d48265",
  "#91c7ae",
  "#6e7074",
  "#546570",
  "#c4ccd3",
  "#f3f3f3",
  "#f0ffff",
];
let option = ref({
  title: {
    show: false,
  },
  legend: {
    show: false,
    hoverLink: false, 
  },
  tooltip: {
    show: false,
  },
  series: [
    {
      type: "pie",
      radius: ["55%", "90%"],
      data: props.list.map((item: any, index) => {
        return {
          name: item.name,
          value: item.value,
          itemStyle: {
            color:
              props.data.name === item.name
                ? colors[index]
                : "rgba(200, 200, 200, 0.5)",
          },
        };
      }),

      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      label: {
        show: false,
        position: "center",
      },
    },
  ],
});
onMounted(() => {
  setTimeout(() => {
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.dispatchAction({
      type: "highlight",
      seriesIndex: 0, 
      dataIndex: findIndex(props.list,(item=> props.data.name === item.name)), 
    });
  }, 0);
});
</script>
