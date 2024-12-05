<script setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination } from "ant-design-vue";
import * as echarts from "echarts";
import DeviceInfo from "@/components/deviceInfo.vue";
import ExpertAdvice from "@/components/expertAdvice.vue";
import API from "@/api";
import ChartSpeed from "../preventive/chartSpeed.vue";
import { EchartsQueOption2 } from "../equipment/echarts/index";
import echartsQue1 from "./echarts/echartsQue1.json";
import centrifugal_fan from "./echarts/centrifugal_fan.json";
import vpa from "./echarts/vpa.json";
import gfj from "./echarts/gfj.json";
import chartData from "./echarts/chartdata.json";
import chartData1 from "./echarts/chartdata1.json";
import chartData2 from "./echarts/chartdata2.json";
import dayjs from "dayjs";

import { LayoutScatter3D, LayoutEchartsQue1 } from "./echarts/index";


const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const current = ref(2);
const props = defineProps({});

var EchartsQue3D = null;
var EchartsQue1 = null;

const state = reactive({
  deviceName: "",
  deviceId: "1",
  deviceType: route.params.deviceType,
  deviceValue: null,
  deviceInfo: {},
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机" },
  ],
  selectVal: "振动",
  msg: ""
});

const handleDeviceChange = () => {};

const groupBy = (array, key) => {
  console.log('array ', array);
  return array.reduce((result, currentItem) => {
    // 使用 key 函数提取分组键，如果是字符串属性则直接使用
    const groupKey = typeof key === "function" ? key(currentItem) : currentItem[key];

    // 初始化分组数组
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    // 将当前项添加到分组数组
    result[groupKey].push(currentItem);

    return result;
  }, {});
};

onMounted(() => {
  if (state.deviceType === '0') {
    state.deviceName = 'Centrifugal Fan' + state.deviceId;
  } else if (state.deviceType === '1') {
    state.deviceName = 'VPA' + state.deviceId;
  } else {
    state.deviceName = 'SG' + state.deviceId;
  }

  const deviceName = state.deviceInfo.deviceName || "GFJ1";
  var groupedByCategory = [];
  if (state.deviceType === "0") {
    console.log('a');
    groupedByCategory = groupBy(chartData, "Type");
  } else if(state.deviceType === "1") {
    console.log('b');
    groupedByCategory = groupBy(chartData1, "Type");
  } else if(state.deviceType === "2") {
    console.log('c');
    groupedByCategory = groupBy(chartData2, "Type");
  }
  var legends = [];
  var serialData = [];
  Object.keys(groupedByCategory).forEach((key) => {
    legends.push(key);
    var field = {};
    if (key === "高效区上线") {
      field = {
        name: key,
        type: "line",
        data: [],
        smooth: true,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              0.5,
              [
                {
                  offset: 0,
                  color: "rgba(0, 102, 210, 0.5)",
                },
                {
                  offset: 0.5,
                  color: "rgba(0, 102, 210, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 102, 210, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 3500,
          },
        },
        itemStyle: {
          normal: {
            color: "rgb(0, 102, 210)",
          },
        },
      };
    } else if (key === "点位") {
      field = {
        name: key,
        type: "scatter",
        data: [],
        smooth: true,
        symbolSize: 8,
        color: "red",
      };
    } else {
      field = {
        name: key,
        type: "line",
        data: [],
        smooth: true,
      };
    }
    var filedData = [];
    groupedByCategory[key].forEach((group) => {
      var fdata = [];
      fdata.push(parseFloat(group["Volume"]));
      fdata.push(parseFloat(group["Pressure"]));
      filedData.push(fdata);
    });
    field.data = filedData;
    serialData.push(field);
  });
  var data = []
  // legends.push(deviceName);
  var field = {
    name: deviceName,
    type: "scatter",
    data: [],
    symbolSize: 5,
    color: "red",
  };

  var grid = {
    top: "28%",
    left: "0%",
    right: "5%",
    bottom: "0%",
    containLabel: true,
  };

  var legendsObj = {
    data: legends,
    top: '2%',
    left: '12%',
    right: '0%', 
  }

  var filedData = [];
  data.forEach((group) => {
    var fdata = [];
    fdata.push(group["Value_Volume"]);
    fdata.push(group["Value_Pressure"]);
    filedData.push(fdata);
  });
  field.data = filedData;
  serialData.push(field);

  let EchartsPerformanceCurve = echarts.init(document.getElementById("EchartsPerformanceCurve"));
  var option = EchartsQueOption2(legendsObj, serialData, grid);
  EchartsPerformanceCurve.setOption(option);
  const echartsQue3D = state.deviceType === '0' ? centrifugal_fan : state.deviceType === '1' ? vpa : gfj;
  nextTick(() => {
    if (EchartsQue3D === null) {
      EchartsQue3D = echarts.init(document.getElementById("EchartsQue3D"));
      var option1 = LayoutScatter3D(echartsQue3D, state.deviceType);
      EchartsQue3D.setOption(option1);
    }

    if (EchartsQue1 === null) {
      EchartsQue1 = echarts.init(document.getElementById("EchartsQue1"));
      var data = echartsQue1.data;
      var times = data[0].times;
      var values = data[1].values;
      var scales = data[2];
      console.log(times, values, scales);
      EchartsQue1.setOption(LayoutEchartsQue1(times, values, scales));
    }
  });

  API.getPerformanceList(deviceName).then((res) => {
    var data = res.data;
    legends.push(deviceName);
    var field = {
      name: deviceName,
      type: "scatter",
      data: [],
      symbolSize: 5,
      color: "red",
    };

    var filedData = [];
    data.forEach((group) => {
      var fdata = [];
      fdata.push(group["Value_Volume"]);
      fdata.push(group["Value_Pressure"]);
      filedData.push(fdata);
    });
    field.data = filedData;
    serialData.push(field);

    // let EchartsQue2 = echarts.init(document.getElementById("EchartsQue2"));
    // var option = EchartsQueOption2(legends, serialData);
    // EchartsQue2.setOption(option);
  });

  window.addEventListener("resize", () => {
    EchartsQue1.resize();
    // EchartsQue2.resize();
    EchartsQue3D.resize();
    EchartsPerformanceCurve.resize();
  });

  var params = {
    dataType: "DeviceStall",
    timeFrom: "2024-08-30T00:00:00+08:00",
    timeEnd: "2024-08-31T00:00:00+08:00",
    output: [
        {
            "field": "ab_proportion",
            "func": "max"
        }
    ],
    group: {
        "timeInterval": 36000
    }
  }
  API.getDataAgg(params).then(res => {
    var data = res.data[0]
    if (data.ab_proportion > 20) {
      state.msg = "设备运行状异常，喘振/失速较高，请持续关注失速检测页面";
    } else if (data.ab_proportion < 20) {
      state.msg = "设备运行正常，喘振/失速较低，对轴承寿命暂时无表减影响<br>说明:<br>设备失速，累计到一定程度，会加速轴承/叶片的寿命衰减。<br/>设备失速，可能由控制逻辑错误，现场工况异常等现象引起，这些都是异常诊断，寿命影响判断的关键依据，请持续关注页面分析结果。";
    }
  })

});

