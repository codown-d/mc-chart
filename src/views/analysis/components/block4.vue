<script setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Table } from "ant-design-vue";
import { Chart } from "@antv/g2";
import * as echarts from "echarts";
import { median } from "d3-array";
import { DownloadOutlined } from "@ant-design/icons-vue";
import ExpertAdvice from "@/components/expertAdvice.vue";
import ChartCenter from "../../preventive/chartCenter.vue";
import ChartSpeed from "./chartSpeed.vue";
import TitleView from "./title.vue";
import { BottomData } from "../../preventive/echarts/data1";
import chartData1 from "../../preventive/echarts/chartdata1.json";
import {
  LayoutEchartsQue1,
  LayoutEquLef,
} from "../../preventive/echarts/index";
import API from "@/api";
const emits = defineEmits([""]);
const router = useRouter();

var EchartsCurve1 = null;
var LayoutYouYaDom = null;
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

const titleArr = [
  "油脂",
  "油脂",
  "油脂",
  "油脂",
  "油脂",
  "",
  "轮毂",
  "轮毂",
  "轮毂",
  "",
  "",
  "",
];
const nameArr = [
  "液压油滤芯",
  "液压油",
  "润滑油",
  "电机轴承油脂",
  "轮毂油",
  "液压油软管",
  "叶柄轴承",
  "滑靴",
  "滑套",
  "MBA主轴承",
  "叶片",
  "液压缸",
  "旋转油封",
];
const data = [...Array(nameArr.length)].map((_, i) => ({
  key: i,
  title: titleArr[i],
  name: nameArr[i],
  date1: 0,
  date2: 0,
  date3: 0,
  date4: 0,
  remark: "",
}));

const columns = [
  {
    title: "主要部件",
    dataIndex: "",
    key: "",
    children: [
      {
        title: "",
        dataIndex: "title",
        key: "title",
        width: 70,
        align: "center",
        // customRender: (text, index) => {
        //   console.log(index);
        //   const obj = {
        //     children: text.text,
        //     props: {},
        //   };
        //   obj.props.rowSpan = 1;
        //   obj.props.colSpan = 1;
        //   return obj;
        // },
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 250,
      },
    ],
  },
  {
    title: "每半年",
    dataIndex: "date1",
    key: "date1",
  },
  {
    title: "每年",
    dataIndex: "date2",
    key: "date2",
  },
  {
    title: "每2年",
    dataIndex: "date3",
    key: "date3",
  },
  {
    title: "每6年",
    dataIndex: "date4",
    key: "date4",
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    width: 100,
    align: "center",
    customRender: (text, index) => {
      const obj = {
        children: "编辑"
      };
      return obj;
    },
  },
];

onMounted(() => {
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
          field: "ControlOilTank_Tank_Pressure",
          func: "avg",
        },
      ],
      group: {
        timeInterval: 36000 / 60,
      },
    };
    API.getDataAgg(params).then((res) => {
      var data = res.data;

      var fileds = ["ControlOilTank_Tank_Pressure"];

      var serialData = [];
      fileds.forEach((filed) => {
        serialData.push({
          name: "润滑油箱压力",
          type: "line",
          data: data.map((dt) => dt[filed]),
        });
      });
      LayoutYouYaDom = echarts.init(document.getElementById("LayoutYouYaDom"));
      LayoutYouYaDom.setOption(LayoutEquLef(fileds, data.times, serialData));
    });
  }

  bottomData(BottomData);
  echartsLeftDomData();

  window.addEventListener("resize", () => {
    EchartsCurve1.resize();
    LayoutYouYaDom.resize();
  });
});

const echartsLeftDomData = () => {
  const data = [
    { item: "关键部件预测性维护", type: "影响寿命因素", 影响寿命因素: 90 },
    { item: "失速影响", type: "影响寿命因素", 影响寿命因素: 100 },
    { item: "设备子系统预防维护", type: "影响寿命因素", 影响寿命因素: 95 },
    { item: "可用性", type: "影响寿命因素", 影响寿命因素: 88 },
    { item: "异常检测", type: "影响寿命因素", 影响寿命因素: 95 },
  ];

  const chart = new Chart({
    container: "echartsLeftDom",
    autoFit: true,
    marginLeft: 20,
    marginRight: 0,
    marginTop: 20,
    marginBottom: 30,
  });

  chart.coordinate({ type: "polar" });

  chart
    .data(data)
    .scale("x", { padding: 0.5, align: 0 })
    .scale("y", { tickCount: 5, domainMax: 100 })
    .axis("x", {
      grid: true,
      gridLineWidth: 1,
      tick: false,
      gridLineDash: [0, 0],
    })
    .axis("y", {
      zIndex: 1,
      title: false,
      gridConnect: "line",
      gridLineWidth: 1,
      gridLineDash: [0, 0],
    });

  chart
    .area()
    .encode("x", "item")
    .encode("y", "影响寿命因素")
    .encode("color", "type")
    .style("fillOpacity", 0.3);

  chart
    .line()
    .encode("x", "item")
    .encode("y", "影响寿命因素")
    .encode("color", "type")
    .style("lineWidth", 2);

  chart
    .point()
    .encode("x", "item")
    .encode("y", "影响寿命因素")
    .encode("color", "type")
    .encode("shape", "point")
    .encode("size", 3)
    .tooltip(null);

  chart.interaction("tooltip", { crosshairsLineDash: [4, 4] });

  chart.render();
};

