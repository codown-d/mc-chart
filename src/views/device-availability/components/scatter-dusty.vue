<template>
  <div class="relative" style="height: calc(100%)">
    <Pie :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineProps, ref, nextTick, watch } from "vue";
import Pie from "@/views/equipment-analysis/echarts/pie.vue";
import API from "@/api";
import { merge } from "lodash";
const echartComponent = ref(null);
let option = ref({
  // color: ["rgb(145,204,117)", "#ef9977", "#bababa"],
  title: {
    show: false,
    text: "满负荷运行时间占比",
    left: "center",
    textStyle: {
      fontSize: 14,
    },
  },
  grid: {
    top: "4%", // 20% of the container's height from the top
  },
  legend: {
    show: false,
    hoverLink: false,
  },
  series: [
    {
      name: "占比",
      type: "pie",
      radius: ["55%", "90%"],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label: {
        show: true, // 显示标签
        position: "outside", // 标签位置
        formatter: "{d}%", // 自定义标签格式，{b}是扇区名称，{d}是百分比
      },
      data: [],
    },
  ],
});
let deviceData = ref({});
const props = defineProps({
  device_info: {
    type: Object,
    default: {},
  },
});
watch(props, (newValue) => {
  getDeviceAV(newValue.device_info.Device_Name);
});
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
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.setOption(
      merge(option.value, {
        series: [
          {
            data: [
              { value: node.Inlet_O2, name: "烟气进口氧量" },
              { value: node.Outlet_O2, name: "烟气出口氧量" },
              { value: node.leak + 50, name: "漏风率" },
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
