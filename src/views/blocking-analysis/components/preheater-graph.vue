<template>
  <div class="relative" style="height: calc(100%)">
    <div class="absolute flex justify-between w-full z-50">
      <div class="flex items-center">
        <pangge-Title text="预热器关键参数趋势" class="ml-5 mr-4" />
        <a-range-picker v-if="type !== 'biwen'" v-model:value="valueTime" show-time size="small" class="w-[280px]" />
      </div>
      <div class="text-[16px] mr-5 flex justify-end flex-1 items-center">
        <span class="mr-1">
          设备：<a-select v-model:value="valueLine" size="small"  :options="deviceInfoOp"></a-select>
        </span>
        参数：<a-select v-model:value="valueLinePm" mode="multiple" :maxTagTextLength="4" :maxTagCount="2" size="small"
          placeholder="请选择参数" class="w-[320px] min-w-[270px]" :options="optionsPm"></a-select>
      </div>
    </div>
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref, nextTick, watch } from "vue";
import Line from "../echarts/line.vue";
import API from "@/api_v2";
import { merge, find } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});
const echartComponent = ref(null);
let valueLine = ref();
let valueLinePm = ref(["Gas_Inlet_Temperture", "Gas_Outlet_Temperture"]);
let optionsPm = ref([
  {
    label: "烟气入口温度",
    value: "Gas_Inlet_Temperture",
  },
  {
    label: "烟气出口温度",
    value: "Gas_Outlet_Temperture",
  },
  {
    label: "一次风机入口温度",
    value: "PA_Inlet_Temperture",
  },
  {
    label: "一次风机出口温度",
    value: "PA_Outlet_Temperture",
  },

  {
    label: "二次风机入口温度",
    value: "SA_Inlet_Temperture",
  },
  {
    label: "二次风机出口温度",
    value: "SA_Outlet_Temperture",
  },

  {
    label: "烟气入口压力",
    value: "Gas_Inlet_Pressure",
  },
  {
    label: "烟气出口压力",
    value: "Gas_Outlet_Pressure",
  },
  {
    label: "一次风机入口压力",
    value: "PA_Inlet_Pressure",
  },
  {
    label: "一次风机出口压力",
    value: "PA_Outlet_Pressure",
  },
  {
    label: "二次风机入口压力",
    value: "SA_Inlet_Pressure",
  },
  {
    label: "二次风机出口压力",
    value: "SA_Outlet_Pressure",
  },
  {
    label: "一次风机风量",
    value: "PA_Flow",
  },
  {
    label: "二次风机风量",
    value: "SA_Flow",
  },
  {
    label: "总风量",
    value: "Total_Air_Flow",
  },
  {
    label: "蒸汽压力",
    value: "Steam_Blowing_Pressure",
  },
  {
    label: "烟气进口含氧量",
    value: "O2_Inlet_Level_P2",
  },
  {
    label: "烟气出口含氧量",
    value: "O2_Inlet_Level_P2",
  },
  {
    label: "烟气含氧量占比",
    value: "O2_Out_Level",
  },
  {
    label: "冷端综合温度",
    value: "CCET",
  },
  {
    label: "吹灰蒸汽温度",
    value: "steam_temperature",
  },
  {
    label: "吹灰压力",
    value: "dust_pressure",
  },
  {
    label: "吹灰蒸汽压力",
    value: "steam_pressure",
  },
  {
    label: "烟气差压",
    value: "differ_pressure",
  },
]);
let valueTime = ref();
let option = ref({
  title: {
    show: false,
    text: "预热器关键参数趋势",
    left: "7%",
  },
  grid: {
    left: "8%",
    right: "6%",
    top: "16%",
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
      type: "category",
    },
  ],

  yAxis: [
    {
      type: "value",
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
    dataType: "DeviceData",
    output: valueLinePm.value.join(","),
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.setChartInit();
    let opt = Object.assign({}, option.value, {
      xAxis: [
        {
          data: res.data.map((item) => dayjs(item.timestamp).format("MM-DD")),
        },
      ],
      series: valueLinePm.value.map((item) => {
        let label =
          find(optionsPm.value, (ite) => ite.value === item)?.label || item;
        return {
          name: label,
          type: "line",
          symbol: "none",
          data: res.data.map((ite) => {
            return ite[item];
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
watch(valueLinePm, (data) => {
  getDeviceAV();
});
</script>