const handSetWebPath = (url) => {
  const data = {
    id: 1,
    urlPath: url
  }
  API.setWebPath(data).then((res) => {
    console.log("res ", res);
  })
}

</script>

<template>
  <div class="container">
    <pangge-Header timeShow="true">
      <!-- <template v-slot:header-block>
        <Select
          ref="select"
          size="large"
          v-model:value="state.deviceId"
          style="width: 209px"
          @change="handleDeviceChange"
        >
          <SelectOption value="轴流风机">轴流风机</SelectOption>
        </Select>
      </template> -->
    </pangge-Header>
    <div class="container-content">
      <div class="container-content-blockRow">
        <div class="container-content-blockRow-left">
          <DeviceInfo
            :title="state.deviceName"
            production="2023-08-01"
            operate="2023-08-01"
          />
          <ExpertAdvice
            :text1="dayjs().format('YYYY-MM-DD HH:mm:ss')"
            text2=""
            :text3="state.msg"
            text4="请关注预测性维护页面，及时安排叶片检修"
          />
        </div>
        <div class="container-content-blockRow-right flex">
          <div class="container-content-blockRow-right-block1 flex">
            <div class="container-content-blockRow-right-block1-left padding20">
              <pangge-Title text="喘振/失速趋势预测"></pangge-Title>
              <div style="width: 100%; height: 100%" id="EchartsQue1" @click="handSetWebPath('/child/' + state.deviceType + '/2')"></div>
            </div>
            <div
              class="container-content-blockRow-right-block1-right padding20"
            >
              <ChartSpeed
                v-if="state.deviceType === '0' || state.deviceType === '1'"
                value="4000"
                title="失速累计时间"
                style="height: 100%"
              />
              <ChartSpeed
                v-else
                value="4000"
                title="喘振累计时间"
                style="height: 100%"
              />
            </div>
          </div>
          <div class="container-content-blockRow-right-block2 flex">
            <div class="container-content-blockRow-right-block2-left padding20">
              <pangge-Title text="相关参数趋势"></pangge-Title>
              <div class="container-content-blockRow-right-block2-left-dom">
                <div id="EchartsPerformanceCurve" @click="handSetWebPath('/child/' + state.deviceType + '/1')"></div>
              </div>
            </div>
            <div
              class="container-content-blockRow-right-block2-right padding20"
            >
              <pangge-Title text="三维图名称">
                <template #content-right>
                  <Select
                    ref="select"
                    size="large"
                    v-model:value="state.selectVal"
                    style="width: 209px"
                  >
                    <SelectOption value="DE_Radial_Vib_X">振动</SelectOption>
                    <SelectOption value="Fan_InletPressure">入口压力</SelectOption>
                    <SelectOption value="Fan_Inlet_Temp1">入口温度</SelectOption>
                  </Select>
                </template>
              </pangge-Title>
              <div
                class="container-content-blockRow-right-block2-dom padding20"
              >
                <div style="width: 100%; height: 100%" id="EchartsQue3D"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#EchartsQue1 {
  background-image: linear-gradient(
    to bottom,
    rgb(255 0 0 / 70%),
    rgb(255 255 0 / 70%),
    rgb(0 128 0 / 70%)
  );
  background-size: 92% 78%;
  /* 设置背景图像的宽度为100px，高度为200px */
  background-position: center;
  /* 使背景图像居中 */
  background-repeat: no-repeat;
  /* 不重复背景图像 */
  background-position: 60% 35%;
}

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

      &-right {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &-block1 {
          width: 100%;
          height: 40.5%;

          &-left {
            width: 80%;
            height: 100%;
            background: #ffffff;
            margin-right: 24px;
          }

          &-right {
            width: 20%;
            height: 100%;
            background: #ffffff;
          }
        }

        &-block2 {
          width: 100%;
          height: 59.5%;
          margin-top: 24px;

          &-left {
            width: 50%;
            height: 100%;
            background: #ffffff;
            margin-right: 24px;

            &-dom {
              width: 100%;
              height: 98%;
              overflow: hidden;
              display: flex;

              & > div {
                flex: 1;
              }
            }
          }

          &-right {
            width: 50%;
            height: 100%;
            background: #ffffff;
          }
          &-dom {
            width: 100%;
            height: 95%;
            background: #ffffff;
          }
        }
      }
    }
  }
}
</style>
