<template>
  <div class="w-full h-full relative">
    <pangge-Title text="壁温分析" class="mb-[10px]"></pangge-Title>
    <div
      style="height: calc(100% - 26px)"
      class="flex justify-center items-center"
    >
      <div class="flex-1 h-[80%] mb-5">
        <heatmap :option="option" ref="echartComponent"></heatmap>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Heatmap from "../echarts/heatmap.vue";
import { findIndex, merge, max, min } from "lodash";
import API from "@/api";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
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
const hours = new Array(20).fill("").map((item, index) => index + 1);
// prettier-ignore
const days = new Array(10).fill('').map((item,index)=>'GAS'+(index+1));

let option = ref({
  xAxis: {
    show: false,
    type: "category",
    data: hours,
    splitArea: {
      show: true,
    },
  },
  yAxis: {
    show: false,
    type: "category",
    data: days,
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    show: false,
    min: 0,
    max: 10,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "15%",
  },
  series: [],
  tooltip: {
    formatter: function (params) {
    return  (params.value[2]).toFixed(2)+'℃'
  }
  },
});

let { deviceInfoOp } = useDeviceInfo();
const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceBW",
    // timeFrom: "2013-01-02T23:59:59+08:00",
    // timeEnd: "2013-03-02T00:00:00+08:00",
  };
  let res = await API.getData(params);
  console.log(res);
  const chartInstance = echartComponent.value.getChartInstance();
  let arr = [];
  let list = [];
  for (let i = 0; i < hours.length; i++) {
    for (let j = 0; j < days.length; j++) {
      list.push(res.data[i]["GAS" + j]);
      arr.push([i, j, res.data[i]["GAS" + j]]);
    }
  }

  const maxItem = max(list);
  const minItem = min(list);
  console.log(minItem,maxItem)
  chartInstance?.setOption(
    merge({}, option.value, {
      visualMap: {
        min: minItem,
        max: maxItem,
      },
      series: [
        {
          type: "heatmap",
          data: arr,
        },
      ],
    })
  );
};
watch(
  () => deviceInfoOp,
  (newValue, _oldValue) => {
    getDeviceAV(newValue[0]?.value);
  },
  { deep: true }
);
onMounted(() => {
  // console.log(deviceInfoOp)
  // setTimeout(() => {
  //   getDeviceAV(deviceInfoOp[0].Device_Name);
  // }, 50);
});
</script>
