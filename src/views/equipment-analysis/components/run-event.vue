<template>
  <Bar :option="option" ref="echartComponent" />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Bar from "../echarts/bar.vue";
import { Select, SelectOption, Pagination, Popover } from "ant-design-vue";
import API from "@/api";
import dayjs from "dayjs";
import { merge, keys } from "lodash";
const echartComponent = ref(null);
let option = ref({
  title: {
    text: "运行事件",
    left: "center",
    textStyle: {
      fontSize: 14,
    },
  },
  xAxis: [
    {
      type: "category",
      data: [],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
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

const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    datetime: "2024-08-16T00:00:00+08:00",
  };
  API.getAlarmCountC(params).then((res) => {
    let node = res.data?.[0] || { alarmCount: 0, faultCount: 0 };
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.setOption(
      merge(option.value, {
        xAxis: [
          {
            type: "category",
            data: ["告警", "故障"],
          },
        ],
        series: [
          {
            type: "bar",
            data: [
              {
                value: node.alarmCount,
                itemStyle: {
                  color: "#dbcf60",
                },
              },
              {
                value: node.faultCount,
                itemStyle: {
                  color: "#df8a57",
                },
              },
            ],
            barWidth: 20,
          },
        ],
      })
    );
  });
};
onMounted(() => {
  getDeviceAV(props.device_info.Device_Name);
});
</script>
