<script setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Select, SelectOption, Pagination, Popover } from "ant-design-vue";
import * as echarts from 'echarts';
import API from "@/api";

import { LayoutBlockLeft, LayoutBlockRight } from './echarts/index'

const emits = defineEmits([""]);
const router = useRouter();
const current = ref(1);
const total = ref(0);
const props = defineProps({});

const state = reactive({
    nav: [
        {
            img: "home-items-1.png",
            text: "离心风机",
            bg: "/images/离心风机.png",
        },
        {
            img: "home-items-2.png",
            text: "轴流风机",
            bg: "/images/轴流风机.png",
        },
        {
            img: "home-items-3.png",
            text: "鼓风机",
            bg: "/images/鼓风机.png",
        },
    ],
    deviceId: "轴流风机",
    deviceInfoArr: [
        {
            img: "/images/device1.png",

            title: "CT101",
            doc: '℃',
            value: '38.97'
        },
        {
            img: "/images/device2.png",

            title: "CT101",
            doc: 'barg',
            value: '0.01'
        },
        {
            img: "/images/device3.png",

            title: "CT101",
            doc: 'mm/s',
            value: '-0.01'
        },
    ],
    alarmForm: {}
});

const handleDeviceChange = () => { };


onMounted(() => {
  API.getDeviceInfo().then((res) => {
    const data = res.data; //
    total.value = data.length;
    console.log(total.value);
    const pageSize = 3; // 每页大小
    let pages = []; // 存储分页数据的数组

    // 分页逻辑
    for (let i = 0; i < data.length; i += pageSize) {
      pages.push(data.slice(i, i + pageSize));
    }
    if(pages!=[]){
      allDataList.value = pages;
      currentdataList.value = pages[0];
      currentdataList.value.map( item=> {
        API.getDeviceInfoDet(item.Device_Name).then(resp=>{
          var deviceInfoArr = []

          deviceInfoArr.push({
            img: "/images/device1.png",
            title: "风机出口温度",
            doc: '℃',
            value: resp.data[0].Fan_Outlet_Temp1
          });
          deviceInfoArr.push({
            img: "/images/device2.png",
            title: "入口压力",
            doc: 'barg',
            value: resp.data[0].Fan_InletPressure
          });
          deviceInfoArr.push({
            img: "/images/device3.png",
            title: "主电机电流",
            doc: 'A',
            value: resp.data[0].Motor_Icombined
          });
          item.deviceInfoArr = deviceInfoArr
        })
      })
    }

    nextTick(() => {  
      let LayoutBlockLeftDomArr = [];  
      let LayoutBlockRightDomArr = [];  
      state.nav.map((_, index) => {  
        let LayoutBlockLeftDom = echarts.init(  
        document.getElementById(`deviceLeftDom${index + 1}`)  
        );  
        if (LayoutBlockLeftDom) {  
          LayoutBlockLeftDom.setOption(LayoutBlockLeft());  
          LayoutBlockLeftDomArr.push(LayoutBlockLeftDom);  
        }  

        let LayoutBlockRightDom = echarts.init(  
          document.getElementById(`deviceRightDom${index + 1}`)  
        );  
        if (LayoutBlockRightDom) {  
          LayoutBlockRightDom.setOption(LayoutBlockRight());  
          LayoutBlockRightDomArr.push(LayoutBlockRightDom);  
        }  
      });  
  
      // 监听窗口大小变化  
      window.addEventListener("resize", () => {  
        LayoutBlockLeftDomArr.map((block) => {  
          block.resize();  
        });  
        LayoutBlockRightDomArr.map((block) => {  
          block.resize();  
        });  
      });  
    }); 
  });

  
  API.getAlarmCount(new Date()).then(res => {
    state.alarmForm = res.data[0]
  })

})
const currentdataList = ref();
const allDataList = ref();

