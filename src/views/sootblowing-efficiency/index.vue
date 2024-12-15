<template>
  <div class="container">
    <pangge-Header :timeShow="true">
      <template v-slot:header-block>
        <div class="text-[28px] text-[#fff] font-bold">吹灰效率分析</div>
      </template>
    </pangge-Header>
    <div class="w-full h-[81.6296%] flex flex-row absolute left-0 bottom-0 overflow-hidden">
      <div class="mb-[20px] flex-1 h-full bg-white ml-5 flex flex-col" style="height: calc(100% - 20px)">
        <div class="px-5 py-[20px] h-[50%]">
          <ScatterContour/>
        </div>
        <div class="px-5 py-[20px] flex-1 mt-4">
          <ScatterContour/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import ScatterContour from "./components/scatter-contour.vue";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import { keys, values } from 'lodash'
let open = ref(false);

let { deviceInfoList } = useDeviceInfo();
</script>
