<template>
  <div class="container">
    <pangge-Header :timeShow="true">
      <template v-slot:header-block>
        <div class="text-[28px] text-[#fff] font-bold">设备可用性分析</div>
      </template>
    </pangge-Header>
    <div class="w-full h-[81.6296%] flex flex-row absolute left-0 bottom-0 overflow-hidden">
      <div class="mb-[20px] flex-1 h-full bg-white ml-5 flex flex-col" style="height: calc(100% - 20px)">
        <div class="px-5 py-[20px] h-[190px]">
          <pangge-Title text="专家建议" class="mb-[10px]"></pangge-Title>
          <div style="background: rgba(0, 135, 211, 0.06)" class="p-2 text-[#0087D3] text-[14px] font-bold">
            <div v-for="item in values(dataInfo)">
              <span>{{ item.name }}：<span>{{ item.value }}</span></span>
            </div>
          </div>
        </div>
        <div class="px-4 flex-1">
          <pangge-Title text="设备可用性分析" class="mb-[10px]"></pangge-Title>
          <div style="height: calc(50% - 32px);">
            <PredictiveMaintenance />
          </div>
          <div class="h-[50%]">
            <PredictiveMaintenanceTime />
          </div>
        </div>
      </div>
      <div class="h-full w-[40%] mx-5">
        <div class="h-[50%]  flex" style="height: calc(50% - 40px)">
          <div class="w-[50%] bg-white mr-5 p-4">
            <pangge-Title text="满负荷运行时间占比" class="mb-[10px]"></pangge-Title>
            <div style="height:calc(100% - 32px)">
              <ThermalEfficiency />
            </div>
          </div>
          <div class="flex-1 bg-white p-4">
            <pangge-Title text="X占比" class="mb-[10px]"></pangge-Title>
            <div style="height:calc(100% - 32px)">
              <ScatterDusty />
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
import { onMounted, reactive, ref, nextTick } from "vue";
import PredictiveMaintenance from "./components/predictive-maintenance.vue";
import PredictiveMaintenanceTime from "./components/predictive-maintenance-time.vue";
import ScatterContour from "./components/scatter-contour.vue";
import ScatterDusty from "./components/scatter-dusty.vue";
import ThermalEfficiency from "./components/thermal-efficiency.vue";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import { keys, values } from 'lodash'
let open = ref(false);
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

let { deviceInfoList } = useDeviceInfo();
</script>
