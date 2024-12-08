<template>
  <div class="container">
    <pangge-Header :timeShow="true">
      <template v-slot:header-block>
        <div class="text-[28px] text-[#fff] font-bold">
          换热元器件预测性维护
        </div>
      </template>
    </pangge-Header>
    <div class="w-full h-[81.6296%] flex flex-row absolute left-0 bottom-0 overflow-hidden">
      <div class="mb-[20px] flex-1 h-full bg-white ml-5" style="height: calc(100% - 20px)">
        <div class="flex flex-col items-center justify-center w-[50%] py-[20px]">
          <a-card hoverable>
            <a-button type="primary" @click="open = true" class="mb-4">186日期</a-button><br />
            上次训练时间：2022-08-18 14:00:00
          </a-card>
        </div>
        <div class="px-4">
          <ScatterContour />
        </div>
      </div>
      <div class="h-full  w-[60%] mx-5">
        <div class="h-[50%] p-[10px] bg-white relative">
          <pangge-Title text="阻力性能退化风险趋势" class="mb-[10px] absolute"></pangge-Title>
          <PredictiveMaintenance />
        </div>
        <div class="h-[50%] p-[10px]  my-5 flex" style="height: calc(50% - 40px)">
          <div class="w-[60%] bg-white mr-5 p-4 relative">
            <pangge-Title text="热效率历史趋势" class="mb-[10px] absolute"></pangge-Title>
            <ThermalEfficiency />
          </div>
          <div class="flex-1 bg-white pl-4 pt-4">
            <ScatterDusty  @onResize="onResize"/>
          </div>
        </div>
      </div>
    </div>
    <a-modal v-model:open="open" title="模型训练" ok-text="确认" cancel-text="取消" @ok="hideModal">
      输入训练开始时间：<a-range-picker v-model:value="value4" :format="dateFormat" />
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import PredictiveMaintenance from "./components/predictive-maintenance.vue";
import ScatterContour from "./components/scatter-contour.vue";
import ScatterDusty from "./components/scatter-dusty.vue";
import ThermalEfficiency from "./components/thermal-efficiency.vue";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
let open = ref(false);
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
