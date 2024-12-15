<template>
  <div class="relative" style="height: calc(100%)">
    <div class="absolute flex justify-between w-full z-50">
      <pangge-Title text="预热器关键参数趋势" class="ml-3 mr-4" />
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
import API from "@/api";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
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
    name: "时间",
    axisLabel: {
      rotate: -45,
      color: "#000",
      formatter: function (value) {
        // 使用 dayjs 格式化时间，假设时间戳为毫秒
        return dayjs(value).format('MM/DD HH:mm');
      }
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
    name: "设备", // Y轴显示时间值
    data: deviceInfoOp.value.map((item) => item.label),
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
  dimensions: ["时间", "设备", "振幅"],
  zAxis3D: {
    type: "value",
    name: "振幅",
  
  },
  grid3D: {
    viewControl: {
      autoRotate: false, // 关闭自动旋转
      projection: "orthographic", // 使用正交投影
      orthographicSize: 100,
      beta: 6,
      maxAlpha: 10,
      center: [0, 0, 0],
    },
    boxWidth: 120,
    boxDepth: 50,
    boxHeight: 50,
  },
  series: [],
});
const getDeviceAV = () => {
  var params = {
    dataType: "DeviceFeature",
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    let arr = deviceInfoOp.value.map(item=>{
        return  {
          type: "line3D",
          data: res.data.filter(ite=>ite.Device_Name==item.value).map((ite) => {
            return [ite.timestamp, item.value, ite.RMSE_VALUE];
          }), // 数据
        }
      })
      console.log(arr)
    let opt = Object.assign({}, option.value, {
      yAxis3D: {
        type: "category",
        name: "设备", // Y轴显示时间值
        data: deviceInfoOp.value.map((item) => item.label),
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
      series: arr,
    });
    chartInstance.setOption(opt);
  });
};
watch(valueLine, (data) => {
  getDeviceAV();
});
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
</script>
