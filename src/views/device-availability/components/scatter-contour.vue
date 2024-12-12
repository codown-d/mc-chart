<template>
    <div class="relative" style="height: calc(100%)">
        <div class="absolute z-10 right-6 text-[14px]">
            设备：<a-select v-model:value="valueLine" :size="'small'" style="width: 80px"
                :options="deviceInfoOp"></a-select>
            参数：<a-select v-model:value="valueLinePm" mode="multiple" :maxTagTextLength="10" :maxTagCount="3"
                :size="'small'" placeholder="请选择参数" style="width: 260px" :options="optionsPm"></a-select>
        </div>
        <Line :option="option" ref="echartComponent" />
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import API from "@/api";
import { merge, find } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
const echartComponent = ref(null);
let valueLine = ref();
let valueLinePm = ref(["Aar", "CCET_Value"]);
/**
 * 
 * 
 * Aar
CCET_Value
Convscr
Date
Device_Name
Qetar
Sar
 */
let optionsPm = ref([
    {
        label: "Aar",
        value: "Aar",
    },
    {
        label: "CCET_Value",
        value: "CCET_Value",
    },
    {
        label: "Convscr",
        value: "Convscr",
    },
    {
        label: "Qetar",
        value: "Qetar",
    },

    {
        label: "Sar",
        value: "Sar",
    },
]);
let option = ref({
    title: {
        show: false,
        text: "预热器关键参数趋势",
        left: "7%",
    },
    grid: {
        left: "8%",
        right: "6%",
        top: "20%",
        bottom: "20%",
    },
    legend: {
        bottom: "0%",
        left: "center",
        icon: "circle",
        z: 99,
    },
    dataZoom: [
        {
            type: "slider",
            start: 80,
            end: 100,
        },
    ],
    xAxis: [
        {
            type: "time",
        },
    ],

    yAxis: [
        {
            type: "value",
            splitArea: {
                show: true
            }
        },
    ],
    series: [],
});

let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
    valueLine.value = data[0].value;
});
const getDeviceAV = () => {
    var params = {
        deviceName: valueLine.value,
        dataType: "DeviceCCET",
        output: valueLinePm.value.join(","),
        timeFrom: "2013-01-02T23:59:59+08:00",
        timeEnd: "2013-03-02T00:00:00+08:00",
    };
    API.getData(params).then((res) => {
        const chartInstance = echartComponent.value.setChartInit();
        let opt = Object.assign({}, option.value, {
            xAxis: [
                {
                    min: dayjs(params.timeFrom).valueOf(),
                    max: dayjs(params.timeEnd).valueOf(),
                },
            ],
            series: valueLinePm.value.map((item) => {
                let label =
                    find(optionsPm.value, (ite) => ite.value === item)?.label || item;
                return {
                    name: label,
                    type: "line",
                    symbol: "none",
                    data: res.data.map((ite) => {
                        return [dayjs(ite.Date).valueOf(), ite[item]];
                    }),
                };
            }),
        });
        chartInstance.setOption(opt);
    });
};
watch(valueLine, (data) => {
    getDeviceAV();
});
watch(valueLinePm, (data) => {
    getDeviceAV();
});
</script>