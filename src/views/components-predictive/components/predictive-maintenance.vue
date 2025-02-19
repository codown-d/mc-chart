<template>
  <div style="height: calc(100%)" class="relative flex">
    <Line :option="option" ref="echartComponent" />
  </div>
  <div class="h-[35px]" v-show="false">
    <Bar :option="optionBar" ref="echartComponentBar" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from "vue";
import Line from "@/views/blocking-analysis/echarts/line.vue";
import Bar from "@/views/equipment-analysis/echarts/bar.vue";
import API from "@/api_v2";
import { merge } from "lodash";
import { useDeviceInfo } from "@/hook/useDeviceInfo";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { generateData, sampleByPercentage } from "@/utils";
const echartComponent = ref(null);
const echartComponentBar = ref(null);
let valueLine = ref();
let option = ref({
  title: {
    show: false,
    text: "阻力性能退化风险趋势",
    left: "8%",
    textStyle: {
      fontSize: 14, // 设置字体大小为 14px
    },
  },
  grid: {
    show: true, // 启用背景
    backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      // 上到下的渐变
      { offset: 1, color: "rgba(255, 0, 0, 0.1)" }, // 渐变起始色
      { offset: 0.5, color: "rgba(255, 255, 0, 0.1)" }, // 渐变起始色
      { offset: 0, color: "rgba(0, 128, 0, 0.1)" }, // 渐变结束色
    ]),
    borderWidth: 0,
    left: "160px",
    right: "0%",
    top: "10%",
    bottom: "2%",
  },
  visualMap: {
    seriesIndex: [1],
    show: false,
    pieces: [
      {
        gt: 0,
        lte: 0.15,
        color: '#ab0404'
      },
      {
        gt: 0.15,
        lte: 0.25,
        color: '#ffed00'
      },
      {
        gt: 0.25,
        lte: 1,
        color: '#09ae3a'
      },
    ],
    outOfRange: {
      color: '#999'
    }
  },
  legend: [
    {
      left: "1%", // 将图例放在左侧
      top: "55px",
      orient: "vertical", // 设置图例垂直排列
      icon: "rect", // 使用矩形代替默认图标
      itemWidth: 20, // 横线的宽度
      itemHeight: 2, // 横线的高度
      data: ["参考衰减趋势", "实际衰减趋势"],
    }
  ],
  xAxis: [
    {
      type: "time",
      boundaryGap: false,
      show: false,
      position: "top", // x 轴放到顶部
    },
  ],
  yAxis: [
    {
      // name: "yAxis-name",
      type: "value",
      // inverse: true,
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
  legend: {
    show: false,
  },
  grid: {
    left: "160px", // 10% of the container's width from the left side
    right: "4%", // 10% of the container's width from the right side
    top: "1%", // 20% of the container's height from the top
    bottom: "0%", // 15% of the container's height from the bottom
  },
  series: [],
});

let { deviceInfoOp } = useDeviceInfo();
watch(deviceInfoOp, (data) => {
  valueLine.value = data[0].value;
});
const getDeviceAV = (deviceName) => {
  var params = {
    deviceName,
    dataType: "DeviceCBM",
    // timeFrom:  dayjs().subtract(60, 'day'),
    // timeEnd: dayjs(),
    timeFrom: "2021-06-14T00:00:00+08:00",
    timeEnd: "2021-07-22T00:00:00+08:00",
  };
  API.getData(params).then((res) => {
    console.log(res);
    const chartInstance = echartComponent.value.getChartInstance();
    let data = res.data;
    let lastNode = data.at(-1)
    let last = lastNode.timestamp;
    let startT = dayjs(data[0].timestamp).valueOf();
    let endT = dayjs(lastNode.timestamp).add(30, 'day').valueOf();
    // let endT = dayjs(lastNode.Max_date).valueOf();
    let midT = dayjs((startT + endT) / 2).valueOf();
    const date1 = dayjs(data[0].timestamp);
    const date2 = dayjs(data[0].Max_date);
    const diffInDays = date2.diff(date1, 'day');
    let day = dayjs(endT).diff(date1, 'day');
    let node = day / diffInDays
    chartInstance.setOption(
      merge({}, option.value, {
        xAxis: [
          {
            min: startT,
            max: endT,
          },
        ],
        series: [
          {
            name: "参考衰减趋势",
            type: "line",
            symbol: "none",
            smooth: true,
            data: [
              [startT, 1],
              [midT, (1 + 1 - node) / 2 + 0.1],
              [endT, 1 - node],
            ],
            markLine: {
              data: [
                {
                  yAxis: 0.15,
                  name: "危险线",
                  label: {
                    position: "start",
                    formatter: '{b}: {c}'  // 格式化标线标签
                  },
                  lineStyle: {
                    color: "#ff0000", // 红色线
                    width: 1,
                    type: "dashed", // 虚线
                  },
                },
                {
                  yAxis: 0.25,
                  name: "告警线",
                  label: {
                    position: "start",
                    formatter: '{b}: {c}'  // 格式化标线标签
                  },
                  lineStyle: {
                    color: "#ffed00", // 红色线
                    width: 1,
                    type: "dashed", // 虚线
                  },
                },
              ],
            },
          },
          {
            name: "实际衰减趋势",
            type: "line",
            symbol: "none",
            data: data.map((item) => {
              return [dayjs(item.timestamp).valueOf(), item.value];
            }),
            markLine: {
              data: [
                {
                  xAxis: dayjs(last).valueOf(),
                  label: {
                    show: false,
                    position: "end",
                    formatter: function (params) {
                      return `${dayjs(params.data.xAxis).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}`;
                    },
                  },
                  lineStyle: {
                    color: "#ff0000", // 红色线
                    width: 1,
                    type: "dashed", // 虚线
                  },
                },
              ],
              symbol: ["none", "none"],
              label: {
                show: true,
                position: "start", // 标签显示在竖线的开始位置
              },
            },
          },

          // {
          //   type: "line",
          //   markArea: {
          //     silent: true, // 确保标记区域不会触发鼠标事件
          //     data: [
          //       [
          //         {
          //           xAxis: startT,
          //           yAxis: 0,
          //           itemStyle: { color: "#09ae3a" },
          //         },
          //         { xAxis: samples[0], yAxis: 0.05 },
          //       ],
          //       [
          //         {
          //           xAxis: samples[0],
          //           yAxis: 0,
          //           itemStyle: { color: "#ffed00" },
          //         },
          //         { xAxis: samples[1], yAxis: 0.05 },
          //       ],
          //       [
          //         {
          //           xAxis: samples[1],
          //           yAxis: 0,
          //           itemStyle: { color: "#ab0404" },
          //         },
          //         { xAxis: endedT, yAxis: 0.05 },
          //       ],
          //     ],
          //   },
          // },
        ],
      })
    );
    const chartInstanceBar = echartComponentBar.value.getChartInstance();
    chartInstanceBar.setOption(
      merge(optionBar.value, {
        xAxis: {
          max: 100,
        },
        series: [
          {
            type: "bar",
            stack: "total",
            data: [75],
            itemStyle: {
              color: "#09ae3a",
            },
          },
          {
            type: "bar",
            stack: "total",
            data: [15],
            itemStyle: {
              color: "#ffed00",
            },
          },
          {
            type: "bar",
            stack: "total",
            data: [10],
            itemStyle: {
              color: "#ab0404",
            },
          },
        ],
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
