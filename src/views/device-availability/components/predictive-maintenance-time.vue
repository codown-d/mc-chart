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
import API from "@/api";
import { merge } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";

import timeLineData from "@/views/availability/echarts/timeLineData.json";
import dayjs from "dayjs";
import * as echarts from "echarts";
const echartComponent = ref(null);
const echartComponentBar = ref(null);
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
      show: false,
    },
  ],
  yAxis: [
    {
      // name: "yAxis-name",
      show:false,
      type: "value",
      max: 4,
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
    dataType: "DeviceDegradation",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2013-02-01T20:55:00+08:00",
    timeEnd: "2013-04-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    let data = timeLineData.map(item => {
      return {
        ...item,
        timestamp: item.year
      }
    });
    let arr = data.map((item, index) => {
      return [{
        xAxis: dayjs(item.timestamp).valueOf(),
        yAxis: index % 2 == 0 ? 0 : 4,
        itemStyle: { color: item.composer=='Alarm'?'#e5512c':'#09ae3a' },
        label: {
          show: true,
          position: "start",
          formatter: function (params) {
            return `${item.composition}`;
          },
        },
      },
      { xAxis: dayjs(item.timestamp).valueOf(), yAxis: 2, },]
    })
    let last = data.at(-1).timestamp;
    let startT = dayjs(data[0].timestamp).valueOf();
    let endT = dayjs(last).valueOf();

    chartInstance.setOption(
      merge({}, option.value, {
        xAxis: [
          {
            min: startT,
            max: dayjs(endT).valueOf(),
          },
        ],
        series: [
          {
            name: "参考衰减趋势",
            type: "line",
            lineStyle: {
              width: 4, // 设置线条的粗细
              // color: '#ff0000',  // 设置线条颜色
            },
            data: data.map((item) => [dayjs(item.timestamp).valueOf(), 2]),
            label: {
              show: true, // 显示数据点说明
              position: 'top', // 显示位置（'top', 'left', 'right', 'bottom'）
              formatter: function (params) {
                return dayjs(params.data[0]).format("YYYY-MM-DD HH:mm"); // 显示点的自定义说明
              },
            },
            markLine: {
              data: [
                [{
                  xAxis: dayjs(startT).valueOf(),
                  label: {
                    show: true,
                    position: "start",
                    formatter: function (params) {
                      return `${dayjs(params.data.xAxis).format("HH:mm:ss")}`;
                    },
                  },
                  lineStyle: {
                    color: "#ff0000", // 红色线
                    width: 2,
                    type: "dashed", // 虚线
                  },
                },
                {
                  xAxis: dayjs(last).valueOf(),
                  label: {
                    show: true,
                    position: "start",
                    formatter: function (params) {
                      return `${dayjs(params.data.xAxis).format("HH:mm:ss")}`;
                    },
                  },
                  lineStyle: {
                    color: "#ff0000", // 红色线
                    width: 2,
                    type: "dashed", // 虚线
                  },
                }],
                ...arr
              ],
              symbol: ["none", "none"], // 去掉标记线两端的箭头
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
