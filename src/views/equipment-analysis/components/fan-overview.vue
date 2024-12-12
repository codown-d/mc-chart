<template>
  <div class="relative">
    <img src="/images/fengji.jpg" style="margin: 0 auto;"/>
    <div
      class="absolute top-[0px] w-full h-full flex justify-between"
      style="background: rgba(169, 181, 188, 0.08)"
    >
      <template v-for="index in [0, 1]">
        <div>
          <template v-for="item in dataInfoList.slice(4*index, 4*(index+1))">
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
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Popover } from "ant-design-vue";
import { values, keys } from "lodash";
import API from "@/api";
let dataInfo = ref({
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
  PA_Inlet_Temperture: {
    name: "一次风机入口温",
    value: 402,
    unit: "°C",
    icon: "device2.png",
  },
  PA_Outlet_Temperture: {
    name: "一次风机出口温度",
    value: 32,
    unit: "°C",
    icon: "device2.png",
  },
  SA_Inlet_Temperture: {
    name: "二次风机入口温度",
    value: 32,
    unit: "°C",
    icon: "device2.png",
  },
  SA_Outlet_Temperture: {
    name: "二次风机出口温度",
    value: 32,
    unit: "°C",
    icon: "device2.png",
  },
  Gas_Inlet_Pressure: {
    name: "烟气入口压力",
    value: 32,
    unit: "kPa",
    icon: "device3.png",
  },
  Gas_Outlet_Pressure: {
    name: "烟气出口压力",
    value: 32,
    unit: "kPa",
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
  return values(dataInfo.value);
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
