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
import { precisionFixed } from "d3";
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
      show: false,
    },
  ],
  yAxis: [
    {
      // name: "yAxis-name",
      show: false,
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
    dataType: "DeviceAV",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2013-02-01T20:55:00+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    let data = res.data.map((item) => {
      return {
        ...item,
        timestamp: item.timestamp,
      };
    });
    let arr = data.filter(item=>item.PeriodStopTime).map((item, index) => {
      return [
        {
          xAxis: dayjs(item.timestamp).valueOf(),
          yAxis: index % 2 == 0 ? 0 : 4,
          itemStyle: {
            color: item.PeriodStopTime != 0 ? "#e5512c" : "#09ae3a",
          },
          label: {
            show: true,
            position: "start",
            formatter: function (params) {
              return `${item.PeriodStopTime != 0 ? "设备停机" : ""}`;
            },
          },
        },
        { xAxis: dayjs(item.timestamp).valueOf(), yAxis: 2 },
      ];
    });
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
            },
            data: data.map((item) => [
              dayjs(item.timestamp).valueOf(),
              2,
              item.PeriodStopTime,
            ]),
            label: {
              show: true,
              position: "top",
              formatter: function (params) {
                return params.data[2] != 0
                  ? dayjs(params.data[0]).format("HH:mm")
                  : ""; // 显示点的自定义说明
              },
            },
            markLine: {
              data: arr,
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
