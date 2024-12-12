<template>
    <div style="height: calc(100%)" class="relative overflow-auto">
        <Scatter :data="data" ref="echartComponent" :pointSets="pointSets" />
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
let pointSets = ref([])
let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
    valueLine.value = data[0].value;
});
const emit = defineEmits();
const getDeviceAV = async (deviceName) => {
    emit('onResize', { width: data.width, height: data.height });
    var params = {
        deviceName,
        dataType: "DeviceBlowHistory",
        // timeFrom:  dayjs().subtract(60, 'day'),
        // timeEnd: dayjs(),
        timeFrom: "2021-06-14T00:00:00+08:00",
        timeEnd: "2021-07-22T00:00:00+08:00",
    };
    let blowHistory = await API.getData(params)
    let arr1 = blowHistory.data.map(item => {
        return {
            x: item.history_t,
            y: item.history_v,
            color: '#f00'
        }
    })
    var params = {
        deviceName,
        dataType: "DeviceBlowRecently",
        // timeFrom:  dayjs().subtract(60, 'day'),
        // timeEnd: dayjs(),
        timeFrom: "2021-06-14T00:00:00+08:00",
        timeEnd: "2021-07-22T00:00:00+08:00",
    };
    let blowRecently = await API.getData(params)
    let arr2 = blowRecently.data.map(item => {
        return {
            x: item.recently_t,
            y: item.recently_v,
            color: '#ff0'
        }
    })
    pointSets.value = [...arr1, ...arr2]
};
watch(valueLine, (data) => {
    getDeviceAV(data);
});
onMounted(() => {
});
</script>