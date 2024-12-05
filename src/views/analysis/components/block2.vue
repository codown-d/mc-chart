<script setup>
import { onMounted, reactive, nextTick, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Button } from "ant-design-vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import { Chart } from "@antv/g2";
import TitleView from "./title.vue";
import ChartComponent from "../../availability/ChartComponent.vue";
const emits = defineEmits([""]);
import { LayoutTimelineChart } from "../../availability/echarts/index";
import ChartPieComponent from "../../availability/ChartPieComponent.vue";
import timeLineData from "../../availability/echarts/timeLineData.json";
import API from "@/api";
import dayjs from "dayjs";
const router = useRouter();
const route = useRoute();
const current = ref(2);

const props = defineProps({
  sort: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  describe: {
    type: String,
    default: "",
  },
});

const state = reactive({
  deviceName: "",
  deviceId: "1",
  deviceType: route.params.deviceType,
});

// 挂载后初始化图表
onMounted(() => {
  if (state.deviceType === "0") {
    state.deviceName = "Centrifugal Fan" + state.deviceId;
  } else if (state.deviceType === "1") {
    state.deviceName = "VPA" + state.deviceId;
  } else {
    state.deviceName = "SG" + state.deviceId;
  }

  getEvenetList(state.deviceName);

  var params = {
    dataType: "DeviceAV",
    timeFrom: "2024-08-30T00:00:00+08:00",
    timeEnd: "2024-08-31T00:00:00+08:00",
    output: [
      {
        field: "score",
        func: "avg",
      },
    ],
    group: {
      timeInterval: 36000,
    },
  };
  API.getDataAgg(params).then((res) => {
    var data = res.data[0];
    state.msg =
      "该设备可用性得分:" + data.score * 100 + "，请持续关注可用性页面";
  });
  window.addEventListener("resize", () => {
    TimelineChartRom.resize();
  });
});

const getEvenetList = (e) => {
  // 获取当天开始时间
  const startOfDay = dayjs().startOf("day");
  // 获取当天结束时间
  const endOfDay = dayjs().endOf("day");
  let serialData = timeLineData;
  nextTick(() => {
    const chart = new Chart({ container: "TimelineChartRom" });
    chart.options(LayoutTimelineChart(serialData));
    chart.render();
  });
};
</script>

<template>
  <div class="container-content-blockRow-block2">
    <div class="container-content-blockRow-block2-title">
      <TitleView sort="02" title="运行统计" describe="quipment parameter" />
    </div>
    <img
      class="container-content-blockRow-block2-Maskgroup"
      src="/images/analysis/Maskgroup.png"
    />
    <div class="container-content-blockRow-block2-body">
      <div class="container-content-blockRow-block2-body-dev1 space-between">
        <div class="container-content-blockRow-block2-body-dev1-left">
          <div
            class="container-content-blockRow-block2-body-dev1-left-items flex-items"
          >
            <img src="/images/analysis/halt.png" />
            <div
              class="container-content-blockRow-block2-body-dev1-left-items-font"
            >
              <div>12</div>
              <div>设备停机累计次数</div>
            </div>
          </div>
          <div
            class="container-content-blockRow-block2-body-dev1-left-items flex-items"
          >
            <img src="/images/analysis/run.png" />
            <div
              class="container-content-blockRow-block2-body-dev1-left-items-font"
            >
              <div>1810.05</div>
              <div>累计运行时间</div>
            </div>
          </div>
        </div>
        <div class="container-content-blockRow-block2-body-dev1-right">
          <pangge-Title text="设备运行时间" fontClass="font24"></pangge-Title>
          <chart-component />
        </div>
      </div>
      <div class="container-content-blockRow-block2-body-dev2">
        <pangge-Title text="设备运行情况" fontClass="font24"></pangge-Title>
        <div style="display: flex;">
          <div
            class="LayoutDefault-body-bottom-block3"
            style="width: 80%; overflow: hidden;"
            id="TimelineChartRom"
          ></div>
          <div style="width: 250px;"><chartPie-component /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-block2 {
  width: 100%;
  padding: 49px 155px;
  background-color: RGBA(245, 249, 252, 1);
  position: relative;
  &-Maskgroup {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
  }
  &-body {
    margin-top: 80px;
    &-dev1 {
      .font24 {
        font-size: 24px !important;
      }
      img {
        width: 78px;
        height: 78px;
        margin-right: 12px;
      }
      &-left {
        width: 400px;
        margin-right: 14px;
        &-items {
          width: 100%;
          height: 180px;
          background: #ffffff;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          &-font div:nth-child(1) {
            font-weight: bold;
            font-size: 40px;
            color: #f64d3e;
            margin-bottom: 12px;
          }
          &-font div:nth-child(2) {
            font-size: 24px;
            color: #6b767b;
          }
        }
      }
      &-right {
        flex: 1;
        background: #ffffff;
        border-radius: 10px;
        height: 384px;
        padding: 15px;
      }
    }
    &-dev2 {
      flex: 1;
      background: #ffffff;
      border-radius: 10px;
      height: 375px;
      padding: 15px;
    }
  }
}
</style>
