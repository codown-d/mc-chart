<template>
  <div class="flex flex-col flex-1">
    <div v-for="(item, index) in list" class="flex-1 flex justify-center py-4">
      <div class="w-[160px]">
        <Chart :list="list" :data="item" :device_info="props.device_info" />
      </div>
      <div class="flex-1">
        <Line :data="item" :loadIndex="index+1" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Chart from "./chart.vue";
import Line from "./line.vue";

import API from "@/api_v2";
import { useCulPercent } from "@/utils";
const props = defineProps({
  device_info: {
    type: Object,
    default: {},
  },
});
watch(props, (newValue) => {
  getDeviceAV(newValue.device_info.Device_Name);
});
let list = ref();
const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceData",
    output: "unitLoad",
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  let res = await API.getData(params);
  list.value = useCulPercent(res.data);
  console.log(list)
};
onMounted(() => {
  getDeviceAV(props.device_info.Device_Name);
});
</script>
