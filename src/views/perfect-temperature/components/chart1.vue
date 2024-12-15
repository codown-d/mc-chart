<template>
  <div class="w-full h-full relative">
    <div class="absolute h-full w-full top-0 left-0 " style="z-index: 99;"></div>
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
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
    text: "阻力性能退化风险趋势",
    left: "8%",
    textStyle: {
      fontSize: 14, // 设置字体大小为 14px
    },
  },
  // legend: [
  //   {
  //     left: "1%", // 将图例放在左侧
  //     top: "55px",
  //     orient: "vertical", // 设置图例垂直排列
  //     icon: "rect", // 使用矩形代替默认图标
  //     itemWidth: 20, // 横线的宽度
  //     itemHeight: 2, // 横线的高度
  //     data: ["参考衰减趋势", "实际衰减趋势"],
  //   },
  // ],
  xAxis: [
    {
      type: "time",
      boundaryGap: false,
      show: false,
      position: "top", // x 轴放到顶部
    },
  ],
  yAxis: [
    {
      // name: "yAxis-name",
      type: "value",
      // inverse: true,
      splitLine: {
        show: false, // 设置为 false，隐藏横向网格线
      },
    },
  ],
  series: [],
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
