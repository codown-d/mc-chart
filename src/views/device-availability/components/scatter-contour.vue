<template>
  <div class="relative" style="height: calc(100%)">
    <div class="absolute z-10 right-6 text-[14px]" v-if="false">
      设备：<a-select
        v-model:value="valueLine"
        :size="'small'"
        style="width: 80px"
        :options="deviceInfoOp"
      ></a-select>
    </div>
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import API from "@/api";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
const echartComponent = ref(null);
let valueLine = ref();
let optionsPm = ref([
  {
    label: "CCET_Value",
    value: "CCET_Value",
  },
  {
    label: "煤基灰分",
    value: "Aar",
  },
  {
    label: "烟气含氧量",
    value: "O2",
  },
  {
    label: "转化率 ",
    value: "Convscr",
  },
  {
    label: "煤基地位发热量",
    value: "Qetar",
  },

  {
    label: "煤基硫分",
    value: "Sar",
  },
]);
let option = ref({
  title: {
    show: false,
    text: "预热器关键参数趋势",
    left: "7%",
  },
  grid: {
    left: "8%",
    right: "6%",
    top: "20%",
    bottom: "20%",
  },
  legend: {
    bottom: "0%",
    left: "center",
    icon: "circle",
    z: 99,
  },
  dataZoom: [
    {
      type: "slider",
      start: 80,
      end: 100,
    },
  ],
  xAxis: [
    {
      type: "time",
    },
  ],

  yAxis: [
    {
      type: "value",
      splitArea: {
        show: true,
      },
    },
  ],
  series: [],
});

let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const getDeviceAV = () => {
  var params = {
    deviceName: valueLine.value,
    dataType: "DeviceCCET",
    output: optionsPm.value.map((item) => item.value).join(","),
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.setChartInit();
    let opt = Object.assign({}, option.value, {
      xAxis: [
        {
          min: dayjs(params.timeFrom).valueOf(),
          max: dayjs(params.timeEnd).valueOf(),
        },
      ],
      series: optionsPm.value.map((item) => {
        return {
          name: item.label,
          type: "line",
          symbol: "none",
          data: res.data.map((ite) => {
            return [dayjs(ite.Date).valueOf(), ite[item.value]];
          }),
        };
      }),
    });
    chartInstance.setOption(opt);
  });
};
watch(valueLine, (data) => {
  getDeviceAV();
});
</script>
