<template>
  <Bar :option="option" ref="echartComponent" />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Bar from "../echarts/bar.vue";
import API from "@/api";
import { merge, keys } from "lodash";
import { countBy } from "lodash";
import { useCulPercent } from "@/utils";
const echartComponent = ref(null);
let option = ref({
  title: {
    show: false,
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
      axisLabel: {
        interval: 0, // 强制显示所有标签
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        formatter: "{value} %",
      },
      axisLine: {
        show: false, // 确保显示刻度
      },
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

let culPercent = (data) => {
  const totalCount = data.length;
  const categoryCount = countBy(data, "percent");
  return keys(categoryCount).map((count) => ({
    percent: count,
    percentage: ((categoryCount[count] / totalCount) * 100).toFixed(2),
  }));
};
const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceData",
    output: "unitLoad",
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  let res = await API.getData(params);
  let result = useCulPercent(res.data);
  const chartInstance = echartComponent.value.getChartInstance();
  chartInstance.setOption(
    merge(option.value, {
      xAxis: [
        {
          type: "category",
          data: result.map((item) => {
            return item.percent;
          }),
        },
      ],
      series: [
        {
          type: "bar",
          data: result.map((item) => {
            return item.percentage;
          }),
          showBackground: true,
          barWidth: "20px",
          label: {
            show: true, // 显示标签
            position: "top", // 标签位置，可以是 'top', 'inside', 'bottom', 等
            fontSize: 12, // 标签字体大小
            color: "#333", // 标签字体颜色
            formatter: function (params) {
              return ` ${params.value}%`; // 自定义显示格式
            },
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
