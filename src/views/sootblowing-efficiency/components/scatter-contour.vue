<template>
  <div class="relative" style="height: calc(100%)">
    <Line3D :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line3D from "../echarts/line3d.vue";
import API from "@/api";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
const echartComponent = ref(null);
let valueLine = ref();
let valueLinePm = ref(["Gas_Inlet_Temperture", "Gas_Outlet_Temperture"]);
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
    data.push([x,1, z]); // [X, Y, Z]
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