const bottomData = (data) => {
  const medianValue = median(data, (d) => d.value);
  const chart = new Chart({
    container: "EchartsCurve3",
    autoFit: true,
  });
  chart
    .line()
    .data(data)
    .scale("y", { nice: true })
    .scale("x", { utc: true })
    .scale("color", {
      type: "threshold",
      domain: [medianValue],
      range: ["green", "red"],
    })
    .encode("x", (d) => new Date(d.date))
    .encode("y", "value")
    .encode("shape", "hvh")
    .encode("color", "value")
    .encode("series", () => undefined)
    .style("gradient", "y")
    .style("lineWidth", 1.5)
    .style("lineJoin", "round")
    .axis("x", { title: "date" });
  chart.legend(false);
  chart.render();
};

const edit = (key) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};

const save = (key) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  delete editableData[key];
};

const state = reactive({});
</script>

<template>
  <div class="container-content-blockRow-block4">
    <div class="container-content-blockRow-block4-title">
      <TitleView sort="04" title="预测性分析" describe="Predictive analysis" />
    </div>
    <div class="container-content-blockRow-block4-body">
      <div class="container-content-blockRow-block4-body-echats padding10">
        <pangge-Title
          text="叶片/轴承预测寿命分析"
          fontClass="font24"
        ></pangge-Title>
        <div class="container-content-blockRow-block4-body-echats-Row flex">
          <div
            class="container-content-blockRow-block4-body-echats-dom"
            style="background-color: #ffffff"
          >
            <ChartCenter />
          </div>
          <div class="container-content-blockRow-block4-body-echats-right">
            <ExpertAdvice
              text1="2024年4月11号"
              text2="19:08"
              text3="设备出现喘振，导致异常震动入口压力上升过快"
              text4="请关注预测性维护页面，及时安排叶片检修"
            />
          </div>
        </div>
      </div>
      <div class="container-content-blockRow-block4-body-echats padding10">
        <pangge-Title text="影响因素趋势分析" fontClass="font24"></pangge-Title>
        <div class="container-content-blockRow-block4-body-echats-Row flex">
          <div class="container-content-blockRow-block4-body-echats-dom flex">
            <div
              class="container-content-blockRow-block4-body-echats-dom-chart padding20"
            >
              <pangge-Title text="失速曲线"></pangge-Title>
              <div style="width: 100%; height: 100%" id="EchartsCurve1"></div>
            </div>
            <div
              class="container-content-blockRow-block4-body-echats-dom-chart padding20"
            >
              <pangge-Title text="油路系统油压曲线"></pangge-Title>
              <div style="width: 100%; height: 100%" id="LayoutYouYaDom"></div>
            </div>
            <div
              class="container-content-blockRow-block4-body-echats-dom-chart padding20"
            >
              <pangge-Title text="振动曲线"></pangge-Title>
              <div id="EchartsCurve3" style="width: 100%; height: 100%"></div>
            </div>
          </div>
          <div class="container-content-blockRow-block4-body-echats-right">
            <ExpertAdvice
              text1="2024年4月11号"
              text2="19:08"
              text3="设备出现喘振，导致异常震动入口压力上升过快"
              text4="请关注预测性维护页面，及时安排叶片检修"
            />
          </div>
        </div>
      </div>
      <div class="container-content-blockRow-block4-body-echats padding10">
        <pangge-Title
          text="设备预防性维护分析"
          fontClass="font24"
        ></pangge-Title>
        <div class="container-content-blockRow-block4-body-echats-Row">
          <div
            class="container-content-blockRow-block4-body-echats-dom flex"
            style="width: 100%; height: 100%"
          >
            <ChartSpeed value="5000" title="润滑油预防性维护时间" />
            <ChartSpeed value="6000" title="叶片和轮毂检查维护时间" />
            <ChartSpeed value="4800" title="液压油站/液压油预防性维护时间" />
            <div class="echartsDom" id="echartsLeftDom"></div>
          </div>
        </div>
      </div>
      <div class="container-content-blockRow-block4-body-echats padding10">
        <pangge-Title text="维护建议" fontClass="font24"></pangge-Title>
        <div class="container-content-blockRow-block4-body-echats-table">
          <a-table
            :columns="columns"
            :data-source="data"
            bordered
            size="middle"
            :scroll="{ x: 'calc(700px + 50%)', y: 240 }"
          >
          <template #default="{ text: remark }">
            <span>
              a11
            </span>
          </template>
          </a-table>
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
  background-size: 91% 83%;
  /* 设置背景图像的宽度为100px，高度为200px */
  /* 使背景图像居中 */
  background-repeat: no-repeat;
  /* 不重复背景图像 */
  background-position: right center;
}

.container-content-blockRow-block4 {
  width: 100%;
  padding: 49px 155px;
  background-color: #f5f9fc;
  &-body {
    margin-top: 80px;
    &-echats {
      &-Row {
        width: 100%;
        height: 400px;
        margin-top: 25px;
      }
      &-dom {
        width: 75%;
        height: 100%;
        background-color: #e7e7e7;
        &-chart {
          width: 100%;
          height: 100%;
          background-color: #ffffff;
        }
      }
      &-right {
        width: 25%;
        height: 100%;
        background-color: #ffffff;
      }
      &-table {
        margin-top: 25px;
      }
    }
  }
}
</style>
