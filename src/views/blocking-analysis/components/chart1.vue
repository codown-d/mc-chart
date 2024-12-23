<template>
  <div class="relative" style="height: calc(100%)">
    <div class="absolute flex justify-between w-full z-50">
      <pangge-Title text="吹灰效果分析" class="ml-3 mr-4" />
      <div
        class="text-[14px] mr-5 flex justify-end flex-1 items-center"
        v-if="false"
      >
        设备：<a-select
          v-model:value="valueLine"
          size="small"
          class="w-[80px]"
          :options="deviceInfoOp"
        ></a-select>
      </div>
    </div>
    <Line3D :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line3D from "@/views/sootblowing-efficiency/echarts/line3d.vue";
import API from "@/api_v2";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
import {groupBy,values}  from 'lodash'
const echartComponent = ref(null);
let valueLine = ref();
let { deviceInfoOp } = useDeviceInfo();
let option = ref({
  grid: {
    left: "5%",
    top: "10%",
    bottom: "10%",
    right: "5%",
  },
  xAxis3D: {
    type: "category",
    name: "",
    show: false,
    axisLabel: {
      show: false,
      rotate: -45,
      color: "#000",
      formatter: function (value) {
        // 使用 dayjs 格式化时间，假设时间戳为毫秒
        return dayjs(value).format("MM/DD HH:mm");
      },
    },
    axisLine: {
      lineStyle: {
        color: "#666",
      },
    },
    axisPointer: {
      lineStyle: {
        color: "#000",
      },
    },
  },
  yAxis3D: {
    type: "category",
    name: "清洗次数", // Y轴显示时间值
    data: deviceInfoOp.value?.map((item) => item.label),
    offset: 20,
    axisLabel: {
      left: "20px",
      color: "#000",
    },
    axisLine: {
      lineStyle: {
        color: "#666",
      },
    },
    axisPointer: {
      lineStyle: {
        color: "#000",
      },
    },
  },
  zAxis3D: {
    type: "value",
    name: "振幅",
  },
  grid3D: {
    viewControl: {
      autoRotate: false, // 关闭自动旋转
      projection: "orthographic", // 使用正交投影
      orthographicSize: 100,
      beta: 10,
      maxAlpha: 50,
      center: [0, 0, 0],
    },
    boxWidth: 80,
    boxDepth: 100,
    boxHeight: 50,
  },
  series: [],
});

const getDeviceAV = async (deviceName = "APH_A") => {
  let res = await API.getDeviceInfo({ deviceName });
  let Clean_start_time = JSON.parse(res.data[0].Clean_start_time);
  let Clean_down_time = JSON.parse(res.data[0].Clean_down_time);
  let timeFrom = Clean_start_time[0];
  let timeEnd = Clean_down_time.at(-1);
  var params = {
    deviceName,
    dataType: "DeviceFeature",
    timeFrom: `${timeFrom}T23:59:59+08:00`, //DeviceInfo 表 Clean_down_time
    timeEnd: `${timeEnd}T23:59:59+08:00`,
  };
  let {data} = await API.getData(params);
  let list = values(groupBy(data, 'Index_clean'))
  const chartInstance = echartComponent.value.getChartInstance();
  let arr = list.map((item, index) => {
    return {
      type: "line3D",
      data: item.map((ite) => {
        return [ite.timestamp, `${index + 1}`, ite.RMSE_VALUE];
      }), // 数据
    };
  });
  let opt = Object.assign({}, option.value, {
    yAxis3D: {
      type: "category",
      name: "清洗次数", // Y轴显示时间值
      data: list.map((item, index) => `${index + 1}`),
      offset: 40,
      axisLabel: {
        left: "20px",
        color: "#000",
      },
      axisLine: {
        lineStyle: {
          color: "#666",
        },
      },
      axisPointer: {
        lineStyle: {
          color: "#000",
        },
      },
    },
    series: arr,
  });
  chartInstance.setOption(opt);
};
watch(valueLine, (data) => {
  getDeviceAV();
});
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
</script>
