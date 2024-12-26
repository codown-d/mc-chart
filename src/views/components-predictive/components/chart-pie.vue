<template>
  <Pie :option="option" ref="echartComponent" />
</template>
<script setup lang="ts">
import { onMounted, defineProps, ref, nextTick, watch } from "vue";
import Pie from "@/views/equipment-analysis/echarts/pie.vue";
import API from "@/api_v2";
import { merge } from "lodash";
const echartComponent = ref(null);
let option = ref({
  color: ["rgb(145,204,117)", "#ef9977", "#bababa"],
  title: {
    show: false,

  },
  tooltip: {
    show: false,
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: "占比",
      type: "pie",
      radius: ["40%", "66%"],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label: {
        show: false, // 显示标签
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
    dataType: "DeviceProportion",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-07-09T23:59:59+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    deviceData.value = res.data;
    let node = res.data.at(-1);
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.setOption(
      merge(option.value, {
        series: [
          {
            data: [
              { value: 1 - node.totallyproportion, name: "un-totallyproportion",itemStyle: { color: '#b92c2c' } },
              { value: node.totallyproportion, name: "totallyproportion",itemStyle: { color: '#54b92c' } },
            ],
          },
        ],
        graphic: [
    {
      type: 'text',
      left: 'center',  // 定位到图表中心
      top: 'center',
      style: {
        text: node.totallyproportion*100+'%',  // 这里显示总计
        textAlign: 'center',
        textVerticalAlign: 'middle',
        fill: '#000',  // 文字颜色
        font: 'bold 24px sans-serif'  // 字体大小和类型
      }
    }
  ]
      })
    );
  });
};
onMounted(() => {
  getDeviceAV(props.device_info.Device_Name);
});
</script>
