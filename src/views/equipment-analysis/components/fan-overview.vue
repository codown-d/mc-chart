<template>
  <div class="relative h-full">
    <div class="relative h-full w-[486px]" style="margin: 0 auto;">
      <div class="absolute w-[100px] z-10  left-[50%] top-[30%] ml-[-50px]">
        <div class="relative">
          <img src="/images/arrow_rotating.svg"
            :style="`transform:rotateX(${dataInfo.PA_Outlet_Temperture.value < dataInfo.SA_Outlet_Temperture.value ? 40 : -140}deg)`">
          <div class="text-[16px] text-[#fff] text-center absolute top-[50%] left-[50%] w-[100%]"
            style="transform: translate(-50%, -50%);">
            预热器<br />旋转方向</div>
        </div>
      </div>
      <div class="absolute w-[100px] z-10  left-[58%] top-[8%]">
        <div class="relative">
          <img src="/images/arrow.svg"
            :style="`transform:rotateZ(${dataInfo.PA_Inlet_Pressure.value - Math.abs(dataInfo.PA_Outlet_Pressure.value) > 0 ? -90 : 90}deg)`">
          <div class="text-[16px] text-[#fff] text-center absolute top-[100%] left-[50%] w-[100%]"
            style="transform: translate(-50%, -50%);">
            二次风侧<br />最高阻力</div>
        </div>
      </div>
      <div class="absolute w-[100px]  z-10 left-[14%] top-[20%]">
        <div class="relative">
          <img src="/images/arrow.svg" class=""
            :style="`transform:rotateZ(${dataInfo.SA_Inlet_Pressure.value - Math.abs(dataInfo.SA_Outlet_Pressure.value) > 0 ? -90 : 90}deg)`">
          <div class="text-[16px] text-[#fff] text-center absolute top-[100%] left-[50%] w-[100%]"
            style="transform: translate(-50%, -50%);">
            一次风侧<br />最高阻力</div>
        </div>
      </div>
      <div class="absolute w-[100px] z-10  right-[18%] bottom-[20%]">
        <div class="relative">
          <img src="/images/arrow.svg" class=""
            :style="`transform:rotateZ(${dataInfo.Gas_Inlet_Pressure.value - Math.abs(dataInfo.Gas_Outlet_Pressure.value) > 0 ? 90 : -90}deg)`">
          <div class="text-[16px] text-[#fff] text-center absolute top-[100%] left-[50%] w-[100%]"
            style="transform: translate(-50%, -50%);">
            烟气侧<br />最高阻力</div>
        </div>
      </div>
      <img src="/images/fengji.png" style=" transform: translate(-50%, -50%);height: 100%"  class="absolute h-[380px] top-[50%] left-[50%] "/>
    </div>

    <div class="absolute top-[0px] w-full h-full flex justify-between" style="background: rgba(169, 181, 188, 0.08)">
      <template v-for="index in [0, 1]">
        <div>
          <template v-for="item in dataInfoList.slice(4 * index, 4 * (index + 1))">
            <div class="p-[10px] rounded-[8px] w-[150px] m-5" style="
                background: rgba(255, 255, 255, 0.78);
                box-shadow: 0px 2px 10px 0px rgba(72, 111, 133, 0.13);
              ">
              <div class="mb-2 text-[12px]">{{ item.name }}</div>
              <div class="flex h-[26px] items-center">
                <div class="flex items-center">
                  <img :src="`/images/${item.icon}`" class="w-[18px]" />
                </div>
                <div class="flex border border-solid border-[#0087d3] ml-1 rounded-lg overflow-hidden">
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
import API from "@/api_v2";
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
    name: "烟气侧入口阻力", //未知
    value: 32,
    unit: "m/s",
    icon: "device3.png",
  },
  Gas_Outlet_Pressure: {
    name: "烟气侧出口阻力", //未知
    value: 32,
    unit: "m/s",
    icon: "device3.png",
  },
  SA_Inlet_Pressure: {
    name: "一次风侧入口阻力", //未知
    value: 32,
    unit: "m/s",
    icon: "device3.png",
  },
  SA_Outlet_Pressure: {
    name: "一次风侧出口阻力", //未知
    value: 32,
    unit: "m/s",
    icon: "device3.png",
  },
  PA_Outlet_Temperture: {
    show: false,
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
  return values(dataInfo.value).filter(item => item.show != false);
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
