<template>
    <div class="container">
      <pangge-Header :timeShow="true">
        <template v-slot:header-block>
          <div class="text-[28px] text-[#fff] font-bold">换热元器件预测性维护</div>
        </template>
      </pangge-Header>
      <div
        class="w-full h-[81.6296%]  flex flex-row absolute left-0 bottom-0 "
      >
      <div class=" pb-[30px] flex-1 h-full  bg-white">
            <ScatterContour/>
        </div>
        <div class=" pb-[30px] h-full  bg-white w-[50%]">
            <PredictiveMaintenance/>
            <ThermalEfficiency/>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { onMounted, reactive, ref, nextTick } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import * as echarts from "echarts";
  import API from "@/api";
  import dayjs from "dayjs";
  import PredictiveMaintenance  from "./components/predictive-maintenance.vue";
  import ScatterContour  from "./components/scatter-contour.vue";
  import ThermalEfficiency  from "./components/thermal-efficiency.vue";
  import { useDeviceInfo } from "@/hook/useDeviceInfo";
  
  const state = reactive({
    deviceId: "",
    deviceType: "",
    deviceName: "",
    msg: "",
  });
  
  let { deviceInfoList } = useDeviceInfo();
  </script>
  