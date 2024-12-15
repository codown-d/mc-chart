<template>
  <div style="height: calc(100%)" class="relative flex">
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import { merge } from "lodash";
import API from "@/api";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
const echartComponent = ref(null);
let valueLine = ref();
let option = ref({
  xAxis: [
    {
      type: "time",
      boundaryGap: false,
      show: false,
      position: "top", 
    },
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        show: false, 
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
    dataType: "DeviceCBM",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    let data = res.data;
    chartInstance.setOption(
      merge({}, option.value, {
        series: [
          {
            name: "烟气压差",
            type: "line",
            symbol: "none",
            smooth: true,
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(), Math.random()*10]
            }),
          },
          {
            name: "烟气入口烟气温度",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),Math.random()*10]
            }),
          },
          
          {
            name: "烟气出口烟气温度",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),Math.random()*10]
            }),
          },
          
          {
            name: "负荷",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),Math.random()*10]
            }),
          },
          {
            name: "一次风机压差",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),Math.random()*10]
            }),
          },
          {
            name: "二次风机压差",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),Math.random()*10]
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
