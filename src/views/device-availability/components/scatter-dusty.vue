<template>
  <div class="relative flex " style="height: calc(100%)">
    <div  class="w-[55%]">
      <Gauge :option="option" ref="echartComponent" />
    </div>
    <div class="flex-1 mt-8" v-if="dataInfo">
      <div v-for="item in item" class="text-[18px]">
        {{ item.name }}：{{ dataInfo[item.type].toFixed(2) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineProps, ref, nextTick, watch } from "vue";
import Gauge from "../echarts/gauge.vue";
import API from "@/api";
import { merge } from "lodash";
const echartComponent = ref(null);
let option = ref({
  grid: {
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "0%",
  },
  series: [],
});
let deviceData = ref({});
let item = ref([
  { value: 0, type: 'Inlet_O2', name: "烟气进口氧量" },
  { value: 0, type: 'Outlet_O2', name: "烟气出口氧量" },
  { value: 0, type: 'leak', name: "漏风率" }
])
const props = defineProps({
  device_info: {
    type: Object,
    default: {},
  },
});
watch(props, (newValue) => {
  getDeviceAV(newValue.device_info.Device_Name);
});
let dataInfo = ref()
const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceXproportion",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
    output: [
      {
        field: "X_Value",
        func: "sum",
      },
      {
        field: "leak",
        func: "sum",
      },
      {
        field: "Inlet_O2",
        func: "sum",
      },
      {
        field: "Outlet_O2",
        func: "sum",
      },
    ],
    group: {
      timeInterval: 60 * 24 * 60 * 60,
    },
  };
  API.getDataAgg(params).then((res) => {
    deviceData.value = res.data;
    let node = res.data[0];
    dataInfo.value = node
    console.log(node)
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.setOption(
      merge(option.value, {
        series: [
          {
            data: [
              {
                value: +(node.X_Value).toFixed(2),
              },
            ],
          },
        ],
      })
    );
    console.log(chartInstance, res.data);
  });
};
onMounted(() => {
  getDeviceAV(props.device_info.Device_Name);
});
</script>
