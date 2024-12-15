<template>
  <div class="relative h-full">
    <svg
      class="absolute top-[10px] left-[50%] ml-[-25px]"
      width="50"
      height="50"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: rotate3d(7, -7, -4, -65deg)"
    >
      <!-- 定义箭头 -->
      <defs>
        <marker
          id="arrowhead"
          markerWidth="20"
          markerHeight="14"
          refX="5"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#f2a" />
        </marker>
      </defs>
      <!-- 圆环路径 -->
      <path v-if="dataInfo.PA_Outlet_Temperture.value<dataInfo.SA_Outlet_Temperture.value"
        d="M 50 10 A 40 40 0 1 1 49.9 10"
        fill="none"
        stroke="black"
        stroke-width="3"
        marker-end="url(#arrowhead)"
      />
      <path v-else
    d="M 50 90 A 40 40 0 1 1 50.1 90"
    fill="none"
    stroke="black"
    stroke-width="3"
    marker-end="url(#arrowhead)"
  />
    </svg>
    <img src="/images/fengji.jpg" style="margin: 0 auto; height: 100%" />
    <div
      class="absolute top-[0px] w-full h-full flex justify-between"
      style="background: rgba(169, 181, 188, 0.08)"
    >
      <template v-for="index in [0, 1]">
        <div>
          <template
            v-for="item in dataInfoList.slice(4 * index, 4 * (index + 1))"
          >
            <div
              class="p-[10px] rounded-[8px] w-[150px] m-5"
              style="
                background: rgba(255, 255, 255, 0.78);
                box-shadow: 0px 2px 10px 0px rgba(72, 111, 133, 0.13);
              "
            >
              <div class="mb-2 text-[12px]">{{ item.name }}</div>
              <div class="flex h-[26px] items-center">
                <div class="flex items-center">
                  <img :src="`/images/${item.icon}`" class="w-[18px]" />
                </div>
                <div
                  class="flex border border-solid border-[#0087d3] ml-1 rounded-lg overflow-hidden"
                >
                  <div class="bg-white w-[70px] px-[6px] text-[14px]">
                    {{ item.value }}{{ item.unit }}
                  </div>
                  <div class="bg-[#0087d3] w-[24px]"></div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch, computed } from "vue";
import { values, keys } from "lodash";
import API from "@/api";
let dataInfo = ref({
  differ_pressure: {
    name: "烟气差压",
    value: 42,
    unit: "°C",
    icon: "device2.png",
  },
  CCET: {
    name: "冷端综合温度",
    value: 402,
    unit: "°C",
    icon: "device2.png",
  },
  Gas_Inlet_Temperture: {
    name: "烟气入口温度",
    value: 42,
    unit: "°C",
    icon: "device2.png",
  },
  Gas_Outlet_Temperture: {
    name: "烟气出口温度",
    value: 42,
    unit: "°C",
    icon: "device2.png",
  },
  SA_Outlet_Temperture: {
    name: "电流", //未知
    value: 32,
    unit: "A",
    icon: "device2.png",
  },
  PA_Inlet_Pressure: {
    name: "一次风机入口压力",
    value: 32,
    unit: "kPa",
    icon: "device2.png",
  },
  PA_Outlet_Pressure: {
    name: "一次风机出口压力",
    value: 32,
    unit: "kPa",
    icon: "device2.png",
  },
  Gas_Inlet_Pressure: {
    name: "转速", //未知
    value: 32,
    unit: "m/s",
    icon: "device3.png",
  },
  PA_Outlet_Temperture:{
    show:false,
    name: "二次烟气入口温度", //未知
    value: 32,
    unit: "m/s",
    icon: "device3.png",
  },
});
const props = defineProps({
  device_info: {
    type: Object,
    default: {},
  },
});
const dataInfoList = computed(() => {
  return values(dataInfo.value).filter(item=>item.show!=false);
});
const getDeviceAV = (deviceName) => {
  let output = keys(dataInfo.value);
  var params = {
    deviceName: "APH_A",
    dataType: "DeviceData",
    output: output.join(","),
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    let node = res.data[0] || {};
    keys(node).forEach((element) => {
      if (dataInfo.value[element]) {
        dataInfo.value[element].value = node[element].toFixed(2);
      }
    });
  });
};
watch(props, (newValue) => {
  getDeviceAV(newValue.device_info.Device_Name);
});
onMounted(() => {
  getDeviceAV(props.device_info.Device_Name);
});
</script>
