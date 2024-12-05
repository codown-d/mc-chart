<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Select,
  SelectOption,
  Pagination,
  Button,
  Table,
} from "ant-design-vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
import * as echarts from "echarts";
import TitleView from "./title.vue";
import LeftBottomDom from "../../vibration/leftBottomDom.vue";
import RightDom from "../../vibration/rightDom.vue";
import RightBottomDom from "../../vibration/rightBottomDom.vue";
import API from "@/api";
import { block2Echats, block1Echats } from "./block3-echats";
import {
  LayoutEquLef
} from "../../equipment/echarts/index";
import dayjs from "dayjs";
const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
let LayoutEquLefDom = null;
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
  msg: "",
  tab: "过去7天趋势",
  tabArr: ["过去7天趋势", "过去30天趋势", "过去半年趋势", "过去一年趋势"],
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

const columns = [
  {
    title: "参数名称",
    dataIndex: "title",
    key: "title",
    children: [
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 250,
      },
    ],
  },
  {
    title: "1月",
    dataIndex: "name",
    key: "name",
    children: [
      {
        title: "最小值",
        dataIndex: "minVal",
        key: "minVal",
      },
      {
        title: "最大值",
        dataIndex: "maxVal",
        key: "maxVal",
      },
    ],
  },
  {
    title: "2月",
    dataIndex: "name",
    key: "name",
    children: [
      {
        title: "最小值",
        dataIndex: "minVal",
        key: "minVal",
      },
      {
        title: "最大值",
        dataIndex: "maxVal",
        key: "maxVal",
      },
    ],
  },
  {
    title: "3月",
    dataIndex: "name",
    key: "name",
    children: [
      {
        title: "最小值",
        dataIndex: "minVal",
        key: "minVal",
      },
      {
        title: "最大值",
        dataIndex: "maxVal",
        key: "maxVal",
      },
    ],
  },
  {
    title: "4月",
    dataIndex: "name",
    key: "name",
    children: [
      {
        title: "最小值",
        dataIndex: "minVal",
        key: "minVal",
      },
      {
        title: "最大值",
        dataIndex: "maxVal",
        key: "maxVal",
      },
    ],
  },
];
const nameArr = [
  "主电机驱动端轴承温度",
  "入口压力",
  "入口与出口压差",
  "风机进气温度",
  "失速压差",
  "出口空气压力",
  "出口导叶开度",
  "主电机电流",
  "高速轴振动值",
  "油总管压力",
];
const data = [...Array(10)].map((_, i) => ({
  key: i,
  name: nameArr[i],
  minVal: 0,
  maxVal: 0,
}));

onMounted(() => {
  if (state.deviceType === "0") {
    state.deviceName = "Centrifugal Fan" + state.deviceId;
  } else if (state.deviceType === "1") {
    state.deviceName = "VPA" + state.deviceId;
  } else {
    state.deviceName = "SG" + state.deviceId;
  }
  echarts.init(document.getElementById("LayoutEquLefDom")).dispose();
  LayoutEquLefDom = echarts.init(document.getElementById("LayoutEquLefDom"));

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
    var option = LayoutEquLef(fileds, data.times, serialData);
    LayoutEquLefDom.setOption(option);
  });
  // let block1EchatsDom = echarts.init(document.getElementById("block1Echats"));
  // block1EchatsDom.setOption(block1Echats());
  window.addEventListener("resize", () => {
    LayoutEquLefDom.resize();
  });
  // block2Echats();
  getDataAggData();
});
const getDataAggData = () => {
  var params = {
    dataType: "DeviceLSTM",
    timeFrom: "2024-08-30T00:00:00+08:00",
    timeEnd: "2024-08-31T00:00:00+08:00",
    output: [
      {
        field: "ab_proportion",
        func: "max",
      },
    ],
    group: {
      timeInterval: 36000,
    },
  };
  API.getDataAgg(params).then((res) => {
    var data = res.data[0];
    if (data.ab_proportion < 0.3) {
      state.msg =
        "设备运行正常，振动没有异常趋势<br>说明:异常振动，会加速轴承/叶片的寿命衰减。<br>异常振动，可能由裂纹，积灰，底座不平衡等异常现象引起，这些都是异常诊断的关键依据请持续关注页面分析结果。";
    } else if (data.ab_proportion > 0.3 && data.ab_proportion < 0.6) {
      state.msg =
        "振动趋势异常，最近3周内，振动有增加趋势，请持续关注异常检测页面。";
    } else if (data.ab_proportion > 0.6) {
      state.msg =
        "振动趋势异常，请关注轴承温度，该设备有积灰趋势，同时请检查轴承是否出现裂纹，并联系豪顿工程师。";
    }
  });
};

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
      var option = LayoutEquLef(fileds, res.times, serialData);
      LayoutEquLefDom.setOption(option);
    });
  }
};
</script>

