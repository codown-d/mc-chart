<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Select, SelectOption, Pagination, DatePicker } from "ant-design-vue";
import * as echarts from "echarts";
import ChartComponent from "./ChartComponent.vue";
import GaugeComponent from "./GaugeComponent.vue";
import LineComponent from "./LineComponent.vue";
import MixtureComponent from "./MixtureComponent.vue";
import MultiLineComponent from "./MultiLineComponent.vue";
import AnnularComponent from "./AnnularComponent.vue";

import { LayoutBlockCenter, LayoutBlockLef } from "./echarts/index";
import API from "@/api";
const emits = defineEmits([""]);

const props = defineProps({});

const state = reactive({
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机" },
  ],
  deviceId: "轴流风机",
  infoArr: [
    {
      img: "/images/conUp_icon.png",
      tlval: "2.45",
      util: "kwh",
      value: "当日用电量",
      rate: "12%",
      isFlag: true,
    },
    {
      img: "/images/conDown_icon.png",
      tlval: "120.23",
      util: "kwh",
      value: "当月用电量",
      rate: "12%",
      isFlag: false,
      isAlarm: true,
    },
    {
      img: "/images/conUp_icon.png",
      tlval: "986.45",
      util: "kwh",
      value: "当年用电量",
      rate: "12%",
      isFlag: false,
    },
    {
      img: "/images/conUp_icon.png",
      tlval: "0",
      util: "t",
      value: "当日用水量",
      rate: "0%",
      isFlag: true,
    },
    {
      img: "/images/conDown_icon.png",
      tlval: "0",
      util: "t",
      value: "当月用水量",
      rate: "0%",
      isFlag: false,
      isAlarm: true,
    },
    {
      img: "/images/conUp_icon.png",
      tlval: "986.45",
      util: "%",
      value: "当年用水量",
      rate: "0%",
      isFlag: true,
    },
  ],
  paramArr: [
    {
      name: "数值名称",
      color: "#0087D3",
      val: "76.55 %",
      isRightFlag: false,
      top: "10vw",
      left: "38vw",
    },
    {
      name: "数值名称",
      color: "red",
      isRightFlag: true,
      val: "76.55 %",
      top: "10vw",
      left: "58vw",
    },
  ],
  dayQoqFrom: [],
  avQoqFrom: [],
  avForm: [],
  avData: [],
  legends: [
    "设备运行时间（小时）的总结",
    "设备停机时间（小时）的总结",
    "设备运行状态未知（小时）的总结",
    "设备停机次数的总和",
  ],
});

