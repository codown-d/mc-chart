<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Select, SelectOption, Pagination } from "ant-design-vue";
import * as echarts from 'echarts';
import 'echarts-gl'
import DeviceInfo from "@/components/deviceInfo.vue";
import ExpertAdvice from "@/components/expertAdvice.vue";
import { LayoutRightDom } from './echarts/index'
import API from "@/api";

import RightDom from './rightDom.vue'
import LeftBottomDom from './leftBottomDom.vue'
import RightBottomDom from './rightBottomDom.vue'
import dayjs from "dayjs";
const router = useRouter();
const route = useRoute();

const state = reactive({
  deviceName: "",
  deviceId: "1",
  deviceType: route.params.deviceType,
  msg: "",
  nav: [
    { img: "home-items-1.png", text: "离心风机" },
    { img: "home-items-2.png", text: "轴流风机" },
    { img: "home-items-3.png", text: "鼓风机"  }
  ],
});


const handleDeviceChange = () => { };

// 挂载后初始化图表
onMounted(() => {
  if (state.deviceType === '0') {
    state.deviceName = 'Centrifugal Fan' + state.deviceId;
  } else if (state.deviceType === '1') {
    state.deviceName = 'VPA' + state.deviceId;
  } else {
    state.deviceName = 'SG' + state.deviceId;
  }
  var params = {
    dataType: "DeviceLSTM",
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
    if (data.ab_proportion < 0.3) {
      state.msg = "设备运行正常，振动没有异常趋势<br>说明:异常振动，会加速轴承/叶片的寿命衰减。<br>异常振动，可能由裂纹，积灰，底座不平衡等异常现象引起，这些都是异常诊断的关键依据请持续关注页面分析结果。";
    } else if (data.ab_proportion > 0.3 && data.ab_proportion < 0.6) {
      state.msg = "振动趋势异常，最近3周内，振动有增加趋势，请持续关注异常检测页面。";
    } else if (data.ab_proportion > 0.6) {
      state.msg = "振动趋势异常，请关注轴承温度，该设备有积灰趋势，同时请检查轴承是否出现裂纹，并联系豪顿工程师。";
    }
  })

})

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
          <DeviceInfo :title="state.deviceName" production="2023-08-01" operate="2023-08-01" />
          <ExpertAdvice :text1="dayjs().format('YYYY-MM-DD HH:mm:ss') " text2="" :text3="state.msg"
            text4="请关注预测性维护页面，及时安排叶片检修" />
        </div>

        <div class="container-content-blockRow-right">
          <div class="container-content-blockRow-right-block1 padding20" style="padding-bottom: 0;">
            <pangge-Title text="振动监测"></pangge-Title>
            <RightDom />
          </div>
          <div class="container-content-blockRow-right-block2 flex">
            <div class="container-content-blockRow-right-block2-left padding20" style="padding-bottom: 0;">
              <pangge-Title text="异常监测"></pangge-Title>
              <LeftBottomDom />
            </div>
            <div class="container-content-blockRow-right-block2-right padding20" style="padding-bottom: 0;">
              <pangge-Title text="振动健康因子趋势"></pangge-Title>
              <RightBottomDom />
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
            height: 62%;
            background: #FFFFFF;

            &-dom {
              width: 100%;
              height: 100%
            }
          }

          &-block2 {
            width: 100%;
            height: 35.5%;
            // margin-top: 24px;

            &-left {
              width: 50%;
              height: 100%;
              background: #FFFFFF;
              margin-right: 24px;

              &-dom {
                width: 100%;
                height: 90%
              }
            }

            &-right {
              width: 50%;
              height: 100%;
              background: #FFFFFF;
            }
          }
        }
      }

    }
  }
</style>
