<template>
    <div style="height: calc(100%)" class="relative overflow-auto">
        <!-- <div class="absolute z-10 right-6 text-[14px]">
        设备：
        <a-select
          v-model:value="valueLine"
          :size="'small'"
          style="width: 100px"
          :options="deviceInfoOp"
        ></a-select>
      </div> -->
        <Scatter :data="data" ref="echartComponent" :legend="true"/>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Scatter from "../d3/scatter.vue";
import API from "@/api";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import data from "../data/volcano.js";
const echartComponent = ref(null);
let valueLine = ref();
let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
    valueLine.value = data[0].value;
});
const emit = defineEmits();
const getDeviceAV = (deviceName) => {
    emit('onResize', { width: data.width, height: data.height });
    var params = {
        deviceName,
        dataType: "DeviceDegradation",
        // timeFrom:  dayjs().subtract(60, 'day'),
        // timeEnd: dayjs(),
        timeFrom: "2013-02-01T20:55:00+08:00",
        timeEnd: "2013-04-02T00:00:00+08:00",
    };
    API.getData(params).then((res) => {
        //   const chartInstance = echartComponent.value.getChartInstance();
        //   chartInstance.setOption(
        //     merge({}, option.value, {
        //       xAxis: [
        //         {
        //           type: "category",
        //           data: res.data.map((item) => dayjs(item.timestamp).format("MM-DD")),
        //         },
        //       ],
        //       series: [
        //         {
        //           name: "堵灰趋势",
        //           type: "line",
        //           symbol: "none",
        //           data: res.data.map((item) => {
        //             return item.KPI_CV;
        //           }),
        //           markLine: {
        //             silent: true,
        //             label: {
        //               show: true,
        //               formatter: "{b}:{c}",
        //             },
        //             lineStyle: {
        //               color: "#333",
        //             },
        //             data: [
        //               {
        //                 yAxis: 0.3,
        //                 x: 200, // 起始点 x 坐标
        //                 y: -200, // 起始点 y 坐标
        //                 name: "最小值",
        //               },
        //               {
        //                 yAxis: 0.9,
        //                 name: "最大值",
        //               },
        //             ],
        //           },
        //         },
        //         {
        //           name: "趋势参考线",
        //           type: "line",
        //           symbol: "none",
        //           data: res.data.map((item) => {
        //             return item.RMSE;
        //           }),
        //           markLine: {
        //             data: [
        //               {
        //                 xAxis: dayjs("2013-02-03 05:00:00").format("MM-DD"),
        //                 name: "特定日期",
        //                 lineStyle: {
        //               color: "#ff0000", // 红色线
        //               width: 2,
        //               type: "dashed", // 虚线
        //             }
        //               }, // 在 'Wed' 列上绘制竖线
        //             ],
        //             // label: {
        //             //   show: true,
        //             //   position: "start", // 标签显示在竖线的开始位置
        //             // },
        //           },
        //         },
        //       ],
        //     })
        //   );
    });
};
watch(valueLine, (data) => {
    getDeviceAV(data);
});
onMounted(() => {
});
</script>