onMounted(() => {
  const deviceName = "GFJ1";
  API.getEquByName(deviceName).then((res) => {
    state.deviceInfo = res.data;
  });
  var legends = [];
  API.getAvList(deviceName).then((res) => {
    state.avData = res.data[0].avList;
    state.avForm = res.data[1];
    state.avQoqFrom = res.data[2];
    state.dayQoqFrom = res.data[3];

    // 设备离线时间
    var officelineTime = state.avData.map((avoffline) =>
      parseFloat(avoffline.periodOfflineTime).toFixed(8)
    );

    // 可用性图表
    var serialData = [];
    serialData.push({
      name: "设备运行状态未知（小时）的总结",
      type: "bar",
      barWidth: "100%", // 设置合适的宽度，与上面一致
      overlap: true,
      barGap: "-100%",
      data: officelineTime,
      yAxisIndex: 1,
      color: "#ffffff",
      itemStyle: {
        borderWidth: 1,
        borderColor: "#000000",
      },
    });

    // 设备离线时间
    var stopTime = state.avData.map((avoffline) =>
      parseFloat(avoffline.periodStopTime).toFixed(8)
    );
    serialData.push({
      name: "设备停机时间（小时）的总结",
      type: "bar",
      barWidth: "100%", // 设置合适的宽度，与上面一致
      // overlap: true,
      barGap: "-100%",
      data: stopTime,
      yAxisIndex: 1,
      color: "#FF2700",
      itemStyle: {
        borderWidth: 1,
        borderColor: "#000000",
      },
    });

    // 设备运行时间（小时）的总结
    var runTime = state.avData.map((avoffline) =>
      parseFloat(avoffline.periodRunTime).toFixed(8)
    );
    serialData.push({
      name: "设备运行时间（小时）的总结",
      type: "bar",
      barWidth: "100%", // 设置合适的宽度，与上面一致
      overlap: true,
      data: runTime,
      yAxisIndex: 0,
      color: "#00FF2A",
      itemStyle: {
        borderWidth: 1,
        borderColor: "#000000",
      },
    });

    // 设备离线时间
    var stopCnt = state.avData.map((avoffline) => avoffline.stopindex);
    serialData.push({
      name: "设备停机次数的总和",
      type: "line",
      data: stopCnt,
      yAxisIndex: 1,
      itemStyle: {
        color: "#0047FF",
      },
    });

    // let LayoutBlockLeftDom = echarts.init(
      // document.getElementById("LayoutBlockLeftDom")
    // );
    // var option = LayoutBlockLef(state.legends, serialData, state.dayQoqFrom);
    // LayoutBlockLeftDom.setOption(option);

    // let EchartsQue2 = echarts.init(document.getElementById('EchartsQue2'));
    // var option = LayoutBlockCenter();
    // EchartsQue2.setOption(option);

    // window.addEventListener("resize", () => {
      // EchartsQue2.resize();
      // LayoutBlockLeftDom.resize();
    // });

    // var datasource = []
    // datasource.push(
    //   {
    //     name: '停机时间',
    //     value: parseFloat(state.avQoqFrom.停机时间).toFixed(2)
    //   },
    //   {
    //     name: '未知状态时间',
    //     value: parseFloat(state.avQoqFrom.未知状态时间).toFixed(2)
    //   },
    //   {
    //     name: '运行时间',
    //     value: parseFloat(state.avQoqFrom.运行时间).toFixed(2)
    //   }
    // )
    // let LayoutBlockRightDom = echarts.init(document.getElementById('LayoutBlockRightDom'));
    // LayoutBlockRightDom.setOption(LayoutBlockRight(datasource));
  });
});

