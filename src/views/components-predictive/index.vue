<template>
  <div class="container">
    <pangge-Header :timeShow="true">
      <template v-slot:header-block>
        <div class="text-[28px] text-[#fff] font-bold">
          换热元件预测性维护与分析
        </div>
      </template>
    </pangge-Header>
    <div class="w-full h-[81.6296%] flex flex-row absolute left-0 bottom-0 overflow-hidden">
      <div class="mb-[20px] flex-1 h-full bg-white ml-5" style="height: calc(100% - 20px)">
        <div class="flex py-[20px] px-5 flex-col relative mb-5">
          <pangge-Title text="专家建议" class="mb-[10px]"></pangge-Title>
          <div style="background: rgba(0, 135, 211, 0.06)" class="p-2 text-[#0087D3] text-[14px] font-bold">
            吹灰系统的吹灰压力和吹灰温度，是元件寿命衰减的关键因素，当吹灰系统工作点进入告警区域，则元件寿命会加速衰减，请持续关注元件预测性维护趋势分析结果
          </div>
        </div>
        <div class="px-4 flex h-full" style="height: calc(45% );">
          <div class="w-[60%] h-full">
            <BlowingSystem />
          </div>
          <div class="flex-1 relative h-full">
            <pangge-Title text="吹灰系统异常占比" class="mb-[10px] absolute ml-5"></pangge-Title>
            <ChartPie />
          </div>
        </div>
        <div style="height: calc(55% - 114px);">
          <pangge-Title text="吹灰系统每天异常占比" class="mb-[10px] absolute ml-5  mt-1"></pangge-Title>
          <ChartLine />
        </div>
      </div>
      <div class="h-full w-[40%] mx-5">
        <div class="h-[50%] p-4 bg-white relative">
          <pangge-Title text="换热元件寿命衰减趋势" class="mb-[10px] absolute"></pangge-Title>
          <PredictiveMaintenance />
        </div>
        <div class="h-[50%] my-5 flex" style="height: calc(50% - 40px)">
          <div class="w-[100%] bg-white  p-4 pb-0 relative">
            <pangge-Title text="热效能状态分析" class="mb-[10px] absolute"></pangge-Title>
            <ThermalEfficiency />
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
import BlowingSystem from "./components/blowing-system.vue";
import ScatterContour from "./components/scatter-contour.vue";
import ChartPie from "./components/chart-pie.vue";
import ChartLine from "./components/chart-line.vue";
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
