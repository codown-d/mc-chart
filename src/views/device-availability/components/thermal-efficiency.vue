<template>
  <div class="relative" style="height: calc(100%)">
    <Pie :option="option" ref="echartComponent" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, defineProps, ref, nextTick, watch } from "vue";
import Pie from "@/views/equipment-analysis/echarts/pie.vue";
import API from "@/api";
import { merge } from "lodash";
import { useCulPercent } from "@/utils";
const echartComponent = ref(null);
let option = ref({
  title: {
    show: false,
  },
  legend: {
    show: false,
    hoverLink: false,
  },
  grid: {
    top: "4%", // 20% of the container's height from the top
  },
  series: [],
});
const props = defineProps({
  device_info: {
    type: Object,
    default: {},
  },
});
watch(props, (newValue) => {
  getDeviceAV(newValue.device_info.Device_Name);
});
const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceData",
    output: "unitLoad",
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  let res = await API.getData(params);
  let list = useCulPercent(res.data);
  console.log(list);
  const chartInstance = echartComponent.value.getChartInstance();
  chartInstance.setOption(
    merge(option.value, {
      series: [
        {
          name: "占比",
          type: "pie",
          radius: ["60%", "40%"],
          data: list.map((item: any, index) => {
            return {
              name: item.name.indexOf('负荷')==-1?item.name+'负荷':item.name,
              value: item.value,
            };
          }),
          label: {
            show: true,
            formatter: "{c}%", // 显示数据值
          },
        },
      ],
    })
  );
};
onMounted(() => {
  getDeviceAV(props.device_info.Device_Name);
});
</script>
