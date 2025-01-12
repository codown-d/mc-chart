<template>
  <div class="w-full h-full relative">
    <pangge-Title text="壁温分析" class="mb-[10px] absolute"></pangge-Title>
    <div style="height: calc(100%)" class="flex justify-center items-center pt-6 relative">
      <heatmap :option="option" ref="echartComponent"></heatmap>
      <div class="absolute w-full h-full bottom-0 pt-6">
        <Line :option="optionLine" ref="echartComponentLine" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Heatmap from "../echarts/heatmap.vue";
import * as echarts from "echarts";
import { findIndex, merge, max, min } from "lodash";
import API from "@/api_v2";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import Line from "@/views/blocking-analysis/echarts/line.vue";
const echartComponent = ref(null);
const echartComponentLine = ref(null);

const props = defineProps({
  device_info: {
    type: Object,
    default: {},
  },
  data: {
    type: Object,
    default: {},
  },
  list: {
    type: Array,
    default: [],
  },
});
const hours = new Array(20).fill("").map((item, index) => index + 1);
const days = new Array(10).fill("").map((item, index) => "GAS" + (index + 1));

let optionLine = ref({
  title: {
    show: false,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      position: "top", // x 轴放到顶部
    },
  ],
  grid: {
    left: "0%",
    top: "0%",
    right: '0%',
    bottom: '0%'
  },
  yAxis: [
    {
      type: "category",
    },
  ],
  series: [],
});

let option = ref({
  xAxis: {
    show: false,
    type: "category",
    data: days,
    splitArea: {
      show: true,
    },
  },
  grid: {
    height: "100%",
    width: "100%",
    left: "0%",
    top: "0%",
  },
  yAxis: {
    show: false,
    type: "category",
    data: hours,
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    show: false,
  },
  series: [],
  tooltip: {
    formatter: function (params) {
      return params.value[2].toFixed(2) + "℃";
    },
  },
});

let { deviceInfoOp } = useDeviceInfo();
const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceBW",
    // timeFrom: "2013-01-02T23:59:59+08:00",
    // timeEnd: "2013-03-02T00:00:00+08:00",
  };
  let res = await API.getData(params);
  const chartInstance = echartComponent.value.getChartInstance();
  let node = res.data[0]
  let arr = [];
  let list = [];
  for (let j = 0; j < days.length; j++) {
    for (let i = 0; i < hours.length; i++) {
      list.push(res.data[i]["GAS" + (j + 1)]);
      arr.push([j, hours.length - (i + 1), res.data[i]["GAS" + (j + 1)]]);
    }
  }
  console.log(res.data)
  const maxItem = max(list);
  const minItem = min(list);
  let d = maxItem - minItem
  chartInstance?.setOption(
    merge({}, option.value, {
      visualMap: {
        min: minItem,
        max: maxItem,
      },
      series: [
        {
          type: "heatmap",
          data: arr,
        },
      ],
    })
  );
  const chartInstanceL = echartComponentLine.value.getChartInstance();
  chartInstanceL?.setOption(
    merge({}, optionLine.value, {
      yAxis: [{
        type: "value",
        min: minItem, // 设置 y 轴最小值
        max: maxItem, // 设置 y 轴最大值
        splitLine: {
          show: false
        }
      }],
      series: [
        {
          type: "line",
          stack: 'a',
          data: [230, node.GAS10 - (node.GAS1 - 230)],
          lineStyle: {
            color: '#2493e1', // Line color (red)
          },
        },
        {
          type: "line",
          data: [50, 50],
          lineStyle: {
            color: '#2493e1', // Line color (red)
          },
          stack: 'a',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 128, 128)'
              },
              {
                offset: 1,
                color: 'rgb(128, 128, 128)'
              }
            ])
          },
        },
        {
          type: "line",
          data: [d * 0.4 + minItem, d * 0.4 + minItem],
          lineStyle: {
            color: '#d50b0b', // Line color (red)
          }
        },
      ],
    })
  );
};
watch(
  () => deviceInfoOp,
  (newValue, _oldValue) => {
    console.log(newValue, newValue[0]?.value);
    getDeviceAV(newValue.value[0]?.value);
  },
  { deep: true }
);
onMounted(() => {
  // console.log(deviceInfoOp)
  // setTimeout(() => {
  //   getDeviceAV(deviceInfoOp[0].Device_Name);
  // }, 50);
});
</script>