const handleDeviceChange = () => {};
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
          <div class="container-content-blockRow-left-block1">
            <div
              class="circle"
              :style="{ background: info.isFlag ? 'rgba(0,135,211,0.06)' : '' }"
              v-for="info in state.infoArr"
            >
              <div style="display: flex">
                <div
                  class="circle-topFont"
                  :style="{ color: info.isFlag ? '#0087D3' : '#2C3133' }"
                >
                  {{ info.tlval }}
                </div>
                <div class="circle-unit">{{ info.util }}</div>
              </div>
              <div style="display: flex">
                <div class="circle-downFont">{{ info.value }}</div>
                <div
                  class="circle-value"
                  :style="{ color: info.isAlarm ? '#F64D3E' : '#15B79A' }"
                >
                  <img style="width: 10px; height: 10px" :src="info.img" />
                  {{ info.rate }}
                </div>
              </div>
            </div>
          </div>
          <div class="container-content-blockRow-left-block2 paddingTop10">
            <img class="left-img" src="/images/bg.jpg" />
            <div
              class="tap-container"
              :style="{ top: param.top, left: param.left }"
              v-for="param in state.paramArr"
            >
              <div class="tap-container-box" v-if="!param.isRightFlag">
                <div class="tap-container-title">{{ param.name }}</div>
                <div
                  class="color-box"
                  :style="{ backgroundColor: param.color }"
                ></div>
              </div>
              <div class="tap-container-box" v-if="param.isRightFlag">
                <div
                  class="color-box"
                  :style="{ backgroundColor: param.color }"
                ></div>
                <div class="tap-container-title">{{ param.name }}</div>
              </div>
              <div class="tap-container-font">{{ param.val }}</div>
            </div>
            <div class="tap-echarts"><gauge-component /></div>
            <div class="tap-bottom">
              <div class="tap-bottom-top">
                <div class="tap-bottom-top-echarts"><annular-component/></div>
                <div class="tap-bottom-top-left">
                  <div class="text">
                    <div class="text-top">当日用电量</div>
                    <div class="text-bottom">2.34kwh</div>
                  </div>
                </div>
                <div class="tap-bottom-top-right">
                  <div class="text">
                    <div class="text-top">昨日用电量</div>
                    <div class="text-bottom">2.34kwh</div>
                  </div>
                </div>
              </div>
              <div class="tap-bottom-bottom">
                <div class="tap-bottom-bottom-left">
                  <div class="image"></div>
                  <div class="text">
                    <div class="text-top">12</div>
                    <div class="text-bottom">设备停机累计次数</div>
                  </div>
                </div>
                <div class="tap-bottom-bottom-right">
                  <div class="image"></div>
                  <div class="text">
                    <div class="text-top">12</div>
                    <div class="text-bottom">设备停机累计次数</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div id="EchartsQue2" style="position: absolute; width: 200px; height: 200px;"></div> -->
          </div>
          <div class="container-content-blockRow-left-block3 padding20 block3">
            <pangge-Title text="设备运行情况"></pangge-Title>
            <div
              id="LayoutBlockLeftDom"
              class="container-content-blockRow-left-block3-echarts block3-echarts"
            >
              <chart-component />
            </div>
          </div>
        </div>
        <div class="container-content-blockRow-right">
          <div
            class="container-content-blockRow-right-block1 padding20 content"
          >
            <pangge-Title text="设备运行时间"></pangge-Title>

            <DatePicker style="width: 170px; position: absolute; right: 10px" />
            <div class="content-div">
              <div class="content-div-left">
                <div class="content-div-left-top">
                  <div class="number">
                    225 <span style="color: #ccc; font-size: 14px">WH</span>
                  </div>
                  <div class="text">当日用电量峰值</div>
                </div>
                <div class="content-div-left-bottom">
                  <div class="number">
                    2.45<span style="color: #ccc; font-size: 14px">WH</span>
                  </div>
                  <div class="text">当日总用电量</div>
                </div>
              </div>
              <div class="content-div-right">
                <line-component />
              </div>
            </div>
          </div>
          <div
            class="container-content-blockRow-right-block2 padding20 content"
          >
            <pangge-Title text="历史用电趋势"></pangge-Title>
            <div class="content-div">
              <div class="content-div-left">
                <div class="content-div-left-top">
                  <div class="number">
                    2.89 <span style="color: #ccc; font-size: 14px">KWH</span>
                  </div>
                  <div class="text">当前用电量最大值</div>
                </div>
                <div class="content-div-left-bottom">
                  <div class="number">
                    300<span style="color: #ccc; font-size: 14px">WH</span>
                  </div>
                  <div class="text">当然用电峰值最大值</div>
                </div>
              </div>
              <div class="content-div-right">
                <mixture-component />
              </div>
            </div>
          </div>
          <div
            class="container-content-blockRow-right-block3 padding20 content"
          >
            <pangge-Title text="数据图名称"></pangge-Title>
            <div class="content-div">
              <multi-line-component />
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
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 24px;

        // 能源图横条样式
        &-block1 {
          width: 100%;
          height: 13%;
          background: #ffffff;
          display: flex;
        }

        &-block2 {
          width: 100%;
          height: 50%;
          background: #ffffff;
          margin: 24px 0;
        }

        &-block3 {
          width: 100%;
          height: 37%;
          background: #ffffff;

          &-charts {
            width: 100%;
            height: 200px;
          }
        }
      }

      &-right {
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;

        &-block1 {
          background: #ffffff;
          width: 100%;
          height: 36%;
        }

        &-block2 {
          background: #ffffff;
          width: 100%;
          height: 32%;
          margin: 24px 0;
        }

        &-block3 {
          background: #ffffff;
          width: 100%;
          height: 31%;
        }
      }
    }
  }

  .block3 {
    display: flex;
    flex-direction: column;

    .block3-echarts {
      flex: 1;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  position: relative;

  .content-div {
    flex: 1;
    display: flex;

    .content-div-left {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;

      .content-div-left-top {
        border-bottom: 1px dashed #ccc;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .number {
          color: #0388d3;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
        }
      }

      .content-div-left-bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .number {
          color: #000;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
        }
      }
    }

    .content-div-right {
      height: 100%;
      flex: 2;
      position: relative;
    }
  }
}

