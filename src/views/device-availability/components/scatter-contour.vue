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
    <div class="flex pt-5 flex-col mb-[5px]">
      <span class="text-[18px] mx-2">燃煤情况分析</span>
      <div class="flex flex-wrap " v-if="dataItem">
        <div
          v-for="item in optionsPm.slice(1)"
          class="flex flex-col text-[16px] mx-2 "
        >
          <span>{{ item.label }}：{{ dataItem[item.value] }}{{ item.p }}</span>
        </div>
      </div>
    </div>
    <div style="height:calc(100% - 60px)">
    <Line :option="option" ref="echartComponent" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import API from "@/api_v2";
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
    p:'%'
  },
  {
    label: "烟气含氧量",
    value: "O2",
    p:'%'
  },
  {
    label: "转化率 ",
    value: "Convscr",
    p:'%'
  },
  {
    label: "煤基地位发热量",
    value: "Qetar",
    p:'Kcal'
  },

  {
    label: "煤基硫分",
    value: "Sar",
    p:'%'
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
    top: "4%",
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
let dataItem = ref();
const getDeviceAV = () => {
  var params = {
    deviceName: valueLine.value,
    dataType: "DeviceCCET",
    output: optionsPm.value.map((item) => item.value).join(","),
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    dataItem.value = res.data[0];
    const chartInstance = echartComponent.value.setChartInit();
    let opt = Object.assign({}, option.value, {
      xAxis: [
        {
          min: dayjs(params.timeFrom).valueOf(),
          max: dayjs(params.timeEnd).valueOf(),
        },
      ],
      series: optionsPm.value
        .filter((item) => item.value === "CCET_Value")
        .map((item) => {
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
