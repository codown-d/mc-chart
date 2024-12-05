<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Select, SelectOption, Table } from "ant-design-vue";
import * as echarts from "echarts";
import {
  EchartsQueOption2,
  LayoutBlockLef,
  LayoutEquLef,
} from "./echarts/index";
import API from "@/api";
import chartData from "./echarts/chartdata.json";
import chartData1 from "./echarts/chartdata1.json";
import chartData2 from "./echarts/chartdata2.json";
const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const columns = [
  {
    title: "参数名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "平均值",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "最大值",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "最小值",
    key: "tags",
    dataIndex: "tags",
  },
];

const data = [
  {
    key: "1",
    name: "主电机驱动端轴承温度",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "2",
    name: "入口压力",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "3",
    name: "入口与出口压差",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "4",
    name: "风机进气温度",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "5",
    name: "失速压差",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "6",
    name: "出口空气压力",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "7",
    name: "出口导叶开度",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "8",
    name: "主电机电流",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "9",
    name: "高速轴振动值",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
  {
    key: "10",
    name: "油总管压力",
    age: 69.4,
    address: 80.9,
    tags: 56.6,
  },
];
const props = defineProps({});

const state = reactive({
  deviceType: route.params.deviceType,
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机" },
  ],
  deviceName: "离心风机",
  deviceInfoArr: [
    {
      title: "出口空气压力",
      value: "727.00",
      unit: "PA",
      style: {
        top: "5%",
        left: "10%",
      },
    },
    {
      title: "主电机驱动端轴承温度",
      value: "99",
      unit: "°C",
      style: {
        top: "5%",
        right: "20%",
        width: "150px",
      },
    },
    {
      title:
        route.params.deviceType === "0" || route.params.deviceType === "1"
          ? "轴承振动值"
          : "高速轴振动值",
      value: "3.00",
      unit:
        route.params.deviceType === "0" || route.params.deviceType === "1"
          ? "mm/s"
          : "um",
      style: {
        top: "35%",
        left: "5%",
      },
    },
    {
      title: "主电机电流",
      value: "21.00",
      unit: "A",
      style: {
        bottom: "10%",
        left: "15%",
      },
    },
    {
      title: "油总管压力",
      value: "1402.00",
      unit: "PA",
      style: {
        top: "35%",
        right: "10%",
      },
    },
    {
      title: "综合报警",
      value: "正常",
      style: {
        bottom: "10%",
        right: "5%",
      },
    },
  ],
  devParms: [],
  param: "Outlet_Differential_Pressure",
  params: [
    { value: "Fan_InletPressure", label: "入口压力" },
    { value: "Outlet_Differential_Pressure", label: "入口与出口差压" },
    { value: "Fan_InletPressure_DP1", label: "入口差压" },
    { value: "Fan_Inlet_Temp1", label: "风机进气温度" },
    { value: "Fan_StallProbe_DP1", label: "失速差压" },
    { value: "DE_Radial_Temp_Radial1", label: "风机轴承温度" },
    { value: "NDE_Radial_Temp_Radial1", label: "风机非轴承温度" },
    { value: "DE_Radial_Vib_X", label: "风机驱动端X向振动" },
    { value: "DE_Radial_Vib_Y", label: "风机驱动端Y向振动" },
    { value: "ControlOilTank_Tank_Pressure", label: "润滑油箱压力" },
    { value: "ControlOilTank_TankTemperature", label: "润滑油箱油温" },
    { value: "Motor_DE_Radial_Temp_1", label: "主电机驱动端轴承温度" },
    { value: "Motor_NDE_Radial_Temp_1", label: "主电机非驱动端轴承温度" },
    { value: "Motor_Winding_Temp_W_1", label: "主电机W相绕组温度" },
    { value: "Motor_Winding_Temp_U_1", label: "主电机U相绕组温度" },
    { value: "Motor_Winding_Temp_V_1", label: "主电机V相绕组温度" },
    { value: "Motor_DE_Radial_Vib_X_1", label: "主电机驱动端X方向振动" },
    { value: "Motor_NDE_Radial_Vib_X_1", label: "主电机非驱动端X方向振动" },
    { value: "Motor_NDE_Radial_Vib_Y_1", label: "主电机非驱动端Y方向振动" },
    { value: "Motor_Icombined", label: "主电机电流" },
    { value: "Fan_Outlet_Temp1", label: "风机出口温度" },
    { value: "Fan_BladeAngle", label: "导叶角度" },
    { value: "Fan_Operation_Time", label: "设备累计运行时间" },
    { value: "AeroPerformance_Flow_Rate", label: "风机流量" },
  ],
});

