<script setup>
import { onMounted, reactive, nextTick, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination } from "ant-design-vue";
import DeviceInfo from "@/components/deviceInfo.vue";
import DeviceError from "@/components/deviceError.vue";
import DeviceRunTime from "@/components/deviceRunTime.vue";
import ExpertAdvice from "@/components/expertAdvice.vue";
import ChartComponent from './ChartComponent.vue';
import ChartPieComponent from './ChartPieComponent.vue';
import { Chart } from '@antv/g2';
// import TimelineChart  from './TimelineChart.vue';
import { LayoutTimelineChart } from './echarts/index'
import timeLineData from "./echarts/timeLineData.json";
import API from "@/api";
import dayjs from 'dayjs'
const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const current = ref(2);

const props = defineProps({});

const state = reactive({
  deviceName: "",
  deviceId: "1",
  deviceType: route.params.deviceType,
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机" },
  ],
  msg: ""
});

// 挂载后初始化图表
onMounted(() => {
  if (state.deviceType === '0') {
    state.deviceName = 'Centrifugal Fan' + state.deviceId;
  } else if (state.deviceType === '1') {
    state.deviceName = 'VPA' + state.deviceId;
  } else {
    state.deviceName = 'SG' + state.deviceId;
  }

  getEvenetList(state.deviceName);

  var params = {
    dataType: "DeviceAV",
    timeFrom: "2024-08-30T00:00:00+08:00",
    timeEnd: "2024-08-31T00:00:00+08:00",
    output: [
        {
            "field": "score",
            "func": "avg"
        }
    ],
    group: {
        "timeInterval": 36000
    }
  }
  API.getDataAgg(params).then(res => {
    var data = res.data[0]
    state.msg = "该设备可用性得分:"+data.score * 100+"，请持续关注可用性页面";
  })
  window.addEventListener("resize", () => {
    TimelineChartRom.resize();
  });
})

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

const handleDeviceChange = () => { };
</script>

<template>
  <div class="container">
    <pangge-Header :timeShow="true">
      <!-- <template v-slot:header-block>
        <Select ref="select" size="large" v-model:value="state.deviceId" style="width: 209px"
          @change="handleDeviceChange">
          <SelectOption value="轴流风机">轴流风机</SelectOption>
        </Select>
      </template> -->
    </pangge-Header>
    <div class="container-content">
      <div class="container-content-blockRow">
        <div class="container-content-blockRow-left">
          <DeviceInfo :title="state.deviceName" production="2023-08-01" operate="2023-08-01" />
          <ExpertAdvice :text1="dayjs(new Date()).format('YYYY-MM-DD')" text2="19:08" text3="该设备可用性得分:88，请持续关注可用性页面"
            text4="请关注预测性维护页面，及时安排叶片检修" />
        </div>
        <div class="container-content-blockRow-center padding20">
          <pangge-Title text="设备可用性分析"></pangge-Title>
          <div style="flex:1; height: 200px;">
            <chart-component />
          </div>
          <div style="flex:1">
            <div
            class="LayoutDefault-body-bottom-block3"
            id="TimelineChartRom"
          ></div>
          </div>
        </div>
        <div class="container-content-blockRow-right">
          <div class="container-content-blockRow-right-block1 padding20"><DeviceError /></div>
          <div class="container-content-blockRow-right-block2 padding20"><DeviceRunTime /></div>
          <div class="container-content-blockRow-right-block3 padding20">
            <pangge-Title text="设备运行时间"></pangge-Title>
            <chartPie-component />
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100vh;

    &-content {
      width: 100%;
      height: 81.6296%;
      position: relative;
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      bottom: 0;
      overflow: hidden;

      &-blockRow {
        display: flex;
        justify-content: space-between;
        margin: 0 30px;
        flex: 1;
        padding-bottom: 30px;

        &-left {
          width: 20%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 24px;
        }

        &-center {
          width: 65%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #FFFFFF;
          margin-right: 24px;
        }

        &-right {
          width: 15%;
          height: 100%;
          display: flex;
          flex-direction: column;

          &-block1 {
            width: 100%;
            height: 25%;
            background-color: #FFFFFF;
          }

          &-block2 {
            width: 100%;
            height: 25%;
            background-color: #FFFFFF;
            margin: 24px 0;
          }

          &-block3 {
            width: 100%;
            height: 50%;
            background-color: #FFFFFF;
          }
        }

      }

    }
  }
</style>
