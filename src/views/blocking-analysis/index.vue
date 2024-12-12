<template>
  <div class="container">
    <pangge-Header :timeShow="true">
      <template v-slot:header-block>
        <div class="text-[28px] text-[#fff] font-bold">阻力性能与堵灰分析</div>
      </template>
    </pangge-Header>
    <div
      class="w-full h-[81.6296%] flex flex-col absolute left-0 bottom-0 overflow-hidden"
    >
      <div class="px-[30px] pb-[30px] flex w-full h-full">
        <div class="bg-white w-[40%] mr-6 p-[10px] overflow-auto">
          <ExpertAdvice />
          <div class="mt-[20px]" v-for="item in deviceInfoList">
            <pangge-Title :text="item.Device_Name" class="mb-[10px]"></pangge-Title>
            <FanOverview />
          </div>
        </div>
        <div class="flex flex-col flex-1 w-0">
          <div class="bg-white h-[50%] py-[20px] relative">
            <pangge-Title text="堵灰风险因子趋势" class="mb-[10px] absolute ml-5"></pangge-Title>
            <RiskTrends />
          </div>
          <div class="bg-white h-0 flex-1 py-[20px] mt-[20px] relative">
            <PreheaterGraph />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import ExpertAdvice from "./components/expert-advice.vue";
import PreheaterGraph from "./components/preheater-graph.vue";
import RiskTrends from "./components/risk-trends.vue";
import FanOverview from "@/views/equipment-analysis/components/fan-overview.vue";
import { useDeviceInfo } from "@/hook/useDeviceInfo";

const state = reactive({
  deviceId: "",
  deviceType: "",
  deviceName: "",
  msg: "",
});

let { deviceInfoList } = useDeviceInfo();
</script>
