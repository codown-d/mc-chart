<template>
  <div class="h-[100vh] w-full">
    <pangge-Header :timeShow="true" :back="false" :navigation="false">
      <template v-slot:header-block>
        <div class="text-[#fff] text-[40px]">预热器概述</div>
      </template>
    </pangge-Header>
    <div class="h-[80vh] w-full absolute left-0 bottom-0 overflow-auto">
      <template v-for="item in deviceDataList">
        <div
          style="border-top: 6px solid #4dbfff"
          class="flex ml-5 mr-[10px] border-t-6 p-4 bg-white"
        >
          <div class="w-[50%]">
            <div class="flex items-center justify-between">
              <div class="flex items-center text-[26px] font-bold">
                <img src="/images/device-icon.png" class="w-10" />{{
                  item.Device_Name
                }}
              </div>
              <div
                :style="`background-color: ${objState[item.state]?.style.bg};
              border-color: ${objState[item.state]?.style.border};`"
                class="flex items-center py-[14px] px-[11px] rounded-[50px] h-[50px] border border-solid"
              >
                <div
                  class="w-4 h-4 rounded-full"
                  :style="`background-color: ${
                    objState[item.state]?.style.bgCr
                  };`"
                ></div>
                <div class="ml-2">当前运行状态：</div>
                <div
                  class="text-[#15b79a] font-bold"
                  :style="`color: ${objState[item.state]?.style.textColor};`"
                >
                  {{ objState[item.state]?.label }}
                </div>
              </div>
            </div>
            <div class="mb-3 flex text-[16px] mt-[14px]">
              <div class="mr-[60px]">
                <span class="item-tag mr-5">出厂时间</span>
                {{ $filters.formatDate(item.Start_Day, "YYYY-MM-DD") }}
              </div>
              <div>
                <span class="item-tag mr-5">投入运营时间</span>
                {{ $filters.formatDate(item.Active_Day, "YYYY-MM-DD") }}
              </div>
            </div>
            <a-divider style="border-color: #c6d3d8" dashed />
            <div
              style="height: 200px; width: 100%"
              class="flex justify-around items-center"
            >
              <div style="width: 50%; height: 100%" class="relative">
                <pangge-Title
                  text="预热器运行时间占比"
                  class="mb-[10px] absolute"
                ></pangge-Title>
                <LoadChart :device_info="item" />
              </div>
              <div style="width: 50%; height: 100%" class="relative">
                <pangge-Title
                  text="不同负荷的运行时间占比"
                  class="mb-[10px] absolute"
                ></pangge-Title>
                <RunEvent :device_info="item" />
              </div>
            </div>
            <div class="mt-[20px]" style="height: 380px">
              <FanOverview :device_info="item" />
            </div>
            <div
              class="flex h-[64px] items-center justify-between"
              style="background: rgba(134, 189, 220, 0.1)"
            >
              <template v-for="item in actionList">
                <div
                  class="flex flex-col items-center justify-center flex-1 cursor-pointer"
                  @click="handleAclick(item.path)"
                >
                  <img
                    :src="`/images/${item.icon}`"
                    alt=""
                    class="w-[22px] mb-2"
                  />
                  <div class="text-[14px] text-[#0087d3]">
                    {{ item.title }}
                  </div>
                </div>
                <a-divider
                  style="border-color: #c6d3d8; height: 30px"
                  type="vertical"
                />
              </template>
              <div class="flex-1">
                <Popover :title="null">
                  <template #content>
                    <p
                      style="cursor: pointer"
                      @click="handleAclick(`/perfect-temperature/2`)"
                    >
                      壁温趋势分析
                    </p>
                    <p v-if="false"
                      style="cursor: pointer"
                      @click="handleAclick('/energy/' + state.deviceType)"
                    >
                      能耗分析
                    </p>
                    <p v-if="false"
                      style="cursor: pointer"
                      @click="handleAclick('/analysis/' + state.deviceType)"
                    >
                      报告汇总
                    </p>
                    <p style="cursor: pointer" @click="handleAclick('/help')">
                      帮助
                    </p>
                  </template>
                  <div
                    class="flex flex-col items-center justify-center flex-1 cursor-pointer"
                  >
                    <img src="/images/f4.png" class="w-[22px] mb-2" />
                    <div class="text-[14px] text-[#0087d3]">更多</div>
                  </div>
                </Popover>
              </div>
            </div>
          </div>
          <div class="flex-1 flex">
            <Charts />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadChart from "./components/load-chart.vue";
import RunEvent from "./components/run-event.vue";
import Charts from "./components/charts.vue";
import FanOverview from "./components/fan-overview.vue";
import { Popover } from "ant-design-vue";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import API from "@/api_v2";
import { merge } from "lodash";
import { setWebPath } from "@/utils";
const route = useRoute();
let deviceDataList = ref();
const state = reactive({
  deviceType: route.params.deviceType,
});
let actionList = ref([
  {
    title: "阻力性能与堵灰分析",
    icon: "f1.png",
    path: "/prediction2/2",
  },
  {
    title: "换热元件预测性维护与分析",
    icon: "f2.png",
    path: "/preventive2/2",
  },

  {
    title: "设备可用性分析",
    icon: "f3.png",
    path: "/availability2/2",
  },
]);

const router = useRouter();
const handleAclick = (url) => {
  router.push(url);
};
let objState = {
  1: {
    label: "正在运行",
    style: {
      textColor: "#15b79a",
      bgCr: "rgba(21,183,154,0.29)",
      border: "#15b79a",
      bg: "rgba(21, 183, 154, 0.06)",
    },
  },
  2: {
    label: "停止运行",
    style: {
      textColor: "rgba(236,156,156, 1)",
      bgCr: "rgba(236,156,156, 0.3)",
      border: "rgba(236,156,156, 1)",
      bg: "rgba(236,156,156, 0.1)",
    },
  },
  3: {
    label: "离线",
    style: {
      textColor: "rgba(160,160,160, 1)",
      bgCr: "rgba(160,160,160, 0.3)",
      border: "rgba(160,160,160, 1)",
      bg: "rgba(160,160,160, 0.1)",
    },
  },
};
let { deviceInfoList } = useDeviceInfo();

const getDeviceAV = async (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceData",
    output: "unitLoad",
    timeFrom: "2013-01-02T23:59:59+08:00",
    timeEnd: "2013-03-02T00:00:00+08:00",
  };
  let res = await API.getData(params);
  let node = res.data[0];
  return {
    deviceName,
    state: res.data.length == 0 ? "3" : node.unitLoad > 100 ? "1" : "2",
    percent100: node?.unitLoad > 600 ? 1 : 0,
    percent90: res.data.length == 0 ? "3" : node.unitLoad > 100 ? "1" : "2",
    percent75: res.data.length == 0 ? "3" : node.unitLoad > 100 ? "1" : "2",
    percent50: res.data.length == 0 ? "3" : node.unitLoad > 100 ? "1" : "2",
    percent50: res.data.length == 0 ? "3" : node.unitLoad > 100 ? "1" : "2",
  };
};
watch(deviceInfoList, (newValue) => {
  Promise.all(newValue.map((item) => getDeviceAV(item.Device_Name))).then(
    (res) => {
      deviceDataList.value = merge([], newValue, res);
    }
  );
});
onMounted(() => {
  setWebPath('/new-child/' + route.params.deviceType + '/1')
});
</script>