<template>
  <div class="container-content-blockRow-block3">
    <img
      src="/images/analysis/block3.png"
      class="container-content-blockRow-block3-img"
    />
    <div class="container-content-blockRow-block3-title">
      <TitleView
        sort="03"
        title="异常检测分析"
        describe="Energy efficiency statistics"
      />
    </div>
    <div class="container-content-blockRow-block3-body flex">
      <div class="container-content-blockRow-block3-body-left">
        <ExpertAdvice
          :text1="dayjs().format('YYYY-MM-DD HH:mm:ss')"
          text2=""
          :text3="state.msg"
          text4="请关注预测性维护页面，及时安排叶片检修"
        />
      </div>
      <div class="container-content-blockRow-block3-body-right padding10">
        <pangge-Title text="异常数据分布" fontClass="font24"></pangge-Title>
        <LeftBottomDom />
      </div>
    </div>

    <div class="container-content-blockRow-block3-echats padding10">
      <pangge-Title
        text="近一个月的工况散点图"
        fontClass="font24"
      ></pangge-Title>
      <div
        class="container-content-blockRow-block3-echats-dom"
        style="padding: 20px 0"
      >
        <RightDom />
      </div>
    </div>

    <div class="container-content-blockRow-block3-echats padding10">
      <pangge-Title text="振动状态" fontClass="font24"></pangge-Title>
      <div class="container-content-blockRow-block3-echats-dom">
        <RightBottomDom />
      </div>
    </div>

    <div class="container-content-blockRow-block3-echats padding10">
      <pangge-Title text="参数KPI" fontClass="font24"></pangge-Title>
      <div class="container-content-blockRow-block3-echats-table">
        <Table
          :columns="columns"
          :data-source="data"
          bordered
          size="middle"
          :scroll="{ x: 'calc(700px + 50%)', y: 240 }"
        />
      </div>
    </div>
    <div class="container-content-blockRow-block3-echats padding10">
      <pangge-Title text="参数趋势" fontClass="font24">
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
      <div class="container-content-blockRow-block3-echats-dom">
        <div id="LayoutEquLefDom" style="width: 100%; height: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container-content-blockRow-block3 {
  width: 100%;
  padding: 49px 155px;
  position: relative;

  &-img {
    width: 159px;
    height: 159px;
    position: absolute;
    right: 96px;
    top: 60px;
  }
  &-body {
    margin-top: 80px;
    &-left {
      width: 25%;

      &-left {
        width: 100%;
        height: 200px;
        &-font {
          width: 20%;
          height: 100%;
          div:nth-child(1) {
            font-size: 16px;
            color: #2c3133;
            margin-bottom: 10px;
            position: relative;
            text-align: right;
          }

          div:nth-child(2) {
            font-weight: bold;
            font-size: 24px;
            color: #2c3133;
          }
        }
        &-font:nth-child(1) {
          div:nth-child(1) {
            padding-right: 20px;
          }
          div:nth-child(1)::after {
            content: " ";
            width: 8px;
            height: 8px;
            background: #0087d3;
            position: absolute;
            right: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &-font:nth-child(3) {
          div:nth-child(1) {
            padding-left: 20px;
          }
          div:nth-child(1)::after {
            content: " ";
            width: 8px;
            height: 8px;
            background: rgba(246, 77, 62, 1);
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      &-center {
        width: 100%;
        height: 128px;
        background: #f8f8fa;
        border-radius: 10px 10px 10px 10px;
        align-items: center;
        margin-top: -20px;
        &-echats {
          width: 40%;
          height: 100%;
        }

        &-font:nth-child(1) {
          div:nth-child(1) {
            padding-left: 20px;
          }

          div:nth-child(2) {
            color: #0087d3;
          }
          div:nth-child(1)::after {
            content: " ";
            width: 8px;
            height: 8px;
            background: #0087d3;
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        &-font:nth-child(3) {
          div:nth-child(1) {
            padding-left: 20px;
          }

          div:nth-child(1)::after {
            content: " ";
            width: 8px;
            height: 8px;
            background: rgba(217, 217, 217, 1);
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        &-font {
          width: 30%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
          div:nth-child(1) {
            font-size: 16px;
            color: #2c3133;
            margin-bottom: 10px;
            position: relative;
          }

          div:nth-child(2) {
            font-weight: bold;
            font-size: 28px;
            color: #2c3133;
            span {
              font-weight: 400;
              font-size: 13px;
              color: #2c3133;
              margin-left: 10px;
            }
          }
        }
      }
      &-right {
        height: 128px;
        margin-top: 21px;
        &-items:nth-child(1) {
          background: rgba(0, 135, 211, 0.05);
          margin-right: 10px;
        }
        &-items:nth-child(2) {
          background: rgba(246, 77, 62, 0.05);
        }
        &-items {
          width: 50%;

          padding: 23px;
          border-radius: 10px;
          img {
            width: 76px;
            height: 76px;
            margin-right: 10px;
          }

          &-font div:nth-child(1) {
            font-weight: bold;
            font-size: 28px;
            color: #2c3133;
            margin-bottom: 12px;
          }
          &-font div:nth-child(2) {
            font-weight: 400;
            font-size: 18px;
            color: #2c3133;
          }
        }
      }
    }
    &-right {
      width: 75%;
      padding-left: 20px;

      &-tabs {
        margin: 25px 0;
        div {
          width: 184px;
          height: 47px;
          background: #f2f4f5;
          font-size: 18px;
          color: #2c3133;
        }
        .action {
          background: #0087d3;
          color: #ffffff;
        }
      }
      &-echats {
        width: 100%;
        height: 340px;
        background-color: #f8f8fa;
      }
    }
  }
  &-echats {
    width: 100%;
    &-dom {
      width: 100%;
      height: 500px;
      background-color: #f8f8fa;
      margin-top: 25px;
    }
    &-table {
      margin-top: 25px;
    }
  }
}
</style>
