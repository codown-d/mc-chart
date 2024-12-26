<template>
  <div style="height: calc(100%)" class="relative">
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import API from "@/api_v2";
import { merge } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
const echartComponent = ref(null);
let valueLine = ref();
let option = ref({
  title: {
    show: false,
  },
  legend: {
    show: false,
  },
  xAxis: [
    {
      type: "time",
      boundaryGap: false,
    },
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        show: false, // 设置为 false，隐藏横向网格线
      },
    },
  ],
  series: [],
});
let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceProportion",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-07-09T23:59:59+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  API.getData(params).then((res) => { 
    let data = res.data[0];
    let lastNode = res.data.at(-1);
    let startT = dayjs(data.timestamp).valueOf();
    let endT = dayjs(lastNode.timestamp).valueOf();
    const chartInstance = echartComponent.value.getChartInstance();
    console.log(chartInstance)
    if(!chartInstance)return;
    chartInstance.setOption(
      merge({}, option.value, {
        xAxis: [
          {
            min: startT,
            max: endT,
          },
        ],
        series: [
          {
            type: "line",
            symbol: "none",
            data: res.data.map(item=>{
              return [dayjs(item.timestamp).valueOf(),item.dailyproportion]
            }),
          },
        ],
      })
    );
  });
};
watch(valueLine, (data) => {
  getDeviceAV(data);
});
onMounted(() => {
  // getDeviceAV();
});
</script>
