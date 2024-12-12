<template>
  <div style="height: calc(100%)" class="relative">
    <!-- <div class="absolute z-10 right-6 text-[14px]">
        设备：
        <a-select
          v-model:value="valueLine"
          :size="'small'"
          style="width: 100px"
          :options="deviceInfoOp"
        ></a-select>
      </div> -->
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import API from "@/api";
import { merge } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
import * as echarts from "echarts";

import data from "../data/temperature.js";
import {generateRandomPoints} from "@/utils/index.js";
const echartComponent = ref(null);
let valueLine = ref();
let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});

let option = ref({
  title: {
    show: false,
    text: "热效率历史趋势",
    left: "7%",
  },
  //   grid: {
  //     left: "8%",
  //     right: "6%",
  //     top: "20%",
  //     bottom: "20%",
  //   },

  grid: {
    show: true, // 启用背景
    backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      // 上到下的渐变
      { offset: 1, color: "rgba(255, 0, 0, 0.1)" }, // 渐变起始色
      { offset: 0.5, color: "rgba(255, 255, 0, 0.1)" }, // 渐变起始色
      { offset: 0, color: "rgba(0, 128, 0, 0.1)" }, // 渐变结束色
    ]),
    borderWidth: 0,
    left: "10%",
    right: "6%",
    top: "15%",
    bottom: "12%",
  },
  visualMap: [
    {
      show: true,
      type: "continuous",
      seriesIndex: 0,
      min: 0,
      max: 200,
      inRange: {
        color: ["#ff0", "#f00"], // 设定范围内的颜色
      },
      outOfRange: {
        color: ["#000"], // 超出范围的颜色
      },
      left: 'right',  // 水平居中
      top: 'center',      // 垂直居上
    },
  ],
  xAxis: [
    {show:false,
      type: "time",
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
const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceHotefficiencyLSTM",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2013-02-01T20:55:00+08:00",
    timeEnd: "2013-04-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    let data = res.data;
    let last = data.at(-1)
    let startT = dayjs(data[0].timestamp).valueOf();
    let endT = dayjs(last.timestamp).add(0, "day").valueOf();
    console.log(last)
    chartInstance.setOption(
      merge({}, option.value, {
        xAxis: [
          {
            min: startT,
            max: endT,
          },
        ],
        yAxis: [{
          max: last.threshold*1.2
        }],
        series: [
          {
            name: "换热效率趋势",
            type: "line",
            symbol: "none",
            data: data.map(item=>{
              return [dayjs(item.timestamp).valueOf(),item.trendvalue]
            }),
          },
          {
            name: "阈值线",
            type: "line",
            symbol: "none",
            data: data.map(item=>{
              return [dayjs(item.timestamp).valueOf(),item.threshold]
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
onMounted(() => { });


</script>
