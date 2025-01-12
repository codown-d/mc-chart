<template>
  <div style="height: calc(100%)" class="relative flex">
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import API from "@/api_v2";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import * as echarts from "echarts";
import { merge } from "lodash";
import dayjs from "dayjs";
const echartComponent = ref(null);
let valueLine = ref();
let option = ref({
  title: {
    show: false,
  },
  // grid: {
  //   show: true, // 启用背景
  //   backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //     // 上到下的渐变
  //     { offset: 1, color: "rgba(255, 0, 0, 0.1)" }, // 渐变起始色
  //     { offset: 0.5, color: "rgba(255, 255, 0, 0.1)" }, // 渐变起始色
  //     { offset: 0, color: "rgba(0, 128, 0, 0.1)" }, // 渐变结束色
  //   ]),
  //   borderWidth: 0,
  //   left: "4px",
  //   right: "0%",
  //   top: "0%",
  //   bottom: "2%",
  // },
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
      splitArea: {
            show: true,  // 显示分段区域
            areaStyle: {
                color: [
                    'rgba(255, 255, 255, 0)',   // 默认区域透明
                    'rgba(255, 255, 0, 0.3)',   // 8到9的区间为黄色
                    'rgba(255, 255, 255, 0)'    // 9到10及其他区间为透明
                ]
            }
        }
    },
  ],
  series: [],
});

let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceBlowHistory",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  let blowHistory = await API.getData(params);
  let arr1 = blowHistory.data.map((item) => {
    return {
      ...item,
      x: item.history_t,
      y: item.history_v,
      color: "#0f0",
    };
  });
  var params = {
    deviceName,
    dataType: "DeviceBlowRecently",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  let blowRecently = await API.getData(params);
  let arr2 = blowRecently.data.map((item) => {
    return {
      x: item.recently_t,
      y: item.recently_v,
      color: "#ff0",
    };
  });
  // pointSets.value = [...arr1, ...arr2];
  const chartInstance = echartComponent.value.getChartInstance();
    console.log(chartInstance)
    if(!chartInstance)return;
    chartInstance.setOption(
      merge({}, option.value, {
        series: [
          {
            type: "line",
            symbol: "none",
            data: [],
          },
        ],
      })
    );
};
watch(valueLine, (data) => {
  getDeviceAV(data);
});
onMounted(() => {
  // getDeviceAV();
});
</script>