const changePage = (event) => {
  currentdataList.value = allDataList.value[event-1];
  currentdataList.value.map(item=>{
    API.getDeviceInfoDet(item.Device_Name).then(resp=>{
      item.Outlet_Differential_Pressure = resp.data[0].Outlet_Differential_Pressure;
      item.Fan_Inlet_Temp1 = resp.data[0].Fan_Inlet_Temp1;
    })
  })
};

const handleAclick = (url) => {
    router.push(url)
};

</script>

<template>
  <div class="container">
    <pangge-Header :timeShow="true" :back="true" :navigation="false">
      <template v-slot:header-block>
        <Select ref="select" size="large" v-model:value="state.deviceId" style="width: 209px"
          @change="handleDeviceChange">
          <SelectOption value="轴流风机">轴流风机</SelectOption>
        </Select>
      </template>
    </pangge-Header>
    <div class="container-content">
      <div class="container-content-blockRow">
        <div class="container-content-blockRow-items" v-for="(items, index) in currentdataList">
          <div class="container-content-blockRow-items-header">
            <div class="space-between">
              <div class="container-content-blockRow-items-header-left flex-items">
                  <img src="/images/device-icon.png" />
                  <div>{{ items.Device_Name }}</div>
              </div>
              <div class="container-content-blockRow-items-header-right flex-items">
                  <div></div>
                  <div>当前运行状态：</div>
                  <div>正在运行</div>
              </div>
            </div>
            <div class="container-content-blockRow-items-header-bottom flex-items">
              <div class="container-content-blockRow-items-header-bottom-label">
                  出厂日期
              </div>
              <div class="container-content-blockRow-items-header-bottom-value">
                {{ items.Start_Day }}
              </div>
              <div class="container-content-blockRow-items-header-bottom-label">
                  投入运营时间
              </div>
              <div class="container-content-blockRow-items-header-bottom-value">
                  {{ items.Active_DAY }}
              </div>
            </div>
          </div>
          <div class="container-content-blockRow-items-border"></div>
          <div class="container-content-blockRow-items-content flex-items">
            <div class="container-content-blockRow-items-content-echats">
              <pangge-Title text="综合评价"></pangge-Title>
              <div class="echats-doms" :id="`deviceLeftDom${index + 1}`"></div>
            </div>
            <div class="container-content-blockRow-items-content-echats">
              <pangge-Title text="运行历史状态"></pangge-Title>
              <div class="echats-doms" :id="`deviceRightDom${index + 1}`"></div>
            </div>
            <div class="container-content-blockRow-items-content-conuts flex-items">
              <div class="flex-items font14 colorC">
                  <div></div>故障信息的总和 <span>{{ state.alarmForm.alarmCount }}</span>
              </div>
              <div class="flex-items font14 colorC">
                  <div></div>告警信息的总和 <span>{{ state.alarmForm.faultCount }}</span>
              </div>
            </div>
          </div>
          <div class="container-content-blockRow-items-device">
              <pangge-Title text="运行数据"></pangge-Title>
              <div class="container-content-blockRow-items-device-body space-between">
                  <div class="container-content-blockRow-items-device-body-model">
                      <img src="/images/轴流风机.png" style="width: 90%;height: 100%;" />
                      <div v-for="(item, index) in items.deviceInfoArr"
                          class="container-content-blockRow-items-device-body-model-block"
                          :class="`device${index + 1}`">
                          <div
                              class="container-content-blockRow-items-device-body-model-block-title space-center">
                              <div>{{ item.title }}</div>
                              <!-- <div>{{ items.Fan_Inlet_Temp1 }}</div> -->
                          </div>
                          <div
                              class="container-content-blockRow-items-device-body-model-block-bottom flex-items">
                              <img :src="item.img" />
                              <div>{{ item.value ? parseFloat(item.value).toFixed(2) : 0 }}</div>
                              <div></div>
                          </div>

                      </div>
                  </div>
                  <div class="container-content-blockRow-items-device-body-schedule">
                      <div
                          v-for="items in [1, 2, 3, 4, 5, 6, 8, 9, 10, 1, 2, 3, 4, 5, 6, 8, 9, 10, 1, 2, 3, 4] ">
                      </div>
                  </div>
              </div>
          </div>
          <div class="container-content-blockRow-items-footer flex-items">
            <div class="container-content-blockRow-items-footer-f1 pointer">
              <img @click="handleAclick('/vibration')" src="/images/f1.png" />
              <div>振动分析与异常检测</div>
            </div>
            <div class="container-content-blockRow-items-footer-border"></div>
            <div class="container-content-blockRow-items-footer-f2 pointer">
              <img  @click="handleAclick('/prediction')" src="/images/f2.png" />
              <div>失速预测与分析</div>
            </div>
            <div class="container-content-blockRow-items-footer-border"></div>
            <div class="container-content-blockRow-items-footer-f3 pointer">
              <img  @click="handleAclick('/preventive')" src="/images/f3.png" />
              <div>预防性维护</div>
            </div>
            <div class="container-content-blockRow-items-footer-border"></div>
            <Popover :title="null">
              <template #content>
                  <p style="cursor:pointer;" @click="handleAclick('/equipment')">设备概述</p>
                  <p style="cursor:pointer;" @click="handleAclick('/availability')">可用性分析</p>
                  <p style="cursor:pointer;" @click="handleAclick('/energy')">能耗分析</p>
                  <p style="cursor:pointer;" @click="handleAclick('/analysis')">报告汇总</p>
                  <p style="cursor:pointer;" @click="handleAclick('/help')">帮助</p>
              </template>
              <div class="container-content-blockRow-items-footer-f4 pointer">
                  <img src="/images/f4.png" />
                  <div>更多</div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
      <div class="container-content-footer flex-center">
        <Pagination v-model:current="current" :total="50" show-less-items size="default" />
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
            padding: 0 30px;
            width: 100%;
            flex: 1;

            &-items {
                width: 600px;
                // height: 100%;
                background: #ffffff;
                box-shadow: 0 0 20px 0 rgba(34, 88, 118, 0.29);
                border-radius: 0 0 11px 11px;
                border-top: 6px solid #4dbfff;
                padding: 20px;
                padding-bottom: 0;
                display: flex;
                flex-direction: column;

                &-header {
                    &-left {
                        img {
                            width: 40px;
                            height: 40px;
                        }

                        &>div {
                            font-weight: bold;
                            font-size: 26px;
                            color: #2c3133;
                        }
                    }

                    &-right {
                        background: rgba(21, 183, 154, 0.06);
                        border-radius: 14px;
                        border: 1px solid #15b79a;
                        font-weight: 400;
                        font-size: 14px;
                        padding: 14px 11px;
                        // width: 214px;
                        // height: 37px;
                        border-radius: 30px;

                        &>div:nth-child(1) {
                            width: 16px;
                            height: 16px;
                            background: rgba(21, 183, 154, 0.29);
                            border-radius: 16px;
                        }

                        &>div:nth-child(2) {
                            margin: 0 8px;
                            color: #708188;
                        }

                        &>div:nth-child(3) {
                            color: #15b79a;
                            font-weight: bold;
                        }
                    }

                    &-bottom {
                        font-size: 16px;
                        margin-top: 14px;

                        &-label {
                            padding: 6px 10px;
                            background: #f2f6f9;
                            border-radius: 4px 4px 4px 4px;
                            color: #708188;
                        }

                        &-value {
                            font-size: 16px;
                            color: #2c3133;
                            margin-left: 20px;
                            margin-right: 28px;
                        }
                    }
                }

                &-border {
                    width: 100%;
                    border-top: 1px dashed #c6d3d8;
                    margin: 20px 0;
                }

                &-content {
                    position: relative;

                    &-conuts {
                        position: absolute;
                        bottom: -16px;
                        right: 0;

                        &>div {
                            margin-right: 16px;
                        }

                        &>div:nth-child(1)>div {
                            width: 6px;
                            height: 6px;
                            background: #F64D3E;
                            margin-right: 14px;
                        }

                        &>div:nth-child(2)>div {
                            width: 6px;
                            height: 6px;
                            background: #FFBF00;
                            margin-right: 14px;
                        }

                        span {
                            margin-left: 8px;
                        }
                    }

                    &-echats:nth-child(1) {
                        width: 60%;
                    }

                    &-echats:nth-child(2) {
                        width: 40%;
                    }

                    &-echats {
                        height: 182px;

                        display: flex;
                        flex-direction: column;
                        // background-color: #f2f6f9;
                        // border: 1px solid red;
                    }

                    .echats-doms {
                        flex: 1;
                    }
                }

                &-device {
                    width: 100%;
                    flex: 1;

                    // background-color: #f2f6f9;
                    &-body {
                        margin-top: 12px;
                        width: 100%;
                        height: 80%;
                        border-radius: 6px 6px 6px 6px;

                        &-model {
                            background: rgba(169, 181, 188, 0.08);
                            border: 1px solid #d1e1ea;
                            flex: 1;
                            position: relative;

                            .device1 {
                                top: 6%;
                                right: 3%;
                            }

                            .device2 {
                                left: 3%;
                                bottom: 6%;
                            }

                            .device3 {
                                bottom: 10%;
                                right: 3%;
                            }

                            &-block {
                                width: 135px;
                                height: 69px;
                                background: rgba(255, 255, 255, 0.78);
                                box-shadow: 0px 2px 10px 0px rgba(72, 111, 133, 0.13);
                                border-radius: 10px 10px 10px 10px;
                                position: absolute;

                                padding: 10px;

                                &-title {
                                    margin-bottom: 8px;

                                    &>div:nth-child(1) {
                                        font-weight: bold;
                                        font-size: 12px;
                                        color: #2E383D;
                                    }

                                    &>div:nth-child(2) {
                                        font-weight: 400;
                                        font-size: 12px;
                                        color: #909CA1;
                                    }
                                }

                                &-bottom {
                                    img {
                                        width: 18px;
                                        height: 18px;
                                        margin-right: 5px
                                    }

                                    &>div:nth-child(2) {
                                        font-weight: bold;
                                        font-size: 12px;
                                        color: #0087D3;
                                        width: 69px;
                                        height: 26px;
                                        background: rgba(255, 255, 255, 0.78);
                                        box-shadow: 0px 2px 10px 0px rgba(72, 111, 133, 0.13);
                                        border-radius: 10px 0px 0px 10px;
                                        padding: 6px;
                                    }

                                    &>div:nth-child(3) {
                                        width: 23px;
                                        height: 26px;
                                        background: #0087D3;
                                        border-radius: 0 10px 10px 0;
                                    }
                                }
                            }
                        }

                        &-schedule {
                            width: 40px;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;

                            div {
                                width: 20px;
                                height: 6px;
                                background: #FCBF23;
                                border-radius: 0px 0px 0px 0px;
                                margin-bottom: 4px;
                            }
                        }
                    }
                }

                &-footer {
                    width: calc(100% + 40px);
                    height: 85px;
                    background: rgba(134, 189, 220, 0.1);
                    border-radius: 0px 0px 11px 11px;
                    text-align: center;
                    margin-left: -20px;
                    font-size: 14px;
                    color: #0087d3;

                    img {
                        width: 22px;
                        height: 22px;
                        margin-bottom: 10px;
                    }

                    &-f1 {
                        width: 185px;
                    }

                    &-f2 {
                        width: 176px;
                    }

                    &-f3 {
                        width: 148px;
                    }

                    &-f4 {
                        width: 91px;
                    }

                    &-border {
                        width: 0px;
                        height: 22px;
                        border-left: 1px solid rgba(23, 84, 118, 0.42);
                    }
                }
            }
        }

        &-footer {
            width: 100%;
            height: 11.8%;
        }
    }
}
</style>
