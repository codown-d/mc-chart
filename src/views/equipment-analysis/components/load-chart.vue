<template>
  <Pie :option="option" ref="echartComponent" />
</template>
<script setup lang="ts">
import { onMounted, defineProps, ref, nextTick, watch } from "vue";
import Pie from "../echarts/pie.vue";
import API from "@/api_v2";
import { merge } from "lodash";
const echartComponent = ref(null);
let option = ref({
  color: ["rgb(145,204,117)", "#ef9977", "#bababa"],
  title: {
    show:false,
    text: "满负荷运行时间占比",
    left: "center",
    textStyle: {
      fontSize: 14,
    },
  },
  series: [
    {
      name: "负荷占比",
      type: "pie",
      radius: ["44%", "65%"],
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
      data: [
        { value: 580, name: "累计运行时间" },
        { value: 1048, name: "停机时间" },
        { value: 735, name: "未知运行时间" },
      ],
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
    dataType: "DeviceAV",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
    output: [
      { 
        field: "PeriodRunTime",
        func: "sum",
      },
      {
        field: "PeriodStopTime",
        func: "sum",
      },
      {
        field: "PeriodOfflineTime",
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
    console.log(node);
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.setOption(
      merge(option.value, {
        series: [
          {
            data: [
              { value: node.PeriodRunTime, name: "累计运行时间" },
              { value: node.PeriodStopTime, name: "停机时间" },
              { value: node.PeriodOfflineTime, name: "未知运行时间" },
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
