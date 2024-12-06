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
  <!-- <div class="h-[35px]">
    <Bar :option="optionBar" ref="echartComponentBar" />
  </div> -->
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import Bar from "@/views/equipment-analysis/echarts/bar.vue";
import API from "@/api";
import { merge } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
import * as echarts from "echarts";
const echartComponent = ref(null);
const echartComponentBar = ref(null);
let valueLine = ref();
let option = ref({
  title: {
    text: "阻力性能退化风险趋势",
    left: "8%",
    textStyle: {
      fontSize: 14, // 设置字体大小为 14px
    },
  },
  grid: {
    show: true, // 启用背景
    backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      // 上到下的渐变
      { offset: 1, color: "rgba(255, 0, 0, 0.1)" }, // 渐变起始色
      { offset: 0.5, color: "rgba(255, 255, 0, 0.1)" }, // 渐变起始色
      { offset: 0, color: "rgba(0, 128, 0, 0.1)" }, // 渐变结束色
    ]),
    borderWidth: 0,
    left: "8%",
    right: "6%",
    top: "20%",
    bottom: "20%",
  },
  visualMap: {
    top: 50,
    right: 10,
    pieces: [
      {
        gt: 0,
        lte: 50,
        color: "#93CE07",
      },
      {
        gt: 50,
        lte: 100,
        color: "#FBDB0F",
      },
      {
        gt: 100,
        lte: 150,
        color: "#FC7D02",
      },
      {
        gt: 150,
        lte: 200,
        color: "#FD0100",
      },
      {
        gt: 200,
        lte: 300,
        color: "#AA069F",
      },
      {
        gt: 300,
        color: "#AC3B2A",
      },
    ],
    outOfRange: {
      color: "#999",
    },
  },
  xAxis: [
    {
      type: "category",
      // axisLabel: {
      //   formatter: "{yyyy}-{MM}-{dd}",
      // },
    },
  ],
  yAxis: [
    {
      // name: "yAxis-name",
      type: "value",
      splitLine: {
        show: false, // 设置为 false，隐藏横向网格线
      },
    },
  ],
  series: [],
});
let optionBar = ref({
  yAxis: {
    type: "category",
    show: false,
  },
  xAxis: {
    type: "value",
    show: false,
  },
  grid: {
    left: "8%", // 10% of the container's width from the left side
    right: "6%", // 10% of the container's width from the right side
    top: "1%", // 20% of the container's height from the top
    bottom: "0%", // 15% of the container's height from the bottom
  },
  series: [],
});

let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceDegradation",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2013-02-01T20:55:00+08:00",
    timeEnd: "2013-04-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.setOption(
      merge({}, option.value, {
        xAxis: [
          {
            type: "category",
            data: res.data.map((item) => dayjs(item.timestamp).format("MM-DD")),
          },
        ],
        series: [
          {
            name: "堵灰趋势",
            type: "line",
            symbol: "none",
            data: res.data.map((item) => {
              return item.KPI_CV;
            }),
            markLine: {
              silent: true,
              label: {
                show: true,
                formatter: "{b}:{c}",
              },
              lineStyle: {
                color: "#333",
              },
              data: [
                {
                  yAxis: 0.3,
                  x: 200, // 起始点 x 坐标
                  y: -200, // 起始点 y 坐标
                  name: "最小值",
                },
                {
                  yAxis: 0.9,
                  name: "最大值",
                },
              ],
            },
          },
          {
            name: "趋势参考线",
            type: "line",
            symbol: "none",
            data: res.data.map((item) => {
              return item.RMSE;
            }),
            markLine: {
              data: [
                {
                  xAxis: dayjs("2013-02-03 05:00:00").format("MM-DD"),
                  name: "特定日期",
                  lineStyle: {
                color: "#ff0000", // 红色线
                width: 2,
                type: "dashed", // 虚线
              }
                }, // 在 'Wed' 列上绘制竖线
              ],
              // label: {
              //   show: true,
              //   position: "start", // 标签显示在竖线的开始位置
              // },
            },
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