// 四方形圈样式
.circle {
  width: 197px;
  height: 83px;
  margin: 10px;
  border-radius: 20px 20px 20px 20px;

  &-unit {
    margin-top: 20px;
    margin-left: 10px;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    font-size: 13px;
    color: #6b767b;
    line-height: 15px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  &-topFont {
    margin-top: 10px;
    margin-left: 20px;
    font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
    font-weight: bold;
    font-size: 28px;
    line-height: 33px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  &-downFont {
    margin-top: 10px;
    margin-left: 20px;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  &-value {
    margin-top: 10px;
    margin-left: 10px;
    font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

// 图片
.left-img {
  padding: 10px;
  width: 670px;
  height: 370px;
  border-radius: 20px 20px 20px 20px;
}

.tap-container {
  position: absolute;

  &-title {
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    font-size: 12px;
    color: #6b767b;
    line-height: 14px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  &-font {
    padding-top: 5px;
    font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
    font-weight: bold;
    font-size: 16px;
    color: #2c3133;
    line-height: 19px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  &-box {
    display: flex;
    gap: 10px;
  }

  // 四方格子
  .color-box {
    width: 10px;
    height: 10px;
    margin-top: 2px;
  }
}

.tap-echarts {
  position: absolute;
  top: 8vw;
  left: 42vw;
  height: 16vh;
  width: 15.5vw;
}
.tap-bottom {
  position: absolute;
  top: 17vw;
  left: 37vw;
  height: 17vh;
  width: 26.5vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .tap-bottom-top {
    position: relative;
    flex: 1;
    background: #f8f8fa;
    border-radius: 10px;
    align-items: center;
    padding: 0 10px;
    display: flex;
    padding: 0 30px;
    .tap-bottom-top-echarts{
      width: 120px; height: 100%;
      border-radius:120px ;
      background: #fff;
 position: absolute; left: 50%; top: 50%;
 transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */

    }
    .tap-bottom-top-left {
      flex: 1;
      .text {
        flex: 1;
        height: 55%;
        padding-left: 10px;

        .text-top {
          font-size: 15px;
          font-weight: 700;
          color: #767171;
          margin-bottom: 8px;
        }
        .text-bottom {
          color: #0e8dd5;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
    .tap-bottom-top-right {
      flex: 1;
      .text {
        flex: 1;
        height: 55%;
        padding-left: 10px;
        .text-top {
          font-size: 15px;
          font-weight: 700;
          color: #767171;
          margin-bottom: 8px;
        text-align: right;
        }
        .text-bottom {
          color: #000;
          font-size: 18px;
          font-weight: 700;
          text-align: right;
        }
      }
    }
  }
  .tap-bottom-bottom {
    flex: 1;

    display: flex;
    gap: 10px;
    .tap-bottom-bottom-left {
      background: #f2f9fd;
      border-radius: 10px;
      align-items: center;
      padding: 0 10px;
      display: flex;
      flex: 1;
    }
    .image {
      width: 40px;

      height: 40px;
      background-image: url("/images/detach/停机服务器 1.png");
      background-size: 100% 100%;
    }
    .text {
      flex: 1;
      height: 55%;
      padding-left: 10px;

      .text-top {
        font-size: 20px;
        font-weight: 700;
        color: #000;
        margin-bottom: 8px;
      }
      .text-bottom {
        color: #ccc;
      }
    }
    .tap-bottom-bottom-right {
      align-items: center;
      display: flex;
      flex: 1;
      background: #fff6f5;
      border-radius: 10px;
      align-items: center;
      padding: 0 10px;
      display: flex;
      flex: 1;
    }
  }
}
</style>
