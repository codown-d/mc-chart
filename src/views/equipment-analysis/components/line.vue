<template>
  <div style="height: calc(100%)" class="relative flex">
    <Line :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import { merge } from "lodash";
import API from "@/api_v2";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
const echartComponent = ref(null);
let valueLine = ref();
let option = ref({
  xAxis: [
    {
      type: "time",
      axisLabel: {
      formatter: function (value) {
        const date = new Date(value);
        return dayjs(date).format("MM/D HH:mm")
      },
    },
    },
  ],
  legend: {
    top: '5%', // 图例显示在上方，距离容器顶部 5%
    left: 'center', // 图例居中
  },
  yAxis: [
    {
      type: "value",
      splitLine: {
        show: false, 
      },
    },
  ],
  series: [],
});
const props = defineProps({
  loadIndex: {
        type: Number,
        default: 1,
    },
});
let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceLoad",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2012-02-10T00:00:00+08:00",
    timeEnd: "2013-10-20T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    console.log(res.data)
    let data = res.data.filter(item=>item.loadindex==props.loadIndex);
    chartInstance.setOption(
      merge({}, option.value, {
        series: [
          {
            name: "烟气压差",
            type: "line",
            symbol: "none",
            smooth: true,
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(), item.differ_gas_press]
            }),
          },
          {
            name: "烟气入口烟气温度",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),item.gas_inlet_temp]
            }),
          },
          
          {
            name: "烟气出口烟气温度",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),item.gas_outlet_temp]
            }),
          },
          
          {
            name: "负荷",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),item.unitload]
            }),
          },
          {
            name: "一次风机压差",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),item.differ_pa_press]
            }),
          },
          {
            name: "二次风机压差",
            type: "line",
            symbol: "none",
            data: data.map(item => {
              return [dayjs(item.timestamp).valueOf(),item.differ_sa_press]
            }),
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
