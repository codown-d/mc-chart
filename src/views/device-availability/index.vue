<template>
  <div class="container">
    <pangge-Header :timeShow="true">
      <template v-slot:header-block>
        <div class="text-[28px] text-[#fff] font-bold">设备可用性分析</div>
      </template>
    </pangge-Header>
    <div class="w-full h-[81.6296%] flex flex-row absolute left-0 bottom-0 overflow-hidden">
      <div class="mb-[20px] flex-1 h-full bg-white ml-5 flex flex-col" style="height: calc(100% - 20px)">
        <div class="flex-1 p-4 pb-0 ">
          <pangge-Title text="设备可用性分析" class="mb-[10px]"></pangge-Title>
            <PredictiveMaintenance />
        </div>
        <div class="h-[30%] relative px-4">
          <pangge-Title text="事件描述" class="mb-[10px] absolute "></pangge-Title>
            <PredictiveMaintenanceTime />
          </div>
          <div class="h-[30%] relative px-4">
            <pangge-Title text="事件描电流波动情况分析" class="mb-[10px] absolute "></pangge-Title>
            <PredictiveAn />
          </div>
      </div>
      <div class="h-full w-[50%] mx-5">
        <div class="h-[50%]  flex" style="height: calc(50% - 40px)">
          <div class="w-[40%] bg-white mr-5 p-4 pb-0">
            <pangge-Title text="满负荷运行时间占比" class="mb-[10px]"></pangge-Title>
            <div style="height:calc(100% - 32px)">
              <ThermalEfficiency :device_info="valueLine" />
            </div>
          </div>
          <div class="flex-1 bg-white p-4 pb-0">
            <pangge-Title text="X占比" class="mb-[10px]"></pangge-Title>
            <div style="height:calc(100% - 32px)">
              <ScatterDusty :device_info="valueLine"/>
            </div>
          </div>
        </div>
        <div class="h-[50%] p-[10px] bg-white my-5 relative">
          <pangge-Title text="冷端综合温度历史趋势" class="mb-[10px] absolute"></pangge-Title>
          <div style="height:calc(100%)">
            <ScatterContour />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import PredictiveMaintenance from "./components/predictive-maintenance.vue";
import PredictiveMaintenanceTime from "./components/predictive-maintenance-time.vue";
import PredictiveAn from "./components/predictive-an.vue";
import ScatterContour from "./components/scatter-contour.vue";
import ScatterDusty from "./components/scatter-dusty.vue";
import ThermalEfficiency from "./components/thermal-efficiency.vue";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import { keys, values } from 'lodash'
import { useRoute } from 'vue-router';
const route = useRoute();
const routeParams = route.params;
let dataInfo = ref({
  z: {
    name: "X占比",
    value: 100
  },
  b: {
    name: "满负荷运行时间占比",
    value: 200
  },
  c: {
    name: "运行时间占比",
    value: 300
  }, d: {
    name: "告警事件",
    value: 400
  }, e: {
    name: "故障事件",
    value: 400
  }
})
let hideModal = () => { };
const dateFormat = "YYYY/MM/DD";
const state = reactive({
  deviceId: "",
  deviceType: "",
  deviceName: "",
  msg: "",
});

let valueLine = ref();
let { deviceInfoList } = useDeviceInfo();
watch(deviceInfoList, (data) => {
  valueLine.value = data[0]//find(data,(item)=>routeParams.deviceTypeite===item.w);
});
</script>
