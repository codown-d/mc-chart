<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination } from "ant-design-vue";
import ExpertAdvice from "@/components/expertAdvice.vue";
import { Chart } from '@antv/g2';
import * as echarts from "echarts";
import ChartCenter from './chartCenter.vue'
import ChartSpeed from './chartSpeed.vue'
import API from "@/api";
import chartData1 from "./echarts/chartdata1.json";
import { LayoutEchartsQue1, LayoutEquLef } from "./echarts/index";
import RightBottomDom from './rightBottomDom.vue'


const emits = defineEmits([""]);
const router = useRouter();
const route = useRoute();
const current = ref(2);

const props = defineProps({});
var EchartsCurve1 = null;
var LayoutYouYaDom = null;

const state = reactive({
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机" },
  ],
  deviceName: "",
  deviceId: "1",
  deviceType: route.params.deviceType,
  msg: ""
});

const handleDeviceChange = () => { };


onMounted(() => {
  if (state.deviceType === '0') {
    state.deviceName = 'Centrifugal Fan' + state.deviceId;
  } else if (state.deviceType === '1') {
    state.deviceName = 'VPA' + state.deviceId;
  } else {
    state.deviceName = 'SG' + state.deviceId;
  }

  const data = [
    { item: '关键部件预测性维护', type: 'scope', score: 90 },
    { item: '失速影响', type: 'scope', score: 100 },
    { item: '设备子系统预防维护', type: 'scope', score: 95 },
    { item: '可用性', type: 'scope', score: 88 },
    { item: '异常检测', type: 'scope', score: 95 },
  ];

  const chart = new Chart({
    container: 'echartsLeftDom',
    autoFit: true,
    marginLeft: -20,
    marginRight: -20,
    marginTop: -20,
    marginBottom: 10
  });

  chart.coordinate({ type: 'polar' });

  chart
    .data(data)
    .scale('x', { padding: 0.5, align: 0 })
    .scale('y', { tickCount: 5, domainMax: 100 })
    .axis('x', {
      grid: true,
      gridLineWidth: 1,
      tick: false,
      gridLineDash: [0, 0],
    })
    .axis('y', {
      zIndex: 1,
      title: false,
      gridConnect: 'line',
      gridLineWidth: 1,
      gridLineDash: [0, 0],
    })
    ;

  chart
    .area()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .style('fillOpacity', 0.3);

  chart
    .line()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .style('lineWidth', 2);

  chart
    .point()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .encode('shape', 'point')
    .encode('size', 3)
    .tooltip(null);

  chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });

  chart.render();


  // 失速曲线
  if (EchartsCurve1 === null) {
    EchartsCurve1 = echarts.init(document.getElementById("EchartsCurve1"));
    var datasource = chartData1.data;
    var times = datasource[0].times;
    var values = datasource[1].values;
    var scales = datasource[2];
    EchartsCurve1.setOption(LayoutEchartsQue1(times, values, scales));
  }

  if (LayoutYouYaDom === null) {
    var params = {
      dataType: "DeviceData",
      timeFrom: "2024-08-01T00:00:00+08:00",
      timeEnd: "2024-08-31T00:00:00+08:00",
      output: [
          {
              "field": "ControlOilTank_Tank_Pressure",
              "func": "avg"
          }
      ],
      group: {
          "timeInterval": 36000 / 60
      }
    }
    API.getDataAgg(params).then(res => {
        var data = res.data;

        var fileds = ['ControlOilTank_Tank_Pressure']

        var serialData = []
        fileds.forEach(filed => {
          serialData.push({
            name: "润滑油箱压力",
            type: "line",
            data: data.map(dt => dt[filed])
          })
        })
        LayoutYouYaDom = echarts.init(document.getElementById('LayoutYouYaDom'));
        LayoutYouYaDom.setOption(LayoutEquLef(fileds, data.times, serialData));
    })
  }

  window.addEventListener("resize", () => {
    EchartsCurve1.resize();
    LayoutYouYaDom.resize();
  })

  var params = {
    dataType: "DeviceCBM",
    timeFrom: "2024-08-30T00:00:00+08:00",
    timeEnd: "2024-08-31T00:00:00+08:00",
    output: [
        {
            "field": "score",
            "func": "max"
        }
    ],
    group: {
        "timeInterval": 36000
    }
  }
  API.getDataAgg(params).then(res => {
    var data = res.data[0]
    if (data.score > 90) {
      state.msg = "轴承/叶片运行正常，请按预防性维护方式，周期性维护，并持续关注预防性维护页面。<br>说明:<br>关键部件寿命，受到润滑油温度(粘度)，预防性周期维护时间，历史工况(失速，喘振造成的应力损伤累计情况)，异常振动等因素影响，请持续关注预防性维护页面。";
    } else if (data.score < 90) {
      state.msg = "轴承/叶片，受异常因素影响，衰减加速，请关注异常检测，失速预测与分析页面。";
    }
  })


})

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
        <Select ref="select" size="large" v-model:value="state.deviceId" style="width: 209px"
          @change="handleDeviceChange">
          <SelectOption value="轴流风机">轴流风机</SelectOption>
        </Select>
      </template> -->
    </pangge-Header>
    <div class="container-content">
      <div class="container-content-blockRow">
        <div class="container-content-blockRow-left">
          <ExpertAdvice text1="2024年4月11号" text2="19:08" :text3="state.msg"
            text4="请关注预测性维护页面，及时安排叶片检修" />
          <div class="container-content-blockRow-left-block1 flex flex-direction ">
            <div class="padding20"><pangge-Title text="影响寿命因素"></pangge-Title></div>
            <div class="echartsDom" id="echartsLeftDom"></div>
          </div>
        </div>
        <div class="container-content-blockRow-center">
          <div class="container-content-blockRow-center-block1 flex">
            <div class="container-content-blockRow-center-block1-left padding20 space-between flex-direction"
              style="padding-bottom: 0;">
              <pangge-Title text="预测性维护趋势"></pangge-Title>
              <ChartCenter />
            </div>
          </div>
          <div class="container-content-blockRow-center-block2 flex">
            <div class="container-content-blockRow-center-block2-t1 padding20">
              <pangge-Title text="失速曲线"></pangge-Title>
              <!-- <ChartCurve refId="ChartCurve1" /> -->
              <div style="width: 100%; height: 100%" id="EchartsCurve1" @click="handSetWebPath('/child/' + state.deviceType + '/2')"></div>
            </div>
            <div class="container-content-blockRow-center-block2-t2 padding20">
              <pangge-Title text="油路系统油压曲线"></pangge-Title>
              <!-- <ChartCurve refId="ChartCurve2" /> -->
              <div style="width: 100%; height: 100%" id="LayoutYouYaDom"></div>
            </div>
            <div class="container-content-blockRow-center-block2-t3 padding20">
              <pangge-Title text="振动曲线"></pangge-Title>
              <!-- <ChartCurve refId="ChartCurve3" /> -->
              <RightBottomDom />
            </div>
          </div>
        </div>
        <div class="container-content-blockRow-right padding20">
          <pangge-Title text="周期维护时间"></pangge-Title>
          <ChartSpeed value="5000" title="润滑油预防性维护时间" />
          <ChartSpeed value="6000" title="叶片和轮毂检查维护时间" />
          <ChartSpeed value="4800" title="液压油站/液压油预防性维护时间" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#EchartsCurve1 {
  background-image: linear-gradient(
    to bottom,
    rgb(255 0 0 / 70%),
    rgb(255 255 0 / 70%),
    rgb(0 128 0 / 70%)
  );
  background-size: 91% 80%;
  /* 设置背景图像的宽度为100px，高度为200px */
  /* 使背景图像居中 */
  background-repeat: no-repeat;
  /* 不重复背景图像 */
  background-position: right center;
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

        &-block1 {
          width: 100%;
          height: 35%;
          background: #FFFFFF;
          margin-top: 24px;


        }

        &-block2 {
          width: 100%;
          height: 65%;
          background: #FFFFFF;

        }
      }

      &-center {
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 24px;

        &-block1 {
          width: 100%;
          height: 60%;
          margin-bottom: 24px;
          background-color: #FFFFFF;

          &-left {
            width: 100%;
            height: 100%;
          }
        }

        &-block2 {
          width: 100%;
          height: 40%;

          &-t1,
          &-t2,
          &-t3 {
            width: 33.333333333333336%;
            height: 100%;
            background-color: #FFFFFF;
          }

          &-t2 {
            margin: 0 24px;
          }
        }
      }

      &-right {
        width: 15%;
        height: 100%;
        background-color: #FFFFFF;
      }

    }

  }
}
</style>
