<template>
  <div style="height: calc(100%)" class="relative overflow-auto">
    <Scatter
      :data="data"
      :legendList="legendList"
      ref="echartComponent"
      :pointSets="pointSets"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Scatter from "../d3/scatter.vue";
import API from "@/api_v2";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import data from "../data/volcano.js";
import { ConsoleSqlOutlined } from "@ant-design/icons-vue";
const echartComponent = ref(null);
let valueLine = ref();
let pointSets = ref([]);
let legendList = ref([]);
let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const emit = defineEmits();
const getDeviceAV = async (deviceName) => {
  emit("onResize", { width: data.width, height: data.height });
  var params = {
    deviceName,
    dataType: "DeviceBlowHistory",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  let blowHistory = await API.getData(params);
  console.log(blowHistory)
  let arr1 = blowHistory.data.map((item) => {
    return {
      x: item.history_t,
      y: item.history_v,
      color: "#0f0",
    };
  });
  var params = {
    deviceName,
    dataType: "DeviceBlowRecently",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  let blowRecently = await API.getData(params);
  console.log(blowRecently)
  let arr2 = blowRecently.data.map((item) => {
    return {
      x: item.recently_t,
      y: item.recently_v,
      color: "#ff0",
    };
  });
  legendList.value = [
    {
      label: "最近三周设备吹灰工况点",
      color: "#ff0",
    },
    {
      label: "历史设备吹灰工况点",
      color: "#0f0",
    },
  ];
  pointSets.value = [...arr1, ...arr2];
};
watch(valueLine, (data) => {
  getDeviceAV(data);
});
onMounted(() => {});
</script>
