<template>
  <div style="height: calc(100% - 35px)" class="relative">
    <div class="absolute z-10 right-6 text-[14px]">
      设备：
      <a-select
        v-model:value="valueLine"
        :size="'small'"
        style="width: 100px"
        :options="deviceInfoOp"
      ></a-select>
    </div>
    <Line :option="option" ref="echartComponent" />
  </div>
  <div class="h-[35px]">
    <Bar :option="optionBar" ref="echartComponentBar" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "../echarts/line.vue";
import Bar from "@/views/equipment-analysis/echarts/bar.vue";
import API from "@/api_v2";
import { merge } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
import * as echarts from "echarts";
const echartComponent = ref(null);
const echartComponentBar = ref(null);
//趋势参考线心目一点颜色
let valueLine = ref();
let option = ref({
  color: ["#5470c6", "rgba(255, 255, 0, 0.7)"],
  title: {
    show: false,
    text: "阻力性能退化风险趋势",
    left: "8%",
    textStyle: {
      fontSize: 14, // 设置字体大小为 14px
    },
  },
  grid: {
    show: false, // 启用背景
    backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      // 上到下的渐变
      { offset: 0, color: "rgba(255, 0, 0, 0.7)" }, // 渐变起始色
      { offset: 0.5, color: "rgba(255, 255, 0, 0.7)" }, // 渐变起始色
      { offset: 1, color: "rgba(0, 128, 0, 0.7)" }, // 渐变结束色
    ]),
    borderWidth: 0,
    left: "160px",
    right: "6%",
    top: "12%",
    bottom: "20%",
  },
  legend: [
  {
      left: "1%", // 将图例放在左侧
      top: "50px",
      orient: "vertical", // 设置图例垂直排列
      icon: "rect", // 使用矩形代替默认图标
      itemWidth: 20, // 横线的宽度
      itemHeight: 2, // 横线的高度
      data: ["堵灰趋势", "趋势参考线"],
    },
    {
      left: "1%", // 将图例放在左侧
      top: "90px",
      orient: "vertical", // 设置图例垂直排列
      icon: "rect", // 使用矩形代替默认图标
      itemWidth: 20, // 横线的宽度
      itemHeight: 10, // 横线的高度
      data: ["性能正常", "告警基准线", "堵灰风险"],
      selectedMode: false, //
    },
    
  ],
  dataZoom: [
    {
      type: "slider",
      start: 80,
      end: 100,
    },
  ],
  xAxis: [
    {
      type: "category",
      // axisLabel: {
      //   formatter: "{yyyy}-{MM}-{dd}",
      // },
    },
  ],
  yAxis: [
    {
      // name: "堵灰风险趋势",
      type: "value",
      axisLabel: {
        show: false, // 隐藏刻度文字
      },
      splitLine: {
        show: false, // 设置为 false，隐藏横向网格线
      },
    },
  ],
  series: [],
});
let optionBar = ref({
  yAxis: {
    type: "category",
    show: false,
  },
  xAxis: {
    type: "value",
    show: false,
  },
  grid: {
    left: "160px", // 10% of the container's width from the left side
    right: "6%", // 10% of the container's width from the right side
    top: "1%", // 20% of the container's height from the top
    bottom: "0%", // 15% of the container's height from the bottom
  },
  series: [],
});

let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
//一年数据轮询6
const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceDegradation",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2012-06-01T20:55:00+08:00",
    timeEnd: "2012-08-01T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    const chartInstance = echartComponent.value.getChartInstance();
    chartInstance.setOption(
      merge(option.value, {
        xAxis: [
          {
            type: "category",
            data: res.data.map((item) => dayjs(item.timestamp).format("YYYY-MM-DD")),
          },
        ],
        series: [
          {
            name: "堵灰趋势",
            type: "line",
            symbol: "none",
            data: res.data.map((item) => {
              return item.KPI_CV;
            }),
          },
          {
            name: "趋势参考线",
            type: "line",
            symbol: "none",
            data: res.data.map((item) => {
              return item.RMSE;
            }),
          },
          {
            name: '性能正常',
            data: [],
            type: 'line',  // 或者其他类型，随意设置
            silent: true, // 使得此系列不显示实际图形
            itemStyle: {
              color: '#09ae3a',  // 设置 Bar Group 1 的颜色
            },
          },

          {
            name: '告警基准线',
            data: [],
            type: 'line',  // 或者其他类型，随意设置
            silent: true, // 使得此系列不显示实际图形
            itemStyle: {
              color: '#ffed00',  // 设置 Bar Group 1 的颜色
            },
          },

          {
            name: '堵灰风险',
            data: [],
            type: 'line',  // 或者其他类型，随意设置
            silent: true, // 使得此系列不显示实际图形
            itemStyle: {
              color: '#ab0404',  // 设置 Bar Group 1 的颜色
            },
          },
        ],
      })
    );
    const chartInstanceBar = echartComponentBar.value.getChartInstance();
    chartInstanceBar.setOption(
      merge(optionBar.value, {
        xAxis: {
          max: res.data.reduce((pre, item) => pre + 1, 0),
        },
        series: res.data.map((item) => {
          let colors = [
            "#e5e7eb",
            "rgba(0, 128, 0, 0.7)",
            "rgba(255, 255, 0, 0.7)",
            "rgba(255, 0, 0, 0.7)",
          ];
          let index = 0;
          if (item.KPI_CV > item.H_DV) {
            index = 3;
          } else if (item.KPI_CV > item.SP_DV) {
            index = 2;
          } else if (item.KPI_CV > 0) {
            index = 1;
          } else if (item.KPI_CV == 0) {
            index = 0;
          }
          let color = colors[index];
          return {
            type: "bar",
            barWidth: 20,
            stack: "total",
            data: [1],
            itemStyle: {
              color,
              // emphasis: {
              //   color: "inherit", // 禁用鼠标悬停时的颜色变化
              //   opacity: 1, // 禁用鼠标悬停时的透明度变化
              //   shadowBlur: 0, // 禁用鼠标悬停时的阴影效果
              //   shadowOffsetX: 0, // 禁用鼠标悬停时的阴影X偏移
              //   shadowOffsetY: 0, // 禁用鼠标悬停时的阴影Y偏移
              // },
            },
          };
        }),
      })
    );
  });
};
watch(valueLine, (data) => {
  getDeviceAV(data);
});
onMounted(() => {
  // getDeviceAV();
});
</script>
