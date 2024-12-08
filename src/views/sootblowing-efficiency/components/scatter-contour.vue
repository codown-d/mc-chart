<template>
  <div class="relative" style="height: calc(100%)">
    <div class="absolute z-10 right-6 text-[14px]">
      设备：<a-select
        v-model:value="valueLine"
        :size="'small'"
        style="width: 80px"
        :options="deviceInfoOp"
      ></a-select>
      参数：<a-select
        v-model:value="valueLinePm"
        mode="multiple"
        :maxTagTextLength="10"
        :maxTagCount="3"
        :size="'small'"
        placeholder="请选择参数"
        style="width: 260px"
        :options="optionsPm"
      ></a-select>
    </div>
    <Line3D :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line3D from "../echarts/line3d.vue";
import API from "@/api";
import { merge, find } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
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
let option = ref({
  series: [
    {
      type: "line3D",
      data: generate3DData(), // 数据
      lineStyle: {
        width: 4,
        color: "blue",
      },
      emphasis: {
        lineStyle: {
          color: "red",
        },
      },
    },
  ],
});
function generate3DData() {
  const data = [];
  for (let x = 0; x <= 50; x++) {
    const y = Math.sin(x / 10) * 10;
    const z = Math.cos(x / 10) * 10;
    data.push([x, y, z]); // [X, Y, Z]
  }
  return data;
}
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
    // const chartInstance = echartComponent.value.setChartInit();
    // let opt = Object.assign({}, option.value, {
    //   xAxis: [
    //     {
    //       min: dayjs(params.timeFrom).valueOf(),
    //       max: dayjs(params.timeEnd).valueOf(),
    //     },
    //   ],
    //   series: valueLinePm.value.map((item) => {
    //     let label =
    //       find(optionsPm.value, (ite) => ite.value === item)?.label || item;
    //     return {
    //       name: label,
    //       type: "line",
    //       symbol: "none",
    //       data: res.data.map((ite) => {
    //         return [dayjs(ite.timestamp).valueOf(), ite[item]];
    //       }),
    //     };
    //   }),
    // });
    // chartInstance.setOption(opt);
  });
};
watch(valueLine, (data) => {
  getDeviceAV();
});
watch(valueLinePm, (data) => {
  getDeviceAV();
});
</script>