const groupBy = (array, key) => {
  return array.reduce((result, currentItem) => {
    // 使用 key 函数提取分组键，如果是字符串属性则直接使用
    const groupKey =
      typeof key === "function" ? key(currentItem) : currentItem[key];

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
  var groupedByCategory = [];
  if (state.deviceType === "0") {
    groupedByCategory = groupBy(chartData, "Type");
  } else if (state.deviceType === "1") {
    groupedByCategory = groupBy(chartData1, "Type");
  } else if (state.deviceType === "2") {
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
  var deviceName = "GFJ2";
  var data = [];
  // legends.push(deviceName);
  var field = {
    name: deviceName,
    type: "scatter",
    data: [],
    symbolSize: 5,
    color: "red",
  };

  var grid = {
    top: "20%",
    left: "0%",
    right: "5%",
    bottom: "1%",
    containLabel: true,
  };

  var legendsObj = {
    data: legends,
    top: '0%',
    left: '10%',
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

  let EchartsEquSource = echarts.init(
    document.getElementById("EchartsEquSource")
  );
  var option = EchartsQueOption2(legendsObj, serialData, grid);
  EchartsEquSource.setOption(option);

  window.addEventListener("resize", () => {
    EchartsEquSource.resize();
  });

  var params = {
    dataType: "DeviceData",
    timeFrom: "2024-08-01T00:00:00+08:00",
    timeEnd: "2024-08-31T00:00:00+08:00",
    output: [
      {
        field: "Outlet_Differential_Pressure",
        func: "avg",
      },
    ],
    group: {
      timeInterval: 36000 / 60,
    },
  };
  API.getDataAgg(params).then((res) => {
    var data = res.data;
    var fileds = [state.param];

    var serialData = [];
    fileds.forEach((filed) => {
      serialData.push({
        name: "入口与出口差压",
        type: "line",
        datasetIndex: 1,
        data: data.map((dt) => dt[filed]),
      });
    });
    echarts.init(document.getElementById("LayoutEquLefDom")).dispose();
    let LayoutEquLefDom = echarts.init(
      document.getElementById("LayoutEquLefDom")
    );
    var option = LayoutEquLef(fileds, data.times, serialData);
    LayoutEquLefDom.setOption(option);
  });
});

const changeParam = (paramVal) => {
  if (paramVal) {
    // let result = {}
    // result.dataType = "DeviceData"
    // result.output = "Device_Name,create_time," + paramVal.join(",")
    // result.timeFrom = '2024-08-30T19:00:00+08:00'
    // result.timeEnd = '2024-08-30T20:00:00+08:00'
    // API.getData(result).then(res => {
    var result = {
      dataType: "DeviceData",
      timeFrom: "2024-08-01T00:00:00+08:00",
      timeEnd: "2024-08-31T00:00:00+08:00",
      output: [
        // {
        //     "field": "Outlet_Differential_Pressure",
        //     "func": "avg"
        // }
      ],
      group: {
        timeInterval: 36000 / 60,
      },
    };
    paramVal.forEach((pm) => {
      result.output.push({
        field: pm,
        func: "avg",
      });
    });
    API.getDataAgg(result).then((res) => {
      var data = res.data;
      var fileds = [];
      paramVal.forEach((val) => {
        var filedVal = state.params.filter((param) => val === param.value);
        fileds.push(filedVal);
      });

      var serialData = [];
      paramVal.forEach((filed) => {
        serialData.push({
          name: state.params.filter((param) => param.value === filed)[0].label,
          type: "line",
          data: data.map((dt) => dt[filed]),
        });
      });
      echarts.init(document.getElementById("LayoutEquLefDom")).dispose();
      let LayoutEquLefDom = echarts.init(
        document.getElementById("LayoutEquLefDom")
      );
      var option = LayoutEquLef(fileds, res.times, serialData);
      LayoutEquLefDom.setOption(option);
    });
  }
};

const handleDeviceChange = () => {};

const handSetWebPath = (url) => {
  const data = {
    id: 1,
    urlPath: url,
  };
  API.setWebPath(data).then((res) => {
    console.log("res ", res);
  });
};
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
          <div class="container-content-blockRow-left-block1 padding20">
            <pangge-Title text="设备状况"></pangge-Title>
            <div class="container-content-blockRow-left-block1-row">
              <img
                v-if="state.deviceType == 0"
                src="/images/离心风机3.jpg"
                class="container-content-blockRow-left-block1-row-bg"
              />
              <img
                v-else-if="state.deviceType == 1"
                src="/images/轴流风机.png"
                class="container-content-blockRow-left-block1-row-bg"
              />
              <img
                v-else-if="state.deviceType == 2"
                src="/images/鼓风机.png"
                class="container-content-blockRow-left-block1-row-bg"
              />
              <div
                v-for="(items, index) in state.deviceInfoArr"
                :key="index"
                class="container-content-blockRow-left-block1-row-info"
                :class="`device${index + 1}`"
                :style="items.style"
              >
                <div
                  class="container-content-blockRow-left-block1-row-info-title"
                >
                  {{ items.title }}
                </div>
                <div
                  class="container-content-blockRow-left-block1-row-info-span"
                >
                  <span>{{ items.value }}</span
                  >{{ items.unit }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="container-content-blockRow-left-block2 padding20"
            style="padding-bottom: 0"
          >
            <pangge-Title text="性能趋势"></pangge-Title>
            <div class="container-content-blockRow-left-block2-dom">
              <div
                @click="handSetWebPath('/child/' + state.deviceType + '/1')"
                id="EchartsEquSource"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="container-content-blockRow-right padding20"
          style="padding-bottom: 0"
        >
          <pangge-Title text="参数KPI"></pangge-Title>
          <div class="marginTop20 container-content-blockRow-right-block1">
            <Table
              :columns="columns"
              :data-source="data"
              :pagination="{ hideOnSinglePage: true }"
              :scroll="{ y: 200 }"
            ></Table>
          </div>
          <div class="container-content-blockRow-right-block2">
            <pangge-Title text="参数趋势">
              <template #content-right>
                <Select
                  ref="select"
                  size="small"
                  class="sitemore"
                  mode="multiple"
                  v-on:change="changeParam"
                  v-model:value="state.param"
                  style="width: 209px"
                  :options="state.params"
                >
                </Select>
              </template>
            </pangge-Title>
            <div class="container-content-blockRow-left-block2-dom">
              <div
                @click="handSetWebPath('/child/' + state.deviceType + '/0')"
                id="LayoutEquLefDom"
              ></div>
            </div>
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
        width: 57%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 24px;

        &-block1 {
          width: 100%;
          height: 45%;
          background: #ffffff;
          margin-bottom: 24px;
          &-row {
            width: 100%;
            height: 100%;
            text-align: center;
            position: relative;
            &-bg {
              position: absolute;
              left: 0;
              top: 0;
              height: 100%;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            &-info {
              position: absolute;
              width: 135px;
              height: 84px;
              background: rgba(255, 255, 255, 0.78);
              box-shadow: 0px 0px 10px 0px rgba(72, 111, 133, 0.13);
              border-radius: 10px;
              overflow: hidden;

              &-title {
                width: 100%;
                height: 41px;
                background: rgba(0, 135, 211, 0.08);
                font-weight: bold;
                font-size: 14px;
                color: #2e383d;
                position: relative;
                display: flex;
                align-items: center;
                padding-left: 24px;
              }

              .device6 &-title::after {
                background: #15b79a;
              }

              &-title::after {
                content: " ";
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 4px;
                background: #0087d3;
              }

              .device6 &-span span {
                font-size: 16px !important;
                color: #15b79a !important;
              }

              &-span {
                font-weight: 400;
                font-size: 12px;
                color: #606c71;
                height: 43px;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                  font-weight: bold;
                  font-size: 20px;
                  color: #0087d3;
                  margin-right: 4px;
                }
              }
            }

            img {
              height: 100%;
            }
          }
        }

        &-block2 {
          width: 100%;
          height: 55%;
          background: #ffffff;
          overflow: hidden;
          &-dom {
            width: 100%;
            height: 92%;
            overflow: hidden;
            display: flex;
            & > div {
              flex: 1;
            }
          }
        }
      }

      &-right {
        width: 43%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        overflow: hidden;
        &-block1 {
          width: 100%;
          height: 48%;
        }

        &-block2 {
          width: 100%;
          height: 52%;
          overflow: hidden;
          &-title {
            width: 100%;
            padding: 8px 16px;
            background: linear-gradient(
              90deg,
              #e9f3f9 0%,
              rgba(0, 135, 211, 0) 100%
            );
            border-radius: 28px;
          }
        }
      }
    }
  }
}

.sitemore {
  width: 320px;
  height: 40px;
  display: flex;
  line-height: 40px;
  align-items: center;
  :deep(.ant-select-selection--multiple) {
    width: 100%;
    height: 32px;
    :deep(.ant-select-selection__rendered) {
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        display: -webkit-box;
        &::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        &::-webkit-scrollbar-track {
          background-color: #dedede;
          -webkit-border-radius: 1em;
          -moz-border-radius: 1em;
          border-radius: 1em;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #bfbfbf;
          -webkit-border-radius: 1em;
          -moz-border-radius: 1em;
          border-radius: 1em;
        }
        & > li {
          padding: 0px 10px 0px 5px;
          box-sizing: border-box;
          width: 75px;
          float: unset;
        }
      }
    }
  }
}
</style>
