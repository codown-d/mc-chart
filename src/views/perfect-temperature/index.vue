<template>
  <div class="h-[100vh] w-full">
    <pangge-Header :timeShow="true" :back="true" :navigation="false">
      <template v-slot:header-block>
        <div class="text-[#fff] text-[40px]">壁温趋势分析</div>
      </template>
    </pangge-Header>
    <div class="h-[80vh] w-full absolute left-0 bottom-0 overflow-auto">
      <div
        style="border-top: 6px solid #4dbfff"
        class="flex ml-5 mr-[10px] border-t-6 p-4 bg-white h-full"
      >
        <div class="w-[40%] h-full">
          <Chart />
        </div>
        <div class="flex-1 h-full">
          <PreheaterGraph type="biwen" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Chart from "./components/chart.vue";
import PreheaterGraph from "@/views/blocking-analysis/components/preheater-graph.vue";
onMounted(() => {});
</script>
